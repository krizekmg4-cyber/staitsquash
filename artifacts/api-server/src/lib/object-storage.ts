import { Readable } from "node:stream";
import { Storage, type File } from "@google-cloud/storage";

const client = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: "http://127.0.0.1:1106/token",
    type: "external_account",
    credential_source: {
      url: "http://127.0.0.1:1106/credential",
      format: { type: "json", subject_token_field_name: "access_token" },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export class ObjectNotFoundError extends Error {}

function parseStoragePath(value: string): { bucket: string; object: string } {
  const parts = value.replace(/^\/+/, "").split("/");
  if (parts.length < 2) throw new Error("Invalid App Storage path");
  return { bucket: parts[0], object: parts.slice(1).join("/") };
}

export class ObjectStorageService {
  private getPrivateDir(): string {
    const value = process.env["PRIVATE_OBJECT_DIR"];
    if (!value) throw new Error("PRIVATE_OBJECT_DIR is not configured");
    return value.replace(/\/$/, "");
  }

  async getObject(objectPath: string): Promise<File> {
    if (!/^\/objects\/uploads\/[0-9a-f-]+$/.test(objectPath)) throw new ObjectNotFoundError();
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const file = client.bucket(bucket).file(`${privateObject}/${objectPath.slice("/objects/".length)}`);
    const [exists] = await file.exists();
    if (!exists) throw new ObjectNotFoundError();
    return file;
  }

  async saveObject(objectPath: string, bytes: Buffer, contentType: string): Promise<void> {
    if (!/^\/objects\/uploads\/[0-9a-f-]+$/.test(objectPath)) throw new Error("Invalid object path");
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const file = client.bucket(bucket).file(`${privateObject}/${objectPath.slice("/objects/".length)}`);
    await file.save(bytes, { contentType, resumable: false });
  }

  async deleteObject(objectPath: string): Promise<void> {
    if (!/^\/objects\/uploads\/[0-9a-f-]+$/.test(objectPath)) throw new Error("Invalid object path");
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const file = client.bucket(bucket).file(`${privateObject}/${objectPath.slice("/objects/".length)}`);
    await file.delete({ ignoreNotFound: true });
  }

  async stream(file: File, res: import("express").Response): Promise<void> {
    const [metadata] = await file.getMetadata();
    res.setHeader("Content-Type", metadata.contentType || "application/octet-stream");
    res.setHeader("Cache-Control", "private, max-age=3600");
    if (metadata.size) res.setHeader("Content-Length", String(metadata.size));
    Readable.from(file.createReadStream()).pipe(res);
  }
}