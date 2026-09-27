var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/routes/tracker.test.ts
import assert from "node:assert/strict";
import test from "node:test";
import express2 from "express";

// src/routes/tracker.ts
import express, { Router } from "express";
import { randomBytes, randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// ../../node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = /* @__PURE__ */ Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// ../../lib/api-zod/src/generated/api.ts
var HealthCheckResponse = objectType({
  "status": stringType()
});
var getTrackerResponsePlayersItemShareTokenMin = 32;
var getTrackerResponsePlayersItemShareTokenMax = 128;
var getTrackerResponsePlayersItemShareTokenRegExp = new RegExp("^[A-Za-z0-9_-]+$");
var getTrackerResponseMatchesItemReportOneObservationsMin = 3;
var getTrackerResponseMatchesItemReportOneObservationsMax = 3;
var getTrackerResponseMatchesItemReportOneAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var getTrackerResponseRefreshHealthConsecutiveFailuresMin = 0;
var getTrackerResponseRefreshHealthPendingRecoveryNoticesMin = 0;
var getTrackerResponseBrandingNameMax = 80;
var getTrackerResponseBrandingLogoPathMax = 100;
var getTrackerResponseBrandingLogoPathRegExp = new RegExp("^/objects/uploads/(?:logos/)?[0-9a-f-]+$");
var GetTrackerResponse = objectType({
  "players": arrayType(objectType({
    "id": stringType(),
    "name": stringType(),
    "shareToken": stringType().min(getTrackerResponsePlayersItemShareTokenMin).max(getTrackerResponsePlayersItemShareTokenMax).regex(getTrackerResponsePlayersItemShareTokenRegExp)
  })),
  "coaches": arrayType(objectType({
    "id": stringType(),
    "name": stringType()
  })),
  "matches": arrayType(objectType({
    "id": stringType(),
    "externalId": stringType().nullable(),
    "playerId": stringType(),
    "opponent": stringType(),
    "startsAt": coerce.date(),
    "endsAt": coerce.date(),
    "venue": stringType(),
    "court": stringType(),
    "coachId": stringType(),
    "status": enumType(["upcoming", "completed"]),
    "result": stringType().nullish(),
    "report": unionType([objectType({
      "matchId": stringType(),
      "observations": arrayType(stringType()).min(getTrackerResponseMatchesItemReportOneObservationsMin).max(getTrackerResponseMatchesItemReportOneObservationsMax),
      "transcript": stringType().nullish(),
      "audioPath": stringType().regex(getTrackerResponseMatchesItemReportOneAudioPathRegExp).nullable(),
      "updatedAt": coerce.date()
    }), nullType()]).optional()
  })),
  "lastUpdatedAt": coerce.date(),
  "source": enumType(["sample", "club-locker"]),
  "refreshHealth": objectType({
    "consecutiveFailures": numberType().int().min(getTrackerResponseRefreshHealthConsecutiveFailuresMin),
    "alertThreshold": numberType().int().min(1),
    "lastFailureAt": coerce.date().nullable(),
    "alertSentAt": coerce.date().nullable(),
    "pendingRecoveryNotices": numberType().int().min(getTrackerResponseRefreshHealthPendingRecoveryNoticesMin).describe("Recovery notices waiting to be delivered to staff")
  }),
  "branding": objectType({
    "name": stringType().min(1).max(getTrackerResponseBrandingNameMax),
    "logoPath": stringType().max(getTrackerResponseBrandingLogoPathMax).regex(getTrackerResponseBrandingLogoPathRegExp).nullable()
  })
});
var getTrackerHealthResponseConsecutiveFailuresMin = 0;
var getTrackerHealthResponsePendingRecoveryNoticesMin = 0;
var GetTrackerHealthResponse = objectType({
  "consecutiveFailures": numberType().int().min(getTrackerHealthResponseConsecutiveFailuresMin),
  "alertThreshold": numberType().int().min(1),
  "lastFailureAt": coerce.date().nullable(),
  "alertSentAt": coerce.date().nullable(),
  "pendingRecoveryNotices": numberType().int().min(getTrackerHealthResponsePendingRecoveryNoticesMin).describe("Recovery notices waiting to be delivered to staff")
});
var getPlayerTrackerPathShareTokenMin = 32;
var getPlayerTrackerPathShareTokenMax = 128;
var GetPlayerTrackerParams = objectType({
  "shareToken": coerce.string().min(getPlayerTrackerPathShareTokenMin).max(getPlayerTrackerPathShareTokenMax)
});
var getPlayerTrackerResponseMatchesItemReportOneObservationsMin = 3;
var getPlayerTrackerResponseMatchesItemReportOneObservationsMax = 3;
var getPlayerTrackerResponseMatchesItemReportOneAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var getPlayerTrackerResponseBrandingNameMax = 80;
var getPlayerTrackerResponseBrandingLogoPathMax = 100;
var getPlayerTrackerResponseBrandingLogoPathRegExp = new RegExp("^/objects/uploads/(?:logos/)?[0-9a-f-]+$");
var GetPlayerTrackerResponse = objectType({
  "player": objectType({
    "id": stringType(),
    "name": stringType()
  }),
  "coaches": arrayType(objectType({
    "id": stringType(),
    "name": stringType()
  })),
  "matches": arrayType(objectType({
    "id": stringType(),
    "externalId": stringType().nullable(),
    "playerId": stringType(),
    "opponent": stringType(),
    "startsAt": coerce.date(),
    "endsAt": coerce.date(),
    "venue": stringType(),
    "court": stringType(),
    "coachId": stringType(),
    "status": enumType(["upcoming", "completed"]),
    "result": stringType().nullish(),
    "report": unionType([objectType({
      "matchId": stringType(),
      "observations": arrayType(stringType()).min(getPlayerTrackerResponseMatchesItemReportOneObservationsMin).max(getPlayerTrackerResponseMatchesItemReportOneObservationsMax),
      "transcript": stringType().nullish(),
      "audioPath": stringType().regex(getPlayerTrackerResponseMatchesItemReportOneAudioPathRegExp).nullable(),
      "updatedAt": coerce.date()
    }), nullType()]).optional()
  })),
  "branding": objectType({
    "name": stringType().min(1).max(getPlayerTrackerResponseBrandingNameMax),
    "logoPath": stringType().max(getPlayerTrackerResponseBrandingLogoPathMax).regex(getPlayerTrackerResponseBrandingLogoPathRegExp).nullable()
  }),
  "lastUpdatedAt": coerce.date()
});
var saveTrackerSettingsBodyBrandingNameMax = 80;
var saveTrackerSettingsBodyBrandingLogoPathMax = 100;
var saveTrackerSettingsBodyBrandingLogoPathRegExp = new RegExp("^/objects/uploads/(?:logos/)?[0-9a-f-]+$");
var SaveTrackerSettingsBody = objectType({
  "coaches": arrayType(objectType({
    "id": stringType(),
    "name": stringType()
  })).min(1),
  "branding": objectType({
    "name": stringType().min(1).max(saveTrackerSettingsBodyBrandingNameMax),
    "logoPath": stringType().max(saveTrackerSettingsBodyBrandingLogoPathMax).regex(saveTrackerSettingsBodyBrandingLogoPathRegExp).nullable()
  })
});
var saveTrackerSettingsResponsePlayersItemShareTokenMin = 32;
var saveTrackerSettingsResponsePlayersItemShareTokenMax = 128;
var saveTrackerSettingsResponsePlayersItemShareTokenRegExp = new RegExp("^[A-Za-z0-9_-]+$");
var saveTrackerSettingsResponseMatchesItemReportOneObservationsMin = 3;
var saveTrackerSettingsResponseMatchesItemReportOneObservationsMax = 3;
var saveTrackerSettingsResponseMatchesItemReportOneAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var saveTrackerSettingsResponseRefreshHealthConsecutiveFailuresMin = 0;
var saveTrackerSettingsResponseRefreshHealthPendingRecoveryNoticesMin = 0;
var saveTrackerSettingsResponseBrandingNameMax = 80;
var saveTrackerSettingsResponseBrandingLogoPathMax = 100;
var saveTrackerSettingsResponseBrandingLogoPathRegExp = new RegExp("^/objects/uploads/(?:logos/)?[0-9a-f-]+$");
var SaveTrackerSettingsResponse = objectType({
  "players": arrayType(objectType({
    "id": stringType(),
    "name": stringType(),
    "shareToken": stringType().min(saveTrackerSettingsResponsePlayersItemShareTokenMin).max(saveTrackerSettingsResponsePlayersItemShareTokenMax).regex(saveTrackerSettingsResponsePlayersItemShareTokenRegExp)
  })),
  "coaches": arrayType(objectType({
    "id": stringType(),
    "name": stringType()
  })),
  "matches": arrayType(objectType({
    "id": stringType(),
    "externalId": stringType().nullable(),
    "playerId": stringType(),
    "opponent": stringType(),
    "startsAt": coerce.date(),
    "endsAt": coerce.date(),
    "venue": stringType(),
    "court": stringType(),
    "coachId": stringType(),
    "status": enumType(["upcoming", "completed"]),
    "result": stringType().nullish(),
    "report": unionType([objectType({
      "matchId": stringType(),
      "observations": arrayType(stringType()).min(saveTrackerSettingsResponseMatchesItemReportOneObservationsMin).max(saveTrackerSettingsResponseMatchesItemReportOneObservationsMax),
      "transcript": stringType().nullish(),
      "audioPath": stringType().regex(saveTrackerSettingsResponseMatchesItemReportOneAudioPathRegExp).nullable(),
      "updatedAt": coerce.date()
    }), nullType()]).optional()
  })),
  "lastUpdatedAt": coerce.date(),
  "source": enumType(["sample", "club-locker"]),
  "refreshHealth": objectType({
    "consecutiveFailures": numberType().int().min(saveTrackerSettingsResponseRefreshHealthConsecutiveFailuresMin),
    "alertThreshold": numberType().int().min(1),
    "lastFailureAt": coerce.date().nullable(),
    "alertSentAt": coerce.date().nullable(),
    "pendingRecoveryNotices": numberType().int().min(saveTrackerSettingsResponseRefreshHealthPendingRecoveryNoticesMin).describe("Recovery notices waiting to be delivered to staff")
  }),
  "branding": objectType({
    "name": stringType().min(1).max(saveTrackerSettingsResponseBrandingNameMax),
    "logoPath": stringType().max(saveTrackerSettingsResponseBrandingLogoPathMax).regex(saveTrackerSettingsResponseBrandingLogoPathRegExp).nullable()
  })
});
var RotatePlayerShareTokenParams = objectType({
  "playerId": coerce.string()
});
var rotatePlayerShareTokenResponseShareTokenMin = 32;
var rotatePlayerShareTokenResponseShareTokenMax = 128;
var rotatePlayerShareTokenResponseShareTokenRegExp = new RegExp("^[A-Za-z0-9_-]+$");
var RotatePlayerShareTokenResponse = objectType({
  "id": stringType(),
  "name": stringType(),
  "shareToken": stringType().min(rotatePlayerShareTokenResponseShareTokenMin).max(rotatePlayerShareTokenResponseShareTokenMax).regex(rotatePlayerShareTokenResponseShareTokenRegExp)
});
var uploadTrackerLogoResponseObjectPathRegExp = new RegExp("^/objects/uploads/logos/[0-9a-f-]+$");
var UploadTrackerLogoResponse = objectType({
  "objectPath": stringType().regex(uploadTrackerLogoResponseObjectPathRegExp)
});
var deleteUnusedTrackerLogoBodyObjectPathRegExp = new RegExp("^/objects/uploads/logos/[0-9a-f-]+$");
var DeleteUnusedTrackerLogoBody = objectType({
  "objectPath": stringType().regex(deleteUnusedTrackerLogoBodyObjectPathRegExp)
});
var DeleteUnusedTrackerLogoResponse = voidType();
var GetStorageObjectParams = objectType({
  "objectPath": coerce.string()
});
var GetStorageObjectResponse = unknownType();
var UpdateMatchParams = objectType({
  "matchId": coerce.string()
});
var UpdateMatchBody = objectType({
  "opponent": stringType().optional(),
  "startsAt": coerce.date().optional(),
  "endsAt": coerce.date().optional(),
  "venue": stringType().optional(),
  "court": stringType().optional(),
  "coachId": stringType().optional(),
  "status": enumType(["upcoming", "completed"]).optional(),
  "result": stringType().nullish()
});
var updateMatchResponseReportOneObservationsMin = 3;
var updateMatchResponseReportOneObservationsMax = 3;
var updateMatchResponseReportOneAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var UpdateMatchResponse = objectType({
  "id": stringType(),
  "externalId": stringType().nullable(),
  "playerId": stringType(),
  "opponent": stringType(),
  "startsAt": coerce.date(),
  "endsAt": coerce.date(),
  "venue": stringType(),
  "court": stringType(),
  "coachId": stringType(),
  "status": enumType(["upcoming", "completed"]),
  "result": stringType().nullish(),
  "report": unionType([objectType({
    "matchId": stringType(),
    "observations": arrayType(stringType()).min(updateMatchResponseReportOneObservationsMin).max(updateMatchResponseReportOneObservationsMax),
    "transcript": stringType().nullish(),
    "audioPath": stringType().regex(updateMatchResponseReportOneAudioPathRegExp).nullable(),
    "updatedAt": coerce.date()
  }), nullType()]).optional()
});
var SaveCoachReportParams = objectType({
  "matchId": coerce.string()
});
var saveCoachReportBodyObservationsItemMax = 220;
var saveCoachReportBodyObservationsMin = 3;
var saveCoachReportBodyObservationsMax = 3;
var saveCoachReportBodyAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var SaveCoachReportBody = objectType({
  "observations": arrayType(stringType().min(1).max(saveCoachReportBodyObservationsItemMax)).min(saveCoachReportBodyObservationsMin).max(saveCoachReportBodyObservationsMax),
  "transcript": stringType().nullish(),
  "audioPath": stringType().regex(saveCoachReportBodyAudioPathRegExp).nullish()
});
var saveCoachReportResponseObservationsMin = 3;
var saveCoachReportResponseObservationsMax = 3;
var saveCoachReportResponseAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var SaveCoachReportResponse = objectType({
  "matchId": stringType(),
  "observations": arrayType(stringType()).min(saveCoachReportResponseObservationsMin).max(saveCoachReportResponseObservationsMax),
  "transcript": stringType().nullish(),
  "audioPath": stringType().regex(saveCoachReportResponseAudioPathRegExp).nullable(),
  "updatedAt": coerce.date()
});
var UploadCoachReportAudioParams = objectType({
  "matchId": coerce.string()
});
var uploadCoachReportAudioResponseObjectPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var UploadCoachReportAudioResponse = objectType({
  "objectPath": stringType().regex(uploadCoachReportAudioResponseObjectPathRegExp)
});
var refreshTrackerResponsePlayersItemShareTokenMin = 32;
var refreshTrackerResponsePlayersItemShareTokenMax = 128;
var refreshTrackerResponsePlayersItemShareTokenRegExp = new RegExp("^[A-Za-z0-9_-]+$");
var refreshTrackerResponseMatchesItemReportOneObservationsMin = 3;
var refreshTrackerResponseMatchesItemReportOneObservationsMax = 3;
var refreshTrackerResponseMatchesItemReportOneAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var refreshTrackerResponseRefreshHealthConsecutiveFailuresMin = 0;
var refreshTrackerResponseRefreshHealthPendingRecoveryNoticesMin = 0;
var refreshTrackerResponseBrandingNameMax = 80;
var refreshTrackerResponseBrandingLogoPathMax = 100;
var refreshTrackerResponseBrandingLogoPathRegExp = new RegExp("^/objects/uploads/(?:logos/)?[0-9a-f-]+$");
var RefreshTrackerResponse = objectType({
  "players": arrayType(objectType({
    "id": stringType(),
    "name": stringType(),
    "shareToken": stringType().min(refreshTrackerResponsePlayersItemShareTokenMin).max(refreshTrackerResponsePlayersItemShareTokenMax).regex(refreshTrackerResponsePlayersItemShareTokenRegExp)
  })),
  "coaches": arrayType(objectType({
    "id": stringType(),
    "name": stringType()
  })),
  "matches": arrayType(objectType({
    "id": stringType(),
    "externalId": stringType().nullable(),
    "playerId": stringType(),
    "opponent": stringType(),
    "startsAt": coerce.date(),
    "endsAt": coerce.date(),
    "venue": stringType(),
    "court": stringType(),
    "coachId": stringType(),
    "status": enumType(["upcoming", "completed"]),
    "result": stringType().nullish(),
    "report": unionType([objectType({
      "matchId": stringType(),
      "observations": arrayType(stringType()).min(refreshTrackerResponseMatchesItemReportOneObservationsMin).max(refreshTrackerResponseMatchesItemReportOneObservationsMax),
      "transcript": stringType().nullish(),
      "audioPath": stringType().regex(refreshTrackerResponseMatchesItemReportOneAudioPathRegExp).nullable(),
      "updatedAt": coerce.date()
    }), nullType()]).optional()
  })),
  "lastUpdatedAt": coerce.date(),
  "source": enumType(["sample", "club-locker"]),
  "refreshHealth": objectType({
    "consecutiveFailures": numberType().int().min(refreshTrackerResponseRefreshHealthConsecutiveFailuresMin),
    "alertThreshold": numberType().int().min(1),
    "lastFailureAt": coerce.date().nullable(),
    "alertSentAt": coerce.date().nullable(),
    "pendingRecoveryNotices": numberType().int().min(refreshTrackerResponseRefreshHealthPendingRecoveryNoticesMin).describe("Recovery notices waiting to be delivered to staff")
  }),
  "branding": objectType({
    "name": stringType().min(1).max(refreshTrackerResponseBrandingNameMax),
    "logoPath": stringType().max(refreshTrackerResponseBrandingLogoPathMax).regex(refreshTrackerResponseBrandingLogoPathRegExp).nullable()
  })
});

// ../../lib/api-zod/src/persisted-tracker-state.ts
var DateTimeString = external_exports.string().datetime({ offset: true });
var ObjectPath = external_exports.string().regex(/^\/objects\/uploads\/[0-9a-f-]+$/);
var TrackerPerson = external_exports.object({
  id: external_exports.string().min(1),
  name: external_exports.string().min(1),
  shareToken: external_exports.string().min(32).max(128).regex(/^[A-Za-z0-9_-]+$/).optional()
});
var RefreshRecovery = external_exports.object({
  failedAttempts: external_exports.number().int().min(1),
  outageStartedAt: DateTimeString,
  recoveredAt: DateTimeString,
  outageDurationMs: external_exports.number().int().min(0)
});
var RefreshHealth = external_exports.object({
  consecutiveFailures: external_exports.number().int().min(0),
  alertThreshold: external_exports.number().int().min(1),
  firstFailureAt: DateTimeString.nullable().optional(),
  lastFailureAt: DateTimeString.nullable(),
  alertSentAt: DateTimeString.nullable(),
  failureAlertClaimedAt: DateTimeString.nullable().optional(),
  pendingRecoveries: external_exports.array(RefreshRecovery).optional(),
  pendingRecovery: RefreshRecovery.nullable().optional(),
  recoveryClaim: external_exports.object({
    outageStartedAt: DateTimeString,
    recoveredAt: DateTimeString,
    claimedAt: DateTimeString
  }).nullable().optional()
});
var CoachReport = external_exports.object({
  matchId: external_exports.string().min(1),
  observations: external_exports.array(external_exports.string().min(1)).length(3),
  transcript: external_exports.string().nullable(),
  audioPath: ObjectPath.nullable().optional(),
  updatedAt: DateTimeString
});
var TrackerMatch = external_exports.object({
  id: external_exports.string().min(1),
  externalId: external_exports.string().nullable(),
  playerId: external_exports.string().min(1),
  opponent: external_exports.string().min(1),
  startsAt: DateTimeString,
  endsAt: DateTimeString,
  venue: external_exports.string().min(1),
  court: external_exports.string().min(1),
  coachId: external_exports.string().min(1),
  status: external_exports.enum(["upcoming", "completed"]),
  result: external_exports.string().nullable(),
  report: CoachReport.nullable()
});
var PersistedTrackerState = external_exports.object({
  players: external_exports.array(TrackerPerson),
  coaches: external_exports.array(TrackerPerson),
  branding: external_exports.object({
    name: external_exports.string().min(1).max(80),
    logoPath: ObjectPath.nullable().optional(),
    logoUrl: external_exports.string().nullable().optional()
  }).optional(),
  matches: external_exports.array(TrackerMatch),
  lastUpdatedAt: DateTimeString,
  source: external_exports.enum(["sample", "club-locker"]),
  refreshHealth: RefreshHealth.optional()
}).superRefine((state, context) => {
  const playerIds = new Set(state.players.map((player) => player.id));
  const coachIds = new Set(state.coaches.map((coach) => coach.id));
  state.matches.forEach((match, matchIndex) => {
    if (!playerIds.has(match.playerId)) {
      context.addIssue({
        code: external_exports.ZodIssueCode.custom,
        path: ["matches", matchIndex, "playerId"],
        message: `Match "${match.id}" references missing player "${match.playerId}"`
      });
    }
    if (!coachIds.has(match.coachId)) {
      context.addIssue({
        code: external_exports.ZodIssueCode.custom,
        path: ["matches", matchIndex, "coachId"],
        message: `Match "${match.id}" references missing coach "${match.coachId}"`
      });
    }
    if (Date.parse(match.endsAt) <= Date.parse(match.startsAt)) {
      context.addIssue({
        code: external_exports.ZodIssueCode.custom,
        path: ["matches", matchIndex, "endsAt"],
        message: `Match "${match.id}" endsAt must be after startsAt`
      });
    }
    if (match.report && match.report.matchId !== match.id) {
      context.addIssue({
        code: external_exports.ZodIssueCode.custom,
        path: ["matches", matchIndex, "report", "matchId"],
        message: `Report matchId "${match.report.matchId}" does not match containing match "${match.id}"`
      });
    }
  });
});

// src/lib/club-locker.ts
function cloneTrackerState(state) {
  return {
    players: state.players.map((player) => ({ ...player })),
    coaches: state.coaches.map((coach) => ({ ...coach })),
    branding: state.branding ? { ...state.branding } : void 0,
    matches: state.matches.map(cloneTrackerMatch),
    lastUpdatedAt: state.lastUpdatedAt,
    source: state.source,
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveries: cloneRefreshRecoveries(
        state.refreshHealth.pendingRecoveries
      )
    }
  };
}
function freezeTrackerState(state) {
  for (const player of state.players) Object.freeze(player);
  Object.freeze(state.players);
  for (const coach of state.coaches) Object.freeze(coach);
  Object.freeze(state.coaches);
  if (state.branding) Object.freeze(state.branding);
  for (const match of state.matches) {
    if (match.report) {
      Object.freeze(match.report.observations);
      Object.freeze(match.report);
    }
    Object.freeze(match);
  }
  Object.freeze(state.matches);
  for (const recovery of state.refreshHealth.pendingRecoveries) {
    Object.freeze(recovery);
  }
  Object.freeze(state.refreshHealth.pendingRecoveries);
  if (state.refreshHealth.recoveryClaim) {
    Object.freeze(state.refreshHealth.recoveryClaim);
  }
  Object.freeze(state.refreshHealth);
  return Object.freeze(state);
}
function cloneRefreshRecoveries(recoveries) {
  return recoveries.map((recovery) => ({ ...recovery }));
}
function getRefreshRecovery(state, recoveredAt = (/* @__PURE__ */ new Date()).toISOString()) {
  const { alertSentAt, consecutiveFailures, firstFailureAt } = state.refreshHealth;
  if (alertSentAt === null || consecutiveFailures === 0 || firstFailureAt === null) {
    return null;
  }
  return {
    failedAttempts: consecutiveFailures,
    outageStartedAt: firstFailureAt,
    recoveredAt,
    outageDurationMs: Math.max(
      0,
      Date.parse(recoveredAt) - Date.parse(firstFailureAt)
    )
  };
}
function clearRefreshFailures(state, alertThreshold, recoveredAt = (/* @__PURE__ */ new Date()).toISOString()) {
  const replacement = cloneTrackerState(state);
  const pendingRecoveries = replacement.refreshHealth.pendingRecoveries;
  const recovery = getRefreshRecovery(state, recoveredAt);
  if (recovery) pendingRecoveries.push(recovery);
  return {
    ...replacement,
    refreshHealth: {
      consecutiveFailures: 0,
      alertThreshold,
      firstFailureAt: null,
      lastFailureAt: null,
      alertSentAt: null,
      failureAlertClaimedAt: null,
      pendingRecoveries,
      recoveryClaim: replacement.refreshHealth.recoveryClaim
    }
  };
}
function recordRefreshFailure(state, alertThreshold, failedAt = (/* @__PURE__ */ new Date()).toISOString()) {
  const replacement = cloneTrackerState(state);
  return {
    ...replacement,
    refreshHealth: {
      consecutiveFailures: state.refreshHealth.consecutiveFailures + 1,
      alertThreshold,
      firstFailureAt: state.refreshHealth.firstFailureAt ?? failedAt,
      lastFailureAt: failedAt,
      alertSentAt: state.refreshHealth.alertSentAt,
      failureAlertClaimedAt: state.refreshHealth.failureAlertClaimedAt,
      pendingRecoveries: replacement.refreshHealth.pendingRecoveries,
      recoveryClaim: replacement.refreshHealth.recoveryClaim
    }
  };
}
function cloneTrackerMatch(match) {
  return {
    ...match,
    report: match.report === null ? null : {
      ...match.report,
      observations: [...match.report.observations]
    }
  };
}
function readRequiredString(value, field, index) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Match ${index + 1} has an invalid ${field}`);
  }
  return value.trim();
}
function readTimestampWithTimezone(value, field, index) {
  const timestamp = readRequiredString(value, field, index);
  if (!/(?:Z|[+-]\d{2}:\d{2})$/i.test(timestamp)) {
    throw new Error(
      `Match ${index + 1} ${field} must include an explicit timezone`
    );
  }
  if (Number.isNaN(Date.parse(timestamp))) {
    throw new Error(`Match ${index + 1} has an invalid ${field}`);
  }
  return timestamp;
}
function parseClubLockerFeed(value) {
  if (!value || typeof value !== "object" || !Array.isArray(value.matches)) {
    throw new Error("The Club Locker response does not contain a matches array");
  }
  const raw = value;
  const seen = /* @__PURE__ */ new Set();
  const matches = raw.matches.map((match, index) => {
    const externalId = readRequiredString(match.externalId, "externalId", index);
    if (seen.has(externalId)) {
      throw new Error(`Club Locker returned duplicate match ID "${externalId}"`);
    }
    seen.add(externalId);
    const startsAt = readTimestampWithTimezone(match.startsAt, "startsAt", index);
    const endsAt = readTimestampWithTimezone(match.endsAt, "endsAt", index);
    if (Date.parse(endsAt) <= Date.parse(startsAt)) {
      throw new Error(`Match ${index + 1} must end after it starts`);
    }
    if (match.status != null && match.status !== "upcoming" && match.status !== "completed") {
      throw new Error(`Match ${index + 1} has an invalid status`);
    }
    return {
      externalId,
      playerId: readRequiredString(match.playerId, "playerId", index),
      playerName: typeof match.playerName === "string" ? match.playerName.trim() : void 0,
      opponent: readRequiredString(match.opponent, "opponent", index),
      startsAt,
      endsAt,
      venue: readRequiredString(match.venue, "venue", index),
      court: readRequiredString(match.court, "court", index),
      status: match.status === "upcoming" || match.status === "completed" ? match.status : void 0,
      result: typeof match.result === "string" || match.result === null ? match.result : void 0
    };
  });
  const matchesByPlayer = /* @__PURE__ */ new Map();
  for (const match of matches) {
    const playerMatches = matchesByPlayer.get(match.playerId) ?? [];
    playerMatches.push(match);
    matchesByPlayer.set(match.playerId, playerMatches);
  }
  for (const [playerId, playerMatches] of matchesByPlayer) {
    playerMatches.sort(
      (left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt)
    );
    for (let index = 1; index < playerMatches.length; index += 1) {
      const previous = playerMatches[index - 1];
      const current = playerMatches[index];
      if (Date.parse(current.startsAt) < Date.parse(previous.endsAt)) {
        throw new Error(
          `Club Locker returned overlapping matches for player ID "${playerId}"`
        );
      }
    }
  }
  const playerNamesById = /* @__PURE__ */ new Map();
  const players = Array.isArray(raw.players) ? raw.players.map((player, index) => {
    if (!player || typeof player !== "object") {
      throw new Error(`Player ${index + 1} is invalid`);
    }
    const item = player;
    const id = readRequiredString(item.id, "player id", index);
    const name = readRequiredString(item.name, "player name", index);
    const existingName = playerNamesById.get(id);
    if (existingName !== void 0 && existingName !== name) {
      throw new Error(
        `Club Locker returned conflicting names for player ID "${id}"`
      );
    }
    playerNamesById.set(id, name);
    return { id, name };
  }) : void 0;
  for (const match of matches) Object.freeze(match);
  Object.freeze(matches);
  if (players) {
    for (const player of players) Object.freeze(player);
    Object.freeze(players);
  }
  return Object.freeze({ matches, players });
}
var SAMPLE_PLAYER_ID = "cameron-stait";
function withoutSampleDraw(state) {
  const matches = state.matches.filter(
    (match) => !(match.externalId === null && match.playerId === SAMPLE_PLAYER_ID)
  );
  const players = matches.some((match) => match.playerId === SAMPLE_PLAYER_ID) ? state.players : state.players.filter((player) => player.id !== SAMPLE_PLAYER_ID);
  return { ...state, matches, players };
}
function mergeClubLockerFeed(loadedState, feed) {
  const state = withoutSampleDraw(loadedState);
  const currentByExternalId = new Map(
    state.matches.filter(
      (match) => match.externalId !== null
    ).map((match) => [match.externalId, match])
  );
  const incomingByExternalId = new Map(
    feed.matches.map((match) => [match.externalId, match])
  );
  const importedIds = new Set(feed.matches.map((match) => match.externalId));
  const locallyRetained = state.matches.filter(
    (match) => (match.externalId === null || !importedIds.has(match.externalId)) && (match.externalId === null || match.status === "completed" || match.report !== null)
  );
  for (const incoming of feed.matches) {
    const overlapsRetainedMatch = locallyRetained.some(
      (retainedMatch) => retainedMatch.playerId === incoming.playerId && Date.parse(incoming.startsAt) < Date.parse(retainedMatch.endsAt) && Date.parse(retainedMatch.startsAt) < Date.parse(incoming.endsAt)
    );
    if (overlapsRetainedMatch) {
      throw new Error(
        `Club Locker returned a match overlapping a retained match for player ID "${incoming.playerId}"`
      );
    }
  }
  const retained = state.matches.filter(
    (match) => match.externalId === null || importedIds.has(match.externalId) || match.status === "completed" || match.report !== null
  ).map((match) => {
    const incoming = match.externalId === null ? void 0 : incomingByExternalId.get(match.externalId);
    const adoptResult = incoming?.status === "completed" && match.status === "upcoming";
    return incoming ? {
      ...cloneTrackerMatch(match),
      playerId: incoming.playerId,
      opponent: incoming.opponent,
      startsAt: incoming.startsAt,
      endsAt: incoming.endsAt,
      venue: incoming.venue,
      court: incoming.court,
      ...adoptResult ? { status: "completed", result: incoming.result ?? null } : {}
    } : cloneTrackerMatch(match);
  });
  for (const incoming of feed.matches) {
    const existing = currentByExternalId.get(incoming.externalId);
    if (existing) continue;
    retained.push({
      id: `club-locker:${Buffer.from(incoming.externalId).toString("base64url")}`,
      externalId: incoming.externalId,
      playerId: incoming.playerId,
      opponent: incoming.opponent,
      startsAt: incoming.startsAt,
      endsAt: incoming.endsAt,
      venue: incoming.venue,
      court: incoming.court,
      coachId: "unassigned",
      status: incoming.status ?? "upcoming",
      result: incoming.result ?? null,
      report: null
    });
  }
  const playersById = new Map(
    state.players.map((player) => [player.id, { ...player }])
  );
  for (const player of feed.players ?? []) {
    playersById.set(player.id, {
      ...player,
      shareToken: playersById.get(player.id)?.shareToken
    });
  }
  for (const match of feed.matches) {
    if (!playersById.has(match.playerId)) {
      playersById.set(match.playerId, {
        id: match.playerId,
        name: match.playerName || match.playerId
      });
    }
  }
  return {
    branding: state.branding ? { ...state.branding } : void 0,
    coaches: state.coaches.map((coach) => ({ ...coach })),
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveries: cloneRefreshRecoveries(
        state.refreshHealth.pendingRecoveries
      )
    },
    players: [...playersById.values()],
    matches: retained,
    lastUpdatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    source: "club-locker"
  };
}

// src/lib/club-locker-draws.ts
var CLUB_LOCKER_API = "https://api.ussquash.com/resources";
var ASSUMED_MATCH_MINUTES = 45;
var text = (value) => typeof value === "string" ? value.trim() : "";
var memberId = (value) => typeof value === "number" && value > 0 ? String(value) : typeof value === "string" && /^\d+$/.test(value.trim()) ? value.trim() : "";
function displayName(lastFirst) {
  const [last, first] = lastFirst.split(",").map((part) => part.trim());
  return first ? `${first} ${last}` : last;
}
function parseVenueCodes(value) {
  const codes = /* @__PURE__ */ new Map();
  for (const entry of (value ?? "").split(",")) {
    const [code, name] = entry.split("=").map((part) => part.trim());
    if (code && name) codes.set(code.toUpperCase(), name);
  }
  return codes;
}
function courtAndVenue(match, venueName, venueCodes) {
  const named = text(match.courtName);
  const code = text(match.CourtNumber);
  const prefixed = /^([A-Za-z]+)\s*(\d+)$/.exec(code);
  if (prefixed) {
    const venue = venueCodes.get(prefixed[1].toUpperCase());
    if (venue) return { venue, court: named || `Court ${prefixed[2]}` };
  }
  if (named) return { venue: venueName, court: named };
  if (/^\d+$/.test(code)) return { venue: venueName, court: `Court ${code}` };
  return { venue: venueName, court: code || "Court TBA" };
}
function timeZoneOffsetMinutes(utcMillis, timeZone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).formatToParts(new Date(utcMillis)).map((part) => [part.type, part.value])
  );
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return Math.round((asUtc - utcMillis) / 6e4);
}
var pad = (value) => String(value).padStart(2, "0");
function localStartToIso(matchDate, startTime, timeZone) {
  const date = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(matchDate.trim());
  const time = /^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/.exec(startTime.trim());
  if (!date || !time) return null;
  const [month, day, year] = [Number(date[1]), Number(date[2]), Number(date[3])];
  let hour = Number(time[1]) % 12;
  if (time[3].toUpperCase() === "PM") hour += 12;
  const minute = Number(time[2]);
  const wallClock = Date.UTC(year, month - 1, day, hour, minute);
  let offset = timeZoneOffsetMinutes(wallClock, timeZone);
  offset = timeZoneOffsetMinutes(wallClock - offset * 6e4, timeZone);
  const sign = offset < 0 ? "-" : "+";
  const absolute = Math.abs(offset);
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00${sign}${pad(Math.floor(absolute / 60))}:${pad(absolute % 60)}`;
}
function resultFor(match, side) {
  const status = text(match.Status).toUpperCase();
  const winner = text(match.winner).toUpperCase();
  if (winner !== "H" && winner !== "V") return null;
  const won = winner === side;
  if (status === "DF") return won ? "Won by default" : "Lost by default";
  const games = text(match.Score).split(",").map((game) => /^(\d+)-(\d+)$/.exec(game.trim())).filter((game) => game !== null).map((game) => won ? [game[1], game[2]] : [game[2], game[1]]);
  const finished = games.map(([a, b]) => [Number(a), Number(b)]).filter(([a, b]) => Math.max(a, b) >= 9 && Math.abs(a - b) >= 2);
  const ours = finished.filter(([a, b]) => a > b).length;
  const theirs = finished.length - ours;
  const score = games.length ? ` ${ours}\u2013${theirs} (${games.map(([a, b]) => `${a}-${b}`).join(", ")})` : "";
  const retired = status === "RE" ? won ? ", opponent retired" : ", retired" : "";
  return `${won ? "Won" : "Lost"}${score}${retired}`;
}
function drawsToFeed(tournaments, rosterIds, timeZone) {
  const found = [];
  for (const tournament of tournaments) {
    const venueCodes = parseVenueCodes(tournament.venueCodes);
    for (const match of tournament.matches) {
      if (text(match.SinglesDoubles).toLowerCase() === "d") continue;
      const resultId = memberId(match.ResultID) || text(match.ResultID);
      if (!resultId) continue;
      const startsAt = localStartToIso(
        text(match.matchdate),
        text(match.StartTime),
        timeZone
      );
      if (!startsAt) continue;
      const sides = [
        { side: "H", id: memberId(match.wid1), name: text(match.hplayer1), other: text(match.vplayer1) },
        { side: "V", id: memberId(match.oid1), name: text(match.vplayer1), other: text(match.hplayer1) }
      ];
      const completed = text(match.Status).toUpperCase() !== "S";
      const { venue, court } = courtAndVenue(match, tournament.venueName, venueCodes);
      for (const { side, id, name, other } of sides) {
        if (!id || !name || !rosterIds.has(id)) continue;
        if (completed && !other) continue;
        found.push({
          externalId: `${tournament.tournamentId}:${resultId}:${id}`,
          playerId: id,
          playerName: displayName(name),
          opponent: other ? displayName(other) : "To be decided",
          startsAt,
          endsAt: startsAt,
          venue,
          court,
          status: completed ? "completed" : "upcoming",
          result: completed ? resultFor(match, side) : null
        });
      }
    }
  }
  const byPlayer = /* @__PURE__ */ new Map();
  for (const match of found) {
    byPlayer.set(match.playerId, [...byPlayer.get(match.playerId) ?? [], match]);
  }
  const matches = [];
  for (const playerMatches of byPlayer.values()) {
    playerMatches.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
    const kept = playerMatches.filter(
      (match, index) => index === 0 || Date.parse(match.startsAt) > Date.parse(playerMatches[index - 1].startsAt)
    );
    kept.forEach((match, index) => {
      const start = Date.parse(match.startsAt);
      const next = kept[index + 1];
      const end = Math.min(
        start + ASSUMED_MATCH_MINUTES * 6e4,
        next ? Date.parse(next.startsAt) : Infinity
      );
      matches.push({ ...match, endsAt: new Date(end).toISOString() });
    });
  }
  const players = [...new Map(found.map((match) => [match.playerId, match.playerName]))].map(([id, name]) => ({ id, name }));
  return { matches, players };
}
function drawsConfigFromEnv(env = process.env) {
  const list = (value) => (value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
  const tournamentIds = list(env["CLUB_LOCKER_TOURNAMENT_IDS"]);
  if (tournamentIds.length === 0) return null;
  return {
    tournamentIds,
    rosterIds: new Set(list(env["CLUB_LOCKER_PLAYER_IDS"])),
    timeZone: env["CLUB_LOCKER_TIMEZONE"]?.trim() || "America/New_York"
  };
}
async function getJson(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1e4);
  try {
    const response = await fetch(`${CLUB_LOCKER_API}/${path}`, {
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`Club Locker returned HTTP ${response.status} for ${path}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}
async function loadTournamentDraws(tournamentId, fetchJson) {
  const id = encodeURIComponent(tournamentId);
  const tournament = await fetchJson(`tournaments/${id}`);
  let venueName = text(tournament.Tournament_Name) || `Tournament ${tournamentId}`;
  const mainClub = tournament.venues?.find((venue) => venue.IsMain) ?? tournament.venues?.[0];
  const clubId = memberId(mainClub?.ClubId);
  if (clubId) {
    try {
      const club = await fetchJson(`res/clubs/${clubId}`);
      venueName = text(club.name) || venueName;
    } catch {
    }
  }
  const divisions = await fetchJson(`tournaments/${id}/divisionsandsections`);
  if (!Array.isArray(divisions)) {
    throw new Error(`Club Locker tournament ${tournamentId} has no division list`);
  }
  const divisionIds = [
    ...new Set(divisions.map((division) => memberId(division?.divisionId)).filter(Boolean))
  ];
  const sections = await Promise.all(
    divisionIds.map((divisionId) => fetchJson(`tournaments/${id}/division/${divisionId}/draws`))
  );
  const matches = sections.flatMap(
    (draw) => Array.isArray(draw) ? draw.flatMap(
      (section) => Array.isArray(section?.matches) ? section.matches : []
    ) : []
  );
  return {
    tournamentId,
    venueName,
    venueCodes: text(tournament.Checks_To) || null,
    matches
  };
}
async function fetchClubLockerDraws(config, fetchJson = getJson) {
  if (config.rosterIds.size === 0) {
    throw new Error("Add US Squash player IDs to CLUB_LOCKER_PLAYER_IDS");
  }
  const tournaments = await Promise.all(
    config.tournamentIds.map((id) => loadTournamentDraws(id, fetchJson))
  );
  return drawsToFeed(tournaments, config.rosterIds, config.timeZone);
}

// src/lib/object-storage.ts
import { Readable } from "node:stream";
import { Storage } from "@google-cloud/storage";
var client = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: "http://127.0.0.1:1106/token",
    type: "external_account",
    credential_source: {
      url: "http://127.0.0.1:1106/credential",
      format: { type: "json", subject_token_field_name: "access_token" }
    },
    universe_domain: "googleapis.com"
  },
  projectId: ""
});
var ObjectNotFoundError = class extends Error {
};
var OBJECT_PATH_PATTERN = /^\/objects\/uploads\/(?:logos\/)?[0-9a-f-]+$/;
function parseStoragePath(value) {
  const parts = value.replace(/^\/+/, "").split("/");
  if (parts.length < 2) throw new Error("Invalid App Storage path");
  return { bucket: parts[0], object: parts.slice(1).join("/") };
}
var ObjectStorageService = class {
  getPrivateDir() {
    const value = process.env["PRIVATE_OBJECT_DIR"];
    if (!value) throw new Error("PRIVATE_OBJECT_DIR is not configured");
    return value.replace(/\/$/, "");
  }
  async getObject(objectPath) {
    if (!OBJECT_PATH_PATTERN.test(objectPath)) throw new ObjectNotFoundError();
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const file = client.bucket(bucket).file(`${privateObject}/${objectPath.slice("/objects/".length)}`);
    const [exists] = await file.exists();
    if (!exists) throw new ObjectNotFoundError();
    return file;
  }
  async saveObject(objectPath, bytes, contentType) {
    if (!OBJECT_PATH_PATTERN.test(objectPath)) throw new Error("Invalid object path");
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const file = client.bucket(bucket).file(`${privateObject}/${objectPath.slice("/objects/".length)}`);
    await file.save(bytes, { contentType, resumable: false });
  }
  async deleteObject(objectPath) {
    if (!OBJECT_PATH_PATTERN.test(objectPath)) throw new Error("Invalid object path");
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const file = client.bucket(bucket).file(`${privateObject}/${objectPath.slice("/objects/".length)}`);
    await file.delete({ ignoreNotFound: true });
  }
  async listVoiceNotesOlderThan(cutoff) {
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const uploadPrefix = `${privateObject}/uploads/`;
    const [files] = await client.bucket(bucket).getFiles({ prefix: uploadPrefix });
    return files.flatMap((file) => {
      const relativeName = file.name.slice(uploadPrefix.length);
      if (!/^[0-9a-f-]+$/.test(relativeName)) return [];
      const createdAt = Date.parse(file.metadata.timeCreated ?? "");
      if (!Number.isFinite(createdAt) || createdAt >= cutoff.getTime()) return [];
      return [`/objects/uploads/${relativeName}`];
    });
  }
  async stream(file, res) {
    const [metadata] = await file.getMetadata();
    res.setHeader("Content-Type", metadata.contentType || "application/octet-stream");
    res.setHeader("Cache-Control", "private, max-age=3600");
    if (metadata.size) res.setHeader("Content-Length", String(metadata.size));
    Readable.from(file.createReadStream()).pipe(res);
  }
};

// src/middlewares/requireStaff.ts
import { clerkClient, getAuth } from "@clerk/express";
function configuredStaffIds() {
  return new Set(
    (process.env["STAFF_CLERK_USER_IDS"] ?? "").split(",").map((id) => id.trim()).filter(Boolean)
  );
}
async function isApprovedClerkStaff(userId) {
  if (configuredStaffIds().has(userId)) return true;
  const user = await clerkClient.users.getUser(userId);
  return user.publicMetadata["role"] === "staff";
}
function createRequireStaff(dependencies = {
  getUserId: (req) => {
    const auth = getAuth(req);
    const claimUserId = auth.sessionClaims?.userId;
    return typeof claimUserId === "string" ? claimUserId : auth.userId;
  },
  isApprovedStaff: isApprovedClerkStaff
}) {
  return async (req, res, next) => {
    const userId = dependencies.getUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Staff sign-in required" });
      return;
    }
    try {
      if (!await dependencies.isApprovedStaff(userId)) {
        res.status(403).json({ error: "This account is not approved for staff access" });
        return;
      }
    } catch (error) {
      req.log?.error({ err: error, userId }, "Could not verify staff access");
      res.status(503).json({ error: "Staff access could not be verified" });
      return;
    }
    res.locals.staffUserId = userId;
    next();
  };
}
var requireStaff = createRequireStaff();

// src/routes/tracker.ts
var INITIAL_STATE = {
  players: [{ id: "cameron-stait", name: "Cameron Stait", shareToken: randomBytes(32).toString("base64url") }],
  coaches: [
    { id: "alex", name: "Alex" },
    { id: "narelle", name: "Narelle" },
    { id: "rob", name: "Rob" },
    { id: "jamie", name: "Jamie" },
    { id: "nico", name: "Nico" },
    { id: "unassigned", name: "Unassigned" }
  ],
  branding: { name: "StaitSquash", logoPath: null },
  matches: [
    {
      id: "match-1",
      externalId: null,
      playerId: "cameron-stait",
      opponent: "Ethan Cole",
      startsAt: "2026-09-16T14:30:00-04:00",
      endsAt: "2026-09-16T15:15:00-04:00",
      venue: "Arlen Specter US Squash Center",
      court: "Court 6",
      coachId: "alex",
      status: "upcoming",
      result: null,
      report: null
    },
    {
      id: "match-2",
      externalId: null,
      playerId: "cameron-stait",
      opponent: "Miles Brennan",
      startsAt: "2026-09-17T10:00:00-04:00",
      endsAt: "2026-09-17T10:45:00-04:00",
      venue: "Penn Squash Center",
      court: "Court 3",
      coachId: "unassigned",
      status: "upcoming",
      result: null,
      report: null
    },
    {
      id: "match-0",
      externalId: null,
      playerId: "cameron-stait",
      opponent: "Jordan Lee",
      startsAt: "2026-09-15T09:00:00-04:00",
      endsAt: "2026-09-15T09:42:00-04:00",
      venue: "Arlen Specter US Squash Center",
      court: "Court 2",
      coachId: "narelle",
      status: "completed",
      result: "Won 3\u20131",
      report: null
    }
  ],
  lastUpdatedAt: "2026-09-15T12:00:00-04:00",
  source: "sample",
  refreshHealth: {
    consecutiveFailures: 0,
    alertThreshold: 3,
    firstFailureAt: null,
    lastFailureAt: null,
    alertSentAt: null,
    failureAlertClaimedAt: null,
    pendingRecoveries: [],
    recoveryClaim: null
  }
};
function getAlertThreshold() {
  const configured = Number.parseInt(
    process.env["CLUB_LOCKER_ALERT_THRESHOLD"] ?? "",
    10
  );
  return Number.isInteger(configured) && configured > 0 ? configured : 3;
}
function parsePersistedTrackerState(value) {
  const result = PersistedTrackerState.safeParse(value);
  if (result.success) return result.data;
  const details = result.error.issues.map((issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`).join("; ");
  throw new Error(
    `Stored tracker snapshot is invalid. Repair or replace the "main" tracker_state record. Validation errors: ${details}`
  );
}
function normalizeState(state) {
  const alertThreshold = getAlertThreshold();
  const storedBranding = state.branding;
  const storedRefreshHealth = state.refreshHealth;
  return freezeTrackerState({
    players: state.players.map((player) => ({
      ...player,
      shareToken: player.shareToken ?? randomBytes(32).toString("base64url")
    })),
    coaches: state.coaches.map((coach) => ({ ...coach })),
    branding: storedBranding ? {
      name: storedBranding.name,
      logoPath: storedBranding.logoPath ?? null
    } : { name: "StaitSquash", logoPath: null },
    matches: state.matches.map((match) => ({
      ...match,
      report: match.report ? {
        ...match.report,
        observations: [...match.report.observations],
        audioPath: match.report.audioPath ?? null
      } : null
    })),
    lastUpdatedAt: state.lastUpdatedAt,
    source: state.source,
    refreshHealth: state.refreshHealth ? {
      ...state.refreshHealth,
      firstFailureAt: state.refreshHealth.firstFailureAt ?? (state.refreshHealth.consecutiveFailures > 0 ? state.refreshHealth.lastFailureAt : null),
      pendingRecoveries: storedRefreshHealth?.pendingRecoveries?.map((recovery) => ({
        ...recovery
      })) ?? (storedRefreshHealth?.pendingRecovery ? [{ ...storedRefreshHealth.pendingRecovery }] : []),
      failureAlertClaimedAt: storedRefreshHealth?.failureAlertClaimedAt ?? null,
      recoveryClaim: storedRefreshHealth?.recoveryClaim ? { ...storedRefreshHealth.recoveryClaim } : null
    } : {
      consecutiveFailures: 0,
      alertThreshold,
      firstFailureAt: null,
      lastFailureAt: null,
      alertSentAt: null,
      failureAlertClaimedAt: null,
      pendingRecoveries: [],
      recoveryClaim: null
    }
  });
}
async function getState() {
  const { db, trackerStateTable } = await import("@workspace/db");
  const [row] = await db.select().from(trackerStateTable).where(eq(trackerStateTable.id, "main"));
  if (row) {
    const parsed = parsePersistedTrackerState(row.data);
    const normalized = normalizeState(parsed);
    if (parsed.players.some((player) => !player.shareToken)) {
      await saveState(cloneTrackerState(normalized));
    }
    return normalized;
  }
  const [created] = await db.insert(trackerStateTable).values({ id: "main", data: INITIAL_STATE }).returning();
  return normalizeState(parsePersistedTrackerState(created.data));
}
async function saveState(state) {
  const { db, trackerStateTable } = await import("@workspace/db");
  await db.update(trackerStateTable).set({ data: state, updatedAt: /* @__PURE__ */ new Date() }).where(eq(trackerStateTable.id, "main"));
}
async function mutateStateInTransaction(operation) {
  const { db, trackerStateTable } = await import("@workspace/db");
  return db.transaction(async (transaction) => {
    await transaction.insert(trackerStateTable).values({ id: "main", data: INITIAL_STATE }).onConflictDoNothing();
    const [row] = await transaction.select().from(trackerStateTable).where(eq(trackerStateTable.id, "main")).for("update");
    if (!row) throw new Error("Tracker state row could not be locked");
    let current = normalizeState(parsePersistedTrackerState(row.data));
    return operation(
      async () => current,
      async (next) => {
        await transaction.update(trackerStateTable).set({ data: next, updatedAt: /* @__PURE__ */ new Date() }).where(eq(trackerStateTable.id, "main"));
        current = freezeTrackerState(cloneTrackerState(next));
      }
    );
  });
}
async function fetchClubLockerFeed() {
  const drawsConfig = drawsConfigFromEnv();
  if (drawsConfig) {
    return parseClubLockerFeed(await fetchClubLockerDraws(drawsConfig));
  }
  const url = process.env["CLUB_LOCKER_SCHEDULE_URL"];
  if (!url) {
    throw new Error(
      "Club Locker is not configured. Set CLUB_LOCKER_TOURNAMENT_IDS and CLUB_LOCKER_PLAYER_IDS"
    );
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1e4);
  try {
    const token = process.env["CLUB_LOCKER_API_TOKEN"];
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : void 0,
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`Club Locker returned HTTP ${response.status}`);
    }
    return parseClubLockerFeed(await response.json());
  } finally {
    clearTimeout(timeout);
  }
}
async function alertStaff(state, error) {
  const url = process.env["STAFF_ALERT_WEBHOOK_URL"];
  if (!url) {
    throw new Error("STAFF_ALERT_WEBHOOK_URL is not configured");
  }
  const message = error instanceof Error ? error.message : "Unknown Club Locker error";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1e4);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `StaitSquash alert: Club Locker schedule refresh has failed ${state.refreshHealth.consecutiveFailures} consecutive times. Latest error: ${message}`,
        event: "club-locker-refresh-failing",
        consecutiveFailures: state.refreshHealth.consecutiveFailures,
        lastFailureAt: state.refreshHealth.lastFailureAt
      }),
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`Staff alert webhook returned HTTP ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}
function formatDuration(durationMs) {
  const totalMinutes = Math.max(1, Math.round(durationMs / 6e4));
  if (totalMinutes < 60) {
    return `${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hour${hours === 1 ? "" : "s"}${minutes === 0 ? "" : ` ${minutes} minute${minutes === 1 ? "" : "s"}`}`;
}
var NOTIFICATION_CLAIM_LEASE_MS = 3e4;
function isActiveNotificationClaim(claimedAt) {
  if (!claimedAt) return false;
  const age = Date.now() - Date.parse(claimedAt);
  return Number.isFinite(age) && age >= 0 && age < NOTIFICATION_CLAIM_LEASE_MS;
}
function isLogoImage(bytes, contentType) {
  if (bytes.length === 0 || bytes.length > 5 * 1024 * 1024) return false;
  if (contentType === "image/png") {
    return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  }
  if (contentType === "image/jpeg") return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (contentType === "image/gif") return ["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString("ascii"));
  if (contentType === "image/webp") {
    return bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  }
  return false;
}
async function alertStaffOfRecovery(recovery) {
  const url = process.env["STAFF_ALERT_WEBHOOK_URL"];
  if (!url) throw new Error("STAFF_ALERT_WEBHOOK_URL is not configured");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1e4);
  try {
    const outageDuration = formatDuration(recovery.outageDurationMs);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `StaitSquash recovery: Club Locker schedule refresh is working again after ${outageDuration} and ${recovery.failedAttempts} failed attempt${recovery.failedAttempts === 1 ? "" : "s"}. The schedule is current.`,
        event: "club-locker-refresh-recovered",
        failedAttempts: recovery.failedAttempts,
        outageDurationMs: recovery.outageDurationMs,
        outageStartedAt: recovery.outageStartedAt,
        recoveredAt: recovery.recoveredAt
      }),
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`Staff alert webhook returned HTTP ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}
async function runDatabaseRecoveryTransaction(operation) {
  const {
    db,
    trackerRecoveryAuditTable,
    trackerStateBackupTable,
    trackerStateTable
  } = await import("@workspace/db");
  return db.transaction(
    async (transaction) => operation({
      loadForUpdate: async () => {
        const [row] = await transaction.select().from(trackerStateTable).where(eq(trackerStateTable.id, "main")).for("update");
        return row;
      },
      insertBackup: async (backup) => {
        await transaction.insert(trackerStateBackupTable).values(backup);
      },
      replaceState: async (replacement) => {
        await transaction.update(trackerStateTable).set({
          data: replacement.data,
          updatedAt: replacement.updatedAt
        }).where(eq(trackerStateTable.id, replacement.trackerStateId));
      },
      insertAudit: async (audit) => {
        await transaction.insert(trackerRecoveryAuditTable).values(audit);
      }
    })
  );
}
async function recoverInvalidTrackerState({
  actorId,
  reason
}, runTransaction = runDatabaseRecoveryTransaction) {
  return runTransaction(async (transaction) => {
    const row = await transaction.loadForUpdate();
    if (!row) return { outcome: "missing" };
    if (PersistedTrackerState.safeParse(row.data).success) {
      return { outcome: "valid" };
    }
    let rejectionDetails;
    try {
      parsePersistedTrackerState(row.data);
      throw new Error("Expected rejected tracker snapshot");
    } catch (error) {
      rejectionDetails = error instanceof Error ? error.message : "Unknown validation failure";
    }
    const backupId = randomUUID();
    const auditId = randomUUID();
    const recoveredAt = /* @__PURE__ */ new Date();
    await transaction.insertBackup({
      id: backupId,
      trackerStateId: row.id,
      rejectedData: row.data,
      rejectionDetails,
      createdAt: recoveredAt
    });
    await transaction.replaceState({
      trackerStateId: row.id,
      data: structuredClone(INITIAL_STATE),
      updatedAt: recoveredAt
    });
    await transaction.insertAudit({
      id: auditId,
      trackerStateId: row.id,
      backupId,
      actorId,
      reason,
      recoveredAt
    });
    return {
      outcome: "recovered",
      backupId,
      recoveredAt: recoveredAt.toISOString()
    };
  });
}
function trackerResponse(state) {
  const pendingRecoveryNotices = state.refreshHealth.pendingRecoveries.length - (isActiveNotificationClaim(state.refreshHealth.recoveryClaim?.claimedAt) ? 1 : 0);
  return {
    ...state,
    branding: state.branding ?? { name: "StaitSquash", logoPath: null },
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveryNotices: Math.max(0, pendingRecoveryNotices)
    }
  };
}
function trackerHealthResponse(state) {
  const pendingRecoveryNotices = state.refreshHealth.pendingRecoveries.length - (isActiveNotificationClaim(state.refreshHealth.recoveryClaim?.claimedAt) ? 1 : 0);
  return {
    ...state.refreshHealth,
    pendingRecoveryNotices: Math.max(0, pendingRecoveryNotices)
  };
}
function isObjectPathReferenced(state, objectPath) {
  return (state.branding?.logoPath ?? null) === objectPath || state.matches.some((match) => match.report?.audioPath === objectPath);
}
function createTrackerRouter(dependencies = {
  getState,
  saveState,
  mutateState: mutateStateInTransaction,
  recoverInvalidState: recoverInvalidTrackerState
}) {
  const router = Router();
  const objectStorage = dependencies.objectStorage ?? new ObjectStorageService();
  const authorizeStaff = dependencies.authorizeStaff ?? requireStaff;
  const { getState: loadState, saveState: persistState } = dependencies;
  const recoverRejectedState = dependencies.recoverInvalidState ?? recoverInvalidTrackerState;
  let mutationQueue = Promise.resolve();
  const VOICE_NOTE_CLEANUP_GRACE_MS = 24 * 60 * 60 * 1e3;
  function serializeMutation(operation) {
    const result = mutationQueue.then(operation, operation);
    mutationQueue = result.then(
      () => void 0,
      () => void 0
    );
    return result;
  }
  function coordinateMutation(operation) {
    if (dependencies.mutateState) return dependencies.mutateState(operation);
    return serializeMutation(() => operation(loadState, persistState));
  }
  async function cleanupUnattachedVoiceNotes(req) {
    if (!objectStorage.listVoiceNotesOlderThan) return;
    let candidates;
    try {
      candidates = await objectStorage.listVoiceNotesOlderThan(
        new Date(Date.now() - VOICE_NOTE_CLEANUP_GRACE_MS)
      );
    } catch (error) {
      req.log?.error({ err: error }, "Could not find unfinished coach voice notes");
      return;
    }
    for (const objectPath of candidates) {
      try {
        await coordinateMutation(async (loadLockedState) => {
          if (isObjectPathReferenced(await loadLockedState(), objectPath)) return;
          await objectStorage.deleteObject(objectPath);
        });
      } catch (error) {
        req.log?.error(
          { err: error, objectPath },
          "Could not remove unfinished coach voice note"
        );
      }
    }
  }
  router.get("/tracker", authorizeStaff, async (_req, res) => {
    res.json(GetTrackerResponse.parse(trackerResponse(await loadState())));
  });
  router.get("/tracker/health", authorizeStaff, async (_req, res) => {
    res.json(GetTrackerHealthResponse.parse(trackerHealthResponse(await loadState())));
  });
  router.post("/tracker/recover", authorizeStaff, async (req, res) => {
    const reason = typeof req.body?.reason === "string" ? req.body.reason.trim() : "";
    if (reason.length < 10 || reason.length > 500) {
      res.status(400).json({
        error: "Explain the recovery reason in 10 to 500 characters"
      });
      return;
    }
    const actorId = res.locals.staffUserId;
    if (typeof actorId !== "string" || actorId.length === 0) {
      req.log?.error("Approved staff identity was unavailable during recovery");
      res.status(500).json({ error: "Recovery could not identify the staff member" });
      return;
    }
    let result;
    try {
      result = await recoverRejectedState({ actorId, reason });
    } catch (error) {
      req.log?.error(
        { err: error, actorId },
        "Could not back up and reset rejected tracker snapshot"
      );
      res.status(503).json({
        error: "Tracker recovery could not be completed safely"
      });
      return;
    }
    if (result.outcome === "valid") {
      res.status(409).json({
        error: "Recovery refused because the current tracker snapshot is valid"
      });
      return;
    }
    if (result.outcome === "missing") {
      res.status(409).json({
        error: "Recovery refused because there is no rejected tracker snapshot"
      });
      return;
    }
    req.log?.info(
      { actorId, backupId: result.backupId, reason },
      "Rejected tracker snapshot backed up and reset"
    );
    res.json(result);
  });
  router.get("/players/:shareToken/tracker", async (req, res) => {
    const params = GetPlayerTrackerParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    const state = await loadState();
    const player = state.players.find((item) => item.shareToken === params.data.shareToken);
    if (!player) {
      res.status(404).json({ error: "Player link not found" });
      return;
    }
    const matches = state.matches.filter((match) => match.playerId === player.id);
    const coachIds = new Set(matches.map((match) => match.coachId));
    res.json(GetPlayerTrackerResponse.parse({
      player: { id: player.id, name: player.name },
      matches,
      coaches: state.coaches.filter((coach) => coachIds.has(coach.id)),
      branding: state.branding,
      lastUpdatedAt: state.lastUpdatedAt
    }));
  });
  router.post("/tracker/players/:playerId/share-token", authorizeStaff, async (req, res) => {
    const params = RotatePlayerShareTokenParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
      const player = state.players.find((item) => item.id === params.data.playerId);
      if (!player) {
        res.status(404).json({ error: "Player not found" });
        return;
      }
      player.shareToken = randomBytes(32).toString("base64url");
      await saveLockedState(state);
      res.json(RotatePlayerShareTokenResponse.parse(player));
    });
  });
  router.put("/tracker/settings", authorizeStaff, async (req, res) => {
    const body = SaveTrackerSettingsBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }
    const replacedLogoPath = await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
      const previousLogoPath = state.branding?.logoPath ?? null;
      const coaches = [...body.data.coaches];
      if (!coaches.some((coach) => coach.id === "unassigned")) {
        coaches.push({ id: "unassigned", name: "Unassigned" });
      }
      const coachIds = new Set(coaches.map((coach) => coach.id));
      state.coaches = coaches;
      state.matches = state.matches.map((match) => ({
        ...match,
        coachId: coachIds.has(match.coachId) ? match.coachId : "unassigned"
      }));
      state.branding = body.data.branding;
      state.lastUpdatedAt = (/* @__PURE__ */ new Date()).toISOString();
      await saveLockedState(state);
      res.json(SaveTrackerSettingsResponse.parse(trackerResponse(state)));
      return previousLogoPath && previousLogoPath !== state.branding.logoPath ? previousLogoPath : null;
    });
    if (replacedLogoPath) {
      await coordinateMutation(async (loadLockedState) => {
        const currentState = await loadLockedState();
        if (isObjectPathReferenced(currentState, replacedLogoPath)) return;
        try {
          await objectStorage.deleteObject(replacedLogoPath);
        } catch (error) {
          req.log.error({ err: error, objectPath: replacedLogoPath }, "Could not delete replaced tracker logo");
        }
      });
    }
  });
  router.post(
    "/tracker/logo",
    authorizeStaff,
    express.raw({ type: ["image/png", "image/jpeg", "image/webp", "image/gif"], limit: "5mb" }),
    async (req, res) => {
      if (!Buffer.isBuffer(req.body) || !isLogoImage(req.body, req.get("content-type") ?? "")) {
        res.status(400).json({ error: "Choose a valid PNG, JPG, WebP, or GIF image up to 5 MB" });
        return;
      }
      try {
        const objectPath = `/objects/uploads/logos/${randomUUID()}`;
        await objectStorage.saveObject(objectPath, req.body, req.get("content-type"));
        res.json(UploadTrackerLogoResponse.parse({ objectPath }));
      } catch (error) {
        req.log.error({ err: error }, "Could not store tracker logo");
        res.status(500).json({ error: "Could not store tracker logo" });
      }
    }
  );
  router.delete("/tracker/logo", authorizeStaff, async (req, res) => {
    const body = DeleteUnusedTrackerLogoBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }
    await coordinateMutation(async (loadLockedState) => {
      const state = await loadLockedState();
      if (!isObjectPathReferenced(state, body.data.objectPath)) {
        await objectStorage.deleteObject(body.data.objectPath);
      }
      res.status(204).end();
    });
  });
  router.patch("/matches/:matchId", authorizeStaff, async (req, res) => {
    const params = UpdateMatchParams.safeParse(req.params);
    const body = UpdateMatchBody.safeParse(req.body);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }
    await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
      const match = state.matches.find((item) => item.id === params.data.matchId);
      if (!match) {
        res.status(404).json({ error: "Match not found" });
        return;
      }
      Object.assign(match, body.data);
      state.lastUpdatedAt = (/* @__PURE__ */ new Date()).toISOString();
      await saveLockedState(state);
      res.json(UpdateMatchResponse.parse(match));
    });
  });
  router.put("/matches/:matchId/report", authorizeStaff, async (req, res) => {
    const params = SaveCoachReportParams.safeParse(req.params);
    const body = SaveCoachReportBody.safeParse(req.body);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }
    const saved = await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
      const match = state.matches.find((item) => item.id === params.data.matchId);
      if (!match) {
        res.status(404).json({ error: "Match not found" });
        return null;
      }
      if (match.status !== "completed") {
        res.status(400).json({ error: "Reports can only be added to completed matches" });
        return null;
      }
      const previousAudioPath = match.report?.audioPath ?? null;
      const nextAudioPath = body.data.audioPath ?? previousAudioPath;
      if (nextAudioPath && nextAudioPath !== previousAudioPath) {
        try {
          await objectStorage.getObject(nextAudioPath);
        } catch (error) {
          req.log.error(
            { err: error, objectPath: nextAudioPath, matchId: params.data.matchId },
            "Could not verify replacement coach voice note"
          );
          res.status(400).json({ error: "The replacement voice note is no longer available" });
          return null;
        }
      }
      match.report = {
        matchId: match.id,
        observations: body.data.observations,
        transcript: body.data.transcript ?? null,
        audioPath: body.data.audioPath ?? match.report?.audioPath ?? null,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      state.lastUpdatedAt = (/* @__PURE__ */ new Date()).toISOString();
      await saveLockedState(state);
      return {
        report: SaveCoachReportResponse.parse(match.report),
        replacedAudioPath: previousAudioPath && previousAudioPath !== match.report.audioPath ? previousAudioPath : null
      };
    });
    if (!saved) return;
    if (saved.replacedAudioPath) {
      await coordinateMutation(async (loadLockedState) => {
        const currentState = await loadLockedState();
        const isStillReferenced = currentState.matches.some(
          (match) => match.report?.audioPath === saved.replacedAudioPath
        );
        if (isStillReferenced) return;
        try {
          await objectStorage.deleteObject(saved.replacedAudioPath);
        } catch (error) {
          req.log.error(
            { err: error, objectPath: saved.replacedAudioPath, matchId: params.data.matchId },
            "Could not remove replaced coach voice note"
          );
        }
      });
    }
    res.json(saved.report);
  });
  router.post(
    "/matches/:matchId/report/audio",
    authorizeStaff,
    express.raw({ type: ["audio/webm", "audio/ogg", "audio/mp4"], limit: "25mb" }),
    async (req, res) => {
      const params = UploadCoachReportAudioParams.safeParse(req.params);
      if (!params.success) {
        res.status(400).json({ error: params.error.message });
        return;
      }
      if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
        res.status(400).json({ error: "Record a voice note before uploading" });
        return;
      }
      const state = await loadState();
      const match = state.matches.find((item) => item.id === params.data.matchId);
      if (!match) {
        res.status(404).json({ error: "Match not found" });
        return;
      }
      if (match.status !== "completed") {
        res.status(400).json({ error: "Voice notes can only be added to completed matches" });
        return;
      }
      try {
        const objectPath = `/objects/uploads/${randomUUID()}`;
        await objectStorage.saveObject(objectPath, req.body, req.get("content-type"));
        res.json(UploadCoachReportAudioResponse.parse({ objectPath }));
        await cleanupUnattachedVoiceNotes(req);
      } catch (error) {
        if (res.headersSent) return;
        req.log.error({ err: error }, "Could not store coach voice note");
        res.status(500).json({ error: "Could not store coach voice note" });
      }
    }
  );
  router.post("/tracker/refresh", authorizeStaff, async (req, res) => {
    const alertThreshold = getAlertThreshold();
    const respondToFailure = async (error) => {
      const failure = await coordinateMutation(async (loadLockedState, saveLockedState) => {
        const failedState = recordRefreshFailure(
          await loadLockedState(),
          alertThreshold
        );
        const shouldAlert = failedState.refreshHealth.consecutiveFailures >= alertThreshold && failedState.refreshHealth.alertSentAt === null && !isActiveNotificationClaim(
          failedState.refreshHealth.failureAlertClaimedAt
        );
        const alertClaim = shouldAlert ? (/* @__PURE__ */ new Date()).toISOString() : null;
        if (alertClaim) {
          failedState.refreshHealth.failureAlertClaimedAt = alertClaim;
        }
        await saveLockedState(failedState);
        return { failedState, alertClaim };
      });
      req.log.warn(
        {
          err: error,
          consecutiveFailures: failure.failedState.refreshHealth.consecutiveFailures,
          alertThreshold
        },
        "Club Locker refresh failed"
      );
      if (failure.alertClaim) {
        try {
          await alertStaff(failure.failedState, error);
          await coordinateMutation(async (loadLockedState, saveLockedState) => {
            const current = cloneTrackerState(await loadLockedState());
            if (current.refreshHealth.failureAlertClaimedAt === failure.alertClaim) {
              current.refreshHealth.alertSentAt = (/* @__PURE__ */ new Date()).toISOString();
              current.refreshHealth.failureAlertClaimedAt = null;
              await saveLockedState(current);
            }
          });
          req.log.error(
            {
              consecutiveFailures: failure.failedState.refreshHealth.consecutiveFailures
            },
            "Staff alerted about repeated Club Locker refresh failures"
          );
        } catch (alertError) {
          await coordinateMutation(async (loadLockedState, saveLockedState) => {
            const current = cloneTrackerState(await loadLockedState());
            if (current.refreshHealth.failureAlertClaimedAt === failure.alertClaim) {
              current.refreshHealth.failureAlertClaimedAt = null;
              await saveLockedState(current);
            }
          });
          req.log.error(
            { err: alertError },
            "Could not alert staff about refresh failures"
          );
        }
      }
      const message = error instanceof Error ? error.message : "Unknown Club Locker error";
      res.status(502).json({ error: `Refresh failed: ${message}` });
    };
    let feed;
    try {
      feed = await fetchClubLockerFeed();
    } catch (error) {
      await respondToFailure(error);
      return;
    }
    let notificationState;
    try {
      notificationState = await coordinateMutation(
        async (loadLockedState, saveLockedState) => {
          const current = await loadLockedState();
          const merged = mergeClubLockerFeed(current, feed);
          const state = isActiveNotificationClaim(
            current.refreshHealth.failureAlertClaimedAt
          ) ? merged : clearRefreshFailures(merged, alertThreshold);
          await saveLockedState(state);
          return state;
        }
      );
    } catch (error) {
      await respondToFailure(error);
      return;
    }
    while (true) {
      const claimed = await coordinateMutation(
        async (loadLockedState, saveLockedState) => {
          const current = await loadLockedState();
          const recovery = current.refreshHealth.pendingRecoveries[0];
          if (!recovery || current.refreshHealth.consecutiveFailures > 0 || isActiveNotificationClaim(
            current.refreshHealth.recoveryClaim?.claimedAt
          )) {
            return null;
          }
          const next = cloneTrackerState(current);
          const claimedAt = (/* @__PURE__ */ new Date()).toISOString();
          next.refreshHealth.recoveryClaim = {
            outageStartedAt: recovery.outageStartedAt,
            recoveredAt: recovery.recoveredAt,
            claimedAt
          };
          await saveLockedState(next);
          return { recovery: { ...recovery }, claimedAt };
        }
      );
      if (!claimed) break;
      try {
        await alertStaffOfRecovery(claimed.recovery);
        await coordinateMutation(async (loadLockedState, saveLockedState) => {
          const current = cloneTrackerState(await loadLockedState());
          if (current.refreshHealth.recoveryClaim?.claimedAt !== claimed.claimedAt) {
            return;
          }
          const index = current.refreshHealth.pendingRecoveries.findIndex(
            (item) => item.outageStartedAt === claimed.recovery.outageStartedAt && item.recoveredAt === claimed.recovery.recoveredAt
          );
          if (index >= 0) current.refreshHealth.pendingRecoveries.splice(index, 1);
          current.refreshHealth.recoveryClaim = null;
          await saveLockedState(current);
        });
        req.log.info(
          {
            failedAttempts: claimed.recovery.failedAttempts,
            outageDurationMs: claimed.recovery.outageDurationMs
          },
          "Staff alerted that Club Locker refresh recovered"
        );
      } catch (alertError) {
        await coordinateMutation(async (loadLockedState, saveLockedState) => {
          const current = cloneTrackerState(await loadLockedState());
          if (current.refreshHealth.recoveryClaim?.claimedAt === claimed.claimedAt) {
            current.refreshHealth.recoveryClaim = null;
            await saveLockedState(current);
          }
        });
        req.log.error(
          { err: alertError },
          "Could not alert staff about refresh recovery"
        );
        break;
      }
    }
    notificationState = await loadState();
    res.json(
      RefreshTrackerResponse.parse(trackerResponse(notificationState))
    );
  });
  return router;
}
var tracker_default = createTrackerRouter();

// src/middlewares/clerkProxyMiddleware.ts
import { createProxyMiddleware } from "http-proxy-middleware";
function normalizeHost(value) {
  return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}
function allowedClerkHosts() {
  const configured = [
    ...(process.env.REPLIT_DOMAINS ?? "").split(","),
    process.env.REPLIT_DEV_DOMAIN ?? ""
  ];
  if (process.env.NODE_ENV !== "production") {
    configured.push("localhost", "127.0.0.1");
  }
  return new Set(configured.map(normalizeHost).filter(Boolean));
}
function getClerkProxyHost(req) {
  const forwarded = req.headers["x-forwarded-host"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const candidates = [
    raw?.split(",")[0],
    req.headers.host
  ];
  const allowed = allowedClerkHosts();
  return candidates.map((host) => host ? normalizeHost(host) : "").find((host) => allowed.has(host));
}

// src/routes/tracker.test.ts
var healthyState = () => ({
  players: [{ id: "player-1", name: "Player One", shareToken: "a".repeat(43) }],
  coaches: [{ id: "coach-1", name: "Coach One" }],
  branding: { name: "StaitSquash", logoPath: null },
  matches: [],
  lastUpdatedAt: "2026-09-16T12:00:00.000Z",
  source: "club-locker",
  refreshHealth: {
    consecutiveFailures: 0,
    alertThreshold: 1,
    firstFailureAt: null,
    lastFailureAt: null,
    alertSentAt: null,
    failureAlertClaimedAt: null,
    pendingRecoveries: [],
    recoveryClaim: null
  }
});
test("logo validation checks actual bytes rather than claimed MIME type", () => {
  assert.equal(isLogoImage(Buffer.from("not an image"), "image/png"), false);
  assert.equal(
    isLogoImage(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), "image/png"),
    true
  );
  assert.equal(isLogoImage(Buffer.alloc(5 * 1024 * 1024 + 1), "image/png"), false);
});
test("staff routes distinguish anonymous, unapproved, and approved accounts", async () => {
  const cases = [
    [null, false, 401],
    ["user_unapproved", false, 403],
    ["user_staff", true, 200]
  ];
  for (const [userId, approved, expectedStatus] of cases) {
    const state = healthyState();
    const app = express2();
    app.use(express2.json());
    app.use(createTrackerRouter({
      getState: async () => structuredClone(state),
      saveState: async () => void 0,
      authorizeStaff: createRequireStaff({
        getUserId: () => userId,
        isApprovedStaff: async (candidate) => candidate === "user_staff" && approved
      })
    }));
    const server = app.listen(0, "127.0.0.1");
    await new Promise((resolve, reject) => {
      server.once("listening", resolve);
      server.once("error", reject);
    });
    const address = server.address();
    assert(address && typeof address !== "string");
    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/tracker`);
      assert.equal(response.status, expectedStatus);
    } finally {
      await new Promise(
        (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
      );
    }
  }
});
test("tracker recovery requires approved staff and records their identity", async () => {
  const calls = [];
  for (const [userId, approved, expectedStatus] of [
    [null, false, 401],
    ["user_unapproved", false, 403],
    ["user_staff", true, 200]
  ]) {
    const app = express2();
    app.use(express2.json());
    app.use(createTrackerRouter({
      getState: async () => healthyState(),
      saveState: async () => void 0,
      authorizeStaff: createRequireStaff({
        getUserId: () => userId,
        isApprovedStaff: async () => approved
      }),
      recoverInvalidState: async (request) => {
        calls.push(request);
        return {
          outcome: "recovered",
          backupId: "backup-1",
          recoveredAt: "2026-09-16T12:00:00.000Z"
        };
      }
    }));
    const server = app.listen(0, "127.0.0.1");
    await new Promise((resolve) => server.once("listening", resolve));
    const address = server.address();
    assert(address && typeof address !== "string");
    try {
      const response = await fetch(
        `http://127.0.0.1:${address.port}/tracker/recover`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ reason: "Restore service after validation failure" })
        }
      );
      assert.equal(response.status, expectedStatus);
    } finally {
      await new Promise(
        (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
      );
    }
  }
  assert.deepEqual(calls, [{
    actorId: "user_staff",
    reason: "Restore service after validation failure"
  }]);
});
test("tracker recovery validates its audit reason and refuses valid snapshots", async () => {
  let recoveryCalls = 0;
  const app = express2();
  app.use(express2.json());
  app.use((req, _res, next) => {
    req.log = { info() {
    }, warn() {
    }, error() {
    } };
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => healthyState(),
    saveState: async () => void 0,
    authorizeStaff: (_req, res, next) => {
      res.locals.staffUserId = "user_staff";
      next();
    },
    recoverInvalidState: async () => {
      recoveryCalls += 1;
      return { outcome: "valid" };
    }
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const base = `http://127.0.0.1:${address.port}/tracker/recover`;
    const invalidReason = await fetch(base, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reason: "too short" })
    });
    assert.equal(invalidReason.status, 400);
    assert.equal(recoveryCalls, 0);
    const validSnapshot = await fetch(base, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reason: "Operator confirmed rejected saved data" })
    });
    assert.equal(validSnapshot.status, 409);
    assert.match(
      String((await validSnapshot.json()).error),
      /current tracker snapshot is valid/
    );
    assert.equal(recoveryCalls, 1);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("tracker recovery preserves the rejected snapshot before reset and audit", async () => {
  const storage = {
    row: {
      id: "main",
      data: {
        players: "rejected",
        diagnosticMarker: "keep-for-investigation"
      }
    },
    backups: [],
    audits: []
  };
  const runTransaction = async (operation) => {
    const working = structuredClone(storage);
    const result2 = await operation({
      loadForUpdate: async () => working.row,
      insertBackup: async (backup) => {
        working.backups.push({
          id: backup.id,
          rejectedData: structuredClone(backup.rejectedData),
          rejectionDetails: backup.rejectionDetails
        });
      },
      replaceState: async (replacement) => {
        assert(working.row);
        working.row.data = structuredClone(replacement.data);
      },
      insertAudit: async (audit) => {
        working.audits.push({
          backupId: audit.backupId,
          actorId: audit.actorId,
          reason: audit.reason
        });
      }
    });
    Object.assign(storage, working);
    return result2;
  };
  const result = await recoverInvalidTrackerState({
    actorId: "user_staff",
    reason: "Snapshot validation blocked staff access"
  }, runTransaction);
  assert.equal(result.outcome, "recovered");
  assert.equal(storage.backups.length, 1);
  assert.deepEqual(storage.backups[0]?.rejectedData, {
    players: "rejected",
    diagnosticMarker: "keep-for-investigation"
  });
  assert.match(
    storage.backups[0]?.rejectionDetails ?? "",
    /Stored tracker snapshot is invalid/
  );
  assert(storage.row);
  assert.doesNotThrow(() => parsePersistedTrackerState(storage.row.data));
  assert.deepEqual(storage.audits, [{
    backupId: result.outcome === "recovered" ? result.backupId : "unreachable",
    actorId: "user_staff",
    reason: "Snapshot validation blocked staff access"
  }]);
});
test("tracker recovery transaction rolls back if audit persistence fails", async () => {
  const originalData = {
    players: "rejected",
    diagnosticMarker: "must-survive"
  };
  const storage = {
    row: { id: "main", data: structuredClone(originalData) },
    backupCount: 0
  };
  const runTransaction = async (operation) => {
    const working = structuredClone(storage);
    const result = await operation({
      loadForUpdate: async () => working.row,
      insertBackup: async () => {
        working.backupCount += 1;
      },
      replaceState: async (replacement) => {
        working.row.data = structuredClone(replacement.data);
      },
      insertAudit: async () => {
        throw new Error("audit unavailable");
      }
    });
    Object.assign(storage, working);
    return result;
  };
  await assert.rejects(
    recoverInvalidTrackerState({
      actorId: "user_staff",
      reason: "Snapshot validation blocked staff access"
    }, runTransaction),
    /audit unavailable/
  );
  assert.deepEqual(storage.row.data, originalData);
  assert.equal(storage.backupCount, 0);
});
test("tracker recovery core refuses valid and missing locked snapshots", async () => {
  for (const [row, expected] of [
    [{ id: "main", data: healthyState() }, "valid"],
    [void 0, "missing"]
  ]) {
    let writeCount = 0;
    const runTransaction = async (operation) => operation({
      loadForUpdate: async () => row,
      insertBackup: async () => {
        writeCount += 1;
      },
      replaceState: async () => {
        writeCount += 1;
      },
      insertAudit: async () => {
        writeCount += 1;
      }
    });
    const result = await recoverInvalidTrackerState({
      actorId: "user_staff",
      reason: "Snapshot validation blocked staff access"
    }, runTransaction);
    assert.equal(result.outcome, expected);
    assert.equal(writeCount, 0);
  }
});
test("tracker recovery returns a safe response when its transaction fails", async () => {
  const errors = [];
  const app = express2();
  app.use(express2.json());
  app.use((req, _res, next) => {
    req.log = {
      info() {
      },
      warn() {
      },
      error(value) {
        errors.push(value);
      }
    };
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => healthyState(),
    saveState: async () => void 0,
    authorizeStaff: (_req, res, next) => {
      res.locals.staffUserId = "user_staff";
      next();
    },
    recoverInvalidState: async () => {
      throw new Error("database unavailable");
    }
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/tracker/recover`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          reason: "Snapshot validation blocked staff access"
        })
      }
    );
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "Tracker recovery could not be completed safely"
    });
    assert.equal(errors.length, 1);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("Clerk proxy ignores spoofed forwarded hosts", () => {
  const previousDomains = process.env.REPLIT_DOMAINS;
  const previousNodeEnvironment = process.env.NODE_ENV;
  process.env.REPLIT_DOMAINS = "tracker.example.com";
  process.env.NODE_ENV = "production";
  try {
    assert.equal(
      getClerkProxyHost({
        headers: {
          host: "tracker.example.com",
          "x-forwarded-host": "attacker.example"
        }
      }),
      "tracker.example.com"
    );
    assert.equal(
      getClerkProxyHost({
        headers: {
          host: "attacker.example",
          "x-forwarded-host": "attacker.example"
        }
      }),
      void 0
    );
  } finally {
    if (previousDomains === void 0) delete process.env.REPLIT_DOMAINS;
    else process.env.REPLIT_DOMAINS = previousDomains;
    if (previousNodeEnvironment === void 0) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnvironment;
  }
});
test("persisted tracker validation identifies malformed nested records", () => {
  const validState = healthyState();
  validState.branding = { name: "StaitSquash", logoPath: null };
  validState.matches = [{
    id: "match-1",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "match-1",
      observations: ["Strong length.", "Recovered well.", "Stayed composed."],
      transcript: null,
      audioPath: null,
      updatedAt: "2026-09-16T11:00:00.000Z"
    }
  }];
  validState.refreshHealth.pendingRecoveries = [{
    failedAttempts: 2,
    outageStartedAt: "2026-09-16T09:00:00.000Z",
    recoveredAt: "2026-09-16T09:10:00.000Z",
    outageDurationMs: 6e5
  }];
  const corruptions = [
    ["match", (snapshot) => {
      snapshot.matches[0].startsAt = "not-a-date";
    }, /matches\.0\.startsAt/],
    ["report", (snapshot) => {
      snapshot.matches[0].report.observations = "not-an-array";
    }, /matches\.0\.report\.observations/],
    ["person", (snapshot) => {
      snapshot.players[0].name = 42;
    }, /players\.0\.name/],
    ["branding", (snapshot) => {
      snapshot.branding.logoPath = "/unsafe/logo.png";
    }, /branding\.logoPath/],
    ["refresh health", (snapshot) => {
      snapshot.refreshHealth.consecutiveFailures = -1;
    }, /refreshHealth\.consecutiveFailures/],
    ["recovery", (snapshot) => {
      snapshot.refreshHealth.pendingRecoveries[0].failedAttempts = 0;
    }, /refreshHealth\.pendingRecoveries\.0\.failedAttempts/]
  ];
  for (const [name, corrupt, expectedPath] of corruptions) {
    const snapshot = structuredClone(validState);
    corrupt(snapshot);
    assert.throws(
      () => parsePersistedTrackerState(snapshot),
      (error) => {
        assert.match(error.message, /Stored tracker snapshot is invalid/);
        assert.match(error.message, /Repair or replace the "main" tracker_state record/);
        assert.match(error.message, expectedPath, name);
        return true;
      }
    );
  }
});
test("persisted tracker validation identifies inconsistent related records", () => {
  const validState = healthyState();
  validState.matches = [{
    id: "match-1",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "match-1",
      observations: ["Strong length.", "Recovered well.", "Stayed composed."],
      transcript: null,
      audioPath: null,
      updatedAt: "2026-09-16T11:00:00.000Z"
    }
  }];
  const inconsistencies = [
    ["missing player", (snapshot) => {
      snapshot.matches[0].playerId = "missing-player";
    }, /matches\.0\.playerId/, /Match "match-1" references missing player "missing-player"/],
    ["missing coach", (snapshot) => {
      snapshot.matches[0].coachId = "missing-coach";
    }, /matches\.0\.coachId/, /Match "match-1" references missing coach "missing-coach"/],
    ["mismatched report", (snapshot) => {
      snapshot.matches[0].report.matchId = "match-2";
    }, /matches\.0\.report\.matchId/, /Report matchId "match-2" does not match containing match "match-1"/],
    ["end before start", (snapshot) => {
      snapshot.matches[0].endsAt = "2026-09-16T09:59:59.000Z";
    }, /matches\.0\.endsAt/, /Match "match-1" endsAt must be after startsAt/],
    ["end equal to start", (snapshot) => {
      snapshot.matches[0].endsAt = snapshot.matches[0].startsAt;
    }, /matches\.0\.endsAt/, /Match "match-1" endsAt must be after startsAt/]
  ];
  for (const [name, corrupt, expectedPath, expectedConflict] of inconsistencies) {
    const snapshot = structuredClone(validState);
    corrupt(snapshot);
    assert.throws(
      () => parsePersistedTrackerState(snapshot),
      (error) => {
        assert.match(error.message, /Stored tracker snapshot is invalid/);
        assert.match(error.message, expectedPath, name);
        assert.match(error.message, expectedConflict, name);
        return true;
      }
    );
  }
});
async function withTrackerServer(state, run) {
  const app = express2();
  app.use(express2.json());
  app.use((req, _res, next) => {
    req.log = {
      info() {
      },
      warn() {
      },
      error() {
      }
    };
    next();
  });
  app.use(
    createTrackerRouter({
      getState: async () => structuredClone(state),
      saveState: async (next) => {
        state = structuredClone(next);
      },
      authorizeStaff: (_req, _res, next) => next()
    })
  );
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
}
test("player tracker returns only the requested player's matches and assigned coaches", async () => {
  const state = healthyState();
  state.players = [
    { id: "player-1", name: "Player One", shareToken: "a".repeat(43) },
    { id: "player-2", name: "Player Two", shareToken: "b".repeat(43) }
  ];
  state.coaches = [
    { id: "coach-1", name: "Coach One" },
    { id: "coach-2", name: "Coach Two" },
    { id: "coach-private", name: "Private Coach" }
  ];
  state.branding = { name: "StaitSquash", logoPath: null };
  state.matches = [
    {
      id: "player-1-match",
      externalId: null,
      playerId: "player-1",
      opponent: "Visible Opponent",
      startsAt: "2026-09-17T10:00:00.000Z",
      endsAt: "2026-09-17T10:45:00.000Z",
      venue: "Visible Venue",
      court: "1",
      coachId: "coach-1",
      status: "upcoming",
      result: null,
      report: null
    },
    {
      id: "player-1-second-match",
      externalId: null,
      playerId: "player-1",
      opponent: "Second Visible Opponent",
      startsAt: "2026-09-18T10:00:00.000Z",
      endsAt: "2026-09-18T10:45:00.000Z",
      venue: "Visible Venue",
      court: "2",
      coachId: "coach-2",
      status: "upcoming",
      result: null,
      report: null
    },
    {
      id: "player-2-private-match",
      externalId: null,
      playerId: "player-2",
      opponent: "Private Opponent",
      startsAt: "2026-09-17T11:00:00.000Z",
      endsAt: "2026-09-17T11:45:00.000Z",
      venue: "Private Venue",
      court: "3",
      coachId: "coach-private",
      status: "upcoming",
      result: null,
      report: null
    }
  ];
  await withTrackerServer(state, async (url) => {
    const response = await fetch(`${url}/players/${"a".repeat(43)}/tracker`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.player.id, "player-1");
    assert.deepEqual(body.matches.map((match) => match.id), [
      "player-1-match",
      "player-1-second-match"
    ]);
    assert.ok(body.matches.every((match) => match.playerId === "player-1"));
    assert.deepEqual(body.coaches.map((coach) => coach.id), ["coach-1", "coach-2"]);
    assert.equal(body.players, void 0);
    assert.doesNotMatch(JSON.stringify(body), /shareToken/);
    assert.doesNotMatch(JSON.stringify(body), /Player Two|Private Opponent|Private Coach|Private Venue/);
  });
});
test("unknown player tracker links return a safe not-found response", async () => {
  await withTrackerServer(healthyState(), async (url) => {
    const response = await fetch(`${url}/players/${"z".repeat(43)}/tracker`);
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: "Player link not found" });
  });
});
test("rotating a player share token immediately revokes the old link", async () => {
  const state = healthyState();
  const oldToken = state.players[0].shareToken;
  await withTrackerServer(state, async (url) => {
    const rotatedResponse = await fetch(
      `${url}/tracker/players/player-1/share-token`,
      { method: "POST" }
    );
    assert.equal(rotatedResponse.status, 200);
    const rotatedPlayer = await rotatedResponse.json();
    assert.equal(rotatedPlayer.id, "player-1");
    assert.notEqual(rotatedPlayer.shareToken, oldToken);
    assert.ok(rotatedPlayer.shareToken.length >= 32);
    const oldLinkResponse = await fetch(`${url}/players/${oldToken}/tracker`);
    assert.equal(oldLinkResponse.status, 404);
    const newLinkResponse = await fetch(
      `${url}/players/${rotatedPlayer.shareToken}/tracker`
    );
    assert.equal(newLinkResponse.status, 200);
  });
});
test("refresh route sends matching failure and recovery webhook payloads once", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    threshold: process.env["CLUB_LOCKER_ALERT_THRESHOLD"],
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"]
  };
  const webhookPayloads = [];
  let scheduleFails = true;
  process.env["CLUB_LOCKER_ALERT_THRESHOLD"] = "1";
  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      if (scheduleFails) return new Response("unavailable", { status: 503 });
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      webhookPayloads.push(JSON.parse(String(init?.body)));
      return new Response(null, { status: 204 });
    }
    return originalFetch(input, init);
  };
  try {
    await withTrackerServer(healthyState(), async (url) => {
      const failure = await originalFetch(`${url}/tracker/refresh`, { method: "POST" });
      assert.equal(failure.status, 502);
      assert.equal(webhookPayloads.length, 1);
      const failurePayload = webhookPayloads[0];
      assert.equal(failurePayload.event, "club-locker-refresh-failing");
      assert.equal(failurePayload.consecutiveFailures, 1);
      assert.match(String(failurePayload.text), /failed 1 consecutive times/);
      assert.equal(typeof failurePayload.lastFailureAt, "string");
      const repeatedFailure = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      assert.equal(repeatedFailure.status, 502);
      assert.equal(webhookPayloads.length, 1);
      scheduleFails = false;
      const recovery = await originalFetch(`${url}/tracker/refresh`, { method: "POST" });
      assert.equal(recovery.status, 200);
      assert.equal(webhookPayloads.length, 2);
      const recoveryPayload = webhookPayloads[1];
      assert.equal(recoveryPayload.event, "club-locker-refresh-recovered");
      assert.equal(recoveryPayload.failedAttempts, 2);
      assert.equal(typeof recoveryPayload.outageDurationMs, "number");
      assert.equal(typeof recoveryPayload.outageStartedAt, "string");
      assert.equal(typeof recoveryPayload.recoveredAt, "string");
      assert.equal(
        recoveryPayload.outageDurationMs,
        Date.parse(String(recoveryPayload.recoveredAt)) - Date.parse(String(recoveryPayload.outageStartedAt))
      );
      assert.match(String(recoveryPayload.text), /2 failed attempts\./);
      const normalSuccess = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      assert.equal(normalSuccess.status, 200);
      assert.equal(webhookPayloads.length, 2);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_ALERT_THRESHOLD: originalEnvironment.threshold,
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl
    })) {
      if (value === void 0) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
test("refresh route records feed merge rejection as a refresh failure", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    threshold: process.env["CLUB_LOCKER_ALERT_THRESHOLD"],
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"]
  };
  const state = healthyState();
  state.matches = [{
    id: "local-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Local opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null
  }];
  let webhookRequests = 0;
  process.env["CLUB_LOCKER_ALERT_THRESHOLD"] = "1";
  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input) => {
    if (String(input) === "https://schedule.test/feed") {
      return Response.json({
        matches: [{
          externalId: "external-match",
          playerId: "player-1",
          opponent: "Imported opponent",
          startsAt: "2026-09-16T10:30:00.000Z",
          endsAt: "2026-09-16T11:15:00.000Z",
          venue: "Venue",
          court: "Court 2"
        }]
      });
    }
    webhookRequests += 1;
    return new Response(null, { status: 204 });
  };
  try {
    await withTrackerServer(state, async (url) => {
      const response = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      assert.equal(response.status, 502);
      assert.match(
        String((await response.json()).error),
        /overlapping a retained match/
      );
      const health = await originalFetch(`${url}/tracker/health`);
      assert.equal(health.status, 200);
      assert.equal(
        (await health.json()).consecutiveFailures,
        1
      );
      assert.equal(webhookRequests, 1);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_ALERT_THRESHOLD: originalEnvironment.threshold,
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl
    })) {
      if (value === void 0) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
test("refresh route succeeds while a recovery webhook is retried until delivered", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"]
  };
  const recovery = {
    failedAttempts: 2,
    outageStartedAt: "2026-09-16T11:50:00.000Z",
    recoveredAt: "2026-09-16T12:00:00.000Z",
    outageDurationMs: 10 * 6e4
  };
  const state = healthyState();
  state.refreshHealth.pendingRecoveries = [recovery];
  const webhookPayloads = [];
  let webhookFails = true;
  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      webhookPayloads.push(JSON.parse(String(init?.body)));
      return new Response(null, { status: webhookFails ? 503 : 204 });
    }
    return originalFetch(input, init);
  };
  try {
    await withTrackerServer(state, async (url) => {
      const failedDelivery = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      assert.equal(failedDelivery.status, 200);
      const failedDeliveryBody = await failedDelivery.json();
      assert.equal(
        failedDeliveryBody.refreshHealth.pendingRecoveryNotices,
        1
      );
      assert.equal(webhookPayloads.length, 1);
      assert.equal(webhookPayloads[0]?.event, "club-locker-refresh-recovered");
      assert.equal(webhookPayloads[0]?.failedAttempts, recovery.failedAttempts);
      webhookFails = false;
      const successfulRetry = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      assert.equal(successfulRetry.status, 200);
      const successfulRetryBody = await successfulRetry.json();
      assert.equal(
        successfulRetryBody.refreshHealth.pendingRecoveryNotices,
        0
      );
      assert.equal(webhookPayloads.length, 2);
      assert.deepEqual(webhookPayloads[1], webhookPayloads[0]);
      const afterDelivery = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      assert.equal(afterDelivery.status, 200);
      assert.equal(webhookPayloads.length, 2);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl
    })) {
      if (value === void 0) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
test("tracker health reports queued recovery notice count", async () => {
  const state = healthyState();
  state.refreshHealth.pendingRecoveries = [
    {
      failedAttempts: 2,
      outageStartedAt: "2026-09-16T10:00:00.000Z",
      recoveredAt: "2026-09-16T10:10:00.000Z",
      outageDurationMs: 10 * 6e4
    },
    {
      failedAttempts: 1,
      outageStartedAt: "2026-09-16T11:00:00.000Z",
      recoveredAt: "2026-09-16T11:05:00.000Z",
      outageDurationMs: 5 * 6e4
    }
  ];
  await withTrackerServer(state, async (url) => {
    const response = await fetch(`${url}/tracker`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(
      body.refreshHealth.pendingRecoveryNotices,
      2
    );
  });
});
test("refresh route delivers queued recoveries once in incident order", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"]
  };
  const state = healthyState();
  state.refreshHealth.pendingRecoveries = [
    {
      failedAttempts: 2,
      outageStartedAt: "2026-09-16T10:00:00.000Z",
      recoveredAt: "2026-09-16T10:10:00.000Z",
      outageDurationMs: 10 * 6e4
    },
    {
      failedAttempts: 3,
      outageStartedAt: "2026-09-16T11:00:00.000Z",
      recoveredAt: "2026-09-16T11:15:00.000Z",
      outageDurationMs: 15 * 6e4
    }
  ];
  const webhookPayloads = [];
  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      webhookPayloads.push(JSON.parse(String(init?.body)));
      return new Response(null, { status: 204 });
    }
    return originalFetch(input, init);
  };
  try {
    await withTrackerServer(state, async (url) => {
      const recovery = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      assert.equal(recovery.status, 200);
      assert.deepEqual(
        webhookPayloads.map((payload) => payload.outageStartedAt),
        ["2026-09-16T10:00:00.000Z", "2026-09-16T11:00:00.000Z"]
      );
      const afterDelivery = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      assert.equal(afterDelivery.status, 200);
      assert.equal(webhookPayloads.length, 2);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl
    })) {
      if (value === void 0) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
test("overlapping refresh requests deliver a queued recovery exactly once", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"]
  };
  const state = healthyState();
  state.refreshHealth.pendingRecoveries = [
    {
      failedAttempts: 2,
      outageStartedAt: "2026-09-16T10:00:00.000Z",
      recoveredAt: "2026-09-16T10:10:00.000Z",
      outageDurationMs: 10 * 6e4
    }
  ];
  const webhookPayloads = [];
  let releaseWebhook;
  const webhookBlocked = new Promise((resolve) => {
    releaseWebhook = resolve;
  });
  let markWebhookStarted;
  const webhookStarted = new Promise((resolve) => {
    markWebhookStarted = resolve;
  });
  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      webhookPayloads.push(JSON.parse(String(init?.body)));
      markWebhookStarted();
      await webhookBlocked;
      return new Response(null, { status: 204 });
    }
    return originalFetch(input, init);
  };
  try {
    await withTrackerServer(state, async (url) => {
      const firstRefresh = originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      await webhookStarted;
      const secondRefresh = originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      await new Promise((resolve) => setTimeout(resolve, 20));
      assert.equal(webhookPayloads.length, 1);
      releaseWebhook();
      const responses = await Promise.all([firstRefresh, secondRefresh]);
      assert.deepEqual(responses.map((response) => response.status), [200, 200]);
      assert.equal(webhookPayloads.length, 1);
      const bodies = await Promise.all(
        responses.map(async (response) => response.json())
      );
      assert.deepEqual(
        bodies.map((body) => body.refreshHealth.pendingRecoveryNotices),
        [0, 0]
      );
    });
  } finally {
    releaseWebhook();
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl
    })) {
      if (value === void 0) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
test("slow schedule and webhook requests do not delay match edits", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"]
  };
  const state = healthyState();
  state.matches = [{
    id: "match-1",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null
  }];
  state.refreshHealth.pendingRecoveries = [{
    failedAttempts: 2,
    outageStartedAt: "2026-09-16T09:00:00.000Z",
    recoveredAt: "2026-09-16T09:10:00.000Z",
    outageDurationMs: 10 * 6e4
  }];
  let releaseSchedule;
  const scheduleBlocked = new Promise((resolve) => {
    releaseSchedule = resolve;
  });
  let markScheduleStarted;
  const scheduleStarted = new Promise((resolve) => {
    markScheduleStarted = resolve;
  });
  let releaseWebhook;
  const webhookBlocked = new Promise((resolve) => {
    releaseWebhook = resolve;
  });
  let markWebhookStarted;
  const webhookStarted = new Promise((resolve) => {
    markWebhookStarted = resolve;
  });
  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url === "https://schedule.test/feed") {
      markScheduleStarted();
      await scheduleBlocked;
      return Response.json({ matches: [] });
    }
    if (url === "https://alerts.test/hook") {
      markWebhookStarted();
      await webhookBlocked;
      return new Response(null, { status: 204 });
    }
    return originalFetch(input);
  };
  try {
    await withTrackerServer(state, async (url) => {
      const refresh = originalFetch(`${url}/tracker/refresh`, { method: "POST" });
      await scheduleStarted;
      const editDuringSchedule = await originalFetch(`${url}/matches/match-1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ court: "Court 2" })
      });
      assert.equal(editDuringSchedule.status, 200);
      releaseSchedule();
      await webhookStarted;
      const editDuringWebhook = await originalFetch(`${url}/matches/match-1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ court: "Court 3" })
      });
      assert.equal(editDuringWebhook.status, 200);
      releaseWebhook();
      assert.equal((await refresh).status, 200);
    });
  } finally {
    releaseSchedule();
    releaseWebhook();
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      CLUB_LOCKER_SCHEDULE_URL: originalEnvironment.scheduleUrl,
      STAFF_ALERT_WEBHOOK_URL: originalEnvironment.webhookUrl
    })) {
      if (value === void 0) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
test("overlapping match edit and report save preserve both changes", async () => {
  let state = healthyState();
  state.matches = [
    {
      id: "match-1",
      externalId: null,
      playerId: "player-1",
      opponent: "Opponent",
      startsAt: "2026-09-16T10:00:00.000Z",
      endsAt: "2026-09-16T10:45:00.000Z",
      venue: "Venue",
      court: "Court 1",
      coachId: "coach-1",
      status: "completed",
      result: "Won 3-1",
      report: null
    }
  ];
  let releaseFirstSave;
  const firstSaveBlocked = new Promise((resolve) => {
    releaseFirstSave = resolve;
  });
  let markFirstSaveStarted;
  const firstSaveStarted = new Promise((resolve) => {
    markFirstSaveStarted = resolve;
  });
  let saveCount = 0;
  const app = express2();
  app.use(express2.json());
  app.use(
    createTrackerRouter({
      getState: async () => structuredClone(state),
      saveState: async (next) => {
        saveCount += 1;
        if (saveCount === 1) {
          markFirstSaveStarted();
          await firstSaveBlocked;
        }
        state = structuredClone(next);
      },
      objectStorage: {
        saveObject: async () => void 0,
        getObject: async () => ({}),
        deleteObject: async () => void 0
      },
      authorizeStaff: (_req, _res, next) => next()
    })
  );
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}`;
  try {
    const edit = fetch(`${url}/matches/match-1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ court: "Court 2" })
    });
    await firstSaveStarted;
    const report = fetch(`${url}/matches/match-1/report`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        observations: [
          "Controlled the middle well.",
          "Consistently recovered to the T.",
          "Kept good width under pressure."
        ],
        transcript: "Stayed composed in the long rallies.",
        audioPath: "/objects/uploads/123e4567-e89b-12d3-a456-426614174000"
      })
    });
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.equal(saveCount, 1);
    releaseFirstSave();
    const responses = await Promise.all([edit, report]);
    assert.deepEqual(responses.map((response) => response.status), [200, 200]);
    assert.equal(saveCount, 2);
    assert.equal(state.matches[0]?.court, "Court 2");
    assert.equal(
      state.matches[0]?.report?.observations[0],
      "Controlled the middle well."
    );
    assert.equal(
      state.matches[0]?.report?.audioPath,
      "/objects/uploads/123e4567-e89b-12d3-a456-426614174000"
    );
  } finally {
    releaseFirstSave();
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("independent API instances coordinate overlapping tracker writes", async () => {
  let state = healthyState();
  state.matches = [{
    id: "match-1",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null
  }];
  let transactionQueue = Promise.resolve();
  const mutateState = async (operation) => {
    const previous = transactionQueue;
    let release;
    transactionQueue = new Promise((resolve) => {
      release = resolve;
    });
    await previous;
    try {
      return await operation(
        async () => structuredClone(state),
        async (next) => {
          state = structuredClone(next);
        }
      );
    } finally {
      release();
    }
  };
  const createApp = () => {
    const app = express2();
    app.use(express2.json());
    app.use(createTrackerRouter({
      getState: async () => structuredClone(state),
      saveState: async (next) => {
        state = structuredClone(next);
      },
      mutateState,
      authorizeStaff: (_req, _res, next) => next()
    }));
    return app;
  };
  const servers = [createApp().listen(0, "127.0.0.1"), createApp().listen(0, "127.0.0.1")];
  await Promise.all(servers.map((server) => new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  })));
  const urls = servers.map((server) => {
    const address = server.address();
    assert(address && typeof address !== "string");
    return `http://127.0.0.1:${address.port}`;
  });
  try {
    const [edit, report] = await Promise.all([
      fetch(`${urls[0]}/matches/match-1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ court: "Court 2" })
      }),
      fetch(`${urls[1]}/matches/match-1/report`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observations: ["Strong length.", "Recovered to the T.", "Stayed composed."],
          transcript: "Good work under pressure."
        })
      })
    ]);
    assert.deepEqual([edit.status, report.status], [200, 200]);
    assert.equal(state.matches[0]?.court, "Court 2");
    assert.equal(state.matches[0]?.report?.transcript, "Good work under pressure.");
  } finally {
    await Promise.all(servers.map((server) => new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    )));
  }
});
test("saving tracker settings deletes the replaced logo only after persistence", async () => {
  const previousLogoPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const replacementLogoPath = "/objects/uploads/logos/22222222-2222-4222-8222-222222222222";
  let state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: previousLogoPath };
  const events = [];
  const app = express2();
  app.use(express2.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      events.push("persist");
      state = structuredClone(next);
    },
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async () => ({}),
      deleteObject: async (path) => {
        events.push(`delete:${path}`);
      }
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/tracker/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coaches: state.coaches,
        branding: { name: "Club", logoPath: replacementLogoPath }
      })
    });
    assert.equal(response.status, 200);
    assert.deepEqual(events, ["persist", `delete:${previousLogoPath}`]);
    assert.equal(state.branding?.logoPath, replacementLogoPath);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("replaced logo cleanup rechecks state after a concurrent settings save", async () => {
  const originalLogoPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const replacementLogoPath = "/objects/uploads/logos/22222222-2222-4222-8222-222222222222";
  let state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: originalLogoPath };
  let releaseFirstSave;
  const firstSaveBlocked = new Promise((resolve) => {
    releaseFirstSave = resolve;
  });
  let markFirstSaveStarted;
  const firstSaveStarted = new Promise((resolve) => {
    markFirstSaveStarted = resolve;
  });
  let saveCount = 0;
  const deleted = [];
  let markSecondRequestEntered;
  const secondRequestEntered = new Promise((resolve) => {
    markSecondRequestEntered = resolve;
  });
  let settingsRequestCount = 0;
  const app = express2();
  app.use(express2.json());
  app.use((req, _res, next) => {
    if (req.method === "PUT" && req.path === "/tracker/settings") {
      settingsRequestCount += 1;
      if (settingsRequestCount === 2) markSecondRequestEntered();
    }
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      saveCount += 1;
      if (saveCount === 1) {
        markFirstSaveStarted();
        await firstSaveBlocked;
      }
      state = structuredClone(next);
    },
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async () => ({}),
      deleteObject: async (path) => {
        deleted.push(path);
      }
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  const saveSettings = (logoPath) => fetch(
    `http://127.0.0.1:${address.port}/tracker/settings`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coaches: state.coaches,
        branding: { name: "Club", logoPath }
      })
    }
  );
  try {
    const firstSave = saveSettings(replacementLogoPath);
    await firstSaveStarted;
    const concurrentSave = saveSettings(originalLogoPath);
    await secondRequestEntered;
    releaseFirstSave();
    assert.equal((await firstSave).status, 200);
    assert.equal((await concurrentSave).status, 200);
    assert.equal(state.branding?.logoPath, originalLogoPath);
    assert.deepEqual(deleted, [replacementLogoPath]);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("unused logo cleanup retains the logo referenced by saved settings", async () => {
  const referencedLogoPath = "/objects/uploads/logos/11111111-1111-4111-8111-111111111111";
  const unusedLogoPath = "/objects/uploads/logos/22222222-2222-4222-8222-222222222222";
  const state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: referencedLogoPath };
  const deleted = [];
  const app = express2();
  app.use(express2.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => void 0,
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async () => ({}),
      deleteObject: async (path) => {
        deleted.push(path);
      }
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  const cleanup = (objectPath) => fetch(`http://127.0.0.1:${address.port}/tracker/logo`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ objectPath })
  });
  try {
    assert.equal((await cleanup(referencedLogoPath)).status, 204);
    assert.deepEqual(deleted, []);
    assert.equal((await cleanup(unusedLogoPath)).status, 204);
    assert.deepEqual(deleted, [unusedLogoPath]);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("replaced legacy logo cleanup retains an object still referenced by a coach report", async () => {
  const sharedObjectPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  let state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: sharedObjectPath };
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["First.", "Second.", "Third."],
      transcript: null,
      audioPath: sharedObjectPath,
      updatedAt: "2026-09-16T11:00:00.000Z"
    }
  }];
  const deleted = [];
  const app = express2();
  app.use(express2.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      state = structuredClone(next);
    },
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async () => ({}),
      deleteObject: async (path) => {
        deleted.push(path);
      }
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/tracker/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coaches: state.coaches,
        branding: {
          name: "Club",
          logoPath: "/objects/uploads/logos/22222222-2222-4222-8222-222222222222"
        }
      })
    });
    assert.equal(response.status, 200);
    assert.deepEqual(deleted, []);
    assert.equal(state.matches[0]?.report?.audioPath, sharedObjectPath);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("failed tracker settings persistence retains the previously saved logo", async () => {
  const previousLogoPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const state = healthyState();
  state.branding = { name: "StaitSquash", logoPath: previousLogoPath };
  const deleted = [];
  const app = express2();
  app.use(express2.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => {
      throw new Error("database unavailable");
    },
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async () => ({}),
      deleteObject: async (path) => {
        deleted.push(path);
      }
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/tracker/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coaches: state.coaches,
        branding: {
          name: "Club",
          logoPath: "/objects/uploads/logos/22222222-2222-4222-8222-222222222222"
        }
      })
    });
    assert.equal(response.status, 500);
    assert.deepEqual(deleted, []);
    assert.equal(state.branding.logoPath, previousLogoPath);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("coach report audio upload stores bytes and returns its object path", async () => {
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null
  }];
  const audio = Buffer.from("recorded voice note");
  const saved = [];
  const app = express2();
  app.use(express2.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => void 0,
    objectStorage: {
      saveObject: async (path, bytes, contentType) => {
        saved.push({ path, bytes, contentType });
      },
      getObject: async () => {
        throw new Error("not used");
      },
      deleteObject: async () => void 0
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/matches/completed-match/report/audio`,
      { method: "POST", headers: { "Content-Type": "audio/webm" }, body: audio }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.match(body.objectPath, /^\/objects\/uploads\/[0-9a-f-]+$/);
    assert.equal(saved.length, 1);
    assert.equal(saved[0]?.path, body.objectPath);
    assert.deepEqual(saved[0]?.bytes, audio);
    assert.equal(saved[0]?.contentType, "audio/webm");
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("audio upload removes only expired voice notes not referenced by current reports", async () => {
  const referencedPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const orphanedPath = "/objects/uploads/22222222-2222-4222-8222-222222222222";
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["Stayed composed."],
      transcript: null,
      audioPath: referencedPath,
      updatedAt: "2026-09-15T10:00:00.000Z"
    }
  }];
  const deleted = [];
  const app = express2();
  app.use(express2.json());
  app.use((req, _res, next) => {
    req.log = { error: () => void 0 };
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => void 0,
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async () => ({}),
      listVoiceNotesOlderThan: async () => [referencedPath, orphanedPath],
      deleteObject: async (path) => {
        deleted.push(path);
      }
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/matches/completed-match/report/audio`,
      { method: "POST", headers: { "Content-Type": "audio/webm" }, body: "new note" }
    );
    assert.equal(response.status, 200);
    assert.deepEqual(deleted, [orphanedPath]);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("unfinished voice note cleanup failures are logged without failing upload", async () => {
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: null
  }];
  const logged = [];
  const app = express2();
  app.use(express2.json());
  app.use((req, _res, next) => {
    req.log = {
      error: (details, message) => logged.push([details, message])
    };
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => void 0,
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async () => ({}),
      listVoiceNotesOlderThan: async () => {
        throw new Error("storage unavailable");
      },
      deleteObject: async () => void 0
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/matches/completed-match/report/audio`,
      { method: "POST", headers: { "Content-Type": "audio/webm" }, body: "new note" }
    );
    assert.equal(response.status, 200);
    assert.equal(logged[0]?.[1], "Could not find unfinished coach voice notes");
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("replacing report audio deletes the previous object after persistence", async () => {
  const previousAudioPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const replacementAudioPath = "/objects/uploads/22222222-2222-4222-8222-222222222222";
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["Old observation."],
      transcript: null,
      audioPath: previousAudioPath,
      updatedAt: "2026-09-16T11:00:00.000Z"
    }
  }];
  const events = [];
  const storedObjects = /* @__PURE__ */ new Set([previousAudioPath, replacementAudioPath]);
  const app = express2();
  app.use(express2.json());
  app.use((req, _res, next) => {
    req.log = { error: () => void 0 };
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      events.push("persist");
      Object.assign(state, structuredClone(next));
    },
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async (path) => {
        if (!storedObjects.has(path)) throw new Error("not found");
        return {};
      },
      deleteObject: async (path) => {
        events.push(`delete:${path}`);
        storedObjects.delete(path);
      }
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/matches/completed-match/report`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        observations: ["New observation.", "Recovered to the T.", "Stayed composed."],
        audioPath: replacementAudioPath
      })
    });
    assert.equal(response.status, 200);
    assert.deepEqual(events, ["persist", `delete:${previousAudioPath}`]);
    assert.equal(state.matches[0]?.report?.audioPath, replacementAudioPath);
    const staleResponse = await fetch(
      `http://127.0.0.1:${address.port}/matches/completed-match/report`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observations: ["Stale edit.", "Recovered to the T.", "Stayed composed."],
          audioPath: previousAudioPath
        })
      }
    );
    assert.equal(staleResponse.status, 400);
    assert.equal(state.matches[0]?.report?.audioPath, replacementAudioPath);
    assert.equal(storedObjects.has(replacementAudioPath), true);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("failed report persistence retains the previous voice note", async () => {
  const previousAudioPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["Old observation."],
      transcript: null,
      audioPath: previousAudioPath,
      updatedAt: "2026-09-16T11:00:00.000Z"
    }
  }];
  const deleted = [];
  const app = express2();
  app.use(express2.json());
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async () => {
      throw new Error("database unavailable");
    },
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async () => ({}),
      deleteObject: async (path) => {
        deleted.push(path);
      }
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/matches/completed-match/report`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        observations: ["New observation.", "Recovered to the T.", "Stayed composed."],
        audioPath: "/objects/uploads/22222222-2222-4222-8222-222222222222"
      })
    });
    assert.equal(response.status, 500);
    assert.deepEqual(deleted, []);
    assert.equal(state.matches[0]?.report?.audioPath, previousAudioPath);
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("voice note cleanup failure is logged without failing the saved report", async () => {
  const previousAudioPath = "/objects/uploads/11111111-1111-4111-8111-111111111111";
  const replacementAudioPath = "/objects/uploads/22222222-2222-4222-8222-222222222222";
  const state = healthyState();
  state.matches = [{
    id: "completed-match",
    externalId: null,
    playerId: "player-1",
    opponent: "Opponent",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:45:00.000Z",
    venue: "Venue",
    court: "Court 1",
    coachId: "coach-1",
    status: "completed",
    result: "Won 3-1",
    report: {
      matchId: "completed-match",
      observations: ["Old observation."],
      transcript: null,
      audioPath: previousAudioPath,
      updatedAt: "2026-09-16T11:00:00.000Z"
    }
  }];
  const logged = [];
  const app = express2();
  app.use(express2.json());
  app.use((req, _res, next) => {
    req.log = {
      error: (details, message) => logged.push([details, message])
    };
    next();
  });
  app.use(createTrackerRouter({
    getState: async () => structuredClone(state),
    saveState: async (next) => {
      Object.assign(state, structuredClone(next));
    },
    objectStorage: {
      saveObject: async () => void 0,
      getObject: async () => ({}),
      deleteObject: async () => {
        throw new Error("storage unavailable");
      }
    },
    authorizeStaff: (_req, _res, next) => next()
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/matches/completed-match/report`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        observations: ["New observation.", "Recovered to the T.", "Stayed composed."],
        audioPath: replacementAudioPath
      })
    });
    assert.equal(response.status, 200);
    assert.equal(state.matches[0]?.report?.audioPath, replacementAudioPath);
    assert.equal(logged.length, 1);
    assert.equal(logged[0]?.[1], "Could not remove replaced coach voice note");
  } finally {
    await new Promise(
      (resolve, reject) => server.close((error) => error ? reject(error) : resolve())
    );
  }
});
test("normal successful refresh sends no staff webhook", async () => {
  const originalFetch = globalThis.fetch;
  const originalScheduleUrl = process.env["CLUB_LOCKER_SCHEDULE_URL"];
  const originalWebhookUrl = process.env["STAFF_ALERT_WEBHOOK_URL"];
  let webhookRequests = 0;
  process.env["CLUB_LOCKER_SCHEDULE_URL"] = "https://schedule.test/feed";
  process.env["STAFF_ALERT_WEBHOOK_URL"] = "https://alerts.test/hook";
  globalThis.fetch = async (input) => {
    if (String(input) === "https://schedule.test/feed") {
      return Response.json({ matches: [] });
    }
    webhookRequests += 1;
    return new Response(null, { status: 204 });
  };
  try {
    await withTrackerServer(healthyState(), async (url) => {
      const response = await originalFetch(`${url}/tracker/refresh`, { method: "POST" });
      assert.equal(response.status, 200);
      assert.equal(webhookRequests, 0);
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalScheduleUrl === void 0) delete process.env["CLUB_LOCKER_SCHEDULE_URL"];
    else process.env["CLUB_LOCKER_SCHEDULE_URL"] = originalScheduleUrl;
    if (originalWebhookUrl === void 0) delete process.env["STAFF_ALERT_WEBHOOK_URL"];
    else process.env["STAFF_ALERT_WEBHOOK_URL"] = originalWebhookUrl;
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3JvdXRlcy90cmFja2VyLnRlc3QudHMiLCAiLi4vLi4vc3JjL3JvdXRlcy90cmFja2VyLnRzIiwgIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS96b2RAMy4yNS43Ni9ub2RlX21vZHVsZXMvem9kL3YzL2V4dGVybmFsLmpzIiwgIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS96b2RAMy4yNS43Ni9ub2RlX21vZHVsZXMvem9kL3YzL2hlbHBlcnMvdXRpbC5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My9ab2RFcnJvci5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My9sb2NhbGVzL2VuLmpzIiwgIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS96b2RAMy4yNS43Ni9ub2RlX21vZHVsZXMvem9kL3YzL2Vycm9ycy5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My9oZWxwZXJzL3BhcnNlVXRpbC5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My9oZWxwZXJzL2Vycm9yVXRpbC5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My90eXBlcy5qcyIsICIuLi8uLi8uLi8uLi9saWIvYXBpLXpvZC9zcmMvZ2VuZXJhdGVkL2FwaS50cyIsICIuLi8uLi8uLi8uLi9saWIvYXBpLXpvZC9zcmMvcGVyc2lzdGVkLXRyYWNrZXItc3RhdGUudHMiLCAiLi4vLi4vc3JjL2xpYi9jbHViLWxvY2tlci50cyIsICIuLi8uLi9zcmMvbGliL2NsdWItbG9ja2VyLWRyYXdzLnRzIiwgIi4uLy4uL3NyYy9saWIvb2JqZWN0LXN0b3JhZ2UudHMiLCAiLi4vLi4vc3JjL21pZGRsZXdhcmVzL3JlcXVpcmVTdGFmZi50cyIsICIuLi8uLi9zcmMvbWlkZGxld2FyZXMvY2xlcmtQcm94eU1pZGRsZXdhcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBhc3NlcnQgZnJvbSBcIm5vZGU6YXNzZXJ0L3N0cmljdFwiO1xuaW1wb3J0IHRlc3QgZnJvbSBcIm5vZGU6dGVzdFwiO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZVRyYWNrZXJSb3V0ZXIsXG4gIGlzTG9nb0ltYWdlLFxuICBwYXJzZVBlcnNpc3RlZFRyYWNrZXJTdGF0ZSxcbiAgcmVjb3ZlckludmFsaWRUcmFja2VyU3RhdGUsXG4gIHR5cGUgUnVuUmVjb3ZlcnlUcmFuc2FjdGlvbixcbn0gZnJvbSBcIi4vdHJhY2tlci50c1wiO1xuaW1wb3J0IHR5cGUgeyBUcmFja2VyU3RhdGUgfSBmcm9tIFwiLi4vbGliL2NsdWItbG9ja2VyLnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVSZXF1aXJlU3RhZmYgfSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcmVxdWlyZVN0YWZmLnRzXCI7XG5pbXBvcnQgeyBnZXRDbGVya1Byb3h5SG9zdCB9IGZyb20gXCIuLi9taWRkbGV3YXJlcy9jbGVya1Byb3h5TWlkZGxld2FyZS50c1wiO1xuXG5jb25zdCBoZWFsdGh5U3RhdGUgPSAoKTogVHJhY2tlclN0YXRlID0+ICh7XG4gIHBsYXllcnM6IFt7IGlkOiBcInBsYXllci0xXCIsIG5hbWU6IFwiUGxheWVyIE9uZVwiLCBzaGFyZVRva2VuOiBcImFcIi5yZXBlYXQoNDMpIH1dLFxuICBjb2FjaGVzOiBbeyBpZDogXCJjb2FjaC0xXCIsIG5hbWU6IFwiQ29hY2ggT25lXCIgfV0sXG4gIGJyYW5kaW5nOiB7IG5hbWU6IFwiU3RhaXRTcXVhc2hcIiwgbG9nb1BhdGg6IG51bGwgfSxcbiAgbWF0Y2hlczogW10sXG4gIGxhc3RVcGRhdGVkQXQ6IFwiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsXG4gIHNvdXJjZTogXCJjbHViLWxvY2tlclwiLFxuICByZWZyZXNoSGVhbHRoOiB7XG4gICAgY29uc2VjdXRpdmVGYWlsdXJlczogMCxcbiAgICBhbGVydFRocmVzaG9sZDogMSxcbiAgICBmaXJzdEZhaWx1cmVBdDogbnVsbCxcbiAgICBsYXN0RmFpbHVyZUF0OiBudWxsLFxuICAgIGFsZXJ0U2VudEF0OiBudWxsLFxuICAgIGZhaWx1cmVBbGVydENsYWltZWRBdDogbnVsbCxcbiAgICBwZW5kaW5nUmVjb3ZlcmllczogW10sXG4gICAgcmVjb3ZlcnlDbGFpbTogbnVsbCxcbiAgfSxcbn0pO1xuXG50ZXN0KFwibG9nbyB2YWxpZGF0aW9uIGNoZWNrcyBhY3R1YWwgYnl0ZXMgcmF0aGVyIHRoYW4gY2xhaW1lZCBNSU1FIHR5cGVcIiwgKCkgPT4ge1xuICBhc3NlcnQuZXF1YWwoaXNMb2dvSW1hZ2UoQnVmZmVyLmZyb20oXCJub3QgYW4gaW1hZ2VcIiksIFwiaW1hZ2UvcG5nXCIpLCBmYWxzZSk7XG4gIGFzc2VydC5lcXVhbChcbiAgICBpc0xvZ29JbWFnZShCdWZmZXIuZnJvbShbMHg4OSwgMHg1MCwgMHg0ZSwgMHg0NywgMHgwZCwgMHgwYSwgMHgxYSwgMHgwYV0pLCBcImltYWdlL3BuZ1wiKSxcbiAgICB0cnVlLFxuICApO1xuICBhc3NlcnQuZXF1YWwoaXNMb2dvSW1hZ2UoQnVmZmVyLmFsbG9jKDUgKiAxMDI0ICogMTAyNCArIDEpLCBcImltYWdlL3BuZ1wiKSwgZmFsc2UpO1xufSk7XG5cbnRlc3QoXCJzdGFmZiByb3V0ZXMgZGlzdGluZ3Vpc2ggYW5vbnltb3VzLCB1bmFwcHJvdmVkLCBhbmQgYXBwcm92ZWQgYWNjb3VudHNcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjYXNlczogQXJyYXk8W3N0cmluZyB8IG51bGwsIGJvb2xlYW4sIG51bWJlcl0+ID0gW1xuICAgIFtudWxsLCBmYWxzZSwgNDAxXSxcbiAgICBbXCJ1c2VyX3VuYXBwcm92ZWRcIiwgZmFsc2UsIDQwM10sXG4gICAgW1widXNlcl9zdGFmZlwiLCB0cnVlLCAyMDBdLFxuICBdO1xuXG4gIGZvciAoY29uc3QgW3VzZXJJZCwgYXBwcm92ZWQsIGV4cGVjdGVkU3RhdHVzXSBvZiBjYXNlcykge1xuICAgIGNvbnN0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICAgIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuICAgIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgICBnZXRTdGF0ZTogYXN5bmMgKCkgPT4gc3RydWN0dXJlZENsb25lKHN0YXRlKSxcbiAgICAgIHNhdmVTdGF0ZTogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgYXV0aG9yaXplU3RhZmY6IGNyZWF0ZVJlcXVpcmVTdGFmZih7XG4gICAgICAgIGdldFVzZXJJZDogKCkgPT4gdXNlcklkLFxuICAgICAgICBpc0FwcHJvdmVkU3RhZmY6IGFzeW5jIChjYW5kaWRhdGUpID0+IGNhbmRpZGF0ZSA9PT0gXCJ1c2VyX3N0YWZmXCIgJiYgYXBwcm92ZWQsXG4gICAgICB9KSxcbiAgICB9KSk7XG4gICAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3RlbigwLCBcIjEyNy4wLjAuMVwiKTtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXJ2ZXIub25jZShcImxpc3RlbmluZ1wiLCByZXNvbHZlKTtcbiAgICAgIHNlcnZlci5vbmNlKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgICB9KTtcbiAgICBjb25zdCBhZGRyZXNzID0gc2VydmVyLmFkZHJlc3MoKTtcbiAgICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9L3RyYWNrZXJgKTtcbiAgICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5zdGF0dXMsIGV4cGVjdGVkU3RhdHVzKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgICAgc2VydmVyLmNsb3NlKChlcnJvcikgPT4gZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG59KTtcblxudGVzdChcInRyYWNrZXIgcmVjb3ZlcnkgcmVxdWlyZXMgYXBwcm92ZWQgc3RhZmYgYW5kIHJlY29yZHMgdGhlaXIgaWRlbnRpdHlcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjYWxsczogQXJyYXk8eyBhY3RvcklkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+ID0gW107XG4gIGZvciAoY29uc3QgW3VzZXJJZCwgYXBwcm92ZWQsIGV4cGVjdGVkU3RhdHVzXSBvZiBbXG4gICAgW251bGwsIGZhbHNlLCA0MDFdLFxuICAgIFtcInVzZXJfdW5hcHByb3ZlZFwiLCBmYWxzZSwgNDAzXSxcbiAgICBbXCJ1c2VyX3N0YWZmXCIsIHRydWUsIDIwMF0sXG4gIF0gYXMgY29uc3QpIHtcbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gICAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gICAgYXBwLnVzZShjcmVhdGVUcmFja2VyUm91dGVyKHtcbiAgICAgIGdldFN0YXRlOiBhc3luYyAoKSA9PiBoZWFsdGh5U3RhdGUoKSxcbiAgICAgIHNhdmVTdGF0ZTogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgYXV0aG9yaXplU3RhZmY6IGNyZWF0ZVJlcXVpcmVTdGFmZih7XG4gICAgICAgIGdldFVzZXJJZDogKCkgPT4gdXNlcklkLFxuICAgICAgICBpc0FwcHJvdmVkU3RhZmY6IGFzeW5jICgpID0+IGFwcHJvdmVkLFxuICAgICAgfSksXG4gICAgICByZWNvdmVySW52YWxpZFN0YXRlOiBhc3luYyAocmVxdWVzdCkgPT4ge1xuICAgICAgICBjYWxscy5wdXNoKHJlcXVlc3QpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG91dGNvbWU6IFwicmVjb3ZlcmVkXCIsXG4gICAgICAgICAgYmFja3VwSWQ6IFwiYmFja3VwLTFcIixcbiAgICAgICAgICByZWNvdmVyZWRBdDogXCIyMDI2LTA5LTE2VDEyOjAwOjAwLjAwMFpcIixcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfSkpO1xuICAgIGNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIik7XG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHNlcnZlci5vbmNlKFwibGlzdGVuaW5nXCIsIHJlc29sdmUpKTtcbiAgICBjb25zdCBhZGRyZXNzID0gc2VydmVyLmFkZHJlc3MoKTtcbiAgICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkcmVzcy5wb3J0fS90cmFja2VyL3JlY292ZXJgLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWFzb246IFwiUmVzdG9yZSBzZXJ2aWNlIGFmdGVyIHZhbGlkYXRpb24gZmFpbHVyZVwiIH0pLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5zdGF0dXMsIGV4cGVjdGVkU3RhdHVzKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgICAgc2VydmVyLmNsb3NlKChlcnJvcikgPT4gZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGFzc2VydC5kZWVwRXF1YWwoY2FsbHMsIFt7XG4gICAgYWN0b3JJZDogXCJ1c2VyX3N0YWZmXCIsXG4gICAgcmVhc29uOiBcIlJlc3RvcmUgc2VydmljZSBhZnRlciB2YWxpZGF0aW9uIGZhaWx1cmVcIixcbiAgfV0pO1xufSk7XG5cbnRlc3QoXCJ0cmFja2VyIHJlY292ZXJ5IHZhbGlkYXRlcyBpdHMgYXVkaXQgcmVhc29uIGFuZCByZWZ1c2VzIHZhbGlkIHNuYXBzaG90c1wiLCBhc3luYyAoKSA9PiB7XG4gIGxldCByZWNvdmVyeUNhbGxzID0gMDtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgYXBwLnVzZSgocmVxLCBfcmVzLCBuZXh0KSA9PiB7XG4gICAgcmVxLmxvZyA9IHsgaW5mbygpIHt9LCB3YXJuKCkge30sIGVycm9yKCkge30gfSBhcyB1bmtub3duIGFzIHR5cGVvZiByZXEubG9nO1xuICAgIG5leHQoKTtcbiAgfSk7XG4gIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IGhlYWx0aHlTdGF0ZSgpLFxuICAgIHNhdmVTdGF0ZTogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgIGF1dGhvcml6ZVN0YWZmOiAoX3JlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICByZXMubG9jYWxzLnN0YWZmVXNlcklkID0gXCJ1c2VyX3N0YWZmXCI7XG4gICAgICBuZXh0KCk7XG4gICAgfSxcbiAgICByZWNvdmVySW52YWxpZFN0YXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICByZWNvdmVyeUNhbGxzICs9IDE7XG4gICAgICByZXR1cm4geyBvdXRjb21lOiBcInZhbGlkXCIgfTtcbiAgICB9LFxuICB9KSk7XG4gIGNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIik7XG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiBzZXJ2ZXIub25jZShcImxpc3RlbmluZ1wiLCByZXNvbHZlKSk7XG4gIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gIHRyeSB7XG4gICAgY29uc3QgYmFzZSA9IGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkcmVzcy5wb3J0fS90cmFja2VyL3JlY292ZXJgO1xuICAgIGNvbnN0IGludmFsaWRSZWFzb24gPSBhd2FpdCBmZXRjaChiYXNlLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWFzb246IFwidG9vIHNob3J0XCIgfSksXG4gICAgfSk7XG4gICAgYXNzZXJ0LmVxdWFsKGludmFsaWRSZWFzb24uc3RhdHVzLCA0MDApO1xuICAgIGFzc2VydC5lcXVhbChyZWNvdmVyeUNhbGxzLCAwKTtcblxuICAgIGNvbnN0IHZhbGlkU25hcHNob3QgPSBhd2FpdCBmZXRjaChiYXNlLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWFzb246IFwiT3BlcmF0b3IgY29uZmlybWVkIHJlamVjdGVkIHNhdmVkIGRhdGFcIiB9KSxcbiAgICB9KTtcbiAgICBhc3NlcnQuZXF1YWwodmFsaWRTbmFwc2hvdC5zdGF0dXMsIDQwOSk7XG4gICAgYXNzZXJ0Lm1hdGNoKFxuICAgICAgU3RyaW5nKChhd2FpdCB2YWxpZFNuYXBzaG90Lmpzb24oKSBhcyB7IGVycm9yOiBzdHJpbmcgfSkuZXJyb3IpLFxuICAgICAgL2N1cnJlbnQgdHJhY2tlciBzbmFwc2hvdCBpcyB2YWxpZC8sXG4gICAgKTtcbiAgICBhc3NlcnQuZXF1YWwocmVjb3ZlcnlDYWxscywgMSk7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHNlcnZlci5jbG9zZSgoZXJyb3IpID0+IGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSksXG4gICAgKTtcbiAgfVxufSk7XG5cbnRlc3QoXCJ0cmFja2VyIHJlY292ZXJ5IHByZXNlcnZlcyB0aGUgcmVqZWN0ZWQgc25hcHNob3QgYmVmb3JlIHJlc2V0IGFuZCBhdWRpdFwiLCBhc3luYyAoKSA9PiB7XG4gIHR5cGUgUmVjb3ZlcnlTdG9yYWdlID0ge1xuICAgIHJvdzogeyBpZDogc3RyaW5nOyBkYXRhOiB1bmtub3duIH0gfCB1bmRlZmluZWQ7XG4gICAgYmFja3VwczogQXJyYXk8e1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHJlamVjdGVkRGF0YTogdW5rbm93bjtcbiAgICAgIHJlamVjdGlvbkRldGFpbHM6IHN0cmluZztcbiAgICB9PjtcbiAgICBhdWRpdHM6IEFycmF5PHtcbiAgICAgIGJhY2t1cElkOiBzdHJpbmc7XG4gICAgICBhY3RvcklkOiBzdHJpbmc7XG4gICAgICByZWFzb246IHN0cmluZztcbiAgICB9PjtcbiAgfTtcbiAgY29uc3Qgc3RvcmFnZTogUmVjb3ZlcnlTdG9yYWdlID0ge1xuICAgIHJvdzoge1xuICAgICAgaWQ6IFwibWFpblwiLFxuICAgICAgZGF0YToge1xuICAgICAgICBwbGF5ZXJzOiBcInJlamVjdGVkXCIsXG4gICAgICAgIGRpYWdub3N0aWNNYXJrZXI6IFwia2VlcC1mb3ItaW52ZXN0aWdhdGlvblwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJhY2t1cHM6IFtdLFxuICAgIGF1ZGl0czogW10sXG4gIH07XG4gIGNvbnN0IHJ1blRyYW5zYWN0aW9uOiBSdW5SZWNvdmVyeVRyYW5zYWN0aW9uID0gYXN5bmMgKG9wZXJhdGlvbikgPT4ge1xuICAgIGNvbnN0IHdvcmtpbmcgPSBzdHJ1Y3R1cmVkQ2xvbmUoc3RvcmFnZSk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgb3BlcmF0aW9uKHtcbiAgICAgIGxvYWRGb3JVcGRhdGU6IGFzeW5jICgpID0+IHdvcmtpbmcucm93LFxuICAgICAgaW5zZXJ0QmFja3VwOiBhc3luYyAoYmFja3VwKSA9PiB7XG4gICAgICAgIHdvcmtpbmcuYmFja3Vwcy5wdXNoKHtcbiAgICAgICAgICBpZDogYmFja3VwLmlkLFxuICAgICAgICAgIHJlamVjdGVkRGF0YTogc3RydWN0dXJlZENsb25lKGJhY2t1cC5yZWplY3RlZERhdGEpLFxuICAgICAgICAgIHJlamVjdGlvbkRldGFpbHM6IGJhY2t1cC5yZWplY3Rpb25EZXRhaWxzLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICByZXBsYWNlU3RhdGU6IGFzeW5jIChyZXBsYWNlbWVudCkgPT4ge1xuICAgICAgICBhc3NlcnQod29ya2luZy5yb3cpO1xuICAgICAgICB3b3JraW5nLnJvdy5kYXRhID0gc3RydWN0dXJlZENsb25lKHJlcGxhY2VtZW50LmRhdGEpO1xuICAgICAgfSxcbiAgICAgIGluc2VydEF1ZGl0OiBhc3luYyAoYXVkaXQpID0+IHtcbiAgICAgICAgd29ya2luZy5hdWRpdHMucHVzaCh7XG4gICAgICAgICAgYmFja3VwSWQ6IGF1ZGl0LmJhY2t1cElkLFxuICAgICAgICAgIGFjdG9ySWQ6IGF1ZGl0LmFjdG9ySWQsXG4gICAgICAgICAgcmVhc29uOiBhdWRpdC5yZWFzb24sXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICBPYmplY3QuYXNzaWduKHN0b3JhZ2UsIHdvcmtpbmcpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlY292ZXJJbnZhbGlkVHJhY2tlclN0YXRlKHtcbiAgICBhY3RvcklkOiBcInVzZXJfc3RhZmZcIixcbiAgICByZWFzb246IFwiU25hcHNob3QgdmFsaWRhdGlvbiBibG9ja2VkIHN0YWZmIGFjY2Vzc1wiLFxuICB9LCBydW5UcmFuc2FjdGlvbik7XG4gIGFzc2VydC5lcXVhbChyZXN1bHQub3V0Y29tZSwgXCJyZWNvdmVyZWRcIik7XG4gIGFzc2VydC5lcXVhbChzdG9yYWdlLmJhY2t1cHMubGVuZ3RoLCAxKTtcbiAgYXNzZXJ0LmRlZXBFcXVhbChzdG9yYWdlLmJhY2t1cHNbMF0/LnJlamVjdGVkRGF0YSwge1xuICAgIHBsYXllcnM6IFwicmVqZWN0ZWRcIixcbiAgICBkaWFnbm9zdGljTWFya2VyOiBcImtlZXAtZm9yLWludmVzdGlnYXRpb25cIixcbiAgfSk7XG4gIGFzc2VydC5tYXRjaChcbiAgICBzdG9yYWdlLmJhY2t1cHNbMF0/LnJlamVjdGlvbkRldGFpbHMgPz8gXCJcIixcbiAgICAvU3RvcmVkIHRyYWNrZXIgc25hcHNob3QgaXMgaW52YWxpZC8sXG4gICk7XG4gIGFzc2VydChzdG9yYWdlLnJvdyk7XG4gIGFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4gcGFyc2VQZXJzaXN0ZWRUcmFja2VyU3RhdGUoc3RvcmFnZS5yb3chLmRhdGEpKTtcbiAgYXNzZXJ0LmRlZXBFcXVhbChzdG9yYWdlLmF1ZGl0cywgW3tcbiAgICBiYWNrdXBJZDpcbiAgICAgIHJlc3VsdC5vdXRjb21lID09PSBcInJlY292ZXJlZFwiID8gcmVzdWx0LmJhY2t1cElkIDogXCJ1bnJlYWNoYWJsZVwiLFxuICAgIGFjdG9ySWQ6IFwidXNlcl9zdGFmZlwiLFxuICAgIHJlYXNvbjogXCJTbmFwc2hvdCB2YWxpZGF0aW9uIGJsb2NrZWQgc3RhZmYgYWNjZXNzXCIsXG4gIH1dKTtcbn0pO1xuXG50ZXN0KFwidHJhY2tlciByZWNvdmVyeSB0cmFuc2FjdGlvbiByb2xscyBiYWNrIGlmIGF1ZGl0IHBlcnNpc3RlbmNlIGZhaWxzXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxEYXRhID0ge1xuICAgIHBsYXllcnM6IFwicmVqZWN0ZWRcIixcbiAgICBkaWFnbm9zdGljTWFya2VyOiBcIm11c3Qtc3Vydml2ZVwiLFxuICB9O1xuICBjb25zdCBzdG9yYWdlID0ge1xuICAgIHJvdzogeyBpZDogXCJtYWluXCIsIGRhdGE6IHN0cnVjdHVyZWRDbG9uZShvcmlnaW5hbERhdGEpIGFzIHVua25vd24gfSxcbiAgICBiYWNrdXBDb3VudDogMCxcbiAgfTtcbiAgY29uc3QgcnVuVHJhbnNhY3Rpb246IFJ1blJlY292ZXJ5VHJhbnNhY3Rpb24gPSBhc3luYyAob3BlcmF0aW9uKSA9PiB7XG4gICAgY29uc3Qgd29ya2luZyA9IHN0cnVjdHVyZWRDbG9uZShzdG9yYWdlKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBvcGVyYXRpb24oe1xuICAgICAgbG9hZEZvclVwZGF0ZTogYXN5bmMgKCkgPT4gd29ya2luZy5yb3csXG4gICAgICBpbnNlcnRCYWNrdXA6IGFzeW5jICgpID0+IHtcbiAgICAgICAgd29ya2luZy5iYWNrdXBDb3VudCArPSAxO1xuICAgICAgfSxcbiAgICAgIHJlcGxhY2VTdGF0ZTogYXN5bmMgKHJlcGxhY2VtZW50KSA9PiB7XG4gICAgICAgIHdvcmtpbmcucm93LmRhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUocmVwbGFjZW1lbnQuZGF0YSk7XG4gICAgICB9LFxuICAgICAgaW5zZXJ0QXVkaXQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXVkaXQgdW5hdmFpbGFibGVcIik7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIE9iamVjdC5hc3NpZ24oc3RvcmFnZSwgd29ya2luZyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgYXdhaXQgYXNzZXJ0LnJlamVjdHMoXG4gICAgcmVjb3ZlckludmFsaWRUcmFja2VyU3RhdGUoe1xuICAgICAgYWN0b3JJZDogXCJ1c2VyX3N0YWZmXCIsXG4gICAgICByZWFzb246IFwiU25hcHNob3QgdmFsaWRhdGlvbiBibG9ja2VkIHN0YWZmIGFjY2Vzc1wiLFxuICAgIH0sIHJ1blRyYW5zYWN0aW9uKSxcbiAgICAvYXVkaXQgdW5hdmFpbGFibGUvLFxuICApO1xuICBhc3NlcnQuZGVlcEVxdWFsKHN0b3JhZ2Uucm93LmRhdGEsIG9yaWdpbmFsRGF0YSk7XG4gIGFzc2VydC5lcXVhbChzdG9yYWdlLmJhY2t1cENvdW50LCAwKTtcbn0pO1xuXG50ZXN0KFwidHJhY2tlciByZWNvdmVyeSBjb3JlIHJlZnVzZXMgdmFsaWQgYW5kIG1pc3NpbmcgbG9ja2VkIHNuYXBzaG90c1wiLCBhc3luYyAoKSA9PiB7XG4gIGZvciAoY29uc3QgW3JvdywgZXhwZWN0ZWRdIG9mIFtcbiAgICBbeyBpZDogXCJtYWluXCIsIGRhdGE6IGhlYWx0aHlTdGF0ZSgpIH0sIFwidmFsaWRcIl0sXG4gICAgW3VuZGVmaW5lZCwgXCJtaXNzaW5nXCJdLFxuICBdIGFzIGNvbnN0KSB7XG4gICAgbGV0IHdyaXRlQ291bnQgPSAwO1xuICAgIGNvbnN0IHJ1blRyYW5zYWN0aW9uOiBSdW5SZWNvdmVyeVRyYW5zYWN0aW9uID0gYXN5bmMgKG9wZXJhdGlvbikgPT5cbiAgICAgIG9wZXJhdGlvbih7XG4gICAgICAgIGxvYWRGb3JVcGRhdGU6IGFzeW5jICgpID0+IHJvdyxcbiAgICAgICAgaW5zZXJ0QmFja3VwOiBhc3luYyAoKSA9PiB7IHdyaXRlQ291bnQgKz0gMTsgfSxcbiAgICAgICAgcmVwbGFjZVN0YXRlOiBhc3luYyAoKSA9PiB7IHdyaXRlQ291bnQgKz0gMTsgfSxcbiAgICAgICAgaW5zZXJ0QXVkaXQ6IGFzeW5jICgpID0+IHsgd3JpdGVDb3VudCArPSAxOyB9LFxuICAgICAgfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVjb3ZlckludmFsaWRUcmFja2VyU3RhdGUoe1xuICAgICAgYWN0b3JJZDogXCJ1c2VyX3N0YWZmXCIsXG4gICAgICByZWFzb246IFwiU25hcHNob3QgdmFsaWRhdGlvbiBibG9ja2VkIHN0YWZmIGFjY2Vzc1wiLFxuICAgIH0sIHJ1blRyYW5zYWN0aW9uKTtcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0Lm91dGNvbWUsIGV4cGVjdGVkKTtcbiAgICBhc3NlcnQuZXF1YWwod3JpdGVDb3VudCwgMCk7XG4gIH1cbn0pO1xuXG50ZXN0KFwidHJhY2tlciByZWNvdmVyeSByZXR1cm5zIGEgc2FmZSByZXNwb25zZSB3aGVuIGl0cyB0cmFuc2FjdGlvbiBmYWlsc1wiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGVycm9yczogdW5rbm93bltdID0gW107XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gIGFwcC51c2UoKHJlcSwgX3JlcywgbmV4dCkgPT4ge1xuICAgIHJlcS5sb2cgPSB7XG4gICAgICBpbmZvKCkge30sXG4gICAgICB3YXJuKCkge30sXG4gICAgICBlcnJvcih2YWx1ZTogdW5rbm93bikgeyBlcnJvcnMucHVzaCh2YWx1ZSk7IH0sXG4gICAgfSBhcyB1bmtub3duIGFzIHR5cGVvZiByZXEubG9nO1xuICAgIG5leHQoKTtcbiAgfSk7XG4gIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IGhlYWx0aHlTdGF0ZSgpLFxuICAgIHNhdmVTdGF0ZTogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgIGF1dGhvcml6ZVN0YWZmOiAoX3JlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICByZXMubG9jYWxzLnN0YWZmVXNlcklkID0gXCJ1c2VyX3N0YWZmXCI7XG4gICAgICBuZXh0KCk7XG4gICAgfSxcbiAgICByZWNvdmVySW52YWxpZFN0YXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhYmFzZSB1bmF2YWlsYWJsZVwiKTtcbiAgICB9LFxuICB9KSk7XG4gIGNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIik7XG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiBzZXJ2ZXIub25jZShcImxpc3RlbmluZ1wiLCByZXNvbHZlKSk7XG4gIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkcmVzcy5wb3J0fS90cmFja2VyL3JlY292ZXJgLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICByZWFzb246IFwiU25hcHNob3QgdmFsaWRhdGlvbiBibG9ja2VkIHN0YWZmIGFjY2Vzc1wiLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2Uuc3RhdHVzLCA1MDMpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoYXdhaXQgcmVzcG9uc2UuanNvbigpLCB7XG4gICAgICBlcnJvcjogXCJUcmFja2VyIHJlY292ZXJ5IGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQgc2FmZWx5XCIsXG4gICAgfSk7XG4gICAgYXNzZXJ0LmVxdWFsKGVycm9ycy5sZW5ndGgsIDEpO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpLFxuICAgICk7XG4gIH1cbn0pO1xuXG50ZXN0KFwiQ2xlcmsgcHJveHkgaWdub3JlcyBzcG9vZmVkIGZvcndhcmRlZCBob3N0c1wiLCAoKSA9PiB7XG4gIGNvbnN0IHByZXZpb3VzRG9tYWlucyA9IHByb2Nlc3MuZW52LlJFUExJVF9ET01BSU5TO1xuICBjb25zdCBwcmV2aW91c05vZGVFbnZpcm9ubWVudCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WO1xuICBwcm9jZXNzLmVudi5SRVBMSVRfRE9NQUlOUyA9IFwidHJhY2tlci5leGFtcGxlLmNvbVwiO1xuICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiO1xuICB0cnkge1xuICAgIGFzc2VydC5lcXVhbChcbiAgICAgIGdldENsZXJrUHJveHlIb3N0KHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIGhvc3Q6IFwidHJhY2tlci5leGFtcGxlLmNvbVwiLFxuICAgICAgICAgIFwieC1mb3J3YXJkZWQtaG9zdFwiOiBcImF0dGFja2VyLmV4YW1wbGVcIixcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgXCJ0cmFja2VyLmV4YW1wbGUuY29tXCIsXG4gICAgKTtcbiAgICBhc3NlcnQuZXF1YWwoXG4gICAgICBnZXRDbGVya1Byb3h5SG9zdCh7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBob3N0OiBcImF0dGFja2VyLmV4YW1wbGVcIixcbiAgICAgICAgICBcIngtZm9yd2FyZGVkLWhvc3RcIjogXCJhdHRhY2tlci5leGFtcGxlXCIsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICApO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChwcmV2aW91c0RvbWFpbnMgPT09IHVuZGVmaW5lZCkgZGVsZXRlIHByb2Nlc3MuZW52LlJFUExJVF9ET01BSU5TO1xuICAgIGVsc2UgcHJvY2Vzcy5lbnYuUkVQTElUX0RPTUFJTlMgPSBwcmV2aW91c0RvbWFpbnM7XG4gICAgaWYgKHByZXZpb3VzTm9kZUVudmlyb25tZW50ID09PSB1bmRlZmluZWQpIGRlbGV0ZSBwcm9jZXNzLmVudi5OT0RFX0VOVjtcbiAgICBlbHNlIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gcHJldmlvdXNOb2RlRW52aXJvbm1lbnQ7XG4gIH1cbn0pO1xuXG50ZXN0KFwicGVyc2lzdGVkIHRyYWNrZXIgdmFsaWRhdGlvbiBpZGVudGlmaWVzIG1hbGZvcm1lZCBuZXN0ZWQgcmVjb3Jkc1wiLCAoKSA9PiB7XG4gIGNvbnN0IHZhbGlkU3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgdmFsaWRTdGF0ZS5icmFuZGluZyA9IHsgbmFtZTogXCJTdGFpdFNxdWFzaFwiLCBsb2dvUGF0aDogbnVsbCB9O1xuICB2YWxpZFN0YXRlLm1hdGNoZXMgPSBbe1xuICAgIGlkOiBcIm1hdGNoLTFcIixcbiAgICBleHRlcm5hbElkOiBudWxsLFxuICAgIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gICAgb3Bwb25lbnQ6IFwiT3Bwb25lbnRcIixcbiAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEwOjAwOjAwLjAwMFpcIixcbiAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMDo0NTowMC4wMDBaXCIsXG4gICAgdmVudWU6IFwiVmVudWVcIixcbiAgICBjb3VydDogXCJDb3VydCAxXCIsXG4gICAgY29hY2hJZDogXCJjb2FjaC0xXCIsXG4gICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcIm1hdGNoLTFcIixcbiAgICAgIG9ic2VydmF0aW9uczogW1wiU3Ryb25nIGxlbmd0aC5cIiwgXCJSZWNvdmVyZWQgd2VsbC5cIiwgXCJTdGF5ZWQgY29tcG9zZWQuXCJdLFxuICAgICAgdHJhbnNjcmlwdDogbnVsbCxcbiAgICAgIGF1ZGlvUGF0aDogbnVsbCxcbiAgICAgIHVwZGF0ZWRBdDogXCIyMDI2LTA5LTE2VDExOjAwOjAwLjAwMFpcIixcbiAgICB9LFxuICB9XTtcbiAgdmFsaWRTdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW3tcbiAgICBmYWlsZWRBdHRlbXB0czogMixcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQwOTowMDowMC4wMDBaXCIsXG4gICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQwOToxMDowMC4wMDBaXCIsXG4gICAgb3V0YWdlRHVyYXRpb25NczogNjAwXzAwMCxcbiAgfV07XG5cbiAgY29uc3QgY29ycnVwdGlvbnM6IEFycmF5PFtzdHJpbmcsIChzbmFwc2hvdDogUmVjb3JkPHN0cmluZywgYW55PikgPT4gdm9pZCwgUmVnRXhwXT4gPSBbXG4gICAgW1wibWF0Y2hcIiwgKHNuYXBzaG90KSA9PiB7XG4gICAgICBzbmFwc2hvdC5tYXRjaGVzWzBdLnN0YXJ0c0F0ID0gXCJub3QtYS1kYXRlXCI7XG4gICAgfSwgL21hdGNoZXNcXC4wXFwuc3RhcnRzQXQvXSxcbiAgICBbXCJyZXBvcnRcIiwgKHNuYXBzaG90KSA9PiB7XG4gICAgICBzbmFwc2hvdC5tYXRjaGVzWzBdLnJlcG9ydC5vYnNlcnZhdGlvbnMgPSBcIm5vdC1hbi1hcnJheVwiO1xuICAgIH0sIC9tYXRjaGVzXFwuMFxcLnJlcG9ydFxcLm9ic2VydmF0aW9ucy9dLFxuICAgIFtcInBlcnNvblwiLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90LnBsYXllcnNbMF0ubmFtZSA9IDQyO1xuICAgIH0sIC9wbGF5ZXJzXFwuMFxcLm5hbWUvXSxcbiAgICBbXCJicmFuZGluZ1wiLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90LmJyYW5kaW5nLmxvZ29QYXRoID0gXCIvdW5zYWZlL2xvZ28ucG5nXCI7XG4gICAgfSwgL2JyYW5kaW5nXFwubG9nb1BhdGgvXSxcbiAgICBbXCJyZWZyZXNoIGhlYWx0aFwiLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90LnJlZnJlc2hIZWFsdGguY29uc2VjdXRpdmVGYWlsdXJlcyA9IC0xO1xuICAgIH0sIC9yZWZyZXNoSGVhbHRoXFwuY29uc2VjdXRpdmVGYWlsdXJlcy9dLFxuICAgIFtcInJlY292ZXJ5XCIsIChzbmFwc2hvdCkgPT4ge1xuICAgICAgc25hcHNob3QucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllc1swXS5mYWlsZWRBdHRlbXB0cyA9IDA7XG4gICAgfSwgL3JlZnJlc2hIZWFsdGhcXC5wZW5kaW5nUmVjb3Zlcmllc1xcLjBcXC5mYWlsZWRBdHRlbXB0cy9dLFxuICBdO1xuXG4gIGZvciAoY29uc3QgW25hbWUsIGNvcnJ1cHQsIGV4cGVjdGVkUGF0aF0gb2YgY29ycnVwdGlvbnMpIHtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHN0cnVjdHVyZWRDbG9uZSh2YWxpZFN0YXRlKSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgY29ycnVwdChzbmFwc2hvdCk7XG4gICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICgpID0+IHBhcnNlUGVyc2lzdGVkVHJhY2tlclN0YXRlKHNuYXBzaG90KSxcbiAgICAgIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgYXNzZXJ0Lm1hdGNoKGVycm9yLm1lc3NhZ2UsIC9TdG9yZWQgdHJhY2tlciBzbmFwc2hvdCBpcyBpbnZhbGlkLyk7XG4gICAgICAgIGFzc2VydC5tYXRjaChlcnJvci5tZXNzYWdlLCAvUmVwYWlyIG9yIHJlcGxhY2UgdGhlIFwibWFpblwiIHRyYWNrZXJfc3RhdGUgcmVjb3JkLyk7XG4gICAgICAgIGFzc2VydC5tYXRjaChlcnJvci5tZXNzYWdlLCBleHBlY3RlZFBhdGgsIG5hbWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufSk7XG5cbnRlc3QoXCJwZXJzaXN0ZWQgdHJhY2tlciB2YWxpZGF0aW9uIGlkZW50aWZpZXMgaW5jb25zaXN0ZW50IHJlbGF0ZWQgcmVjb3Jkc1wiLCAoKSA9PiB7XG4gIGNvbnN0IHZhbGlkU3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgdmFsaWRTdGF0ZS5tYXRjaGVzID0gW3tcbiAgICBpZDogXCJtYXRjaC0xXCIsXG4gICAgZXh0ZXJuYWxJZDogbnVsbCxcbiAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgIG9wcG9uZW50OiBcIk9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsXG4gICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTA6NDU6MDAuMDAwWlwiLFxuICAgIHZlbnVlOiBcIlZlbnVlXCIsXG4gICAgY291cnQ6IFwiQ291cnQgMVwiLFxuICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICByZXN1bHQ6IFwiV29uIDMtMVwiLFxuICAgIHJlcG9ydDoge1xuICAgICAgbWF0Y2hJZDogXCJtYXRjaC0xXCIsXG4gICAgICBvYnNlcnZhdGlvbnM6IFtcIlN0cm9uZyBsZW5ndGguXCIsIFwiUmVjb3ZlcmVkIHdlbGwuXCIsIFwiU3RheWVkIGNvbXBvc2VkLlwiXSxcbiAgICAgIHRyYW5zY3JpcHQ6IG51bGwsXG4gICAgICBhdWRpb1BhdGg6IG51bGwsXG4gICAgICB1cGRhdGVkQXQ6IFwiMjAyNi0wOS0xNlQxMTowMDowMC4wMDBaXCIsXG4gICAgfSxcbiAgfV07XG5cbiAgY29uc3QgaW5jb25zaXN0ZW5jaWVzOiBBcnJheTxbXG4gICAgc3RyaW5nLFxuICAgIChzbmFwc2hvdDogUmVjb3JkPHN0cmluZywgYW55PikgPT4gdm9pZCxcbiAgICBSZWdFeHAsXG4gICAgUmVnRXhwLFxuICBdPiA9IFtcbiAgICBbXCJtaXNzaW5nIHBsYXllclwiLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90Lm1hdGNoZXNbMF0ucGxheWVySWQgPSBcIm1pc3NpbmctcGxheWVyXCI7XG4gICAgfSwgL21hdGNoZXNcXC4wXFwucGxheWVySWQvLCAvTWF0Y2ggXCJtYXRjaC0xXCIgcmVmZXJlbmNlcyBtaXNzaW5nIHBsYXllciBcIm1pc3NpbmctcGxheWVyXCIvXSxcbiAgICBbXCJtaXNzaW5nIGNvYWNoXCIsIChzbmFwc2hvdCkgPT4ge1xuICAgICAgc25hcHNob3QubWF0Y2hlc1swXS5jb2FjaElkID0gXCJtaXNzaW5nLWNvYWNoXCI7XG4gICAgfSwgL21hdGNoZXNcXC4wXFwuY29hY2hJZC8sIC9NYXRjaCBcIm1hdGNoLTFcIiByZWZlcmVuY2VzIG1pc3NpbmcgY29hY2ggXCJtaXNzaW5nLWNvYWNoXCIvXSxcbiAgICBbXCJtaXNtYXRjaGVkIHJlcG9ydFwiLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90Lm1hdGNoZXNbMF0ucmVwb3J0Lm1hdGNoSWQgPSBcIm1hdGNoLTJcIjtcbiAgICB9LCAvbWF0Y2hlc1xcLjBcXC5yZXBvcnRcXC5tYXRjaElkLywgL1JlcG9ydCBtYXRjaElkIFwibWF0Y2gtMlwiIGRvZXMgbm90IG1hdGNoIGNvbnRhaW5pbmcgbWF0Y2ggXCJtYXRjaC0xXCIvXSxcbiAgICBbXCJlbmQgYmVmb3JlIHN0YXJ0XCIsIChzbmFwc2hvdCkgPT4ge1xuICAgICAgc25hcHNob3QubWF0Y2hlc1swXS5lbmRzQXQgPSBcIjIwMjYtMDktMTZUMDk6NTk6NTkuMDAwWlwiO1xuICAgIH0sIC9tYXRjaGVzXFwuMFxcLmVuZHNBdC8sIC9NYXRjaCBcIm1hdGNoLTFcIiBlbmRzQXQgbXVzdCBiZSBhZnRlciBzdGFydHNBdC9dLFxuICAgIFtcImVuZCBlcXVhbCB0byBzdGFydFwiLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90Lm1hdGNoZXNbMF0uZW5kc0F0ID0gc25hcHNob3QubWF0Y2hlc1swXS5zdGFydHNBdDtcbiAgICB9LCAvbWF0Y2hlc1xcLjBcXC5lbmRzQXQvLCAvTWF0Y2ggXCJtYXRjaC0xXCIgZW5kc0F0IG11c3QgYmUgYWZ0ZXIgc3RhcnRzQXQvXSxcbiAgXTtcblxuICBmb3IgKGNvbnN0IFtuYW1lLCBjb3JydXB0LCBleHBlY3RlZFBhdGgsIGV4cGVjdGVkQ29uZmxpY3RdIG9mIGluY29uc2lzdGVuY2llcykge1xuICAgIGNvbnN0IHNuYXBzaG90ID0gc3RydWN0dXJlZENsb25lKHZhbGlkU3RhdGUpIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgYW55PjtcbiAgICBjb3JydXB0KHNuYXBzaG90KTtcbiAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgKCkgPT4gcGFyc2VQZXJzaXN0ZWRUcmFja2VyU3RhdGUoc25hcHNob3QpLFxuICAgICAgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICBhc3NlcnQubWF0Y2goZXJyb3IubWVzc2FnZSwgL1N0b3JlZCB0cmFja2VyIHNuYXBzaG90IGlzIGludmFsaWQvKTtcbiAgICAgICAgYXNzZXJ0Lm1hdGNoKGVycm9yLm1lc3NhZ2UsIGV4cGVjdGVkUGF0aCwgbmFtZSk7XG4gICAgICAgIGFzc2VydC5tYXRjaChlcnJvci5tZXNzYWdlLCBleHBlY3RlZENvbmZsaWN0LCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICk7XG4gIH1cbn0pO1xuXG5hc3luYyBmdW5jdGlvbiB3aXRoVHJhY2tlclNlcnZlcihcbiAgc3RhdGU6IFRyYWNrZXJTdGF0ZSxcbiAgcnVuOiAodXJsOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD4sXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgYXBwLnVzZSgocmVxLCBfcmVzLCBuZXh0KSA9PiB7XG4gICAgcmVxLmxvZyA9IHtcbiAgICAgIGluZm8oKSB7fSxcbiAgICAgIHdhcm4oKSB7fSxcbiAgICAgIGVycm9yKCkge30sXG4gICAgfSBhcyB1bmtub3duIGFzIHR5cGVvZiByZXEubG9nO1xuICAgIG5leHQoKTtcbiAgfSk7XG4gIGFwcC51c2UoXG4gICAgY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgICBnZXRTdGF0ZTogYXN5bmMgKCkgPT4gc3RydWN0dXJlZENsb25lKHN0YXRlKSxcbiAgICAgIHNhdmVTdGF0ZTogYXN5bmMgKG5leHQpID0+IHtcbiAgICAgICAgc3RhdGUgPSBzdHJ1Y3R1cmVkQ2xvbmUobmV4dCk7XG4gICAgICB9LFxuICAgICAgYXV0aG9yaXplU3RhZmY6IChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCksXG4gICAgfSksXG4gICk7XG5cbiAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3RlbigwLCBcIjEyNy4wLjAuMVwiKTtcbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNlcnZlci5vbmNlKFwibGlzdGVuaW5nXCIsIHJlc29sdmUpO1xuICAgIHNlcnZlci5vbmNlKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgfSk7XG4gIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBydW4oYGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9YCk7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHNlcnZlci5jbG9zZSgoZXJyb3IpID0+IChlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpKSxcbiAgICApO1xuICB9XG59XG5cbnRlc3QoXCJwbGF5ZXIgdHJhY2tlciByZXR1cm5zIG9ubHkgdGhlIHJlcXVlc3RlZCBwbGF5ZXIncyBtYXRjaGVzIGFuZCBhc3NpZ25lZCBjb2FjaGVzXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUucGxheWVycyA9IFtcbiAgICB7IGlkOiBcInBsYXllci0xXCIsIG5hbWU6IFwiUGxheWVyIE9uZVwiLCBzaGFyZVRva2VuOiBcImFcIi5yZXBlYXQoNDMpIH0sXG4gICAgeyBpZDogXCJwbGF5ZXItMlwiLCBuYW1lOiBcIlBsYXllciBUd29cIiwgc2hhcmVUb2tlbjogXCJiXCIucmVwZWF0KDQzKSB9LFxuICBdO1xuICBzdGF0ZS5jb2FjaGVzID0gW1xuICAgIHsgaWQ6IFwiY29hY2gtMVwiLCBuYW1lOiBcIkNvYWNoIE9uZVwiIH0sXG4gICAgeyBpZDogXCJjb2FjaC0yXCIsIG5hbWU6IFwiQ29hY2ggVHdvXCIgfSxcbiAgICB7IGlkOiBcImNvYWNoLXByaXZhdGVcIiwgbmFtZTogXCJQcml2YXRlIENvYWNoXCIgfSxcbiAgXTtcbiAgc3RhdGUuYnJhbmRpbmcgPSB7IG5hbWU6IFwiU3RhaXRTcXVhc2hcIiwgbG9nb1BhdGg6IG51bGwgfTtcbiAgc3RhdGUubWF0Y2hlcyA9IFtcbiAgICB7XG4gICAgICBpZDogXCJwbGF5ZXItMS1tYXRjaFwiLFxuICAgICAgZXh0ZXJuYWxJZDogbnVsbCxcbiAgICAgIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gICAgICBvcHBvbmVudDogXCJWaXNpYmxlIE9wcG9uZW50XCIsXG4gICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE3VDEwOjAwOjAwLjAwMFpcIixcbiAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE3VDEwOjQ1OjAwLjAwMFpcIixcbiAgICAgIHZlbnVlOiBcIlZpc2libGUgVmVudWVcIixcbiAgICAgIGNvdXJ0OiBcIjFcIixcbiAgICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgICAgc3RhdHVzOiBcInVwY29taW5nXCIsXG4gICAgICByZXN1bHQ6IG51bGwsXG4gICAgICByZXBvcnQ6IG51bGwsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJwbGF5ZXItMS1zZWNvbmQtbWF0Y2hcIixcbiAgICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgICAgb3Bwb25lbnQ6IFwiU2Vjb25kIFZpc2libGUgT3Bwb25lbnRcIixcbiAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMThUMTA6MDA6MDAuMDAwWlwiLFxuICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMThUMTA6NDU6MDAuMDAwWlwiLFxuICAgICAgdmVudWU6IFwiVmlzaWJsZSBWZW51ZVwiLFxuICAgICAgY291cnQ6IFwiMlwiLFxuICAgICAgY29hY2hJZDogXCJjb2FjaC0yXCIsXG4gICAgICBzdGF0dXM6IFwidXBjb21pbmdcIixcbiAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgIHJlcG9ydDogbnVsbCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiBcInBsYXllci0yLXByaXZhdGUtbWF0Y2hcIixcbiAgICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMlwiLFxuICAgICAgb3Bwb25lbnQ6IFwiUHJpdmF0ZSBPcHBvbmVudFwiLFxuICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xN1QxMTowMDowMC4wMDBaXCIsXG4gICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xN1QxMTo0NTowMC4wMDBaXCIsXG4gICAgICB2ZW51ZTogXCJQcml2YXRlIFZlbnVlXCIsXG4gICAgICBjb3VydDogXCIzXCIsXG4gICAgICBjb2FjaElkOiBcImNvYWNoLXByaXZhdGVcIixcbiAgICAgIHN0YXR1czogXCJ1cGNvbWluZ1wiLFxuICAgICAgcmVzdWx0OiBudWxsLFxuICAgICAgcmVwb3J0OiBudWxsLFxuICAgIH0sXG4gIF07XG5cbiAgYXdhaXQgd2l0aFRyYWNrZXJTZXJ2ZXIoc3RhdGUsIGFzeW5jICh1cmwpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0vcGxheWVycy8ke1wiYVwiLnJlcGVhdCg0Myl9L3RyYWNrZXJgKTtcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2Uuc3RhdHVzLCAyMDApO1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCkgYXMge1xuICAgICAgcGxheWVyOiB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIG1hdGNoZXM6IEFycmF5PHsgaWQ6IHN0cmluZzsgcGxheWVySWQ6IHN0cmluZyB9PjtcbiAgICAgIGNvYWNoZXM6IEFycmF5PHsgaWQ6IHN0cmluZyB9PjtcbiAgICAgIHBsYXllcnM/OiB1bmtub3duO1xuICAgIH07XG5cbiAgICBhc3NlcnQuZXF1YWwoYm9keS5wbGF5ZXIuaWQsIFwicGxheWVyLTFcIik7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChib2R5Lm1hdGNoZXMubWFwKChtYXRjaCkgPT4gbWF0Y2guaWQpLCBbXG4gICAgICBcInBsYXllci0xLW1hdGNoXCIsXG4gICAgICBcInBsYXllci0xLXNlY29uZC1tYXRjaFwiLFxuICAgIF0pO1xuICAgIGFzc2VydC5vayhib2R5Lm1hdGNoZXMuZXZlcnkoKG1hdGNoKSA9PiBtYXRjaC5wbGF5ZXJJZCA9PT0gXCJwbGF5ZXItMVwiKSk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChib2R5LmNvYWNoZXMubWFwKChjb2FjaCkgPT4gY29hY2guaWQpLCBbXCJjb2FjaC0xXCIsIFwiY29hY2gtMlwiXSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvZHkucGxheWVycywgdW5kZWZpbmVkKTtcbiAgICBhc3NlcnQuZG9lc05vdE1hdGNoKEpTT04uc3RyaW5naWZ5KGJvZHkpLCAvc2hhcmVUb2tlbi8pO1xuICAgIGFzc2VydC5kb2VzTm90TWF0Y2goSlNPTi5zdHJpbmdpZnkoYm9keSksIC9QbGF5ZXIgVHdvfFByaXZhdGUgT3Bwb25lbnR8UHJpdmF0ZSBDb2FjaHxQcml2YXRlIFZlbnVlLyk7XG4gIH0pO1xufSk7XG5cbnRlc3QoXCJ1bmtub3duIHBsYXllciB0cmFja2VyIGxpbmtzIHJldHVybiBhIHNhZmUgbm90LWZvdW5kIHJlc3BvbnNlXCIsIGFzeW5jICgpID0+IHtcbiAgYXdhaXQgd2l0aFRyYWNrZXJTZXJ2ZXIoaGVhbHRoeVN0YXRlKCksIGFzeW5jICh1cmwpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0vcGxheWVycy8ke1wielwiLnJlcGVhdCg0Myl9L3RyYWNrZXJgKTtcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2Uuc3RhdHVzLCA0MDQpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoYXdhaXQgcmVzcG9uc2UuanNvbigpLCB7IGVycm9yOiBcIlBsYXllciBsaW5rIG5vdCBmb3VuZFwiIH0pO1xuICB9KTtcbn0pO1xuXG50ZXN0KFwicm90YXRpbmcgYSBwbGF5ZXIgc2hhcmUgdG9rZW4gaW1tZWRpYXRlbHkgcmV2b2tlcyB0aGUgb2xkIGxpbmtcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBjb25zdCBvbGRUb2tlbiA9IHN0YXRlLnBsYXllcnNbMF0hLnNoYXJlVG9rZW4hO1xuXG4gIGF3YWl0IHdpdGhUcmFja2VyU2VydmVyKHN0YXRlLCBhc3luYyAodXJsKSA9PiB7XG4gICAgY29uc3Qgcm90YXRlZFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgJHt1cmx9L3RyYWNrZXIvcGxheWVycy9wbGF5ZXItMS9zaGFyZS10b2tlbmAsXG4gICAgICB7IG1ldGhvZDogXCJQT1NUXCIgfSxcbiAgICApO1xuICAgIGFzc2VydC5lcXVhbChyb3RhdGVkUmVzcG9uc2Uuc3RhdHVzLCAyMDApO1xuICAgIGNvbnN0IHJvdGF0ZWRQbGF5ZXIgPSBhd2FpdCByb3RhdGVkUmVzcG9uc2UuanNvbigpIGFzIHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICBzaGFyZVRva2VuOiBzdHJpbmc7XG4gICAgfTtcbiAgICBhc3NlcnQuZXF1YWwocm90YXRlZFBsYXllci5pZCwgXCJwbGF5ZXItMVwiKTtcbiAgICBhc3NlcnQubm90RXF1YWwocm90YXRlZFBsYXllci5zaGFyZVRva2VuLCBvbGRUb2tlbik7XG4gICAgYXNzZXJ0Lm9rKHJvdGF0ZWRQbGF5ZXIuc2hhcmVUb2tlbi5sZW5ndGggPj0gMzIpO1xuXG4gICAgY29uc3Qgb2xkTGlua1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9wbGF5ZXJzLyR7b2xkVG9rZW59L3RyYWNrZXJgKTtcbiAgICBhc3NlcnQuZXF1YWwob2xkTGlua1Jlc3BvbnNlLnN0YXR1cywgNDA0KTtcblxuICAgIGNvbnN0IG5ld0xpbmtSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYCR7dXJsfS9wbGF5ZXJzLyR7cm90YXRlZFBsYXllci5zaGFyZVRva2VufS90cmFja2VyYCxcbiAgICApO1xuICAgIGFzc2VydC5lcXVhbChuZXdMaW5rUmVzcG9uc2Uuc3RhdHVzLCAyMDApO1xuICB9KTtcbn0pO1xuXG50ZXN0KFwicmVmcmVzaCByb3V0ZSBzZW5kcyBtYXRjaGluZyBmYWlsdXJlIGFuZCByZWNvdmVyeSB3ZWJob29rIHBheWxvYWRzIG9uY2VcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvcmlnaW5hbEZldGNoID0gZ2xvYmFsVGhpcy5mZXRjaDtcbiAgY29uc3Qgb3JpZ2luYWxFbnZpcm9ubWVudCA9IHtcbiAgICB0aHJlc2hvbGQ6IHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfQUxFUlRfVEhSRVNIT0xEXCJdLFxuICAgIHNjaGVkdWxlVXJsOiBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSxcbiAgICB3ZWJob29rVXJsOiBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdLFxuICB9O1xuICBjb25zdCB3ZWJob29rUGF5bG9hZHM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10gPSBbXTtcbiAgbGV0IHNjaGVkdWxlRmFpbHMgPSB0cnVlO1xuXG4gIHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfQUxFUlRfVEhSRVNIT0xEXCJdID0gXCIxXCI7XG4gIHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMXCJdID0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiO1xuICBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdID0gXCJodHRwczovL2FsZXJ0cy50ZXN0L2hvb2tcIjtcbiAgZ2xvYmFsVGhpcy5mZXRjaCA9IGFzeW5jIChpbnB1dCwgaW5pdCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgaWYgKHVybCA9PT0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiKSB7XG4gICAgICBpZiAoc2NoZWR1bGVGYWlscykgcmV0dXJuIG5ldyBSZXNwb25zZShcInVuYXZhaWxhYmxlXCIsIHsgc3RhdHVzOiA1MDMgfSk7XG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG1hdGNoZXM6IFtdIH0pO1xuICAgIH1cbiAgICBpZiAodXJsID09PSBcImh0dHBzOi8vYWxlcnRzLnRlc3QvaG9va1wiKSB7XG4gICAgICB3ZWJob29rUGF5bG9hZHMucHVzaChKU09OLnBhcnNlKFN0cmluZyhpbml0Py5ib2R5KSkpO1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjA0IH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luYWxGZXRjaChpbnB1dCwgaW5pdCk7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCB3aXRoVHJhY2tlclNlcnZlcihoZWFsdGh5U3RhdGUoKSwgYXN5bmMgKHVybCkgPT4ge1xuICAgICAgY29uc3QgZmFpbHVyZSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7IG1ldGhvZDogXCJQT1NUXCIgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwoZmFpbHVyZS5zdGF0dXMsIDUwMik7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1BheWxvYWRzLmxlbmd0aCwgMSk7XG5cbiAgICAgIGNvbnN0IGZhaWx1cmVQYXlsb2FkID0gd2ViaG9va1BheWxvYWRzWzBdITtcbiAgICAgIGFzc2VydC5lcXVhbChmYWlsdXJlUGF5bG9hZC5ldmVudCwgXCJjbHViLWxvY2tlci1yZWZyZXNoLWZhaWxpbmdcIik7XG4gICAgICBhc3NlcnQuZXF1YWwoZmFpbHVyZVBheWxvYWQuY29uc2VjdXRpdmVGYWlsdXJlcywgMSk7XG4gICAgICBhc3NlcnQubWF0Y2goU3RyaW5nKGZhaWx1cmVQYXlsb2FkLnRleHQpLCAvZmFpbGVkIDEgY29uc2VjdXRpdmUgdGltZXMvKTtcbiAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgZmFpbHVyZVBheWxvYWQubGFzdEZhaWx1cmVBdCwgXCJzdHJpbmdcIik7XG5cbiAgICAgIGNvbnN0IHJlcGVhdGVkRmFpbHVyZSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5lcXVhbChyZXBlYXRlZEZhaWx1cmUuc3RhdHVzLCA1MDIpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tQYXlsb2Fkcy5sZW5ndGgsIDEpO1xuXG4gICAgICBzY2hlZHVsZUZhaWxzID0gZmFsc2U7XG4gICAgICBjb25zdCByZWNvdmVyeSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7IG1ldGhvZDogXCJQT1NUXCIgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwocmVjb3Zlcnkuc3RhdHVzLCAyMDApO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tQYXlsb2Fkcy5sZW5ndGgsIDIpO1xuXG4gICAgICBjb25zdCByZWNvdmVyeVBheWxvYWQgPSB3ZWJob29rUGF5bG9hZHNbMV0hO1xuICAgICAgYXNzZXJ0LmVxdWFsKHJlY292ZXJ5UGF5bG9hZC5ldmVudCwgXCJjbHViLWxvY2tlci1yZWZyZXNoLXJlY292ZXJlZFwiKTtcbiAgICAgIGFzc2VydC5lcXVhbChyZWNvdmVyeVBheWxvYWQuZmFpbGVkQXR0ZW1wdHMsIDIpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByZWNvdmVyeVBheWxvYWQub3V0YWdlRHVyYXRpb25NcywgXCJudW1iZXJcIik7XG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHJlY292ZXJ5UGF5bG9hZC5vdXRhZ2VTdGFydGVkQXQsIFwic3RyaW5nXCIpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByZWNvdmVyeVBheWxvYWQucmVjb3ZlcmVkQXQsIFwic3RyaW5nXCIpO1xuICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICByZWNvdmVyeVBheWxvYWQub3V0YWdlRHVyYXRpb25NcyxcbiAgICAgICAgRGF0ZS5wYXJzZShTdHJpbmcocmVjb3ZlcnlQYXlsb2FkLnJlY292ZXJlZEF0KSkgLVxuICAgICAgICAgIERhdGUucGFyc2UoU3RyaW5nKHJlY292ZXJ5UGF5bG9hZC5vdXRhZ2VTdGFydGVkQXQpKSxcbiAgICAgICk7XG4gICAgICBhc3NlcnQubWF0Y2goU3RyaW5nKHJlY292ZXJ5UGF5bG9hZC50ZXh0KSwgLzIgZmFpbGVkIGF0dGVtcHRzXFwuLyk7XG5cbiAgICAgIGNvbnN0IG5vcm1hbFN1Y2Nlc3MgPSBhd2FpdCBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwobm9ybWFsU3VjY2Vzcy5zdGF0dXMsIDIwMCk7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1BheWxvYWRzLmxlbmd0aCwgMik7XG4gICAgfSk7XG4gIH0gZmluYWxseSB7XG4gICAgZ2xvYmFsVGhpcy5mZXRjaCA9IG9yaWdpbmFsRmV0Y2g7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoe1xuICAgICAgQ0xVQl9MT0NLRVJfQUxFUlRfVEhSRVNIT0xEOiBvcmlnaW5hbEVudmlyb25tZW50LnRocmVzaG9sZCxcbiAgICAgIENMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTDogb3JpZ2luYWxFbnZpcm9ubWVudC5zY2hlZHVsZVVybCxcbiAgICAgIFNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMOiBvcmlnaW5hbEVudmlyb25tZW50LndlYmhvb2tVcmwsXG4gICAgfSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBkZWxldGUgcHJvY2Vzcy5lbnZba2V5XTtcbiAgICAgIGVsc2UgcHJvY2Vzcy5lbnZba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufSk7XG5cbnRlc3QoXCJyZWZyZXNoIHJvdXRlIHJlY29yZHMgZmVlZCBtZXJnZSByZWplY3Rpb24gYXMgYSByZWZyZXNoIGZhaWx1cmVcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvcmlnaW5hbEZldGNoID0gZ2xvYmFsVGhpcy5mZXRjaDtcbiAgY29uc3Qgb3JpZ2luYWxFbnZpcm9ubWVudCA9IHtcbiAgICB0aHJlc2hvbGQ6IHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfQUxFUlRfVEhSRVNIT0xEXCJdLFxuICAgIHNjaGVkdWxlVXJsOiBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSxcbiAgICB3ZWJob29rVXJsOiBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdLFxuICB9O1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5tYXRjaGVzID0gW3tcbiAgICBpZDogXCJsb2NhbC1tYXRjaFwiLFxuICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgICBvcHBvbmVudDogXCJMb2NhbCBvcHBvbmVudFwiLFxuICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEwOjQ1OjAwLjAwMFpcIixcbiAgICB2ZW51ZTogXCJWZW51ZVwiLFxuICAgIGNvdXJ0OiBcIkNvdXJ0IDFcIixcbiAgICBjb2FjaElkOiBcImNvYWNoLTFcIixcbiAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgcmVzdWx0OiBcIldvbiAzLTFcIixcbiAgICByZXBvcnQ6IG51bGwsXG4gIH1dO1xuICBsZXQgd2ViaG9va1JlcXVlc3RzID0gMDtcblxuICBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX0FMRVJUX1RIUkVTSE9MRFwiXSA9IFwiMVwiO1xuICBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSA9IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIjtcbiAgcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXSA9IFwiaHR0cHM6Ly9hbGVydHMudGVzdC9ob29rXCI7XG4gIGdsb2JhbFRoaXMuZmV0Y2ggPSBhc3luYyAoaW5wdXQpID0+IHtcbiAgICBpZiAoU3RyaW5nKGlucHV0KSA9PT0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiKSB7XG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7XG4gICAgICAgIG1hdGNoZXM6IFt7XG4gICAgICAgICAgZXh0ZXJuYWxJZDogXCJleHRlcm5hbC1tYXRjaFwiLFxuICAgICAgICAgIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gICAgICAgICAgb3Bwb25lbnQ6IFwiSW1wb3J0ZWQgb3Bwb25lbnRcIixcbiAgICAgICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEwOjMwOjAwLjAwMFpcIixcbiAgICAgICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMToxNTowMC4wMDBaXCIsXG4gICAgICAgICAgdmVudWU6IFwiVmVudWVcIixcbiAgICAgICAgICBjb3VydDogXCJDb3VydCAyXCIsXG4gICAgICAgIH1dLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHdlYmhvb2tSZXF1ZXN0cyArPSAxO1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDIwNCB9KTtcbiAgfTtcblxuICB0cnkge1xuICAgIGF3YWl0IHdpdGhUcmFja2VyU2VydmVyKHN0YXRlLCBhc3luYyAodXJsKSA9PiB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5zdGF0dXMsIDUwMik7XG4gICAgICBhc3NlcnQubWF0Y2goXG4gICAgICAgIFN0cmluZygoYXdhaXQgcmVzcG9uc2UuanNvbigpIGFzIHsgZXJyb3I6IHN0cmluZyB9KS5lcnJvciksXG4gICAgICAgIC9vdmVybGFwcGluZyBhIHJldGFpbmVkIG1hdGNoLyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGhlYWx0aCA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL2hlYWx0aGApO1xuICAgICAgYXNzZXJ0LmVxdWFsKGhlYWx0aC5zdGF0dXMsIDIwMCk7XG4gICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgIChhd2FpdCBoZWFsdGguanNvbigpIGFzIHsgY29uc2VjdXRpdmVGYWlsdXJlczogbnVtYmVyIH0pXG4gICAgICAgICAgLmNvbnNlY3V0aXZlRmFpbHVyZXMsXG4gICAgICAgIDEsXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tSZXF1ZXN0cywgMSk7XG4gICAgfSk7XG4gIH0gZmluYWxseSB7XG4gICAgZ2xvYmFsVGhpcy5mZXRjaCA9IG9yaWdpbmFsRmV0Y2g7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoe1xuICAgICAgQ0xVQl9MT0NLRVJfQUxFUlRfVEhSRVNIT0xEOiBvcmlnaW5hbEVudmlyb25tZW50LnRocmVzaG9sZCxcbiAgICAgIENMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTDogb3JpZ2luYWxFbnZpcm9ubWVudC5zY2hlZHVsZVVybCxcbiAgICAgIFNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMOiBvcmlnaW5hbEVudmlyb25tZW50LndlYmhvb2tVcmwsXG4gICAgfSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBkZWxldGUgcHJvY2Vzcy5lbnZba2V5XTtcbiAgICAgIGVsc2UgcHJvY2Vzcy5lbnZba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufSk7XG5cbnRlc3QoXCJyZWZyZXNoIHJvdXRlIHN1Y2NlZWRzIHdoaWxlIGEgcmVjb3Zlcnkgd2ViaG9vayBpcyByZXRyaWVkIHVudGlsIGRlbGl2ZXJlZFwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsRmV0Y2ggPSBnbG9iYWxUaGlzLmZldGNoO1xuICBjb25zdCBvcmlnaW5hbEVudmlyb25tZW50ID0ge1xuICAgIHNjaGVkdWxlVXJsOiBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSxcbiAgICB3ZWJob29rVXJsOiBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdLFxuICB9O1xuICBjb25zdCByZWNvdmVyeSA9IHtcbiAgICBmYWlsZWRBdHRlbXB0czogMixcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMTo1MDowMC4wMDBaXCIsXG4gICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQxMjowMDowMC4wMDBaXCIsXG4gICAgb3V0YWdlRHVyYXRpb25NczogMTAgKiA2MF8wMDAsXG4gIH07XG4gIGNvbnN0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMgPSBbcmVjb3ZlcnldO1xuICBjb25zdCB3ZWJob29rUGF5bG9hZHM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10gPSBbXTtcbiAgbGV0IHdlYmhvb2tGYWlscyA9IHRydWU7XG5cbiAgcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl0gPSBcImh0dHBzOi8vc2NoZWR1bGUudGVzdC9mZWVkXCI7XG4gIHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl0gPSBcImh0dHBzOi8vYWxlcnRzLnRlc3QvaG9va1wiO1xuICBnbG9iYWxUaGlzLmZldGNoID0gYXN5bmMgKGlucHV0LCBpbml0KSA9PiB7XG4gICAgY29uc3QgdXJsID0gU3RyaW5nKGlucHV0KTtcbiAgICBpZiAodXJsID09PSBcImh0dHBzOi8vc2NoZWR1bGUudGVzdC9mZWVkXCIpIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKHsgbWF0Y2hlczogW10gfSk7XG4gICAgfVxuICAgIGlmICh1cmwgPT09IFwiaHR0cHM6Ly9hbGVydHMudGVzdC9ob29rXCIpIHtcbiAgICAgIHdlYmhvb2tQYXlsb2Fkcy5wdXNoKEpTT04ucGFyc2UoU3RyaW5nKGluaXQ/LmJvZHkpKSk7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHsgc3RhdHVzOiB3ZWJob29rRmFpbHMgPyA1MDMgOiAyMDQgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcmlnaW5hbEZldGNoKGlucHV0LCBpbml0KTtcbiAgfTtcblxuICB0cnkge1xuICAgIGF3YWl0IHdpdGhUcmFja2VyU2VydmVyKHN0YXRlLCBhc3luYyAodXJsKSA9PiB7XG4gICAgICBjb25zdCBmYWlsZWREZWxpdmVyeSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5lcXVhbChmYWlsZWREZWxpdmVyeS5zdGF0dXMsIDIwMCk7XG4gICAgICBjb25zdCBmYWlsZWREZWxpdmVyeUJvZHkgPSBhd2FpdCBmYWlsZWREZWxpdmVyeS5qc29uKCkgYXMge1xuICAgICAgICByZWZyZXNoSGVhbHRoOiB7IHBlbmRpbmdSZWNvdmVyeU5vdGljZXM6IG51bWJlciB9O1xuICAgICAgfTtcbiAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgZmFpbGVkRGVsaXZlcnlCb2R5LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJ5Tm90aWNlcyxcbiAgICAgICAgMSxcbiAgICAgICk7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1BheWxvYWRzLmxlbmd0aCwgMSk7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1BheWxvYWRzWzBdPy5ldmVudCwgXCJjbHViLWxvY2tlci1yZWZyZXNoLXJlY292ZXJlZFwiKTtcbiAgICAgIGFzc2VydC5lcXVhbCh3ZWJob29rUGF5bG9hZHNbMF0/LmZhaWxlZEF0dGVtcHRzLCByZWNvdmVyeS5mYWlsZWRBdHRlbXB0cyk7XG5cbiAgICAgIHdlYmhvb2tGYWlscyA9IGZhbHNlO1xuICAgICAgY29uc3Qgc3VjY2Vzc2Z1bFJldHJ5ID0gYXdhaXQgb3JpZ2luYWxGZXRjaChgJHt1cmx9L3RyYWNrZXIvcmVmcmVzaGAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKHN1Y2Nlc3NmdWxSZXRyeS5zdGF0dXMsIDIwMCk7XG4gICAgICBjb25zdCBzdWNjZXNzZnVsUmV0cnlCb2R5ID0gYXdhaXQgc3VjY2Vzc2Z1bFJldHJ5Lmpzb24oKSBhcyB7XG4gICAgICAgIHJlZnJlc2hIZWFsdGg6IHsgcGVuZGluZ1JlY292ZXJ5Tm90aWNlczogbnVtYmVyIH07XG4gICAgICB9O1xuICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICBzdWNjZXNzZnVsUmV0cnlCb2R5LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJ5Tm90aWNlcyxcbiAgICAgICAgMCxcbiAgICAgICk7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1BheWxvYWRzLmxlbmd0aCwgMik7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHdlYmhvb2tQYXlsb2Fkc1sxXSwgd2ViaG9va1BheWxvYWRzWzBdKTtcblxuICAgICAgY29uc3QgYWZ0ZXJEZWxpdmVyeSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5lcXVhbChhZnRlckRlbGl2ZXJ5LnN0YXR1cywgMjAwKTtcbiAgICAgIGFzc2VydC5lcXVhbCh3ZWJob29rUGF5bG9hZHMubGVuZ3RoLCAyKTtcbiAgICB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICBnbG9iYWxUaGlzLmZldGNoID0gb3JpZ2luYWxGZXRjaDtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh7XG4gICAgICBDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkw6IG9yaWdpbmFsRW52aXJvbm1lbnQuc2NoZWR1bGVVcmwsXG4gICAgICBTVEFGRl9BTEVSVF9XRUJIT09LX1VSTDogb3JpZ2luYWxFbnZpcm9ubWVudC53ZWJob29rVXJsLFxuICAgIH0pKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgZGVsZXRlIHByb2Nlc3MuZW52W2tleV07XG4gICAgICBlbHNlIHByb2Nlc3MuZW52W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG50ZXN0KFwidHJhY2tlciBoZWFsdGggcmVwb3J0cyBxdWV1ZWQgcmVjb3Zlcnkgbm90aWNlIGNvdW50XCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyA9IFtcbiAgICB7XG4gICAgICBmYWlsZWRBdHRlbXB0czogMixcbiAgICAgIG91dGFnZVN0YXJ0ZWRBdDogXCIyMDI2LTA5LTE2VDEwOjAwOjAwLjAwMFpcIixcbiAgICAgIHJlY292ZXJlZEF0OiBcIjIwMjYtMDktMTZUMTA6MTA6MDAuMDAwWlwiLFxuICAgICAgb3V0YWdlRHVyYXRpb25NczogMTAgKiA2MF8wMDAsXG4gICAgfSxcbiAgICB7XG4gICAgICBmYWlsZWRBdHRlbXB0czogMSxcbiAgICAgIG91dGFnZVN0YXJ0ZWRBdDogXCIyMDI2LTA5LTE2VDExOjAwOjAwLjAwMFpcIixcbiAgICAgIHJlY292ZXJlZEF0OiBcIjIwMjYtMDktMTZUMTE6MDU6MDAuMDAwWlwiLFxuICAgICAgb3V0YWdlRHVyYXRpb25NczogNSAqIDYwXzAwMCxcbiAgICB9LFxuICBdO1xuXG4gIGF3YWl0IHdpdGhUcmFja2VyU2VydmVyKHN0YXRlLCBhc3luYyAodXJsKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9L3RyYWNrZXJgKTtcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2Uuc3RhdHVzLCAyMDApO1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCkgYXMge1xuICAgICAgcmVmcmVzaEhlYWx0aDogeyBwZW5kaW5nUmVjb3ZlcnlOb3RpY2VzOiBudW1iZXIgfTtcbiAgICB9O1xuICAgIGFzc2VydC5lcXVhbChcbiAgICAgIGJvZHkucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcnlOb3RpY2VzLFxuICAgICAgMixcbiAgICApO1xuICB9KTtcbn0pO1xuXG50ZXN0KFwicmVmcmVzaCByb3V0ZSBkZWxpdmVycyBxdWV1ZWQgcmVjb3ZlcmllcyBvbmNlIGluIGluY2lkZW50IG9yZGVyXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxGZXRjaCA9IGdsb2JhbFRoaXMuZmV0Y2g7XG4gIGNvbnN0IG9yaWdpbmFsRW52aXJvbm1lbnQgPSB7XG4gICAgc2NoZWR1bGVVcmw6IHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMXCJdLFxuICAgIHdlYmhvb2tVcmw6IHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl0sXG4gIH07XG4gIGNvbnN0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMgPSBbXG4gICAge1xuICAgICAgZmFpbGVkQXR0ZW1wdHM6IDIsXG4gICAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsXG4gICAgICByZWNvdmVyZWRBdDogXCIyMDI2LTA5LTE2VDEwOjEwOjAwLjAwMFpcIixcbiAgICAgIG91dGFnZUR1cmF0aW9uTXM6IDEwICogNjBfMDAwLFxuICAgIH0sXG4gICAge1xuICAgICAgZmFpbGVkQXR0ZW1wdHM6IDMsXG4gICAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMTowMDowMC4wMDBaXCIsXG4gICAgICByZWNvdmVyZWRBdDogXCIyMDI2LTA5LTE2VDExOjE1OjAwLjAwMFpcIixcbiAgICAgIG91dGFnZUR1cmF0aW9uTXM6IDE1ICogNjBfMDAwLFxuICAgIH0sXG4gIF07XG4gIGNvbnN0IHdlYmhvb2tQYXlsb2FkczogUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXSA9IFtdO1xuXG4gIHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMXCJdID0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiO1xuICBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdID0gXCJodHRwczovL2FsZXJ0cy50ZXN0L2hvb2tcIjtcbiAgZ2xvYmFsVGhpcy5mZXRjaCA9IGFzeW5jIChpbnB1dCwgaW5pdCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgaWYgKHVybCA9PT0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiKSB7XG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG1hdGNoZXM6IFtdIH0pO1xuICAgIH1cbiAgICBpZiAodXJsID09PSBcImh0dHBzOi8vYWxlcnRzLnRlc3QvaG9va1wiKSB7XG4gICAgICB3ZWJob29rUGF5bG9hZHMucHVzaChKU09OLnBhcnNlKFN0cmluZyhpbml0Py5ib2R5KSkpO1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjA0IH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luYWxGZXRjaChpbnB1dCwgaW5pdCk7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCB3aXRoVHJhY2tlclNlcnZlcihzdGF0ZSwgYXN5bmMgKHVybCkgPT4ge1xuICAgICAgY29uc3QgcmVjb3ZlcnkgPSBhd2FpdCBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwocmVjb3Zlcnkuc3RhdHVzLCAyMDApO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgd2ViaG9va1BheWxvYWRzLm1hcCgocGF5bG9hZCkgPT4gcGF5bG9hZC5vdXRhZ2VTdGFydGVkQXQpLFxuICAgICAgICBbXCIyMDI2LTA5LTE2VDEwOjAwOjAwLjAwMFpcIiwgXCIyMDI2LTA5LTE2VDExOjAwOjAwLjAwMFpcIl0sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBhZnRlckRlbGl2ZXJ5ID0gYXdhaXQgb3JpZ2luYWxGZXRjaChgJHt1cmx9L3RyYWNrZXIvcmVmcmVzaGAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKGFmdGVyRGVsaXZlcnkuc3RhdHVzLCAyMDApO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tQYXlsb2Fkcy5sZW5ndGgsIDIpO1xuICAgIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIGdsb2JhbFRoaXMuZmV0Y2ggPSBvcmlnaW5hbEZldGNoO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHtcbiAgICAgIENMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTDogb3JpZ2luYWxFbnZpcm9ubWVudC5zY2hlZHVsZVVybCxcbiAgICAgIFNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMOiBvcmlnaW5hbEVudmlyb25tZW50LndlYmhvb2tVcmwsXG4gICAgfSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBkZWxldGUgcHJvY2Vzcy5lbnZba2V5XTtcbiAgICAgIGVsc2UgcHJvY2Vzcy5lbnZba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufSk7XG5cbnRlc3QoXCJvdmVybGFwcGluZyByZWZyZXNoIHJlcXVlc3RzIGRlbGl2ZXIgYSBxdWV1ZWQgcmVjb3ZlcnkgZXhhY3RseSBvbmNlXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxGZXRjaCA9IGdsb2JhbFRoaXMuZmV0Y2g7XG4gIGNvbnN0IG9yaWdpbmFsRW52aXJvbm1lbnQgPSB7XG4gICAgc2NoZWR1bGVVcmw6IHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMXCJdLFxuICAgIHdlYmhvb2tVcmw6IHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl0sXG4gIH07XG4gIGNvbnN0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMgPSBbXG4gICAge1xuICAgICAgZmFpbGVkQXR0ZW1wdHM6IDIsXG4gICAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsXG4gICAgICByZWNvdmVyZWRBdDogXCIyMDI2LTA5LTE2VDEwOjEwOjAwLjAwMFpcIixcbiAgICAgIG91dGFnZUR1cmF0aW9uTXM6IDEwICogNjBfMDAwLFxuICAgIH0sXG4gIF07XG4gIGNvbnN0IHdlYmhvb2tQYXlsb2FkczogUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXSA9IFtdO1xuICBsZXQgcmVsZWFzZVdlYmhvb2shOiAoKSA9PiB2b2lkO1xuICBjb25zdCB3ZWJob29rQmxvY2tlZCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgcmVsZWFzZVdlYmhvb2sgPSByZXNvbHZlO1xuICB9KTtcbiAgbGV0IG1hcmtXZWJob29rU3RhcnRlZCE6ICgpID0+IHZvaWQ7XG4gIGNvbnN0IHdlYmhvb2tTdGFydGVkID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICBtYXJrV2ViaG9va1N0YXJ0ZWQgPSByZXNvbHZlO1xuICB9KTtcblxuICBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSA9IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIjtcbiAgcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXSA9IFwiaHR0cHM6Ly9hbGVydHMudGVzdC9ob29rXCI7XG4gIGdsb2JhbFRoaXMuZmV0Y2ggPSBhc3luYyAoaW5wdXQsIGluaXQpID0+IHtcbiAgICBjb25zdCB1cmwgPSBTdHJpbmcoaW5wdXQpO1xuICAgIGlmICh1cmwgPT09IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIikge1xuICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBtYXRjaGVzOiBbXSB9KTtcbiAgICB9XG4gICAgaWYgKHVybCA9PT0gXCJodHRwczovL2FsZXJ0cy50ZXN0L2hvb2tcIikge1xuICAgICAgd2ViaG9va1BheWxvYWRzLnB1c2goSlNPTi5wYXJzZShTdHJpbmcoaW5pdD8uYm9keSkpKTtcbiAgICAgIG1hcmtXZWJob29rU3RhcnRlZCgpO1xuICAgICAgYXdhaXQgd2ViaG9va0Jsb2NrZWQ7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHsgc3RhdHVzOiAyMDQgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcmlnaW5hbEZldGNoKGlucHV0LCBpbml0KTtcbiAgfTtcblxuICB0cnkge1xuICAgIGF3YWl0IHdpdGhUcmFja2VyU2VydmVyKHN0YXRlLCBhc3luYyAodXJsKSA9PiB7XG4gICAgICBjb25zdCBmaXJzdFJlZnJlc2ggPSBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCB3ZWJob29rU3RhcnRlZDtcbiAgICAgIGNvbnN0IHNlY29uZFJlZnJlc2ggPSBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwKSk7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1BheWxvYWRzLmxlbmd0aCwgMSk7XG5cbiAgICAgIHJlbGVhc2VXZWJob29rKCk7XG4gICAgICBjb25zdCByZXNwb25zZXMgPSBhd2FpdCBQcm9taXNlLmFsbChbZmlyc3RSZWZyZXNoLCBzZWNvbmRSZWZyZXNoXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3BvbnNlcy5tYXAoKHJlc3BvbnNlKSA9PiByZXNwb25zZS5zdGF0dXMpLCBbMjAwLCAyMDBdKTtcbiAgICAgIGFzc2VydC5lcXVhbCh3ZWJob29rUGF5bG9hZHMubGVuZ3RoLCAxKTtcblxuICAgICAgY29uc3QgYm9kaWVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHJlc3BvbnNlcy5tYXAoYXN5bmMgKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTx7XG4gICAgICAgICAgcmVmcmVzaEhlYWx0aDogeyBwZW5kaW5nUmVjb3ZlcnlOb3RpY2VzOiBudW1iZXIgfTtcbiAgICAgICAgfT4pLFxuICAgICAgKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGJvZGllcy5tYXAoKGJvZHkpID0+IGJvZHkucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcnlOb3RpY2VzKSxcbiAgICAgICAgWzAsIDBdLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICByZWxlYXNlV2ViaG9vaygpO1xuICAgIGdsb2JhbFRoaXMuZmV0Y2ggPSBvcmlnaW5hbEZldGNoO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHtcbiAgICAgIENMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTDogb3JpZ2luYWxFbnZpcm9ubWVudC5zY2hlZHVsZVVybCxcbiAgICAgIFNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMOiBvcmlnaW5hbEVudmlyb25tZW50LndlYmhvb2tVcmwsXG4gICAgfSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBkZWxldGUgcHJvY2Vzcy5lbnZba2V5XTtcbiAgICAgIGVsc2UgcHJvY2Vzcy5lbnZba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufSk7XG5cbnRlc3QoXCJzbG93IHNjaGVkdWxlIGFuZCB3ZWJob29rIHJlcXVlc3RzIGRvIG5vdCBkZWxheSBtYXRjaCBlZGl0c1wiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsRmV0Y2ggPSBnbG9iYWxUaGlzLmZldGNoO1xuICBjb25zdCBvcmlnaW5hbEVudmlyb25tZW50ID0ge1xuICAgIHNjaGVkdWxlVXJsOiBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSxcbiAgICB3ZWJob29rVXJsOiBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdLFxuICB9O1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5tYXRjaGVzID0gW3tcbiAgICBpZDogXCJtYXRjaC0xXCIsXG4gICAgZXh0ZXJuYWxJZDogbnVsbCxcbiAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgIG9wcG9uZW50OiBcIk9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsXG4gICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTA6NDU6MDAuMDAwWlwiLFxuICAgIHZlbnVlOiBcIlZlbnVlXCIsXG4gICAgY291cnQ6IFwiQ291cnQgMVwiLFxuICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICByZXN1bHQ6IFwiV29uIDMtMVwiLFxuICAgIHJlcG9ydDogbnVsbCxcbiAgfV07XG4gIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMgPSBbe1xuICAgIGZhaWxlZEF0dGVtcHRzOiAyLFxuICAgIG91dGFnZVN0YXJ0ZWRBdDogXCIyMDI2LTA5LTE2VDA5OjAwOjAwLjAwMFpcIixcbiAgICByZWNvdmVyZWRBdDogXCIyMDI2LTA5LTE2VDA5OjEwOjAwLjAwMFpcIixcbiAgICBvdXRhZ2VEdXJhdGlvbk1zOiAxMCAqIDYwXzAwMCxcbiAgfV07XG5cbiAgbGV0IHJlbGVhc2VTY2hlZHVsZSE6ICgpID0+IHZvaWQ7XG4gIGNvbnN0IHNjaGVkdWxlQmxvY2tlZCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgcmVsZWFzZVNjaGVkdWxlID0gcmVzb2x2ZTtcbiAgfSk7XG4gIGxldCBtYXJrU2NoZWR1bGVTdGFydGVkITogKCkgPT4gdm9pZDtcbiAgY29uc3Qgc2NoZWR1bGVTdGFydGVkID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICBtYXJrU2NoZWR1bGVTdGFydGVkID0gcmVzb2x2ZTtcbiAgfSk7XG4gIGxldCByZWxlYXNlV2ViaG9vayE6ICgpID0+IHZvaWQ7XG4gIGNvbnN0IHdlYmhvb2tCbG9ja2VkID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICByZWxlYXNlV2ViaG9vayA9IHJlc29sdmU7XG4gIH0pO1xuICBsZXQgbWFya1dlYmhvb2tTdGFydGVkITogKCkgPT4gdm9pZDtcbiAgY29uc3Qgd2ViaG9va1N0YXJ0ZWQgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgIG1hcmtXZWJob29rU3RhcnRlZCA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMXCJdID0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiO1xuICBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdID0gXCJodHRwczovL2FsZXJ0cy50ZXN0L2hvb2tcIjtcbiAgZ2xvYmFsVGhpcy5mZXRjaCA9IGFzeW5jIChpbnB1dCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgaWYgKHVybCA9PT0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiKSB7XG4gICAgICBtYXJrU2NoZWR1bGVTdGFydGVkKCk7XG4gICAgICBhd2FpdCBzY2hlZHVsZUJsb2NrZWQ7XG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG1hdGNoZXM6IFtdIH0pO1xuICAgIH1cbiAgICBpZiAodXJsID09PSBcImh0dHBzOi8vYWxlcnRzLnRlc3QvaG9va1wiKSB7XG4gICAgICBtYXJrV2ViaG9va1N0YXJ0ZWQoKTtcbiAgICAgIGF3YWl0IHdlYmhvb2tCbG9ja2VkO1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjA0IH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luYWxGZXRjaChpbnB1dCk7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCB3aXRoVHJhY2tlclNlcnZlcihzdGF0ZSwgYXN5bmMgKHVybCkgPT4ge1xuICAgICAgY29uc3QgcmVmcmVzaCA9IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7IG1ldGhvZDogXCJQT1NUXCIgfSk7XG4gICAgICBhd2FpdCBzY2hlZHVsZVN0YXJ0ZWQ7XG5cbiAgICAgIGNvbnN0IGVkaXREdXJpbmdTY2hlZHVsZSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS9tYXRjaGVzL21hdGNoLTFgLCB7XG4gICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY291cnQ6IFwiQ291cnQgMlwiIH0pLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwoZWRpdER1cmluZ1NjaGVkdWxlLnN0YXR1cywgMjAwKTtcblxuICAgICAgcmVsZWFzZVNjaGVkdWxlKCk7XG4gICAgICBhd2FpdCB3ZWJob29rU3RhcnRlZDtcblxuICAgICAgY29uc3QgZWRpdER1cmluZ1dlYmhvb2sgPSBhd2FpdCBvcmlnaW5hbEZldGNoKGAke3VybH0vbWF0Y2hlcy9tYXRjaC0xYCwge1xuICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvdXJ0OiBcIkNvdXJ0IDNcIiB9KSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKGVkaXREdXJpbmdXZWJob29rLnN0YXR1cywgMjAwKTtcblxuICAgICAgcmVsZWFzZVdlYmhvb2soKTtcbiAgICAgIGFzc2VydC5lcXVhbCgoYXdhaXQgcmVmcmVzaCkuc3RhdHVzLCAyMDApO1xuICAgIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIHJlbGVhc2VTY2hlZHVsZSgpO1xuICAgIHJlbGVhc2VXZWJob29rKCk7XG4gICAgZ2xvYmFsVGhpcy5mZXRjaCA9IG9yaWdpbmFsRmV0Y2g7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoe1xuICAgICAgQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMOiBvcmlnaW5hbEVudmlyb25tZW50LnNjaGVkdWxlVXJsLFxuICAgICAgU1RBRkZfQUxFUlRfV0VCSE9PS19VUkw6IG9yaWdpbmFsRW52aXJvbm1lbnQud2ViaG9va1VybCxcbiAgICB9KSkge1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIGRlbGV0ZSBwcm9jZXNzLmVudltrZXldO1xuICAgICAgZWxzZSBwcm9jZXNzLmVudltrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudGVzdChcIm92ZXJsYXBwaW5nIG1hdGNoIGVkaXQgYW5kIHJlcG9ydCBzYXZlIHByZXNlcnZlIGJvdGggY2hhbmdlc1wiLCBhc3luYyAoKSA9PiB7XG4gIGxldCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5tYXRjaGVzID0gW1xuICAgIHtcbiAgICAgIGlkOiBcIm1hdGNoLTFcIixcbiAgICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgICAgb3Bwb25lbnQ6IFwiT3Bwb25lbnRcIixcbiAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTA6NDU6MDAuMDAwWlwiLFxuICAgICAgdmVudWU6IFwiVmVudWVcIixcbiAgICAgIGNvdXJ0OiBcIkNvdXJ0IDFcIixcbiAgICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgcmVzdWx0OiBcIldvbiAzLTFcIixcbiAgICAgIHJlcG9ydDogbnVsbCxcbiAgICB9LFxuICBdO1xuXG4gIGxldCByZWxlYXNlRmlyc3RTYXZlITogKCkgPT4gdm9pZDtcbiAgY29uc3QgZmlyc3RTYXZlQmxvY2tlZCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgcmVsZWFzZUZpcnN0U2F2ZSA9IHJlc29sdmU7XG4gIH0pO1xuICBsZXQgbWFya0ZpcnN0U2F2ZVN0YXJ0ZWQhOiAoKSA9PiB2b2lkO1xuICBjb25zdCBmaXJzdFNhdmVTdGFydGVkID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICBtYXJrRmlyc3RTYXZlU3RhcnRlZCA9IHJlc29sdmU7XG4gIH0pO1xuICBsZXQgc2F2ZUNvdW50ID0gMDtcblxuICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuICBhcHAudXNlKFxuICAgIGNyZWF0ZVRyYWNrZXJSb3V0ZXIoe1xuICAgICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IHN0cnVjdHVyZWRDbG9uZShzdGF0ZSksXG4gICAgICBzYXZlU3RhdGU6IGFzeW5jIChuZXh0KSA9PiB7XG4gICAgICAgIHNhdmVDb3VudCArPSAxO1xuICAgICAgICBpZiAoc2F2ZUNvdW50ID09PSAxKSB7XG4gICAgICAgICAgbWFya0ZpcnN0U2F2ZVN0YXJ0ZWQoKTtcbiAgICAgICAgICBhd2FpdCBmaXJzdFNhdmVCbG9ja2VkO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gc3RydWN0dXJlZENsb25lKG5leHQpO1xuICAgICAgfSxcbiAgICAgIG9iamVjdFN0b3JhZ2U6IHtcbiAgICAgICAgc2F2ZU9iamVjdDogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgICBnZXRPYmplY3Q6IGFzeW5jICgpID0+ICh7fSkgYXMgbmV2ZXIsXG4gICAgICAgIGRlbGV0ZU9iamVjdDogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgfSxcbiAgICAgIGF1dGhvcml6ZVN0YWZmOiAoX3JlcSwgX3JlcywgbmV4dCkgPT4gbmV4dCgpLFxuICAgIH0pLFxuICApO1xuXG4gIGNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIik7XG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzZXJ2ZXIub25jZShcImxpc3RlbmluZ1wiLCByZXNvbHZlKTtcbiAgICBzZXJ2ZXIub25jZShcImVycm9yXCIsIHJlamVjdCk7XG4gIH0pO1xuICBjb25zdCBhZGRyZXNzID0gc2VydmVyLmFkZHJlc3MoKTtcbiAgYXNzZXJ0KGFkZHJlc3MgJiYgdHlwZW9mIGFkZHJlc3MgIT09IFwic3RyaW5nXCIpO1xuICBjb25zdCB1cmwgPSBgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH1gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZWRpdCA9IGZldGNoKGAke3VybH0vbWF0Y2hlcy9tYXRjaC0xYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvdXJ0OiBcIkNvdXJ0IDJcIiB9KSxcbiAgICB9KTtcbiAgICBhd2FpdCBmaXJzdFNhdmVTdGFydGVkO1xuXG4gICAgY29uc3QgcmVwb3J0ID0gZmV0Y2goYCR7dXJsfS9tYXRjaGVzL21hdGNoLTEvcmVwb3J0YCwge1xuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBvYnNlcnZhdGlvbnM6IFtcbiAgICAgICAgICBcIkNvbnRyb2xsZWQgdGhlIG1pZGRsZSB3ZWxsLlwiLFxuICAgICAgICAgIFwiQ29uc2lzdGVudGx5IHJlY292ZXJlZCB0byB0aGUgVC5cIixcbiAgICAgICAgICBcIktlcHQgZ29vZCB3aWR0aCB1bmRlciBwcmVzc3VyZS5cIixcbiAgICAgICAgXSxcbiAgICAgICAgdHJhbnNjcmlwdDogXCJTdGF5ZWQgY29tcG9zZWQgaW4gdGhlIGxvbmcgcmFsbGllcy5cIixcbiAgICAgICAgYXVkaW9QYXRoOiBcIi9vYmplY3RzL3VwbG9hZHMvMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwXCIsXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwKSk7XG4gICAgYXNzZXJ0LmVxdWFsKHNhdmVDb3VudCwgMSk7XG5cbiAgICByZWxlYXNlRmlyc3RTYXZlKCk7XG4gICAgY29uc3QgcmVzcG9uc2VzID0gYXdhaXQgUHJvbWlzZS5hbGwoW2VkaXQsIHJlcG9ydF0pO1xuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzcG9uc2VzLm1hcCgocmVzcG9uc2UpID0+IHJlc3BvbnNlLnN0YXR1cyksIFsyMDAsIDIwMF0pO1xuICAgIGFzc2VydC5lcXVhbChzYXZlQ291bnQsIDIpO1xuICAgIGFzc2VydC5lcXVhbChzdGF0ZS5tYXRjaGVzWzBdPy5jb3VydCwgXCJDb3VydCAyXCIpO1xuICAgIGFzc2VydC5lcXVhbChcbiAgICAgIHN0YXRlLm1hdGNoZXNbMF0/LnJlcG9ydD8ub2JzZXJ2YXRpb25zWzBdLFxuICAgICAgXCJDb250cm9sbGVkIHRoZSBtaWRkbGUgd2VsbC5cIixcbiAgICApO1xuICAgIGFzc2VydC5lcXVhbChcbiAgICAgIHN0YXRlLm1hdGNoZXNbMF0/LnJlcG9ydD8uYXVkaW9QYXRoLFxuICAgICAgXCIvb2JqZWN0cy91cGxvYWRzLzEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMFwiLFxuICAgICk7XG4gIH0gZmluYWxseSB7XG4gICAgcmVsZWFzZUZpcnN0U2F2ZSgpO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiAoZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSksXG4gICAgKTtcbiAgfVxufSk7XG5cbnRlc3QoXCJpbmRlcGVuZGVudCBBUEkgaW5zdGFuY2VzIGNvb3JkaW5hdGUgb3ZlcmxhcHBpbmcgdHJhY2tlciB3cml0ZXNcIiwgYXN5bmMgKCkgPT4ge1xuICBsZXQgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUubWF0Y2hlcyA9IFt7XG4gICAgaWQ6IFwibWF0Y2gtMVwiLFxuICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgICBvcHBvbmVudDogXCJPcHBvbmVudFwiLFxuICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEwOjQ1OjAwLjAwMFpcIixcbiAgICB2ZW51ZTogXCJWZW51ZVwiLFxuICAgIGNvdXJ0OiBcIkNvdXJ0IDFcIixcbiAgICBjb2FjaElkOiBcImNvYWNoLTFcIixcbiAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgcmVzdWx0OiBcIldvbiAzLTFcIixcbiAgICByZXBvcnQ6IG51bGwsXG4gIH1dO1xuXG4gIGxldCB0cmFuc2FjdGlvblF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIGNvbnN0IG11dGF0ZVN0YXRlID0gYXN5bmMgPFQsPihcbiAgICBvcGVyYXRpb246IChcbiAgICAgIGxvYWRTdGF0ZTogKCkgPT4gUHJvbWlzZTxUcmFja2VyU3RhdGU+LFxuICAgICAgc2F2ZVN0YXRlOiAobmV4dDogVHJhY2tlclN0YXRlKSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICkgPT4gUHJvbWlzZTxUPixcbiAgKTogUHJvbWlzZTxUPiA9PiB7XG4gICAgY29uc3QgcHJldmlvdXMgPSB0cmFuc2FjdGlvblF1ZXVlO1xuICAgIGxldCByZWxlYXNlITogKCkgPT4gdm9pZDtcbiAgICB0cmFuc2FjdGlvblF1ZXVlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgIHJlbGVhc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIGF3YWl0IHByZXZpb3VzO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgb3BlcmF0aW9uKFxuICAgICAgICBhc3luYyAoKSA9PiBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpLFxuICAgICAgICBhc3luYyAobmV4dCkgPT4ge1xuICAgICAgICAgIHN0YXRlID0gc3RydWN0dXJlZENsb25lKG5leHQpO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgcmVsZWFzZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVBcHAgPSAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICAgIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuICAgIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgICBnZXRTdGF0ZTogYXN5bmMgKCkgPT4gc3RydWN0dXJlZENsb25lKHN0YXRlKSxcbiAgICAgIHNhdmVTdGF0ZTogYXN5bmMgKG5leHQpID0+IHtcbiAgICAgICAgc3RhdGUgPSBzdHJ1Y3R1cmVkQ2xvbmUobmV4dCk7XG4gICAgICB9LFxuICAgICAgbXV0YXRlU3RhdGUsXG4gICAgICBhdXRob3JpemVTdGFmZjogKF9yZXEsIF9yZXMsIG5leHQpID0+IG5leHQoKSxcbiAgICB9KSk7XG4gICAgcmV0dXJuIGFwcDtcbiAgfTtcbiAgY29uc3Qgc2VydmVycyA9IFtjcmVhdGVBcHAoKS5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIiksIGNyZWF0ZUFwcCgpLmxpc3RlbigwLCBcIjEyNy4wLjAuMVwiKV07XG4gIGF3YWl0IFByb21pc2UuYWxsKHNlcnZlcnMubWFwKChzZXJ2ZXIpID0+IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzZXJ2ZXIub25jZShcImxpc3RlbmluZ1wiLCByZXNvbHZlKTtcbiAgICBzZXJ2ZXIub25jZShcImVycm9yXCIsIHJlamVjdCk7XG4gIH0pKSk7XG4gIGNvbnN0IHVybHMgPSBzZXJ2ZXJzLm1hcCgoc2VydmVyKSA9PiB7XG4gICAgY29uc3QgYWRkcmVzcyA9IHNlcnZlci5hZGRyZXNzKCk7XG4gICAgYXNzZXJ0KGFkZHJlc3MgJiYgdHlwZW9mIGFkZHJlc3MgIT09IFwic3RyaW5nXCIpO1xuICAgIHJldHVybiBgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH1gO1xuICB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IFtlZGl0LCByZXBvcnRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZmV0Y2goYCR7dXJsc1swXX0vbWF0Y2hlcy9tYXRjaC0xYCwge1xuICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvdXJ0OiBcIkNvdXJ0IDJcIiB9KSxcbiAgICAgIH0pLFxuICAgICAgZmV0Y2goYCR7dXJsc1sxXX0vbWF0Y2hlcy9tYXRjaC0xL3JlcG9ydGAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBvYnNlcnZhdGlvbnM6IFtcIlN0cm9uZyBsZW5ndGguXCIsIFwiUmVjb3ZlcmVkIHRvIHRoZSBULlwiLCBcIlN0YXllZCBjb21wb3NlZC5cIl0sXG4gICAgICAgICAgdHJhbnNjcmlwdDogXCJHb29kIHdvcmsgdW5kZXIgcHJlc3N1cmUuXCIsXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgXSk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKFtlZGl0LnN0YXR1cywgcmVwb3J0LnN0YXR1c10sIFsyMDAsIDIwMF0pO1xuICAgIGFzc2VydC5lcXVhbChzdGF0ZS5tYXRjaGVzWzBdPy5jb3VydCwgXCJDb3VydCAyXCIpO1xuICAgIGFzc2VydC5lcXVhbChzdGF0ZS5tYXRjaGVzWzBdPy5yZXBvcnQ/LnRyYW5zY3JpcHQsIFwiR29vZCB3b3JrIHVuZGVyIHByZXNzdXJlLlwiKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChzZXJ2ZXJzLm1hcCgoc2VydmVyKSA9PiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgc2VydmVyLmNsb3NlKChlcnJvcikgPT4gZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSxcbiAgICApKSk7XG4gIH1cbn0pO1xuXG50ZXN0KFwic2F2aW5nIHRyYWNrZXIgc2V0dGluZ3MgZGVsZXRlcyB0aGUgcmVwbGFjZWQgbG9nbyBvbmx5IGFmdGVyIHBlcnNpc3RlbmNlXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3QgcHJldmlvdXNMb2dvUGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy8xMTExMTExMS0xMTExLTQxMTEtODExMS0xMTExMTExMTExMTFcIjtcbiAgY29uc3QgcmVwbGFjZW1lbnRMb2dvUGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy9sb2dvcy8yMjIyMjIyMi0yMjIyLTQyMjItODIyMi0yMjIyMjIyMjIyMjJcIjtcbiAgbGV0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLmJyYW5kaW5nID0geyBuYW1lOiBcIlN0YWl0U3F1YXNoXCIsIGxvZ29QYXRoOiBwcmV2aW91c0xvZ29QYXRoIH07XG4gIGNvbnN0IGV2ZW50czogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgYXBwLnVzZShjcmVhdGVUcmFja2VyUm91dGVyKHtcbiAgICBnZXRTdGF0ZTogYXN5bmMgKCkgPT4gc3RydWN0dXJlZENsb25lKHN0YXRlKSxcbiAgICBzYXZlU3RhdGU6IGFzeW5jIChuZXh0KSA9PiB7XG4gICAgICBldmVudHMucHVzaChcInBlcnNpc3RcIik7XG4gICAgICBzdGF0ZSA9IHN0cnVjdHVyZWRDbG9uZShuZXh0KTtcbiAgICB9LFxuICAgIG9iamVjdFN0b3JhZ2U6IHtcbiAgICAgIHNhdmVPYmplY3Q6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICAgIGdldE9iamVjdDogYXN5bmMgKCkgPT4gKHt9KSBhcyBuZXZlcixcbiAgICAgIGRlbGV0ZU9iamVjdDogYXN5bmMgKHBhdGgpID0+IHtcbiAgICAgICAgZXZlbnRzLnB1c2goYGRlbGV0ZToke3BhdGh9YCk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgYXV0aG9yaXplU3RhZmY6IChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCksXG4gIH0pKTtcbiAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3RlbigwLCBcIjEyNy4wLjAuMVwiKTtcbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNlcnZlci5vbmNlKFwibGlzdGVuaW5nXCIsIHJlc29sdmUpO1xuICAgIHNlcnZlci5vbmNlKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgfSk7XG4gIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH0vdHJhY2tlci9zZXR0aW5nc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29hY2hlczogc3RhdGUuY29hY2hlcyxcbiAgICAgICAgYnJhbmRpbmc6IHsgbmFtZTogXCJDbHViXCIsIGxvZ29QYXRoOiByZXBsYWNlbWVudExvZ29QYXRoIH0sXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2Uuc3RhdHVzLCAyMDApO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoZXZlbnRzLCBbXCJwZXJzaXN0XCIsIGBkZWxldGU6JHtwcmV2aW91c0xvZ29QYXRofWBdKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUuYnJhbmRpbmc/LmxvZ29QYXRoLCByZXBsYWNlbWVudExvZ29QYXRoKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgc2VydmVyLmNsb3NlKChlcnJvcikgPT4gZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSxcbiAgICApO1xuICB9XG59KTtcblxudGVzdChcInJlcGxhY2VkIGxvZ28gY2xlYW51cCByZWNoZWNrcyBzdGF0ZSBhZnRlciBhIGNvbmN1cnJlbnQgc2V0dGluZ3Mgc2F2ZVwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsTG9nb1BhdGggPSBcIi9vYmplY3RzL3VwbG9hZHMvMTExMTExMTEtMTExMS00MTExLTgxMTEtMTExMTExMTExMTExXCI7XG4gIGNvbnN0IHJlcGxhY2VtZW50TG9nb1BhdGggPSBcIi9vYmplY3RzL3VwbG9hZHMvbG9nb3MvMjIyMjIyMjItMjIyMi00MjIyLTgyMjItMjIyMjIyMjIyMjIyXCI7XG4gIGxldCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5icmFuZGluZyA9IHsgbmFtZTogXCJTdGFpdFNxdWFzaFwiLCBsb2dvUGF0aDogb3JpZ2luYWxMb2dvUGF0aCB9O1xuICBsZXQgcmVsZWFzZUZpcnN0U2F2ZSE6ICgpID0+IHZvaWQ7XG4gIGNvbnN0IGZpcnN0U2F2ZUJsb2NrZWQgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgIHJlbGVhc2VGaXJzdFNhdmUgPSByZXNvbHZlO1xuICB9KTtcbiAgbGV0IG1hcmtGaXJzdFNhdmVTdGFydGVkITogKCkgPT4gdm9pZDtcbiAgY29uc3QgZmlyc3RTYXZlU3RhcnRlZCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgbWFya0ZpcnN0U2F2ZVN0YXJ0ZWQgPSByZXNvbHZlO1xuICB9KTtcbiAgbGV0IHNhdmVDb3VudCA9IDA7XG4gIGNvbnN0IGRlbGV0ZWQ6IHN0cmluZ1tdID0gW107XG4gIGxldCBtYXJrU2Vjb25kUmVxdWVzdEVudGVyZWQhOiAoKSA9PiB2b2lkO1xuICBjb25zdCBzZWNvbmRSZXF1ZXN0RW50ZXJlZCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgbWFya1NlY29uZFJlcXVlc3RFbnRlcmVkID0gcmVzb2x2ZTtcbiAgfSk7XG4gIGxldCBzZXR0aW5nc1JlcXVlc3RDb3VudCA9IDA7XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gIGFwcC51c2UoKHJlcSwgX3JlcywgbmV4dCkgPT4ge1xuICAgIGlmIChyZXEubWV0aG9kID09PSBcIlBVVFwiICYmIHJlcS5wYXRoID09PSBcIi90cmFja2VyL3NldHRpbmdzXCIpIHtcbiAgICAgIHNldHRpbmdzUmVxdWVzdENvdW50ICs9IDE7XG4gICAgICBpZiAoc2V0dGluZ3NSZXF1ZXN0Q291bnQgPT09IDIpIG1hcmtTZWNvbmRSZXF1ZXN0RW50ZXJlZCgpO1xuICAgIH1cbiAgICBuZXh0KCk7XG4gIH0pO1xuICBhcHAudXNlKGNyZWF0ZVRyYWNrZXJSb3V0ZXIoe1xuICAgIGdldFN0YXRlOiBhc3luYyAoKSA9PiBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpLFxuICAgIHNhdmVTdGF0ZTogYXN5bmMgKG5leHQpID0+IHtcbiAgICAgIHNhdmVDb3VudCArPSAxO1xuICAgICAgaWYgKHNhdmVDb3VudCA9PT0gMSkge1xuICAgICAgICBtYXJrRmlyc3RTYXZlU3RhcnRlZCgpO1xuICAgICAgICBhd2FpdCBmaXJzdFNhdmVCbG9ja2VkO1xuICAgICAgfVxuICAgICAgc3RhdGUgPSBzdHJ1Y3R1cmVkQ2xvbmUobmV4dCk7XG4gICAgfSxcbiAgICBvYmplY3RTdG9yYWdlOiB7XG4gICAgICBzYXZlT2JqZWN0OiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgICBnZXRPYmplY3Q6IGFzeW5jICgpID0+ICh7fSkgYXMgbmV2ZXIsXG4gICAgICBkZWxldGVPYmplY3Q6IGFzeW5jIChwYXRoKSA9PiB7XG4gICAgICAgIGRlbGV0ZWQucHVzaChwYXRoKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhdXRob3JpemVTdGFmZjogKF9yZXEsIF9yZXMsIG5leHQpID0+IG5leHQoKSxcbiAgfSkpO1xuICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDAsIFwiMTI3LjAuMC4xXCIpO1xuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2VydmVyLm9uY2UoXCJsaXN0ZW5pbmdcIiwgcmVzb2x2ZSk7XG4gICAgc2VydmVyLm9uY2UoXCJlcnJvclwiLCByZWplY3QpO1xuICB9KTtcbiAgY29uc3QgYWRkcmVzcyA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIGFzc2VydChhZGRyZXNzICYmIHR5cGVvZiBhZGRyZXNzICE9PSBcInN0cmluZ1wiKTtcbiAgY29uc3Qgc2F2ZVNldHRpbmdzID0gKGxvZ29QYXRoOiBzdHJpbmcpID0+IGZldGNoKFxuICAgIGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkcmVzcy5wb3J0fS90cmFja2VyL3NldHRpbmdzYCxcbiAgICB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvYWNoZXM6IHN0YXRlLmNvYWNoZXMsXG4gICAgICAgIGJyYW5kaW5nOiB7IG5hbWU6IFwiQ2x1YlwiLCBsb2dvUGF0aCB9LFxuICAgICAgfSksXG4gICAgfSxcbiAgKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBmaXJzdFNhdmUgPSBzYXZlU2V0dGluZ3MocmVwbGFjZW1lbnRMb2dvUGF0aCk7XG4gICAgYXdhaXQgZmlyc3RTYXZlU3RhcnRlZDtcbiAgICBjb25zdCBjb25jdXJyZW50U2F2ZSA9IHNhdmVTZXR0aW5ncyhvcmlnaW5hbExvZ29QYXRoKTtcbiAgICBhd2FpdCBzZWNvbmRSZXF1ZXN0RW50ZXJlZDtcbiAgICByZWxlYXNlRmlyc3RTYXZlKCk7XG4gICAgYXNzZXJ0LmVxdWFsKChhd2FpdCBmaXJzdFNhdmUpLnN0YXR1cywgMjAwKTtcbiAgICBhc3NlcnQuZXF1YWwoKGF3YWl0IGNvbmN1cnJlbnRTYXZlKS5zdGF0dXMsIDIwMCk7XG4gICAgYXNzZXJ0LmVxdWFsKHN0YXRlLmJyYW5kaW5nPy5sb2dvUGF0aCwgb3JpZ2luYWxMb2dvUGF0aCk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChkZWxldGVkLCBbcmVwbGFjZW1lbnRMb2dvUGF0aF0pO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpLFxuICAgICk7XG4gIH1cbn0pO1xuXG50ZXN0KFwidW51c2VkIGxvZ28gY2xlYW51cCByZXRhaW5zIHRoZSBsb2dvIHJlZmVyZW5jZWQgYnkgc2F2ZWQgc2V0dGluZ3NcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZWZlcmVuY2VkTG9nb1BhdGggPSBcIi9vYmplY3RzL3VwbG9hZHMvbG9nb3MvMTExMTExMTEtMTExMS00MTExLTgxMTEtMTExMTExMTExMTExXCI7XG4gIGNvbnN0IHVudXNlZExvZ29QYXRoID0gXCIvb2JqZWN0cy91cGxvYWRzL2xvZ29zLzIyMjIyMjIyLTIyMjItNDIyMi04MjIyLTIyMjIyMjIyMjIyMlwiO1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5icmFuZGluZyA9IHsgbmFtZTogXCJTdGFpdFNxdWFzaFwiLCBsb2dvUGF0aDogcmVmZXJlbmNlZExvZ29QYXRoIH07XG4gIGNvbnN0IGRlbGV0ZWQ6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IHN0cnVjdHVyZWRDbG9uZShzdGF0ZSksXG4gICAgc2F2ZVN0YXRlOiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgb2JqZWN0U3RvcmFnZToge1xuICAgICAgc2F2ZU9iamVjdDogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgZ2V0T2JqZWN0OiBhc3luYyAoKSA9PiAoe30pIGFzIG5ldmVyLFxuICAgICAgZGVsZXRlT2JqZWN0OiBhc3luYyAocGF0aCkgPT4ge1xuICAgICAgICBkZWxldGVkLnB1c2gocGF0aCk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgYXV0aG9yaXplU3RhZmY6IChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCksXG4gIH0pKTtcbiAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3RlbigwLCBcIjEyNy4wLjAuMVwiKTtcbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNlcnZlci5vbmNlKFwibGlzdGVuaW5nXCIsIHJlc29sdmUpO1xuICAgIHNlcnZlci5vbmNlKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgfSk7XG4gIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gIGNvbnN0IGNsZWFudXAgPSAob2JqZWN0UGF0aDogc3RyaW5nKSA9PiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH0vdHJhY2tlci9sb2dvYCwge1xuICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBvYmplY3RQYXRoIH0pLFxuICB9KTtcbiAgdHJ5IHtcbiAgICBhc3NlcnQuZXF1YWwoKGF3YWl0IGNsZWFudXAocmVmZXJlbmNlZExvZ29QYXRoKSkuc3RhdHVzLCAyMDQpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoZGVsZXRlZCwgW10pO1xuICAgIGFzc2VydC5lcXVhbCgoYXdhaXQgY2xlYW51cCh1bnVzZWRMb2dvUGF0aCkpLnN0YXR1cywgMjA0KTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGRlbGV0ZWQsIFt1bnVzZWRMb2dvUGF0aF0pO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpLFxuICAgICk7XG4gIH1cbn0pO1xuXG50ZXN0KFwicmVwbGFjZWQgbGVnYWN5IGxvZ28gY2xlYW51cCByZXRhaW5zIGFuIG9iamVjdCBzdGlsbCByZWZlcmVuY2VkIGJ5IGEgY29hY2ggcmVwb3J0XCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2hhcmVkT2JqZWN0UGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy8xMTExMTExMS0xMTExLTQxMTEtODExMS0xMTExMTExMTExMTFcIjtcbiAgbGV0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLmJyYW5kaW5nID0geyBuYW1lOiBcIlN0YWl0U3F1YXNoXCIsIGxvZ29QYXRoOiBzaGFyZWRPYmplY3RQYXRoIH07XG4gIHN0YXRlLm1hdGNoZXMgPSBbe1xuICAgIGlkOiBcImNvbXBsZXRlZC1tYXRjaFwiLFxuICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgICBvcHBvbmVudDogXCJPcHBvbmVudFwiLFxuICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEwOjQ1OjAwLjAwMFpcIixcbiAgICB2ZW51ZTogXCJWZW51ZVwiLFxuICAgIGNvdXJ0OiBcIkNvdXJ0IDFcIixcbiAgICBjb2FjaElkOiBcImNvYWNoLTFcIixcbiAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgcmVzdWx0OiBcIldvbiAzLTFcIixcbiAgICByZXBvcnQ6IHtcbiAgICAgIG1hdGNoSWQ6IFwiY29tcGxldGVkLW1hdGNoXCIsXG4gICAgICBvYnNlcnZhdGlvbnM6IFtcIkZpcnN0LlwiLCBcIlNlY29uZC5cIiwgXCJUaGlyZC5cIl0sXG4gICAgICB0cmFuc2NyaXB0OiBudWxsLFxuICAgICAgYXVkaW9QYXRoOiBzaGFyZWRPYmplY3RQYXRoLFxuICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTE6MDA6MDAuMDAwWlwiLFxuICAgIH0sXG4gIH1dO1xuICBjb25zdCBkZWxldGVkOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuICBhcHAudXNlKGNyZWF0ZVRyYWNrZXJSb3V0ZXIoe1xuICAgIGdldFN0YXRlOiBhc3luYyAoKSA9PiBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpLFxuICAgIHNhdmVTdGF0ZTogYXN5bmMgKG5leHQpID0+IHtcbiAgICAgIHN0YXRlID0gc3RydWN0dXJlZENsb25lKG5leHQpO1xuICAgIH0sXG4gICAgb2JqZWN0U3RvcmFnZToge1xuICAgICAgc2F2ZU9iamVjdDogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgZ2V0T2JqZWN0OiBhc3luYyAoKSA9PiAoe30pIGFzIG5ldmVyLFxuICAgICAgZGVsZXRlT2JqZWN0OiBhc3luYyAocGF0aCkgPT4ge1xuICAgICAgICBkZWxldGVkLnB1c2gocGF0aCk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgYXV0aG9yaXplU3RhZmY6IChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCksXG4gIH0pKTtcbiAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3RlbigwLCBcIjEyNy4wLjAuMVwiKTtcbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNlcnZlci5vbmNlKFwibGlzdGVuaW5nXCIsIHJlc29sdmUpO1xuICAgIHNlcnZlci5vbmNlKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgfSk7XG4gIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH0vdHJhY2tlci9zZXR0aW5nc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29hY2hlczogc3RhdGUuY29hY2hlcyxcbiAgICAgICAgYnJhbmRpbmc6IHtcbiAgICAgICAgICBuYW1lOiBcIkNsdWJcIixcbiAgICAgICAgICBsb2dvUGF0aDogXCIvb2JqZWN0cy91cGxvYWRzL2xvZ29zLzIyMjIyMjIyLTIyMjItNDIyMi04MjIyLTIyMjIyMjIyMjIyMlwiLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLnN0YXR1cywgMjAwKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGRlbGV0ZWQsIFtdKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUubWF0Y2hlc1swXT8ucmVwb3J0Py5hdWRpb1BhdGgsIHNoYXJlZE9iamVjdFBhdGgpO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpLFxuICAgICk7XG4gIH1cbn0pO1xuXG50ZXN0KFwiZmFpbGVkIHRyYWNrZXIgc2V0dGluZ3MgcGVyc2lzdGVuY2UgcmV0YWlucyB0aGUgcHJldmlvdXNseSBzYXZlZCBsb2dvXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3QgcHJldmlvdXNMb2dvUGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy8xMTExMTExMS0xMTExLTQxMTEtODExMS0xMTExMTExMTExMTFcIjtcbiAgY29uc3Qgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUuYnJhbmRpbmcgPSB7IG5hbWU6IFwiU3RhaXRTcXVhc2hcIiwgbG9nb1BhdGg6IHByZXZpb3VzTG9nb1BhdGggfTtcbiAgY29uc3QgZGVsZXRlZDogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgYXBwLnVzZShjcmVhdGVUcmFja2VyUm91dGVyKHtcbiAgICBnZXRTdGF0ZTogYXN5bmMgKCkgPT4gc3RydWN0dXJlZENsb25lKHN0YXRlKSxcbiAgICBzYXZlU3RhdGU6IGFzeW5jICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGFiYXNlIHVuYXZhaWxhYmxlXCIpO1xuICAgIH0sXG4gICAgb2JqZWN0U3RvcmFnZToge1xuICAgICAgc2F2ZU9iamVjdDogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgZ2V0T2JqZWN0OiBhc3luYyAoKSA9PiAoe30pIGFzIG5ldmVyLFxuICAgICAgZGVsZXRlT2JqZWN0OiBhc3luYyAocGF0aCkgPT4ge1xuICAgICAgICBkZWxldGVkLnB1c2gocGF0aCk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgYXV0aG9yaXplU3RhZmY6IChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCksXG4gIH0pKTtcbiAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3RlbigwLCBcIjEyNy4wLjAuMVwiKTtcbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNlcnZlci5vbmNlKFwibGlzdGVuaW5nXCIsIHJlc29sdmUpO1xuICAgIHNlcnZlci5vbmNlKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgfSk7XG4gIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH0vdHJhY2tlci9zZXR0aW5nc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29hY2hlczogc3RhdGUuY29hY2hlcyxcbiAgICAgICAgYnJhbmRpbmc6IHtcbiAgICAgICAgICBuYW1lOiBcIkNsdWJcIixcbiAgICAgICAgICBsb2dvUGF0aDogXCIvb2JqZWN0cy91cGxvYWRzL2xvZ29zLzIyMjIyMjIyLTIyMjItNDIyMi04MjIyLTIyMjIyMjIyMjIyMlwiLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLnN0YXR1cywgNTAwKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGRlbGV0ZWQsIFtdKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUuYnJhbmRpbmcubG9nb1BhdGgsIHByZXZpb3VzTG9nb1BhdGgpO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpLFxuICAgICk7XG4gIH1cbn0pO1xuXG50ZXN0KFwiY29hY2ggcmVwb3J0IGF1ZGlvIHVwbG9hZCBzdG9yZXMgYnl0ZXMgYW5kIHJldHVybnMgaXRzIG9iamVjdCBwYXRoXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUubWF0Y2hlcyA9IFt7XG4gICAgaWQ6IFwiY29tcGxldGVkLW1hdGNoXCIsXG4gICAgZXh0ZXJuYWxJZDogbnVsbCxcbiAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgIG9wcG9uZW50OiBcIk9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsXG4gICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTA6NDU6MDAuMDAwWlwiLFxuICAgIHZlbnVlOiBcIlZlbnVlXCIsXG4gICAgY291cnQ6IFwiQ291cnQgMVwiLFxuICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICByZXN1bHQ6IFwiV29uIDMtMVwiLFxuICAgIHJlcG9ydDogbnVsbCxcbiAgfV07XG4gIGNvbnN0IGF1ZGlvID0gQnVmZmVyLmZyb20oXCJyZWNvcmRlZCB2b2ljZSBub3RlXCIpO1xuICBjb25zdCBzYXZlZDogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGJ5dGVzOiBCdWZmZXI7IGNvbnRlbnRUeXBlOiBzdHJpbmcgfT4gPSBbXTtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgYXBwLnVzZShjcmVhdGVUcmFja2VyUm91dGVyKHtcbiAgICBnZXRTdGF0ZTogYXN5bmMgKCkgPT4gc3RydWN0dXJlZENsb25lKHN0YXRlKSxcbiAgICBzYXZlU3RhdGU6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICBvYmplY3RTdG9yYWdlOiB7XG4gICAgICBzYXZlT2JqZWN0OiBhc3luYyAocGF0aCwgYnl0ZXMsIGNvbnRlbnRUeXBlKSA9PiB7XG4gICAgICAgIHNhdmVkLnB1c2goeyBwYXRoLCBieXRlcywgY29udGVudFR5cGUgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0T2JqZWN0OiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCB1c2VkXCIpO1xuICAgICAgfSxcbiAgICAgIGRlbGV0ZU9iamVjdDogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgIH0sXG4gICAgYXV0aG9yaXplU3RhZmY6IChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCksXG4gIH0pKTtcbiAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3RlbigwLCBcIjEyNy4wLjAuMVwiKTtcbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNlcnZlci5vbmNlKFwibGlzdGVuaW5nXCIsIHJlc29sdmUpO1xuICAgIHNlcnZlci5vbmNlKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgfSk7XG4gIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkcmVzcy5wb3J0fS9tYXRjaGVzL2NvbXBsZXRlZC1tYXRjaC9yZXBvcnQvYXVkaW9gLFxuICAgICAgeyBtZXRob2Q6IFwiUE9TVFwiLCBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXVkaW8vd2VibVwiIH0sIGJvZHk6IGF1ZGlvIH0sXG4gICAgKTtcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2Uuc3RhdHVzLCAyMDApO1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCkgYXMgeyBvYmplY3RQYXRoOiBzdHJpbmcgfTtcbiAgICBhc3NlcnQubWF0Y2goYm9keS5vYmplY3RQYXRoLCAvXlxcL29iamVjdHNcXC91cGxvYWRzXFwvWzAtOWEtZi1dKyQvKTtcbiAgICBhc3NlcnQuZXF1YWwoc2F2ZWQubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnQuZXF1YWwoc2F2ZWRbMF0/LnBhdGgsIGJvZHkub2JqZWN0UGF0aCk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChzYXZlZFswXT8uYnl0ZXMsIGF1ZGlvKTtcbiAgICBhc3NlcnQuZXF1YWwoc2F2ZWRbMF0/LmNvbnRlbnRUeXBlLCBcImF1ZGlvL3dlYm1cIik7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHNlcnZlci5jbG9zZSgoZXJyb3IpID0+IChlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpKSxcbiAgICApO1xuICB9XG59KTtcblxudGVzdChcImF1ZGlvIHVwbG9hZCByZW1vdmVzIG9ubHkgZXhwaXJlZCB2b2ljZSBub3RlcyBub3QgcmVmZXJlbmNlZCBieSBjdXJyZW50IHJlcG9ydHNcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZWZlcmVuY2VkUGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy8xMTExMTExMS0xMTExLTQxMTEtODExMS0xMTExMTExMTExMTFcIjtcbiAgY29uc3Qgb3JwaGFuZWRQYXRoID0gXCIvb2JqZWN0cy91cGxvYWRzLzIyMjIyMjIyLTIyMjItNDIyMi04MjIyLTIyMjIyMjIyMjIyMlwiO1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5tYXRjaGVzID0gW3tcbiAgICBpZDogXCJjb21wbGV0ZWQtbWF0Y2hcIixcbiAgICBleHRlcm5hbElkOiBudWxsLFxuICAgIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gICAgb3Bwb25lbnQ6IFwiT3Bwb25lbnRcIixcbiAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEwOjAwOjAwLjAwMFpcIixcbiAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMDo0NTowMC4wMDBaXCIsXG4gICAgdmVudWU6IFwiVmVudWVcIixcbiAgICBjb3VydDogXCJDb3VydCAxXCIsXG4gICAgY29hY2hJZDogXCJjb2FjaC0xXCIsXG4gICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcImNvbXBsZXRlZC1tYXRjaFwiLFxuICAgICAgb2JzZXJ2YXRpb25zOiBbXCJTdGF5ZWQgY29tcG9zZWQuXCJdLFxuICAgICAgdHJhbnNjcmlwdDogbnVsbCxcbiAgICAgIGF1ZGlvUGF0aDogcmVmZXJlbmNlZFBhdGgsXG4gICAgICB1cGRhdGVkQXQ6IFwiMjAyNi0wOS0xNVQxMDowMDowMC4wMDBaXCIsXG4gICAgfSxcbiAgfV07XG4gIGNvbnN0IGRlbGV0ZWQ6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gIGFwcC51c2UoKHJlcSwgX3JlcywgbmV4dCkgPT4ge1xuICAgIHJlcS5sb2cgPSB7IGVycm9yOiAoKSA9PiB1bmRlZmluZWQgfSBhcyB1bmtub3duIGFzIHR5cGVvZiByZXEubG9nO1xuICAgIG5leHQoKTtcbiAgfSk7XG4gIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IHN0cnVjdHVyZWRDbG9uZShzdGF0ZSksXG4gICAgc2F2ZVN0YXRlOiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgb2JqZWN0U3RvcmFnZToge1xuICAgICAgc2F2ZU9iamVjdDogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgZ2V0T2JqZWN0OiBhc3luYyAoKSA9PiAoe30pIGFzIG5ldmVyLFxuICAgICAgbGlzdFZvaWNlTm90ZXNPbGRlclRoYW46IGFzeW5jICgpID0+IFtyZWZlcmVuY2VkUGF0aCwgb3JwaGFuZWRQYXRoXSxcbiAgICAgIGRlbGV0ZU9iamVjdDogYXN5bmMgKHBhdGgpID0+IHtcbiAgICAgICAgZGVsZXRlZC5wdXNoKHBhdGgpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGF1dGhvcml6ZVN0YWZmOiAoX3JlcSwgX3JlcywgbmV4dCkgPT4gbmV4dCgpLFxuICB9KSk7XG4gIGNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIik7XG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzZXJ2ZXIub25jZShcImxpc3RlbmluZ1wiLCByZXNvbHZlKTtcbiAgICBzZXJ2ZXIub25jZShcImVycm9yXCIsIHJlamVjdCk7XG4gIH0pO1xuICBjb25zdCBhZGRyZXNzID0gc2VydmVyLmFkZHJlc3MoKTtcbiAgYXNzZXJ0KGFkZHJlc3MgJiYgdHlwZW9mIGFkZHJlc3MgIT09IFwic3RyaW5nXCIpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH0vbWF0Y2hlcy9jb21wbGV0ZWQtbWF0Y2gvcmVwb3J0L2F1ZGlvYCxcbiAgICAgIHsgbWV0aG9kOiBcIlBPU1RcIiwgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImF1ZGlvL3dlYm1cIiB9LCBib2R5OiBcIm5ldyBub3RlXCIgfSxcbiAgICApO1xuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5zdGF0dXMsIDIwMCk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChkZWxldGVkLCBbb3JwaGFuZWRQYXRoXSk7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHNlcnZlci5jbG9zZSgoZXJyb3IpID0+IGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSksXG4gICAgKTtcbiAgfVxufSk7XG5cbnRlc3QoXCJ1bmZpbmlzaGVkIHZvaWNlIG5vdGUgY2xlYW51cCBmYWlsdXJlcyBhcmUgbG9nZ2VkIHdpdGhvdXQgZmFpbGluZyB1cGxvYWRcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5tYXRjaGVzID0gW3tcbiAgICBpZDogXCJjb21wbGV0ZWQtbWF0Y2hcIixcbiAgICBleHRlcm5hbElkOiBudWxsLFxuICAgIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gICAgb3Bwb25lbnQ6IFwiT3Bwb25lbnRcIixcbiAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEwOjAwOjAwLjAwMFpcIixcbiAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMDo0NTowMC4wMDBaXCIsXG4gICAgdmVudWU6IFwiVmVudWVcIixcbiAgICBjb3VydDogXCJDb3VydCAxXCIsXG4gICAgY29hY2hJZDogXCJjb2FjaC0xXCIsXG4gICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgcmVwb3J0OiBudWxsLFxuICB9XTtcbiAgY29uc3QgbG9nZ2VkOiBBcnJheTxbdW5rbm93biwgc3RyaW5nXT4gPSBbXTtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgYXBwLnVzZSgocmVxLCBfcmVzLCBuZXh0KSA9PiB7XG4gICAgcmVxLmxvZyA9IHtcbiAgICAgIGVycm9yOiAoZGV0YWlsczogdW5rbm93biwgbWVzc2FnZTogc3RyaW5nKSA9PiBsb2dnZWQucHVzaChbZGV0YWlscywgbWVzc2FnZV0pLFxuICAgIH0gYXMgdW5rbm93biBhcyB0eXBlb2YgcmVxLmxvZztcbiAgICBuZXh0KCk7XG4gIH0pO1xuICBhcHAudXNlKGNyZWF0ZVRyYWNrZXJSb3V0ZXIoe1xuICAgIGdldFN0YXRlOiBhc3luYyAoKSA9PiBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpLFxuICAgIHNhdmVTdGF0ZTogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgIG9iamVjdFN0b3JhZ2U6IHtcbiAgICAgIHNhdmVPYmplY3Q6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICAgIGdldE9iamVjdDogYXN5bmMgKCkgPT4gKHt9KSBhcyBuZXZlcixcbiAgICAgIGxpc3RWb2ljZU5vdGVzT2xkZXJUaGFuOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInN0b3JhZ2UgdW5hdmFpbGFibGVcIik7XG4gICAgICB9LFxuICAgICAgZGVsZXRlT2JqZWN0OiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgfSxcbiAgICBhdXRob3JpemVTdGFmZjogKF9yZXEsIF9yZXMsIG5leHQpID0+IG5leHQoKSxcbiAgfSkpO1xuICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDAsIFwiMTI3LjAuMC4xXCIpO1xuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2VydmVyLm9uY2UoXCJsaXN0ZW5pbmdcIiwgcmVzb2x2ZSk7XG4gICAgc2VydmVyLm9uY2UoXCJlcnJvclwiLCByZWplY3QpO1xuICB9KTtcbiAgY29uc3QgYWRkcmVzcyA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIGFzc2VydChhZGRyZXNzICYmIHR5cGVvZiBhZGRyZXNzICE9PSBcInN0cmluZ1wiKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9L21hdGNoZXMvY29tcGxldGVkLW1hdGNoL3JlcG9ydC9hdWRpb2AsXG4gICAgICB7IG1ldGhvZDogXCJQT1NUXCIsIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhdWRpby93ZWJtXCIgfSwgYm9keTogXCJuZXcgbm90ZVwiIH0sXG4gICAgKTtcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2Uuc3RhdHVzLCAyMDApO1xuICAgIGFzc2VydC5lcXVhbChsb2dnZWRbMF0/LlsxXSwgXCJDb3VsZCBub3QgZmluZCB1bmZpbmlzaGVkIGNvYWNoIHZvaWNlIG5vdGVzXCIpO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpLFxuICAgICk7XG4gIH1cbn0pO1xuXG50ZXN0KFwicmVwbGFjaW5nIHJlcG9ydCBhdWRpbyBkZWxldGVzIHRoZSBwcmV2aW91cyBvYmplY3QgYWZ0ZXIgcGVyc2lzdGVuY2VcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwcmV2aW91c0F1ZGlvUGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy8xMTExMTExMS0xMTExLTQxMTEtODExMS0xMTExMTExMTExMTFcIjtcbiAgY29uc3QgcmVwbGFjZW1lbnRBdWRpb1BhdGggPSBcIi9vYmplY3RzL3VwbG9hZHMvMjIyMjIyMjItMjIyMi00MjIyLTgyMjItMjIyMjIyMjIyMjIyXCI7XG4gIGNvbnN0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLm1hdGNoZXMgPSBbe1xuICAgIGlkOiBcImNvbXBsZXRlZC1tYXRjaFwiLFxuICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgICBvcHBvbmVudDogXCJPcHBvbmVudFwiLFxuICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEwOjQ1OjAwLjAwMFpcIixcbiAgICB2ZW51ZTogXCJWZW51ZVwiLFxuICAgIGNvdXJ0OiBcIkNvdXJ0IDFcIixcbiAgICBjb2FjaElkOiBcImNvYWNoLTFcIixcbiAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgcmVzdWx0OiBcIldvbiAzLTFcIixcbiAgICByZXBvcnQ6IHtcbiAgICAgIG1hdGNoSWQ6IFwiY29tcGxldGVkLW1hdGNoXCIsXG4gICAgICBvYnNlcnZhdGlvbnM6IFtcIk9sZCBvYnNlcnZhdGlvbi5cIl0sXG4gICAgICB0cmFuc2NyaXB0OiBudWxsLFxuICAgICAgYXVkaW9QYXRoOiBwcmV2aW91c0F1ZGlvUGF0aCxcbiAgICAgIHVwZGF0ZWRBdDogXCIyMDI2LTA5LTE2VDExOjAwOjAwLjAwMFpcIixcbiAgICB9LFxuICB9XTtcbiAgY29uc3QgZXZlbnRzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBzdG9yZWRPYmplY3RzID0gbmV3IFNldChbcHJldmlvdXNBdWRpb1BhdGgsIHJlcGxhY2VtZW50QXVkaW9QYXRoXSk7XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gIGFwcC51c2UoKHJlcSwgX3JlcywgbmV4dCkgPT4ge1xuICAgIHJlcS5sb2cgPSB7IGVycm9yOiAoKSA9PiB1bmRlZmluZWQgfSBhcyB1bmtub3duIGFzIHR5cGVvZiByZXEubG9nO1xuICAgIG5leHQoKTtcbiAgfSk7XG4gIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IHN0cnVjdHVyZWRDbG9uZShzdGF0ZSksXG4gICAgc2F2ZVN0YXRlOiBhc3luYyAobmV4dCkgPT4ge1xuICAgICAgZXZlbnRzLnB1c2goXCJwZXJzaXN0XCIpO1xuICAgICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgc3RydWN0dXJlZENsb25lKG5leHQpKTtcbiAgICB9LFxuICAgIG9iamVjdFN0b3JhZ2U6IHtcbiAgICAgIHNhdmVPYmplY3Q6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICAgIGdldE9iamVjdDogYXN5bmMgKHBhdGgpID0+IHtcbiAgICAgICAgaWYgKCFzdG9yZWRPYmplY3RzLmhhcyhwYXRoKSkgdGhyb3cgbmV3IEVycm9yKFwibm90IGZvdW5kXCIpO1xuICAgICAgICByZXR1cm4ge30gYXMgbmV2ZXI7XG4gICAgICB9LFxuICAgICAgZGVsZXRlT2JqZWN0OiBhc3luYyAocGF0aCkgPT4ge1xuICAgICAgICBldmVudHMucHVzaChgZGVsZXRlOiR7cGF0aH1gKTtcbiAgICAgICAgc3RvcmVkT2JqZWN0cy5kZWxldGUocGF0aCk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgYXV0aG9yaXplU3RhZmY6IChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCksXG4gIH0pKTtcbiAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3RlbigwLCBcIjEyNy4wLjAuMVwiKTtcbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNlcnZlci5vbmNlKFwibGlzdGVuaW5nXCIsIHJlc29sdmUpO1xuICAgIHNlcnZlci5vbmNlKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgfSk7XG4gIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICBhc3NlcnQoYWRkcmVzcyAmJiB0eXBlb2YgYWRkcmVzcyAhPT0gXCJzdHJpbmdcIik7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH0vbWF0Y2hlcy9jb21wbGV0ZWQtbWF0Y2gvcmVwb3J0YCwge1xuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBvYnNlcnZhdGlvbnM6IFtcIk5ldyBvYnNlcnZhdGlvbi5cIiwgXCJSZWNvdmVyZWQgdG8gdGhlIFQuXCIsIFwiU3RheWVkIGNvbXBvc2VkLlwiXSxcbiAgICAgICAgYXVkaW9QYXRoOiByZXBsYWNlbWVudEF1ZGlvUGF0aCxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5zdGF0dXMsIDIwMCk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChldmVudHMsIFtcInBlcnNpc3RcIiwgYGRlbGV0ZToke3ByZXZpb3VzQXVkaW9QYXRofWBdKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUubWF0Y2hlc1swXT8ucmVwb3J0Py5hdWRpb1BhdGgsIHJlcGxhY2VtZW50QXVkaW9QYXRoKTtcblxuICAgIGNvbnN0IHN0YWxlUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkcmVzcy5wb3J0fS9tYXRjaGVzL2NvbXBsZXRlZC1tYXRjaC9yZXBvcnRgLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIG9ic2VydmF0aW9uczogW1wiU3RhbGUgZWRpdC5cIiwgXCJSZWNvdmVyZWQgdG8gdGhlIFQuXCIsIFwiU3RheWVkIGNvbXBvc2VkLlwiXSxcbiAgICAgICAgICBhdWRpb1BhdGg6IHByZXZpb3VzQXVkaW9QYXRoLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhbGVSZXNwb25zZS5zdGF0dXMsIDQwMCk7XG4gICAgYXNzZXJ0LmVxdWFsKHN0YXRlLm1hdGNoZXNbMF0/LnJlcG9ydD8uYXVkaW9QYXRoLCByZXBsYWNlbWVudEF1ZGlvUGF0aCk7XG4gICAgYXNzZXJ0LmVxdWFsKHN0b3JlZE9iamVjdHMuaGFzKHJlcGxhY2VtZW50QXVkaW9QYXRoKSwgdHJ1ZSk7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHNlcnZlci5jbG9zZSgoZXJyb3IpID0+IGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSksXG4gICAgKTtcbiAgfVxufSk7XG5cbnRlc3QoXCJmYWlsZWQgcmVwb3J0IHBlcnNpc3RlbmNlIHJldGFpbnMgdGhlIHByZXZpb3VzIHZvaWNlIG5vdGVcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwcmV2aW91c0F1ZGlvUGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy8xMTExMTExMS0xMTExLTQxMTEtODExMS0xMTExMTExMTExMTFcIjtcbiAgY29uc3Qgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUubWF0Y2hlcyA9IFt7XG4gICAgaWQ6IFwiY29tcGxldGVkLW1hdGNoXCIsXG4gICAgZXh0ZXJuYWxJZDogbnVsbCxcbiAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgIG9wcG9uZW50OiBcIk9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsXG4gICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTA6NDU6MDAuMDAwWlwiLFxuICAgIHZlbnVlOiBcIlZlbnVlXCIsXG4gICAgY291cnQ6IFwiQ291cnQgMVwiLFxuICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICByZXN1bHQ6IFwiV29uIDMtMVwiLFxuICAgIHJlcG9ydDoge1xuICAgICAgbWF0Y2hJZDogXCJjb21wbGV0ZWQtbWF0Y2hcIixcbiAgICAgIG9ic2VydmF0aW9uczogW1wiT2xkIG9ic2VydmF0aW9uLlwiXSxcbiAgICAgIHRyYW5zY3JpcHQ6IG51bGwsXG4gICAgICBhdWRpb1BhdGg6IHByZXZpb3VzQXVkaW9QYXRoLFxuICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTE6MDA6MDAuMDAwWlwiLFxuICAgIH0sXG4gIH1dO1xuICBjb25zdCBkZWxldGVkOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuICBhcHAudXNlKGNyZWF0ZVRyYWNrZXJSb3V0ZXIoe1xuICAgIGdldFN0YXRlOiBhc3luYyAoKSA9PiBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpLFxuICAgIHNhdmVTdGF0ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YWJhc2UgdW5hdmFpbGFibGVcIik7XG4gICAgfSxcbiAgICBvYmplY3RTdG9yYWdlOiB7XG4gICAgICBzYXZlT2JqZWN0OiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgICBnZXRPYmplY3Q6IGFzeW5jICgpID0+ICh7fSkgYXMgbmV2ZXIsXG4gICAgICBkZWxldGVPYmplY3Q6IGFzeW5jIChwYXRoKSA9PiB7XG4gICAgICAgIGRlbGV0ZWQucHVzaChwYXRoKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhdXRob3JpemVTdGFmZjogKF9yZXEsIF9yZXMsIG5leHQpID0+IG5leHQoKSxcbiAgfSkpO1xuICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDAsIFwiMTI3LjAuMC4xXCIpO1xuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2VydmVyLm9uY2UoXCJsaXN0ZW5pbmdcIiwgcmVzb2x2ZSk7XG4gICAgc2VydmVyLm9uY2UoXCJlcnJvclwiLCByZWplY3QpO1xuICB9KTtcbiAgY29uc3QgYWRkcmVzcyA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIGFzc2VydChhZGRyZXNzICYmIHR5cGVvZiBhZGRyZXNzICE9PSBcInN0cmluZ1wiKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkcmVzcy5wb3J0fS9tYXRjaGVzL2NvbXBsZXRlZC1tYXRjaC9yZXBvcnRgLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG9ic2VydmF0aW9uczogW1wiTmV3IG9ic2VydmF0aW9uLlwiLCBcIlJlY292ZXJlZCB0byB0aGUgVC5cIiwgXCJTdGF5ZWQgY29tcG9zZWQuXCJdLFxuICAgICAgICBhdWRpb1BhdGg6IFwiL29iamVjdHMvdXBsb2Fkcy8yMjIyMjIyMi0yMjIyLTQyMjItODIyMi0yMjIyMjIyMjIyMjJcIixcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5zdGF0dXMsIDUwMCk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChkZWxldGVkLCBbXSk7XG4gICAgYXNzZXJ0LmVxdWFsKHN0YXRlLm1hdGNoZXNbMF0/LnJlcG9ydD8uYXVkaW9QYXRoLCBwcmV2aW91c0F1ZGlvUGF0aCk7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHNlcnZlci5jbG9zZSgoZXJyb3IpID0+IGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSksXG4gICAgKTtcbiAgfVxufSk7XG5cbnRlc3QoXCJ2b2ljZSBub3RlIGNsZWFudXAgZmFpbHVyZSBpcyBsb2dnZWQgd2l0aG91dCBmYWlsaW5nIHRoZSBzYXZlZCByZXBvcnRcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwcmV2aW91c0F1ZGlvUGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy8xMTExMTExMS0xMTExLTQxMTEtODExMS0xMTExMTExMTExMTFcIjtcbiAgY29uc3QgcmVwbGFjZW1lbnRBdWRpb1BhdGggPSBcIi9vYmplY3RzL3VwbG9hZHMvMjIyMjIyMjItMjIyMi00MjIyLTgyMjItMjIyMjIyMjIyMjIyXCI7XG4gIGNvbnN0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLm1hdGNoZXMgPSBbe1xuICAgIGlkOiBcImNvbXBsZXRlZC1tYXRjaFwiLFxuICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgICBvcHBvbmVudDogXCJPcHBvbmVudFwiLFxuICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEwOjQ1OjAwLjAwMFpcIixcbiAgICB2ZW51ZTogXCJWZW51ZVwiLFxuICAgIGNvdXJ0OiBcIkNvdXJ0IDFcIixcbiAgICBjb2FjaElkOiBcImNvYWNoLTFcIixcbiAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgcmVzdWx0OiBcIldvbiAzLTFcIixcbiAgICByZXBvcnQ6IHtcbiAgICAgIG1hdGNoSWQ6IFwiY29tcGxldGVkLW1hdGNoXCIsXG4gICAgICBvYnNlcnZhdGlvbnM6IFtcIk9sZCBvYnNlcnZhdGlvbi5cIl0sXG4gICAgICB0cmFuc2NyaXB0OiBudWxsLFxuICAgICAgYXVkaW9QYXRoOiBwcmV2aW91c0F1ZGlvUGF0aCxcbiAgICAgIHVwZGF0ZWRBdDogXCIyMDI2LTA5LTE2VDExOjAwOjAwLjAwMFpcIixcbiAgICB9LFxuICB9XTtcbiAgY29uc3QgbG9nZ2VkOiBBcnJheTxbdW5rbm93biwgc3RyaW5nXT4gPSBbXTtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgYXBwLnVzZSgocmVxLCBfcmVzLCBuZXh0KSA9PiB7XG4gICAgcmVxLmxvZyA9IHtcbiAgICAgIGVycm9yOiAoZGV0YWlsczogdW5rbm93biwgbWVzc2FnZTogc3RyaW5nKSA9PiBsb2dnZWQucHVzaChbZGV0YWlscywgbWVzc2FnZV0pLFxuICAgIH0gYXMgdW5rbm93biBhcyB0eXBlb2YgcmVxLmxvZztcbiAgICBuZXh0KCk7XG4gIH0pO1xuICBhcHAudXNlKGNyZWF0ZVRyYWNrZXJSb3V0ZXIoe1xuICAgIGdldFN0YXRlOiBhc3luYyAoKSA9PiBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpLFxuICAgIHNhdmVTdGF0ZTogYXN5bmMgKG5leHQpID0+IHtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHN0cnVjdHVyZWRDbG9uZShuZXh0KSk7XG4gICAgfSxcbiAgICBvYmplY3RTdG9yYWdlOiB7XG4gICAgICBzYXZlT2JqZWN0OiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgICBnZXRPYmplY3Q6IGFzeW5jICgpID0+ICh7fSkgYXMgbmV2ZXIsXG4gICAgICBkZWxldGVPYmplY3Q6IGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3RvcmFnZSB1bmF2YWlsYWJsZVwiKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhdXRob3JpemVTdGFmZjogKF9yZXEsIF9yZXMsIG5leHQpID0+IG5leHQoKSxcbiAgfSkpO1xuICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDAsIFwiMTI3LjAuMC4xXCIpO1xuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2VydmVyLm9uY2UoXCJsaXN0ZW5pbmdcIiwgcmVzb2x2ZSk7XG4gICAgc2VydmVyLm9uY2UoXCJlcnJvclwiLCByZWplY3QpO1xuICB9KTtcbiAgY29uc3QgYWRkcmVzcyA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIGFzc2VydChhZGRyZXNzICYmIHR5cGVvZiBhZGRyZXNzICE9PSBcInN0cmluZ1wiKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkcmVzcy5wb3J0fS9tYXRjaGVzL2NvbXBsZXRlZC1tYXRjaC9yZXBvcnRgLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG9ic2VydmF0aW9uczogW1wiTmV3IG9ic2VydmF0aW9uLlwiLCBcIlJlY292ZXJlZCB0byB0aGUgVC5cIiwgXCJTdGF5ZWQgY29tcG9zZWQuXCJdLFxuICAgICAgICBhdWRpb1BhdGg6IHJlcGxhY2VtZW50QXVkaW9QYXRoLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLnN0YXR1cywgMjAwKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUubWF0Y2hlc1swXT8ucmVwb3J0Py5hdWRpb1BhdGgsIHJlcGxhY2VtZW50QXVkaW9QYXRoKTtcbiAgICBhc3NlcnQuZXF1YWwobG9nZ2VkLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGxvZ2dlZFswXT8uWzFdLCBcIkNvdWxkIG5vdCByZW1vdmUgcmVwbGFjZWQgY29hY2ggdm9pY2Ugbm90ZVwiKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgc2VydmVyLmNsb3NlKChlcnJvcikgPT4gZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSxcbiAgICApO1xuICB9XG59KTtcblxudGVzdChcIm5vcm1hbCBzdWNjZXNzZnVsIHJlZnJlc2ggc2VuZHMgbm8gc3RhZmYgd2ViaG9va1wiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsRmV0Y2ggPSBnbG9iYWxUaGlzLmZldGNoO1xuICBjb25zdCBvcmlnaW5hbFNjaGVkdWxlVXJsID0gcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl07XG4gIGNvbnN0IG9yaWdpbmFsV2ViaG9va1VybCA9IHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl07XG4gIGxldCB3ZWJob29rUmVxdWVzdHMgPSAwO1xuXG4gIHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMXCJdID0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiO1xuICBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdID0gXCJodHRwczovL2FsZXJ0cy50ZXN0L2hvb2tcIjtcbiAgZ2xvYmFsVGhpcy5mZXRjaCA9IGFzeW5jIChpbnB1dCkgPT4ge1xuICAgIGlmIChTdHJpbmcoaW5wdXQpID09PSBcImh0dHBzOi8vc2NoZWR1bGUudGVzdC9mZWVkXCIpIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKHsgbWF0Y2hlczogW10gfSk7XG4gICAgfVxuICAgIHdlYmhvb2tSZXF1ZXN0cyArPSAxO1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDIwNCB9KTtcbiAgfTtcblxuICB0cnkge1xuICAgIGF3YWl0IHdpdGhUcmFja2VyU2VydmVyKGhlYWx0aHlTdGF0ZSgpLCBhc3luYyAodXJsKSA9PiB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7IG1ldGhvZDogXCJQT1NUXCIgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2Uuc3RhdHVzLCAyMDApO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tSZXF1ZXN0cywgMCk7XG4gICAgfSk7XG4gIH0gZmluYWxseSB7XG4gICAgZ2xvYmFsVGhpcy5mZXRjaCA9IG9yaWdpbmFsRmV0Y2g7XG4gICAgaWYgKG9yaWdpbmFsU2NoZWR1bGVVcmwgPT09IHVuZGVmaW5lZCkgZGVsZXRlIHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMXCJdO1xuICAgIGVsc2UgcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl0gPSBvcmlnaW5hbFNjaGVkdWxlVXJsO1xuICAgIGlmIChvcmlnaW5hbFdlYmhvb2tVcmwgPT09IHVuZGVmaW5lZCkgZGVsZXRlIHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl07XG4gICAgZWxzZSBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdID0gb3JpZ2luYWxXZWJob29rVXJsO1xuICB9XG59KTsiLCAiaW1wb3J0IGV4cHJlc3MsIHsgUm91dGVyLCB0eXBlIElSb3V0ZXIsIHR5cGUgUmVxdWVzdEhhbmRsZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgcmFuZG9tQnl0ZXMsIHJhbmRvbVVVSUQgfSBmcm9tIFwibm9kZTpjcnlwdG9cIjtcbmltcG9ydCB7IGVxIH0gZnJvbSBcImRyaXp6bGUtb3JtXCI7XG5pbXBvcnQge1xuICBEZWxldGVVbnVzZWRUcmFja2VyTG9nb0JvZHksXG4gIEdldFRyYWNrZXJSZXNwb25zZSxcbiAgUGVyc2lzdGVkVHJhY2tlclN0YXRlLFxuICBHZXRUcmFja2VySGVhbHRoUmVzcG9uc2UsXG4gIEdldFBsYXllclRyYWNrZXJQYXJhbXMsXG4gIEdldFBsYXllclRyYWNrZXJSZXNwb25zZSxcbiAgUm90YXRlUGxheWVyU2hhcmVUb2tlblBhcmFtcyxcbiAgUm90YXRlUGxheWVyU2hhcmVUb2tlblJlc3BvbnNlLFxuICBSZWZyZXNoVHJhY2tlclJlc3BvbnNlLFxuICBVcGxvYWRUcmFja2VyTG9nb1Jlc3BvbnNlLFxuICBVcGxvYWRDb2FjaFJlcG9ydEF1ZGlvUGFyYW1zLFxuICBVcGxvYWRDb2FjaFJlcG9ydEF1ZGlvUmVzcG9uc2UsXG4gIFNhdmVDb2FjaFJlcG9ydEJvZHksXG4gIFNhdmVDb2FjaFJlcG9ydFBhcmFtcyxcbiAgU2F2ZUNvYWNoUmVwb3J0UmVzcG9uc2UsXG4gIFNhdmVUcmFja2VyU2V0dGluZ3NCb2R5LFxuICBTYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2UsXG4gIFVwZGF0ZU1hdGNoQm9keSxcbiAgVXBkYXRlTWF0Y2hQYXJhbXMsXG4gIFVwZGF0ZU1hdGNoUmVzcG9uc2UsXG4gIHR5cGUgUGVyc2lzdGVkVHJhY2tlclN0YXRlIGFzIFBlcnNpc3RlZFRyYWNrZXJTbmFwc2hvdCxcbn0gZnJvbSBcIkB3b3Jrc3BhY2UvYXBpLXpvZFwiO1xuaW1wb3J0IHtcbiAgY2xlYXJSZWZyZXNoRmFpbHVyZXMsXG4gIGNsb25lVHJhY2tlclN0YXRlLFxuICBmcmVlemVUcmFja2VyU3RhdGUsXG4gIG1lcmdlQ2x1YkxvY2tlckZlZWQsXG4gIHBhcnNlQ2x1YkxvY2tlckZlZWQsXG4gIHJlY29yZFJlZnJlc2hGYWlsdXJlLFxuICB0eXBlIFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQsXG4gIHR5cGUgUmVhZG9ubHlUcmFja2VyU3RhdGUsXG4gIHR5cGUgUmVmcmVzaFJlY292ZXJ5LFxuICB0eXBlIFRyYWNrZXJTdGF0ZSxcbn0gZnJvbSBcIi4uL2xpYi9jbHViLWxvY2tlci5qc1wiO1xuaW1wb3J0IHsgZHJhd3NDb25maWdGcm9tRW52LCBmZXRjaENsdWJMb2NrZXJEcmF3cyB9IGZyb20gXCIuLi9saWIvY2x1Yi1sb2NrZXItZHJhd3MuanNcIjtcbmltcG9ydCB7IE9iamVjdFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uL2xpYi9vYmplY3Qtc3RvcmFnZS5qc1wiO1xuaW1wb3J0IHsgcmVxdWlyZVN0YWZmIH0gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVTdGFmZi5qc1wiO1xuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBUcmFja2VyU3RhdGUgPSB7XG4gIHBsYXllcnM6IFt7IGlkOiBcImNhbWVyb24tc3RhaXRcIiwgbmFtZTogXCJDYW1lcm9uIFN0YWl0XCIsIHNoYXJlVG9rZW46IHJhbmRvbUJ5dGVzKDMyKS50b1N0cmluZyhcImJhc2U2NHVybFwiKSB9XSxcbiAgY29hY2hlczogW1xuICAgIHsgaWQ6IFwiYWxleFwiLCBuYW1lOiBcIkFsZXhcIiB9LFxuICAgIHsgaWQ6IFwibmFyZWxsZVwiLCBuYW1lOiBcIk5hcmVsbGVcIiB9LFxuICAgIHsgaWQ6IFwicm9iXCIsIG5hbWU6IFwiUm9iXCIgfSxcbiAgICB7IGlkOiBcImphbWllXCIsIG5hbWU6IFwiSmFtaWVcIiB9LFxuICAgIHsgaWQ6IFwibmljb1wiLCBuYW1lOiBcIk5pY29cIiB9LFxuICAgIHsgaWQ6IFwidW5hc3NpZ25lZFwiLCBuYW1lOiBcIlVuYXNzaWduZWRcIiB9LFxuICBdLFxuICBicmFuZGluZzogeyBuYW1lOiBcIlN0YWl0U3F1YXNoXCIsIGxvZ29QYXRoOiBudWxsIH0sXG4gIG1hdGNoZXM6IFtcbiAgICB7XG4gICAgICBpZDogXCJtYXRjaC0xXCIsXG4gICAgICBleHRlcm5hbElkOiBudWxsLFxuICAgICAgcGxheWVySWQ6IFwiY2FtZXJvbi1zdGFpdFwiLFxuICAgICAgb3Bwb25lbnQ6IFwiRXRoYW4gQ29sZVwiLFxuICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6MTU6MDAtMDQ6MDBcIixcbiAgICAgIHZlbnVlOiBcIkFybGVuIFNwZWN0ZXIgVVMgU3F1YXNoIENlbnRlclwiLFxuICAgICAgY291cnQ6IFwiQ291cnQgNlwiLFxuICAgICAgY29hY2hJZDogXCJhbGV4XCIsXG4gICAgICBzdGF0dXM6IFwidXBjb21pbmdcIixcbiAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgIHJlcG9ydDogbnVsbCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiBcIm1hdGNoLTJcIixcbiAgICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgICBwbGF5ZXJJZDogXCJjYW1lcm9uLXN0YWl0XCIsXG4gICAgICBvcHBvbmVudDogXCJNaWxlcyBCcmVubmFuXCIsXG4gICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE3VDEwOjAwOjAwLTA0OjAwXCIsXG4gICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xN1QxMDo0NTowMC0wNDowMFwiLFxuICAgICAgdmVudWU6IFwiUGVubiBTcXVhc2ggQ2VudGVyXCIsXG4gICAgICBjb3VydDogXCJDb3VydCAzXCIsXG4gICAgICBjb2FjaElkOiBcInVuYXNzaWduZWRcIixcbiAgICAgIHN0YXR1czogXCJ1cGNvbWluZ1wiLFxuICAgICAgcmVzdWx0OiBudWxsLFxuICAgICAgcmVwb3J0OiBudWxsLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwibWF0Y2gtMFwiLFxuICAgICAgZXh0ZXJuYWxJZDogbnVsbCxcbiAgICAgIHBsYXllcklkOiBcImNhbWVyb24tc3RhaXRcIixcbiAgICAgIG9wcG9uZW50OiBcIkpvcmRhbiBMZWVcIixcbiAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTVUMDk6MDA6MDAtMDQ6MDBcIixcbiAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE1VDA5OjQyOjAwLTA0OjAwXCIsXG4gICAgICB2ZW51ZTogXCJBcmxlbiBTcGVjdGVyIFVTIFNxdWFzaCBDZW50ZXJcIixcbiAgICAgIGNvdXJ0OiBcIkNvdXJ0IDJcIixcbiAgICAgIGNvYWNoSWQ6IFwibmFyZWxsZVwiLFxuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgcmVzdWx0OiBcIldvbiAzXHUyMDEzMVwiLFxuICAgICAgcmVwb3J0OiBudWxsLFxuICAgIH0sXG4gIF0sXG4gIGxhc3RVcGRhdGVkQXQ6IFwiMjAyNi0wOS0xNVQxMjowMDowMC0wNDowMFwiLFxuICBzb3VyY2U6IFwic2FtcGxlXCIsXG4gIHJlZnJlc2hIZWFsdGg6IHtcbiAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiAwLFxuICAgIGFsZXJ0VGhyZXNob2xkOiAzLFxuICAgIGZpcnN0RmFpbHVyZUF0OiBudWxsLFxuICAgIGxhc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgYWxlcnRTZW50QXQ6IG51bGwsXG4gICAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OiBudWxsLFxuICAgIHBlbmRpbmdSZWNvdmVyaWVzOiBbXSxcbiAgICByZWNvdmVyeUNsYWltOiBudWxsLFxuICB9LFxufTtcblxuZnVuY3Rpb24gZ2V0QWxlcnRUaHJlc2hvbGQoKTogbnVtYmVyIHtcbiAgY29uc3QgY29uZmlndXJlZCA9IE51bWJlci5wYXJzZUludChcbiAgICBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX0FMRVJUX1RIUkVTSE9MRFwiXSA/PyBcIlwiLFxuICAgIDEwLFxuICApO1xuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihjb25maWd1cmVkKSAmJiBjb25maWd1cmVkID4gMCA/IGNvbmZpZ3VyZWQgOiAzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQZXJzaXN0ZWRUcmFja2VyU3RhdGUoXG4gIHZhbHVlOiB1bmtub3duLFxuKTogUGVyc2lzdGVkVHJhY2tlclNuYXBzaG90IHtcbiAgY29uc3QgcmVzdWx0ID0gUGVyc2lzdGVkVHJhY2tlclN0YXRlLnNhZmVQYXJzZSh2YWx1ZSk7XG4gIGlmIChyZXN1bHQuc3VjY2VzcykgcmV0dXJuIHJlc3VsdC5kYXRhO1xuXG4gIGNvbnN0IGRldGFpbHMgPSByZXN1bHQuZXJyb3IuaXNzdWVzXG4gICAgLm1hcCgoaXNzdWUpID0+IGAke2lzc3VlLnBhdGguam9pbihcIi5cIikgfHwgXCI8cm9vdD5cIn06ICR7aXNzdWUubWVzc2FnZX1gKVxuICAgIC5qb2luKFwiOyBcIik7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICBgU3RvcmVkIHRyYWNrZXIgc25hcHNob3QgaXMgaW52YWxpZC4gUmVwYWlyIG9yIHJlcGxhY2UgdGhlIFwibWFpblwiIHRyYWNrZXJfc3RhdGUgcmVjb3JkLiBWYWxpZGF0aW9uIGVycm9yczogJHtkZXRhaWxzfWAsXG4gICk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0YXRlKHN0YXRlOiBQZXJzaXN0ZWRUcmFja2VyU25hcHNob3QpOiBSZWFkb25seVRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IGFsZXJ0VGhyZXNob2xkID0gZ2V0QWxlcnRUaHJlc2hvbGQoKTtcbiAgY29uc3Qgc3RvcmVkQnJhbmRpbmcgPSBzdGF0ZS5icmFuZGluZztcbiAgY29uc3Qgc3RvcmVkUmVmcmVzaEhlYWx0aCA9IHN0YXRlLnJlZnJlc2hIZWFsdGggYXNcbiAgICB8IChOb25OdWxsYWJsZTx0eXBlb2Ygc3RhdGUucmVmcmVzaEhlYWx0aD4gJiB7XG4gICAgICAgIGZhaWx1cmVBbGVydENsYWltZWRBdD86IHN0cmluZyB8IG51bGw7XG4gICAgICAgIHJlY292ZXJ5Q2xhaW0/OiB7XG4gICAgICAgICAgb3V0YWdlU3RhcnRlZEF0OiBzdHJpbmc7XG4gICAgICAgICAgcmVjb3ZlcmVkQXQ6IHN0cmluZztcbiAgICAgICAgICBjbGFpbWVkQXQ6IHN0cmluZztcbiAgICAgICAgfSB8IG51bGw7XG4gICAgICB9KVxuICAgIHwgdW5kZWZpbmVkO1xuICByZXR1cm4gZnJlZXplVHJhY2tlclN0YXRlKHtcbiAgICBwbGF5ZXJzOiBzdGF0ZS5wbGF5ZXJzLm1hcCgocGxheWVyKSA9PiAoe1xuICAgICAgLi4ucGxheWVyLFxuICAgICAgc2hhcmVUb2tlbjogcGxheWVyLnNoYXJlVG9rZW4gPz8gcmFuZG9tQnl0ZXMoMzIpLnRvU3RyaW5nKFwiYmFzZTY0dXJsXCIpLFxuICAgIH0pKSxcbiAgICBjb2FjaGVzOiBzdGF0ZS5jb2FjaGVzLm1hcCgoY29hY2gpID0+ICh7IC4uLmNvYWNoIH0pKSxcbiAgICBicmFuZGluZzogc3RvcmVkQnJhbmRpbmdcbiAgICAgID8ge1xuICAgICAgICAgIG5hbWU6IHN0b3JlZEJyYW5kaW5nLm5hbWUsXG4gICAgICAgICAgbG9nb1BhdGg6IHN0b3JlZEJyYW5kaW5nLmxvZ29QYXRoID8/IG51bGwsXG4gICAgICAgIH1cbiAgICAgIDogeyBuYW1lOiBcIlN0YWl0U3F1YXNoXCIsIGxvZ29QYXRoOiBudWxsIH0sXG4gICAgbWF0Y2hlczogc3RhdGUubWF0Y2hlcy5tYXAoKG1hdGNoKSA9PiAoe1xuICAgICAgLi4ubWF0Y2gsXG4gICAgICByZXBvcnQ6IG1hdGNoLnJlcG9ydFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIC4uLm1hdGNoLnJlcG9ydCxcbiAgICAgICAgICAgIG9ic2VydmF0aW9uczogWy4uLm1hdGNoLnJlcG9ydC5vYnNlcnZhdGlvbnNdLFxuICAgICAgICAgICAgYXVkaW9QYXRoOiBtYXRjaC5yZXBvcnQuYXVkaW9QYXRoID8/IG51bGwsXG4gICAgICAgICAgfVxuICAgICAgICA6IG51bGwsXG4gICAgfSkpLFxuICAgIGxhc3RVcGRhdGVkQXQ6IHN0YXRlLmxhc3RVcGRhdGVkQXQsXG4gICAgc291cmNlOiBzdGF0ZS5zb3VyY2UsXG4gICAgcmVmcmVzaEhlYWx0aDogc3RhdGUucmVmcmVzaEhlYWx0aFxuICAgICAgPyB7XG4gICAgICAgICAgLi4uc3RhdGUucmVmcmVzaEhlYWx0aCxcbiAgICAgICAgICBmaXJzdEZhaWx1cmVBdDpcbiAgICAgICAgICAgIHN0YXRlLnJlZnJlc2hIZWFsdGguZmlyc3RGYWlsdXJlQXQgPz9cbiAgICAgICAgICAgIChzdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMgPiAwXG4gICAgICAgICAgICAgID8gc3RhdGUucmVmcmVzaEhlYWx0aC5sYXN0RmFpbHVyZUF0XG4gICAgICAgICAgICAgIDogbnVsbCksXG4gICAgICAgICAgcGVuZGluZ1JlY292ZXJpZXM6XG4gICAgICAgICAgICBzdG9yZWRSZWZyZXNoSGVhbHRoPy5wZW5kaW5nUmVjb3Zlcmllcz8ubWFwKChyZWNvdmVyeSkgPT4gKHtcbiAgICAgICAgICAgICAgLi4ucmVjb3ZlcnksXG4gICAgICAgICAgICB9KSkgPz9cbiAgICAgICAgICAgIChzdG9yZWRSZWZyZXNoSGVhbHRoPy5wZW5kaW5nUmVjb3ZlcnlcbiAgICAgICAgICAgICAgPyBbeyAuLi5zdG9yZWRSZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyeSB9XVxuICAgICAgICAgICAgICA6IFtdKSxcbiAgICAgICAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6XG4gICAgICAgICAgICBzdG9yZWRSZWZyZXNoSGVhbHRoPy5mYWlsdXJlQWxlcnRDbGFpbWVkQXQgPz8gbnVsbCxcbiAgICAgICAgICByZWNvdmVyeUNsYWltOiBzdG9yZWRSZWZyZXNoSGVhbHRoPy5yZWNvdmVyeUNsYWltXG4gICAgICAgICAgICA/IHsgLi4uc3RvcmVkUmVmcmVzaEhlYWx0aC5yZWNvdmVyeUNsYWltIH1cbiAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgY29uc2VjdXRpdmVGYWlsdXJlczogMCxcbiAgICAgICAgICBhbGVydFRocmVzaG9sZCxcbiAgICAgICAgICBmaXJzdEZhaWx1cmVBdDogbnVsbCxcbiAgICAgICAgICBsYXN0RmFpbHVyZUF0OiBudWxsLFxuICAgICAgICAgIGFsZXJ0U2VudEF0OiBudWxsLFxuICAgICAgICAgIGZhaWx1cmVBbGVydENsYWltZWRBdDogbnVsbCxcbiAgICAgICAgICBwZW5kaW5nUmVjb3ZlcmllczogW10sXG4gICAgICAgICAgcmVjb3ZlcnlDbGFpbTogbnVsbCxcbiAgICAgICAgfSxcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFN0YXRlKCk6IFByb21pc2U8UmVhZG9ubHlUcmFja2VyU3RhdGU+IHtcbiAgY29uc3QgeyBkYiwgdHJhY2tlclN0YXRlVGFibGUgfSA9IGF3YWl0IGltcG9ydChcIkB3b3Jrc3BhY2UvZGJcIik7XG4gIGNvbnN0IFtyb3ddID0gYXdhaXQgZGJcbiAgICAuc2VsZWN0KClcbiAgICAuZnJvbSh0cmFja2VyU3RhdGVUYWJsZSlcbiAgICAud2hlcmUoZXEodHJhY2tlclN0YXRlVGFibGUuaWQsIFwibWFpblwiKSk7XG5cbiAgaWYgKHJvdykge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlUGVyc2lzdGVkVHJhY2tlclN0YXRlKHJvdy5kYXRhKTtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplU3RhdGUocGFyc2VkKTtcbiAgICBpZiAocGFyc2VkLnBsYXllcnMuc29tZSgocGxheWVyKSA9PiAhcGxheWVyLnNoYXJlVG9rZW4pKSB7XG4gICAgICBhd2FpdCBzYXZlU3RhdGUoY2xvbmVUcmFja2VyU3RhdGUobm9ybWFsaXplZCkpO1xuICAgIH1cbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgfVxuXG4gIGNvbnN0IFtjcmVhdGVkXSA9IGF3YWl0IGRiXG4gICAgLmluc2VydCh0cmFja2VyU3RhdGVUYWJsZSlcbiAgICAudmFsdWVzKHsgaWQ6IFwibWFpblwiLCBkYXRhOiBJTklUSUFMX1NUQVRFIH0pXG4gICAgLnJldHVybmluZygpO1xuXG4gIHJldHVybiBub3JtYWxpemVTdGF0ZShwYXJzZVBlcnNpc3RlZFRyYWNrZXJTdGF0ZShjcmVhdGVkLmRhdGEpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZVN0YXRlKHN0YXRlOiBUcmFja2VyU3RhdGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgeyBkYiwgdHJhY2tlclN0YXRlVGFibGUgfSA9IGF3YWl0IGltcG9ydChcIkB3b3Jrc3BhY2UvZGJcIik7XG4gIGF3YWl0IGRiXG4gICAgLnVwZGF0ZSh0cmFja2VyU3RhdGVUYWJsZSlcbiAgICAuc2V0KHsgZGF0YTogc3RhdGUsIHVwZGF0ZWRBdDogbmV3IERhdGUoKSB9KVxuICAgIC53aGVyZShlcSh0cmFja2VyU3RhdGVUYWJsZS5pZCwgXCJtYWluXCIpKTtcbn1cblxudHlwZSBTdGF0ZU11dGF0aW9uT3BlcmF0aW9uPFQ+ID0gKFxuICBsb2FkU3RhdGU6ICgpID0+IFByb21pc2U8UmVhZG9ubHlUcmFja2VyU3RhdGU+LFxuICBzYXZlU3RhdGU6IChzdGF0ZTogVHJhY2tlclN0YXRlKSA9PiBQcm9taXNlPHZvaWQ+LFxuKSA9PiBQcm9taXNlPFQ+O1xuXG5hc3luYyBmdW5jdGlvbiBtdXRhdGVTdGF0ZUluVHJhbnNhY3Rpb248VD4oXG4gIG9wZXJhdGlvbjogU3RhdGVNdXRhdGlvbk9wZXJhdGlvbjxUPixcbik6IFByb21pc2U8VD4ge1xuICBjb25zdCB7IGRiLCB0cmFja2VyU3RhdGVUYWJsZSB9ID0gYXdhaXQgaW1wb3J0KFwiQHdvcmtzcGFjZS9kYlwiKTtcbiAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKGFzeW5jICh0cmFuc2FjdGlvbikgPT4ge1xuICAgIGF3YWl0IHRyYW5zYWN0aW9uXG4gICAgICAuaW5zZXJ0KHRyYWNrZXJTdGF0ZVRhYmxlKVxuICAgICAgLnZhbHVlcyh7IGlkOiBcIm1haW5cIiwgZGF0YTogSU5JVElBTF9TVEFURSB9KVxuICAgICAgLm9uQ29uZmxpY3REb05vdGhpbmcoKTtcblxuICAgIGNvbnN0IFtyb3ddID0gYXdhaXQgdHJhbnNhY3Rpb25cbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLmZyb20odHJhY2tlclN0YXRlVGFibGUpXG4gICAgICAud2hlcmUoZXEodHJhY2tlclN0YXRlVGFibGUuaWQsIFwibWFpblwiKSlcbiAgICAgIC5mb3IoXCJ1cGRhdGVcIik7XG4gICAgaWYgKCFyb3cpIHRocm93IG5ldyBFcnJvcihcIlRyYWNrZXIgc3RhdGUgcm93IGNvdWxkIG5vdCBiZSBsb2NrZWRcIik7XG5cbiAgICBsZXQgY3VycmVudCA9IG5vcm1hbGl6ZVN0YXRlKHBhcnNlUGVyc2lzdGVkVHJhY2tlclN0YXRlKHJvdy5kYXRhKSk7XG4gICAgcmV0dXJuIG9wZXJhdGlvbihcbiAgICAgIGFzeW5jICgpID0+IGN1cnJlbnQsXG4gICAgICBhc3luYyAobmV4dCkgPT4ge1xuICAgICAgICBhd2FpdCB0cmFuc2FjdGlvblxuICAgICAgICAgIC51cGRhdGUodHJhY2tlclN0YXRlVGFibGUpXG4gICAgICAgICAgLnNldCh7IGRhdGE6IG5leHQsIHVwZGF0ZWRBdDogbmV3IERhdGUoKSB9KVxuICAgICAgICAgIC53aGVyZShlcSh0cmFja2VyU3RhdGVUYWJsZS5pZCwgXCJtYWluXCIpKTtcbiAgICAgICAgY3VycmVudCA9IGZyZWV6ZVRyYWNrZXJTdGF0ZShjbG9uZVRyYWNrZXJTdGF0ZShuZXh0KSk7XG4gICAgICB9LFxuICAgICk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaENsdWJMb2NrZXJGZWVkKCk6IFByb21pc2U8UmVhZG9ubHlDbHViTG9ja2VyRmVlZD4ge1xuICBjb25zdCBkcmF3c0NvbmZpZyA9IGRyYXdzQ29uZmlnRnJvbUVudigpO1xuICBpZiAoZHJhd3NDb25maWcpIHtcbiAgICByZXR1cm4gcGFyc2VDbHViTG9ja2VyRmVlZChhd2FpdCBmZXRjaENsdWJMb2NrZXJEcmF3cyhkcmF3c0NvbmZpZykpO1xuICB9XG5cbiAgY29uc3QgdXJsID0gcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl07XG4gIGlmICghdXJsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJDbHViIExvY2tlciBpcyBub3QgY29uZmlndXJlZC4gU2V0IENMVUJfTE9DS0VSX1RPVVJOQU1FTlRfSURTIGFuZCBDTFVCX0xPQ0tFUl9QTEFZRVJfSURTXCIsXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgMTBfMDAwKTtcbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfQVBJX1RPS0VOXCJdO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICBoZWFkZXJzOiB0b2tlbiA/IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAgfSA6IHVuZGVmaW5lZCxcbiAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDbHViIExvY2tlciByZXR1cm5lZCBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VDbHViTG9ja2VyRmVlZChhd2FpdCByZXNwb25zZS5qc29uKCkpO1xuICB9IGZpbmFsbHkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBhbGVydFN0YWZmKHN0YXRlOiBUcmFja2VyU3RhdGUsIGVycm9yOiB1bmtub3duKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHVybCA9IHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl07XG4gIGlmICghdXJsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkwgaXMgbm90IGNvbmZpZ3VyZWRcIik7XG4gIH1cblxuICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIlVua25vd24gQ2x1YiBMb2NrZXIgZXJyb3JcIjtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCAxMF8wMDApO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0ZXh0OiBgU3RhaXRTcXVhc2ggYWxlcnQ6IENsdWIgTG9ja2VyIHNjaGVkdWxlIHJlZnJlc2ggaGFzIGZhaWxlZCAke3N0YXRlLnJlZnJlc2hIZWFsdGguY29uc2VjdXRpdmVGYWlsdXJlc30gY29uc2VjdXRpdmUgdGltZXMuIExhdGVzdCBlcnJvcjogJHttZXNzYWdlfWAsXG4gICAgICAgIGV2ZW50OiBcImNsdWItbG9ja2VyLXJlZnJlc2gtZmFpbGluZ1wiLFxuICAgICAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiBzdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMsXG4gICAgICAgIGxhc3RGYWlsdXJlQXQ6IHN0YXRlLnJlZnJlc2hIZWFsdGgubGFzdEZhaWx1cmVBdCxcbiAgICAgIH0pLFxuICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0YWZmIGFsZXJ0IHdlYmhvb2sgcmV0dXJuZWQgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdER1cmF0aW9uKGR1cmF0aW9uTXM6IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IHRvdGFsTWludXRlcyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQoZHVyYXRpb25NcyAvIDYwXzAwMCkpO1xuICBpZiAodG90YWxNaW51dGVzIDwgNjApIHtcbiAgICByZXR1cm4gYCR7dG90YWxNaW51dGVzfSBtaW51dGUke3RvdGFsTWludXRlcyA9PT0gMSA/IFwiXCIgOiBcInNcIn1gO1xuICB9XG5cbiAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHRvdGFsTWludXRlcyAvIDYwKTtcbiAgY29uc3QgbWludXRlcyA9IHRvdGFsTWludXRlcyAlIDYwO1xuICByZXR1cm4gYCR7aG91cnN9IGhvdXIke2hvdXJzID09PSAxID8gXCJcIiA6IFwic1wifSR7XG4gICAgbWludXRlcyA9PT0gMCA/IFwiXCIgOiBgICR7bWludXRlc30gbWludXRlJHttaW51dGVzID09PSAxID8gXCJcIiA6IFwic1wifWBcbiAgfWA7XG59XG5cbmNvbnN0IE5PVElGSUNBVElPTl9DTEFJTV9MRUFTRV9NUyA9IDMwXzAwMDtcblxuZnVuY3Rpb24gaXNBY3RpdmVOb3RpZmljYXRpb25DbGFpbShjbGFpbWVkQXQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgaWYgKCFjbGFpbWVkQXQpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgYWdlID0gRGF0ZS5ub3coKSAtIERhdGUucGFyc2UoY2xhaW1lZEF0KTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShhZ2UpICYmIGFnZSA+PSAwICYmIGFnZSA8IE5PVElGSUNBVElPTl9DTEFJTV9MRUFTRV9NUztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9nb0ltYWdlKGJ5dGVzOiBCdWZmZXIsIGNvbnRlbnRUeXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKGJ5dGVzLmxlbmd0aCA9PT0gMCB8fCBieXRlcy5sZW5ndGggPiA1ICogMTAyNCAqIDEwMjQpIHJldHVybiBmYWxzZTtcbiAgaWYgKGNvbnRlbnRUeXBlID09PSBcImltYWdlL3BuZ1wiKSB7XG4gICAgcmV0dXJuIGJ5dGVzLnN1YmFycmF5KDAsIDgpLmVxdWFscyhCdWZmZXIuZnJvbShbMHg4OSwgMHg1MCwgMHg0ZSwgMHg0NywgMHgwZCwgMHgwYSwgMHgxYSwgMHgwYV0pKTtcbiAgfVxuICBpZiAoY29udGVudFR5cGUgPT09IFwiaW1hZ2UvanBlZ1wiKSByZXR1cm4gYnl0ZXNbMF0gPT09IDB4ZmYgJiYgYnl0ZXNbMV0gPT09IDB4ZDggJiYgYnl0ZXNbMl0gPT09IDB4ZmY7XG4gIGlmIChjb250ZW50VHlwZSA9PT0gXCJpbWFnZS9naWZcIikgcmV0dXJuIFtcIkdJRjg3YVwiLCBcIkdJRjg5YVwiXS5pbmNsdWRlcyhieXRlcy5zdWJhcnJheSgwLCA2KS50b1N0cmluZyhcImFzY2lpXCIpKTtcbiAgaWYgKGNvbnRlbnRUeXBlID09PSBcImltYWdlL3dlYnBcIikge1xuICAgIHJldHVybiBieXRlcy5zdWJhcnJheSgwLCA0KS50b1N0cmluZyhcImFzY2lpXCIpID09PSBcIlJJRkZcIiAmJiBieXRlcy5zdWJhcnJheSg4LCAxMikudG9TdHJpbmcoXCJhc2NpaVwiKSA9PT0gXCJXRUJQXCI7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhbGVydFN0YWZmT2ZSZWNvdmVyeShcbiAgcmVjb3Zlcnk6IFJlZnJlc2hSZWNvdmVyeSxcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB1cmwgPSBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdO1xuICBpZiAoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkwgaXMgbm90IGNvbmZpZ3VyZWRcIik7XG5cbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCAxMF8wMDApO1xuICB0cnkge1xuICAgIGNvbnN0IG91dGFnZUR1cmF0aW9uID0gZm9ybWF0RHVyYXRpb24ocmVjb3Zlcnkub3V0YWdlRHVyYXRpb25Ncyk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHRleHQ6IGBTdGFpdFNxdWFzaCByZWNvdmVyeTogQ2x1YiBMb2NrZXIgc2NoZWR1bGUgcmVmcmVzaCBpcyB3b3JraW5nIGFnYWluIGFmdGVyICR7b3V0YWdlRHVyYXRpb259IGFuZCAke3JlY292ZXJ5LmZhaWxlZEF0dGVtcHRzfSBmYWlsZWQgYXR0ZW1wdCR7cmVjb3ZlcnkuZmFpbGVkQXR0ZW1wdHMgPT09IDEgPyBcIlwiIDogXCJzXCJ9LiBUaGUgc2NoZWR1bGUgaXMgY3VycmVudC5gLFxuICAgICAgICBldmVudDogXCJjbHViLWxvY2tlci1yZWZyZXNoLXJlY292ZXJlZFwiLFxuICAgICAgICBmYWlsZWRBdHRlbXB0czogcmVjb3ZlcnkuZmFpbGVkQXR0ZW1wdHMsXG4gICAgICAgIG91dGFnZUR1cmF0aW9uTXM6IHJlY292ZXJ5Lm91dGFnZUR1cmF0aW9uTXMsXG4gICAgICAgIG91dGFnZVN0YXJ0ZWRBdDogcmVjb3Zlcnkub3V0YWdlU3RhcnRlZEF0LFxuICAgICAgICByZWNvdmVyZWRBdDogcmVjb3ZlcnkucmVjb3ZlcmVkQXQsXG4gICAgICB9KSxcbiAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdGFmZiBhbGVydCB3ZWJob29rIHJldHVybmVkIEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgfVxufVxuXG50eXBlIFRyYWNrZXJSb3V0ZXJEZXBlbmRlbmNpZXMgPSB7XG4gIGdldFN0YXRlOiAoKSA9PiBQcm9taXNlPFJlYWRvbmx5VHJhY2tlclN0YXRlPjtcbiAgc2F2ZVN0YXRlOiAoc3RhdGU6IFRyYWNrZXJTdGF0ZSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgbXV0YXRlU3RhdGU/OiA8VD4ob3BlcmF0aW9uOiBTdGF0ZU11dGF0aW9uT3BlcmF0aW9uPFQ+KSA9PiBQcm9taXNlPFQ+O1xuICBvYmplY3RTdG9yYWdlPzogUGljazxPYmplY3RTdG9yYWdlU2VydmljZSwgXCJzYXZlT2JqZWN0XCIgfCBcImdldE9iamVjdFwiIHwgXCJkZWxldGVPYmplY3RcIj4gJlxuICAgIFBhcnRpYWw8UGljazxPYmplY3RTdG9yYWdlU2VydmljZSwgXCJsaXN0Vm9pY2VOb3Rlc09sZGVyVGhhblwiPj47XG4gIGF1dGhvcml6ZVN0YWZmPzogUmVxdWVzdEhhbmRsZXI7XG4gIHJlY292ZXJJbnZhbGlkU3RhdGU/OiAocmVxdWVzdDoge1xuICAgIGFjdG9ySWQ6IHN0cmluZztcbiAgICByZWFzb246IHN0cmluZztcbiAgfSkgPT4gUHJvbWlzZTxcbiAgICB8IHsgb3V0Y29tZTogXCJyZWNvdmVyZWRcIjsgYmFja3VwSWQ6IHN0cmluZzsgcmVjb3ZlcmVkQXQ6IHN0cmluZyB9XG4gICAgfCB7IG91dGNvbWU6IFwidmFsaWRcIiB9XG4gICAgfCB7IG91dGNvbWU6IFwibWlzc2luZ1wiIH1cbiAgPjtcbn07XG5cbnR5cGUgUmVjb3ZlcnlUcmFuc2FjdGlvbiA9IHtcbiAgbG9hZEZvclVwZGF0ZTogKCkgPT4gUHJvbWlzZTx7IGlkOiBzdHJpbmc7IGRhdGE6IHVua25vd24gfSB8IHVuZGVmaW5lZD47XG4gIGluc2VydEJhY2t1cDogKGJhY2t1cDoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdHJhY2tlclN0YXRlSWQ6IHN0cmluZztcbiAgICByZWplY3RlZERhdGE6IHVua25vd247XG4gICAgcmVqZWN0aW9uRGV0YWlsczogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogRGF0ZTtcbiAgfSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgcmVwbGFjZVN0YXRlOiAocmVwbGFjZW1lbnQ6IHtcbiAgICB0cmFja2VyU3RhdGVJZDogc3RyaW5nO1xuICAgIGRhdGE6IFRyYWNrZXJTdGF0ZTtcbiAgICB1cGRhdGVkQXQ6IERhdGU7XG4gIH0pID0+IFByb21pc2U8dm9pZD47XG4gIGluc2VydEF1ZGl0OiAoYXVkaXQ6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRyYWNrZXJTdGF0ZUlkOiBzdHJpbmc7XG4gICAgYmFja3VwSWQ6IHN0cmluZztcbiAgICBhY3RvcklkOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgcmVjb3ZlcmVkQXQ6IERhdGU7XG4gIH0pID0+IFByb21pc2U8dm9pZD47XG59O1xuXG5leHBvcnQgdHlwZSBSdW5SZWNvdmVyeVRyYW5zYWN0aW9uID0gPFQ+KFxuICBvcGVyYXRpb246ICh0cmFuc2FjdGlvbjogUmVjb3ZlcnlUcmFuc2FjdGlvbikgPT4gUHJvbWlzZTxUPixcbikgPT4gUHJvbWlzZTxUPjtcblxuYXN5bmMgZnVuY3Rpb24gcnVuRGF0YWJhc2VSZWNvdmVyeVRyYW5zYWN0aW9uPFQ+KFxuICBvcGVyYXRpb246ICh0cmFuc2FjdGlvbjogUmVjb3ZlcnlUcmFuc2FjdGlvbikgPT4gUHJvbWlzZTxUPixcbik6IFByb21pc2U8VD4ge1xuICBjb25zdCB7XG4gICAgZGIsXG4gICAgdHJhY2tlclJlY292ZXJ5QXVkaXRUYWJsZSxcbiAgICB0cmFja2VyU3RhdGVCYWNrdXBUYWJsZSxcbiAgICB0cmFja2VyU3RhdGVUYWJsZSxcbiAgfSA9IGF3YWl0IGltcG9ydChcIkB3b3Jrc3BhY2UvZGJcIik7XG4gIHJldHVybiBkYi50cmFuc2FjdGlvbihhc3luYyAodHJhbnNhY3Rpb24pID0+XG4gICAgb3BlcmF0aW9uKHtcbiAgICAgIGxvYWRGb3JVcGRhdGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgW3Jvd10gPSBhd2FpdCB0cmFuc2FjdGlvblxuICAgICAgICAgIC5zZWxlY3QoKVxuICAgICAgICAgIC5mcm9tKHRyYWNrZXJTdGF0ZVRhYmxlKVxuICAgICAgICAgIC53aGVyZShlcSh0cmFja2VyU3RhdGVUYWJsZS5pZCwgXCJtYWluXCIpKVxuICAgICAgICAgIC5mb3IoXCJ1cGRhdGVcIik7XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgICB9LFxuICAgICAgaW5zZXJ0QmFja3VwOiBhc3luYyAoYmFja3VwKSA9PiB7XG4gICAgICAgIGF3YWl0IHRyYW5zYWN0aW9uLmluc2VydCh0cmFja2VyU3RhdGVCYWNrdXBUYWJsZSkudmFsdWVzKGJhY2t1cCk7XG4gICAgICB9LFxuICAgICAgcmVwbGFjZVN0YXRlOiBhc3luYyAocmVwbGFjZW1lbnQpID0+IHtcbiAgICAgICAgYXdhaXQgdHJhbnNhY3Rpb25cbiAgICAgICAgICAudXBkYXRlKHRyYWNrZXJTdGF0ZVRhYmxlKVxuICAgICAgICAgIC5zZXQoe1xuICAgICAgICAgICAgZGF0YTogcmVwbGFjZW1lbnQuZGF0YSxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogcmVwbGFjZW1lbnQudXBkYXRlZEF0LFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLndoZXJlKGVxKHRyYWNrZXJTdGF0ZVRhYmxlLmlkLCByZXBsYWNlbWVudC50cmFja2VyU3RhdGVJZCkpO1xuICAgICAgfSxcbiAgICAgIGluc2VydEF1ZGl0OiBhc3luYyAoYXVkaXQpID0+IHtcbiAgICAgICAgYXdhaXQgdHJhbnNhY3Rpb24uaW5zZXJ0KHRyYWNrZXJSZWNvdmVyeUF1ZGl0VGFibGUpLnZhbHVlcyhhdWRpdCk7XG4gICAgICB9LFxuICAgIH0pLFxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVjb3ZlckludmFsaWRUcmFja2VyU3RhdGUoe1xuICBhY3RvcklkLFxuICByZWFzb24sXG59OiB7XG4gIGFjdG9ySWQ6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG59LCBydW5UcmFuc2FjdGlvbjogUnVuUmVjb3ZlcnlUcmFuc2FjdGlvbiA9IHJ1bkRhdGFiYXNlUmVjb3ZlcnlUcmFuc2FjdGlvbik6IFByb21pc2U8XG4gIHwgeyBvdXRjb21lOiBcInJlY292ZXJlZFwiOyBiYWNrdXBJZDogc3RyaW5nOyByZWNvdmVyZWRBdDogc3RyaW5nIH1cbiAgfCB7IG91dGNvbWU6IFwidmFsaWRcIiB9XG4gIHwgeyBvdXRjb21lOiBcIm1pc3NpbmdcIiB9XG4+IHtcbiAgcmV0dXJuIHJ1blRyYW5zYWN0aW9uKGFzeW5jICh0cmFuc2FjdGlvbikgPT4ge1xuICAgIGNvbnN0IHJvdyA9IGF3YWl0IHRyYW5zYWN0aW9uLmxvYWRGb3JVcGRhdGUoKTtcbiAgICBpZiAoIXJvdykgcmV0dXJuIHsgb3V0Y29tZTogXCJtaXNzaW5nXCIgfTtcbiAgICBpZiAoUGVyc2lzdGVkVHJhY2tlclN0YXRlLnNhZmVQYXJzZShyb3cuZGF0YSkuc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIHsgb3V0Y29tZTogXCJ2YWxpZFwiIH07XG4gICAgfVxuXG4gICAgbGV0IHJlamVjdGlvbkRldGFpbHM6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgcGFyc2VQZXJzaXN0ZWRUcmFja2VyU3RhdGUocm93LmRhdGEpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgcmVqZWN0ZWQgdHJhY2tlciBzbmFwc2hvdFwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmVqZWN0aW9uRGV0YWlscyA9XG4gICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogXCJVbmtub3duIHZhbGlkYXRpb24gZmFpbHVyZVwiO1xuICAgIH1cblxuICAgIGNvbnN0IGJhY2t1cElkID0gcmFuZG9tVVVJRCgpO1xuICAgIGNvbnN0IGF1ZGl0SWQgPSByYW5kb21VVUlEKCk7XG4gICAgY29uc3QgcmVjb3ZlcmVkQXQgPSBuZXcgRGF0ZSgpO1xuICAgIGF3YWl0IHRyYW5zYWN0aW9uLmluc2VydEJhY2t1cCh7XG4gICAgICBpZDogYmFja3VwSWQsXG4gICAgICB0cmFja2VyU3RhdGVJZDogcm93LmlkLFxuICAgICAgcmVqZWN0ZWREYXRhOiByb3cuZGF0YSxcbiAgICAgIHJlamVjdGlvbkRldGFpbHMsXG4gICAgICBjcmVhdGVkQXQ6IHJlY292ZXJlZEF0LFxuICAgIH0pO1xuICAgIGF3YWl0IHRyYW5zYWN0aW9uLnJlcGxhY2VTdGF0ZSh7XG4gICAgICB0cmFja2VyU3RhdGVJZDogcm93LmlkLFxuICAgICAgZGF0YTogc3RydWN0dXJlZENsb25lKElOSVRJQUxfU1RBVEUpLFxuICAgICAgdXBkYXRlZEF0OiByZWNvdmVyZWRBdCxcbiAgICB9KTtcbiAgICBhd2FpdCB0cmFuc2FjdGlvbi5pbnNlcnRBdWRpdCh7XG4gICAgICBpZDogYXVkaXRJZCxcbiAgICAgIHRyYWNrZXJTdGF0ZUlkOiByb3cuaWQsXG4gICAgICBiYWNrdXBJZCxcbiAgICAgIGFjdG9ySWQsXG4gICAgICByZWFzb24sXG4gICAgICByZWNvdmVyZWRBdCxcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgb3V0Y29tZTogXCJyZWNvdmVyZWRcIixcbiAgICAgIGJhY2t1cElkLFxuICAgICAgcmVjb3ZlcmVkQXQ6IHJlY292ZXJlZEF0LnRvSVNPU3RyaW5nKCksXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRyYWNrZXJSZXNwb25zZShzdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGUpIHtcbiAgY29uc3QgcGVuZGluZ1JlY292ZXJ5Tm90aWNlcyA9XG4gICAgc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcy5sZW5ndGggLVxuICAgIChpc0FjdGl2ZU5vdGlmaWNhdGlvbkNsYWltKHN0YXRlLnJlZnJlc2hIZWFsdGgucmVjb3ZlcnlDbGFpbT8uY2xhaW1lZEF0KVxuICAgICAgPyAxXG4gICAgICA6IDApO1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGJyYW5kaW5nOiBzdGF0ZS5icmFuZGluZyA/PyB7IG5hbWU6IFwiU3RhaXRTcXVhc2hcIiwgbG9nb1BhdGg6IG51bGwgfSxcbiAgICByZWZyZXNoSGVhbHRoOiB7XG4gICAgICAuLi5zdGF0ZS5yZWZyZXNoSGVhbHRoLFxuICAgICAgcGVuZGluZ1JlY292ZXJ5Tm90aWNlczogTWF0aC5tYXgoMCwgcGVuZGluZ1JlY292ZXJ5Tm90aWNlcyksXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gdHJhY2tlckhlYWx0aFJlc3BvbnNlKHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSkge1xuICBjb25zdCBwZW5kaW5nUmVjb3ZlcnlOb3RpY2VzID1cbiAgICBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLmxlbmd0aCAtXG4gICAgKGlzQWN0aXZlTm90aWZpY2F0aW9uQ2xhaW0oc3RhdGUucmVmcmVzaEhlYWx0aC5yZWNvdmVyeUNsYWltPy5jbGFpbWVkQXQpXG4gICAgICA/IDFcbiAgICAgIDogMCk7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUucmVmcmVzaEhlYWx0aCxcbiAgICBwZW5kaW5nUmVjb3ZlcnlOb3RpY2VzOiBNYXRoLm1heCgwLCBwZW5kaW5nUmVjb3ZlcnlOb3RpY2VzKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3RQYXRoUmVmZXJlbmNlZChzdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGUsIG9iamVjdFBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gKHN0YXRlLmJyYW5kaW5nPy5sb2dvUGF0aCA/PyBudWxsKSA9PT0gb2JqZWN0UGF0aCB8fFxuICAgIHN0YXRlLm1hdGNoZXMuc29tZSgobWF0Y2gpID0+IG1hdGNoLnJlcG9ydD8uYXVkaW9QYXRoID09PSBvYmplY3RQYXRoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRyYWNrZXJSb3V0ZXIoXG4gIGRlcGVuZGVuY2llczogVHJhY2tlclJvdXRlckRlcGVuZGVuY2llcyA9IHtcbiAgICBnZXRTdGF0ZSxcbiAgICBzYXZlU3RhdGUsXG4gICAgbXV0YXRlU3RhdGU6IG11dGF0ZVN0YXRlSW5UcmFuc2FjdGlvbixcbiAgICByZWNvdmVySW52YWxpZFN0YXRlOiByZWNvdmVySW52YWxpZFRyYWNrZXJTdGF0ZSxcbiAgfSxcbik6IElSb3V0ZXIge1xuICBjb25zdCByb3V0ZXI6IElSb3V0ZXIgPSBSb3V0ZXIoKTtcbiAgY29uc3Qgb2JqZWN0U3RvcmFnZSA9IGRlcGVuZGVuY2llcy5vYmplY3RTdG9yYWdlID8/IG5ldyBPYmplY3RTdG9yYWdlU2VydmljZSgpO1xuICBjb25zdCBhdXRob3JpemVTdGFmZiA9IGRlcGVuZGVuY2llcy5hdXRob3JpemVTdGFmZiA/PyByZXF1aXJlU3RhZmY7XG4gIGNvbnN0IHsgZ2V0U3RhdGU6IGxvYWRTdGF0ZSwgc2F2ZVN0YXRlOiBwZXJzaXN0U3RhdGUgfSA9IGRlcGVuZGVuY2llcztcbiAgY29uc3QgcmVjb3ZlclJlamVjdGVkU3RhdGUgPVxuICAgIGRlcGVuZGVuY2llcy5yZWNvdmVySW52YWxpZFN0YXRlID8/IHJlY292ZXJJbnZhbGlkVHJhY2tlclN0YXRlO1xuICBsZXQgbXV0YXRpb25RdWV1ZTogUHJvbWlzZTx2b2lkPiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICBjb25zdCBWT0lDRV9OT1RFX0NMRUFOVVBfR1JBQ0VfTVMgPSAyNCAqIDYwICogNjAgKiAxXzAwMDtcblxuICBmdW5jdGlvbiBzZXJpYWxpemVNdXRhdGlvbjxUPihvcGVyYXRpb246ICgpID0+IFByb21pc2U8VD4pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCByZXN1bHQgPSBtdXRhdGlvblF1ZXVlLnRoZW4ob3BlcmF0aW9uLCBvcGVyYXRpb24pO1xuICAgIG11dGF0aW9uUXVldWUgPSByZXN1bHQudGhlbihcbiAgICAgICgpID0+IHVuZGVmaW5lZCxcbiAgICAgICgpID0+IHVuZGVmaW5lZCxcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZGluYXRlTXV0YXRpb248VD4oXG4gICAgb3BlcmF0aW9uOiBTdGF0ZU11dGF0aW9uT3BlcmF0aW9uPFQ+LFxuICApOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAoZGVwZW5kZW5jaWVzLm11dGF0ZVN0YXRlKSByZXR1cm4gZGVwZW5kZW5jaWVzLm11dGF0ZVN0YXRlKG9wZXJhdGlvbik7XG4gICAgcmV0dXJuIHNlcmlhbGl6ZU11dGF0aW9uKCgpID0+IG9wZXJhdGlvbihsb2FkU3RhdGUsIHBlcnNpc3RTdGF0ZSkpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gY2xlYW51cFVuYXR0YWNoZWRWb2ljZU5vdGVzKHJlcTogZXhwcmVzcy5SZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFvYmplY3RTdG9yYWdlLmxpc3RWb2ljZU5vdGVzT2xkZXJUaGFuKSByZXR1cm47XG4gICAgbGV0IGNhbmRpZGF0ZXM6IHN0cmluZ1tdO1xuICAgIHRyeSB7XG4gICAgICBjYW5kaWRhdGVzID0gYXdhaXQgb2JqZWN0U3RvcmFnZS5saXN0Vm9pY2VOb3Rlc09sZGVyVGhhbihcbiAgICAgICAgbmV3IERhdGUoRGF0ZS5ub3coKSAtIFZPSUNFX05PVEVfQ0xFQU5VUF9HUkFDRV9NUyksXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXEubG9nPy5lcnJvcih7IGVycjogZXJyb3IgfSwgXCJDb3VsZCBub3QgZmluZCB1bmZpbmlzaGVkIGNvYWNoIHZvaWNlIG5vdGVzXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgb2JqZWN0UGF0aCBvZiBjYW5kaWRhdGVzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBjb29yZGluYXRlTXV0YXRpb24oYXN5bmMgKGxvYWRMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgICAgIGlmIChpc09iamVjdFBhdGhSZWZlcmVuY2VkKGF3YWl0IGxvYWRMb2NrZWRTdGF0ZSgpLCBvYmplY3RQYXRoKSkgcmV0dXJuO1xuICAgICAgICAgIGF3YWl0IG9iamVjdFN0b3JhZ2UuZGVsZXRlT2JqZWN0KG9iamVjdFBhdGgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlcS5sb2c/LmVycm9yKFxuICAgICAgICAgIHsgZXJyOiBlcnJvciwgb2JqZWN0UGF0aCB9LFxuICAgICAgICAgIFwiQ291bGQgbm90IHJlbW92ZSB1bmZpbmlzaGVkIGNvYWNoIHZvaWNlIG5vdGVcIixcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByb3V0ZXIuZ2V0KFwiL3RyYWNrZXJcIiwgYXV0aG9yaXplU3RhZmYsIGFzeW5jIChfcmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICByZXMuanNvbihHZXRUcmFja2VyUmVzcG9uc2UucGFyc2UodHJhY2tlclJlc3BvbnNlKGF3YWl0IGxvYWRTdGF0ZSgpKSkpO1xuICB9KTtcblxuICByb3V0ZXIuZ2V0KFwiL3RyYWNrZXIvaGVhbHRoXCIsIGF1dGhvcml6ZVN0YWZmLCBhc3luYyAoX3JlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgcmVzLmpzb24oR2V0VHJhY2tlckhlYWx0aFJlc3BvbnNlLnBhcnNlKHRyYWNrZXJIZWFsdGhSZXNwb25zZShhd2FpdCBsb2FkU3RhdGUoKSkpKTtcbiAgfSk7XG5cbiAgcm91dGVyLnBvc3QoXCIvdHJhY2tlci9yZWNvdmVyXCIsIGF1dGhvcml6ZVN0YWZmLCBhc3luYyAocmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCByZWFzb24gPVxuICAgICAgdHlwZW9mIHJlcS5ib2R5Py5yZWFzb24gPT09IFwic3RyaW5nXCIgPyByZXEuYm9keS5yZWFzb24udHJpbSgpIDogXCJcIjtcbiAgICBpZiAocmVhc29uLmxlbmd0aCA8IDEwIHx8IHJlYXNvbi5sZW5ndGggPiA1MDApIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgZXJyb3I6IFwiRXhwbGFpbiB0aGUgcmVjb3ZlcnkgcmVhc29uIGluIDEwIHRvIDUwMCBjaGFyYWN0ZXJzXCIsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYWN0b3JJZCA9IHJlcy5sb2NhbHMuc3RhZmZVc2VySWQ7XG4gICAgaWYgKHR5cGVvZiBhY3RvcklkICE9PSBcInN0cmluZ1wiIHx8IGFjdG9ySWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXEubG9nPy5lcnJvcihcIkFwcHJvdmVkIHN0YWZmIGlkZW50aXR5IHdhcyB1bmF2YWlsYWJsZSBkdXJpbmcgcmVjb3ZlcnlcIik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBcIlJlY292ZXJ5IGNvdWxkIG5vdCBpZGVudGlmeSB0aGUgc3RhZmYgbWVtYmVyXCIgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdDogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiByZWNvdmVyUmVqZWN0ZWRTdGF0ZT4+O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCByZWNvdmVyUmVqZWN0ZWRTdGF0ZSh7IGFjdG9ySWQsIHJlYXNvbiB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmVxLmxvZz8uZXJyb3IoXG4gICAgICAgIHsgZXJyOiBlcnJvciwgYWN0b3JJZCB9LFxuICAgICAgICBcIkNvdWxkIG5vdCBiYWNrIHVwIGFuZCByZXNldCByZWplY3RlZCB0cmFja2VyIHNuYXBzaG90XCIsXG4gICAgICApO1xuICAgICAgcmVzLnN0YXR1cyg1MDMpLmpzb24oe1xuICAgICAgICBlcnJvcjogXCJUcmFja2VyIHJlY292ZXJ5IGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQgc2FmZWx5XCIsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5vdXRjb21lID09PSBcInZhbGlkXCIpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDA5KS5qc29uKHtcbiAgICAgICAgZXJyb3I6IFwiUmVjb3ZlcnkgcmVmdXNlZCBiZWNhdXNlIHRoZSBjdXJyZW50IHRyYWNrZXIgc25hcHNob3QgaXMgdmFsaWRcIixcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVzdWx0Lm91dGNvbWUgPT09IFwibWlzc2luZ1wiKSB7XG4gICAgICByZXMuc3RhdHVzKDQwOSkuanNvbih7XG4gICAgICAgIGVycm9yOiBcIlJlY292ZXJ5IHJlZnVzZWQgYmVjYXVzZSB0aGVyZSBpcyBubyByZWplY3RlZCB0cmFja2VyIHNuYXBzaG90XCIsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVxLmxvZz8uaW5mbyhcbiAgICAgIHsgYWN0b3JJZCwgYmFja3VwSWQ6IHJlc3VsdC5iYWNrdXBJZCwgcmVhc29uIH0sXG4gICAgICBcIlJlamVjdGVkIHRyYWNrZXIgc25hcHNob3QgYmFja2VkIHVwIGFuZCByZXNldFwiLFxuICAgICk7XG4gICAgcmVzLmpzb24ocmVzdWx0KTtcbiAgfSk7XG5cbiAgcm91dGVyLmdldChcIi9wbGF5ZXJzLzpzaGFyZVRva2VuL3RyYWNrZXJcIiwgYXN5bmMgKHJlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0gR2V0UGxheWVyVHJhY2tlclBhcmFtcy5zYWZlUGFyc2UocmVxLnBhcmFtcyk7XG4gICAgaWYgKCFwYXJhbXMuc3VjY2Vzcykge1xuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogcGFyYW1zLmVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgbG9hZFN0YXRlKCk7XG4gICAgY29uc3QgcGxheWVyID0gc3RhdGUucGxheWVycy5maW5kKChpdGVtKSA9PiBpdGVtLnNoYXJlVG9rZW4gPT09IHBhcmFtcy5kYXRhLnNoYXJlVG9rZW4pO1xuICAgIGlmICghcGxheWVyKSB7XG4gICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIlBsYXllciBsaW5rIG5vdCBmb3VuZFwiIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaGVzID0gc3RhdGUubWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiBtYXRjaC5wbGF5ZXJJZCA9PT0gcGxheWVyLmlkKTtcbiAgICBjb25zdCBjb2FjaElkcyA9IG5ldyBTZXQobWF0Y2hlcy5tYXAoKG1hdGNoKSA9PiBtYXRjaC5jb2FjaElkKSk7XG4gICAgcmVzLmpzb24oR2V0UGxheWVyVHJhY2tlclJlc3BvbnNlLnBhcnNlKHtcbiAgICAgIHBsYXllcjogeyBpZDogcGxheWVyLmlkLCBuYW1lOiBwbGF5ZXIubmFtZSB9LFxuICAgICAgbWF0Y2hlcyxcbiAgICAgIGNvYWNoZXM6IHN0YXRlLmNvYWNoZXMuZmlsdGVyKChjb2FjaCkgPT4gY29hY2hJZHMuaGFzKGNvYWNoLmlkKSksXG4gICAgICBicmFuZGluZzogc3RhdGUuYnJhbmRpbmcsXG4gICAgICBsYXN0VXBkYXRlZEF0OiBzdGF0ZS5sYXN0VXBkYXRlZEF0LFxuICAgIH0pKTtcbiAgfSk7XG5cbiAgcm91dGVyLnBvc3QoXCIvdHJhY2tlci9wbGF5ZXJzLzpwbGF5ZXJJZC9zaGFyZS10b2tlblwiLCBhdXRob3JpemVTdGFmZiwgYXN5bmMgKHJlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0gUm90YXRlUGxheWVyU2hhcmVUb2tlblBhcmFtcy5zYWZlUGFyc2UocmVxLnBhcmFtcyk7XG4gICAgaWYgKCFwYXJhbXMuc3VjY2Vzcykge1xuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogcGFyYW1zLmVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IGNvb3JkaW5hdGVNdXRhdGlvbihhc3luYyAobG9hZExvY2tlZFN0YXRlLCBzYXZlTG9ja2VkU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gY2xvbmVUcmFja2VyU3RhdGUoYXdhaXQgbG9hZExvY2tlZFN0YXRlKCkpO1xuICAgICAgY29uc3QgcGxheWVyID0gc3RhdGUucGxheWVycy5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSBwYXJhbXMuZGF0YS5wbGF5ZXJJZCk7XG4gICAgICBpZiAoIXBsYXllcikge1xuICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIlBsYXllciBub3QgZm91bmRcIiB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGxheWVyLnNoYXJlVG9rZW4gPSByYW5kb21CeXRlcygzMikudG9TdHJpbmcoXCJiYXNlNjR1cmxcIik7XG4gICAgICBhd2FpdCBzYXZlTG9ja2VkU3RhdGUoc3RhdGUpO1xuICAgICAgcmVzLmpzb24oUm90YXRlUGxheWVyU2hhcmVUb2tlblJlc3BvbnNlLnBhcnNlKHBsYXllcikpO1xuICAgIH0pO1xuICB9KTtcblxuICByb3V0ZXIucHV0KFwiL3RyYWNrZXIvc2V0dGluZ3NcIiwgYXV0aG9yaXplU3RhZmYsIGFzeW5jIChyZXEsIHJlcyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBTYXZlVHJhY2tlclNldHRpbmdzQm9keS5zYWZlUGFyc2UocmVxLmJvZHkpO1xuICAgIGlmICghYm9keS5zdWNjZXNzKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBib2R5LmVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlcGxhY2VkTG9nb1BhdGggPSBhd2FpdCBjb29yZGluYXRlTXV0YXRpb24oYXN5bmMgKGxvYWRMb2NrZWRTdGF0ZSwgc2F2ZUxvY2tlZFN0YXRlKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGNsb25lVHJhY2tlclN0YXRlKGF3YWl0IGxvYWRMb2NrZWRTdGF0ZSgpKTtcbiAgICAgIGNvbnN0IHByZXZpb3VzTG9nb1BhdGggPSBzdGF0ZS5icmFuZGluZz8ubG9nb1BhdGggPz8gbnVsbDtcbiAgICAgIGNvbnN0IGNvYWNoZXMgPSBbLi4uYm9keS5kYXRhLmNvYWNoZXNdO1xuICAgICAgaWYgKCFjb2FjaGVzLnNvbWUoKGNvYWNoKSA9PiBjb2FjaC5pZCA9PT0gXCJ1bmFzc2lnbmVkXCIpKSB7XG4gICAgICAgIGNvYWNoZXMucHVzaCh7IGlkOiBcInVuYXNzaWduZWRcIiwgbmFtZTogXCJVbmFzc2lnbmVkXCIgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb2FjaElkcyA9IG5ldyBTZXQoY29hY2hlcy5tYXAoKGNvYWNoKSA9PiBjb2FjaC5pZCkpO1xuICAgICAgc3RhdGUuY29hY2hlcyA9IGNvYWNoZXM7XG4gICAgICBzdGF0ZS5tYXRjaGVzID0gc3RhdGUubWF0Y2hlcy5tYXAoKG1hdGNoKSA9PiAoe1xuICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgY29hY2hJZDogY29hY2hJZHMuaGFzKG1hdGNoLmNvYWNoSWQpID8gbWF0Y2guY29hY2hJZCA6IFwidW5hc3NpZ25lZFwiLFxuICAgICAgfSkpO1xuICAgICAgc3RhdGUuYnJhbmRpbmcgPSBib2R5LmRhdGEuYnJhbmRpbmc7XG4gICAgICBzdGF0ZS5sYXN0VXBkYXRlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgYXdhaXQgc2F2ZUxvY2tlZFN0YXRlKHN0YXRlKTtcbiAgICAgIHJlcy5qc29uKFNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZS5wYXJzZSh0cmFja2VyUmVzcG9uc2Uoc3RhdGUpKSk7XG4gICAgICByZXR1cm4gcHJldmlvdXNMb2dvUGF0aCAmJiBwcmV2aW91c0xvZ29QYXRoICE9PSBzdGF0ZS5icmFuZGluZy5sb2dvUGF0aFxuICAgICAgICA/IHByZXZpb3VzTG9nb1BhdGhcbiAgICAgICAgOiBudWxsO1xuICAgIH0pO1xuICAgIGlmIChyZXBsYWNlZExvZ29QYXRoKSB7XG4gICAgICBhd2FpdCBjb29yZGluYXRlTXV0YXRpb24oYXN5bmMgKGxvYWRMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhd2FpdCBsb2FkTG9ja2VkU3RhdGUoKTtcbiAgICAgICAgaWYgKGlzT2JqZWN0UGF0aFJlZmVyZW5jZWQoY3VycmVudFN0YXRlLCByZXBsYWNlZExvZ29QYXRoKSkgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IG9iamVjdFN0b3JhZ2UuZGVsZXRlT2JqZWN0KHJlcGxhY2VkTG9nb1BhdGgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJlcS5sb2cuZXJyb3IoeyBlcnI6IGVycm9yLCBvYmplY3RQYXRoOiByZXBsYWNlZExvZ29QYXRoIH0sIFwiQ291bGQgbm90IGRlbGV0ZSByZXBsYWNlZCB0cmFja2VyIGxvZ29cIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgcm91dGVyLnBvc3QoXG4gICAgXCIvdHJhY2tlci9sb2dvXCIsXG4gICAgYXV0aG9yaXplU3RhZmYsXG4gICAgZXhwcmVzcy5yYXcoeyB0eXBlOiBbXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS9qcGVnXCIsIFwiaW1hZ2Uvd2VicFwiLCBcImltYWdlL2dpZlwiXSwgbGltaXQ6IFwiNW1iXCIgfSksXG4gICAgYXN5bmMgKHJlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihyZXEuYm9keSkgfHwgIWlzTG9nb0ltYWdlKHJlcS5ib2R5LCByZXEuZ2V0KFwiY29udGVudC10eXBlXCIpID8/IFwiXCIpKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiQ2hvb3NlIGEgdmFsaWQgUE5HLCBKUEcsIFdlYlAsIG9yIEdJRiBpbWFnZSB1cCB0byA1IE1CXCIgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG9iamVjdFBhdGggPSBgL29iamVjdHMvdXBsb2Fkcy9sb2dvcy8ke3JhbmRvbVVVSUQoKX1gO1xuICAgICAgICBhd2FpdCBvYmplY3RTdG9yYWdlLnNhdmVPYmplY3Qob2JqZWN0UGF0aCwgcmVxLmJvZHksIHJlcS5nZXQoXCJjb250ZW50LXR5cGVcIikhKTtcbiAgICAgICAgcmVzLmpzb24oVXBsb2FkVHJhY2tlckxvZ29SZXNwb25zZS5wYXJzZSh7IG9iamVjdFBhdGggfSkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVxLmxvZy5lcnJvcih7IGVycjogZXJyb3IgfSwgXCJDb3VsZCBub3Qgc3RvcmUgdHJhY2tlciBsb2dvXCIpO1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBcIkNvdWxkIG5vdCBzdG9yZSB0cmFja2VyIGxvZ29cIiB9KTtcbiAgICAgIH1cbiAgICB9LFxuICApO1xuXG4gIHJvdXRlci5kZWxldGUoXCIvdHJhY2tlci9sb2dvXCIsIGF1dGhvcml6ZVN0YWZmLCBhc3luYyAocmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBib2R5ID0gRGVsZXRlVW51c2VkVHJhY2tlckxvZ29Cb2R5LnNhZmVQYXJzZShyZXEuYm9keSk7XG4gICAgaWYgKCFib2R5LnN1Y2Nlc3MpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IGJvZHkuZXJyb3IubWVzc2FnZSB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKGFzeW5jIChsb2FkTG9ja2VkU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgbG9hZExvY2tlZFN0YXRlKCk7XG4gICAgICBpZiAoIWlzT2JqZWN0UGF0aFJlZmVyZW5jZWQoc3RhdGUsIGJvZHkuZGF0YS5vYmplY3RQYXRoKSkge1xuICAgICAgICBhd2FpdCBvYmplY3RTdG9yYWdlLmRlbGV0ZU9iamVjdChib2R5LmRhdGEub2JqZWN0UGF0aCk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwNCkuZW5kKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJvdXRlci5wYXRjaChcIi9tYXRjaGVzLzptYXRjaElkXCIsIGF1dGhvcml6ZVN0YWZmLCBhc3luYyAocmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBwYXJhbXMgPSBVcGRhdGVNYXRjaFBhcmFtcy5zYWZlUGFyc2UocmVxLnBhcmFtcyk7XG4gICAgY29uc3QgYm9keSA9IFVwZGF0ZU1hdGNoQm9keS5zYWZlUGFyc2UocmVxLmJvZHkpO1xuICAgIGlmICghcGFyYW1zLnN1Y2Nlc3MpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHBhcmFtcy5lcnJvci5tZXNzYWdlIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWJvZHkuc3VjY2Vzcykge1xuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogYm9keS5lcnJvci5tZXNzYWdlIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGNvb3JkaW5hdGVNdXRhdGlvbihhc3luYyAobG9hZExvY2tlZFN0YXRlLCBzYXZlTG9ja2VkU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gY2xvbmVUcmFja2VyU3RhdGUoYXdhaXQgbG9hZExvY2tlZFN0YXRlKCkpO1xuICAgICAgY29uc3QgbWF0Y2ggPSBzdGF0ZS5tYXRjaGVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHBhcmFtcy5kYXRhLm1hdGNoSWQpO1xuICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIk1hdGNoIG5vdCBmb3VuZFwiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24obWF0Y2gsIGJvZHkuZGF0YSk7XG4gICAgICBzdGF0ZS5sYXN0VXBkYXRlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgYXdhaXQgc2F2ZUxvY2tlZFN0YXRlKHN0YXRlKTtcbiAgICAgIHJlcy5qc29uKFVwZGF0ZU1hdGNoUmVzcG9uc2UucGFyc2UobWF0Y2gpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcm91dGVyLnB1dChcIi9tYXRjaGVzLzptYXRjaElkL3JlcG9ydFwiLCBhdXRob3JpemVTdGFmZiwgYXN5bmMgKHJlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0gU2F2ZUNvYWNoUmVwb3J0UGFyYW1zLnNhZmVQYXJzZShyZXEucGFyYW1zKTtcbiAgICBjb25zdCBib2R5ID0gU2F2ZUNvYWNoUmVwb3J0Qm9keS5zYWZlUGFyc2UocmVxLmJvZHkpO1xuICAgIGlmICghcGFyYW1zLnN1Y2Nlc3MpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHBhcmFtcy5lcnJvci5tZXNzYWdlIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWJvZHkuc3VjY2Vzcykge1xuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogYm9keS5lcnJvci5tZXNzYWdlIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNhdmVkID0gYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKGFzeW5jIChsb2FkTG9ja2VkU3RhdGUsIHNhdmVMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBjbG9uZVRyYWNrZXJTdGF0ZShhd2FpdCBsb2FkTG9ja2VkU3RhdGUoKSk7XG4gICAgICBjb25zdCBtYXRjaCA9IHN0YXRlLm1hdGNoZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gcGFyYW1zLmRhdGEubWF0Y2hJZCk7XG4gICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6IFwiTWF0Y2ggbm90IGZvdW5kXCIgfSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKG1hdGNoLnN0YXR1cyAhPT0gXCJjb21wbGV0ZWRcIikge1xuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIlJlcG9ydHMgY2FuIG9ubHkgYmUgYWRkZWQgdG8gY29tcGxldGVkIG1hdGNoZXNcIiB9KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzQXVkaW9QYXRoID0gbWF0Y2gucmVwb3J0Py5hdWRpb1BhdGggPz8gbnVsbDtcbiAgICAgIGNvbnN0IG5leHRBdWRpb1BhdGggPSBib2R5LmRhdGEuYXVkaW9QYXRoID8/IHByZXZpb3VzQXVkaW9QYXRoO1xuICAgICAgaWYgKG5leHRBdWRpb1BhdGggJiYgbmV4dEF1ZGlvUGF0aCAhPT0gcHJldmlvdXNBdWRpb1BhdGgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBvYmplY3RTdG9yYWdlLmdldE9iamVjdChuZXh0QXVkaW9QYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZXEubG9nLmVycm9yKFxuICAgICAgICAgICAgeyBlcnI6IGVycm9yLCBvYmplY3RQYXRoOiBuZXh0QXVkaW9QYXRoLCBtYXRjaElkOiBwYXJhbXMuZGF0YS5tYXRjaElkIH0sXG4gICAgICAgICAgICBcIkNvdWxkIG5vdCB2ZXJpZnkgcmVwbGFjZW1lbnQgY29hY2ggdm9pY2Ugbm90ZVwiLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJUaGUgcmVwbGFjZW1lbnQgdm9pY2Ugbm90ZSBpcyBubyBsb25nZXIgYXZhaWxhYmxlXCIgfSk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG1hdGNoLnJlcG9ydCA9IHtcbiAgICAgICAgbWF0Y2hJZDogbWF0Y2guaWQsXG4gICAgICAgIG9ic2VydmF0aW9uczogYm9keS5kYXRhLm9ic2VydmF0aW9ucyxcbiAgICAgICAgdHJhbnNjcmlwdDogYm9keS5kYXRhLnRyYW5zY3JpcHQgPz8gbnVsbCxcbiAgICAgICAgYXVkaW9QYXRoOiBib2R5LmRhdGEuYXVkaW9QYXRoID8/IG1hdGNoLnJlcG9ydD8uYXVkaW9QYXRoID8/IG51bGwsXG4gICAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIHN0YXRlLmxhc3RVcGRhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICBhd2FpdCBzYXZlTG9ja2VkU3RhdGUoc3RhdGUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVwb3J0OiBTYXZlQ29hY2hSZXBvcnRSZXNwb25zZS5wYXJzZShtYXRjaC5yZXBvcnQpLFxuICAgICAgICByZXBsYWNlZEF1ZGlvUGF0aDpcbiAgICAgICAgICBwcmV2aW91c0F1ZGlvUGF0aCAmJiBwcmV2aW91c0F1ZGlvUGF0aCAhPT0gbWF0Y2gucmVwb3J0LmF1ZGlvUGF0aFxuICAgICAgICAgICAgPyBwcmV2aW91c0F1ZGlvUGF0aFxuICAgICAgICAgICAgOiBudWxsLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBpZiAoIXNhdmVkKSByZXR1cm47XG5cbiAgICBpZiAoc2F2ZWQucmVwbGFjZWRBdWRpb1BhdGgpIHtcbiAgICAgIGF3YWl0IGNvb3JkaW5hdGVNdXRhdGlvbihhc3luYyAobG9hZExvY2tlZFN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGF3YWl0IGxvYWRMb2NrZWRTdGF0ZSgpO1xuICAgICAgICBjb25zdCBpc1N0aWxsUmVmZXJlbmNlZCA9IGN1cnJlbnRTdGF0ZS5tYXRjaGVzLnNvbWUoXG4gICAgICAgICAgKG1hdGNoKSA9PiBtYXRjaC5yZXBvcnQ/LmF1ZGlvUGF0aCA9PT0gc2F2ZWQucmVwbGFjZWRBdWRpb1BhdGgsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpc1N0aWxsUmVmZXJlbmNlZCkgcmV0dXJuO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgb2JqZWN0U3RvcmFnZS5kZWxldGVPYmplY3Qoc2F2ZWQucmVwbGFjZWRBdWRpb1BhdGghKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZXEubG9nLmVycm9yKFxuICAgICAgICAgICAgeyBlcnI6IGVycm9yLCBvYmplY3RQYXRoOiBzYXZlZC5yZXBsYWNlZEF1ZGlvUGF0aCwgbWF0Y2hJZDogcGFyYW1zLmRhdGEubWF0Y2hJZCB9LFxuICAgICAgICAgICAgXCJDb3VsZCBub3QgcmVtb3ZlIHJlcGxhY2VkIGNvYWNoIHZvaWNlIG5vdGVcIixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVzLmpzb24oc2F2ZWQucmVwb3J0KTtcbiAgfSk7XG5cbiAgcm91dGVyLnBvc3QoXG4gICAgXCIvbWF0Y2hlcy86bWF0Y2hJZC9yZXBvcnQvYXVkaW9cIixcbiAgICBhdXRob3JpemVTdGFmZixcbiAgICBleHByZXNzLnJhdyh7IHR5cGU6IFtcImF1ZGlvL3dlYm1cIiwgXCJhdWRpby9vZ2dcIiwgXCJhdWRpby9tcDRcIl0sIGxpbWl0OiBcIjI1bWJcIiB9KSxcbiAgICBhc3luYyAocmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IFVwbG9hZENvYWNoUmVwb3J0QXVkaW9QYXJhbXMuc2FmZVBhcnNlKHJlcS5wYXJhbXMpO1xuICAgICAgaWYgKCFwYXJhbXMuc3VjY2Vzcykge1xuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBwYXJhbXMuZXJyb3IubWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIocmVxLmJvZHkpIHx8IHJlcS5ib2R5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIlJlY29yZCBhIHZvaWNlIG5vdGUgYmVmb3JlIHVwbG9hZGluZ1wiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IGxvYWRTdGF0ZSgpO1xuICAgICAgY29uc3QgbWF0Y2ggPSBzdGF0ZS5tYXRjaGVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHBhcmFtcy5kYXRhLm1hdGNoSWQpO1xuICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIk1hdGNoIG5vdCBmb3VuZFwiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAobWF0Y2guc3RhdHVzICE9PSBcImNvbXBsZXRlZFwiKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiVm9pY2Ugbm90ZXMgY2FuIG9ubHkgYmUgYWRkZWQgdG8gY29tcGxldGVkIG1hdGNoZXNcIiB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0UGF0aCA9IGAvb2JqZWN0cy91cGxvYWRzLyR7cmFuZG9tVVVJRCgpfWA7XG4gICAgICAgIGF3YWl0IG9iamVjdFN0b3JhZ2Uuc2F2ZU9iamVjdChvYmplY3RQYXRoLCByZXEuYm9keSwgcmVxLmdldChcImNvbnRlbnQtdHlwZVwiKSEpO1xuICAgICAgICByZXMuanNvbihVcGxvYWRDb2FjaFJlcG9ydEF1ZGlvUmVzcG9uc2UucGFyc2UoeyBvYmplY3RQYXRoIH0pKTtcbiAgICAgICAgYXdhaXQgY2xlYW51cFVuYXR0YWNoZWRWb2ljZU5vdGVzKHJlcSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAocmVzLmhlYWRlcnNTZW50KSByZXR1cm47XG4gICAgICAgIHJlcS5sb2cuZXJyb3IoeyBlcnI6IGVycm9yIH0sIFwiQ291bGQgbm90IHN0b3JlIGNvYWNoIHZvaWNlIG5vdGVcIik7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IFwiQ291bGQgbm90IHN0b3JlIGNvYWNoIHZvaWNlIG5vdGVcIiB9KTtcbiAgICAgIH1cbiAgICB9LFxuICApO1xuXG4gIHJvdXRlci5wb3N0KFwiL3RyYWNrZXIvcmVmcmVzaFwiLCBhdXRob3JpemVTdGFmZiwgYXN5bmMgKHJlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgYWxlcnRUaHJlc2hvbGQgPSBnZXRBbGVydFRocmVzaG9sZCgpO1xuICAgIGNvbnN0IHJlc3BvbmRUb0ZhaWx1cmUgPSBhc3luYyAoZXJyb3I6IHVua25vd24pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIGNvbnN0IGZhaWx1cmUgPSBhd2FpdCBjb29yZGluYXRlTXV0YXRpb24oYXN5bmMgKGxvYWRMb2NrZWRTdGF0ZSwgc2F2ZUxvY2tlZFN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGZhaWxlZFN0YXRlID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgICAgICAgYXdhaXQgbG9hZExvY2tlZFN0YXRlKCksXG4gICAgICAgICAgYWxlcnRUaHJlc2hvbGQsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNob3VsZEFsZXJ0ID1cbiAgICAgICAgICBmYWlsZWRTdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMgPj0gYWxlcnRUaHJlc2hvbGQgJiZcbiAgICAgICAgICBmYWlsZWRTdGF0ZS5yZWZyZXNoSGVhbHRoLmFsZXJ0U2VudEF0ID09PSBudWxsICYmXG4gICAgICAgICAgIWlzQWN0aXZlTm90aWZpY2F0aW9uQ2xhaW0oXG4gICAgICAgICAgICBmYWlsZWRTdGF0ZS5yZWZyZXNoSGVhbHRoLmZhaWx1cmVBbGVydENsYWltZWRBdCxcbiAgICAgICAgICApO1xuICAgICAgICBjb25zdCBhbGVydENsYWltID0gc2hvdWxkQWxlcnQgPyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgOiBudWxsO1xuICAgICAgICBpZiAoYWxlcnRDbGFpbSkge1xuICAgICAgICAgIGZhaWxlZFN0YXRlLnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0ID0gYWxlcnRDbGFpbTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBzYXZlTG9ja2VkU3RhdGUoZmFpbGVkU3RhdGUpO1xuICAgICAgICByZXR1cm4geyBmYWlsZWRTdGF0ZSwgYWxlcnRDbGFpbSB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJlcS5sb2cud2FybihcbiAgICAgICAge1xuICAgICAgICAgIGVycjogZXJyb3IsXG4gICAgICAgICAgY29uc2VjdXRpdmVGYWlsdXJlczpcbiAgICAgICAgICAgIGZhaWx1cmUuZmFpbGVkU3RhdGUucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzLFxuICAgICAgICAgIGFsZXJ0VGhyZXNob2xkLFxuICAgICAgICB9LFxuICAgICAgICBcIkNsdWIgTG9ja2VyIHJlZnJlc2ggZmFpbGVkXCIsXG4gICAgICApO1xuXG4gICAgICBpZiAoZmFpbHVyZS5hbGVydENsYWltKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgYWxlcnRTdGFmZihmYWlsdXJlLmZhaWxlZFN0YXRlLCBlcnJvcik7XG4gICAgICAgICAgYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKGFzeW5jIChsb2FkTG9ja2VkU3RhdGUsIHNhdmVMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGNsb25lVHJhY2tlclN0YXRlKGF3YWl0IGxvYWRMb2NrZWRTdGF0ZSgpKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLmZhaWx1cmVBbGVydENsYWltZWRBdCA9PT0gZmFpbHVyZS5hbGVydENsYWltXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLmFsZXJ0U2VudEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgICBjdXJyZW50LnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0ID0gbnVsbDtcbiAgICAgICAgICAgICAgYXdhaXQgc2F2ZUxvY2tlZFN0YXRlKGN1cnJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlcS5sb2cuZXJyb3IoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnNlY3V0aXZlRmFpbHVyZXM6XG4gICAgICAgICAgICAgICAgZmFpbHVyZS5mYWlsZWRTdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJTdGFmZiBhbGVydGVkIGFib3V0IHJlcGVhdGVkIENsdWIgTG9ja2VyIHJlZnJlc2ggZmFpbHVyZXNcIixcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChhbGVydEVycm9yKSB7XG4gICAgICAgICAgYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKGFzeW5jIChsb2FkTG9ja2VkU3RhdGUsIHNhdmVMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGNsb25lVHJhY2tlclN0YXRlKGF3YWl0IGxvYWRMb2NrZWRTdGF0ZSgpKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLmZhaWx1cmVBbGVydENsYWltZWRBdCA9PT0gZmFpbHVyZS5hbGVydENsYWltXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLmZhaWx1cmVBbGVydENsYWltZWRBdCA9IG51bGw7XG4gICAgICAgICAgICAgIGF3YWl0IHNhdmVMb2NrZWRTdGF0ZShjdXJyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXEubG9nLmVycm9yKFxuICAgICAgICAgICAgeyBlcnI6IGFsZXJ0RXJyb3IgfSxcbiAgICAgICAgICAgIFwiQ291bGQgbm90IGFsZXJ0IHN0YWZmIGFib3V0IHJlZnJlc2ggZmFpbHVyZXNcIixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFwiVW5rbm93biBDbHViIExvY2tlciBlcnJvclwiO1xuICAgICAgcmVzLnN0YXR1cyg1MDIpLmpzb24oeyBlcnJvcjogYFJlZnJlc2ggZmFpbGVkOiAke21lc3NhZ2V9YCB9KTtcbiAgICB9O1xuXG4gICAgbGV0IGZlZWQ6IFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQ7XG4gICAgdHJ5IHtcbiAgICAgIGZlZWQgPSBhd2FpdCBmZXRjaENsdWJMb2NrZXJGZWVkKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IHJlc3BvbmRUb0ZhaWx1cmUoZXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBub3RpZmljYXRpb25TdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGU7XG4gICAgdHJ5IHtcbiAgICAgIG5vdGlmaWNhdGlvblN0YXRlID0gYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKFxuICAgICAgICBhc3luYyAobG9hZExvY2tlZFN0YXRlLCBzYXZlTG9ja2VkU3RhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgbG9hZExvY2tlZFN0YXRlKCk7XG4gICAgICAgICAgY29uc3QgbWVyZ2VkID0gbWVyZ2VDbHViTG9ja2VyRmVlZChjdXJyZW50LCBmZWVkKTtcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IGlzQWN0aXZlTm90aWZpY2F0aW9uQ2xhaW0oXG4gICAgICAgICAgICBjdXJyZW50LnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0LFxuICAgICAgICAgIClcbiAgICAgICAgICAgID8gbWVyZ2VkXG4gICAgICAgICAgICA6IGNsZWFyUmVmcmVzaEZhaWx1cmVzKG1lcmdlZCwgYWxlcnRUaHJlc2hvbGQpO1xuICAgICAgICAgIGF3YWl0IHNhdmVMb2NrZWRTdGF0ZShzdGF0ZSk7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYXdhaXQgcmVzcG9uZFRvRmFpbHVyZShlcnJvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGNsYWltZWQgPSBhd2FpdCBjb29yZGluYXRlTXV0YXRpb24oXG4gICAgICAgIGFzeW5jIChsb2FkTG9ja2VkU3RhdGUsIHNhdmVMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBsb2FkTG9ja2VkU3RhdGUoKTtcbiAgICAgICAgICBjb25zdCByZWNvdmVyeSA9IGN1cnJlbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllc1swXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhcmVjb3ZlcnkgfHxcbiAgICAgICAgICAgIGN1cnJlbnQucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzID4gMCB8fFxuICAgICAgICAgICAgaXNBY3RpdmVOb3RpZmljYXRpb25DbGFpbShcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0/LmNsYWltZWRBdCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBuZXh0ID0gY2xvbmVUcmFja2VyU3RhdGUoY3VycmVudCk7XG4gICAgICAgICAgY29uc3QgY2xhaW1lZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgIG5leHQucmVmcmVzaEhlYWx0aC5yZWNvdmVyeUNsYWltID0ge1xuICAgICAgICAgICAgb3V0YWdlU3RhcnRlZEF0OiByZWNvdmVyeS5vdXRhZ2VTdGFydGVkQXQsXG4gICAgICAgICAgICByZWNvdmVyZWRBdDogcmVjb3ZlcnkucmVjb3ZlcmVkQXQsXG4gICAgICAgICAgICBjbGFpbWVkQXQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBhd2FpdCBzYXZlTG9ja2VkU3RhdGUobmV4dCk7XG4gICAgICAgICAgcmV0dXJuIHsgcmVjb3Zlcnk6IHsgLi4ucmVjb3ZlcnkgfSwgY2xhaW1lZEF0IH07XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgaWYgKCFjbGFpbWVkKSBicmVhaztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYWxlcnRTdGFmZk9mUmVjb3ZlcnkoY2xhaW1lZC5yZWNvdmVyeSk7XG4gICAgICAgIGF3YWl0IGNvb3JkaW5hdGVNdXRhdGlvbihhc3luYyAobG9hZExvY2tlZFN0YXRlLCBzYXZlTG9ja2VkU3RhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoYXdhaXQgbG9hZExvY2tlZFN0YXRlKCkpO1xuICAgICAgICAgIGlmIChjdXJyZW50LnJlZnJlc2hIZWFsdGgucmVjb3ZlcnlDbGFpbT8uY2xhaW1lZEF0ICE9PSBjbGFpbWVkLmNsYWltZWRBdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBpbmRleCA9IGN1cnJlbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcy5maW5kSW5kZXgoXG4gICAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgICAgaXRlbS5vdXRhZ2VTdGFydGVkQXQgPT09IGNsYWltZWQucmVjb3Zlcnkub3V0YWdlU3RhcnRlZEF0ICYmXG4gICAgICAgICAgICAgIGl0ZW0ucmVjb3ZlcmVkQXQgPT09IGNsYWltZWQucmVjb3ZlcnkucmVjb3ZlcmVkQXQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoaW5kZXggPj0gMCkgY3VycmVudC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0gPSBudWxsO1xuICAgICAgICAgIGF3YWl0IHNhdmVMb2NrZWRTdGF0ZShjdXJyZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgICAgcmVxLmxvZy5pbmZvKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmYWlsZWRBdHRlbXB0czogY2xhaW1lZC5yZWNvdmVyeS5mYWlsZWRBdHRlbXB0cyxcbiAgICAgICAgICAgICAgb3V0YWdlRHVyYXRpb25NczogY2xhaW1lZC5yZWNvdmVyeS5vdXRhZ2VEdXJhdGlvbk1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiU3RhZmYgYWxlcnRlZCB0aGF0IENsdWIgTG9ja2VyIHJlZnJlc2ggcmVjb3ZlcmVkXCIsXG4gICAgICAgICAgKTtcbiAgICAgIH0gY2F0Y2ggKGFsZXJ0RXJyb3IpIHtcbiAgICAgICAgYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKGFzeW5jIChsb2FkTG9ja2VkU3RhdGUsIHNhdmVMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBjbG9uZVRyYWNrZXJTdGF0ZShhd2FpdCBsb2FkTG9ja2VkU3RhdGUoKSk7XG4gICAgICAgICAgaWYgKGN1cnJlbnQucmVmcmVzaEhlYWx0aC5yZWNvdmVyeUNsYWltPy5jbGFpbWVkQXQgPT09IGNsYWltZWQuY2xhaW1lZEF0KSB7XG4gICAgICAgICAgICBjdXJyZW50LnJlZnJlc2hIZWFsdGgucmVjb3ZlcnlDbGFpbSA9IG51bGw7XG4gICAgICAgICAgICBhd2FpdCBzYXZlTG9ja2VkU3RhdGUoY3VycmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgICByZXEubG9nLmVycm9yKFxuICAgICAgICAgICAgeyBlcnI6IGFsZXJ0RXJyb3IgfSxcbiAgICAgICAgICAgIFwiQ291bGQgbm90IGFsZXJ0IHN0YWZmIGFib3V0IHJlZnJlc2ggcmVjb3ZlcnlcIixcbiAgICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBub3RpZmljYXRpb25TdGF0ZSA9IGF3YWl0IGxvYWRTdGF0ZSgpO1xuICAgIHJlcy5qc29uKFxuICAgICAgUmVmcmVzaFRyYWNrZXJSZXNwb25zZS5wYXJzZSh0cmFja2VyUmVzcG9uc2Uobm90aWZpY2F0aW9uU3RhdGUpKSxcbiAgICApO1xuICB9KTtcblxuICByZXR1cm4gcm91dGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVUcmFja2VyUm91dGVyKCk7IiwgImV4cG9ydCAqIGZyb20gXCIuL2Vycm9ycy5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vaGVscGVycy9wYXJzZVV0aWwuanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2hlbHBlcnMvdHlwZUFsaWFzZXMuanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2hlbHBlcnMvdXRpbC5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vdHlwZXMuanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1pvZEVycm9yLmpzXCI7XG4iLCAiZXhwb3J0IHZhciB1dGlsO1xuKGZ1bmN0aW9uICh1dGlsKSB7XG4gICAgdXRpbC5hc3NlcnRFcXVhbCA9IChfKSA9PiB7IH07XG4gICAgZnVuY3Rpb24gYXNzZXJ0SXMoX2FyZykgeyB9XG4gICAgdXRpbC5hc3NlcnRJcyA9IGFzc2VydElzO1xuICAgIGZ1bmN0aW9uIGFzc2VydE5ldmVyKF94KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgIH1cbiAgICB1dGlsLmFzc2VydE5ldmVyID0gYXNzZXJ0TmV2ZXI7XG4gICAgdXRpbC5hcnJheVRvRW51bSA9IChpdGVtcykgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICBvYmpbaXRlbV0gPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgICB1dGlsLmdldFZhbGlkRW51bVZhbHVlcyA9IChvYmopID0+IHtcbiAgICAgICAgY29uc3QgdmFsaWRLZXlzID0gdXRpbC5vYmplY3RLZXlzKG9iaikuZmlsdGVyKChrKSA9PiB0eXBlb2Ygb2JqW29ialtrXV0gIT09IFwibnVtYmVyXCIpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGsgb2YgdmFsaWRLZXlzKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZFtrXSA9IG9ialtrXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXRpbC5vYmplY3RWYWx1ZXMoZmlsdGVyZWQpO1xuICAgIH07XG4gICAgdXRpbC5vYmplY3RWYWx1ZXMgPSAob2JqKSA9PiB7XG4gICAgICAgIHJldHVybiB1dGlsLm9iamVjdEtleXMob2JqKS5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmpbZV07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdXRpbC5vYmplY3RLZXlzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSBcImZ1bmN0aW9uXCIgLy8gZXNsaW50LWRpc2FibGUtbGluZSBiYW4vYmFuXG4gICAgICAgID8gKG9iaikgPT4gT2JqZWN0LmtleXMob2JqKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGJhbi9iYW5cbiAgICAgICAgOiAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgfTtcbiAgICB1dGlsLmZpbmQgPSAoYXJyLCBjaGVja2VyKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBhcnIpIHtcbiAgICAgICAgICAgIGlmIChjaGVja2VyKGl0ZW0pKVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICB1dGlsLmlzSW50ZWdlciA9IHR5cGVvZiBOdW1iZXIuaXNJbnRlZ2VyID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyAodmFsKSA9PiBOdW1iZXIuaXNJbnRlZ2VyKHZhbCkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBiYW4vYmFuXG4gICAgICAgIDogKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsKSAmJiBNYXRoLmZsb29yKHZhbCkgPT09IHZhbDtcbiAgICBmdW5jdGlvbiBqb2luVmFsdWVzKGFycmF5LCBzZXBhcmF0b3IgPSBcIiB8IFwiKSB7XG4gICAgICAgIHJldHVybiBhcnJheS5tYXAoKHZhbCkgPT4gKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIgPyBgJyR7dmFsfSdgIDogdmFsKSkuam9pbihzZXBhcmF0b3IpO1xuICAgIH1cbiAgICB1dGlsLmpvaW5WYWx1ZXMgPSBqb2luVmFsdWVzO1xuICAgIHV0aWwuanNvblN0cmluZ2lmeVJlcGxhY2VyID0gKF8sIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYmlnaW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufSkodXRpbCB8fCAodXRpbCA9IHt9KSk7XG5leHBvcnQgdmFyIG9iamVjdFV0aWw7XG4oZnVuY3Rpb24gKG9iamVjdFV0aWwpIHtcbiAgICBvYmplY3RVdGlsLm1lcmdlU2hhcGVzID0gKGZpcnN0LCBzZWNvbmQpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmZpcnN0LFxuICAgICAgICAgICAgLi4uc2Vjb25kLCAvLyBzZWNvbmQgb3ZlcndyaXRlcyBmaXJzdFxuICAgICAgICB9O1xuICAgIH07XG59KShvYmplY3RVdGlsIHx8IChvYmplY3RVdGlsID0ge30pKTtcbmV4cG9ydCBjb25zdCBab2RQYXJzZWRUeXBlID0gdXRpbC5hcnJheVRvRW51bShbXG4gICAgXCJzdHJpbmdcIixcbiAgICBcIm5hblwiLFxuICAgIFwibnVtYmVyXCIsXG4gICAgXCJpbnRlZ2VyXCIsXG4gICAgXCJmbG9hdFwiLFxuICAgIFwiYm9vbGVhblwiLFxuICAgIFwiZGF0ZVwiLFxuICAgIFwiYmlnaW50XCIsXG4gICAgXCJzeW1ib2xcIixcbiAgICBcImZ1bmN0aW9uXCIsXG4gICAgXCJ1bmRlZmluZWRcIixcbiAgICBcIm51bGxcIixcbiAgICBcImFycmF5XCIsXG4gICAgXCJvYmplY3RcIixcbiAgICBcInVua25vd25cIixcbiAgICBcInByb21pc2VcIixcbiAgICBcInZvaWRcIixcbiAgICBcIm5ldmVyXCIsXG4gICAgXCJtYXBcIixcbiAgICBcInNldFwiLFxuXSk7XG5leHBvcnQgY29uc3QgZ2V0UGFyc2VkVHlwZSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgdCA9IHR5cGVvZiBkYXRhO1xuICAgIHN3aXRjaCAodCkge1xuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICByZXR1cm4gWm9kUGFyc2VkVHlwZS51bmRlZmluZWQ7XG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLnN0cmluZztcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgcmV0dXJuIE51bWJlci5pc05hTihkYXRhKSA/IFpvZFBhcnNlZFR5cGUubmFuIDogWm9kUGFyc2VkVHlwZS5udW1iZXI7XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICByZXR1cm4gWm9kUGFyc2VkVHlwZS5ib29sZWFuO1xuICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLmZ1bmN0aW9uO1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgICAgICByZXR1cm4gWm9kUGFyc2VkVHlwZS5iaWdpbnQ7XG4gICAgICAgIGNhc2UgXCJzeW1ib2xcIjpcbiAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLnN5bWJvbDtcbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWm9kUGFyc2VkVHlwZS5hcnJheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvZFBhcnNlZFR5cGUubnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLnRoZW4gJiYgdHlwZW9mIGRhdGEudGhlbiA9PT0gXCJmdW5jdGlvblwiICYmIGRhdGEuY2F0Y2ggJiYgdHlwZW9mIGRhdGEuY2F0Y2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLnByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIE1hcCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkYXRhIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvZFBhcnNlZFR5cGUubWFwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBTZXQgIT09IFwidW5kZWZpbmVkXCIgJiYgZGF0YSBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgRGF0ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkYXRhIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLmRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWm9kUGFyc2VkVHlwZS5vYmplY3Q7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gWm9kUGFyc2VkVHlwZS51bmtub3duO1xuICAgIH1cbn07XG4iLCAiaW1wb3J0IHsgdXRpbCB9IGZyb20gXCIuL2hlbHBlcnMvdXRpbC5qc1wiO1xuZXhwb3J0IGNvbnN0IFpvZElzc3VlQ29kZSA9IHV0aWwuYXJyYXlUb0VudW0oW1xuICAgIFwiaW52YWxpZF90eXBlXCIsXG4gICAgXCJpbnZhbGlkX2xpdGVyYWxcIixcbiAgICBcImN1c3RvbVwiLFxuICAgIFwiaW52YWxpZF91bmlvblwiLFxuICAgIFwiaW52YWxpZF91bmlvbl9kaXNjcmltaW5hdG9yXCIsXG4gICAgXCJpbnZhbGlkX2VudW1fdmFsdWVcIixcbiAgICBcInVucmVjb2duaXplZF9rZXlzXCIsXG4gICAgXCJpbnZhbGlkX2FyZ3VtZW50c1wiLFxuICAgIFwiaW52YWxpZF9yZXR1cm5fdHlwZVwiLFxuICAgIFwiaW52YWxpZF9kYXRlXCIsXG4gICAgXCJpbnZhbGlkX3N0cmluZ1wiLFxuICAgIFwidG9vX3NtYWxsXCIsXG4gICAgXCJ0b29fYmlnXCIsXG4gICAgXCJpbnZhbGlkX2ludGVyc2VjdGlvbl90eXBlc1wiLFxuICAgIFwibm90X211bHRpcGxlX29mXCIsXG4gICAgXCJub3RfZmluaXRlXCIsXG5dKTtcbmV4cG9ydCBjb25zdCBxdW90ZWxlc3NKc29uID0gKG9iaikgPT4ge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDIpO1xuICAgIHJldHVybiBqc29uLnJlcGxhY2UoL1wiKFteXCJdKylcIjovZywgXCIkMTpcIik7XG59O1xuZXhwb3J0IGNsYXNzIFpvZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGdldCBlcnJvcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzc3VlcztcbiAgICB9XG4gICAgY29uc3RydWN0b3IoaXNzdWVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaXNzdWVzID0gW107XG4gICAgICAgIHRoaXMuYWRkSXNzdWUgPSAoc3ViKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzc3VlcyA9IFsuLi50aGlzLmlzc3Vlcywgc3ViXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRJc3N1ZXMgPSAoc3VicyA9IFtdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzc3VlcyA9IFsuLi50aGlzLmlzc3VlcywgLi4uc3Vic107XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdHVhbFByb3RvID0gbmV3LnRhcmdldC5wcm90b3R5cGU7XG4gICAgICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBiYW4vYmFuXG4gICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgYWN0dWFsUHJvdG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fX3Byb3RvX18gPSBhY3R1YWxQcm90bztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hbWUgPSBcIlpvZEVycm9yXCI7XG4gICAgICAgIHRoaXMuaXNzdWVzID0gaXNzdWVzO1xuICAgIH1cbiAgICBmb3JtYXQoX21hcHBlcikge1xuICAgICAgICBjb25zdCBtYXBwZXIgPSBfbWFwcGVyIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoaXNzdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNzdWUubWVzc2FnZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNvbnN0IGZpZWxkRXJyb3JzID0geyBfZXJyb3JzOiBbXSB9O1xuICAgICAgICBjb25zdCBwcm9jZXNzRXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXNzdWUgb2YgZXJyb3IuaXNzdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzc3VlLmNvZGUgPT09IFwiaW52YWxpZF91bmlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzc3VlLnVuaW9uRXJyb3JzLm1hcChwcm9jZXNzRXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc3N1ZS5jb2RlID09PSBcImludmFsaWRfcmV0dXJuX3R5cGVcIikge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzRXJyb3IoaXNzdWUucmV0dXJuVHlwZUVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUuY29kZSA9PT0gXCJpbnZhbGlkX2FyZ3VtZW50c1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NFcnJvcihpc3N1ZS5hcmd1bWVudHNFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzc3VlLnBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRXJyb3JzLl9lcnJvcnMucHVzaChtYXBwZXIoaXNzdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyID0gZmllbGRFcnJvcnM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBpc3N1ZS5wYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSBpc3N1ZS5wYXRoW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVybWluYWwgPSBpID09PSBpc3N1ZS5wYXRoLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRlcm1pbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycltlbF0gPSBjdXJyW2VsXSB8fCB7IF9lcnJvcnM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY3VycltlbF0gPSBjdXJyW2VsXSB8fCB7IF9lcnJvcnM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmICh0eXBlb2YgZWwgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IGVycm9yQXJyYXk6IGFueSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZXJyb3JBcnJheS5fZXJyb3JzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjdXJyW2VsXSA9IGN1cnJbZWxdIHx8IGVycm9yQXJyYXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycltlbF0gPSBjdXJyW2VsXSB8fCB7IF9lcnJvcnM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycltlbF0uX2Vycm9ycy5wdXNoKG1hcHBlcihpc3N1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyciA9IGN1cnJbZWxdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBwcm9jZXNzRXJyb3IodGhpcyk7XG4gICAgICAgIHJldHVybiBmaWVsZEVycm9ycztcbiAgICB9XG4gICAgc3RhdGljIGFzc2VydCh2YWx1ZSkge1xuICAgICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIFpvZEVycm9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgYSBab2RFcnJvcjogJHt2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZTtcbiAgICB9XG4gICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmlzc3VlcywgdXRpbC5qc29uU3RyaW5naWZ5UmVwbGFjZXIsIDIpO1xuICAgIH1cbiAgICBnZXQgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNzdWVzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gICAgZmxhdHRlbihtYXBwZXIgPSAoaXNzdWUpID0+IGlzc3VlLm1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgZmllbGRFcnJvcnMgPSB7fTtcbiAgICAgICAgY29uc3QgZm9ybUVycm9ycyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHN1YiBvZiB0aGlzLmlzc3Vlcykge1xuICAgICAgICAgICAgaWYgKHN1Yi5wYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEVsID0gc3ViLnBhdGhbMF07XG4gICAgICAgICAgICAgICAgZmllbGRFcnJvcnNbZmlyc3RFbF0gPSBmaWVsZEVycm9yc1tmaXJzdEVsXSB8fCBbXTtcbiAgICAgICAgICAgICAgICBmaWVsZEVycm9yc1tmaXJzdEVsXS5wdXNoKG1hcHBlcihzdWIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1FcnJvcnMucHVzaChtYXBwZXIoc3ViKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZm9ybUVycm9ycywgZmllbGRFcnJvcnMgfTtcbiAgICB9XG4gICAgZ2V0IGZvcm1FcnJvcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZsYXR0ZW4oKTtcbiAgICB9XG59XG5ab2RFcnJvci5jcmVhdGUgPSAoaXNzdWVzKSA9PiB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgWm9kRXJyb3IoaXNzdWVzKTtcbiAgICByZXR1cm4gZXJyb3I7XG59O1xuIiwgImltcG9ydCB7IFpvZElzc3VlQ29kZSB9IGZyb20gXCIuLi9ab2RFcnJvci5qc1wiO1xuaW1wb3J0IHsgdXRpbCwgWm9kUGFyc2VkVHlwZSB9IGZyb20gXCIuLi9oZWxwZXJzL3V0aWwuanNcIjtcbmNvbnN0IGVycm9yTWFwID0gKGlzc3VlLCBfY3R4KSA9PiB7XG4gICAgbGV0IG1lc3NhZ2U7XG4gICAgc3dpdGNoIChpc3N1ZS5jb2RlKSB7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZTpcbiAgICAgICAgICAgIGlmIChpc3N1ZS5yZWNlaXZlZCA9PT0gWm9kUGFyc2VkVHlwZS51bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJSZXF1aXJlZFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBFeHBlY3RlZCAke2lzc3VlLmV4cGVjdGVkfSwgcmVjZWl2ZWQgJHtpc3N1ZS5yZWNlaXZlZH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfbGl0ZXJhbDpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgSW52YWxpZCBsaXRlcmFsIHZhbHVlLCBleHBlY3RlZCAke0pTT04uc3RyaW5naWZ5KGlzc3VlLmV4cGVjdGVkLCB1dGlsLmpzb25TdHJpbmdpZnlSZXBsYWNlcil9YDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFpvZElzc3VlQ29kZS51bnJlY29nbml6ZWRfa2V5czpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgVW5yZWNvZ25pemVkIGtleShzKSBpbiBvYmplY3Q6ICR7dXRpbC5qb2luVmFsdWVzKGlzc3VlLmtleXMsIFwiLCBcIil9YDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFpvZElzc3VlQ29kZS5pbnZhbGlkX3VuaW9uOlxuICAgICAgICAgICAgbWVzc2FnZSA9IGBJbnZhbGlkIGlucHV0YDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFpvZElzc3VlQ29kZS5pbnZhbGlkX3VuaW9uX2Rpc2NyaW1pbmF0b3I6XG4gICAgICAgICAgICBtZXNzYWdlID0gYEludmFsaWQgZGlzY3JpbWluYXRvciB2YWx1ZS4gRXhwZWN0ZWQgJHt1dGlsLmpvaW5WYWx1ZXMoaXNzdWUub3B0aW9ucyl9YDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFpvZElzc3VlQ29kZS5pbnZhbGlkX2VudW1fdmFsdWU6XG4gICAgICAgICAgICBtZXNzYWdlID0gYEludmFsaWQgZW51bSB2YWx1ZS4gRXhwZWN0ZWQgJHt1dGlsLmpvaW5WYWx1ZXMoaXNzdWUub3B0aW9ucyl9LCByZWNlaXZlZCAnJHtpc3N1ZS5yZWNlaXZlZH0nYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFpvZElzc3VlQ29kZS5pbnZhbGlkX2FyZ3VtZW50czpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgSW52YWxpZCBmdW5jdGlvbiBhcmd1bWVudHNgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfcmV0dXJuX3R5cGU6XG4gICAgICAgICAgICBtZXNzYWdlID0gYEludmFsaWQgZnVuY3Rpb24gcmV0dXJuIHR5cGVgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfZGF0ZTpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgSW52YWxpZCBkYXRlYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZzpcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXNzdWUudmFsaWRhdGlvbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIGlmIChcImluY2x1ZGVzXCIgaW4gaXNzdWUudmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gYEludmFsaWQgaW5wdXQ6IG11c3QgaW5jbHVkZSBcIiR7aXNzdWUudmFsaWRhdGlvbi5pbmNsdWRlc31cImA7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXNzdWUudmFsaWRhdGlvbi5wb3NpdGlvbiA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGAke21lc3NhZ2V9IGF0IG9uZSBvciBtb3JlIHBvc2l0aW9ucyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJHtpc3N1ZS52YWxpZGF0aW9uLnBvc2l0aW9ufWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoXCJzdGFydHNXaXRoXCIgaW4gaXNzdWUudmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gYEludmFsaWQgaW5wdXQ6IG11c3Qgc3RhcnQgd2l0aCBcIiR7aXNzdWUudmFsaWRhdGlvbi5zdGFydHNXaXRofVwiYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoXCJlbmRzV2l0aFwiIGluIGlzc3VlLnZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBJbnZhbGlkIGlucHV0OiBtdXN0IGVuZCB3aXRoIFwiJHtpc3N1ZS52YWxpZGF0aW9uLmVuZHNXaXRofVwiYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwuYXNzZXJ0TmV2ZXIoaXNzdWUudmFsaWRhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUudmFsaWRhdGlvbiAhPT0gXCJyZWdleFwiKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBJbnZhbGlkICR7aXNzdWUudmFsaWRhdGlvbn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiSW52YWxpZFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLnRvb19zbWFsbDpcbiAgICAgICAgICAgIGlmIChpc3N1ZS50eXBlID09PSBcImFycmF5XCIpXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBBcnJheSBtdXN0IGNvbnRhaW4gJHtpc3N1ZS5leGFjdCA/IFwiZXhhY3RseVwiIDogaXNzdWUuaW5jbHVzaXZlID8gYGF0IGxlYXN0YCA6IGBtb3JlIHRoYW5gfSAke2lzc3VlLm1pbmltdW19IGVsZW1lbnQocylgO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUudHlwZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYFN0cmluZyBtdXN0IGNvbnRhaW4gJHtpc3N1ZS5leGFjdCA/IFwiZXhhY3RseVwiIDogaXNzdWUuaW5jbHVzaXZlID8gYGF0IGxlYXN0YCA6IGBvdmVyYH0gJHtpc3N1ZS5taW5pbXVtfSBjaGFyYWN0ZXIocylgO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUudHlwZSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYE51bWJlciBtdXN0IGJlICR7aXNzdWUuZXhhY3QgPyBgZXhhY3RseSBlcXVhbCB0byBgIDogaXNzdWUuaW5jbHVzaXZlID8gYGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBgIDogYGdyZWF0ZXIgdGhhbiBgfSR7aXNzdWUubWluaW11bX1gO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUudHlwZSA9PT0gXCJiaWdpbnRcIilcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYE51bWJlciBtdXN0IGJlICR7aXNzdWUuZXhhY3QgPyBgZXhhY3RseSBlcXVhbCB0byBgIDogaXNzdWUuaW5jbHVzaXZlID8gYGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBgIDogYGdyZWF0ZXIgdGhhbiBgfSR7aXNzdWUubWluaW11bX1gO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUudHlwZSA9PT0gXCJkYXRlXCIpXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBEYXRlIG11c3QgYmUgJHtpc3N1ZS5leGFjdCA/IGBleGFjdGx5IGVxdWFsIHRvIGAgOiBpc3N1ZS5pbmNsdXNpdmUgPyBgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGAgOiBgZ3JlYXRlciB0aGFuIGB9JHtuZXcgRGF0ZShOdW1iZXIoaXNzdWUubWluaW11bSkpfWA7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiSW52YWxpZCBpbnB1dFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLnRvb19iaWc6XG4gICAgICAgICAgICBpZiAoaXNzdWUudHlwZSA9PT0gXCJhcnJheVwiKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgQXJyYXkgbXVzdCBjb250YWluICR7aXNzdWUuZXhhY3QgPyBgZXhhY3RseWAgOiBpc3N1ZS5pbmNsdXNpdmUgPyBgYXQgbW9zdGAgOiBgbGVzcyB0aGFuYH0gJHtpc3N1ZS5tYXhpbXVtfSBlbGVtZW50KHMpYDtcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzc3VlLnR5cGUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBTdHJpbmcgbXVzdCBjb250YWluICR7aXNzdWUuZXhhY3QgPyBgZXhhY3RseWAgOiBpc3N1ZS5pbmNsdXNpdmUgPyBgYXQgbW9zdGAgOiBgdW5kZXJgfSAke2lzc3VlLm1heGltdW19IGNoYXJhY3RlcihzKWA7XG4gICAgICAgICAgICBlbHNlIGlmIChpc3N1ZS50eXBlID09PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgTnVtYmVyIG11c3QgYmUgJHtpc3N1ZS5leGFjdCA/IGBleGFjdGx5YCA6IGlzc3VlLmluY2x1c2l2ZSA/IGBsZXNzIHRoYW4gb3IgZXF1YWwgdG9gIDogYGxlc3MgdGhhbmB9ICR7aXNzdWUubWF4aW11bX1gO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUudHlwZSA9PT0gXCJiaWdpbnRcIilcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYEJpZ0ludCBtdXN0IGJlICR7aXNzdWUuZXhhY3QgPyBgZXhhY3RseWAgOiBpc3N1ZS5pbmNsdXNpdmUgPyBgbGVzcyB0aGFuIG9yIGVxdWFsIHRvYCA6IGBsZXNzIHRoYW5gfSAke2lzc3VlLm1heGltdW19YDtcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzc3VlLnR5cGUgPT09IFwiZGF0ZVwiKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgRGF0ZSBtdXN0IGJlICR7aXNzdWUuZXhhY3QgPyBgZXhhY3RseWAgOiBpc3N1ZS5pbmNsdXNpdmUgPyBgc21hbGxlciB0aGFuIG9yIGVxdWFsIHRvYCA6IGBzbWFsbGVyIHRoYW5gfSAke25ldyBEYXRlKE51bWJlcihpc3N1ZS5tYXhpbXVtKSl9YDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJJbnZhbGlkIGlucHV0XCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBab2RJc3N1ZUNvZGUuY3VzdG9tOlxuICAgICAgICAgICAgbWVzc2FnZSA9IGBJbnZhbGlkIGlucHV0YDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFpvZElzc3VlQ29kZS5pbnZhbGlkX2ludGVyc2VjdGlvbl90eXBlczpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgSW50ZXJzZWN0aW9uIHJlc3VsdHMgY291bGQgbm90IGJlIG1lcmdlZGA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBab2RJc3N1ZUNvZGUubm90X211bHRpcGxlX29mOlxuICAgICAgICAgICAgbWVzc2FnZSA9IGBOdW1iZXIgbXVzdCBiZSBhIG11bHRpcGxlIG9mICR7aXNzdWUubXVsdGlwbGVPZn1gO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLm5vdF9maW5pdGU6XG4gICAgICAgICAgICBtZXNzYWdlID0gXCJOdW1iZXIgbXVzdCBiZSBmaW5pdGVcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbWVzc2FnZSA9IF9jdHguZGVmYXVsdEVycm9yO1xuICAgICAgICAgICAgdXRpbC5hc3NlcnROZXZlcihpc3N1ZSk7XG4gICAgfVxuICAgIHJldHVybiB7IG1lc3NhZ2UgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBlcnJvck1hcDtcbiIsICJpbXBvcnQgZGVmYXVsdEVycm9yTWFwIGZyb20gXCIuL2xvY2FsZXMvZW4uanNcIjtcbmxldCBvdmVycmlkZUVycm9yTWFwID0gZGVmYXVsdEVycm9yTWFwO1xuZXhwb3J0IHsgZGVmYXVsdEVycm9yTWFwIH07XG5leHBvcnQgZnVuY3Rpb24gc2V0RXJyb3JNYXAobWFwKSB7XG4gICAgb3ZlcnJpZGVFcnJvck1hcCA9IG1hcDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRFcnJvck1hcCgpIHtcbiAgICByZXR1cm4gb3ZlcnJpZGVFcnJvck1hcDtcbn1cbiIsICJpbXBvcnQgeyBnZXRFcnJvck1hcCB9IGZyb20gXCIuLi9lcnJvcnMuanNcIjtcbmltcG9ydCBkZWZhdWx0RXJyb3JNYXAgZnJvbSBcIi4uL2xvY2FsZXMvZW4uanNcIjtcbmV4cG9ydCBjb25zdCBtYWtlSXNzdWUgPSAocGFyYW1zKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBwYXRoLCBlcnJvck1hcHMsIGlzc3VlRGF0YSB9ID0gcGFyYW1zO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gWy4uLnBhdGgsIC4uLihpc3N1ZURhdGEucGF0aCB8fCBbXSldO1xuICAgIGNvbnN0IGZ1bGxJc3N1ZSA9IHtcbiAgICAgICAgLi4uaXNzdWVEYXRhLFxuICAgICAgICBwYXRoOiBmdWxsUGF0aCxcbiAgICB9O1xuICAgIGlmIChpc3N1ZURhdGEubWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5pc3N1ZURhdGEsXG4gICAgICAgICAgICBwYXRoOiBmdWxsUGF0aCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGlzc3VlRGF0YS5tZXNzYWdlLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gXCJcIjtcbiAgICBjb25zdCBtYXBzID0gZXJyb3JNYXBzXG4gICAgICAgIC5maWx0ZXIoKG0pID0+ICEhbSlcbiAgICAgICAgLnNsaWNlKClcbiAgICAgICAgLnJldmVyc2UoKTtcbiAgICBmb3IgKGNvbnN0IG1hcCBvZiBtYXBzKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IG1hcChmdWxsSXNzdWUsIHsgZGF0YSwgZGVmYXVsdEVycm9yOiBlcnJvck1lc3NhZ2UgfSkubWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uaXNzdWVEYXRhLFxuICAgICAgICBwYXRoOiBmdWxsUGF0aCxcbiAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlLFxuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IEVNUFRZX1BBVEggPSBbXTtcbmV4cG9ydCBmdW5jdGlvbiBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIGlzc3VlRGF0YSkge1xuICAgIGNvbnN0IG92ZXJyaWRlTWFwID0gZ2V0RXJyb3JNYXAoKTtcbiAgICBjb25zdCBpc3N1ZSA9IG1ha2VJc3N1ZSh7XG4gICAgICAgIGlzc3VlRGF0YTogaXNzdWVEYXRhLFxuICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgIGVycm9yTWFwczogW1xuICAgICAgICAgICAgY3R4LmNvbW1vbi5jb250ZXh0dWFsRXJyb3JNYXAsIC8vIGNvbnRleHR1YWwgZXJyb3IgbWFwIGlzIGZpcnN0IHByaW9yaXR5XG4gICAgICAgICAgICBjdHguc2NoZW1hRXJyb3JNYXAsIC8vIHRoZW4gc2NoZW1hLWJvdW5kIG1hcCBpZiBhdmFpbGFibGVcbiAgICAgICAgICAgIG92ZXJyaWRlTWFwLCAvLyB0aGVuIGdsb2JhbCBvdmVycmlkZSBtYXBcbiAgICAgICAgICAgIG92ZXJyaWRlTWFwID09PSBkZWZhdWx0RXJyb3JNYXAgPyB1bmRlZmluZWQgOiBkZWZhdWx0RXJyb3JNYXAsIC8vIHRoZW4gZ2xvYmFsIGRlZmF1bHQgbWFwXG4gICAgICAgIF0uZmlsdGVyKCh4KSA9PiAhIXgpLFxuICAgIH0pO1xuICAgIGN0eC5jb21tb24uaXNzdWVzLnB1c2goaXNzdWUpO1xufVxuZXhwb3J0IGNsYXNzIFBhcnNlU3RhdHVzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IFwidmFsaWRcIjtcbiAgICB9XG4gICAgZGlydHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSBcInZhbGlkXCIpXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gXCJkaXJ0eVwiO1xuICAgIH1cbiAgICBhYm9ydCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgIT09IFwiYWJvcnRlZFwiKVxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFwiYWJvcnRlZFwiO1xuICAgIH1cbiAgICBzdGF0aWMgbWVyZ2VBcnJheShzdGF0dXMsIHJlc3VsdHMpIHtcbiAgICAgICAgY29uc3QgYXJyYXlWYWx1ZSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKHMuc3RhdHVzID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgIGlmIChzLnN0YXR1cyA9PT0gXCJkaXJ0eVwiKVxuICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgYXJyYXlWYWx1ZS5wdXNoKHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogYXJyYXlWYWx1ZSB9O1xuICAgIH1cbiAgICBzdGF0aWMgYXN5bmMgbWVyZ2VPYmplY3RBc3luYyhzdGF0dXMsIHBhaXJzKSB7XG4gICAgICAgIGNvbnN0IHN5bmNQYWlycyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhaXIgb2YgcGFpcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGF3YWl0IHBhaXIua2V5O1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhd2FpdCBwYWlyLnZhbHVlO1xuICAgICAgICAgICAgc3luY1BhaXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQYXJzZVN0YXR1cy5tZXJnZU9iamVjdFN5bmMoc3RhdHVzLCBzeW5jUGFpcnMpO1xuICAgIH1cbiAgICBzdGF0aWMgbWVyZ2VPYmplY3RTeW5jKHN0YXR1cywgcGFpcnMpIHtcbiAgICAgICAgY29uc3QgZmluYWxPYmplY3QgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBwYWlyIG9mIHBhaXJzKSB7XG4gICAgICAgICAgICBjb25zdCB7IGtleSwgdmFsdWUgfSA9IHBhaXI7XG4gICAgICAgICAgICBpZiAoa2V5LnN0YXR1cyA9PT0gXCJhYm9ydGVkXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgICAgICBpZiAodmFsdWUuc3RhdHVzID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgIGlmIChrZXkuc3RhdHVzID09PSBcImRpcnR5XCIpXG4gICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICBpZiAodmFsdWUuc3RhdHVzID09PSBcImRpcnR5XCIpXG4gICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICBpZiAoa2V5LnZhbHVlICE9PSBcIl9fcHJvdG9fX1wiICYmICh0eXBlb2YgdmFsdWUudmFsdWUgIT09IFwidW5kZWZpbmVkXCIgfHwgcGFpci5hbHdheXNTZXQpKSB7XG4gICAgICAgICAgICAgICAgZmluYWxPYmplY3Rba2V5LnZhbHVlXSA9IHZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogZmluYWxPYmplY3QgfTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgSU5WQUxJRCA9IE9iamVjdC5mcmVlemUoe1xuICAgIHN0YXR1czogXCJhYm9ydGVkXCIsXG59KTtcbmV4cG9ydCBjb25zdCBESVJUWSA9ICh2YWx1ZSkgPT4gKHsgc3RhdHVzOiBcImRpcnR5XCIsIHZhbHVlIH0pO1xuZXhwb3J0IGNvbnN0IE9LID0gKHZhbHVlKSA9PiAoeyBzdGF0dXM6IFwidmFsaWRcIiwgdmFsdWUgfSk7XG5leHBvcnQgY29uc3QgaXNBYm9ydGVkID0gKHgpID0+IHguc3RhdHVzID09PSBcImFib3J0ZWRcIjtcbmV4cG9ydCBjb25zdCBpc0RpcnR5ID0gKHgpID0+IHguc3RhdHVzID09PSBcImRpcnR5XCI7XG5leHBvcnQgY29uc3QgaXNWYWxpZCA9ICh4KSA9PiB4LnN0YXR1cyA9PT0gXCJ2YWxpZFwiO1xuZXhwb3J0IGNvbnN0IGlzQXN5bmMgPSAoeCkgPT4gdHlwZW9mIFByb21pc2UgIT09IFwidW5kZWZpbmVkXCIgJiYgeCBpbnN0YW5jZW9mIFByb21pc2U7XG4iLCAiZXhwb3J0IHZhciBlcnJvclV0aWw7XG4oZnVuY3Rpb24gKGVycm9yVXRpbCkge1xuICAgIGVycm9yVXRpbC5lcnJUb09iaiA9IChtZXNzYWdlKSA9PiB0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIiA/IHsgbWVzc2FnZSB9IDogbWVzc2FnZSB8fCB7fTtcbiAgICAvLyBiaW9tZS1pZ25vcmUgbGludDpcbiAgICBlcnJvclV0aWwudG9TdHJpbmcgPSAobWVzc2FnZSkgPT4gdHlwZW9mIG1lc3NhZ2UgPT09IFwic3RyaW5nXCIgPyBtZXNzYWdlIDogbWVzc2FnZT8ubWVzc2FnZTtcbn0pKGVycm9yVXRpbCB8fCAoZXJyb3JVdGlsID0ge30pKTtcbiIsICJpbXBvcnQgeyBab2RFcnJvciwgWm9kSXNzdWVDb2RlLCB9IGZyb20gXCIuL1pvZEVycm9yLmpzXCI7XG5pbXBvcnQgeyBkZWZhdWx0RXJyb3JNYXAsIGdldEVycm9yTWFwIH0gZnJvbSBcIi4vZXJyb3JzLmpzXCI7XG5pbXBvcnQgeyBlcnJvclV0aWwgfSBmcm9tIFwiLi9oZWxwZXJzL2Vycm9yVXRpbC5qc1wiO1xuaW1wb3J0IHsgRElSVFksIElOVkFMSUQsIE9LLCBQYXJzZVN0YXR1cywgYWRkSXNzdWVUb0NvbnRleHQsIGlzQWJvcnRlZCwgaXNBc3luYywgaXNEaXJ0eSwgaXNWYWxpZCwgbWFrZUlzc3VlLCB9IGZyb20gXCIuL2hlbHBlcnMvcGFyc2VVdGlsLmpzXCI7XG5pbXBvcnQgeyB1dGlsLCBab2RQYXJzZWRUeXBlLCBnZXRQYXJzZWRUeXBlIH0gZnJvbSBcIi4vaGVscGVycy91dGlsLmpzXCI7XG5jbGFzcyBQYXJzZUlucHV0TGF6eVBhdGgge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgdmFsdWUsIHBhdGgsIGtleSkge1xuICAgICAgICB0aGlzLl9jYWNoZWRQYXRoID0gW107XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLmRhdGEgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fcGF0aCA9IHBhdGg7XG4gICAgICAgIHRoaXMuX2tleSA9IGtleTtcbiAgICB9XG4gICAgZ2V0IHBhdGgoKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FjaGVkUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX2tleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZWRQYXRoLnB1c2goLi4udGhpcy5fcGF0aCwgLi4udGhpcy5fa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlZFBhdGgucHVzaCguLi50aGlzLl9wYXRoLCB0aGlzLl9rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZWRQYXRoO1xuICAgIH1cbn1cbmNvbnN0IGhhbmRsZVJlc3VsdCA9IChjdHgsIHJlc3VsdCkgPT4ge1xuICAgIGlmIChpc1ZhbGlkKHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0LnZhbHVlIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoIWN0eC5jb21tb24uaXNzdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmFsaWRhdGlvbiBmYWlsZWQgYnV0IG5vIGlzc3VlcyBkZXRlY3RlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZ2V0IGVycm9yKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9lcnJvcilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9yO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFpvZEVycm9yKGN0eC5jb21tb24uaXNzdWVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lcnJvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxufTtcbmZ1bmN0aW9uIHByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSB7XG4gICAgaWYgKCFwYXJhbXMpXG4gICAgICAgIHJldHVybiB7fTtcbiAgICBjb25zdCB7IGVycm9yTWFwLCBpbnZhbGlkX3R5cGVfZXJyb3IsIHJlcXVpcmVkX2Vycm9yLCBkZXNjcmlwdGlvbiB9ID0gcGFyYW1zO1xuICAgIGlmIChlcnJvck1hcCAmJiAoaW52YWxpZF90eXBlX2Vycm9yIHx8IHJlcXVpcmVkX2Vycm9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IHVzZSBcImludmFsaWRfdHlwZV9lcnJvclwiIG9yIFwicmVxdWlyZWRfZXJyb3JcIiBpbiBjb25qdW5jdGlvbiB3aXRoIGN1c3RvbSBlcnJvciBtYXAuYCk7XG4gICAgfVxuICAgIGlmIChlcnJvck1hcClcbiAgICAgICAgcmV0dXJuIHsgZXJyb3JNYXA6IGVycm9yTWFwLCBkZXNjcmlwdGlvbiB9O1xuICAgIGNvbnN0IGN1c3RvbU1hcCA9IChpc3MsIGN0eCkgPT4ge1xuICAgICAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IHBhcmFtcztcbiAgICAgICAgaWYgKGlzcy5jb2RlID09PSBcImludmFsaWRfZW51bV92YWx1ZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBtZXNzYWdlID8/IGN0eC5kZWZhdWx0RXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGN0eC5kYXRhID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBtZXNzYWdlID8/IHJlcXVpcmVkX2Vycm9yID8/IGN0eC5kZWZhdWx0RXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNzLmNvZGUgIT09IFwiaW52YWxpZF90eXBlXCIpXG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBjdHguZGVmYXVsdEVycm9yIH07XG4gICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IG1lc3NhZ2UgPz8gaW52YWxpZF90eXBlX2Vycm9yID8/IGN0eC5kZWZhdWx0RXJyb3IgfTtcbiAgICB9O1xuICAgIHJldHVybiB7IGVycm9yTWFwOiBjdXN0b21NYXAsIGRlc2NyaXB0aW9uIH07XG59XG5leHBvcnQgY2xhc3MgWm9kVHlwZSB7XG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLmRlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBfZ2V0VHlwZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gZ2V0UGFyc2VkVHlwZShpbnB1dC5kYXRhKTtcbiAgICB9XG4gICAgX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpIHtcbiAgICAgICAgcmV0dXJuIChjdHggfHwge1xuICAgICAgICAgICAgY29tbW9uOiBpbnB1dC5wYXJlbnQuY29tbW9uLFxuICAgICAgICAgICAgZGF0YTogaW5wdXQuZGF0YSxcbiAgICAgICAgICAgIHBhcnNlZFR5cGU6IGdldFBhcnNlZFR5cGUoaW5wdXQuZGF0YSksXG4gICAgICAgICAgICBzY2hlbWFFcnJvck1hcDogdGhpcy5fZGVmLmVycm9yTWFwLFxuICAgICAgICAgICAgcGF0aDogaW5wdXQucGF0aCxcbiAgICAgICAgICAgIHBhcmVudDogaW5wdXQucGFyZW50LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiBuZXcgUGFyc2VTdGF0dXMoKSxcbiAgICAgICAgICAgIGN0eDoge1xuICAgICAgICAgICAgICAgIGNvbW1vbjogaW5wdXQucGFyZW50LmNvbW1vbixcbiAgICAgICAgICAgICAgICBkYXRhOiBpbnB1dC5kYXRhLFxuICAgICAgICAgICAgICAgIHBhcnNlZFR5cGU6IGdldFBhcnNlZFR5cGUoaW5wdXQuZGF0YSksXG4gICAgICAgICAgICAgICAgc2NoZW1hRXJyb3JNYXA6IHRoaXMuX2RlZi5lcnJvck1hcCxcbiAgICAgICAgICAgICAgICBwYXRoOiBpbnB1dC5wYXRoLFxuICAgICAgICAgICAgICAgIHBhcmVudDogaW5wdXQucGFyZW50LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX3BhcnNlU3luYyhpbnB1dCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9wYXJzZShpbnB1dCk7XG4gICAgICAgIGlmIChpc0FzeW5jKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN5bmNocm9ub3VzIHBhcnNlIGVuY291bnRlcmVkIHByb21pc2UuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIF9wYXJzZUFzeW5jKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3BhcnNlKGlucHV0KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgIH1cbiAgICBwYXJzZShkYXRhLCBwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zYWZlUGFyc2UoZGF0YSwgcGFyYW1zKTtcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG4gICAgfVxuICAgIHNhZmVQYXJzZShkYXRhLCBwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgICAgY29tbW9uOiB7XG4gICAgICAgICAgICAgICAgaXNzdWVzOiBbXSxcbiAgICAgICAgICAgICAgICBhc3luYzogcGFyYW1zPy5hc3luYyA/PyBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0dWFsRXJyb3JNYXA6IHBhcmFtcz8uZXJyb3JNYXAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aDogcGFyYW1zPy5wYXRoIHx8IFtdLFxuICAgICAgICAgICAgc2NoZW1hRXJyb3JNYXA6IHRoaXMuX2RlZi5lcnJvck1hcCxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBwYXJzZWRUeXBlOiBnZXRQYXJzZWRUeXBlKGRhdGEpLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9wYXJzZVN5bmMoeyBkYXRhLCBwYXRoOiBjdHgucGF0aCwgcGFyZW50OiBjdHggfSk7XG4gICAgICAgIHJldHVybiBoYW5kbGVSZXN1bHQoY3R4LCByZXN1bHQpO1xuICAgIH1cbiAgICBcIn52YWxpZGF0ZVwiKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgICAgY29tbW9uOiB7XG4gICAgICAgICAgICAgICAgaXNzdWVzOiBbXSxcbiAgICAgICAgICAgICAgICBhc3luYzogISF0aGlzW1wifnN0YW5kYXJkXCJdLmFzeW5jLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdGg6IFtdLFxuICAgICAgICAgICAgc2NoZW1hRXJyb3JNYXA6IHRoaXMuX2RlZi5lcnJvck1hcCxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBwYXJzZWRUeXBlOiBnZXRQYXJzZWRUeXBlKGRhdGEpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoIXRoaXNbXCJ+c3RhbmRhcmRcIl0uYXN5bmMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fcGFyc2VTeW5jKHsgZGF0YSwgcGF0aDogW10sIHBhcmVudDogY3R4IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNzdWVzOiBjdHguY29tbW9uLmlzc3VlcyxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyPy5tZXNzYWdlPy50b0xvd2VyQ2FzZSgpPy5pbmNsdWRlcyhcImVuY291bnRlcmVkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbXCJ+c3RhbmRhcmRcIl0uYXN5bmMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdHguY29tbW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBpc3N1ZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJzZUFzeW5jKHsgZGF0YSwgcGF0aDogW10sIHBhcmVudDogY3R4IH0pLnRoZW4oKHJlc3VsdCkgPT4gaXNWYWxpZChyZXN1bHQpXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LnZhbHVlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgaXNzdWVzOiBjdHguY29tbW9uLmlzc3VlcyxcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBwYXJzZUFzeW5jKGRhdGEsIHBhcmFtcykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnNhZmVQYXJzZUFzeW5jKGRhdGEsIHBhcmFtcyk7XG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2VzcylcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcbiAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yO1xuICAgIH1cbiAgICBhc3luYyBzYWZlUGFyc2VBc3luYyhkYXRhLCBwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgICAgY29tbW9uOiB7XG4gICAgICAgICAgICAgICAgaXNzdWVzOiBbXSxcbiAgICAgICAgICAgICAgICBjb250ZXh0dWFsRXJyb3JNYXA6IHBhcmFtcz8uZXJyb3JNYXAsXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aDogcGFyYW1zPy5wYXRoIHx8IFtdLFxuICAgICAgICAgICAgc2NoZW1hRXJyb3JNYXA6IHRoaXMuX2RlZi5lcnJvck1hcCxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBwYXJzZWRUeXBlOiBnZXRQYXJzZWRUeXBlKGRhdGEpLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBtYXliZUFzeW5jUmVzdWx0ID0gdGhpcy5fcGFyc2UoeyBkYXRhLCBwYXRoOiBjdHgucGF0aCwgcGFyZW50OiBjdHggfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IChpc0FzeW5jKG1heWJlQXN5bmNSZXN1bHQpID8gbWF5YmVBc3luY1Jlc3VsdCA6IFByb21pc2UucmVzb2x2ZShtYXliZUFzeW5jUmVzdWx0KSk7XG4gICAgICAgIHJldHVybiBoYW5kbGVSZXN1bHQoY3R4LCByZXN1bHQpO1xuICAgIH1cbiAgICByZWZpbmUoY2hlY2ssIG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgZ2V0SXNzdWVQcm9wZXJ0aWVzID0gKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBtZXNzYWdlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG1lc3NhZ2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmluZW1lbnQoKHZhbCwgY3R4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjaGVjayh2YWwpO1xuICAgICAgICAgICAgY29uc3Qgc2V0RXJyb3IgPSAoKSA9PiBjdHguYWRkSXNzdWUoe1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5jdXN0b20sXG4gICAgICAgICAgICAgICAgLi4uZ2V0SXNzdWVQcm9wZXJ0aWVzKHZhbCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHNldEVycm9yKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZWZpbmVtZW50KGNoZWNrLCByZWZpbmVtZW50RGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVmaW5lbWVudCgodmFsLCBjdHgpID0+IHtcbiAgICAgICAgICAgIGlmICghY2hlY2sodmFsKSkge1xuICAgICAgICAgICAgICAgIGN0eC5hZGRJc3N1ZSh0eXBlb2YgcmVmaW5lbWVudERhdGEgPT09IFwiZnVuY3Rpb25cIiA/IHJlZmluZW1lbnREYXRhKHZhbCwgY3R4KSA6IHJlZmluZW1lbnREYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9yZWZpbmVtZW50KHJlZmluZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RFZmZlY3RzKHtcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcyxcbiAgICAgICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kRWZmZWN0cyxcbiAgICAgICAgICAgIGVmZmVjdDogeyB0eXBlOiBcInJlZmluZW1lbnRcIiwgcmVmaW5lbWVudCB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3VwZXJSZWZpbmUocmVmaW5lbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVmaW5lbWVudChyZWZpbmVtZW50KTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZGVmKSB7XG4gICAgICAgIC8qKiBBbGlhcyBvZiBzYWZlUGFyc2VBc3luYyAqL1xuICAgICAgICB0aGlzLnNwYSA9IHRoaXMuc2FmZVBhcnNlQXN5bmM7XG4gICAgICAgIHRoaXMuX2RlZiA9IGRlZjtcbiAgICAgICAgdGhpcy5wYXJzZSA9IHRoaXMucGFyc2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zYWZlUGFyc2UgPSB0aGlzLnNhZmVQYXJzZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnBhcnNlQXN5bmMgPSB0aGlzLnBhcnNlQXN5bmMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zYWZlUGFyc2VBc3luYyA9IHRoaXMuc2FmZVBhcnNlQXN5bmMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zcGEgPSB0aGlzLnNwYS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlZmluZSA9IHRoaXMucmVmaW5lLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVmaW5lbWVudCA9IHRoaXMucmVmaW5lbWVudC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN1cGVyUmVmaW5lID0gdGhpcy5zdXBlclJlZmluZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9wdGlvbmFsID0gdGhpcy5vcHRpb25hbC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm51bGxhYmxlID0gdGhpcy5udWxsYWJsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm51bGxpc2ggPSB0aGlzLm51bGxpc2guYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hcnJheSA9IHRoaXMuYXJyYXkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9taXNlID0gdGhpcy5wcm9taXNlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub3IgPSB0aGlzLm9yLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYW5kID0gdGhpcy5hbmQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJyYW5kID0gdGhpcy5icmFuZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmRlZmF1bHQgPSB0aGlzLmRlZmF1bHQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jYXRjaCA9IHRoaXMuY2F0Y2guYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5kZXNjcmliZSA9IHRoaXMuZGVzY3JpYmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5waXBlID0gdGhpcy5waXBlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVhZG9ubHkgPSB0aGlzLnJlYWRvbmx5LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaXNOdWxsYWJsZSA9IHRoaXMuaXNOdWxsYWJsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmlzT3B0aW9uYWwgPSB0aGlzLmlzT3B0aW9uYWwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpc1tcIn5zdGFuZGFyZFwiXSA9IHtcbiAgICAgICAgICAgIHZlcnNpb246IDEsXG4gICAgICAgICAgICB2ZW5kb3I6IFwiem9kXCIsXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGRhdGEpID0+IHRoaXNbXCJ+dmFsaWRhdGVcIl0oZGF0YSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIG9wdGlvbmFsKCkge1xuICAgICAgICByZXR1cm4gWm9kT3B0aW9uYWwuY3JlYXRlKHRoaXMsIHRoaXMuX2RlZik7XG4gICAgfVxuICAgIG51bGxhYmxlKCkge1xuICAgICAgICByZXR1cm4gWm9kTnVsbGFibGUuY3JlYXRlKHRoaXMsIHRoaXMuX2RlZik7XG4gICAgfVxuICAgIG51bGxpc2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm51bGxhYmxlKCkub3B0aW9uYWwoKTtcbiAgICB9XG4gICAgYXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBab2RBcnJheS5jcmVhdGUodGhpcyk7XG4gICAgfVxuICAgIHByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBab2RQcm9taXNlLmNyZWF0ZSh0aGlzLCB0aGlzLl9kZWYpO1xuICAgIH1cbiAgICBvcihvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIFpvZFVuaW9uLmNyZWF0ZShbdGhpcywgb3B0aW9uXSwgdGhpcy5fZGVmKTtcbiAgICB9XG4gICAgYW5kKGluY29taW5nKSB7XG4gICAgICAgIHJldHVybiBab2RJbnRlcnNlY3Rpb24uY3JlYXRlKHRoaXMsIGluY29taW5nLCB0aGlzLl9kZWYpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kRWZmZWN0cyh7XG4gICAgICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHRoaXMuX2RlZiksXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMsXG4gICAgICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEVmZmVjdHMsXG4gICAgICAgICAgICBlZmZlY3Q6IHsgdHlwZTogXCJ0cmFuc2Zvcm1cIiwgdHJhbnNmb3JtIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkZWZhdWx0KGRlZikge1xuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWVGdW5jID0gdHlwZW9mIGRlZiA9PT0gXCJmdW5jdGlvblwiID8gZGVmIDogKCkgPT4gZGVmO1xuICAgICAgICByZXR1cm4gbmV3IFpvZERlZmF1bHQoe1xuICAgICAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyh0aGlzLl9kZWYpLFxuICAgICAgICAgICAgaW5uZXJUeXBlOiB0aGlzLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0VmFsdWVGdW5jLFxuICAgICAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2REZWZhdWx0LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYnJhbmQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kQnJhbmRlZCh7XG4gICAgICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEJyYW5kZWQsXG4gICAgICAgICAgICB0eXBlOiB0aGlzLFxuICAgICAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyh0aGlzLl9kZWYpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2goZGVmKSB7XG4gICAgICAgIGNvbnN0IGNhdGNoVmFsdWVGdW5jID0gdHlwZW9mIGRlZiA9PT0gXCJmdW5jdGlvblwiID8gZGVmIDogKCkgPT4gZGVmO1xuICAgICAgICByZXR1cm4gbmV3IFpvZENhdGNoKHtcbiAgICAgICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXModGhpcy5fZGVmKSxcbiAgICAgICAgICAgIGlubmVyVHlwZTogdGhpcyxcbiAgICAgICAgICAgIGNhdGNoVmFsdWU6IGNhdGNoVmFsdWVGdW5jLFxuICAgICAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RDYXRjaCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRlc2NyaWJlKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IFRoaXMgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgICAgICByZXR1cm4gbmV3IFRoaXMoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwaXBlKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gWm9kUGlwZWxpbmUuY3JlYXRlKHRoaXMsIHRhcmdldCk7XG4gICAgfVxuICAgIHJlYWRvbmx5KCkge1xuICAgICAgICByZXR1cm4gWm9kUmVhZG9ubHkuY3JlYXRlKHRoaXMpO1xuICAgIH1cbiAgICBpc09wdGlvbmFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zYWZlUGFyc2UodW5kZWZpbmVkKS5zdWNjZXNzO1xuICAgIH1cbiAgICBpc051bGxhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zYWZlUGFyc2UobnVsbCkuc3VjY2VzcztcbiAgICB9XG59XG5jb25zdCBjdWlkUmVnZXggPSAvXmNbXlxccy1dezgsfSQvaTtcbmNvbnN0IGN1aWQyUmVnZXggPSAvXlswLTlhLXpdKyQvO1xuY29uc3QgdWxpZFJlZ2V4ID0gL15bMC05QS1ISktNTlAtVFYtWl17MjZ9JC9pO1xuLy8gY29uc3QgdXVpZFJlZ2V4ID1cbi8vICAgL14oW2EtZjAtOV17OH0tW2EtZjAtOV17NH0tWzEtNV1bYS1mMC05XXszfS1bYS1mMC05XXs0fS1bYS1mMC05XXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTtcbmNvbnN0IHV1aWRSZWdleCA9IC9eWzAtOWEtZkEtRl17OH1cXGItWzAtOWEtZkEtRl17NH1cXGItWzAtOWEtZkEtRl17NH1cXGItWzAtOWEtZkEtRl17NH1cXGItWzAtOWEtZkEtRl17MTJ9JC9pO1xuY29uc3QgbmFub2lkUmVnZXggPSAvXlthLXowLTlfLV17MjF9JC9pO1xuY29uc3Qgand0UmVnZXggPSAvXltBLVphLXowLTktX10rXFwuW0EtWmEtejAtOS1fXStcXC5bQS1aYS16MC05LV9dKiQvO1xuY29uc3QgZHVyYXRpb25SZWdleCA9IC9eWy0rXT9QKD8hJCkoPzooPzpbLStdP1xcZCtZKXwoPzpbLStdP1xcZCtbLixdXFxkK1kkKSk/KD86KD86Wy0rXT9cXGQrTSl8KD86Wy0rXT9cXGQrWy4sXVxcZCtNJCkpPyg/Oig/OlstK10/XFxkK1cpfCg/OlstK10/XFxkK1suLF1cXGQrVyQpKT8oPzooPzpbLStdP1xcZCtEKXwoPzpbLStdP1xcZCtbLixdXFxkK0QkKSk/KD86VCg/PVtcXGQrLV0pKD86KD86Wy0rXT9cXGQrSCl8KD86Wy0rXT9cXGQrWy4sXVxcZCtIJCkpPyg/Oig/OlstK10/XFxkK00pfCg/OlstK10/XFxkK1suLF1cXGQrTSQpKT8oPzpbLStdP1xcZCsoPzpbLixdXFxkKyk/Uyk/KT8/JC87XG4vLyBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NjE4MS8xNTUwMTU1XG4vLyBvbGQgdmVyc2lvbjogdG9vIHNsb3csIGRpZG4ndCBzdXBwb3J0IHVuaWNvZGVcbi8vIGNvbnN0IGVtYWlsUmVnZXggPSAvXigoKFthLXpdfFxcZHxbISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5dfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSsoXFwuKFthLXpdfFxcZHxbISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5dfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSspKil8KChcXHgyMikoKCgoXFx4MjB8XFx4MDkpKihcXHgwZFxceDBhKSk/KFxceDIwfFxceDA5KSspPygoW1xceDAxLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXFx4N2ZdfFxceDIxfFtcXHgyMy1cXHg1Yl18W1xceDVkLVxceDdlXXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KFxcXFwoW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBkLVxceDdmXXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKSkqKCgoXFx4MjB8XFx4MDkpKihcXHgwZFxceDBhKSk/KFxceDIwfFxceDA5KSspPyhcXHgyMikpKUAoKChbYS16XXxcXGR8W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCgoW2Etel18XFxkfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKShbYS16XXxcXGR8LXxcXC58X3x+fFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSooW2Etel18XFxkfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSkpXFwuKSsoKFthLXpdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoKFthLXpdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKShbYS16XXxcXGR8LXxcXC58X3x+fFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSooW2Etel18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKSkkL2k7XG4vL29sZCBlbWFpbCByZWdleFxuLy8gY29uc3QgZW1haWxSZWdleCA9IC9eKChbXjw+KClbXFxdLiw7Olxcc0BcIl0rKFxcLltePD4oKVtcXF0uLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoPyEtKShbXjw+KClbXFxdLiw7Olxcc0BcIl0rXFwuKStbXjw+KClbXFxdLiw7Olxcc0BcIl17MSx9KVteLTw+KClbXFxdLiw7Olxcc0BcIl0kL2k7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbi8vIGNvbnN0IGVtYWlsUmVnZXggPVxuLy8gICAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFsoKCgyNVswLTVdKXwoMlswLTRdWzAtOV0pfCgxWzAtOV17Mn0pfChbMC05XXsxLDJ9KSlcXC4pezN9KCgyNVswLTVdKXwoMlswLTRdWzAtOV0pfCgxWzAtOV17Mn0pfChbMC05XXsxLDJ9KSlcXF0pfChcXFtJUHY2OigoW2EtZjAtOV17MSw0fTopezd9fDo6KFthLWYwLTldezEsNH06KXswLDZ9fChbYS1mMC05XXsxLDR9Oil7MX06KFthLWYwLTldezEsNH06KXswLDV9fChbYS1mMC05XXsxLDR9Oil7Mn06KFthLWYwLTldezEsNH06KXswLDR9fChbYS1mMC05XXsxLDR9Oil7M306KFthLWYwLTldezEsNH06KXswLDN9fChbYS1mMC05XXsxLDR9Oil7NH06KFthLWYwLTldezEsNH06KXswLDJ9fChbYS1mMC05XXsxLDR9Oil7NX06KFthLWYwLTldezEsNH06KXswLDF9KShbYS1mMC05XXsxLDR9fCgoKDI1WzAtNV0pfCgyWzAtNF1bMC05XSl8KDFbMC05XXsyfSl8KFswLTldezEsMn0pKVxcLil7M30oKDI1WzAtNV0pfCgyWzAtNF1bMC05XSl8KDFbMC05XXsyfSl8KFswLTldezEsMn0pKSlcXF0pfChbQS1aYS16MC05XShbQS1aYS16MC05LV0qW0EtWmEtejAtOV0pKihcXC5bQS1aYS16XXsyLH0pKykpJC87XG4vLyBjb25zdCBlbWFpbFJlZ2V4ID1cbi8vICAgL15bYS16QS1aMC05XFwuXFwhXFwjXFwkXFwlXFwmXFwnXFwqXFwrXFwvXFw9XFw/XFxeXFxfXFxgXFx7XFx8XFx9XFx+XFwtXStAW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KD86XFwuW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KSokLztcbi8vIGNvbnN0IGVtYWlsUmVnZXggPVxuLy8gICAvXig/OlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKSp8XCIoPzpbXFx4MDEtXFx4MDhcXHgwYlxceDBjXFx4MGUtXFx4MWZcXHgyMVxceDIzLVxceDViXFx4NWQtXFx4N2ZdfFxcXFxbXFx4MDEtXFx4MDlcXHgwYlxceDBjXFx4MGUtXFx4N2ZdKSpcIilAKD86KD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcXFsoPzooPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFwuKXszfSg/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldP3xbYS16MC05LV0qW2EtejAtOV06KD86W1xceDAxLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXFx4MjEtXFx4NWFcXHg1My1cXHg3Zl18XFxcXFtcXHgwMS1cXHgwOVxceDBiXFx4MGNcXHgwZS1cXHg3Zl0pKylcXF0pJC9pO1xuY29uc3QgZW1haWxSZWdleCA9IC9eKD8hXFwuKSg/IS4qXFwuXFwuKShbQS1aMC05XycrXFwtXFwuXSopW0EtWjAtOV8rLV1AKFtBLVowLTldW0EtWjAtOVxcLV0qXFwuKStbQS1aXXsyLH0kL2k7XG4vLyBjb25zdCBlbWFpbFJlZ2V4ID1cbi8vICAgL15bYS16MC05LiEjJCUmXHUyMDE5KisvPT9eX2B7fH1+LV0rQFthLXowLTktXSsoPzpcXC5bYS16MC05XFwtXSspKiQvaTtcbi8vIGZyb20gaHR0cHM6Ly90aGVrZXZpbnNjb3R0LmNvbS9lbW9qaXMtaW4tamF2YXNjcmlwdC8jd3JpdGluZy1hLXJlZ3VsYXItZXhwcmVzc2lvblxuY29uc3QgX2Vtb2ppUmVnZXggPSBgXihcXFxccHtFeHRlbmRlZF9QaWN0b2dyYXBoaWN9fFxcXFxwe0Vtb2ppX0NvbXBvbmVudH0pKyRgO1xubGV0IGVtb2ppUmVnZXg7XG4vLyBmYXN0ZXIsIHNpbXBsZXIsIHNhZmVyXG5jb25zdCBpcHY0UmVnZXggPSAvXig/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18MVswLTldWzAtOV18WzEtOV1bMC05XXxbMC05XSlcXC4pezN9KD86MjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV1bMC05XXxbMS05XVswLTldfFswLTldKSQvO1xuY29uc3QgaXB2NENpZHJSZWdleCA9IC9eKD86KD86MjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV1bMC05XXxbMS05XVswLTldfFswLTldKVxcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfDFbMC05XVswLTldfFsxLTldWzAtOV18WzAtOV0pXFwvKDNbMC0yXXxbMTJdP1swLTldKSQvO1xuLy8gY29uc3QgaXB2NlJlZ2V4ID1cbi8vIC9eKChbYS1mMC05XXsxLDR9Oil7N318OjooW2EtZjAtOV17MSw0fTopezAsNn18KFthLWYwLTldezEsNH06KXsxfTooW2EtZjAtOV17MSw0fTopezAsNX18KFthLWYwLTldezEsNH06KXsyfTooW2EtZjAtOV17MSw0fTopezAsNH18KFthLWYwLTldezEsNH06KXszfTooW2EtZjAtOV17MSw0fTopezAsM318KFthLWYwLTldezEsNH06KXs0fTooW2EtZjAtOV17MSw0fTopezAsMn18KFthLWYwLTldezEsNH06KXs1fTooW2EtZjAtOV17MSw0fTopezAsMX0pKFthLWYwLTldezEsNH18KCgoMjVbMC01XSl8KDJbMC00XVswLTldKXwoMVswLTldezJ9KXwoWzAtOV17MSwyfSkpXFwuKXszfSgoMjVbMC01XSl8KDJbMC00XVswLTldKXwoMVswLTldezJ9KXwoWzAtOV17MSwyfSkpKSQvO1xuY29uc3QgaXB2NlJlZ2V4ID0gL14oKFswLTlhLWZBLUZdezEsNH06KXs3LDd9WzAtOWEtZkEtRl17MSw0fXwoWzAtOWEtZkEtRl17MSw0fTopezEsN306fChbMC05YS1mQS1GXXsxLDR9Oil7MSw2fTpbMC05YS1mQS1GXXsxLDR9fChbMC05YS1mQS1GXXsxLDR9Oil7MSw1fSg6WzAtOWEtZkEtRl17MSw0fSl7MSwyfXwoWzAtOWEtZkEtRl17MSw0fTopezEsNH0oOlswLTlhLWZBLUZdezEsNH0pezEsM318KFswLTlhLWZBLUZdezEsNH06KXsxLDN9KDpbMC05YS1mQS1GXXsxLDR9KXsxLDR9fChbMC05YS1mQS1GXXsxLDR9Oil7MSwyfSg6WzAtOWEtZkEtRl17MSw0fSl7MSw1fXxbMC05YS1mQS1GXXsxLDR9OigoOlswLTlhLWZBLUZdezEsNH0pezEsNn0pfDooKDpbMC05YS1mQS1GXXsxLDR9KXsxLDd9fDopfGZlODA6KDpbMC05YS1mQS1GXXswLDR9KXswLDR9JVswLTlhLXpBLVpdezEsfXw6OihmZmZmKDowezEsNH0pezAsMX06KXswLDF9KCgyNVswLTVdfCgyWzAtNF18MXswLDF9WzAtOV0pezAsMX1bMC05XSlcXC4pezMsM30oMjVbMC01XXwoMlswLTRdfDF7MCwxfVswLTldKXswLDF9WzAtOV0pfChbMC05YS1mQS1GXXsxLDR9Oil7MSw0fTooKDI1WzAtNV18KDJbMC00XXwxezAsMX1bMC05XSl7MCwxfVswLTldKVxcLil7MywzfSgyNVswLTVdfCgyWzAtNF18MXswLDF9WzAtOV0pezAsMX1bMC05XSkpJC87XG5jb25zdCBpcHY2Q2lkclJlZ2V4ID0gL14oKFswLTlhLWZBLUZdezEsNH06KXs3LDd9WzAtOWEtZkEtRl17MSw0fXwoWzAtOWEtZkEtRl17MSw0fTopezEsN306fChbMC05YS1mQS1GXXsxLDR9Oil7MSw2fTpbMC05YS1mQS1GXXsxLDR9fChbMC05YS1mQS1GXXsxLDR9Oil7MSw1fSg6WzAtOWEtZkEtRl17MSw0fSl7MSwyfXwoWzAtOWEtZkEtRl17MSw0fTopezEsNH0oOlswLTlhLWZBLUZdezEsNH0pezEsM318KFswLTlhLWZBLUZdezEsNH06KXsxLDN9KDpbMC05YS1mQS1GXXsxLDR9KXsxLDR9fChbMC05YS1mQS1GXXsxLDR9Oil7MSwyfSg6WzAtOWEtZkEtRl17MSw0fSl7MSw1fXxbMC05YS1mQS1GXXsxLDR9OigoOlswLTlhLWZBLUZdezEsNH0pezEsNn0pfDooKDpbMC05YS1mQS1GXXsxLDR9KXsxLDd9fDopfGZlODA6KDpbMC05YS1mQS1GXXswLDR9KXswLDR9JVswLTlhLXpBLVpdezEsfXw6OihmZmZmKDowezEsNH0pezAsMX06KXswLDF9KCgyNVswLTVdfCgyWzAtNF18MXswLDF9WzAtOV0pezAsMX1bMC05XSlcXC4pezMsM30oMjVbMC01XXwoMlswLTRdfDF7MCwxfVswLTldKXswLDF9WzAtOV0pfChbMC05YS1mQS1GXXsxLDR9Oil7MSw0fTooKDI1WzAtNV18KDJbMC00XXwxezAsMX1bMC05XSl7MCwxfVswLTldKVxcLil7MywzfSgyNVswLTVdfCgyWzAtNF18MXswLDF9WzAtOV0pezAsMX1bMC05XSkpXFwvKDEyWzAtOF18MVswMV1bMC05XXxbMS05XT9bMC05XSkkLztcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzc4NjAzOTIvZGV0ZXJtaW5lLWlmLXN0cmluZy1pcy1pbi1iYXNlNjQtdXNpbmctamF2YXNjcmlwdFxuY29uc3QgYmFzZTY0UmVnZXggPSAvXihbMC05YS16QS1aKy9dezR9KSooKFswLTlhLXpBLVorL117Mn09PSl8KFswLTlhLXpBLVorL117M309KSk/JC87XG4vLyBodHRwczovL2Jhc2U2NC5ndXJ1L3N0YW5kYXJkcy9iYXNlNjR1cmxcbmNvbnN0IGJhc2U2NHVybFJlZ2V4ID0gL14oWzAtOWEtekEtWi1fXXs0fSkqKChbMC05YS16QS1aLV9dezJ9KD09KT8pfChbMC05YS16QS1aLV9dezN9KD0pPykpPyQvO1xuLy8gc2ltcGxlXG4vLyBjb25zdCBkYXRlUmVnZXhTb3VyY2UgPSBgXFxcXGR7NH0tXFxcXGR7Mn0tXFxcXGR7Mn1gO1xuLy8gbm8gbGVhcCB5ZWFyIHZhbGlkYXRpb25cbi8vIGNvbnN0IGRhdGVSZWdleFNvdXJjZSA9IGBcXFxcZHs0fS0oKDBbMTM1NzhdfDEwfDEyKS0zMXwoMFsxMy05XXwxWzAtMl0pLTMwfCgwWzEtOV18MVswLTJdKS0oMFsxLTldfDFcXFxcZHwyXFxcXGQpKWA7XG4vLyB3aXRoIGxlYXAgeWVhciB2YWxpZGF0aW9uXG5jb25zdCBkYXRlUmVnZXhTb3VyY2UgPSBgKChcXFxcZFxcXFxkWzI0NjhdWzA0OF18XFxcXGRcXFxcZFsxMzU3OV1bMjZdfFxcXFxkXFxcXGQwWzQ4XXxbMDI0NjhdWzA0OF0wMHxbMTM1NzldWzI2XTAwKS0wMi0yOXxcXFxcZHs0fS0oKDBbMTM1NzhdfDFbMDJdKS0oMFsxLTldfFsxMl1cXFxcZHwzWzAxXSl8KDBbNDY5XXwxMSktKDBbMS05XXxbMTJdXFxcXGR8MzApfCgwMiktKDBbMS05XXwxXFxcXGR8MlswLThdKSkpYDtcbmNvbnN0IGRhdGVSZWdleCA9IG5ldyBSZWdFeHAoYF4ke2RhdGVSZWdleFNvdXJjZX0kYCk7XG5mdW5jdGlvbiB0aW1lUmVnZXhTb3VyY2UoYXJncykge1xuICAgIGxldCBzZWNvbmRzUmVnZXhTb3VyY2UgPSBgWzAtNV1cXFxcZGA7XG4gICAgaWYgKGFyZ3MucHJlY2lzaW9uKSB7XG4gICAgICAgIHNlY29uZHNSZWdleFNvdXJjZSA9IGAke3NlY29uZHNSZWdleFNvdXJjZX1cXFxcLlxcXFxkeyR7YXJncy5wcmVjaXNpb259fWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGFyZ3MucHJlY2lzaW9uID09IG51bGwpIHtcbiAgICAgICAgc2Vjb25kc1JlZ2V4U291cmNlID0gYCR7c2Vjb25kc1JlZ2V4U291cmNlfShcXFxcLlxcXFxkKyk/YDtcbiAgICB9XG4gICAgY29uc3Qgc2Vjb25kc1F1YW50aWZpZXIgPSBhcmdzLnByZWNpc2lvbiA/IFwiK1wiIDogXCI/XCI7IC8vIHJlcXVpcmUgc2Vjb25kcyBpZiBwcmVjaXNpb24gaXMgbm9uemVyb1xuICAgIHJldHVybiBgKFswMV1cXFxcZHwyWzAtM10pOlswLTVdXFxcXGQoOiR7c2Vjb25kc1JlZ2V4U291cmNlfSkke3NlY29uZHNRdWFudGlmaWVyfWA7XG59XG5mdW5jdGlvbiB0aW1lUmVnZXgoYXJncykge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGBeJHt0aW1lUmVnZXhTb3VyY2UoYXJncyl9JGApO1xufVxuLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zMTQzMjMxXG5leHBvcnQgZnVuY3Rpb24gZGF0ZXRpbWVSZWdleChhcmdzKSB7XG4gICAgbGV0IHJlZ2V4ID0gYCR7ZGF0ZVJlZ2V4U291cmNlfVQke3RpbWVSZWdleFNvdXJjZShhcmdzKX1gO1xuICAgIGNvbnN0IG9wdHMgPSBbXTtcbiAgICBvcHRzLnB1c2goYXJncy5sb2NhbCA/IGBaP2AgOiBgWmApO1xuICAgIGlmIChhcmdzLm9mZnNldClcbiAgICAgICAgb3B0cy5wdXNoKGAoWystXVxcXFxkezJ9Oj9cXFxcZHsyfSlgKTtcbiAgICByZWdleCA9IGAke3JlZ2V4fSgke29wdHMuam9pbihcInxcIil9KWA7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoYF4ke3JlZ2V4fSRgKTtcbn1cbmZ1bmN0aW9uIGlzVmFsaWRJUChpcCwgdmVyc2lvbikge1xuICAgIGlmICgodmVyc2lvbiA9PT0gXCJ2NFwiIHx8ICF2ZXJzaW9uKSAmJiBpcHY0UmVnZXgudGVzdChpcCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICgodmVyc2lvbiA9PT0gXCJ2NlwiIHx8ICF2ZXJzaW9uKSAmJiBpcHY2UmVnZXgudGVzdChpcCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzVmFsaWRKV1Qoand0LCBhbGcpIHtcbiAgICBpZiAoIWp3dFJlZ2V4LnRlc3Qoand0KSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFtoZWFkZXJdID0gand0LnNwbGl0KFwiLlwiKTtcbiAgICAgICAgaWYgKCFoZWFkZXIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIENvbnZlcnQgYmFzZTY0dXJsIHRvIGJhc2U2NFxuICAgICAgICBjb25zdCBiYXNlNjQgPSBoZWFkZXJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csIFwiK1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoL18vZywgXCIvXCIpXG4gICAgICAgICAgICAucGFkRW5kKGhlYWRlci5sZW5ndGggKyAoKDQgLSAoaGVhZGVyLmxlbmd0aCAlIDQpKSAlIDQpLCBcIj1cIik7XG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSBKU09OLnBhcnNlKGF0b2IoYmFzZTY0KSk7XG4gICAgICAgIGlmICh0eXBlb2YgZGVjb2RlZCAhPT0gXCJvYmplY3RcIiB8fCBkZWNvZGVkID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoXCJ0eXBcIiBpbiBkZWNvZGVkICYmIGRlY29kZWQ/LnR5cCAhPT0gXCJKV1RcIilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCFkZWNvZGVkLmFsZylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGFsZyAmJiBkZWNvZGVkLmFsZyAhPT0gYWxnKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNWYWxpZENpZHIoaXAsIHZlcnNpb24pIHtcbiAgICBpZiAoKHZlcnNpb24gPT09IFwidjRcIiB8fCAhdmVyc2lvbikgJiYgaXB2NENpZHJSZWdleC50ZXN0KGlwKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCh2ZXJzaW9uID09PSBcInY2XCIgfHwgIXZlcnNpb24pICYmIGlwdjZDaWRyUmVnZXgudGVzdChpcCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydCBjbGFzcyBab2RTdHJpbmcgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RlZi5jb2VyY2UpIHtcbiAgICAgICAgICAgIGlucHV0LmRhdGEgPSBTdHJpbmcoaW5wdXQuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyc2VkVHlwZSA9IHRoaXMuX2dldFR5cGUoaW5wdXQpO1xuICAgICAgICBpZiAocGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5zdHJpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUuc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdHVzID0gbmV3IFBhcnNlU3RhdHVzKCk7XG4gICAgICAgIGxldCBjdHggPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAoY29uc3QgY2hlY2sgb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoZWNrLmtpbmQgPT09IFwibWluXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZGF0YS5sZW5ndGggPCBjaGVjay52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUudG9vX3NtYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bTogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwibWF4XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZGF0YS5sZW5ndGggPiBjaGVjay52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUudG9vX2JpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW06IGNoZWNrLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImxlbmd0aFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9vQmlnID0gaW5wdXQuZGF0YS5sZW5ndGggPiBjaGVjay52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b29TbWFsbCA9IGlucHV0LmRhdGEubGVuZ3RoIDwgY2hlY2sudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRvb0JpZyB8fCB0b29TbWFsbCkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvb0JpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19iaWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bTogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRvb1NtYWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUudG9vX3NtYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW06IGNoZWNrLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4YWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImVtYWlsXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVtYWlsUmVnZXgudGVzdChpbnB1dC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcImVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJlbW9qaVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlbW9qaVJlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIGVtb2ppUmVnZXggPSBuZXcgUmVnRXhwKF9lbW9qaVJlZ2V4LCBcInVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZW1vamlSZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiZW1vamlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcInV1aWRcIikge1xuICAgICAgICAgICAgICAgIGlmICghdXVpZFJlZ2V4LnRlc3QoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJ1dWlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJuYW5vaWRcIikge1xuICAgICAgICAgICAgICAgIGlmICghbmFub2lkUmVnZXgudGVzdChpbnB1dC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcIm5hbm9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwiY3VpZFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjdWlkUmVnZXgudGVzdChpbnB1dC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcImN1aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImN1aWQyXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1aWQyUmVnZXgudGVzdChpbnB1dC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcImN1aWQyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJ1bGlkXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXVsaWRSZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwidWxpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwidXJsXCIpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBuZXcgVVJMKGlucHV0LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwidXJsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJyZWdleFwiKSB7XG4gICAgICAgICAgICAgICAgY2hlY2sucmVnZXgubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXN0UmVzdWx0ID0gY2hlY2sucmVnZXgudGVzdChpbnB1dC5kYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRlc3RSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJyZWdleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwidHJpbVwiKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuZGF0YSA9IGlucHV0LmRhdGEudHJpbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJpbmNsdWRlc1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpbnB1dC5kYXRhLmluY2x1ZGVzKGNoZWNrLnZhbHVlLCBjaGVjay5wb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogeyBpbmNsdWRlczogY2hlY2sudmFsdWUsIHBvc2l0aW9uOiBjaGVjay5wb3NpdGlvbiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwidG9Mb3dlckNhc2VcIikge1xuICAgICAgICAgICAgICAgIGlucHV0LmRhdGEgPSBpbnB1dC5kYXRhLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcInRvVXBwZXJDYXNlXCIpIHtcbiAgICAgICAgICAgICAgICBpbnB1dC5kYXRhID0gaW5wdXQuZGF0YS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJzdGFydHNXaXRoXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlucHV0LmRhdGEuc3RhcnRzV2l0aChjaGVjay52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogeyBzdGFydHNXaXRoOiBjaGVjay52YWx1ZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwiZW5kc1dpdGhcIikge1xuICAgICAgICAgICAgICAgIGlmICghaW5wdXQuZGF0YS5lbmRzV2l0aChjaGVjay52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogeyBlbmRzV2l0aDogY2hlY2sudmFsdWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImRhdGV0aW1lXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWdleCA9IGRhdGV0aW1lUmVnZXgoY2hlY2spO1xuICAgICAgICAgICAgICAgIGlmICghcmVnZXgudGVzdChpbnB1dC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcImRhdGV0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJkYXRlXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWdleCA9IGRhdGVSZWdleDtcbiAgICAgICAgICAgICAgICBpZiAoIXJlZ2V4LnRlc3QoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJ0aW1lXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWdleCA9IHRpbWVSZWdleChjaGVjayk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwidGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwiZHVyYXRpb25cIikge1xuICAgICAgICAgICAgICAgIGlmICghZHVyYXRpb25SZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiZHVyYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImlwXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRJUChpbnB1dC5kYXRhLCBjaGVjay52ZXJzaW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcImlwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJqd3RcIikge1xuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZEpXVChpbnB1dC5kYXRhLCBjaGVjay5hbGcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiand0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJjaWRyXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRDaWRyKGlucHV0LmRhdGEsIGNoZWNrLnZlcnNpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiY2lkclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwiYmFzZTY0XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJhc2U2NFJlZ2V4LnRlc3QoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJiYXNlNjRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImJhc2U2NHVybFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFiYXNlNjR1cmxSZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiYmFzZTY0dXJsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXRpbC5hc3NlcnROZXZlcihjaGVjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMudmFsdWUsIHZhbHVlOiBpbnB1dC5kYXRhIH07XG4gICAgfVxuICAgIF9yZWdleChyZWdleCwgdmFsaWRhdGlvbiwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZpbmVtZW50KChkYXRhKSA9PiByZWdleC50ZXN0KGRhdGEpLCB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLFxuICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2FkZENoZWNrKGNoZWNrKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kU3RyaW5nKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIGNoZWNrczogWy4uLnRoaXMuX2RlZi5jaGVja3MsIGNoZWNrXSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVtYWlsKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJlbWFpbFwiLCAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSkgfSk7XG4gICAgfVxuICAgIHVybChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwidXJsXCIsIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSB9KTtcbiAgICB9XG4gICAgZW1vamkobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soeyBraW5kOiBcImVtb2ppXCIsIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSB9KTtcbiAgICB9XG4gICAgdXVpZChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwidXVpZFwiLCAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSkgfSk7XG4gICAgfVxuICAgIG5hbm9pZChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwibmFub2lkXCIsIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSB9KTtcbiAgICB9XG4gICAgY3VpZChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwiY3VpZFwiLCAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSkgfSk7XG4gICAgfVxuICAgIGN1aWQyKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJjdWlkMlwiLCAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSkgfSk7XG4gICAgfVxuICAgIHVsaWQobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soeyBraW5kOiBcInVsaWRcIiwgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpIH0pO1xuICAgIH1cbiAgICBiYXNlNjQobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soeyBraW5kOiBcImJhc2U2NFwiLCAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSkgfSk7XG4gICAgfVxuICAgIGJhc2U2NHVybChtZXNzYWdlKSB7XG4gICAgICAgIC8vIGJhc2U2NHVybCBlbmNvZGluZyBpcyBhIG1vZGlmaWNhdGlvbiBvZiBiYXNlNjQgdGhhdCBjYW4gc2FmZWx5IGJlIHVzZWQgaW4gVVJMcyBhbmQgZmlsZW5hbWVzXG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcImJhc2U2NHVybFwiLFxuICAgICAgICAgICAgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgand0KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJqd3RcIiwgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG9wdGlvbnMpIH0pO1xuICAgIH1cbiAgICBpcChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwiaXBcIiwgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG9wdGlvbnMpIH0pO1xuICAgIH1cbiAgICBjaWRyKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJjaWRyXCIsIC4uLmVycm9yVXRpbC5lcnJUb09iaihvcHRpb25zKSB9KTtcbiAgICB9XG4gICAgZGF0ZXRpbWUob3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICAgICAga2luZDogXCJkYXRldGltZVwiLFxuICAgICAgICAgICAgICAgIHByZWNpc2lvbjogbnVsbCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxvY2FsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwiZGF0ZXRpbWVcIixcbiAgICAgICAgICAgIHByZWNpc2lvbjogdHlwZW9mIG9wdGlvbnM/LnByZWNpc2lvbiA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBvcHRpb25zPy5wcmVjaXNpb24sXG4gICAgICAgICAgICBvZmZzZXQ6IG9wdGlvbnM/Lm9mZnNldCA/PyBmYWxzZSxcbiAgICAgICAgICAgIGxvY2FsOiBvcHRpb25zPy5sb2NhbCA/PyBmYWxzZSxcbiAgICAgICAgICAgIC4uLmVycm9yVXRpbC5lcnJUb09iaihvcHRpb25zPy5tZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRhdGUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soeyBraW5kOiBcImRhdGVcIiwgbWVzc2FnZSB9KTtcbiAgICB9XG4gICAgdGltZShvcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgICAgICBraW5kOiBcInRpbWVcIixcbiAgICAgICAgICAgICAgICBwcmVjaXNpb246IG51bGwsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogb3B0aW9ucyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcInRpbWVcIixcbiAgICAgICAgICAgIHByZWNpc2lvbjogdHlwZW9mIG9wdGlvbnM/LnByZWNpc2lvbiA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBvcHRpb25zPy5wcmVjaXNpb24sXG4gICAgICAgICAgICAuLi5lcnJvclV0aWwuZXJyVG9PYmoob3B0aW9ucz8ubWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkdXJhdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwiZHVyYXRpb25cIiwgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpIH0pO1xuICAgIH1cbiAgICByZWdleChyZWdleCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJyZWdleFwiLFxuICAgICAgICAgICAgcmVnZXg6IHJlZ2V4LFxuICAgICAgICAgICAgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW5jbHVkZXModmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwiaW5jbHVkZXNcIixcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBvcHRpb25zPy5wb3NpdGlvbixcbiAgICAgICAgICAgIC4uLmVycm9yVXRpbC5lcnJUb09iaihvcHRpb25zPy5tZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXJ0c1dpdGgodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwic3RhcnRzV2l0aFwiLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZW5kc1dpdGgodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwiZW5kc1dpdGhcIixcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1pbihtaW5MZW5ndGgsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibWluXCIsXG4gICAgICAgICAgICB2YWx1ZTogbWluTGVuZ3RoLFxuICAgICAgICAgICAgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWF4KG1heExlbmd0aCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtYXhcIixcbiAgICAgICAgICAgIHZhbHVlOiBtYXhMZW5ndGgsXG4gICAgICAgICAgICAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsZW5ndGgobGVuLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcImxlbmd0aFwiLFxuICAgICAgICAgICAgdmFsdWU6IGxlbixcbiAgICAgICAgICAgIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYC5taW4oMSlgXG4gICAgICovXG4gICAgbm9uZW1wdHkobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5taW4oMSwgZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgdHJpbSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RTdHJpbmcoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgY2hlY2tzOiBbLi4udGhpcy5fZGVmLmNoZWNrcywgeyBraW5kOiBcInRyaW1cIiB9XSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRvTG93ZXJDYXNlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZFN0cmluZyh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBjaGVja3M6IFsuLi50aGlzLl9kZWYuY2hlY2tzLCB7IGtpbmQ6IFwidG9Mb3dlckNhc2VcIiB9XSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRvVXBwZXJDYXNlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZFN0cmluZyh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBjaGVja3M6IFsuLi50aGlzLl9kZWYuY2hlY2tzLCB7IGtpbmQ6IFwidG9VcHBlckNhc2VcIiB9XSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBpc0RhdGV0aW1lKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImRhdGV0aW1lXCIpO1xuICAgIH1cbiAgICBnZXQgaXNEYXRlKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImRhdGVcIik7XG4gICAgfVxuICAgIGdldCBpc1RpbWUoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwidGltZVwiKTtcbiAgICB9XG4gICAgZ2V0IGlzRHVyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwiZHVyYXRpb25cIik7XG4gICAgfVxuICAgIGdldCBpc0VtYWlsKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImVtYWlsXCIpO1xuICAgIH1cbiAgICBnZXQgaXNVUkwoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwidXJsXCIpO1xuICAgIH1cbiAgICBnZXQgaXNFbW9qaSgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGVmLmNoZWNrcy5maW5kKChjaCkgPT4gY2gua2luZCA9PT0gXCJlbW9qaVwiKTtcbiAgICB9XG4gICAgZ2V0IGlzVVVJRCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGVmLmNoZWNrcy5maW5kKChjaCkgPT4gY2gua2luZCA9PT0gXCJ1dWlkXCIpO1xuICAgIH1cbiAgICBnZXQgaXNOQU5PSUQoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwibmFub2lkXCIpO1xuICAgIH1cbiAgICBnZXQgaXNDVUlEKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImN1aWRcIik7XG4gICAgfVxuICAgIGdldCBpc0NVSUQyKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImN1aWQyXCIpO1xuICAgIH1cbiAgICBnZXQgaXNVTElEKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcInVsaWRcIik7XG4gICAgfVxuICAgIGdldCBpc0lQKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImlwXCIpO1xuICAgIH1cbiAgICBnZXQgaXNDSURSKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImNpZHJcIik7XG4gICAgfVxuICAgIGdldCBpc0Jhc2U2NCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGVmLmNoZWNrcy5maW5kKChjaCkgPT4gY2gua2luZCA9PT0gXCJiYXNlNjRcIik7XG4gICAgfVxuICAgIGdldCBpc0Jhc2U2NHVybCgpIHtcbiAgICAgICAgLy8gYmFzZTY0dXJsIGVuY29kaW5nIGlzIGEgbW9kaWZpY2F0aW9uIG9mIGJhc2U2NCB0aGF0IGNhbiBzYWZlbHkgYmUgdXNlZCBpbiBVUkxzIGFuZCBmaWxlbmFtZXNcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGVmLmNoZWNrcy5maW5kKChjaCkgPT4gY2gua2luZCA9PT0gXCJiYXNlNjR1cmxcIik7XG4gICAgfVxuICAgIGdldCBtaW5MZW5ndGgoKSB7XG4gICAgICAgIGxldCBtaW4gPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGNoIG9mIHRoaXMuX2RlZi5jaGVja3MpIHtcbiAgICAgICAgICAgIGlmIChjaC5raW5kID09PSBcIm1pblwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1pbiA9PT0gbnVsbCB8fCBjaC52YWx1ZSA+IG1pbilcbiAgICAgICAgICAgICAgICAgICAgbWluID0gY2gudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgZ2V0IG1heExlbmd0aCgpIHtcbiAgICAgICAgbGV0IG1heCA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3QgY2ggb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoLmtpbmQgPT09IFwibWF4XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF4ID09PSBudWxsIHx8IGNoLnZhbHVlIDwgbWF4KVxuICAgICAgICAgICAgICAgICAgICBtYXggPSBjaC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH1cbn1cblpvZFN0cmluZy5jcmVhdGUgPSAocGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RTdHJpbmcoe1xuICAgICAgICBjaGVja3M6IFtdLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZFN0cmluZyxcbiAgICAgICAgY29lcmNlOiBwYXJhbXM/LmNvZXJjZSA/PyBmYWxzZSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM5NjY0ODQvd2h5LWRvZXMtbW9kdWx1cy1vcGVyYXRvci1yZXR1cm4tZnJhY3Rpb25hbC1udW1iZXItaW4tamF2YXNjcmlwdC8zMTcxMTAzNCMzMTcxMTAzNFxuZnVuY3Rpb24gZmxvYXRTYWZlUmVtYWluZGVyKHZhbCwgc3RlcCkge1xuICAgIGNvbnN0IHZhbERlY0NvdW50ID0gKHZhbC50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXSB8fCBcIlwiKS5sZW5ndGg7XG4gICAgY29uc3Qgc3RlcERlY0NvdW50ID0gKHN0ZXAudG9TdHJpbmcoKS5zcGxpdChcIi5cIilbMV0gfHwgXCJcIikubGVuZ3RoO1xuICAgIGNvbnN0IGRlY0NvdW50ID0gdmFsRGVjQ291bnQgPiBzdGVwRGVjQ291bnQgPyB2YWxEZWNDb3VudCA6IHN0ZXBEZWNDb3VudDtcbiAgICBjb25zdCB2YWxJbnQgPSBOdW1iZXIucGFyc2VJbnQodmFsLnRvRml4ZWQoZGVjQ291bnQpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICBjb25zdCBzdGVwSW50ID0gTnVtYmVyLnBhcnNlSW50KHN0ZXAudG9GaXhlZChkZWNDb3VudCkucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgIHJldHVybiAodmFsSW50ICUgc3RlcEludCkgLyAxMCAqKiBkZWNDb3VudDtcbn1cbmV4cG9ydCBjbGFzcyBab2ROdW1iZXIgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5taW4gPSB0aGlzLmd0ZTtcbiAgICAgICAgdGhpcy5tYXggPSB0aGlzLmx0ZTtcbiAgICAgICAgdGhpcy5zdGVwID0gdGhpcy5tdWx0aXBsZU9mO1xuICAgIH1cbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RlZi5jb2VyY2UpIHtcbiAgICAgICAgICAgIGlucHV0LmRhdGEgPSBOdW1iZXIoaW5wdXQuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyc2VkVHlwZSA9IHRoaXMuX2dldFR5cGUoaW5wdXQpO1xuICAgICAgICBpZiAocGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5udW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUubnVtYmVyLFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN0eCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gbmV3IFBhcnNlU3RhdHVzKCk7XG4gICAgICAgIGZvciAoY29uc3QgY2hlY2sgb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoZWNrLmtpbmQgPT09IFwiaW50XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXV0aWwuaXNJbnRlZ2VyKGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogXCJpbnRlZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNlaXZlZDogXCJmbG9hdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwibWluXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b29TbWFsbCA9IGNoZWNrLmluY2x1c2l2ZSA/IGlucHV0LmRhdGEgPCBjaGVjay52YWx1ZSA6IGlucHV0LmRhdGEgPD0gY2hlY2sudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRvb1NtYWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fc21hbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiBjaGVjay52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IGNoZWNrLmluY2x1c2l2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcIm1heFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9vQmlnID0gY2hlY2suaW5jbHVzaXZlID8gaW5wdXQuZGF0YSA+IGNoZWNrLnZhbHVlIDogaW5wdXQuZGF0YSA+PSBjaGVjay52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodG9vQmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fYmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bTogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVzaXZlOiBjaGVjay5pbmNsdXNpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleGFjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJtdWx0aXBsZU9mXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmxvYXRTYWZlUmVtYWluZGVyKGlucHV0LmRhdGEsIGNoZWNrLnZhbHVlKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUubm90X211bHRpcGxlX29mLFxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGVPZjogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJmaW5pdGVcIikge1xuICAgICAgICAgICAgICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5ub3RfZmluaXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0aWwuYXNzZXJ0TmV2ZXIoY2hlY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogaW5wdXQuZGF0YSB9O1xuICAgIH1cbiAgICBndGUodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TGltaXQoXCJtaW5cIiwgdmFsdWUsIHRydWUsIGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSk7XG4gICAgfVxuICAgIGd0KHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldExpbWl0KFwibWluXCIsIHZhbHVlLCBmYWxzZSwgZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgbHRlKHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldExpbWl0KFwibWF4XCIsIHZhbHVlLCB0cnVlLCBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSkpO1xuICAgIH1cbiAgICBsdCh2YWx1ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRMaW1pdChcIm1heFwiLCB2YWx1ZSwgZmFsc2UsIGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSk7XG4gICAgfVxuICAgIHNldExpbWl0KGtpbmQsIHZhbHVlLCBpbmNsdXNpdmUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2ROdW1iZXIoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgY2hlY2tzOiBbXG4gICAgICAgICAgICAgICAgLi4udGhpcy5fZGVmLmNoZWNrcyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9hZGRDaGVjayhjaGVjaykge1xuICAgICAgICByZXR1cm4gbmV3IFpvZE51bWJlcih7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBjaGVja3M6IFsuLi50aGlzLl9kZWYuY2hlY2tzLCBjaGVja10sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpbnQobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJpbnRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBvc2l0aXZlKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibWluXCIsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIGluY2x1c2l2ZTogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBuZWdhdGl2ZShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcIm1heFwiLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICBpbmNsdXNpdmU6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbm9ucG9zaXRpdmUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtYXhcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbm9ubmVnYXRpdmUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtaW5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbXVsdGlwbGVPZih2YWx1ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtdWx0aXBsZU9mXCIsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5pdGUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJmaW5pdGVcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNhZmUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtaW5cIixcbiAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSkuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibWF4XCIsXG4gICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgbWluVmFsdWUoKSB7XG4gICAgICAgIGxldCBtaW4gPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGNoIG9mIHRoaXMuX2RlZi5jaGVja3MpIHtcbiAgICAgICAgICAgIGlmIChjaC5raW5kID09PSBcIm1pblwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1pbiA9PT0gbnVsbCB8fCBjaC52YWx1ZSA+IG1pbilcbiAgICAgICAgICAgICAgICAgICAgbWluID0gY2gudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgZ2V0IG1heFZhbHVlKCkge1xuICAgICAgICBsZXQgbWF4ID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBjaCBvZiB0aGlzLl9kZWYuY2hlY2tzKSB7XG4gICAgICAgICAgICBpZiAoY2gua2luZCA9PT0gXCJtYXhcIikge1xuICAgICAgICAgICAgICAgIGlmIChtYXggPT09IG51bGwgfHwgY2gudmFsdWUgPCBtYXgpXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IGNoLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxuICAgIGdldCBpc0ludCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGVmLmNoZWNrcy5maW5kKChjaCkgPT4gY2gua2luZCA9PT0gXCJpbnRcIiB8fCAoY2gua2luZCA9PT0gXCJtdWx0aXBsZU9mXCIgJiYgdXRpbC5pc0ludGVnZXIoY2gudmFsdWUpKSk7XG4gICAgfVxuICAgIGdldCBpc0Zpbml0ZSgpIHtcbiAgICAgICAgbGV0IG1heCA9IG51bGw7XG4gICAgICAgIGxldCBtaW4gPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGNoIG9mIHRoaXMuX2RlZi5jaGVja3MpIHtcbiAgICAgICAgICAgIGlmIChjaC5raW5kID09PSBcImZpbml0ZVwiIHx8IGNoLmtpbmQgPT09IFwiaW50XCIgfHwgY2gua2luZCA9PT0gXCJtdWx0aXBsZU9mXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoLmtpbmQgPT09IFwibWluXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWluID09PSBudWxsIHx8IGNoLnZhbHVlID4gbWluKVxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBjaC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoLmtpbmQgPT09IFwibWF4XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF4ID09PSBudWxsIHx8IGNoLnZhbHVlIDwgbWF4KVxuICAgICAgICAgICAgICAgICAgICBtYXggPSBjaC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKG1pbikgJiYgTnVtYmVyLmlzRmluaXRlKG1heCk7XG4gICAgfVxufVxuWm9kTnVtYmVyLmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZE51bWJlcih7XG4gICAgICAgIGNoZWNrczogW10sXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kTnVtYmVyLFxuICAgICAgICBjb2VyY2U6IHBhcmFtcz8uY29lcmNlIHx8IGZhbHNlLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZEJpZ0ludCBleHRlbmRzIFpvZFR5cGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLm1pbiA9IHRoaXMuZ3RlO1xuICAgICAgICB0aGlzLm1heCA9IHRoaXMubHRlO1xuICAgIH1cbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RlZi5jb2VyY2UpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuZGF0YSA9IEJpZ0ludChpbnB1dC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0SW52YWxpZElucHV0KGlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLmJpZ2ludCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEludmFsaWRJbnB1dChpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN0eCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gbmV3IFBhcnNlU3RhdHVzKCk7XG4gICAgICAgIGZvciAoY29uc3QgY2hlY2sgb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoZWNrLmtpbmQgPT09IFwibWluXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b29TbWFsbCA9IGNoZWNrLmluY2x1c2l2ZSA/IGlucHV0LmRhdGEgPCBjaGVjay52YWx1ZSA6IGlucHV0LmRhdGEgPD0gY2hlY2sudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRvb1NtYWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fc21hbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImJpZ2ludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bTogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IGNoZWNrLmluY2x1c2l2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcIm1heFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9vQmlnID0gY2hlY2suaW5jbHVzaXZlID8gaW5wdXQuZGF0YSA+IGNoZWNrLnZhbHVlIDogaW5wdXQuZGF0YSA+PSBjaGVjay52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodG9vQmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fYmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJiaWdpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW06IGNoZWNrLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVzaXZlOiBjaGVjay5pbmNsdXNpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJtdWx0aXBsZU9mXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZGF0YSAlIGNoZWNrLnZhbHVlICE9PSBCaWdJbnQoMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLm5vdF9tdWx0aXBsZV9vZixcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlT2Y6IGNoZWNrLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0aWwuYXNzZXJ0TmV2ZXIoY2hlY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogaW5wdXQuZGF0YSB9O1xuICAgIH1cbiAgICBfZ2V0SW52YWxpZElucHV0KGlucHV0KSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUuYmlnaW50LFxuICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgfVxuICAgIGd0ZSh2YWx1ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRMaW1pdChcIm1pblwiLCB2YWx1ZSwgdHJ1ZSwgZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgZ3QodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TGltaXQoXCJtaW5cIiwgdmFsdWUsIGZhbHNlLCBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSkpO1xuICAgIH1cbiAgICBsdGUodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TGltaXQoXCJtYXhcIiwgdmFsdWUsIHRydWUsIGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSk7XG4gICAgfVxuICAgIGx0KHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldExpbWl0KFwibWF4XCIsIHZhbHVlLCBmYWxzZSwgZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgc2V0TGltaXQoa2luZCwgdmFsdWUsIGluY2x1c2l2ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZEJpZ0ludCh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBjaGVja3M6IFtcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9kZWYuY2hlY2tzLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2FkZENoZWNrKGNoZWNrKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kQmlnSW50KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIGNoZWNrczogWy4uLnRoaXMuX2RlZi5jaGVja3MsIGNoZWNrXSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBvc2l0aXZlKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibWluXCIsXG4gICAgICAgICAgICB2YWx1ZTogQmlnSW50KDApLFxuICAgICAgICAgICAgaW5jbHVzaXZlOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5lZ2F0aXZlKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibWF4XCIsXG4gICAgICAgICAgICB2YWx1ZTogQmlnSW50KDApLFxuICAgICAgICAgICAgaW5jbHVzaXZlOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5vbnBvc2l0aXZlKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibWF4XCIsXG4gICAgICAgICAgICB2YWx1ZTogQmlnSW50KDApLFxuICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbm9ubmVnYXRpdmUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtaW5cIixcbiAgICAgICAgICAgIHZhbHVlOiBCaWdJbnQoMCksXG4gICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtdWx0aXBsZU9mKHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcIm11bHRpcGxlT2ZcIixcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IG1pblZhbHVlKCkge1xuICAgICAgICBsZXQgbWluID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBjaCBvZiB0aGlzLl9kZWYuY2hlY2tzKSB7XG4gICAgICAgICAgICBpZiAoY2gua2luZCA9PT0gXCJtaW5cIikge1xuICAgICAgICAgICAgICAgIGlmIChtaW4gPT09IG51bGwgfHwgY2gudmFsdWUgPiBtaW4pXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IGNoLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW47XG4gICAgfVxuICAgIGdldCBtYXhWYWx1ZSgpIHtcbiAgICAgICAgbGV0IG1heCA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3QgY2ggb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoLmtpbmQgPT09IFwibWF4XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF4ID09PSBudWxsIHx8IGNoLnZhbHVlIDwgbWF4KVxuICAgICAgICAgICAgICAgICAgICBtYXggPSBjaC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH1cbn1cblpvZEJpZ0ludC5jcmVhdGUgPSAocGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RCaWdJbnQoe1xuICAgICAgICBjaGVja3M6IFtdLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEJpZ0ludCxcbiAgICAgICAgY29lcmNlOiBwYXJhbXM/LmNvZXJjZSA/PyBmYWxzZSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2RCb29sZWFuIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLl9kZWYuY29lcmNlKSB7XG4gICAgICAgICAgICBpbnB1dC5kYXRhID0gQm9vbGVhbihpbnB1dC5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLmJvb2xlYW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUuYm9vbGVhbixcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPSyhpbnB1dC5kYXRhKTtcbiAgICB9XG59XG5ab2RCb29sZWFuLmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZEJvb2xlYW4oe1xuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEJvb2xlYW4sXG4gICAgICAgIGNvZXJjZTogcGFyYW1zPy5jb2VyY2UgfHwgZmFsc2UsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kRGF0ZSBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5fZGVmLmNvZXJjZSkge1xuICAgICAgICAgICAgaW5wdXQuZGF0YSA9IG5ldyBEYXRlKGlucHV0LmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0aGlzLl9nZXRUeXBlKGlucHV0KTtcbiAgICAgICAgaWYgKHBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUuZGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5kYXRlLFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE51bWJlci5pc05hTihpbnB1dC5kYXRhLmdldFRpbWUoKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX2RhdGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IG5ldyBQYXJzZVN0YXR1cygpO1xuICAgICAgICBsZXQgY3R4ID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKGNvbnN0IGNoZWNrIG9mIHRoaXMuX2RlZi5jaGVja3MpIHtcbiAgICAgICAgICAgIGlmIChjaGVjay5raW5kID09PSBcIm1pblwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LmRhdGEuZ2V0VGltZSgpIDwgY2hlY2sudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19zbWFsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleGFjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiBjaGVjay52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJtYXhcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5kYXRhLmdldFRpbWUoKSA+IGNoZWNrLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fYmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW06IGNoZWNrLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1dGlsLmFzc2VydE5ldmVyKGNoZWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXMudmFsdWUsXG4gICAgICAgICAgICB2YWx1ZTogbmV3IERhdGUoaW5wdXQuZGF0YS5nZXRUaW1lKCkpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBfYWRkQ2hlY2soY2hlY2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2REYXRlKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIGNoZWNrczogWy4uLnRoaXMuX2RlZi5jaGVja3MsIGNoZWNrXSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1pbihtaW5EYXRlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcIm1pblwiLFxuICAgICAgICAgICAgdmFsdWU6IG1pbkRhdGUuZ2V0VGltZSgpLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWF4KG1heERhdGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibWF4XCIsXG4gICAgICAgICAgICB2YWx1ZTogbWF4RGF0ZS5nZXRUaW1lKCksXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgbWluRGF0ZSgpIHtcbiAgICAgICAgbGV0IG1pbiA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3QgY2ggb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoLmtpbmQgPT09IFwibWluXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWluID09PSBudWxsIHx8IGNoLnZhbHVlID4gbWluKVxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBjaC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluICE9IG51bGwgPyBuZXcgRGF0ZShtaW4pIDogbnVsbDtcbiAgICB9XG4gICAgZ2V0IG1heERhdGUoKSB7XG4gICAgICAgIGxldCBtYXggPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGNoIG9mIHRoaXMuX2RlZi5jaGVja3MpIHtcbiAgICAgICAgICAgIGlmIChjaC5raW5kID09PSBcIm1heFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1heCA9PT0gbnVsbCB8fCBjaC52YWx1ZSA8IG1heClcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gY2gudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heCAhPSBudWxsID8gbmV3IERhdGUobWF4KSA6IG51bGw7XG4gICAgfVxufVxuWm9kRGF0ZS5jcmVhdGUgPSAocGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2REYXRlKHtcbiAgICAgICAgY2hlY2tzOiBbXSxcbiAgICAgICAgY29lcmNlOiBwYXJhbXM/LmNvZXJjZSB8fCBmYWxzZSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2REYXRlLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZFN5bWJvbCBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLnN5bWJvbCkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5zeW1ib2wsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT0soaW5wdXQuZGF0YSk7XG4gICAgfVxufVxuWm9kU3ltYm9sLmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZFN5bWJvbCh7XG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kU3ltYm9sLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZFVuZGVmaW5lZCBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLnVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS51bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT0soaW5wdXQuZGF0YSk7XG4gICAgfVxufVxuWm9kVW5kZWZpbmVkLmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZFVuZGVmaW5lZCh7XG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kVW5kZWZpbmVkLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZE51bGwgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVHlwZSA9IHRoaXMuX2dldFR5cGUoaW5wdXQpO1xuICAgICAgICBpZiAocGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5udWxsKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLm51bGwsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT0soaW5wdXQuZGF0YSk7XG4gICAgfVxufVxuWm9kTnVsbC5jcmVhdGUgPSAocGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2ROdWxsKHtcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2ROdWxsLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZEFueSBleHRlbmRzIFpvZFR5cGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICAvLyB0byBwcmV2ZW50IGluc3RhbmNlcyBvZiBvdGhlciBjbGFzc2VzIGZyb20gZXh0ZW5kaW5nIFpvZEFueS4gdGhpcyBjYXVzZXMgaXNzdWVzIHdpdGggY2F0Y2hhbGwgaW4gWm9kT2JqZWN0LlxuICAgICAgICB0aGlzLl9hbnkgPSB0cnVlO1xuICAgIH1cbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIE9LKGlucHV0LmRhdGEpO1xuICAgIH1cbn1cblpvZEFueS5jcmVhdGUgPSAocGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RBbnkoe1xuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEFueSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2RVbmtub3duIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIC8vIHJlcXVpcmVkXG4gICAgICAgIHRoaXMuX3Vua25vd24gPSB0cnVlO1xuICAgIH1cbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIE9LKGlucHV0LmRhdGEpO1xuICAgIH1cbn1cblpvZFVua25vd24uY3JlYXRlID0gKHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kVW5rbm93bih7XG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kVW5rbm93bixcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2ROZXZlciBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLm5ldmVyLFxuICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgfVxufVxuWm9kTmV2ZXIuY3JlYXRlID0gKHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kTmV2ZXIoe1xuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZE5ldmVyLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZFZvaWQgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVHlwZSA9IHRoaXMuX2dldFR5cGUoaW5wdXQpO1xuICAgICAgICBpZiAocGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS51bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUudm9pZCxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPSyhpbnB1dC5kYXRhKTtcbiAgICB9XG59XG5ab2RWb2lkLmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZFZvaWQoe1xuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZFZvaWQsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kQXJyYXkgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBjdHgsIHN0YXR1cyB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgY29uc3QgZGVmID0gdGhpcy5fZGVmO1xuICAgICAgICBpZiAoY3R4LnBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUuYXJyYXkpIHtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUuYXJyYXksXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmLmV4YWN0TGVuZ3RoICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCB0b29CaWcgPSBjdHguZGF0YS5sZW5ndGggPiBkZWYuZXhhY3RMZW5ndGgudmFsdWU7XG4gICAgICAgICAgICBjb25zdCB0b29TbWFsbCA9IGN0eC5kYXRhLmxlbmd0aCA8IGRlZi5leGFjdExlbmd0aC52YWx1ZTtcbiAgICAgICAgICAgIGlmICh0b29CaWcgfHwgdG9vU21hbGwpIHtcbiAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogdG9vQmlnID8gWm9kSXNzdWVDb2RlLnRvb19iaWcgOiBab2RJc3N1ZUNvZGUudG9vX3NtYWxsLFxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiAodG9vU21hbGwgPyBkZWYuZXhhY3RMZW5ndGgudmFsdWUgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgICAgICBtYXhpbXVtOiAodG9vQmlnID8gZGVmLmV4YWN0TGVuZ3RoLnZhbHVlIDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGV4YWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZWYuZXhhY3RMZW5ndGgubWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmLm1pbkxlbmd0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGN0eC5kYXRhLmxlbmd0aCA8IGRlZi5taW5MZW5ndGgudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19zbWFsbCxcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bTogZGVmLm1pbkxlbmd0aC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVmLm1pbkxlbmd0aC5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkZWYubWF4TGVuZ3RoICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY3R4LmRhdGEubGVuZ3RoID4gZGVmLm1heExlbmd0aC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUudG9vX2JpZyxcbiAgICAgICAgICAgICAgICAgICAgbWF4aW11bTogZGVmLm1heExlbmd0aC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVmLm1heExlbmd0aC5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoWy4uLmN0eC5kYXRhXS5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnR5cGUuX3BhcnNlQXN5bmMobmV3IFBhcnNlSW5wdXRMYXp5UGF0aChjdHgsIGl0ZW0sIGN0eC5wYXRoLCBpKSk7XG4gICAgICAgICAgICB9KSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBhcnNlU3RhdHVzLm1lcmdlQXJyYXkoc3RhdHVzLCByZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gWy4uLmN0eC5kYXRhXS5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkZWYudHlwZS5fcGFyc2VTeW5jKG5ldyBQYXJzZUlucHV0TGF6eVBhdGgoY3R4LCBpdGVtLCBjdHgucGF0aCwgaSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFBhcnNlU3RhdHVzLm1lcmdlQXJyYXkoc3RhdHVzLCByZXN1bHQpO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi50eXBlO1xuICAgIH1cbiAgICBtaW4obWluTGVuZ3RoLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kQXJyYXkoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgbWluTGVuZ3RoOiB7IHZhbHVlOiBtaW5MZW5ndGgsIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWF4KG1heExlbmd0aCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZEFycmF5KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIG1heExlbmd0aDogeyB2YWx1ZTogbWF4TGVuZ3RoLCBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSkgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxlbmd0aChsZW4sIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RBcnJheSh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBleGFjdExlbmd0aDogeyB2YWx1ZTogbGVuLCBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSkgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5vbmVtcHR5KG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWluKDEsIG1lc3NhZ2UpO1xuICAgIH1cbn1cblpvZEFycmF5LmNyZWF0ZSA9IChzY2hlbWEsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kQXJyYXkoe1xuICAgICAgICB0eXBlOiBzY2hlbWEsXG4gICAgICAgIG1pbkxlbmd0aDogbnVsbCxcbiAgICAgICAgbWF4TGVuZ3RoOiBudWxsLFxuICAgICAgICBleGFjdExlbmd0aDogbnVsbCxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RBcnJheSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmZ1bmN0aW9uIGRlZXBQYXJ0aWFsaWZ5KHNjaGVtYSkge1xuICAgIGlmIChzY2hlbWEgaW5zdGFuY2VvZiBab2RPYmplY3QpIHtcbiAgICAgICAgY29uc3QgbmV3U2hhcGUgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hLnNoYXBlKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFNjaGVtYSA9IHNjaGVtYS5zaGFwZVtrZXldO1xuICAgICAgICAgICAgbmV3U2hhcGVba2V5XSA9IFpvZE9wdGlvbmFsLmNyZWF0ZShkZWVwUGFydGlhbGlmeShmaWVsZFNjaGVtYSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIC4uLnNjaGVtYS5fZGVmLFxuICAgICAgICAgICAgc2hhcGU6ICgpID0+IG5ld1NoYXBlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2NoZW1hIGluc3RhbmNlb2YgWm9kQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RBcnJheSh7XG4gICAgICAgICAgICAuLi5zY2hlbWEuX2RlZixcbiAgICAgICAgICAgIHR5cGU6IGRlZXBQYXJ0aWFsaWZ5KHNjaGVtYS5lbGVtZW50KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNjaGVtYSBpbnN0YW5jZW9mIFpvZE9wdGlvbmFsKSB7XG4gICAgICAgIHJldHVybiBab2RPcHRpb25hbC5jcmVhdGUoZGVlcFBhcnRpYWxpZnkoc2NoZW1hLnVud3JhcCgpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNjaGVtYSBpbnN0YW5jZW9mIFpvZE51bGxhYmxlKSB7XG4gICAgICAgIHJldHVybiBab2ROdWxsYWJsZS5jcmVhdGUoZGVlcFBhcnRpYWxpZnkoc2NoZW1hLnVud3JhcCgpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNjaGVtYSBpbnN0YW5jZW9mIFpvZFR1cGxlKSB7XG4gICAgICAgIHJldHVybiBab2RUdXBsZS5jcmVhdGUoc2NoZW1hLml0ZW1zLm1hcCgoaXRlbSkgPT4gZGVlcFBhcnRpYWxpZnkoaXRlbSkpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFpvZE9iamVjdCBleHRlbmRzIFpvZFR5cGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLl9jYWNoZWQgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgSW4gbW9zdCBjYXNlcywgdGhpcyBpcyBubyBsb25nZXIgbmVlZGVkIC0gdW5rbm93biBwcm9wZXJ0aWVzIGFyZSBub3cgc2lsZW50bHkgc3RyaXBwZWQuXG4gICAgICAgICAqIElmIHlvdSB3YW50IHRvIHBhc3MgdGhyb3VnaCB1bmtub3duIHByb3BlcnRpZXMsIHVzZSBgLnBhc3N0aHJvdWdoKClgIGluc3RlYWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5vbnN0cmljdCA9IHRoaXMucGFzc3Rocm91Z2g7XG4gICAgICAgIC8vIGV4dGVuZDxcbiAgICAgICAgLy8gICBBdWdtZW50YXRpb24gZXh0ZW5kcyBab2RSYXdTaGFwZSxcbiAgICAgICAgLy8gICBOZXdPdXRwdXQgZXh0ZW5kcyB1dGlsLmZsYXR0ZW48e1xuICAgICAgICAvLyAgICAgW2sgaW4ga2V5b2YgQXVnbWVudGF0aW9uIHwga2V5b2YgT3V0cHV0XTogayBleHRlbmRzIGtleW9mIEF1Z21lbnRhdGlvblxuICAgICAgICAvLyAgICAgICA/IEF1Z21lbnRhdGlvbltrXVtcIl9vdXRwdXRcIl1cbiAgICAgICAgLy8gICAgICAgOiBrIGV4dGVuZHMga2V5b2YgT3V0cHV0XG4gICAgICAgIC8vICAgICAgID8gT3V0cHV0W2tdXG4gICAgICAgIC8vICAgICAgIDogbmV2ZXI7XG4gICAgICAgIC8vICAgfT4sXG4gICAgICAgIC8vICAgTmV3SW5wdXQgZXh0ZW5kcyB1dGlsLmZsYXR0ZW48e1xuICAgICAgICAvLyAgICAgW2sgaW4ga2V5b2YgQXVnbWVudGF0aW9uIHwga2V5b2YgSW5wdXRdOiBrIGV4dGVuZHMga2V5b2YgQXVnbWVudGF0aW9uXG4gICAgICAgIC8vICAgICAgID8gQXVnbWVudGF0aW9uW2tdW1wiX2lucHV0XCJdXG4gICAgICAgIC8vICAgICAgIDogayBleHRlbmRzIGtleW9mIElucHV0XG4gICAgICAgIC8vICAgICAgID8gSW5wdXRba11cbiAgICAgICAgLy8gICAgICAgOiBuZXZlcjtcbiAgICAgICAgLy8gICB9PlxuICAgICAgICAvLyA+KFxuICAgICAgICAvLyAgIGF1Z21lbnRhdGlvbjogQXVnbWVudGF0aW9uXG4gICAgICAgIC8vICk6IFpvZE9iamVjdDxcbiAgICAgICAgLy8gICBleHRlbmRTaGFwZTxULCBBdWdtZW50YXRpb24+LFxuICAgICAgICAvLyAgIFVua25vd25LZXlzLFxuICAgICAgICAvLyAgIENhdGNoYWxsLFxuICAgICAgICAvLyAgIE5ld091dHB1dCxcbiAgICAgICAgLy8gICBOZXdJbnB1dFxuICAgICAgICAvLyA+IHtcbiAgICAgICAgLy8gICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgIC8vICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgIC8vICAgICBzaGFwZTogKCkgPT4gKHtcbiAgICAgICAgLy8gICAgICAgLi4udGhpcy5fZGVmLnNoYXBlKCksXG4gICAgICAgIC8vICAgICAgIC4uLmF1Z21lbnRhdGlvbixcbiAgICAgICAgLy8gICAgIH0pLFxuICAgICAgICAvLyAgIH0pIGFzIGFueTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgVXNlIGAuZXh0ZW5kYCBpbnN0ZWFkXG4gICAgICAgICAqICAqL1xuICAgICAgICB0aGlzLmF1Z21lbnQgPSB0aGlzLmV4dGVuZDtcbiAgICB9XG4gICAgX2dldENhY2hlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlZCAhPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIGNvbnN0IHNoYXBlID0gdGhpcy5fZGVmLnNoYXBlKCk7XG4gICAgICAgIGNvbnN0IGtleXMgPSB1dGlsLm9iamVjdEtleXMoc2hhcGUpO1xuICAgICAgICB0aGlzLl9jYWNoZWQgPSB7IHNoYXBlLCBrZXlzIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZWQ7XG4gICAgfVxuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLm9iamVjdCkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5vYmplY3QsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHN0YXR1cywgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBjb25zdCB7IHNoYXBlLCBrZXlzOiBzaGFwZUtleXMgfSA9IHRoaXMuX2dldENhY2hlZCgpO1xuICAgICAgICBjb25zdCBleHRyYUtleXMgPSBbXTtcbiAgICAgICAgaWYgKCEodGhpcy5fZGVmLmNhdGNoYWxsIGluc3RhbmNlb2YgWm9kTmV2ZXIgJiYgdGhpcy5fZGVmLnVua25vd25LZXlzID09PSBcInN0cmlwXCIpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjdHguZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICghc2hhcGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFpcnMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Ygc2hhcGVLZXlzKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlWYWxpZGF0b3IgPSBzaGFwZVtrZXldO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdHguZGF0YVtrZXldO1xuICAgICAgICAgICAgcGFpcnMucHVzaCh7XG4gICAgICAgICAgICAgICAga2V5OiB7IHN0YXR1czogXCJ2YWxpZFwiLCB2YWx1ZToga2V5IH0sXG4gICAgICAgICAgICAgICAgdmFsdWU6IGtleVZhbGlkYXRvci5fcGFyc2UobmV3IFBhcnNlSW5wdXRMYXp5UGF0aChjdHgsIHZhbHVlLCBjdHgucGF0aCwga2V5KSksXG4gICAgICAgICAgICAgICAgYWx3YXlzU2V0OiBrZXkgaW4gY3R4LmRhdGEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZGVmLmNhdGNoYWxsIGluc3RhbmNlb2YgWm9kTmV2ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHVua25vd25LZXlzID0gdGhpcy5fZGVmLnVua25vd25LZXlzO1xuICAgICAgICAgICAgaWYgKHVua25vd25LZXlzID09PSBcInBhc3N0aHJvdWdoXCIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBleHRyYUtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFpcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHsgc3RhdHVzOiBcInZhbGlkXCIsIHZhbHVlOiBrZXkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7IHN0YXR1czogXCJ2YWxpZFwiLCB2YWx1ZTogY3R4LmRhdGFba2V5XSB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh1bmtub3duS2V5cyA9PT0gXCJzdHJpY3RcIikge1xuICAgICAgICAgICAgICAgIGlmIChleHRyYUtleXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS51bnJlY29nbml6ZWRfa2V5cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IGV4dHJhS2V5cyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHVua25vd25LZXlzID09PSBcInN0cmlwXCIpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW50ZXJuYWwgWm9kT2JqZWN0IGVycm9yOiBpbnZhbGlkIHVua25vd25LZXlzIHZhbHVlLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gcnVuIGNhdGNoYWxsIHZhbGlkYXRpb25cbiAgICAgICAgICAgIGNvbnN0IGNhdGNoYWxsID0gdGhpcy5fZGVmLmNhdGNoYWxsO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgZXh0cmFLZXlzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdHguZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIHBhaXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IHsgc3RhdHVzOiBcInZhbGlkXCIsIHZhbHVlOiBrZXkgfSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNhdGNoYWxsLl9wYXJzZShuZXcgUGFyc2VJbnB1dExhenlQYXRoKGN0eCwgdmFsdWUsIGN0eC5wYXRoLCBrZXkpIC8vLCBjdHguY2hpbGQoa2V5KSwgdmFsdWUsIGdldFBhcnNlZFR5cGUodmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIGFsd2F5c1NldDoga2V5IGluIGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgICAgICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3luY1BhaXJzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYWlyIG9mIHBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGF3YWl0IHBhaXIua2V5O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IHBhaXIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHN5bmNQYWlycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWx3YXlzU2V0OiBwYWlyLmFsd2F5c1NldCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzeW5jUGFpcnM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChzeW5jUGFpcnMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUGFyc2VTdGF0dXMubWVyZ2VPYmplY3RTeW5jKHN0YXR1cywgc3luY1BhaXJzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFBhcnNlU3RhdHVzLm1lcmdlT2JqZWN0U3luYyhzdGF0dXMsIHBhaXJzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgc2hhcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuc2hhcGUoKTtcbiAgICB9XG4gICAgc3RyaWN0KG1lc3NhZ2UpIHtcbiAgICAgICAgZXJyb3JVdGlsLmVyclRvT2JqO1xuICAgICAgICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICB1bmtub3duS2V5czogXCJzdHJpY3RcIixcbiAgICAgICAgICAgIC4uLihtZXNzYWdlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNYXA6IChpc3N1ZSwgY3R4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0RXJyb3IgPSB0aGlzLl9kZWYuZXJyb3JNYXA/Lihpc3N1ZSwgY3R4KS5tZXNzYWdlID8/IGN0eC5kZWZhdWx0RXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNzdWUuY29kZSA9PT0gXCJ1bnJlY29nbml6ZWRfa2V5c1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKS5tZXNzYWdlID8/IGRlZmF1bHRFcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZWZhdWx0RXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0cmlwKCkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICB1bmtub3duS2V5czogXCJzdHJpcFwiLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcGFzc3Rocm91Z2goKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIHVua25vd25LZXlzOiBcInBhc3N0aHJvdWdoXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBjb25zdCBBdWdtZW50RmFjdG9yeSA9XG4gICAgLy8gICA8RGVmIGV4dGVuZHMgWm9kT2JqZWN0RGVmPihkZWY6IERlZikgPT5cbiAgICAvLyAgIDxBdWdtZW50YXRpb24gZXh0ZW5kcyBab2RSYXdTaGFwZT4oXG4gICAgLy8gICAgIGF1Z21lbnRhdGlvbjogQXVnbWVudGF0aW9uXG4gICAgLy8gICApOiBab2RPYmplY3Q8XG4gICAgLy8gICAgIGV4dGVuZFNoYXBlPFJldHVyblR5cGU8RGVmW1wic2hhcGVcIl0+LCBBdWdtZW50YXRpb24+LFxuICAgIC8vICAgICBEZWZbXCJ1bmtub3duS2V5c1wiXSxcbiAgICAvLyAgICAgRGVmW1wiY2F0Y2hhbGxcIl1cbiAgICAvLyAgID4gPT4ge1xuICAgIC8vICAgICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgLy8gICAgICAgLi4uZGVmLFxuICAgIC8vICAgICAgIHNoYXBlOiAoKSA9PiAoe1xuICAgIC8vICAgICAgICAgLi4uZGVmLnNoYXBlKCksXG4gICAgLy8gICAgICAgICAuLi5hdWdtZW50YXRpb24sXG4gICAgLy8gICAgICAgfSksXG4gICAgLy8gICAgIH0pIGFzIGFueTtcbiAgICAvLyAgIH07XG4gICAgZXh0ZW5kKGF1Z21lbnRhdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBzaGFwZTogKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9kZWYuc2hhcGUoKSxcbiAgICAgICAgICAgICAgICAuLi5hdWdtZW50YXRpb24sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByaW9yIHRvIHpvZEAxLjAuMTIgdGhlcmUgd2FzIGEgYnVnIGluIHRoZVxuICAgICAqIGluZmVycmVkIHR5cGUgb2YgbWVyZ2VkIG9iamVjdHMuIFBsZWFzZVxuICAgICAqIHVwZ3JhZGUgaWYgeW91IGFyZSBleHBlcmllbmNpbmcgaXNzdWVzLlxuICAgICAqL1xuICAgIG1lcmdlKG1lcmdpbmcpIHtcbiAgICAgICAgY29uc3QgbWVyZ2VkID0gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgICAgICB1bmtub3duS2V5czogbWVyZ2luZy5fZGVmLnVua25vd25LZXlzLFxuICAgICAgICAgICAgY2F0Y2hhbGw6IG1lcmdpbmcuX2RlZi5jYXRjaGFsbCxcbiAgICAgICAgICAgIHNoYXBlOiAoKSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX2RlZi5zaGFwZSgpLFxuICAgICAgICAgICAgICAgIC4uLm1lcmdpbmcuX2RlZi5zaGFwZSgpLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZE9iamVjdCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtZXJnZWQ7XG4gICAgfVxuICAgIC8vIG1lcmdlPFxuICAgIC8vICAgSW5jb21pbmcgZXh0ZW5kcyBBbnlab2RPYmplY3QsXG4gICAgLy8gICBBdWdtZW50YXRpb24gZXh0ZW5kcyBJbmNvbWluZ1tcInNoYXBlXCJdLFxuICAgIC8vICAgTmV3T3V0cHV0IGV4dGVuZHMge1xuICAgIC8vICAgICBbayBpbiBrZXlvZiBBdWdtZW50YXRpb24gfCBrZXlvZiBPdXRwdXRdOiBrIGV4dGVuZHMga2V5b2YgQXVnbWVudGF0aW9uXG4gICAgLy8gICAgICAgPyBBdWdtZW50YXRpb25ba11bXCJfb3V0cHV0XCJdXG4gICAgLy8gICAgICAgOiBrIGV4dGVuZHMga2V5b2YgT3V0cHV0XG4gICAgLy8gICAgICAgPyBPdXRwdXRba11cbiAgICAvLyAgICAgICA6IG5ldmVyO1xuICAgIC8vICAgfSxcbiAgICAvLyAgIE5ld0lucHV0IGV4dGVuZHMge1xuICAgIC8vICAgICBbayBpbiBrZXlvZiBBdWdtZW50YXRpb24gfCBrZXlvZiBJbnB1dF06IGsgZXh0ZW5kcyBrZXlvZiBBdWdtZW50YXRpb25cbiAgICAvLyAgICAgICA/IEF1Z21lbnRhdGlvbltrXVtcIl9pbnB1dFwiXVxuICAgIC8vICAgICAgIDogayBleHRlbmRzIGtleW9mIElucHV0XG4gICAgLy8gICAgICAgPyBJbnB1dFtrXVxuICAgIC8vICAgICAgIDogbmV2ZXI7XG4gICAgLy8gICB9XG4gICAgLy8gPihcbiAgICAvLyAgIG1lcmdpbmc6IEluY29taW5nXG4gICAgLy8gKTogWm9kT2JqZWN0PFxuICAgIC8vICAgZXh0ZW5kU2hhcGU8VCwgUmV0dXJuVHlwZTxJbmNvbWluZ1tcIl9kZWZcIl1bXCJzaGFwZVwiXT4+LFxuICAgIC8vICAgSW5jb21pbmdbXCJfZGVmXCJdW1widW5rbm93bktleXNcIl0sXG4gICAgLy8gICBJbmNvbWluZ1tcIl9kZWZcIl1bXCJjYXRjaGFsbFwiXSxcbiAgICAvLyAgIE5ld091dHB1dCxcbiAgICAvLyAgIE5ld0lucHV0XG4gICAgLy8gPiB7XG4gICAgLy8gICBjb25zdCBtZXJnZWQ6IGFueSA9IG5ldyBab2RPYmplY3Qoe1xuICAgIC8vICAgICB1bmtub3duS2V5czogbWVyZ2luZy5fZGVmLnVua25vd25LZXlzLFxuICAgIC8vICAgICBjYXRjaGFsbDogbWVyZ2luZy5fZGVmLmNhdGNoYWxsLFxuICAgIC8vICAgICBzaGFwZTogKCkgPT5cbiAgICAvLyAgICAgICBvYmplY3RVdGlsLm1lcmdlU2hhcGVzKHRoaXMuX2RlZi5zaGFwZSgpLCBtZXJnaW5nLl9kZWYuc2hhcGUoKSksXG4gICAgLy8gICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kT2JqZWN0LFxuICAgIC8vICAgfSkgYXMgYW55O1xuICAgIC8vICAgcmV0dXJuIG1lcmdlZDtcbiAgICAvLyB9XG4gICAgc2V0S2V5KGtleSwgc2NoZW1hKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1Z21lbnQoeyBba2V5XTogc2NoZW1hIH0pO1xuICAgIH1cbiAgICAvLyBtZXJnZTxJbmNvbWluZyBleHRlbmRzIEFueVpvZE9iamVjdD4oXG4gICAgLy8gICBtZXJnaW5nOiBJbmNvbWluZ1xuICAgIC8vICk6IC8vWm9kT2JqZWN0PFQgJiBJbmNvbWluZ1tcIl9zaGFwZVwiXSwgVW5rbm93bktleXMsIENhdGNoYWxsPiA9IChtZXJnaW5nKSA9PiB7XG4gICAgLy8gWm9kT2JqZWN0PFxuICAgIC8vICAgZXh0ZW5kU2hhcGU8VCwgUmV0dXJuVHlwZTxJbmNvbWluZ1tcIl9kZWZcIl1bXCJzaGFwZVwiXT4+LFxuICAgIC8vICAgSW5jb21pbmdbXCJfZGVmXCJdW1widW5rbm93bktleXNcIl0sXG4gICAgLy8gICBJbmNvbWluZ1tcIl9kZWZcIl1bXCJjYXRjaGFsbFwiXVxuICAgIC8vID4ge1xuICAgIC8vICAgLy8gY29uc3QgbWVyZ2VkU2hhcGUgPSBvYmplY3RVdGlsLm1lcmdlU2hhcGVzKFxuICAgIC8vICAgLy8gICB0aGlzLl9kZWYuc2hhcGUoKSxcbiAgICAvLyAgIC8vICAgbWVyZ2luZy5fZGVmLnNoYXBlKClcbiAgICAvLyAgIC8vICk7XG4gICAgLy8gICBjb25zdCBtZXJnZWQ6IGFueSA9IG5ldyBab2RPYmplY3Qoe1xuICAgIC8vICAgICB1bmtub3duS2V5czogbWVyZ2luZy5fZGVmLnVua25vd25LZXlzLFxuICAgIC8vICAgICBjYXRjaGFsbDogbWVyZ2luZy5fZGVmLmNhdGNoYWxsLFxuICAgIC8vICAgICBzaGFwZTogKCkgPT5cbiAgICAvLyAgICAgICBvYmplY3RVdGlsLm1lcmdlU2hhcGVzKHRoaXMuX2RlZi5zaGFwZSgpLCBtZXJnaW5nLl9kZWYuc2hhcGUoKSksXG4gICAgLy8gICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kT2JqZWN0LFxuICAgIC8vICAgfSkgYXMgYW55O1xuICAgIC8vICAgcmV0dXJuIG1lcmdlZDtcbiAgICAvLyB9XG4gICAgY2F0Y2hhbGwoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RPYmplY3Qoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgY2F0Y2hhbGw6IGluZGV4LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcGljayhtYXNrKSB7XG4gICAgICAgIGNvbnN0IHNoYXBlID0ge307XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHV0aWwub2JqZWN0S2V5cyhtYXNrKSkge1xuICAgICAgICAgICAgaWYgKG1hc2tba2V5XSAmJiB0aGlzLnNoYXBlW2tleV0pIHtcbiAgICAgICAgICAgICAgICBzaGFwZVtrZXldID0gdGhpcy5zaGFwZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIHNoYXBlOiAoKSA9PiBzaGFwZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9taXQobWFzaykge1xuICAgICAgICBjb25zdCBzaGFwZSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB1dGlsLm9iamVjdEtleXModGhpcy5zaGFwZSkpIHtcbiAgICAgICAgICAgIGlmICghbWFza1trZXldKSB7XG4gICAgICAgICAgICAgICAgc2hhcGVba2V5XSA9IHRoaXMuc2hhcGVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBzaGFwZTogKCkgPT4gc2hhcGUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIGRlZXBQYXJ0aWFsKCkge1xuICAgICAgICByZXR1cm4gZGVlcFBhcnRpYWxpZnkodGhpcyk7XG4gICAgfVxuICAgIHBhcnRpYWwobWFzaykge1xuICAgICAgICBjb25zdCBuZXdTaGFwZSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB1dGlsLm9iamVjdEtleXModGhpcy5zaGFwZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkU2NoZW1hID0gdGhpcy5zaGFwZVtrZXldO1xuICAgICAgICAgICAgaWYgKG1hc2sgJiYgIW1hc2tba2V5XSkge1xuICAgICAgICAgICAgICAgIG5ld1NoYXBlW2tleV0gPSBmaWVsZFNjaGVtYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1NoYXBlW2tleV0gPSBmaWVsZFNjaGVtYS5vcHRpb25hbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIHNoYXBlOiAoKSA9PiBuZXdTaGFwZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlcXVpcmVkKG1hc2spIHtcbiAgICAgICAgY29uc3QgbmV3U2hhcGUgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdXRpbC5vYmplY3RLZXlzKHRoaXMuc2hhcGUpKSB7XG4gICAgICAgICAgICBpZiAobWFzayAmJiAhbWFza1trZXldKSB7XG4gICAgICAgICAgICAgICAgbmV3U2hhcGVba2V5XSA9IHRoaXMuc2hhcGVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkU2NoZW1hID0gdGhpcy5zaGFwZVtrZXldO1xuICAgICAgICAgICAgICAgIGxldCBuZXdGaWVsZCA9IGZpZWxkU2NoZW1hO1xuICAgICAgICAgICAgICAgIHdoaWxlIChuZXdGaWVsZCBpbnN0YW5jZW9mIFpvZE9wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpZWxkID0gbmV3RmllbGQuX2RlZi5pbm5lclR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld1NoYXBlW2tleV0gPSBuZXdGaWVsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBzaGFwZTogKCkgPT4gbmV3U2hhcGUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBrZXlvZigpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVpvZEVudW0odXRpbC5vYmplY3RLZXlzKHRoaXMuc2hhcGUpKTtcbiAgICB9XG59XG5ab2RPYmplY3QuY3JlYXRlID0gKHNoYXBlLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgIHNoYXBlOiAoKSA9PiBzaGFwZSxcbiAgICAgICAgdW5rbm93bktleXM6IFwic3RyaXBcIixcbiAgICAgICAgY2F0Y2hhbGw6IFpvZE5ldmVyLmNyZWF0ZSgpLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZE9iamVjdCxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcblpvZE9iamVjdC5zdHJpY3RDcmVhdGUgPSAoc2hhcGUsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgc2hhcGU6ICgpID0+IHNoYXBlLFxuICAgICAgICB1bmtub3duS2V5czogXCJzdHJpY3RcIixcbiAgICAgICAgY2F0Y2hhbGw6IFpvZE5ldmVyLmNyZWF0ZSgpLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZE9iamVjdCxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcblpvZE9iamVjdC5sYXp5Y3JlYXRlID0gKHNoYXBlLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgIHNoYXBlLFxuICAgICAgICB1bmtub3duS2V5czogXCJzdHJpcFwiLFxuICAgICAgICBjYXRjaGFsbDogWm9kTmV2ZXIuY3JlYXRlKCksXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kT2JqZWN0LFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZFVuaW9uIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fZGVmLm9wdGlvbnM7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlc3VsdHMocmVzdWx0cykge1xuICAgICAgICAgICAgLy8gcmV0dXJuIGZpcnN0IGlzc3VlLWZyZWUgdmFsaWRhdGlvbiBpZiBpdCBleGlzdHNcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdC5zdGF0dXMgPT09IFwidmFsaWRcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQuc3RhdHVzID09PSBcImRpcnR5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGlzc3VlcyBmcm9tIGRpcnR5IG9wdGlvblxuICAgICAgICAgICAgICAgICAgICBjdHguY29tbW9uLmlzc3Vlcy5wdXNoKC4uLnJlc3VsdC5jdHguY29tbW9uLmlzc3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQucmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJldHVybiBpbnZhbGlkXG4gICAgICAgICAgICBjb25zdCB1bmlvbkVycm9ycyA9IHJlc3VsdHMubWFwKChyZXN1bHQpID0+IG5ldyBab2RFcnJvcihyZXN1bHQuY3R4LmNvbW1vbi5pc3N1ZXMpKTtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3VuaW9uLFxuICAgICAgICAgICAgICAgIHVuaW9uRXJyb3JzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3R4LmNvbW1vbi5hc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKG9wdGlvbnMubWFwKGFzeW5jIChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZEN0eCA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uY3R4LFxuICAgICAgICAgICAgICAgICAgICBjb21tb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmN0eC5jb21tb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBpc3N1ZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IGF3YWl0IG9wdGlvbi5fcGFyc2VBc3luYyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBjaGlsZEN0eCxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGN0eDogY2hpbGRDdHgsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKS50aGVuKGhhbmRsZVJlc3VsdHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGRpcnR5ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgaXNzdWVzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDdHggPSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmN0eCxcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5jdHguY29tbW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNzdWVzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gb3B0aW9uLl9wYXJzZVN5bmMoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogY2hpbGRDdHgsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IFwidmFsaWRcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXN1bHQuc3RhdHVzID09PSBcImRpcnR5XCIgJiYgIWRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRpcnR5ID0geyByZXN1bHQsIGN0eDogY2hpbGRDdHggfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkQ3R4LmNvbW1vbi5pc3N1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzc3Vlcy5wdXNoKGNoaWxkQ3R4LmNvbW1vbi5pc3N1ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkaXJ0eSkge1xuICAgICAgICAgICAgICAgIGN0eC5jb21tb24uaXNzdWVzLnB1c2goLi4uZGlydHkuY3R4LmNvbW1vbi5pc3N1ZXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXJ0eS5yZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB1bmlvbkVycm9ycyA9IGlzc3Vlcy5tYXAoKGlzc3VlcykgPT4gbmV3IFpvZEVycm9yKGlzc3VlcykpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdW5pb24sXG4gICAgICAgICAgICAgICAgdW5pb25FcnJvcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLm9wdGlvbnM7XG4gICAgfVxufVxuWm9kVW5pb24uY3JlYXRlID0gKHR5cGVzLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZFVuaW9uKHtcbiAgICAgICAgb3B0aW9uczogdHlwZXMsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kVW5pb24sXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vXG4vLy8vLy8vLy8vICAgICAgWm9kRGlzY3JpbWluYXRlZFVuaW9uICAgICAgLy8vLy8vLy8vL1xuLy8vLy8vLy8vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY29uc3QgZ2V0RGlzY3JpbWluYXRvciA9ICh0eXBlKSA9PiB7XG4gICAgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2RMYXp5KSB7XG4gICAgICAgIHJldHVybiBnZXREaXNjcmltaW5hdG9yKHR5cGUuc2NoZW1hKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZEVmZmVjdHMpIHtcbiAgICAgICAgcmV0dXJuIGdldERpc2NyaW1pbmF0b3IodHlwZS5pbm5lclR5cGUoKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2RMaXRlcmFsKSB7XG4gICAgICAgIHJldHVybiBbdHlwZS52YWx1ZV07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2RFbnVtKSB7XG4gICAgICAgIHJldHVybiB0eXBlLm9wdGlvbnM7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2ROYXRpdmVFbnVtKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBiYW4vYmFuXG4gICAgICAgIHJldHVybiB1dGlsLm9iamVjdFZhbHVlcyh0eXBlLmVudW0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlIGluc3RhbmNlb2YgWm9kRGVmYXVsdCkge1xuICAgICAgICByZXR1cm4gZ2V0RGlzY3JpbWluYXRvcih0eXBlLl9kZWYuaW5uZXJUeXBlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZFVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gW3VuZGVmaW5lZF07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2ROdWxsKSB7XG4gICAgICAgIHJldHVybiBbbnVsbF07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2RPcHRpb25hbCkge1xuICAgICAgICByZXR1cm4gW3VuZGVmaW5lZCwgLi4uZ2V0RGlzY3JpbWluYXRvcih0eXBlLnVud3JhcCgpKV07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2ROdWxsYWJsZSkge1xuICAgICAgICByZXR1cm4gW251bGwsIC4uLmdldERpc2NyaW1pbmF0b3IodHlwZS51bndyYXAoKSldO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlIGluc3RhbmNlb2YgWm9kQnJhbmRlZCkge1xuICAgICAgICByZXR1cm4gZ2V0RGlzY3JpbWluYXRvcih0eXBlLnVud3JhcCgpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZFJlYWRvbmx5KSB7XG4gICAgICAgIHJldHVybiBnZXREaXNjcmltaW5hdG9yKHR5cGUudW53cmFwKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlIGluc3RhbmNlb2YgWm9kQ2F0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGdldERpc2NyaW1pbmF0b3IodHlwZS5fZGVmLmlubmVyVHlwZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxufTtcbmV4cG9ydCBjbGFzcyBab2REaXNjcmltaW5hdGVkVW5pb24gZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGlmIChjdHgucGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5vYmplY3QpIHtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUub2JqZWN0LFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlzY3JpbWluYXRvciA9IHRoaXMuZGlzY3JpbWluYXRvcjtcbiAgICAgICAgY29uc3QgZGlzY3JpbWluYXRvclZhbHVlID0gY3R4LmRhdGFbZGlzY3JpbWluYXRvcl07XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMub3B0aW9uc01hcC5nZXQoZGlzY3JpbWluYXRvclZhbHVlKTtcbiAgICAgICAgaWYgKCFvcHRpb24pIHtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3VuaW9uX2Rpc2NyaW1pbmF0b3IsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogQXJyYXkuZnJvbSh0aGlzLm9wdGlvbnNNYXAua2V5cygpKSxcbiAgICAgICAgICAgICAgICBwYXRoOiBbZGlzY3JpbWluYXRvcl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLl9wYXJzZUFzeW5jKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5fcGFyc2VTeW5jKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBkaXNjcmltaW5hdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLmRpc2NyaW1pbmF0b3I7XG4gICAgfVxuICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLm9wdGlvbnM7XG4gICAgfVxuICAgIGdldCBvcHRpb25zTWFwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLm9wdGlvbnNNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgZGlzY3JpbWluYXRlZCB1bmlvbiBzY2hlbWEuIEl0cyBiZWhhdmlvdXIgaXMgdmVyeSBzaW1pbGFyIHRvIHRoYXQgb2YgdGhlIG5vcm1hbCB6LnVuaW9uKCkgY29uc3RydWN0b3IuXG4gICAgICogSG93ZXZlciwgaXQgb25seSBhbGxvd3MgYSB1bmlvbiBvZiBvYmplY3RzLCBhbGwgb2Ygd2hpY2ggbmVlZCB0byBzaGFyZSBhIGRpc2NyaW1pbmF0b3IgcHJvcGVydHkuIFRoaXMgcHJvcGVydHkgbXVzdFxuICAgICAqIGhhdmUgYSBkaWZmZXJlbnQgdmFsdWUgZm9yIGVhY2ggb2JqZWN0IGluIHRoZSB1bmlvbi5cbiAgICAgKiBAcGFyYW0gZGlzY3JpbWluYXRvciB0aGUgbmFtZSBvZiB0aGUgZGlzY3JpbWluYXRvciBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB0eXBlcyBhbiBhcnJheSBvZiBvYmplY3Qgc2NoZW1hc1xuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKGRpc2NyaW1pbmF0b3IsIG9wdGlvbnMsIHBhcmFtcykge1xuICAgICAgICAvLyBHZXQgYWxsIHRoZSB2YWxpZCBkaXNjcmltaW5hdG9yIHZhbHVlc1xuICAgICAgICBjb25zdCBvcHRpb25zTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAvLyB0cnkge1xuICAgICAgICBmb3IgKGNvbnN0IHR5cGUgb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgZGlzY3JpbWluYXRvclZhbHVlcyA9IGdldERpc2NyaW1pbmF0b3IodHlwZS5zaGFwZVtkaXNjcmltaW5hdG9yXSk7XG4gICAgICAgICAgICBpZiAoIWRpc2NyaW1pbmF0b3JWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBIGRpc2NyaW1pbmF0b3IgdmFsdWUgZm9yIGtleSBcXGAke2Rpc2NyaW1pbmF0b3J9XFxgIGNvdWxkIG5vdCBiZSBleHRyYWN0ZWQgZnJvbSBhbGwgc2NoZW1hIG9wdGlvbnNgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgZGlzY3JpbWluYXRvclZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zTWFwLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEaXNjcmltaW5hdG9yIHByb3BlcnR5ICR7U3RyaW5nKGRpc2NyaW1pbmF0b3IpfSBoYXMgZHVwbGljYXRlIHZhbHVlICR7U3RyaW5nKHZhbHVlKX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc01hcC5zZXQodmFsdWUsIHR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgWm9kRGlzY3JpbWluYXRlZFVuaW9uKHtcbiAgICAgICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kRGlzY3JpbWluYXRlZFVuaW9uLFxuICAgICAgICAgICAgZGlzY3JpbWluYXRvcixcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICBvcHRpb25zTWFwLFxuICAgICAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBtZXJnZVZhbHVlcyhhLCBiKSB7XG4gICAgY29uc3QgYVR5cGUgPSBnZXRQYXJzZWRUeXBlKGEpO1xuICAgIGNvbnN0IGJUeXBlID0gZ2V0UGFyc2VkVHlwZShiKTtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSwgZGF0YTogYSB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChhVHlwZSA9PT0gWm9kUGFyc2VkVHlwZS5vYmplY3QgJiYgYlR5cGUgPT09IFpvZFBhcnNlZFR5cGUub2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IGJLZXlzID0gdXRpbC5vYmplY3RLZXlzKGIpO1xuICAgICAgICBjb25zdCBzaGFyZWRLZXlzID0gdXRpbC5vYmplY3RLZXlzKGEpLmZpbHRlcigoa2V5KSA9PiBiS2V5cy5pbmRleE9mKGtleSkgIT09IC0xKTtcbiAgICAgICAgY29uc3QgbmV3T2JqID0geyAuLi5hLCAuLi5iIH07XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHNoYXJlZEtleXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoYXJlZFZhbHVlID0gbWVyZ2VWYWx1ZXMoYVtrZXldLCBiW2tleV0pO1xuICAgICAgICAgICAgaWYgKCFzaGFyZWRWYWx1ZS52YWxpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbGlkOiBmYWxzZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3T2JqW2tleV0gPSBzaGFyZWRWYWx1ZS5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHZhbGlkOiB0cnVlLCBkYXRhOiBuZXdPYmogfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYVR5cGUgPT09IFpvZFBhcnNlZFR5cGUuYXJyYXkgJiYgYlR5cGUgPT09IFpvZFBhcnNlZFR5cGUuYXJyYXkpIHtcbiAgICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsaWQ6IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGEubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtQSA9IGFbaW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgaXRlbUIgPSBiW2luZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IHNoYXJlZFZhbHVlID0gbWVyZ2VWYWx1ZXMoaXRlbUEsIGl0ZW1CKTtcbiAgICAgICAgICAgIGlmICghc2hhcmVkVmFsdWUudmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0FycmF5LnB1c2goc2hhcmVkVmFsdWUuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdmFsaWQ6IHRydWUsIGRhdGE6IG5ld0FycmF5IH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGFUeXBlID09PSBab2RQYXJzZWRUeXBlLmRhdGUgJiYgYlR5cGUgPT09IFpvZFBhcnNlZFR5cGUuZGF0ZSAmJiArYSA9PT0gK2IpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsaWQ6IHRydWUsIGRhdGE6IGEgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB7IHZhbGlkOiBmYWxzZSB9O1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBab2RJbnRlcnNlY3Rpb24gZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMsIGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgY29uc3QgaGFuZGxlUGFyc2VkID0gKHBhcnNlZExlZnQsIHBhcnNlZFJpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNBYm9ydGVkKHBhcnNlZExlZnQpIHx8IGlzQWJvcnRlZChwYXJzZWRSaWdodCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IG1lcmdlVmFsdWVzKHBhcnNlZExlZnQudmFsdWUsIHBhcnNlZFJpZ2h0LnZhbHVlKTtcbiAgICAgICAgICAgIGlmICghbWVyZ2VkLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX2ludGVyc2VjdGlvbl90eXBlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0RpcnR5KHBhcnNlZExlZnQpIHx8IGlzRGlydHkocGFyc2VkUmlnaHQpKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cy52YWx1ZSwgdmFsdWU6IG1lcmdlZC5kYXRhIH07XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZi5sZWZ0Ll9wYXJzZUFzeW5jKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWYucmlnaHQuX3BhcnNlQXN5bmMoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSkudGhlbigoW2xlZnQsIHJpZ2h0XSkgPT4gaGFuZGxlUGFyc2VkKGxlZnQsIHJpZ2h0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlUGFyc2VkKHRoaXMuX2RlZi5sZWZ0Ll9wYXJzZVN5bmMoe1xuICAgICAgICAgICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICAgICAgfSksIHRoaXMuX2RlZi5yaWdodC5fcGFyc2VTeW5jKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblpvZEludGVyc2VjdGlvbi5jcmVhdGUgPSAobGVmdCwgcmlnaHQsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kSW50ZXJzZWN0aW9uKHtcbiAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgcmlnaHQ6IHJpZ2h0LFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEludGVyc2VjdGlvbixcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbi8vIHR5cGUgWm9kVHVwbGVJdGVtcyA9IFtab2RUeXBlQW55LCAuLi5ab2RUeXBlQW55W11dO1xuZXhwb3J0IGNsYXNzIFpvZFR1cGxlIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzLCBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGlmIChjdHgucGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5hcnJheSkge1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5hcnJheSxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdHguZGF0YS5sZW5ndGggPCB0aGlzLl9kZWYuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUudG9vX3NtYWxsLFxuICAgICAgICAgICAgICAgIG1pbmltdW06IHRoaXMuX2RlZi5pdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3QgPSB0aGlzLl9kZWYucmVzdDtcbiAgICAgICAgaWYgKCFyZXN0ICYmIGN0eC5kYXRhLmxlbmd0aCA+IHRoaXMuX2RlZi5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fYmlnLFxuICAgICAgICAgICAgICAgIG1heGltdW06IHRoaXMuX2RlZi5pdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gWy4uLmN0eC5kYXRhXVxuICAgICAgICAgICAgLm1hcCgoaXRlbSwgaXRlbUluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY2hlbWEgPSB0aGlzLl9kZWYuaXRlbXNbaXRlbUluZGV4XSB8fCB0aGlzLl9kZWYucmVzdDtcbiAgICAgICAgICAgIGlmICghc2NoZW1hKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYS5fcGFyc2UobmV3IFBhcnNlSW5wdXRMYXp5UGF0aChjdHgsIGl0ZW0sIGN0eC5wYXRoLCBpdGVtSW5kZXgpKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICEheCk7IC8vIGZpbHRlciBudWxsc1xuICAgICAgICBpZiAoY3R4LmNvbW1vbi5hc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGl0ZW1zKS50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBhcnNlU3RhdHVzLm1lcmdlQXJyYXkoc3RhdHVzLCByZXN1bHRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFBhcnNlU3RhdHVzLm1lcmdlQXJyYXkoc3RhdHVzLCBpdGVtcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLml0ZW1zO1xuICAgIH1cbiAgICByZXN0KHJlc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RUdXBsZSh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICByZXN0LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5ab2RUdXBsZS5jcmVhdGUgPSAoc2NoZW1hcywgcGFyYW1zKSA9PiB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBtdXN0IHBhc3MgYW4gYXJyYXkgb2Ygc2NoZW1hcyB0byB6LnR1cGxlKFsgLi4uIF0pXCIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFpvZFR1cGxlKHtcbiAgICAgICAgaXRlbXM6IHNjaGVtYXMsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kVHVwbGUsXG4gICAgICAgIHJlc3Q6IG51bGwsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kUmVjb3JkIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgZ2V0IGtleVNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5rZXlUeXBlO1xuICAgIH1cbiAgICBnZXQgdmFsdWVTY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYudmFsdWVUeXBlO1xuICAgIH1cbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMsIGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgaWYgKGN0eC5wYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLm9iamVjdCkge1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5vYmplY3QsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWlycyA9IFtdO1xuICAgICAgICBjb25zdCBrZXlUeXBlID0gdGhpcy5fZGVmLmtleVR5cGU7XG4gICAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IHRoaXMuX2RlZi52YWx1ZVR5cGU7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGN0eC5kYXRhKSB7XG4gICAgICAgICAgICBwYWlycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXk6IGtleVR5cGUuX3BhcnNlKG5ldyBQYXJzZUlucHV0TGF6eVBhdGgoY3R4LCBrZXksIGN0eC5wYXRoLCBrZXkpKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVUeXBlLl9wYXJzZShuZXcgUGFyc2VJbnB1dExhenlQYXRoKGN0eCwgY3R4LmRhdGFba2V5XSwgY3R4LnBhdGgsIGtleSkpLFxuICAgICAgICAgICAgICAgIGFsd2F5c1NldDoga2V5IGluIGN0eC5kYXRhLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBQYXJzZVN0YXR1cy5tZXJnZU9iamVjdEFzeW5jKHN0YXR1cywgcGFpcnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFBhcnNlU3RhdHVzLm1lcmdlT2JqZWN0U3luYyhzdGF0dXMsIHBhaXJzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi52YWx1ZVR5cGU7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUoZmlyc3QsIHNlY29uZCwgdGhpcmQpIHtcbiAgICAgICAgaWYgKHNlY29uZCBpbnN0YW5jZW9mIFpvZFR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWm9kUmVjb3JkKHtcbiAgICAgICAgICAgICAgICBrZXlUeXBlOiBmaXJzdCxcbiAgICAgICAgICAgICAgICB2YWx1ZVR5cGU6IHNlY29uZCxcbiAgICAgICAgICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZFJlY29yZCxcbiAgICAgICAgICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHRoaXJkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgWm9kUmVjb3JkKHtcbiAgICAgICAgICAgIGtleVR5cGU6IFpvZFN0cmluZy5jcmVhdGUoKSxcbiAgICAgICAgICAgIHZhbHVlVHlwZTogZmlyc3QsXG4gICAgICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZFJlY29yZCxcbiAgICAgICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMoc2Vjb25kKSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFpvZE1hcCBleHRlbmRzIFpvZFR5cGUge1xuICAgIGdldCBrZXlTY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYua2V5VHlwZTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlU2NoZW1hKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnZhbHVlVHlwZTtcbiAgICB9XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzLCBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGlmIChjdHgucGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5tYXApIHtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUubWFwLFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5VHlwZSA9IHRoaXMuX2RlZi5rZXlUeXBlO1xuICAgICAgICBjb25zdCB2YWx1ZVR5cGUgPSB0aGlzLl9kZWYudmFsdWVUeXBlO1xuICAgICAgICBjb25zdCBwYWlycyA9IFsuLi5jdHguZGF0YS5lbnRyaWVzKCldLm1hcCgoW2tleSwgdmFsdWVdLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBrZXk6IGtleVR5cGUuX3BhcnNlKG5ldyBQYXJzZUlucHV0TGF6eVBhdGgoY3R4LCBrZXksIGN0eC5wYXRoLCBbaW5kZXgsIFwia2V5XCJdKSksXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlVHlwZS5fcGFyc2UobmV3IFBhcnNlSW5wdXRMYXp5UGF0aChjdHgsIHZhbHVlLCBjdHgucGF0aCwgW2luZGV4LCBcInZhbHVlXCJdKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFpciBvZiBwYWlycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBhd2FpdCBwYWlyLmtleTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhd2FpdCBwYWlyLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LnN0YXR1cyA9PT0gXCJhYm9ydGVkXCIgfHwgdmFsdWUuc3RhdHVzID09PSBcImFib3J0ZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5zdGF0dXMgPT09IFwiZGlydHlcIiB8fCB2YWx1ZS5zdGF0dXMgPT09IFwiZGlydHlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxNYXAuc2V0KGtleS52YWx1ZSwgdmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cy52YWx1ZSwgdmFsdWU6IGZpbmFsTWFwIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYWlyIG9mIHBhaXJzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gcGFpci5rZXk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwYWlyLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChrZXkuc3RhdHVzID09PSBcImFib3J0ZWRcIiB8fCB2YWx1ZS5zdGF0dXMgPT09IFwiYWJvcnRlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoa2V5LnN0YXR1cyA9PT0gXCJkaXJ0eVwiIHx8IHZhbHVlLnN0YXR1cyA9PT0gXCJkaXJ0eVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbE1hcC5zZXQoa2V5LnZhbHVlLCB2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cy52YWx1ZSwgdmFsdWU6IGZpbmFsTWFwIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5ab2RNYXAuY3JlYXRlID0gKGtleVR5cGUsIHZhbHVlVHlwZSwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RNYXAoe1xuICAgICAgICB2YWx1ZVR5cGUsXG4gICAgICAgIGtleVR5cGUsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kTWFwLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZFNldCBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCB7IHN0YXR1cywgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBpZiAoY3R4LnBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUuc2V0KSB7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLnNldCxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlZiA9IHRoaXMuX2RlZjtcbiAgICAgICAgaWYgKGRlZi5taW5TaXplICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY3R4LmRhdGEuc2l6ZSA8IGRlZi5taW5TaXplLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fc21hbGwsXG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW06IGRlZi5taW5TaXplLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNldFwiLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVmLm1pblNpemUubWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmLm1heFNpemUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjdHguZGF0YS5zaXplID4gZGVmLm1heFNpemUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19iaWcsXG4gICAgICAgICAgICAgICAgICAgIG1heGltdW06IGRlZi5tYXhTaXplLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNldFwiLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVmLm1heFNpemUubWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZVR5cGUgPSB0aGlzLl9kZWYudmFsdWVUeXBlO1xuICAgICAgICBmdW5jdGlvbiBmaW5hbGl6ZVNldChlbGVtZW50cykge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkU2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3RhdHVzID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3RhdHVzID09PSBcImRpcnR5XCIpXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIHBhcnNlZFNldC5hZGQoZWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cy52YWx1ZSwgdmFsdWU6IHBhcnNlZFNldCB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gWy4uLmN0eC5kYXRhLnZhbHVlcygpXS5tYXAoKGl0ZW0sIGkpID0+IHZhbHVlVHlwZS5fcGFyc2UobmV3IFBhcnNlSW5wdXRMYXp5UGF0aChjdHgsIGl0ZW0sIGN0eC5wYXRoLCBpKSkpO1xuICAgICAgICBpZiAoY3R4LmNvbW1vbi5hc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGVsZW1lbnRzKS50aGVuKChlbGVtZW50cykgPT4gZmluYWxpemVTZXQoZWxlbWVudHMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5hbGl6ZVNldChlbGVtZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWluKG1pblNpemUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RTZXQoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgbWluU2l6ZTogeyB2YWx1ZTogbWluU2l6ZSwgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtYXgobWF4U2l6ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZFNldCh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBtYXhTaXplOiB7IHZhbHVlOiBtYXhTaXplLCBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSkgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpemUoc2l6ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5taW4oc2l6ZSwgbWVzc2FnZSkubWF4KHNpemUsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICBub25lbXB0eShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbigxLCBtZXNzYWdlKTtcbiAgICB9XG59XG5ab2RTZXQuY3JlYXRlID0gKHZhbHVlVHlwZSwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RTZXQoe1xuICAgICAgICB2YWx1ZVR5cGUsXG4gICAgICAgIG1pblNpemU6IG51bGwsXG4gICAgICAgIG1heFNpemU6IG51bGwsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kU2V0LFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZEZ1bmN0aW9uIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSB0aGlzLmltcGxlbWVudDtcbiAgICB9XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBpZiAoY3R4LnBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUuZnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUuZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtYWtlQXJnc0lzc3VlKGFyZ3MsIGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFrZUlzc3VlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBhcmdzLFxuICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgIGVycm9yTWFwczogW2N0eC5jb21tb24uY29udGV4dHVhbEVycm9yTWFwLCBjdHguc2NoZW1hRXJyb3JNYXAsIGdldEVycm9yTWFwKCksIGRlZmF1bHRFcnJvck1hcF0uZmlsdGVyKCh4KSA9PiAhIXgpLFxuICAgICAgICAgICAgICAgIGlzc3VlRGF0YToge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9hcmd1bWVudHMsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50c0Vycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbWFrZVJldHVybnNJc3N1ZShyZXR1cm5zLCBlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIG1ha2VJc3N1ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogcmV0dXJucyxcbiAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICBlcnJvck1hcHM6IFtjdHguY29tbW9uLmNvbnRleHR1YWxFcnJvck1hcCwgY3R4LnNjaGVtYUVycm9yTWFwLCBnZXRFcnJvck1hcCgpLCBkZWZhdWx0RXJyb3JNYXBdLmZpbHRlcigoeCkgPT4gISF4KSxcbiAgICAgICAgICAgICAgICBpc3N1ZURhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblR5cGVFcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHsgZXJyb3JNYXA6IGN0eC5jb21tb24uY29udGV4dHVhbEVycm9yTWFwIH07XG4gICAgICAgIGNvbnN0IGZuID0gY3R4LmRhdGE7XG4gICAgICAgIGlmICh0aGlzLl9kZWYucmV0dXJucyBpbnN0YW5jZW9mIFpvZFByb21pc2UpIHtcbiAgICAgICAgICAgIC8vIFdvdWxkIGxvdmUgYSB3YXkgdG8gYXZvaWQgZGlzYWJsaW5nIHRoaXMgcnVsZSwgYnV0IHdlIG5lZWRcbiAgICAgICAgICAgIC8vIGFuIGFsaWFzICh1c2luZyBhbiBhcnJvdyBmdW5jdGlvbiB3YXMgd2hhdCBjYXVzZWQgMjY1MSkuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcbiAgICAgICAgICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBPSyhhc3luYyBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFpvZEVycm9yKFtdKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRBcmdzID0gYXdhaXQgbWUuX2RlZi5hcmdzLnBhcnNlQXN5bmMoYXJncywgcGFyYW1zKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5hZGRJc3N1ZShtYWtlQXJnc0lzc3VlKGFyZ3MsIGUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUmVmbGVjdC5hcHBseShmbiwgdGhpcywgcGFyc2VkQXJncyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkUmV0dXJucyA9IGF3YWl0IG1lLl9kZWYucmV0dXJucy5fZGVmLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgLnBhcnNlQXN5bmMocmVzdWx0LCBwYXJhbXMpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5hZGRJc3N1ZShtYWtlUmV0dXJuc0lzc3VlKHJlc3VsdCwgZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkUmV0dXJucztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gV291bGQgbG92ZSBhIHdheSB0byBhdm9pZCBkaXNhYmxpbmcgdGhpcyBydWxlLCBidXQgd2UgbmVlZFxuICAgICAgICAgICAgLy8gYW4gYWxpYXMgKHVzaW5nIGFuIGFycm93IGZ1bmN0aW9uIHdhcyB3aGF0IGNhdXNlZCAyNjUxKS5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhc1xuICAgICAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIE9LKGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkQXJncyA9IG1lLl9kZWYuYXJncy5zYWZlUGFyc2UoYXJncywgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnNlZEFyZ3Muc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgWm9kRXJyb3IoW21ha2VBcmdzSXNzdWUoYXJncywgcGFyc2VkQXJncy5lcnJvcildKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gUmVmbGVjdC5hcHBseShmbiwgdGhpcywgcGFyc2VkQXJncy5kYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRSZXR1cm5zID0gbWUuX2RlZi5yZXR1cm5zLnNhZmVQYXJzZShyZXN1bHQsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJzZWRSZXR1cm5zLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFpvZEVycm9yKFttYWtlUmV0dXJuc0lzc3VlKHJlc3VsdCwgcGFyc2VkUmV0dXJucy5lcnJvcildKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZFJldHVybnMuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtZXRlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuYXJncztcbiAgICB9XG4gICAgcmV0dXJuVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5yZXR1cm5zO1xuICAgIH1cbiAgICBhcmdzKC4uLml0ZW1zKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kRnVuY3Rpb24oe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgYXJnczogWm9kVHVwbGUuY3JlYXRlKGl0ZW1zKS5yZXN0KFpvZFVua25vd24uY3JlYXRlKCkpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJucyhyZXR1cm5UeXBlKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kRnVuY3Rpb24oe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgcmV0dXJuczogcmV0dXJuVHlwZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGltcGxlbWVudChmdW5jKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlZEZ1bmMgPSB0aGlzLnBhcnNlKGZ1bmMpO1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVkRnVuYztcbiAgICB9XG4gICAgc3RyaWN0SW1wbGVtZW50KGZ1bmMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVkRnVuYyA9IHRoaXMucGFyc2UoZnVuYyk7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRGdW5jO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKGFyZ3MsIHJldHVybnMsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gbmV3IFpvZEZ1bmN0aW9uKHtcbiAgICAgICAgICAgIGFyZ3M6IChhcmdzID8gYXJncyA6IFpvZFR1cGxlLmNyZWF0ZShbXSkucmVzdChab2RVbmtub3duLmNyZWF0ZSgpKSksXG4gICAgICAgICAgICByZXR1cm5zOiByZXR1cm5zIHx8IFpvZFVua25vd24uY3JlYXRlKCksXG4gICAgICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEZ1bmN0aW9uLFxuICAgICAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgWm9kTGF6eSBleHRlbmRzIFpvZFR5cGUge1xuICAgIGdldCBzY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuZ2V0dGVyKCk7XG4gICAgfVxuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCB7IGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgY29uc3QgbGF6eVNjaGVtYSA9IHRoaXMuX2RlZi5nZXR0ZXIoKTtcbiAgICAgICAgcmV0dXJuIGxhenlTY2hlbWEuX3BhcnNlKHsgZGF0YTogY3R4LmRhdGEsIHBhdGg6IGN0eC5wYXRoLCBwYXJlbnQ6IGN0eCB9KTtcbiAgICB9XG59XG5ab2RMYXp5LmNyZWF0ZSA9IChnZXR0ZXIsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kTGF6eSh7XG4gICAgICAgIGdldHRlcjogZ2V0dGVyLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZExhenksXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kTGl0ZXJhbCBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQuZGF0YSAhPT0gdGhpcy5fZGVmLnZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfbGl0ZXJhbCxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogdGhpcy5fZGVmLnZhbHVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdGF0dXM6IFwidmFsaWRcIiwgdmFsdWU6IGlucHV0LmRhdGEgfTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnZhbHVlO1xuICAgIH1cbn1cblpvZExpdGVyYWwuY3JlYXRlID0gKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZExpdGVyYWwoe1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kTGl0ZXJhbCxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmZ1bmN0aW9uIGNyZWF0ZVpvZEVudW0odmFsdWVzLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gbmV3IFpvZEVudW0oe1xuICAgICAgICB2YWx1ZXMsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kRW51bSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufVxuZXhwb3J0IGNsYXNzIFpvZEVudW0gZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC5kYXRhICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZFZhbHVlcyA9IHRoaXMuX2RlZi52YWx1ZXM7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogdXRpbC5qb2luVmFsdWVzKGV4cGVjdGVkVmFsdWVzKSxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9jYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSBuZXcgU2V0KHRoaXMuX2RlZi52YWx1ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fY2FjaGUuaGFzKGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZFZhbHVlcyA9IHRoaXMuX2RlZi52YWx1ZXM7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfZW51bV92YWx1ZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBleHBlY3RlZFZhbHVlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9LKGlucHV0LmRhdGEpO1xuICAgIH1cbiAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi52YWx1ZXM7XG4gICAgfVxuICAgIGdldCBlbnVtKCkge1xuICAgICAgICBjb25zdCBlbnVtVmFsdWVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgdmFsIG9mIHRoaXMuX2RlZi52YWx1ZXMpIHtcbiAgICAgICAgICAgIGVudW1WYWx1ZXNbdmFsXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW51bVZhbHVlcztcbiAgICB9XG4gICAgZ2V0IFZhbHVlcygpIHtcbiAgICAgICAgY29uc3QgZW51bVZhbHVlcyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHZhbCBvZiB0aGlzLl9kZWYudmFsdWVzKSB7XG4gICAgICAgICAgICBlbnVtVmFsdWVzW3ZhbF0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZXM7XG4gICAgfVxuICAgIGdldCBFbnVtKCkge1xuICAgICAgICBjb25zdCBlbnVtVmFsdWVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgdmFsIG9mIHRoaXMuX2RlZi52YWx1ZXMpIHtcbiAgICAgICAgICAgIGVudW1WYWx1ZXNbdmFsXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW51bVZhbHVlcztcbiAgICB9XG4gICAgZXh0cmFjdCh2YWx1ZXMsIG5ld0RlZiA9IHRoaXMuX2RlZikge1xuICAgICAgICByZXR1cm4gWm9kRW51bS5jcmVhdGUodmFsdWVzLCB7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICAuLi5uZXdEZWYsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBleGNsdWRlKHZhbHVlcywgbmV3RGVmID0gdGhpcy5fZGVmKSB7XG4gICAgICAgIHJldHVybiBab2RFbnVtLmNyZWF0ZSh0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHQpID0+ICF2YWx1ZXMuaW5jbHVkZXMob3B0KSksIHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIC4uLm5ld0RlZixcbiAgICAgICAgfSk7XG4gICAgfVxufVxuWm9kRW51bS5jcmVhdGUgPSBjcmVhdGVab2RFbnVtO1xuZXhwb3J0IGNsYXNzIFpvZE5hdGl2ZUVudW0gZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgbmF0aXZlRW51bVZhbHVlcyA9IHV0aWwuZ2V0VmFsaWRFbnVtVmFsdWVzKHRoaXMuX2RlZi52YWx1ZXMpO1xuICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgIGlmIChjdHgucGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5zdHJpbmcgJiYgY3R4LnBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUubnVtYmVyKSB7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZFZhbHVlcyA9IHV0aWwub2JqZWN0VmFsdWVzKG5hdGl2ZUVudW1WYWx1ZXMpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IHV0aWwuam9pblZhbHVlcyhleHBlY3RlZFZhbHVlcyksXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fY2FjaGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlID0gbmV3IFNldCh1dGlsLmdldFZhbGlkRW51bVZhbHVlcyh0aGlzLl9kZWYudmFsdWVzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9jYWNoZS5oYXMoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVmFsdWVzID0gdXRpbC5vYmplY3RWYWx1ZXMobmF0aXZlRW51bVZhbHVlcyk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfZW51bV92YWx1ZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBleHBlY3RlZFZhbHVlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9LKGlucHV0LmRhdGEpO1xuICAgIH1cbiAgICBnZXQgZW51bSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi52YWx1ZXM7XG4gICAgfVxufVxuWm9kTmF0aXZlRW51bS5jcmVhdGUgPSAodmFsdWVzLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZE5hdGl2ZUVudW0oe1xuICAgICAgICB2YWx1ZXM6IHZhbHVlcyxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2ROYXRpdmVFbnVtLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZFByb21pc2UgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICB1bndyYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYudHlwZTtcbiAgICB9XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBpZiAoY3R4LnBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUucHJvbWlzZSAmJiBjdHguY29tbW9uLmFzeW5jID09PSBmYWxzZSkge1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5wcm9taXNlLFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvbWlzaWZpZWQgPSBjdHgucGFyc2VkVHlwZSA9PT0gWm9kUGFyc2VkVHlwZS5wcm9taXNlID8gY3R4LmRhdGEgOiBQcm9taXNlLnJlc29sdmUoY3R4LmRhdGEpO1xuICAgICAgICByZXR1cm4gT0socHJvbWlzaWZpZWQudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi50eXBlLnBhcnNlQXN5bmMoZGF0YSwge1xuICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgIGVycm9yTWFwOiBjdHguY29tbW9uLmNvbnRleHR1YWxFcnJvck1hcCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuWm9kUHJvbWlzZS5jcmVhdGUgPSAoc2NoZW1hLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZFByb21pc2Uoe1xuICAgICAgICB0eXBlOiBzY2hlbWEsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kUHJvbWlzZSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2RFZmZlY3RzIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgaW5uZXJUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnNjaGVtYTtcbiAgICB9XG4gICAgc291cmNlVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5zY2hlbWEuX2RlZi50eXBlTmFtZSA9PT0gWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEVmZmVjdHNcbiAgICAgICAgICAgID8gdGhpcy5fZGVmLnNjaGVtYS5zb3VyY2VUeXBlKClcbiAgICAgICAgICAgIDogdGhpcy5fZGVmLnNjaGVtYTtcbiAgICB9XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzLCBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGNvbnN0IGVmZmVjdCA9IHRoaXMuX2RlZi5lZmZlY3QgfHwgbnVsbDtcbiAgICAgICAgY29uc3QgY2hlY2tDdHggPSB7XG4gICAgICAgICAgICBhZGRJc3N1ZTogKGFyZykgPT4ge1xuICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwgYXJnKTtcbiAgICAgICAgICAgICAgICBpZiAoYXJnLmZhdGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBwYXRoKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdHgucGF0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNoZWNrQ3R4LmFkZElzc3VlID0gY2hlY2tDdHguYWRkSXNzdWUuYmluZChjaGVja0N0eCk7XG4gICAgICAgIGlmIChlZmZlY3QudHlwZSA9PT0gXCJwcmVwcm9jZXNzXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZCA9IGVmZmVjdC50cmFuc2Zvcm0oY3R4LmRhdGEsIGNoZWNrQ3R4KTtcbiAgICAgICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9jZXNzZWQpLnRoZW4oYXN5bmMgKHByb2Nlc3NlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzLnZhbHVlID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9kZWYuc2NoZW1hLl9wYXJzZUFzeW5jKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHByb2Nlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBjdHgsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gXCJhYm9ydGVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IFwiZGlydHlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBESVJUWShyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzLnZhbHVlID09PSBcImRpcnR5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRElSVFkocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMudmFsdWUgPT09IFwiYWJvcnRlZFwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9kZWYuc2NoZW1hLl9wYXJzZVN5bmMoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBwcm9jZXNzZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gXCJhYm9ydGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSBcImRpcnR5XCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBESVJUWShyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMudmFsdWUgPT09IFwiZGlydHlcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERJUlRZKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZWZmZWN0LnR5cGUgPT09IFwicmVmaW5lbWVudFwiKSB7XG4gICAgICAgICAgICBjb25zdCBleGVjdXRlUmVmaW5lbWVudCA9IChhY2MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBlZmZlY3QucmVmaW5lbWVudChhY2MsIGNoZWNrQ3R4KTtcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmNvbW1vbi5hc3luYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFzeW5jIHJlZmluZW1lbnQgZW5jb3VudGVyZWQgZHVyaW5nIHN5bmNocm9ub3VzIHBhcnNlIG9wZXJhdGlvbi4gVXNlIC5wYXJzZUFzeW5jIGluc3RlYWQuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlubmVyID0gdGhpcy5fZGVmLnNjaGVtYS5fcGFyc2VTeW5jKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5uZXIuc3RhdHVzID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgICAgICAgICAgaWYgKGlubmVyLnN0YXR1cyA9PT0gXCJkaXJ0eVwiKVxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdmFsdWUgaXMgaWdub3JlZFxuICAgICAgICAgICAgICAgIGV4ZWN1dGVSZWZpbmVtZW50KGlubmVyLnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cy52YWx1ZSwgdmFsdWU6IGlubmVyLnZhbHVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnNjaGVtYS5fcGFyc2VBc3luYyh7IGRhdGE6IGN0eC5kYXRhLCBwYXRoOiBjdHgucGF0aCwgcGFyZW50OiBjdHggfSkudGhlbigoaW5uZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyLnN0YXR1cyA9PT0gXCJhYm9ydGVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyLnN0YXR1cyA9PT0gXCJkaXJ0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGVjdXRlUmVmaW5lbWVudChpbm5lci52YWx1ZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cy52YWx1ZSwgdmFsdWU6IGlubmVyLnZhbHVlIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlZmZlY3QudHlwZSA9PT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgICAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZSA9IHRoaXMuX2RlZi5zY2hlbWEuX3BhcnNlU3luYyh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBjdHgsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKGJhc2UpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBlZmZlY3QudHJhbnNmb3JtKGJhc2UudmFsdWUsIGNoZWNrQ3R4KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFzeW5jaHJvbm91cyB0cmFuc2Zvcm0gZW5jb3VudGVyZWQgZHVyaW5nIHN5bmNocm9ub3VzIHBhcnNlIG9wZXJhdGlvbi4gVXNlIC5wYXJzZUFzeW5jIGluc3RlYWQuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogcmVzdWx0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnNjaGVtYS5fcGFyc2VBc3luYyh7IGRhdGE6IGN0eC5kYXRhLCBwYXRoOiBjdHgucGF0aCwgcGFyZW50OiBjdHggfSkudGhlbigoYmFzZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWQoYmFzZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShlZmZlY3QudHJhbnNmb3JtKGJhc2UudmFsdWUsIGNoZWNrQ3R4KSkudGhlbigocmVzdWx0KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXMudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXRpbC5hc3NlcnROZXZlcihlZmZlY3QpO1xuICAgIH1cbn1cblpvZEVmZmVjdHMuY3JlYXRlID0gKHNjaGVtYSwgZWZmZWN0LCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZEVmZmVjdHMoe1xuICAgICAgICBzY2hlbWEsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kRWZmZWN0cyxcbiAgICAgICAgZWZmZWN0LFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuWm9kRWZmZWN0cy5jcmVhdGVXaXRoUHJlcHJvY2VzcyA9IChwcmVwcm9jZXNzLCBzY2hlbWEsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kRWZmZWN0cyh7XG4gICAgICAgIHNjaGVtYSxcbiAgICAgICAgZWZmZWN0OiB7IHR5cGU6IFwicHJlcHJvY2Vzc1wiLCB0cmFuc2Zvcm06IHByZXByb2Nlc3MgfSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RFZmZlY3RzLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IHsgWm9kRWZmZWN0cyBhcyBab2RUcmFuc2Zvcm1lciB9O1xuZXhwb3J0IGNsYXNzIFpvZE9wdGlvbmFsIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0aGlzLl9nZXRUeXBlKGlucHV0KTtcbiAgICAgICAgaWYgKHBhcnNlZFR5cGUgPT09IFpvZFBhcnNlZFR5cGUudW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gT0sodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLmlubmVyVHlwZS5fcGFyc2UoaW5wdXQpO1xuICAgIH1cbiAgICB1bndyYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuaW5uZXJUeXBlO1xuICAgIH1cbn1cblpvZE9wdGlvbmFsLmNyZWF0ZSA9ICh0eXBlLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZE9wdGlvbmFsKHtcbiAgICAgICAgaW5uZXJUeXBlOiB0eXBlLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZE9wdGlvbmFsLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZE51bGxhYmxlIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0aGlzLl9nZXRUeXBlKGlucHV0KTtcbiAgICAgICAgaWYgKHBhcnNlZFR5cGUgPT09IFpvZFBhcnNlZFR5cGUubnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIE9LKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuaW5uZXJUeXBlLl9wYXJzZShpbnB1dCk7XG4gICAgfVxuICAgIHVud3JhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5pbm5lclR5cGU7XG4gICAgfVxufVxuWm9kTnVsbGFibGUuY3JlYXRlID0gKHR5cGUsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kTnVsbGFibGUoe1xuICAgICAgICBpbm5lclR5cGU6IHR5cGUsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kTnVsbGFibGUsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kRGVmYXVsdCBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCB7IGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgbGV0IGRhdGEgPSBjdHguZGF0YTtcbiAgICAgICAgaWYgKGN0eC5wYXJzZWRUeXBlID09PSBab2RQYXJzZWRUeXBlLnVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuX2RlZi5kZWZhdWx0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLmlubmVyVHlwZS5fcGFyc2Uoe1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgcGFyZW50OiBjdHgsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmVEZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLmlubmVyVHlwZTtcbiAgICB9XG59XG5ab2REZWZhdWx0LmNyZWF0ZSA9ICh0eXBlLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZERlZmF1bHQoe1xuICAgICAgICBpbm5lclR5cGU6IHR5cGUsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kRGVmYXVsdCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0eXBlb2YgcGFyYW1zLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiA/IHBhcmFtcy5kZWZhdWx0IDogKCkgPT4gcGFyYW1zLmRlZmF1bHQsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kQ2F0Y2ggZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIC8vIG5ld0N0eCBpcyB1c2VkIHRvIG5vdCBjb2xsZWN0IGlzc3VlcyBmcm9tIGlubmVyIHR5cGVzIGluIGN0eFxuICAgICAgICBjb25zdCBuZXdDdHggPSB7XG4gICAgICAgICAgICAuLi5jdHgsXG4gICAgICAgICAgICBjb21tb246IHtcbiAgICAgICAgICAgICAgICAuLi5jdHguY29tbW9uLFxuICAgICAgICAgICAgICAgIGlzc3VlczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9kZWYuaW5uZXJUeXBlLl9wYXJzZSh7XG4gICAgICAgICAgICBkYXRhOiBuZXdDdHguZGF0YSxcbiAgICAgICAgICAgIHBhdGg6IG5ld0N0eC5wYXRoLFxuICAgICAgICAgICAgcGFyZW50OiB7XG4gICAgICAgICAgICAgICAgLi4ubmV3Q3R4LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc0FzeW5jKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInZhbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQuc3RhdHVzID09PSBcInZhbGlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcmVzdWx0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuX2RlZi5jYXRjaFZhbHVlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQgZXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgWm9kRXJyb3IobmV3Q3R4LmNvbW1vbi5pc3N1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IG5ld0N0eC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwidmFsaWRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LnN0YXR1cyA9PT0gXCJ2YWxpZFwiXG4gICAgICAgICAgICAgICAgICAgID8gcmVzdWx0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5fZGVmLmNhdGNoVmFsdWUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0IGVycm9yKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgWm9kRXJyb3IobmV3Q3R4LmNvbW1vbi5pc3N1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBuZXdDdHguZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUNhdGNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLmlubmVyVHlwZTtcbiAgICB9XG59XG5ab2RDYXRjaC5jcmVhdGUgPSAodHlwZSwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RDYXRjaCh7XG4gICAgICAgIGlubmVyVHlwZTogdHlwZSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RDYXRjaCxcbiAgICAgICAgY2F0Y2hWYWx1ZTogdHlwZW9mIHBhcmFtcy5jYXRjaCA9PT0gXCJmdW5jdGlvblwiID8gcGFyYW1zLmNhdGNoIDogKCkgPT4gcGFyYW1zLmNhdGNoLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZE5hTiBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLm5hbikge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5uYW4sXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdGF0dXM6IFwidmFsaWRcIiwgdmFsdWU6IGlucHV0LmRhdGEgfTtcbiAgICB9XG59XG5ab2ROYU4uY3JlYXRlID0gKHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kTmFOKHtcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2ROYU4sXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY29uc3QgQlJBTkQgPSBTeW1ib2woXCJ6b2RfYnJhbmRcIik7XG5leHBvcnQgY2xhc3MgWm9kQnJhbmRlZCBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCB7IGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGN0eC5kYXRhO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnR5cGUuX3BhcnNlKHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdW53cmFwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnR5cGU7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFpvZFBpcGVsaW5lIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzLCBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVBc3luYyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpblJlc3VsdCA9IGF3YWl0IHRoaXMuX2RlZi5pbi5fcGFyc2VBc3luYyh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBjdHgsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGluUmVzdWx0LnN0YXR1cyA9PT0gXCJhYm9ydGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgICAgIGlmIChpblJlc3VsdC5zdGF0dXMgPT09IFwiZGlydHlcIikge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERJUlRZKGluUmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWYub3V0Ll9wYXJzZUFzeW5jKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGluUmVzdWx0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVBc3luYygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW5SZXN1bHQgPSB0aGlzLl9kZWYuaW4uX3BhcnNlU3luYyh7XG4gICAgICAgICAgICAgICAgZGF0YTogY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgcGFyZW50OiBjdHgsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpblJlc3VsdC5zdGF0dXMgPT09IFwiYWJvcnRlZFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgaWYgKGluUmVzdWx0LnN0YXR1cyA9PT0gXCJkaXJ0eVwiKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImRpcnR5XCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpblJlc3VsdC52YWx1ZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5vdXQuX3BhcnNlU3luYyh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGluUmVzdWx0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBjdHgsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZShhLCBiKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kUGlwZWxpbmUoe1xuICAgICAgICAgICAgaW46IGEsXG4gICAgICAgICAgICBvdXQ6IGIsXG4gICAgICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZFBpcGVsaW5lLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgWm9kUmVhZG9ubHkgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZGVmLmlubmVyVHlwZS5fcGFyc2UoaW5wdXQpO1xuICAgICAgICBjb25zdCBmcmVlemUgPSAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzVmFsaWQoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnZhbHVlID0gT2JqZWN0LmZyZWV6ZShkYXRhLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaXNBc3luYyhyZXN1bHQpID8gcmVzdWx0LnRoZW4oKGRhdGEpID0+IGZyZWV6ZShkYXRhKSkgOiBmcmVlemUocmVzdWx0KTtcbiAgICB9XG4gICAgdW53cmFwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLmlubmVyVHlwZTtcbiAgICB9XG59XG5ab2RSZWFkb25seS5jcmVhdGUgPSAodHlwZSwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RSZWFkb25seSh7XG4gICAgICAgIGlubmVyVHlwZTogdHlwZSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RSZWFkb25seSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8gICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy9cbi8vLy8vLy8vLy8gICAgICB6LmN1c3RvbSAgICAgIC8vLy8vLy8vLy9cbi8vLy8vLy8vLy8gICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIGNsZWFuUGFyYW1zKHBhcmFtcywgZGF0YSkge1xuICAgIGNvbnN0IHAgPSB0eXBlb2YgcGFyYW1zID09PSBcImZ1bmN0aW9uXCIgPyBwYXJhbXMoZGF0YSkgOiB0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiID8geyBtZXNzYWdlOiBwYXJhbXMgfSA6IHBhcmFtcztcbiAgICBjb25zdCBwMiA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8geyBtZXNzYWdlOiBwIH0gOiBwO1xuICAgIHJldHVybiBwMjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b20oY2hlY2ssIF9wYXJhbXMgPSB7fSwgXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKlxuICogUGFzcyBgZmF0YWxgIGludG8gdGhlIHBhcmFtcyBvYmplY3QgaW5zdGVhZDpcbiAqXG4gKiBgYGB0c1xuICogei5zdHJpbmcoKS5jdXN0b20oKHZhbCkgPT4gdmFsLmxlbmd0aCA+IDUsIHsgZmF0YWw6IGZhbHNlIH0pXG4gKiBgYGBcbiAqXG4gKi9cbmZhdGFsKSB7XG4gICAgaWYgKGNoZWNrKVxuICAgICAgICByZXR1cm4gWm9kQW55LmNyZWF0ZSgpLnN1cGVyUmVmaW5lKChkYXRhLCBjdHgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBjaGVjayhkYXRhKTtcbiAgICAgICAgICAgIGlmIChyIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBjbGVhblBhcmFtcyhfcGFyYW1zLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9mYXRhbCA9IHBhcmFtcy5mYXRhbCA/PyBmYXRhbCA/PyB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmFkZElzc3VlKHsgY29kZTogXCJjdXN0b21cIiwgLi4ucGFyYW1zLCBmYXRhbDogX2ZhdGFsIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBjbGVhblBhcmFtcyhfcGFyYW1zLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zdCBfZmF0YWwgPSBwYXJhbXMuZmF0YWwgPz8gZmF0YWwgPz8gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjdHguYWRkSXNzdWUoeyBjb2RlOiBcImN1c3RvbVwiLCAuLi5wYXJhbXMsIGZhdGFsOiBfZmF0YWwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBab2RBbnkuY3JlYXRlKCk7XG59XG5leHBvcnQgeyBab2RUeXBlIGFzIFNjaGVtYSwgWm9kVHlwZSBhcyBab2RTY2hlbWEgfTtcbmV4cG9ydCBjb25zdCBsYXRlID0ge1xuICAgIG9iamVjdDogWm9kT2JqZWN0LmxhenljcmVhdGUsXG59O1xuZXhwb3J0IHZhciBab2RGaXJzdFBhcnR5VHlwZUtpbmQ7XG4oZnVuY3Rpb24gKFpvZEZpcnN0UGFydHlUeXBlS2luZCkge1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFN0cmluZ1wiXSA9IFwiWm9kU3RyaW5nXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kTnVtYmVyXCJdID0gXCJab2ROdW1iZXJcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2ROYU5cIl0gPSBcIlpvZE5hTlwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZEJpZ0ludFwiXSA9IFwiWm9kQmlnSW50XCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kQm9vbGVhblwiXSA9IFwiWm9kQm9vbGVhblwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZERhdGVcIl0gPSBcIlpvZERhdGVcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RTeW1ib2xcIl0gPSBcIlpvZFN5bWJvbFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFVuZGVmaW5lZFwiXSA9IFwiWm9kVW5kZWZpbmVkXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kTnVsbFwiXSA9IFwiWm9kTnVsbFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZEFueVwiXSA9IFwiWm9kQW55XCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kVW5rbm93blwiXSA9IFwiWm9kVW5rbm93blwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZE5ldmVyXCJdID0gXCJab2ROZXZlclwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFZvaWRcIl0gPSBcIlpvZFZvaWRcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RBcnJheVwiXSA9IFwiWm9kQXJyYXlcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RPYmplY3RcIl0gPSBcIlpvZE9iamVjdFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFVuaW9uXCJdID0gXCJab2RVbmlvblwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZERpc2NyaW1pbmF0ZWRVbmlvblwiXSA9IFwiWm9kRGlzY3JpbWluYXRlZFVuaW9uXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kSW50ZXJzZWN0aW9uXCJdID0gXCJab2RJbnRlcnNlY3Rpb25cIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RUdXBsZVwiXSA9IFwiWm9kVHVwbGVcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RSZWNvcmRcIl0gPSBcIlpvZFJlY29yZFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZE1hcFwiXSA9IFwiWm9kTWFwXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kU2V0XCJdID0gXCJab2RTZXRcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RGdW5jdGlvblwiXSA9IFwiWm9kRnVuY3Rpb25cIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RMYXp5XCJdID0gXCJab2RMYXp5XCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kTGl0ZXJhbFwiXSA9IFwiWm9kTGl0ZXJhbFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZEVudW1cIl0gPSBcIlpvZEVudW1cIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RFZmZlY3RzXCJdID0gXCJab2RFZmZlY3RzXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kTmF0aXZlRW51bVwiXSA9IFwiWm9kTmF0aXZlRW51bVwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZE9wdGlvbmFsXCJdID0gXCJab2RPcHRpb25hbFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZE51bGxhYmxlXCJdID0gXCJab2ROdWxsYWJsZVwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZERlZmF1bHRcIl0gPSBcIlpvZERlZmF1bHRcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RDYXRjaFwiXSA9IFwiWm9kQ2F0Y2hcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RQcm9taXNlXCJdID0gXCJab2RQcm9taXNlXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kQnJhbmRlZFwiXSA9IFwiWm9kQnJhbmRlZFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFBpcGVsaW5lXCJdID0gXCJab2RQaXBlbGluZVwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFJlYWRvbmx5XCJdID0gXCJab2RSZWFkb25seVwiO1xufSkoWm9kRmlyc3RQYXJ0eVR5cGVLaW5kIHx8IChab2RGaXJzdFBhcnR5VHlwZUtpbmQgPSB7fSkpO1xuLy8gcmVxdWlyZXMgVFMgNC40K1xuY2xhc3MgQ2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKC4uLl8pIHsgfVxufVxuY29uc3QgaW5zdGFuY2VPZlR5cGUgPSAoXG4vLyBjb25zdCBpbnN0YW5jZU9mVHlwZSA9IDxUIGV4dGVuZHMgbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PihcbmNscywgcGFyYW1zID0ge1xuICAgIG1lc3NhZ2U6IGBJbnB1dCBub3QgaW5zdGFuY2Ugb2YgJHtjbHMubmFtZX1gLFxufSkgPT4gY3VzdG9tKChkYXRhKSA9PiBkYXRhIGluc3RhbmNlb2YgY2xzLCBwYXJhbXMpO1xuY29uc3Qgc3RyaW5nVHlwZSA9IFpvZFN0cmluZy5jcmVhdGU7XG5jb25zdCBudW1iZXJUeXBlID0gWm9kTnVtYmVyLmNyZWF0ZTtcbmNvbnN0IG5hblR5cGUgPSBab2ROYU4uY3JlYXRlO1xuY29uc3QgYmlnSW50VHlwZSA9IFpvZEJpZ0ludC5jcmVhdGU7XG5jb25zdCBib29sZWFuVHlwZSA9IFpvZEJvb2xlYW4uY3JlYXRlO1xuY29uc3QgZGF0ZVR5cGUgPSBab2REYXRlLmNyZWF0ZTtcbmNvbnN0IHN5bWJvbFR5cGUgPSBab2RTeW1ib2wuY3JlYXRlO1xuY29uc3QgdW5kZWZpbmVkVHlwZSA9IFpvZFVuZGVmaW5lZC5jcmVhdGU7XG5jb25zdCBudWxsVHlwZSA9IFpvZE51bGwuY3JlYXRlO1xuY29uc3QgYW55VHlwZSA9IFpvZEFueS5jcmVhdGU7XG5jb25zdCB1bmtub3duVHlwZSA9IFpvZFVua25vd24uY3JlYXRlO1xuY29uc3QgbmV2ZXJUeXBlID0gWm9kTmV2ZXIuY3JlYXRlO1xuY29uc3Qgdm9pZFR5cGUgPSBab2RWb2lkLmNyZWF0ZTtcbmNvbnN0IGFycmF5VHlwZSA9IFpvZEFycmF5LmNyZWF0ZTtcbmNvbnN0IG9iamVjdFR5cGUgPSBab2RPYmplY3QuY3JlYXRlO1xuY29uc3Qgc3RyaWN0T2JqZWN0VHlwZSA9IFpvZE9iamVjdC5zdHJpY3RDcmVhdGU7XG5jb25zdCB1bmlvblR5cGUgPSBab2RVbmlvbi5jcmVhdGU7XG5jb25zdCBkaXNjcmltaW5hdGVkVW5pb25UeXBlID0gWm9kRGlzY3JpbWluYXRlZFVuaW9uLmNyZWF0ZTtcbmNvbnN0IGludGVyc2VjdGlvblR5cGUgPSBab2RJbnRlcnNlY3Rpb24uY3JlYXRlO1xuY29uc3QgdHVwbGVUeXBlID0gWm9kVHVwbGUuY3JlYXRlO1xuY29uc3QgcmVjb3JkVHlwZSA9IFpvZFJlY29yZC5jcmVhdGU7XG5jb25zdCBtYXBUeXBlID0gWm9kTWFwLmNyZWF0ZTtcbmNvbnN0IHNldFR5cGUgPSBab2RTZXQuY3JlYXRlO1xuY29uc3QgZnVuY3Rpb25UeXBlID0gWm9kRnVuY3Rpb24uY3JlYXRlO1xuY29uc3QgbGF6eVR5cGUgPSBab2RMYXp5LmNyZWF0ZTtcbmNvbnN0IGxpdGVyYWxUeXBlID0gWm9kTGl0ZXJhbC5jcmVhdGU7XG5jb25zdCBlbnVtVHlwZSA9IFpvZEVudW0uY3JlYXRlO1xuY29uc3QgbmF0aXZlRW51bVR5cGUgPSBab2ROYXRpdmVFbnVtLmNyZWF0ZTtcbmNvbnN0IHByb21pc2VUeXBlID0gWm9kUHJvbWlzZS5jcmVhdGU7XG5jb25zdCBlZmZlY3RzVHlwZSA9IFpvZEVmZmVjdHMuY3JlYXRlO1xuY29uc3Qgb3B0aW9uYWxUeXBlID0gWm9kT3B0aW9uYWwuY3JlYXRlO1xuY29uc3QgbnVsbGFibGVUeXBlID0gWm9kTnVsbGFibGUuY3JlYXRlO1xuY29uc3QgcHJlcHJvY2Vzc1R5cGUgPSBab2RFZmZlY3RzLmNyZWF0ZVdpdGhQcmVwcm9jZXNzO1xuY29uc3QgcGlwZWxpbmVUeXBlID0gWm9kUGlwZWxpbmUuY3JlYXRlO1xuY29uc3Qgb3N0cmluZyA9ICgpID0+IHN0cmluZ1R5cGUoKS5vcHRpb25hbCgpO1xuY29uc3Qgb251bWJlciA9ICgpID0+IG51bWJlclR5cGUoKS5vcHRpb25hbCgpO1xuY29uc3Qgb2Jvb2xlYW4gPSAoKSA9PiBib29sZWFuVHlwZSgpLm9wdGlvbmFsKCk7XG5leHBvcnQgY29uc3QgY29lcmNlID0ge1xuICAgIHN0cmluZzogKChhcmcpID0+IFpvZFN0cmluZy5jcmVhdGUoeyAuLi5hcmcsIGNvZXJjZTogdHJ1ZSB9KSksXG4gICAgbnVtYmVyOiAoKGFyZykgPT4gWm9kTnVtYmVyLmNyZWF0ZSh7IC4uLmFyZywgY29lcmNlOiB0cnVlIH0pKSxcbiAgICBib29sZWFuOiAoKGFyZykgPT4gWm9kQm9vbGVhbi5jcmVhdGUoe1xuICAgICAgICAuLi5hcmcsXG4gICAgICAgIGNvZXJjZTogdHJ1ZSxcbiAgICB9KSksXG4gICAgYmlnaW50OiAoKGFyZykgPT4gWm9kQmlnSW50LmNyZWF0ZSh7IC4uLmFyZywgY29lcmNlOiB0cnVlIH0pKSxcbiAgICBkYXRlOiAoKGFyZykgPT4gWm9kRGF0ZS5jcmVhdGUoeyAuLi5hcmcsIGNvZXJjZTogdHJ1ZSB9KSksXG59O1xuZXhwb3J0IHsgYW55VHlwZSBhcyBhbnksIGFycmF5VHlwZSBhcyBhcnJheSwgYmlnSW50VHlwZSBhcyBiaWdpbnQsIGJvb2xlYW5UeXBlIGFzIGJvb2xlYW4sIGRhdGVUeXBlIGFzIGRhdGUsIGRpc2NyaW1pbmF0ZWRVbmlvblR5cGUgYXMgZGlzY3JpbWluYXRlZFVuaW9uLCBlZmZlY3RzVHlwZSBhcyBlZmZlY3QsIGVudW1UeXBlIGFzIGVudW0sIGZ1bmN0aW9uVHlwZSBhcyBmdW5jdGlvbiwgaW5zdGFuY2VPZlR5cGUgYXMgaW5zdGFuY2VvZiwgaW50ZXJzZWN0aW9uVHlwZSBhcyBpbnRlcnNlY3Rpb24sIGxhenlUeXBlIGFzIGxhenksIGxpdGVyYWxUeXBlIGFzIGxpdGVyYWwsIG1hcFR5cGUgYXMgbWFwLCBuYW5UeXBlIGFzIG5hbiwgbmF0aXZlRW51bVR5cGUgYXMgbmF0aXZlRW51bSwgbmV2ZXJUeXBlIGFzIG5ldmVyLCBudWxsVHlwZSBhcyBudWxsLCBudWxsYWJsZVR5cGUgYXMgbnVsbGFibGUsIG51bWJlclR5cGUgYXMgbnVtYmVyLCBvYmplY3RUeXBlIGFzIG9iamVjdCwgb2Jvb2xlYW4sIG9udW1iZXIsIG9wdGlvbmFsVHlwZSBhcyBvcHRpb25hbCwgb3N0cmluZywgcGlwZWxpbmVUeXBlIGFzIHBpcGVsaW5lLCBwcmVwcm9jZXNzVHlwZSBhcyBwcmVwcm9jZXNzLCBwcm9taXNlVHlwZSBhcyBwcm9taXNlLCByZWNvcmRUeXBlIGFzIHJlY29yZCwgc2V0VHlwZSBhcyBzZXQsIHN0cmljdE9iamVjdFR5cGUgYXMgc3RyaWN0T2JqZWN0LCBzdHJpbmdUeXBlIGFzIHN0cmluZywgc3ltYm9sVHlwZSBhcyBzeW1ib2wsIGVmZmVjdHNUeXBlIGFzIHRyYW5zZm9ybWVyLCB0dXBsZVR5cGUgYXMgdHVwbGUsIHVuZGVmaW5lZFR5cGUgYXMgdW5kZWZpbmVkLCB1bmlvblR5cGUgYXMgdW5pb24sIHVua25vd25UeXBlIGFzIHVua25vd24sIHZvaWRUeXBlIGFzIHZvaWQsIH07XG5leHBvcnQgY29uc3QgTkVWRVIgPSBJTlZBTElEO1xuIiwgIi8qKlxuICogR2VuZXJhdGVkIGJ5IG9ydmFsIFx1RDgzQ1x1REY3QVxuICogRG8gbm90IGVkaXQgbWFudWFsbHkuXG4gKiBBcGlcbiAqIEFQSSBzcGVjaWZpY2F0aW9uXG4gKiBPcGVuQVBJIHNwZWMgdmVyc2lvbjogMC4xLjBcbiAqL1xuaW1wb3J0ICogYXMgem9kIGZyb20gJ3pvZCc7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHNlcnZlciBoZWFsdGggc3RhdHVzXG4gKiBAc3VtbWFyeSBIZWFsdGggY2hlY2tcbiAqL1xuZXhwb3J0IGNvbnN0IEhlYWx0aENoZWNrUmVzcG9uc2UgPSB6b2Qub2JqZWN0KHtcbiAgXCJzdGF0dXNcIjogem9kLnN0cmluZygpXG59KVxuXG5cbi8qKlxuICogQHN1bW1hcnkgR2V0IHRoZSBjb21wbGV0ZSB0b3VybmFtZW50IHRyYWNrZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJSZXNwb25zZVBsYXllcnNJdGVtU2hhcmVUb2tlbk1pbiA9IDMyO1xuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJSZXNwb25zZVBsYXllcnNJdGVtU2hhcmVUb2tlbk1heCA9IDEyODtcblxuXG5leHBvcnQgY29uc3QgZ2V0VHJhY2tlclJlc3BvbnNlUGxheWVyc0l0ZW1TaGFyZVRva2VuUmVnRXhwID0gbmV3IFJlZ0V4cCgnXltBLVphLXowLTlfLV0rJCcpO1xuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWluID0gMztcbmV4cG9ydCBjb25zdCBnZXRUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCA9IDM7XG5cbmV4cG9ydCBjb25zdCBnZXRUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZUF1ZGlvUGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL1swLTlhLWYtXSskJyk7XG5leHBvcnQgY29uc3QgZ2V0VHJhY2tlclJlc3BvbnNlUmVmcmVzaEhlYWx0aENvbnNlY3V0aXZlRmFpbHVyZXNNaW4gPSAwO1xuXG5cbmV4cG9ydCBjb25zdCBnZXRUcmFja2VyUmVzcG9uc2VSZWZyZXNoSGVhbHRoUGVuZGluZ1JlY292ZXJ5Tm90aWNlc01pbiA9IDA7XG5cbmV4cG9ydCBjb25zdCBnZXRUcmFja2VyUmVzcG9uc2VCcmFuZGluZ05hbWVNYXggPSA4MDtcblxuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhNYXggPSAxMDA7XG5cblxuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy8oPzpsb2dvcy8pP1swLTlhLWYtXSskJyk7XG5cblxuZXhwb3J0IGNvbnN0IEdldFRyYWNrZXJSZXNwb25zZSA9IHpvZC5vYmplY3Qoe1xuICBcInBsYXllcnNcIjogem9kLmFycmF5KHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJzaGFyZVRva2VuXCI6IHpvZC5zdHJpbmcoKS5taW4oZ2V0VHJhY2tlclJlc3BvbnNlUGxheWVyc0l0ZW1TaGFyZVRva2VuTWluKS5tYXgoZ2V0VHJhY2tlclJlc3BvbnNlUGxheWVyc0l0ZW1TaGFyZVRva2VuTWF4KS5yZWdleChnZXRUcmFja2VyUmVzcG9uc2VQbGF5ZXJzSXRlbVNoYXJlVG9rZW5SZWdFeHApXG59KSksXG4gIFwiY29hY2hlc1wiOiB6b2QuYXJyYXkoem9kLm9iamVjdCh7XG4gIFwiaWRcIjogem9kLnN0cmluZygpLFxuICBcIm5hbWVcIjogem9kLnN0cmluZygpXG59KSksXG4gIFwibWF0Y2hlc1wiOiB6b2QuYXJyYXkoem9kLm9iamVjdCh7XG4gIFwiaWRcIjogem9kLnN0cmluZygpLFxuICBcImV4dGVybmFsSWRcIjogem9kLnN0cmluZygpLm51bGxhYmxlKCksXG4gIFwicGxheWVySWRcIjogem9kLnN0cmluZygpLFxuICBcIm9wcG9uZW50XCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJzdGFydHNBdFwiOiB6b2QuY29lcmNlLmRhdGUoKSxcbiAgXCJlbmRzQXRcIjogem9kLmNvZXJjZS5kYXRlKCksXG4gIFwidmVudWVcIjogem9kLnN0cmluZygpLFxuICBcImNvdXJ0XCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJjb2FjaElkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJzdGF0dXNcIjogem9kLmVudW0oWyd1cGNvbWluZycsICdjb21wbGV0ZWQnXSksXG4gIFwicmVzdWx0XCI6IHpvZC5zdHJpbmcoKS5udWxsaXNoKCksXG4gIFwicmVwb3J0XCI6IHpvZC51bmlvbihbem9kLm9iamVjdCh7XG4gIFwibWF0Y2hJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwib2JzZXJ2YXRpb25zXCI6IHpvZC5hcnJheSh6b2Quc3RyaW5nKCkpLm1pbihnZXRUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01pbikubWF4KGdldFRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWF4KSxcbiAgXCJ0cmFuc2NyaXB0XCI6IHpvZC5zdHJpbmcoKS5udWxsaXNoKCksXG4gIFwiYXVkaW9QYXRoXCI6IHpvZC5zdHJpbmcoKS5yZWdleChnZXRUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZUF1ZGlvUGF0aFJlZ0V4cCkubnVsbGFibGUoKSxcbiAgXCJ1cGRhdGVkQXRcIjogem9kLmNvZXJjZS5kYXRlKClcbn0pLHpvZC5udWxsKCldKS5vcHRpb25hbCgpXG59KSksXG4gIFwibGFzdFVwZGF0ZWRBdFwiOiB6b2QuY29lcmNlLmRhdGUoKSxcbiAgXCJzb3VyY2VcIjogem9kLmVudW0oWydzYW1wbGUnLCAnY2x1Yi1sb2NrZXInXSksXG4gIFwicmVmcmVzaEhlYWx0aFwiOiB6b2Qub2JqZWN0KHtcbiAgXCJjb25zZWN1dGl2ZUZhaWx1cmVzXCI6IHpvZC5udW1iZXIoKS5pbnQoKS5taW4oZ2V0VHJhY2tlclJlc3BvbnNlUmVmcmVzaEhlYWx0aENvbnNlY3V0aXZlRmFpbHVyZXNNaW4pLFxuICBcImFsZXJ0VGhyZXNob2xkXCI6IHpvZC5udW1iZXIoKS5pbnQoKS5taW4oMSksXG4gIFwibGFzdEZhaWx1cmVBdFwiOiB6b2QuY29lcmNlLmRhdGUoKS5udWxsYWJsZSgpLFxuICBcImFsZXJ0U2VudEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLm51bGxhYmxlKCksXG4gIFwicGVuZGluZ1JlY292ZXJ5Tm90aWNlc1wiOiB6b2QubnVtYmVyKCkuaW50KCkubWluKGdldFRyYWNrZXJSZXNwb25zZVJlZnJlc2hIZWFsdGhQZW5kaW5nUmVjb3ZlcnlOb3RpY2VzTWluKS5kZXNjcmliZSgnUmVjb3Zlcnkgbm90aWNlcyB3YWl0aW5nIHRvIGJlIGRlbGl2ZXJlZCB0byBzdGFmZicpXG59KSxcbiAgXCJicmFuZGluZ1wiOiB6b2Qub2JqZWN0KHtcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKS5taW4oMSkubWF4KGdldFRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTmFtZU1heCksXG4gIFwibG9nb1BhdGhcIjogem9kLnN0cmluZygpLm1heChnZXRUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoTWF4KS5yZWdleChnZXRUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoUmVnRXhwKS5udWxsYWJsZSgpXG59KVxufSlcblxuXG4vKipcbiAqIEBzdW1tYXJ5IEdldCBzY2hlZHVsZSByZWZyZXNoIGFuZCBzdGFmZiBub3RpZmljYXRpb24gaGVhbHRoXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUcmFja2VySGVhbHRoUmVzcG9uc2VDb25zZWN1dGl2ZUZhaWx1cmVzTWluID0gMDtcblxuXG5leHBvcnQgY29uc3QgZ2V0VHJhY2tlckhlYWx0aFJlc3BvbnNlUGVuZGluZ1JlY292ZXJ5Tm90aWNlc01pbiA9IDA7XG5cblxuXG5leHBvcnQgY29uc3QgR2V0VHJhY2tlckhlYWx0aFJlc3BvbnNlID0gem9kLm9iamVjdCh7XG4gIFwiY29uc2VjdXRpdmVGYWlsdXJlc1wiOiB6b2QubnVtYmVyKCkuaW50KCkubWluKGdldFRyYWNrZXJIZWFsdGhSZXNwb25zZUNvbnNlY3V0aXZlRmFpbHVyZXNNaW4pLFxuICBcImFsZXJ0VGhyZXNob2xkXCI6IHpvZC5udW1iZXIoKS5pbnQoKS5taW4oMSksXG4gIFwibGFzdEZhaWx1cmVBdFwiOiB6b2QuY29lcmNlLmRhdGUoKS5udWxsYWJsZSgpLFxuICBcImFsZXJ0U2VudEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLm51bGxhYmxlKCksXG4gIFwicGVuZGluZ1JlY292ZXJ5Tm90aWNlc1wiOiB6b2QubnVtYmVyKCkuaW50KCkubWluKGdldFRyYWNrZXJIZWFsdGhSZXNwb25zZVBlbmRpbmdSZWNvdmVyeU5vdGljZXNNaW4pLmRlc2NyaWJlKCdSZWNvdmVyeSBub3RpY2VzIHdhaXRpbmcgdG8gYmUgZGVsaXZlcmVkIHRvIHN0YWZmJylcbn0pXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBHZXQgYSByZWFkLW9ubHkgdHJhY2tlciB2aWV3IGZvciBvbmUgcGxheWVyXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJUcmFja2VyUGF0aFNoYXJlVG9rZW5NaW4gPSAzMjtcbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJUcmFja2VyUGF0aFNoYXJlVG9rZW5NYXggPSAxMjg7XG5cblxuXG5leHBvcnQgY29uc3QgR2V0UGxheWVyVHJhY2tlclBhcmFtcyA9IHpvZC5vYmplY3Qoe1xuICBcInNoYXJlVG9rZW5cIjogem9kLmNvZXJjZS5zdHJpbmcoKS5taW4oZ2V0UGxheWVyVHJhY2tlclBhdGhTaGFyZVRva2VuTWluKS5tYXgoZ2V0UGxheWVyVHJhY2tlclBhdGhTaGFyZVRva2VuTWF4KVxufSlcblxuZXhwb3J0IGNvbnN0IGdldFBsYXllclRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWluID0gMztcbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCA9IDM7XG5cbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZUF1ZGlvUGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL1swLTlhLWYtXSskJyk7XG5leHBvcnQgY29uc3QgZ2V0UGxheWVyVHJhY2tlclJlc3BvbnNlQnJhbmRpbmdOYW1lTWF4ID0gODA7XG5cbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoTWF4ID0gMTAwO1xuXG5cbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoUmVnRXhwID0gbmV3IFJlZ0V4cCgnXi9vYmplY3RzL3VwbG9hZHMvKD86bG9nb3MvKT9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBHZXRQbGF5ZXJUcmFja2VyUmVzcG9uc2UgPSB6b2Qub2JqZWN0KHtcbiAgXCJwbGF5ZXJcIjogem9kLm9iamVjdCh7XG4gIFwiaWRcIjogem9kLnN0cmluZygpLFxuICBcIm5hbWVcIjogem9kLnN0cmluZygpXG59KSxcbiAgXCJjb2FjaGVzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKClcbn0pKSxcbiAgXCJtYXRjaGVzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwiZXh0ZXJuYWxJZFwiOiB6b2Quc3RyaW5nKCkubnVsbGFibGUoKSxcbiAgXCJwbGF5ZXJJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwib3Bwb25lbnRcIjogem9kLnN0cmluZygpLFxuICBcInN0YXJ0c0F0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcImVuZHNBdFwiOiB6b2QuY29lcmNlLmRhdGUoKSxcbiAgXCJ2ZW51ZVwiOiB6b2Quc3RyaW5nKCksXG4gIFwiY291cnRcIjogem9kLnN0cmluZygpLFxuICBcImNvYWNoSWRcIjogem9kLnN0cmluZygpLFxuICBcInN0YXR1c1wiOiB6b2QuZW51bShbJ3VwY29taW5nJywgJ2NvbXBsZXRlZCddKSxcbiAgXCJyZXN1bHRcIjogem9kLnN0cmluZygpLm51bGxpc2goKSxcbiAgXCJyZXBvcnRcIjogem9kLnVuaW9uKFt6b2Qub2JqZWN0KHtcbiAgXCJtYXRjaElkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJvYnNlcnZhdGlvbnNcIjogem9kLmFycmF5KHpvZC5zdHJpbmcoKSkubWluKGdldFBsYXllclRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWluKS5tYXgoZ2V0UGxheWVyVHJhY2tlclJlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVPYnNlcnZhdGlvbnNNYXgpLFxuICBcInRyYW5zY3JpcHRcIjogem9kLnN0cmluZygpLm51bGxpc2goKSxcbiAgXCJhdWRpb1BhdGhcIjogem9kLnN0cmluZygpLnJlZ2V4KGdldFBsYXllclRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lQXVkaW9QYXRoUmVnRXhwKS5udWxsYWJsZSgpLFxuICBcInVwZGF0ZWRBdFwiOiB6b2QuY29lcmNlLmRhdGUoKVxufSksem9kLm51bGwoKV0pLm9wdGlvbmFsKClcbn0pKSxcbiAgXCJicmFuZGluZ1wiOiB6b2Qub2JqZWN0KHtcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKS5taW4oMSkubWF4KGdldFBsYXllclRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTmFtZU1heCksXG4gIFwibG9nb1BhdGhcIjogem9kLnN0cmluZygpLm1heChnZXRQbGF5ZXJUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoTWF4KS5yZWdleChnZXRQbGF5ZXJUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoUmVnRXhwKS5udWxsYWJsZSgpXG59KSxcbiAgXCJsYXN0VXBkYXRlZEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpXG59KVxuXG5cbi8qKlxuICogQHN1bW1hcnkgUmVwbGFjZSB0aGUgcGxheWVyIHJvc3RlciwgY29hY2ggb3B0aW9ucywgYW5kIHRyYWNrZXIgYnJhbmRpbmdcbiAqL1xuXG5leHBvcnQgY29uc3Qgc2F2ZVRyYWNrZXJTZXR0aW5nc0JvZHlCcmFuZGluZ05hbWVNYXggPSA4MDtcblxuZXhwb3J0IGNvbnN0IHNhdmVUcmFja2VyU2V0dGluZ3NCb2R5QnJhbmRpbmdMb2dvUGF0aE1heCA9IDEwMDtcblxuXG5leHBvcnQgY29uc3Qgc2F2ZVRyYWNrZXJTZXR0aW5nc0JvZHlCcmFuZGluZ0xvZ29QYXRoUmVnRXhwID0gbmV3IFJlZ0V4cCgnXi9vYmplY3RzL3VwbG9hZHMvKD86bG9nb3MvKT9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBTYXZlVHJhY2tlclNldHRpbmdzQm9keSA9IHpvZC5vYmplY3Qoe1xuICBcImNvYWNoZXNcIjogem9kLmFycmF5KHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKVxufSkpLm1pbigxKSxcbiAgXCJicmFuZGluZ1wiOiB6b2Qub2JqZWN0KHtcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKS5taW4oMSkubWF4KHNhdmVUcmFja2VyU2V0dGluZ3NCb2R5QnJhbmRpbmdOYW1lTWF4KSxcbiAgXCJsb2dvUGF0aFwiOiB6b2Quc3RyaW5nKCkubWF4KHNhdmVUcmFja2VyU2V0dGluZ3NCb2R5QnJhbmRpbmdMb2dvUGF0aE1heCkucmVnZXgoc2F2ZVRyYWNrZXJTZXR0aW5nc0JvZHlCcmFuZGluZ0xvZ29QYXRoUmVnRXhwKS5udWxsYWJsZSgpXG59KVxufSlcblxuZXhwb3J0IGNvbnN0IHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZVBsYXllcnNJdGVtU2hhcmVUb2tlbk1pbiA9IDMyO1xuZXhwb3J0IGNvbnN0IHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZVBsYXllcnNJdGVtU2hhcmVUb2tlbk1heCA9IDEyODtcblxuXG5leHBvcnQgY29uc3Qgc2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlUGxheWVyc0l0ZW1TaGFyZVRva2VuUmVnRXhwID0gbmV3IFJlZ0V4cCgnXltBLVphLXowLTlfLV0rJCcpO1xuZXhwb3J0IGNvbnN0IHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWluID0gMztcbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCA9IDM7XG5cbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZUF1ZGlvUGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL1swLTlhLWYtXSskJyk7XG5leHBvcnQgY29uc3Qgc2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlUmVmcmVzaEhlYWx0aENvbnNlY3V0aXZlRmFpbHVyZXNNaW4gPSAwO1xuXG5cbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VSZWZyZXNoSGVhbHRoUGVuZGluZ1JlY292ZXJ5Tm90aWNlc01pbiA9IDA7XG5cbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VCcmFuZGluZ05hbWVNYXggPSA4MDtcblxuZXhwb3J0IGNvbnN0IHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhNYXggPSAxMDA7XG5cblxuZXhwb3J0IGNvbnN0IHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy8oPzpsb2dvcy8pP1swLTlhLWYtXSskJyk7XG5cblxuZXhwb3J0IGNvbnN0IFNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZSA9IHpvZC5vYmplY3Qoe1xuICBcInBsYXllcnNcIjogem9kLmFycmF5KHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJzaGFyZVRva2VuXCI6IHpvZC5zdHJpbmcoKS5taW4oc2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlUGxheWVyc0l0ZW1TaGFyZVRva2VuTWluKS5tYXgoc2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlUGxheWVyc0l0ZW1TaGFyZVRva2VuTWF4KS5yZWdleChzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VQbGF5ZXJzSXRlbVNoYXJlVG9rZW5SZWdFeHApXG59KSksXG4gIFwiY29hY2hlc1wiOiB6b2QuYXJyYXkoem9kLm9iamVjdCh7XG4gIFwiaWRcIjogem9kLnN0cmluZygpLFxuICBcIm5hbWVcIjogem9kLnN0cmluZygpXG59KSksXG4gIFwibWF0Y2hlc1wiOiB6b2QuYXJyYXkoem9kLm9iamVjdCh7XG4gIFwiaWRcIjogem9kLnN0cmluZygpLFxuICBcImV4dGVybmFsSWRcIjogem9kLnN0cmluZygpLm51bGxhYmxlKCksXG4gIFwicGxheWVySWRcIjogem9kLnN0cmluZygpLFxuICBcIm9wcG9uZW50XCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJzdGFydHNBdFwiOiB6b2QuY29lcmNlLmRhdGUoKSxcbiAgXCJlbmRzQXRcIjogem9kLmNvZXJjZS5kYXRlKCksXG4gIFwidmVudWVcIjogem9kLnN0cmluZygpLFxuICBcImNvdXJ0XCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJjb2FjaElkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJzdGF0dXNcIjogem9kLmVudW0oWyd1cGNvbWluZycsICdjb21wbGV0ZWQnXSksXG4gIFwicmVzdWx0XCI6IHpvZC5zdHJpbmcoKS5udWxsaXNoKCksXG4gIFwicmVwb3J0XCI6IHpvZC51bmlvbihbem9kLm9iamVjdCh7XG4gIFwibWF0Y2hJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwib2JzZXJ2YXRpb25zXCI6IHpvZC5hcnJheSh6b2Quc3RyaW5nKCkpLm1pbihzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01pbikubWF4KHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWF4KSxcbiAgXCJ0cmFuc2NyaXB0XCI6IHpvZC5zdHJpbmcoKS5udWxsaXNoKCksXG4gIFwiYXVkaW9QYXRoXCI6IHpvZC5zdHJpbmcoKS5yZWdleChzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZUF1ZGlvUGF0aFJlZ0V4cCkubnVsbGFibGUoKSxcbiAgXCJ1cGRhdGVkQXRcIjogem9kLmNvZXJjZS5kYXRlKClcbn0pLHpvZC5udWxsKCldKS5vcHRpb25hbCgpXG59KSksXG4gIFwibGFzdFVwZGF0ZWRBdFwiOiB6b2QuY29lcmNlLmRhdGUoKSxcbiAgXCJzb3VyY2VcIjogem9kLmVudW0oWydzYW1wbGUnLCAnY2x1Yi1sb2NrZXInXSksXG4gIFwicmVmcmVzaEhlYWx0aFwiOiB6b2Qub2JqZWN0KHtcbiAgXCJjb25zZWN1dGl2ZUZhaWx1cmVzXCI6IHpvZC5udW1iZXIoKS5pbnQoKS5taW4oc2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlUmVmcmVzaEhlYWx0aENvbnNlY3V0aXZlRmFpbHVyZXNNaW4pLFxuICBcImFsZXJ0VGhyZXNob2xkXCI6IHpvZC5udW1iZXIoKS5pbnQoKS5taW4oMSksXG4gIFwibGFzdEZhaWx1cmVBdFwiOiB6b2QuY29lcmNlLmRhdGUoKS5udWxsYWJsZSgpLFxuICBcImFsZXJ0U2VudEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLm51bGxhYmxlKCksXG4gIFwicGVuZGluZ1JlY292ZXJ5Tm90aWNlc1wiOiB6b2QubnVtYmVyKCkuaW50KCkubWluKHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZVJlZnJlc2hIZWFsdGhQZW5kaW5nUmVjb3ZlcnlOb3RpY2VzTWluKS5kZXNjcmliZSgnUmVjb3Zlcnkgbm90aWNlcyB3YWl0aW5nIHRvIGJlIGRlbGl2ZXJlZCB0byBzdGFmZicpXG59KSxcbiAgXCJicmFuZGluZ1wiOiB6b2Qub2JqZWN0KHtcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKS5taW4oMSkubWF4KHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZUJyYW5kaW5nTmFtZU1heCksXG4gIFwibG9nb1BhdGhcIjogem9kLnN0cmluZygpLm1heChzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoTWF4KS5yZWdleChzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoUmVnRXhwKS5udWxsYWJsZSgpXG59KVxufSlcblxuXG4vKipcbiAqIEBzdW1tYXJ5IFJldm9rZSBhIHBsYXllcidzIGN1cnJlbnQgc2hhcmUgbGluayBhbmQgY3JlYXRlIGEgbmV3IG9uZVxuICovXG5leHBvcnQgY29uc3QgUm90YXRlUGxheWVyU2hhcmVUb2tlblBhcmFtcyA9IHpvZC5vYmplY3Qoe1xuICBcInBsYXllcklkXCI6IHpvZC5jb2VyY2Uuc3RyaW5nKClcbn0pXG5cbmV4cG9ydCBjb25zdCByb3RhdGVQbGF5ZXJTaGFyZVRva2VuUmVzcG9uc2VTaGFyZVRva2VuTWluID0gMzI7XG5leHBvcnQgY29uc3Qgcm90YXRlUGxheWVyU2hhcmVUb2tlblJlc3BvbnNlU2hhcmVUb2tlbk1heCA9IDEyODtcblxuXG5leHBvcnQgY29uc3Qgcm90YXRlUGxheWVyU2hhcmVUb2tlblJlc3BvbnNlU2hhcmVUb2tlblJlZ0V4cCA9IG5ldyBSZWdFeHAoJ15bQS1aYS16MC05Xy1dKyQnKTtcblxuXG5leHBvcnQgY29uc3QgUm90YXRlUGxheWVyU2hhcmVUb2tlblJlc3BvbnNlID0gem9kLm9iamVjdCh7XG4gIFwiaWRcIjogem9kLnN0cmluZygpLFxuICBcIm5hbWVcIjogem9kLnN0cmluZygpLFxuICBcInNoYXJlVG9rZW5cIjogem9kLnN0cmluZygpLm1pbihyb3RhdGVQbGF5ZXJTaGFyZVRva2VuUmVzcG9uc2VTaGFyZVRva2VuTWluKS5tYXgocm90YXRlUGxheWVyU2hhcmVUb2tlblJlc3BvbnNlU2hhcmVUb2tlbk1heCkucmVnZXgocm90YXRlUGxheWVyU2hhcmVUb2tlblJlc3BvbnNlU2hhcmVUb2tlblJlZ0V4cClcbn0pXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBWYWxpZGF0ZSBhbmQgdXBsb2FkIGEgdHJhY2tlciBsb2dvIHRvIEFwcCBTdG9yYWdlXG4gKi9cbmV4cG9ydCBjb25zdCB1cGxvYWRUcmFja2VyTG9nb1Jlc3BvbnNlT2JqZWN0UGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL2xvZ29zL1swLTlhLWYtXSskJyk7XG5cblxuZXhwb3J0IGNvbnN0IFVwbG9hZFRyYWNrZXJMb2dvUmVzcG9uc2UgPSB6b2Qub2JqZWN0KHtcbiAgXCJvYmplY3RQYXRoXCI6IHpvZC5zdHJpbmcoKS5yZWdleCh1cGxvYWRUcmFja2VyTG9nb1Jlc3BvbnNlT2JqZWN0UGF0aFJlZ0V4cClcbn0pXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBEZWxldGUgYW4gdXBsb2FkZWQgdHJhY2tlciBsb2dvIHRoYXQgaXMgbm90IHJlZmVyZW5jZWQgYnkgc2F2ZWQgc2V0dGluZ3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlbGV0ZVVudXNlZFRyYWNrZXJMb2dvQm9keU9iamVjdFBhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy9sb2dvcy9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBEZWxldGVVbnVzZWRUcmFja2VyTG9nb0JvZHkgPSB6b2Qub2JqZWN0KHtcbiAgXCJvYmplY3RQYXRoXCI6IHpvZC5zdHJpbmcoKS5yZWdleChkZWxldGVVbnVzZWRUcmFja2VyTG9nb0JvZHlPYmplY3RQYXRoUmVnRXhwKVxufSlcblxuZXhwb3J0IGNvbnN0IERlbGV0ZVVudXNlZFRyYWNrZXJMb2dvUmVzcG9uc2UgPSB6b2Qudm9pZCgpXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBTZXJ2ZSBhbiB1cGxvYWRlZCBvYmplY3QgZnJvbSBBcHAgU3RvcmFnZVxuICovXG5leHBvcnQgY29uc3QgR2V0U3RvcmFnZU9iamVjdFBhcmFtcyA9IHpvZC5vYmplY3Qoe1xuICBcIm9iamVjdFBhdGhcIjogem9kLmNvZXJjZS5zdHJpbmcoKVxufSlcblxuZXhwb3J0IGNvbnN0IEdldFN0b3JhZ2VPYmplY3RSZXNwb25zZSA9IHpvZC51bmtub3duKClcblxuXG4vKipcbiAqIEBzdW1tYXJ5IFVwZGF0ZSBtYXRjaCBkZXRhaWxzLCBhc3NpZ25tZW50LCBzdGF0dXMsIG9yIHJlc3VsdFxuICovXG5leHBvcnQgY29uc3QgVXBkYXRlTWF0Y2hQYXJhbXMgPSB6b2Qub2JqZWN0KHtcbiAgXCJtYXRjaElkXCI6IHpvZC5jb2VyY2Uuc3RyaW5nKClcbn0pXG5cbmV4cG9ydCBjb25zdCBVcGRhdGVNYXRjaEJvZHkgPSB6b2Qub2JqZWN0KHtcbiAgXCJvcHBvbmVudFwiOiB6b2Quc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgXCJzdGFydHNBdFwiOiB6b2QuY29lcmNlLmRhdGUoKS5vcHRpb25hbCgpLFxuICBcImVuZHNBdFwiOiB6b2QuY29lcmNlLmRhdGUoKS5vcHRpb25hbCgpLFxuICBcInZlbnVlXCI6IHpvZC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBcImNvdXJ0XCI6IHpvZC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBcImNvYWNoSWRcIjogem9kLnN0cmluZygpLm9wdGlvbmFsKCksXG4gIFwic3RhdHVzXCI6IHpvZC5lbnVtKFsndXBjb21pbmcnLCAnY29tcGxldGVkJ10pLm9wdGlvbmFsKCksXG4gIFwicmVzdWx0XCI6IHpvZC5zdHJpbmcoKS5udWxsaXNoKClcbn0pXG5cbmV4cG9ydCBjb25zdCB1cGRhdGVNYXRjaFJlc3BvbnNlUmVwb3J0T25lT2JzZXJ2YXRpb25zTWluID0gMztcbmV4cG9ydCBjb25zdCB1cGRhdGVNYXRjaFJlc3BvbnNlUmVwb3J0T25lT2JzZXJ2YXRpb25zTWF4ID0gMztcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZU1hdGNoUmVzcG9uc2VSZXBvcnRPbmVBdWRpb1BhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBVcGRhdGVNYXRjaFJlc3BvbnNlID0gem9kLm9iamVjdCh7XG4gIFwiaWRcIjogem9kLnN0cmluZygpLFxuICBcImV4dGVybmFsSWRcIjogem9kLnN0cmluZygpLm51bGxhYmxlKCksXG4gIFwicGxheWVySWRcIjogem9kLnN0cmluZygpLFxuICBcIm9wcG9uZW50XCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJzdGFydHNBdFwiOiB6b2QuY29lcmNlLmRhdGUoKSxcbiAgXCJlbmRzQXRcIjogem9kLmNvZXJjZS5kYXRlKCksXG4gIFwidmVudWVcIjogem9kLnN0cmluZygpLFxuICBcImNvdXJ0XCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJjb2FjaElkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJzdGF0dXNcIjogem9kLmVudW0oWyd1cGNvbWluZycsICdjb21wbGV0ZWQnXSksXG4gIFwicmVzdWx0XCI6IHpvZC5zdHJpbmcoKS5udWxsaXNoKCksXG4gIFwicmVwb3J0XCI6IHpvZC51bmlvbihbem9kLm9iamVjdCh7XG4gIFwibWF0Y2hJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwib2JzZXJ2YXRpb25zXCI6IHpvZC5hcnJheSh6b2Quc3RyaW5nKCkpLm1pbih1cGRhdGVNYXRjaFJlc3BvbnNlUmVwb3J0T25lT2JzZXJ2YXRpb25zTWluKS5tYXgodXBkYXRlTWF0Y2hSZXNwb25zZVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCksXG4gIFwidHJhbnNjcmlwdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpLFxuICBcImF1ZGlvUGF0aFwiOiB6b2Quc3RyaW5nKCkucmVnZXgodXBkYXRlTWF0Y2hSZXNwb25zZVJlcG9ydE9uZUF1ZGlvUGF0aFJlZ0V4cCkubnVsbGFibGUoKSxcbiAgXCJ1cGRhdGVkQXRcIjogem9kLmNvZXJjZS5kYXRlKClcbn0pLHpvZC5udWxsKCldKS5vcHRpb25hbCgpXG59KVxuXG5cbi8qKlxuICogQHN1bW1hcnkgU2F2ZSBleGFjdGx5IHRocmVlIGNvYWNoIG9ic2VydmF0aW9uc1xuICovXG5leHBvcnQgY29uc3QgU2F2ZUNvYWNoUmVwb3J0UGFyYW1zID0gem9kLm9iamVjdCh7XG4gIFwibWF0Y2hJZFwiOiB6b2QuY29lcmNlLnN0cmluZygpXG59KVxuXG5leHBvcnQgY29uc3Qgc2F2ZUNvYWNoUmVwb3J0Qm9keU9ic2VydmF0aW9uc0l0ZW1NYXggPSAyMjA7XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29hY2hSZXBvcnRCb2R5T2JzZXJ2YXRpb25zTWluID0gMztcbmV4cG9ydCBjb25zdCBzYXZlQ29hY2hSZXBvcnRCb2R5T2JzZXJ2YXRpb25zTWF4ID0gMztcblxuZXhwb3J0IGNvbnN0IHNhdmVDb2FjaFJlcG9ydEJvZHlBdWRpb1BhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBTYXZlQ29hY2hSZXBvcnRCb2R5ID0gem9kLm9iamVjdCh7XG4gIFwib2JzZXJ2YXRpb25zXCI6IHpvZC5hcnJheSh6b2Quc3RyaW5nKCkubWluKDEpLm1heChzYXZlQ29hY2hSZXBvcnRCb2R5T2JzZXJ2YXRpb25zSXRlbU1heCkpLm1pbihzYXZlQ29hY2hSZXBvcnRCb2R5T2JzZXJ2YXRpb25zTWluKS5tYXgoc2F2ZUNvYWNoUmVwb3J0Qm9keU9ic2VydmF0aW9uc01heCksXG4gIFwidHJhbnNjcmlwdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpLFxuICBcImF1ZGlvUGF0aFwiOiB6b2Quc3RyaW5nKCkucmVnZXgoc2F2ZUNvYWNoUmVwb3J0Qm9keUF1ZGlvUGF0aFJlZ0V4cCkubnVsbGlzaCgpXG59KVxuXG5leHBvcnQgY29uc3Qgc2F2ZUNvYWNoUmVwb3J0UmVzcG9uc2VPYnNlcnZhdGlvbnNNaW4gPSAzO1xuZXhwb3J0IGNvbnN0IHNhdmVDb2FjaFJlcG9ydFJlc3BvbnNlT2JzZXJ2YXRpb25zTWF4ID0gMztcblxuZXhwb3J0IGNvbnN0IHNhdmVDb2FjaFJlcG9ydFJlc3BvbnNlQXVkaW9QYXRoUmVnRXhwID0gbmV3IFJlZ0V4cCgnXi9vYmplY3RzL3VwbG9hZHMvWzAtOWEtZi1dKyQnKTtcblxuXG5leHBvcnQgY29uc3QgU2F2ZUNvYWNoUmVwb3J0UmVzcG9uc2UgPSB6b2Qub2JqZWN0KHtcbiAgXCJtYXRjaElkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJvYnNlcnZhdGlvbnNcIjogem9kLmFycmF5KHpvZC5zdHJpbmcoKSkubWluKHNhdmVDb2FjaFJlcG9ydFJlc3BvbnNlT2JzZXJ2YXRpb25zTWluKS5tYXgoc2F2ZUNvYWNoUmVwb3J0UmVzcG9uc2VPYnNlcnZhdGlvbnNNYXgpLFxuICBcInRyYW5zY3JpcHRcIjogem9kLnN0cmluZygpLm51bGxpc2goKSxcbiAgXCJhdWRpb1BhdGhcIjogem9kLnN0cmluZygpLnJlZ2V4KHNhdmVDb2FjaFJlcG9ydFJlc3BvbnNlQXVkaW9QYXRoUmVnRXhwKS5udWxsYWJsZSgpLFxuICBcInVwZGF0ZWRBdFwiOiB6b2QuY29lcmNlLmRhdGUoKVxufSlcblxuXG4vKipcbiAqIEBzdW1tYXJ5IFN0b3JlIGEgcmVjb3JkZWQgY29hY2ggdm9pY2Ugbm90ZSBpbiBBcHAgU3RvcmFnZVxuICovXG5leHBvcnQgY29uc3QgVXBsb2FkQ29hY2hSZXBvcnRBdWRpb1BhcmFtcyA9IHpvZC5vYmplY3Qoe1xuICBcIm1hdGNoSWRcIjogem9kLmNvZXJjZS5zdHJpbmcoKVxufSlcblxuZXhwb3J0IGNvbnN0IHVwbG9hZENvYWNoUmVwb3J0QXVkaW9SZXNwb25zZU9iamVjdFBhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBVcGxvYWRDb2FjaFJlcG9ydEF1ZGlvUmVzcG9uc2UgPSB6b2Qub2JqZWN0KHtcbiAgXCJvYmplY3RQYXRoXCI6IHpvZC5zdHJpbmcoKS5yZWdleCh1cGxvYWRDb2FjaFJlcG9ydEF1ZGlvUmVzcG9uc2VPYmplY3RQYXRoUmVnRXhwKVxufSlcblxuXG4vKipcbiAqIEBzdW1tYXJ5IEltcG9ydCB0aGUgbGF0ZXN0IHNjaGVkdWxlIGZyb20gdGhlIGNvbmZpZ3VyZWQgQ2x1YiBMb2NrZXIgZmVlZFxuICovXG5leHBvcnQgY29uc3QgcmVmcmVzaFRyYWNrZXJSZXNwb25zZVBsYXllcnNJdGVtU2hhcmVUb2tlbk1pbiA9IDMyO1xuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmFja2VyUmVzcG9uc2VQbGF5ZXJzSXRlbVNoYXJlVG9rZW5NYXggPSAxMjg7XG5cblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmFja2VyUmVzcG9uc2VQbGF5ZXJzSXRlbVNoYXJlVG9rZW5SZWdFeHAgPSBuZXcgUmVnRXhwKCdeW0EtWmEtejAtOV8tXSskJyk7XG5leHBvcnQgY29uc3QgcmVmcmVzaFRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWluID0gMztcbmV4cG9ydCBjb25zdCByZWZyZXNoVHJhY2tlclJlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVPYnNlcnZhdGlvbnNNYXggPSAzO1xuXG5leHBvcnQgY29uc3QgcmVmcmVzaFRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lQXVkaW9QYXRoUmVnRXhwID0gbmV3IFJlZ0V4cCgnXi9vYmplY3RzL3VwbG9hZHMvWzAtOWEtZi1dKyQnKTtcbmV4cG9ydCBjb25zdCByZWZyZXNoVHJhY2tlclJlc3BvbnNlUmVmcmVzaEhlYWx0aENvbnNlY3V0aXZlRmFpbHVyZXNNaW4gPSAwO1xuXG5cbmV4cG9ydCBjb25zdCByZWZyZXNoVHJhY2tlclJlc3BvbnNlUmVmcmVzaEhlYWx0aFBlbmRpbmdSZWNvdmVyeU5vdGljZXNNaW4gPSAwO1xuXG5leHBvcnQgY29uc3QgcmVmcmVzaFRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTmFtZU1heCA9IDgwO1xuXG5leHBvcnQgY29uc3QgcmVmcmVzaFRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhNYXggPSAxMDA7XG5cblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoUmVnRXhwID0gbmV3IFJlZ0V4cCgnXi9vYmplY3RzL3VwbG9hZHMvKD86bG9nb3MvKT9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBSZWZyZXNoVHJhY2tlclJlc3BvbnNlID0gem9kLm9iamVjdCh7XG4gIFwicGxheWVyc1wiOiB6b2QuYXJyYXkoem9kLm9iamVjdCh7XG4gIFwiaWRcIjogem9kLnN0cmluZygpLFxuICBcIm5hbWVcIjogem9kLnN0cmluZygpLFxuICBcInNoYXJlVG9rZW5cIjogem9kLnN0cmluZygpLm1pbihyZWZyZXNoVHJhY2tlclJlc3BvbnNlUGxheWVyc0l0ZW1TaGFyZVRva2VuTWluKS5tYXgocmVmcmVzaFRyYWNrZXJSZXNwb25zZVBsYXllcnNJdGVtU2hhcmVUb2tlbk1heCkucmVnZXgocmVmcmVzaFRyYWNrZXJSZXNwb25zZVBsYXllcnNJdGVtU2hhcmVUb2tlblJlZ0V4cClcbn0pKSxcbiAgXCJjb2FjaGVzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKClcbn0pKSxcbiAgXCJtYXRjaGVzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwiZXh0ZXJuYWxJZFwiOiB6b2Quc3RyaW5nKCkubnVsbGFibGUoKSxcbiAgXCJwbGF5ZXJJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwib3Bwb25lbnRcIjogem9kLnN0cmluZygpLFxuICBcInN0YXJ0c0F0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcImVuZHNBdFwiOiB6b2QuY29lcmNlLmRhdGUoKSxcbiAgXCJ2ZW51ZVwiOiB6b2Quc3RyaW5nKCksXG4gIFwiY291cnRcIjogem9kLnN0cmluZygpLFxuICBcImNvYWNoSWRcIjogem9kLnN0cmluZygpLFxuICBcInN0YXR1c1wiOiB6b2QuZW51bShbJ3VwY29taW5nJywgJ2NvbXBsZXRlZCddKSxcbiAgXCJyZXN1bHRcIjogem9kLnN0cmluZygpLm51bGxpc2goKSxcbiAgXCJyZXBvcnRcIjogem9kLnVuaW9uKFt6b2Qub2JqZWN0KHtcbiAgXCJtYXRjaElkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJvYnNlcnZhdGlvbnNcIjogem9kLmFycmF5KHpvZC5zdHJpbmcoKSkubWluKHJlZnJlc2hUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01pbikubWF4KHJlZnJlc2hUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCksXG4gIFwidHJhbnNjcmlwdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpLFxuICBcImF1ZGlvUGF0aFwiOiB6b2Quc3RyaW5nKCkucmVnZXgocmVmcmVzaFRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lQXVkaW9QYXRoUmVnRXhwKS5udWxsYWJsZSgpLFxuICBcInVwZGF0ZWRBdFwiOiB6b2QuY29lcmNlLmRhdGUoKVxufSksem9kLm51bGwoKV0pLm9wdGlvbmFsKClcbn0pKSxcbiAgXCJsYXN0VXBkYXRlZEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcInNvdXJjZVwiOiB6b2QuZW51bShbJ3NhbXBsZScsICdjbHViLWxvY2tlciddKSxcbiAgXCJyZWZyZXNoSGVhbHRoXCI6IHpvZC5vYmplY3Qoe1xuICBcImNvbnNlY3V0aXZlRmFpbHVyZXNcIjogem9kLm51bWJlcigpLmludCgpLm1pbihyZWZyZXNoVHJhY2tlclJlc3BvbnNlUmVmcmVzaEhlYWx0aENvbnNlY3V0aXZlRmFpbHVyZXNNaW4pLFxuICBcImFsZXJ0VGhyZXNob2xkXCI6IHpvZC5udW1iZXIoKS5pbnQoKS5taW4oMSksXG4gIFwibGFzdEZhaWx1cmVBdFwiOiB6b2QuY29lcmNlLmRhdGUoKS5udWxsYWJsZSgpLFxuICBcImFsZXJ0U2VudEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLm51bGxhYmxlKCksXG4gIFwicGVuZGluZ1JlY292ZXJ5Tm90aWNlc1wiOiB6b2QubnVtYmVyKCkuaW50KCkubWluKHJlZnJlc2hUcmFja2VyUmVzcG9uc2VSZWZyZXNoSGVhbHRoUGVuZGluZ1JlY292ZXJ5Tm90aWNlc01pbikuZGVzY3JpYmUoJ1JlY292ZXJ5IG5vdGljZXMgd2FpdGluZyB0byBiZSBkZWxpdmVyZWQgdG8gc3RhZmYnKVxufSksXG4gIFwiYnJhbmRpbmdcIjogem9kLm9iamVjdCh7XG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKCkubWluKDEpLm1heChyZWZyZXNoVHJhY2tlclJlc3BvbnNlQnJhbmRpbmdOYW1lTWF4KSxcbiAgXCJsb2dvUGF0aFwiOiB6b2Quc3RyaW5nKCkubWF4KHJlZnJlc2hUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoTWF4KS5yZWdleChyZWZyZXNoVHJhY2tlclJlc3BvbnNlQnJhbmRpbmdMb2dvUGF0aFJlZ0V4cCkubnVsbGFibGUoKVxufSlcbn0pXG5cblxuIiwgImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmNvbnN0IERhdGVUaW1lU3RyaW5nID0gei5zdHJpbmcoKS5kYXRldGltZSh7IG9mZnNldDogdHJ1ZSB9KTtcbmNvbnN0IE9iamVjdFBhdGggPSB6LnN0cmluZygpLnJlZ2V4KC9eXFwvb2JqZWN0c1xcL3VwbG9hZHNcXC9bMC05YS1mLV0rJC8pO1xuXG5jb25zdCBUcmFja2VyUGVyc29uID0gei5vYmplY3Qoe1xuICBpZDogei5zdHJpbmcoKS5taW4oMSksXG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDEpLFxuICBzaGFyZVRva2VuOiB6LnN0cmluZygpLm1pbigzMikubWF4KDEyOCkucmVnZXgoL15bQS1aYS16MC05Xy1dKyQvKS5vcHRpb25hbCgpLFxufSk7XG5cbmNvbnN0IFJlZnJlc2hSZWNvdmVyeSA9IHoub2JqZWN0KHtcbiAgZmFpbGVkQXR0ZW1wdHM6IHoubnVtYmVyKCkuaW50KCkubWluKDEpLFxuICBvdXRhZ2VTdGFydGVkQXQ6IERhdGVUaW1lU3RyaW5nLFxuICByZWNvdmVyZWRBdDogRGF0ZVRpbWVTdHJpbmcsXG4gIG91dGFnZUR1cmF0aW9uTXM6IHoubnVtYmVyKCkuaW50KCkubWluKDApLFxufSk7XG5cbmNvbnN0IFJlZnJlc2hIZWFsdGggPSB6Lm9iamVjdCh7XG4gIGNvbnNlY3V0aXZlRmFpbHVyZXM6IHoubnVtYmVyKCkuaW50KCkubWluKDApLFxuICBhbGVydFRocmVzaG9sZDogei5udW1iZXIoKS5pbnQoKS5taW4oMSksXG4gIGZpcnN0RmFpbHVyZUF0OiBEYXRlVGltZVN0cmluZy5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG4gIGxhc3RGYWlsdXJlQXQ6IERhdGVUaW1lU3RyaW5nLm51bGxhYmxlKCksXG4gIGFsZXJ0U2VudEF0OiBEYXRlVGltZVN0cmluZy5udWxsYWJsZSgpLFxuICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IERhdGVUaW1lU3RyaW5nLm51bGxhYmxlKCkub3B0aW9uYWwoKSxcbiAgcGVuZGluZ1JlY292ZXJpZXM6IHouYXJyYXkoUmVmcmVzaFJlY292ZXJ5KS5vcHRpb25hbCgpLFxuICBwZW5kaW5nUmVjb3Zlcnk6IFJlZnJlc2hSZWNvdmVyeS5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG4gIHJlY292ZXJ5Q2xhaW06IHoub2JqZWN0KHtcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IERhdGVUaW1lU3RyaW5nLFxuICAgIHJlY292ZXJlZEF0OiBEYXRlVGltZVN0cmluZyxcbiAgICBjbGFpbWVkQXQ6IERhdGVUaW1lU3RyaW5nLFxuICB9KS5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG59KTtcblxuY29uc3QgQ29hY2hSZXBvcnQgPSB6Lm9iamVjdCh7XG4gIG1hdGNoSWQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBvYnNlcnZhdGlvbnM6IHouYXJyYXkoei5zdHJpbmcoKS5taW4oMSkpLmxlbmd0aCgzKSxcbiAgdHJhbnNjcmlwdDogei5zdHJpbmcoKS5udWxsYWJsZSgpLFxuICBhdWRpb1BhdGg6IE9iamVjdFBhdGgubnVsbGFibGUoKS5vcHRpb25hbCgpLFxuICB1cGRhdGVkQXQ6IERhdGVUaW1lU3RyaW5nLFxufSk7XG5cbmNvbnN0IFRyYWNrZXJNYXRjaCA9IHoub2JqZWN0KHtcbiAgaWQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBleHRlcm5hbElkOiB6LnN0cmluZygpLm51bGxhYmxlKCksXG4gIHBsYXllcklkOiB6LnN0cmluZygpLm1pbigxKSxcbiAgb3Bwb25lbnQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBzdGFydHNBdDogRGF0ZVRpbWVTdHJpbmcsXG4gIGVuZHNBdDogRGF0ZVRpbWVTdHJpbmcsXG4gIHZlbnVlOiB6LnN0cmluZygpLm1pbigxKSxcbiAgY291cnQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBjb2FjaElkOiB6LnN0cmluZygpLm1pbigxKSxcbiAgc3RhdHVzOiB6LmVudW0oW1widXBjb21pbmdcIiwgXCJjb21wbGV0ZWRcIl0pLFxuICByZXN1bHQ6IHouc3RyaW5nKCkubnVsbGFibGUoKSxcbiAgcmVwb3J0OiBDb2FjaFJlcG9ydC5udWxsYWJsZSgpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBQZXJzaXN0ZWRUcmFja2VyU3RhdGUgPSB6Lm9iamVjdCh7XG4gIHBsYXllcnM6IHouYXJyYXkoVHJhY2tlclBlcnNvbiksXG4gIGNvYWNoZXM6IHouYXJyYXkoVHJhY2tlclBlcnNvbiksXG4gIGJyYW5kaW5nOiB6XG4gICAgLm9iamVjdCh7XG4gICAgICBuYW1lOiB6LnN0cmluZygpLm1pbigxKS5tYXgoODApLFxuICAgICAgbG9nb1BhdGg6IE9iamVjdFBhdGgubnVsbGFibGUoKS5vcHRpb25hbCgpLFxuICAgICAgbG9nb1VybDogei5zdHJpbmcoKS5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG4gICAgfSlcbiAgICAub3B0aW9uYWwoKSxcbiAgbWF0Y2hlczogei5hcnJheShUcmFja2VyTWF0Y2gpLFxuICBsYXN0VXBkYXRlZEF0OiBEYXRlVGltZVN0cmluZyxcbiAgc291cmNlOiB6LmVudW0oW1wic2FtcGxlXCIsIFwiY2x1Yi1sb2NrZXJcIl0pLFxuICByZWZyZXNoSGVhbHRoOiBSZWZyZXNoSGVhbHRoLm9wdGlvbmFsKCksXG59KS5zdXBlclJlZmluZSgoc3RhdGUsIGNvbnRleHQpID0+IHtcbiAgY29uc3QgcGxheWVySWRzID0gbmV3IFNldChzdGF0ZS5wbGF5ZXJzLm1hcCgocGxheWVyKSA9PiBwbGF5ZXIuaWQpKTtcbiAgY29uc3QgY29hY2hJZHMgPSBuZXcgU2V0KHN0YXRlLmNvYWNoZXMubWFwKChjb2FjaCkgPT4gY29hY2guaWQpKTtcblxuICBzdGF0ZS5tYXRjaGVzLmZvckVhY2goKG1hdGNoLCBtYXRjaEluZGV4KSA9PiB7XG4gICAgaWYgKCFwbGF5ZXJJZHMuaGFzKG1hdGNoLnBsYXllcklkKSkge1xuICAgICAgY29udGV4dC5hZGRJc3N1ZSh7XG4gICAgICAgIGNvZGU6IHouWm9kSXNzdWVDb2RlLmN1c3RvbSxcbiAgICAgICAgcGF0aDogW1wibWF0Y2hlc1wiLCBtYXRjaEluZGV4LCBcInBsYXllcklkXCJdLFxuICAgICAgICBtZXNzYWdlOiBgTWF0Y2ggXCIke21hdGNoLmlkfVwiIHJlZmVyZW5jZXMgbWlzc2luZyBwbGF5ZXIgXCIke21hdGNoLnBsYXllcklkfVwiYCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghY29hY2hJZHMuaGFzKG1hdGNoLmNvYWNoSWQpKSB7XG4gICAgICBjb250ZXh0LmFkZElzc3VlKHtcbiAgICAgICAgY29kZTogei5ab2RJc3N1ZUNvZGUuY3VzdG9tLFxuICAgICAgICBwYXRoOiBbXCJtYXRjaGVzXCIsIG1hdGNoSW5kZXgsIFwiY29hY2hJZFwiXSxcbiAgICAgICAgbWVzc2FnZTogYE1hdGNoIFwiJHttYXRjaC5pZH1cIiByZWZlcmVuY2VzIG1pc3NpbmcgY29hY2ggXCIke21hdGNoLmNvYWNoSWR9XCJgLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKERhdGUucGFyc2UobWF0Y2guZW5kc0F0KSA8PSBEYXRlLnBhcnNlKG1hdGNoLnN0YXJ0c0F0KSkge1xuICAgICAgY29udGV4dC5hZGRJc3N1ZSh7XG4gICAgICAgIGNvZGU6IHouWm9kSXNzdWVDb2RlLmN1c3RvbSxcbiAgICAgICAgcGF0aDogW1wibWF0Y2hlc1wiLCBtYXRjaEluZGV4LCBcImVuZHNBdFwiXSxcbiAgICAgICAgbWVzc2FnZTogYE1hdGNoIFwiJHttYXRjaC5pZH1cIiBlbmRzQXQgbXVzdCBiZSBhZnRlciBzdGFydHNBdGAsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobWF0Y2gucmVwb3J0ICYmIG1hdGNoLnJlcG9ydC5tYXRjaElkICE9PSBtYXRjaC5pZCkge1xuICAgICAgY29udGV4dC5hZGRJc3N1ZSh7XG4gICAgICAgIGNvZGU6IHouWm9kSXNzdWVDb2RlLmN1c3RvbSxcbiAgICAgICAgcGF0aDogW1wibWF0Y2hlc1wiLCBtYXRjaEluZGV4LCBcInJlcG9ydFwiLCBcIm1hdGNoSWRcIl0sXG4gICAgICAgIG1lc3NhZ2U6IGBSZXBvcnQgbWF0Y2hJZCBcIiR7bWF0Y2gucmVwb3J0Lm1hdGNoSWR9XCIgZG9lcyBub3QgbWF0Y2ggY29udGFpbmluZyBtYXRjaCBcIiR7bWF0Y2guaWR9XCJgLFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5leHBvcnQgdHlwZSBQZXJzaXN0ZWRUcmFja2VyU3RhdGUgPSB6LmluZmVyPHR5cGVvZiBQZXJzaXN0ZWRUcmFja2VyU3RhdGU+OyIsICJ0eXBlIFRyYWNrZXJQZXJzb24gPSB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgc2hhcmVUb2tlbj86IHN0cmluZyB9O1xuXG50eXBlIFRyYWNrZXJNYXRjaCA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGV4dGVybmFsSWQ6IHN0cmluZyB8IG51bGw7XG4gICAgcGxheWVySWQ6IHN0cmluZztcbiAgICBvcHBvbmVudDogc3RyaW5nO1xuICAgIHN0YXJ0c0F0OiBzdHJpbmc7XG4gICAgZW5kc0F0OiBzdHJpbmc7XG4gICAgdmVudWU6IHN0cmluZztcbiAgICBjb3VydDogc3RyaW5nO1xuICAgIGNvYWNoSWQ6IHN0cmluZztcbiAgICBzdGF0dXM6IFwidXBjb21pbmdcIiB8IFwiY29tcGxldGVkXCI7XG4gICAgcmVzdWx0OiBzdHJpbmcgfCBudWxsO1xuICAgIHJlcG9ydDoge1xuICAgICAgbWF0Y2hJZDogc3RyaW5nO1xuICAgICAgb2JzZXJ2YXRpb25zOiBzdHJpbmdbXTtcbiAgICAgIHRyYW5zY3JpcHQ6IHN0cmluZyB8IG51bGw7XG4gICAgICBhdWRpb1BhdGg/OiBzdHJpbmcgfCBudWxsO1xuICAgICAgdXBkYXRlZEF0OiBzdHJpbmc7XG4gICAgfSB8IG51bGw7XG4gIH07XG5cbmV4cG9ydCB0eXBlIFRyYWNrZXJTdGF0ZSA9IHtcbiAgcGxheWVyczogVHJhY2tlclBlcnNvbltdO1xuICBjb2FjaGVzOiBUcmFja2VyUGVyc29uW107XG4gIGJyYW5kaW5nPzogeyBuYW1lOiBzdHJpbmc7IGxvZ29QYXRoOiBzdHJpbmcgfCBudWxsIH07XG4gIG1hdGNoZXM6IFRyYWNrZXJNYXRjaFtdO1xuICBsYXN0VXBkYXRlZEF0OiBzdHJpbmc7XG4gIHNvdXJjZTogXCJzYW1wbGVcIiB8IFwiY2x1Yi1sb2NrZXJcIjtcbiAgcmVmcmVzaEhlYWx0aDogUmVmcmVzaEhlYWx0aDtcbn07XG5cbnR5cGUgRGVlcFJlYWRvbmx5PFQ+ID0gVCBleHRlbmRzICguLi5hcmdzOiBuZXZlcltdKSA9PiB1bmtub3duXG4gID8gVFxuICA6IFQgZXh0ZW5kcyByZWFkb25seSAoaW5mZXIgSXRlbSlbXVxuICAgID8gcmVhZG9ubHkgRGVlcFJlYWRvbmx5PEl0ZW0+W11cbiAgICA6IFQgZXh0ZW5kcyBvYmplY3RcbiAgICAgID8geyByZWFkb25seSBbS2V5IGluIGtleW9mIFRdOiBEZWVwUmVhZG9ubHk8VFtLZXldPiB9XG4gICAgICA6IFQ7XG5cbmV4cG9ydCB0eXBlIFJlYWRvbmx5VHJhY2tlclN0YXRlID0gRGVlcFJlYWRvbmx5PFRyYWNrZXJTdGF0ZT47XG5cbmV4cG9ydCB0eXBlIFJlZnJlc2hIZWFsdGggPSB7XG4gIGNvbnNlY3V0aXZlRmFpbHVyZXM6IG51bWJlcjtcbiAgYWxlcnRUaHJlc2hvbGQ6IG51bWJlcjtcbiAgZmlyc3RGYWlsdXJlQXQ6IHN0cmluZyB8IG51bGw7XG4gIGxhc3RGYWlsdXJlQXQ6IHN0cmluZyB8IG51bGw7XG4gIGFsZXJ0U2VudEF0OiBzdHJpbmcgfCBudWxsO1xuICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IHN0cmluZyB8IG51bGw7XG4gIHBlbmRpbmdSZWNvdmVyaWVzOiBSZWZyZXNoUmVjb3ZlcnlbXTtcbiAgcmVjb3ZlcnlDbGFpbToge1xuICAgIG91dGFnZVN0YXJ0ZWRBdDogc3RyaW5nO1xuICAgIHJlY292ZXJlZEF0OiBzdHJpbmc7XG4gICAgY2xhaW1lZEF0OiBzdHJpbmc7XG4gIH0gfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgUmVmcmVzaFJlY292ZXJ5ID0ge1xuICBmYWlsZWRBdHRlbXB0czogbnVtYmVyO1xuICBvdXRhZ2VTdGFydGVkQXQ6IHN0cmluZztcbiAgcmVjb3ZlcmVkQXQ6IHN0cmluZztcbiAgb3V0YWdlRHVyYXRpb25NczogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lVHJhY2tlclN0YXRlKHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSk6IFRyYWNrZXJTdGF0ZSB7XG4gIHJldHVybiB7XG4gICAgcGxheWVyczogc3RhdGUucGxheWVycy5tYXAoKHBsYXllcikgPT4gKHsgLi4ucGxheWVyIH0pKSxcbiAgICBjb2FjaGVzOiBzdGF0ZS5jb2FjaGVzLm1hcCgoY29hY2gpID0+ICh7IC4uLmNvYWNoIH0pKSxcbiAgICBicmFuZGluZzogc3RhdGUuYnJhbmRpbmcgPyB7IC4uLnN0YXRlLmJyYW5kaW5nIH0gOiB1bmRlZmluZWQsXG4gICAgbWF0Y2hlczogc3RhdGUubWF0Y2hlcy5tYXAoY2xvbmVUcmFja2VyTWF0Y2gpLFxuICAgIGxhc3RVcGRhdGVkQXQ6IHN0YXRlLmxhc3RVcGRhdGVkQXQsXG4gICAgc291cmNlOiBzdGF0ZS5zb3VyY2UsXG4gICAgcmVmcmVzaEhlYWx0aDoge1xuICAgICAgLi4uc3RhdGUucmVmcmVzaEhlYWx0aCxcbiAgICAgIHBlbmRpbmdSZWNvdmVyaWVzOiBjbG9uZVJlZnJlc2hSZWNvdmVyaWVzKFxuICAgICAgICBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLFxuICAgICAgKSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJlZXplVHJhY2tlclN0YXRlKHN0YXRlOiBUcmFja2VyU3RhdGUpOiBSZWFkb25seVRyYWNrZXJTdGF0ZSB7XG4gIGZvciAoY29uc3QgcGxheWVyIG9mIHN0YXRlLnBsYXllcnMpIE9iamVjdC5mcmVlemUocGxheWVyKTtcbiAgT2JqZWN0LmZyZWV6ZShzdGF0ZS5wbGF5ZXJzKTtcbiAgZm9yIChjb25zdCBjb2FjaCBvZiBzdGF0ZS5jb2FjaGVzKSBPYmplY3QuZnJlZXplKGNvYWNoKTtcbiAgT2JqZWN0LmZyZWV6ZShzdGF0ZS5jb2FjaGVzKTtcbiAgaWYgKHN0YXRlLmJyYW5kaW5nKSBPYmplY3QuZnJlZXplKHN0YXRlLmJyYW5kaW5nKTtcbiAgZm9yIChjb25zdCBtYXRjaCBvZiBzdGF0ZS5tYXRjaGVzKSB7XG4gICAgaWYgKG1hdGNoLnJlcG9ydCkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShtYXRjaC5yZXBvcnQub2JzZXJ2YXRpb25zKTtcbiAgICAgIE9iamVjdC5mcmVlemUobWF0Y2gucmVwb3J0KTtcbiAgICB9XG4gICAgT2JqZWN0LmZyZWV6ZShtYXRjaCk7XG4gIH1cbiAgT2JqZWN0LmZyZWV6ZShzdGF0ZS5tYXRjaGVzKTtcbiAgZm9yIChjb25zdCByZWNvdmVyeSBvZiBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzKSB7XG4gICAgT2JqZWN0LmZyZWV6ZShyZWNvdmVyeSk7XG4gIH1cbiAgT2JqZWN0LmZyZWV6ZShzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzKTtcbiAgaWYgKHN0YXRlLnJlZnJlc2hIZWFsdGgucmVjb3ZlcnlDbGFpbSkge1xuICAgIE9iamVjdC5mcmVlemUoc3RhdGUucmVmcmVzaEhlYWx0aC5yZWNvdmVyeUNsYWltKTtcbiAgfVxuICBPYmplY3QuZnJlZXplKHN0YXRlLnJlZnJlc2hIZWFsdGgpO1xuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNsb25lUmVmcmVzaFJlY292ZXJpZXMoXG4gIHJlY292ZXJpZXM6IHJlYWRvbmx5IERlZXBSZWFkb25seTxSZWZyZXNoUmVjb3Zlcnk+W10sXG4pOiBSZWZyZXNoUmVjb3ZlcnlbXSB7XG4gIHJldHVybiByZWNvdmVyaWVzLm1hcCgocmVjb3ZlcnkpID0+ICh7IC4uLnJlY292ZXJ5IH0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlZnJlc2hSZWNvdmVyeShcbiAgc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlLFxuICByZWNvdmVyZWRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbik6IFJlZnJlc2hSZWNvdmVyeSB8IG51bGwge1xuICBjb25zdCB7IGFsZXJ0U2VudEF0LCBjb25zZWN1dGl2ZUZhaWx1cmVzLCBmaXJzdEZhaWx1cmVBdCB9ID1cbiAgICBzdGF0ZS5yZWZyZXNoSGVhbHRoO1xuICBpZiAoXG4gICAgYWxlcnRTZW50QXQgPT09IG51bGwgfHxcbiAgICBjb25zZWN1dGl2ZUZhaWx1cmVzID09PSAwIHx8XG4gICAgZmlyc3RGYWlsdXJlQXQgPT09IG51bGxcbiAgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZhaWxlZEF0dGVtcHRzOiBjb25zZWN1dGl2ZUZhaWx1cmVzLFxuICAgIG91dGFnZVN0YXJ0ZWRBdDogZmlyc3RGYWlsdXJlQXQsXG4gICAgcmVjb3ZlcmVkQXQsXG4gICAgb3V0YWdlRHVyYXRpb25NczogTWF0aC5tYXgoXG4gICAgICAwLFxuICAgICAgRGF0ZS5wYXJzZShyZWNvdmVyZWRBdCkgLSBEYXRlLnBhcnNlKGZpcnN0RmFpbHVyZUF0KSxcbiAgICApLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJSZWZyZXNoRmFpbHVyZXMoXG4gIHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgYWxlcnRUaHJlc2hvbGQ6IG51bWJlcixcbiAgcmVjb3ZlcmVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4pOiBUcmFja2VyU3RhdGUge1xuICBjb25zdCByZXBsYWNlbWVudCA9IGNsb25lVHJhY2tlclN0YXRlKHN0YXRlKTtcbiAgY29uc3QgcGVuZGluZ1JlY292ZXJpZXMgPSByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzO1xuICBjb25zdCByZWNvdmVyeSA9IGdldFJlZnJlc2hSZWNvdmVyeShzdGF0ZSwgcmVjb3ZlcmVkQXQpO1xuICBpZiAocmVjb3ZlcnkpIHBlbmRpbmdSZWNvdmVyaWVzLnB1c2gocmVjb3ZlcnkpO1xuICByZXR1cm4ge1xuICAgIC4uLnJlcGxhY2VtZW50LFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIGNvbnNlY3V0aXZlRmFpbHVyZXM6IDAsXG4gICAgICBhbGVydFRocmVzaG9sZCxcbiAgICAgIGZpcnN0RmFpbHVyZUF0OiBudWxsLFxuICAgICAgbGFzdEZhaWx1cmVBdDogbnVsbCxcbiAgICAgIGFsZXJ0U2VudEF0OiBudWxsLFxuICAgICAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OiBudWxsLFxuICAgICAgcGVuZGluZ1JlY292ZXJpZXMsXG4gICAgICByZWNvdmVyeUNsYWltOiByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0sXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyUGVuZGluZ1JlY292ZXJ5KHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSk6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoc3RhdGUpO1xuICByZXR1cm4ge1xuICAgIC4uLnJlcGxhY2VtZW50LFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIC4uLnJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogcmVwbGFjZW1lbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcy5zbGljZSgxKSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gIHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgYWxlcnRUaHJlc2hvbGQ6IG51bWJlcixcbiAgZmFpbGVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4pOiBUcmFja2VyU3RhdGUge1xuICBjb25zdCByZXBsYWNlbWVudCA9IGNsb25lVHJhY2tlclN0YXRlKHN0YXRlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXBsYWNlbWVudCxcbiAgICByZWZyZXNoSGVhbHRoOiB7XG4gICAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiBzdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMgKyAxLFxuICAgICAgYWxlcnRUaHJlc2hvbGQsXG4gICAgICBmaXJzdEZhaWx1cmVBdDogc3RhdGUucmVmcmVzaEhlYWx0aC5maXJzdEZhaWx1cmVBdCA/PyBmYWlsZWRBdCxcbiAgICAgIGxhc3RGYWlsdXJlQXQ6IGZhaWxlZEF0LFxuICAgICAgYWxlcnRTZW50QXQ6IHN0YXRlLnJlZnJlc2hIZWFsdGguYWxlcnRTZW50QXQsXG4gICAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IHN0YXRlLnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0LFxuICAgICAgcGVuZGluZ1JlY292ZXJpZXM6IHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMsXG4gICAgICByZWNvdmVyeUNsYWltOiByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0sXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQ2x1YkxvY2tlck1hdGNoID0ge1xuICBleHRlcm5hbElkOiBzdHJpbmc7XG4gIHBsYXllcklkOiBzdHJpbmc7XG4gIHBsYXllck5hbWU/OiBzdHJpbmc7XG4gIG9wcG9uZW50OiBzdHJpbmc7XG4gIHN0YXJ0c0F0OiBzdHJpbmc7XG4gIGVuZHNBdDogc3RyaW5nO1xuICB2ZW51ZTogc3RyaW5nO1xuICBjb3VydDogc3RyaW5nO1xuICBzdGF0dXM/OiBcInVwY29taW5nXCIgfCBcImNvbXBsZXRlZFwiO1xuICByZXN1bHQ/OiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgQ2x1YkxvY2tlckZlZWQgPSB7XG4gIG1hdGNoZXM6IENsdWJMb2NrZXJNYXRjaFtdO1xuICBwbGF5ZXJzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT47XG59O1xuXG5leHBvcnQgdHlwZSBSZWFkb25seUNsdWJMb2NrZXJGZWVkID0gRGVlcFJlYWRvbmx5PENsdWJMb2NrZXJGZWVkPjtcblxuZnVuY3Rpb24gY2xvbmVUcmFja2VyTWF0Y2gobWF0Y2g6IFJlYWRvbmx5VHJhY2tlclN0YXRlW1wibWF0Y2hlc1wiXVtudW1iZXJdKTogVHJhY2tlck1hdGNoIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5tYXRjaCxcbiAgICByZXBvcnQ6XG4gICAgICBtYXRjaC5yZXBvcnQgPT09IG51bGxcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDoge1xuICAgICAgICAgICAgLi4ubWF0Y2gucmVwb3J0LFxuICAgICAgICAgICAgb2JzZXJ2YXRpb25zOiBbLi4ubWF0Y2gucmVwb3J0Lm9ic2VydmF0aW9uc10sXG4gICAgICAgICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVhZFJlcXVpcmVkU3RyaW5nKHZhbHVlOiB1bmtub3duLCBmaWVsZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIiB8fCB2YWx1ZS50cmltKCkgPT09IFwiXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCAke2ZpZWxkfWApO1xuICB9XG4gIHJldHVybiB2YWx1ZS50cmltKCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRUaW1lc3RhbXBXaXRoVGltZXpvbmUoXG4gIHZhbHVlOiB1bmtub3duLFxuICBmaWVsZDogc3RyaW5nLFxuICBpbmRleDogbnVtYmVyLFxuKTogc3RyaW5nIHtcbiAgY29uc3QgdGltZXN0YW1wID0gcmVhZFJlcXVpcmVkU3RyaW5nKHZhbHVlLCBmaWVsZCwgaW5kZXgpO1xuICBpZiAoIS8oPzpafFsrLV1cXGR7Mn06XFxkezJ9KSQvaS50ZXN0KHRpbWVzdGFtcCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgTWF0Y2ggJHtpbmRleCArIDF9ICR7ZmllbGR9IG11c3QgaW5jbHVkZSBhbiBleHBsaWNpdCB0aW1lem9uZWAsXG4gICAgKTtcbiAgfVxuICBpZiAoTnVtYmVyLmlzTmFOKERhdGUucGFyc2UodGltZXN0YW1wKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCAke2ZpZWxkfWApO1xuICB9XG4gIHJldHVybiB0aW1lc3RhbXA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNsdWJMb2NrZXJGZWVkKHZhbHVlOiB1bmtub3duKTogUmVhZG9ubHlDbHViTG9ja2VyRmVlZCB7XG4gIGlmIChcbiAgICAhdmFsdWUgfHxcbiAgICB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHxcbiAgICAhQXJyYXkuaXNBcnJheSgodmFsdWUgYXMgeyBtYXRjaGVzPzogdW5rbm93biB9KS5tYXRjaGVzKVxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgQ2x1YiBMb2NrZXIgcmVzcG9uc2UgZG9lcyBub3QgY29udGFpbiBhIG1hdGNoZXMgYXJyYXlcIik7XG4gIH1cblxuICBjb25zdCByYXcgPSB2YWx1ZSBhcyB7XG4gICAgbWF0Y2hlczogQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+O1xuICAgIHBsYXllcnM/OiB1bmtub3duO1xuICB9O1xuICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IG1hdGNoZXMgPSByYXcubWF0Y2hlcy5tYXAoKG1hdGNoLCBpbmRleCk6IENsdWJMb2NrZXJNYXRjaCA9PiB7XG4gICAgY29uc3QgZXh0ZXJuYWxJZCA9IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5leHRlcm5hbElkLCBcImV4dGVybmFsSWRcIiwgaW5kZXgpO1xuICAgIGlmIChzZWVuLmhhcyhleHRlcm5hbElkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDbHViIExvY2tlciByZXR1cm5lZCBkdXBsaWNhdGUgbWF0Y2ggSUQgXCIke2V4dGVybmFsSWR9XCJgKTtcbiAgICB9XG4gICAgc2Vlbi5hZGQoZXh0ZXJuYWxJZCk7XG5cbiAgICBjb25zdCBzdGFydHNBdCA9IHJlYWRUaW1lc3RhbXBXaXRoVGltZXpvbmUobWF0Y2guc3RhcnRzQXQsIFwic3RhcnRzQXRcIiwgaW5kZXgpO1xuICAgIGNvbnN0IGVuZHNBdCA9IHJlYWRUaW1lc3RhbXBXaXRoVGltZXpvbmUobWF0Y2guZW5kc0F0LCBcImVuZHNBdFwiLCBpbmRleCk7XG4gICAgaWYgKERhdGUucGFyc2UoZW5kc0F0KSA8PSBEYXRlLnBhcnNlKHN0YXJ0c0F0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNYXRjaCAke2luZGV4ICsgMX0gbXVzdCBlbmQgYWZ0ZXIgaXQgc3RhcnRzYCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIG1hdGNoLnN0YXR1cyAhPSBudWxsICYmXG4gICAgICBtYXRjaC5zdGF0dXMgIT09IFwidXBjb21pbmdcIiAmJlxuICAgICAgbWF0Y2guc3RhdHVzICE9PSBcImNvbXBsZXRlZFwiXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCBzdGF0dXNgKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZXh0ZXJuYWxJZCxcbiAgICAgIHBsYXllcklkOiByZWFkUmVxdWlyZWRTdHJpbmcobWF0Y2gucGxheWVySWQsIFwicGxheWVySWRcIiwgaW5kZXgpLFxuICAgICAgcGxheWVyTmFtZTpcbiAgICAgICAgdHlwZW9mIG1hdGNoLnBsYXllck5hbWUgPT09IFwic3RyaW5nXCIgPyBtYXRjaC5wbGF5ZXJOYW1lLnRyaW0oKSA6IHVuZGVmaW5lZCxcbiAgICAgIG9wcG9uZW50OiByZWFkUmVxdWlyZWRTdHJpbmcobWF0Y2gub3Bwb25lbnQsIFwib3Bwb25lbnRcIiwgaW5kZXgpLFxuICAgICAgc3RhcnRzQXQsXG4gICAgICBlbmRzQXQsXG4gICAgICB2ZW51ZTogcmVhZFJlcXVpcmVkU3RyaW5nKG1hdGNoLnZlbnVlLCBcInZlbnVlXCIsIGluZGV4KSxcbiAgICAgIGNvdXJ0OiByZWFkUmVxdWlyZWRTdHJpbmcobWF0Y2guY291cnQsIFwiY291cnRcIiwgaW5kZXgpLFxuICAgICAgc3RhdHVzOlxuICAgICAgICBtYXRjaC5zdGF0dXMgPT09IFwidXBjb21pbmdcIiB8fCBtYXRjaC5zdGF0dXMgPT09IFwiY29tcGxldGVkXCJcbiAgICAgICAgICA/IG1hdGNoLnN0YXR1c1xuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgcmVzdWx0OlxuICAgICAgICB0eXBlb2YgbWF0Y2gucmVzdWx0ID09PSBcInN0cmluZ1wiIHx8IG1hdGNoLnJlc3VsdCA9PT0gbnVsbFxuICAgICAgICAgID8gbWF0Y2gucmVzdWx0XG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgfSk7XG5cbiAgY29uc3QgbWF0Y2hlc0J5UGxheWVyID0gbmV3IE1hcDxzdHJpbmcsIENsdWJMb2NrZXJNYXRjaFtdPigpO1xuICBmb3IgKGNvbnN0IG1hdGNoIG9mIG1hdGNoZXMpIHtcbiAgICBjb25zdCBwbGF5ZXJNYXRjaGVzID0gbWF0Y2hlc0J5UGxheWVyLmdldChtYXRjaC5wbGF5ZXJJZCkgPz8gW107XG4gICAgcGxheWVyTWF0Y2hlcy5wdXNoKG1hdGNoKTtcbiAgICBtYXRjaGVzQnlQbGF5ZXIuc2V0KG1hdGNoLnBsYXllcklkLCBwbGF5ZXJNYXRjaGVzKTtcbiAgfVxuICBmb3IgKGNvbnN0IFtwbGF5ZXJJZCwgcGxheWVyTWF0Y2hlc10gb2YgbWF0Y2hlc0J5UGxheWVyKSB7XG4gICAgcGxheWVyTWF0Y2hlcy5zb3J0KFxuICAgICAgKGxlZnQsIHJpZ2h0KSA9PiBEYXRlLnBhcnNlKGxlZnQuc3RhcnRzQXQpIC0gRGF0ZS5wYXJzZShyaWdodC5zdGFydHNBdCksXG4gICAgKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgcGxheWVyTWF0Y2hlcy5sZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzID0gcGxheWVyTWF0Y2hlc1tpbmRleCAtIDFdO1xuICAgICAgY29uc3QgY3VycmVudCA9IHBsYXllck1hdGNoZXNbaW5kZXhdO1xuICAgICAgaWYgKERhdGUucGFyc2UoY3VycmVudC5zdGFydHNBdCkgPCBEYXRlLnBhcnNlKHByZXZpb3VzLmVuZHNBdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBDbHViIExvY2tlciByZXR1cm5lZCBvdmVybGFwcGluZyBtYXRjaGVzIGZvciBwbGF5ZXIgSUQgXCIke3BsYXllcklkfVwiYCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGF5ZXJOYW1lc0J5SWQgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBjb25zdCBwbGF5ZXJzID0gQXJyYXkuaXNBcnJheShyYXcucGxheWVycylcbiAgICA/IHJhdy5wbGF5ZXJzLm1hcCgocGxheWVyLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoIXBsYXllciB8fCB0eXBlb2YgcGxheWVyICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbGF5ZXIgJHtpbmRleCArIDF9IGlzIGludmFsaWRgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtID0gcGxheWVyIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgICAgICBjb25zdCBpZCA9IHJlYWRSZXF1aXJlZFN0cmluZyhpdGVtLmlkLCBcInBsYXllciBpZFwiLCBpbmRleCk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSByZWFkUmVxdWlyZWRTdHJpbmcoaXRlbS5uYW1lLCBcInBsYXllciBuYW1lXCIsIGluZGV4KTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdOYW1lID0gcGxheWVyTmFtZXNCeUlkLmdldChpZCk7XG4gICAgICAgIGlmIChleGlzdGluZ05hbWUgIT09IHVuZGVmaW5lZCAmJiBleGlzdGluZ05hbWUgIT09IG5hbWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgQ2x1YiBMb2NrZXIgcmV0dXJuZWQgY29uZmxpY3RpbmcgbmFtZXMgZm9yIHBsYXllciBJRCBcIiR7aWR9XCJgLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcGxheWVyTmFtZXNCeUlkLnNldChpZCwgbmFtZSk7XG4gICAgICAgIHJldHVybiB7IGlkLCBuYW1lIH07XG4gICAgICB9KVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykgT2JqZWN0LmZyZWV6ZShtYXRjaCk7XG4gIE9iamVjdC5mcmVlemUobWF0Y2hlcyk7XG4gIGlmIChwbGF5ZXJzKSB7XG4gICAgZm9yIChjb25zdCBwbGF5ZXIgb2YgcGxheWVycykgT2JqZWN0LmZyZWV6ZShwbGF5ZXIpO1xuICAgIE9iamVjdC5mcmVlemUocGxheWVycyk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IG1hdGNoZXMsIHBsYXllcnMgfSk7XG59XG5cbi8vIFRoZSBwbGFjZWhvbGRlciBkcmF3IGEgbmV3IHRyYWNrZXIgc3RhcnRzIHdpdGggKElOSVRJQUxfU1RBVEUgaW5cbi8vIHJvdXRlcy90cmFja2VyLnRzKSBpcyBkcm9wcGVkIG9uY2UgYSByZWFsIENsdWIgTG9ja2VyIHNjaGVkdWxlIGFycml2ZXMuXG5jb25zdCBTQU1QTEVfUExBWUVSX0lEID0gXCJjYW1lcm9uLXN0YWl0XCI7XG5cbmZ1bmN0aW9uIHdpdGhvdXRTYW1wbGVEcmF3KHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSk6IFJlYWRvbmx5VHJhY2tlclN0YXRlIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHN0YXRlLm1hdGNoZXMuZmlsdGVyKFxuICAgIChtYXRjaCkgPT4gIShtYXRjaC5leHRlcm5hbElkID09PSBudWxsICYmIG1hdGNoLnBsYXllcklkID09PSBTQU1QTEVfUExBWUVSX0lEKSxcbiAgKTtcbiAgY29uc3QgcGxheWVycyA9IG1hdGNoZXMuc29tZSgobWF0Y2gpID0+IG1hdGNoLnBsYXllcklkID09PSBTQU1QTEVfUExBWUVSX0lEKVxuICAgID8gc3RhdGUucGxheWVyc1xuICAgIDogc3RhdGUucGxheWVycy5maWx0ZXIoKHBsYXllcikgPT4gcGxheWVyLmlkICE9PSBTQU1QTEVfUExBWUVSX0lEKTtcbiAgcmV0dXJuIHsgLi4uc3RhdGUsIG1hdGNoZXMsIHBsYXllcnMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQ2x1YkxvY2tlckZlZWQoXG4gIGxvYWRlZFN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgZmVlZDogUmVhZG9ubHlDbHViTG9ja2VyRmVlZCxcbik6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHN0YXRlID0gd2l0aG91dFNhbXBsZURyYXcobG9hZGVkU3RhdGUpO1xuICBjb25zdCBjdXJyZW50QnlFeHRlcm5hbElkID0gbmV3IE1hcChcbiAgICBzdGF0ZS5tYXRjaGVzXG4gICAgICAuZmlsdGVyKFxuICAgICAgICAobWF0Y2gpOiBtYXRjaCBpcyB0eXBlb2YgbWF0Y2ggJiB7IGV4dGVybmFsSWQ6IHN0cmluZyB9ID0+XG4gICAgICAgICAgbWF0Y2guZXh0ZXJuYWxJZCAhPT0gbnVsbCxcbiAgICAgIClcbiAgICAgIC5tYXAoKG1hdGNoKSA9PiBbbWF0Y2guZXh0ZXJuYWxJZCwgbWF0Y2hdKSxcbiAgKTtcbiAgY29uc3QgaW5jb21pbmdCeUV4dGVybmFsSWQgPSBuZXcgTWFwKFxuICAgIGZlZWQubWF0Y2hlcy5tYXAoKG1hdGNoKSA9PiBbbWF0Y2guZXh0ZXJuYWxJZCwgbWF0Y2hdKSxcbiAgKTtcbiAgY29uc3QgaW1wb3J0ZWRJZHMgPSBuZXcgU2V0KGZlZWQubWF0Y2hlcy5tYXAoKG1hdGNoKSA9PiBtYXRjaC5leHRlcm5hbElkKSk7XG4gIGNvbnN0IGxvY2FsbHlSZXRhaW5lZCA9IHN0YXRlLm1hdGNoZXMuZmlsdGVyKFxuICAgIChtYXRjaCkgPT5cbiAgICAgIChtYXRjaC5leHRlcm5hbElkID09PSBudWxsIHx8ICFpbXBvcnRlZElkcy5oYXMobWF0Y2guZXh0ZXJuYWxJZCkpICYmXG4gICAgICAobWF0Y2guZXh0ZXJuYWxJZCA9PT0gbnVsbCB8fFxuICAgICAgICBtYXRjaC5zdGF0dXMgPT09IFwiY29tcGxldGVkXCIgfHxcbiAgICAgICAgbWF0Y2gucmVwb3J0ICE9PSBudWxsKSxcbiAgKTtcbiAgZm9yIChjb25zdCBpbmNvbWluZyBvZiBmZWVkLm1hdGNoZXMpIHtcbiAgICBjb25zdCBvdmVybGFwc1JldGFpbmVkTWF0Y2ggPSBsb2NhbGx5UmV0YWluZWQuc29tZShcbiAgICAgIChyZXRhaW5lZE1hdGNoKSA9PlxuICAgICAgICByZXRhaW5lZE1hdGNoLnBsYXllcklkID09PSBpbmNvbWluZy5wbGF5ZXJJZCAmJlxuICAgICAgICBEYXRlLnBhcnNlKGluY29taW5nLnN0YXJ0c0F0KSA8IERhdGUucGFyc2UocmV0YWluZWRNYXRjaC5lbmRzQXQpICYmXG4gICAgICAgIERhdGUucGFyc2UocmV0YWluZWRNYXRjaC5zdGFydHNBdCkgPCBEYXRlLnBhcnNlKGluY29taW5nLmVuZHNBdCksXG4gICAgKTtcbiAgICBpZiAob3ZlcmxhcHNSZXRhaW5lZE1hdGNoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBDbHViIExvY2tlciByZXR1cm5lZCBhIG1hdGNoIG92ZXJsYXBwaW5nIGEgcmV0YWluZWQgbWF0Y2ggZm9yIHBsYXllciBJRCBcIiR7aW5jb21pbmcucGxheWVySWR9XCJgLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCByZXRhaW5lZCA9IHN0YXRlLm1hdGNoZXNcbiAgICAuZmlsdGVyKFxuICAgICAgKG1hdGNoKSA9PlxuICAgICAgICBtYXRjaC5leHRlcm5hbElkID09PSBudWxsIHx8XG4gICAgICAgIGltcG9ydGVkSWRzLmhhcyhtYXRjaC5leHRlcm5hbElkKSB8fFxuICAgICAgICBtYXRjaC5zdGF0dXMgPT09IFwiY29tcGxldGVkXCIgfHxcbiAgICAgICAgbWF0Y2gucmVwb3J0ICE9PSBudWxsLFxuICAgIClcbiAgICAubWFwKChtYXRjaCkgPT4ge1xuICAgICAgY29uc3QgaW5jb21pbmcgPVxuICAgICAgICBtYXRjaC5leHRlcm5hbElkID09PSBudWxsXG4gICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICA6IGluY29taW5nQnlFeHRlcm5hbElkLmdldChtYXRjaC5leHRlcm5hbElkKTtcbiAgICAgIC8vIEEgcmVzdWx0IHJlY29yZGVkIGluIENsdWIgTG9ja2VyIGNsb3NlcyBvdXQgYSBtYXRjaCBzdGFmZiBoYXZlIG5vdFxuICAgICAgLy8gY2xvc2VkIHlldDsgYSByZXN1bHQgc3RhZmYgZW50ZXJlZCB0aGVtc2VsdmVzIGlzIG5ldmVyIG92ZXJ3cml0dGVuLlxuICAgICAgY29uc3QgYWRvcHRSZXN1bHQgPVxuICAgICAgICBpbmNvbWluZz8uc3RhdHVzID09PSBcImNvbXBsZXRlZFwiICYmIG1hdGNoLnN0YXR1cyA9PT0gXCJ1cGNvbWluZ1wiO1xuICAgICAgcmV0dXJuIGluY29taW5nXG4gICAgICAgID8ge1xuICAgICAgICAgICAgLi4uY2xvbmVUcmFja2VyTWF0Y2gobWF0Y2gpLFxuICAgICAgICAgICAgcGxheWVySWQ6IGluY29taW5nLnBsYXllcklkLFxuICAgICAgICAgICAgb3Bwb25lbnQ6IGluY29taW5nLm9wcG9uZW50LFxuICAgICAgICAgICAgc3RhcnRzQXQ6IGluY29taW5nLnN0YXJ0c0F0LFxuICAgICAgICAgICAgZW5kc0F0OiBpbmNvbWluZy5lbmRzQXQsXG4gICAgICAgICAgICB2ZW51ZTogaW5jb21pbmcudmVudWUsXG4gICAgICAgICAgICBjb3VydDogaW5jb21pbmcuY291cnQsXG4gICAgICAgICAgICAuLi4oYWRvcHRSZXN1bHRcbiAgICAgICAgICAgICAgPyB7IHN0YXR1czogXCJjb21wbGV0ZWRcIiBhcyBjb25zdCwgcmVzdWx0OiBpbmNvbWluZy5yZXN1bHQgPz8gbnVsbCB9XG4gICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgIH1cbiAgICAgICAgOiBjbG9uZVRyYWNrZXJNYXRjaChtYXRjaCk7XG4gICAgfSk7XG5cbiAgZm9yIChjb25zdCBpbmNvbWluZyBvZiBmZWVkLm1hdGNoZXMpIHtcbiAgICBjb25zdCBleGlzdGluZyA9IGN1cnJlbnRCeUV4dGVybmFsSWQuZ2V0KGluY29taW5nLmV4dGVybmFsSWQpO1xuICAgIGlmIChleGlzdGluZykgY29udGludWU7XG5cbiAgICByZXRhaW5lZC5wdXNoKHtcbiAgICAgIGlkOiBgY2x1Yi1sb2NrZXI6JHtCdWZmZXIuZnJvbShpbmNvbWluZy5leHRlcm5hbElkKS50b1N0cmluZyhcImJhc2U2NHVybFwiKX1gLFxuICAgICAgZXh0ZXJuYWxJZDogaW5jb21pbmcuZXh0ZXJuYWxJZCxcbiAgICAgIHBsYXllcklkOiBpbmNvbWluZy5wbGF5ZXJJZCxcbiAgICAgIG9wcG9uZW50OiBpbmNvbWluZy5vcHBvbmVudCxcbiAgICAgIHN0YXJ0c0F0OiBpbmNvbWluZy5zdGFydHNBdCxcbiAgICAgIGVuZHNBdDogaW5jb21pbmcuZW5kc0F0LFxuICAgICAgdmVudWU6IGluY29taW5nLnZlbnVlLFxuICAgICAgY291cnQ6IGluY29taW5nLmNvdXJ0LFxuICAgICAgY29hY2hJZDogXCJ1bmFzc2lnbmVkXCIsXG4gICAgICBzdGF0dXM6IGluY29taW5nLnN0YXR1cyA/PyBcInVwY29taW5nXCIsXG4gICAgICByZXN1bHQ6IGluY29taW5nLnJlc3VsdCA/PyBudWxsLFxuICAgICAgcmVwb3J0OiBudWxsLFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcGxheWVyc0J5SWQgPSBuZXcgTWFwKFxuICAgIHN0YXRlLnBsYXllcnMubWFwKChwbGF5ZXIpID0+IFtwbGF5ZXIuaWQsIHsgLi4ucGxheWVyIH1dKSxcbiAgKTtcbiAgZm9yIChjb25zdCBwbGF5ZXIgb2YgZmVlZC5wbGF5ZXJzID8/IFtdKSB7XG4gICAgcGxheWVyc0J5SWQuc2V0KHBsYXllci5pZCwge1xuICAgICAgLi4ucGxheWVyLFxuICAgICAgc2hhcmVUb2tlbjogcGxheWVyc0J5SWQuZ2V0KHBsYXllci5pZCk/LnNoYXJlVG9rZW4sXG4gICAgfSk7XG4gIH1cbiAgZm9yIChjb25zdCBtYXRjaCBvZiBmZWVkLm1hdGNoZXMpIHtcbiAgICBpZiAoIXBsYXllcnNCeUlkLmhhcyhtYXRjaC5wbGF5ZXJJZCkpIHtcbiAgICAgIHBsYXllcnNCeUlkLnNldChtYXRjaC5wbGF5ZXJJZCwge1xuICAgICAgICBpZDogbWF0Y2gucGxheWVySWQsXG4gICAgICAgIG5hbWU6IG1hdGNoLnBsYXllck5hbWUgfHwgbWF0Y2gucGxheWVySWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJyYW5kaW5nOiBzdGF0ZS5icmFuZGluZyA/IHsgLi4uc3RhdGUuYnJhbmRpbmcgfSA6IHVuZGVmaW5lZCxcbiAgICBjb2FjaGVzOiBzdGF0ZS5jb2FjaGVzLm1hcCgoY29hY2gpID0+ICh7IC4uLmNvYWNoIH0pKSxcbiAgICByZWZyZXNoSGVhbHRoOiB7XG4gICAgICAuLi5zdGF0ZS5yZWZyZXNoSGVhbHRoLFxuICAgICAgcGVuZGluZ1JlY292ZXJpZXM6IGNsb25lUmVmcmVzaFJlY292ZXJpZXMoXG4gICAgICAgIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMsXG4gICAgICApLFxuICAgIH0sXG4gICAgcGxheWVyczogWy4uLnBsYXllcnNCeUlkLnZhbHVlcygpXSxcbiAgICBtYXRjaGVzOiByZXRhaW5lZCxcbiAgICBsYXN0VXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgc291cmNlOiBcImNsdWItbG9ja2VyXCIsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoVHJhY2tlclN0YXRlKFxuICBsb2FkU3RhdGU6ICgpID0+IFByb21pc2U8UmVhZG9ubHlUcmFja2VyU3RhdGU+LFxuICBsb2FkRmVlZDogKCkgPT4gUHJvbWlzZTxSZWFkb25seUNsdWJMb2NrZXJGZWVkPixcbiAgcGVyc2lzdFN0YXRlOiAoc3RhdGU6IFRyYWNrZXJTdGF0ZSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgYWxlcnRUaHJlc2hvbGQgPSAzLFxuKTogUHJvbWlzZTxUcmFja2VyU3RhdGU+IHtcbiAgY29uc3QgZmVlZCA9IHBhcnNlQ2x1YkxvY2tlckZlZWQoYXdhaXQgbG9hZEZlZWQoKSk7XG4gIGNvbnN0IHN0YXRlID0gY2xlYXJSZWZyZXNoRmFpbHVyZXMoXG4gICAgbWVyZ2VDbHViTG9ja2VyRmVlZChhd2FpdCBsb2FkU3RhdGUoKSwgZmVlZCksXG4gICAgYWxlcnRUaHJlc2hvbGQsXG4gICk7XG4gIGF3YWl0IHBlcnNpc3RTdGF0ZShzdGF0ZSk7XG4gIHJldHVybiBzdGF0ZTtcbn0iLCAiaW1wb3J0IHR5cGUgeyBDbHViTG9ja2VyRmVlZCwgQ2x1YkxvY2tlck1hdGNoIH0gZnJvbSBcIi4vY2x1Yi1sb2NrZXIuanNcIjtcblxuLy8gQ2x1YiBMb2NrZXIncyBwdWJsaWMgd2Vic2l0ZSByZWFkcyB0b3VybmFtZW50IGRhdGEgZnJvbSB0aGVzZSBlbmRwb2ludHMuXG4vLyBUaGV5IGFyZSB1bmRvY3VtZW50ZWQsIHNvIGV2ZXJ5IGZpZWxkIGJlbG93IGlzIHJlYWQgZGVmZW5zaXZlbHkuXG5jb25zdCBDTFVCX0xPQ0tFUl9BUEkgPSBcImh0dHBzOi8vYXBpLnVzc3F1YXNoLmNvbS9yZXNvdXJjZXNcIjtcblxuLy8gQ2x1YiBMb2NrZXIgcHVibGlzaGVzIHN0YXJ0IHRpbWVzIG9ubHkuIFRvdXJuYW1lbnRzIHNsb3QgbWF0Y2hlcyByb3VnaGx5XG4vLyAzNS00NSBtaW51dGVzIGFwYXJ0LCBzbyBhIG1hdGNoIGlzIGFzc3VtZWQgdG8gbGFzdCB0aGlzIGxvbmcgdW5sZXNzIHRoZVxuLy8gcGxheWVyJ3MgbmV4dCBtYXRjaCBzdGFydHMgc29vbmVyLlxuY29uc3QgQVNTVU1FRF9NQVRDSF9NSU5VVEVTID0gNDU7XG5cbmV4cG9ydCB0eXBlIERyYXdNYXRjaCA9IHtcbiAgUmVzdWx0SUQ/OiB1bmtub3duO1xuICBTdGF0dXM/OiB1bmtub3duO1xuICBTaW5nbGVzRG91Ymxlcz86IHVua25vd247XG4gIGhwbGF5ZXIxPzogdW5rbm93bjtcbiAgdnBsYXllcjE/OiB1bmtub3duO1xuICB3aWQxPzogdW5rbm93bjtcbiAgb2lkMT86IHVua25vd247XG4gIG1hdGNoZGF0ZT86IHVua25vd247XG4gIFN0YXJ0VGltZT86IHVua25vd247XG4gIENvdXJ0TnVtYmVyPzogdW5rbm93bjtcbiAgY291cnROYW1lPzogdW5rbm93bjtcbiAgd2lubmVyPzogdW5rbm93bjtcbiAgU2NvcmU/OiB1bmtub3duO1xufTtcblxuZXhwb3J0IHR5cGUgVG91cm5hbWVudERyYXdzID0ge1xuICB0b3VybmFtZW50SWQ6IHN0cmluZztcbiAgdmVudWVOYW1lOiBzdHJpbmc7XG4gIC8vIFwiUEVOPVVuaXZlcnNpdHkgb2YgUGVubnN5bHZhbmlhLCBWQVI9U0NIKFZhcmUpXCIgc3R5bGUgY291cnQtcHJlZml4IG1hcFxuICAvLyB1c2VkIGJ5IG11bHRpLXZlbnVlIHRvdXJuYW1lbnRzLlxuICB2ZW51ZUNvZGVzOiBzdHJpbmcgfCBudWxsO1xuICBtYXRjaGVzOiBEcmF3TWF0Y2hbXTtcbn07XG5cbnR5cGUgUm9zdGVyTWF0Y2ggPSBDbHViTG9ja2VyTWF0Y2ggJiB7IHBsYXllck5hbWU6IHN0cmluZyB9O1xuXG5jb25zdCB0ZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+XG4gIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnRyaW0oKSA6IFwiXCI7XG5cbmNvbnN0IG1lbWJlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+XG4gIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiB2YWx1ZSA+IDBcbiAgICA/IFN0cmluZyh2YWx1ZSlcbiAgICA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcZCskLy50ZXN0KHZhbHVlLnRyaW0oKSlcbiAgICAgID8gdmFsdWUudHJpbSgpXG4gICAgICA6IFwiXCI7XG5cbi8qKiBcIkNoZW4sIENhc3BlciBcIiAtPiBcIkNhc3BlciBDaGVuXCIgKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5TmFtZShsYXN0Rmlyc3Q6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IFtsYXN0LCBmaXJzdF0gPSBsYXN0Rmlyc3Quc3BsaXQoXCIsXCIpLm1hcCgocGFydCkgPT4gcGFydC50cmltKCkpO1xuICByZXR1cm4gZmlyc3QgPyBgJHtmaXJzdH0gJHtsYXN0fWAgOiBsYXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VWZW51ZUNvZGVzKHZhbHVlOiBzdHJpbmcgfCBudWxsKTogTWFwPHN0cmluZywgc3RyaW5nPiB7XG4gIGNvbnN0IGNvZGVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiAodmFsdWUgPz8gXCJcIikuc3BsaXQoXCIsXCIpKSB7XG4gICAgY29uc3QgW2NvZGUsIG5hbWVdID0gZW50cnkuc3BsaXQoXCI9XCIpLm1hcCgocGFydCkgPT4gcGFydC50cmltKCkpO1xuICAgIGlmIChjb2RlICYmIG5hbWUpIGNvZGVzLnNldChjb2RlLnRvVXBwZXJDYXNlKCksIG5hbWUpO1xuICB9XG4gIHJldHVybiBjb2Rlcztcbn1cblxuLyoqIFwiVkFSMVwiIC0+IFNDSChWYXJlKSwgQ291cnQgMTsgXCI0XCIgLT4gbWFpbiB2ZW51ZSwgQ291cnQgNC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3VydEFuZFZlbnVlKFxuICBtYXRjaDogRHJhd01hdGNoLFxuICB2ZW51ZU5hbWU6IHN0cmluZyxcbiAgdmVudWVDb2RlczogTWFwPHN0cmluZywgc3RyaW5nPixcbik6IHsgdmVudWU6IHN0cmluZzsgY291cnQ6IHN0cmluZyB9IHtcbiAgY29uc3QgbmFtZWQgPSB0ZXh0KG1hdGNoLmNvdXJ0TmFtZSk7XG4gIGNvbnN0IGNvZGUgPSB0ZXh0KG1hdGNoLkNvdXJ0TnVtYmVyKTtcbiAgY29uc3QgcHJlZml4ZWQgPSAvXihbQS1aYS16XSspXFxzKihcXGQrKSQvLmV4ZWMoY29kZSk7XG4gIGlmIChwcmVmaXhlZCkge1xuICAgIGNvbnN0IHZlbnVlID0gdmVudWVDb2Rlcy5nZXQocHJlZml4ZWRbMV0udG9VcHBlckNhc2UoKSk7XG4gICAgaWYgKHZlbnVlKSByZXR1cm4geyB2ZW51ZSwgY291cnQ6IG5hbWVkIHx8IGBDb3VydCAke3ByZWZpeGVkWzJdfWAgfTtcbiAgfVxuICBpZiAobmFtZWQpIHJldHVybiB7IHZlbnVlOiB2ZW51ZU5hbWUsIGNvdXJ0OiBuYW1lZCB9O1xuICBpZiAoL15cXGQrJC8udGVzdChjb2RlKSkgcmV0dXJuIHsgdmVudWU6IHZlbnVlTmFtZSwgY291cnQ6IGBDb3VydCAke2NvZGV9YCB9O1xuICByZXR1cm4geyB2ZW51ZTogdmVudWVOYW1lLCBjb3VydDogY29kZSB8fCBcIkNvdXJ0IFRCQVwiIH07XG59XG5cbmZ1bmN0aW9uIHRpbWVab25lT2Zmc2V0TWludXRlcyh1dGNNaWxsaXM6IG51bWJlciwgdGltZVpvbmU6IHN0cmluZyk6IG51bWJlciB7XG4gIGNvbnN0IHBhcnRzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgICAgdGltZVpvbmUsXG4gICAgICBob3VyQ3ljbGU6IFwiaDIzXCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcIjItZGlnaXRcIixcbiAgICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gICAgICBob3VyOiBcIjItZGlnaXRcIixcbiAgICAgIG1pbnV0ZTogXCIyLWRpZ2l0XCIsXG4gICAgICBzZWNvbmQ6IFwiMi1kaWdpdFwiLFxuICAgIH0pXG4gICAgICAuZm9ybWF0VG9QYXJ0cyhuZXcgRGF0ZSh1dGNNaWxsaXMpKVxuICAgICAgLm1hcCgocGFydCkgPT4gW3BhcnQudHlwZSwgcGFydC52YWx1ZV0pLFxuICApO1xuICBjb25zdCBhc1V0YyA9IERhdGUuVVRDKFxuICAgIE51bWJlcihwYXJ0cy55ZWFyKSxcbiAgICBOdW1iZXIocGFydHMubW9udGgpIC0gMSxcbiAgICBOdW1iZXIocGFydHMuZGF5KSxcbiAgICBOdW1iZXIocGFydHMuaG91ciksXG4gICAgTnVtYmVyKHBhcnRzLm1pbnV0ZSksXG4gICAgTnVtYmVyKHBhcnRzLnNlY29uZCksXG4gICk7XG4gIHJldHVybiBNYXRoLnJvdW5kKChhc1V0YyAtIHV0Y01pbGxpcykgLyA2MF8wMDApO1xufVxuXG5jb25zdCBwYWQgPSAodmFsdWU6IG51bWJlcikgPT4gU3RyaW5nKHZhbHVlKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cbi8qKlxuICogQ2x1YiBMb2NrZXIgZ2l2ZXMgXCIwOS8yNi8yMDI2XCIgYW5kIFwiMTE6MzAgQU1cIiB3aXRoIG5vIHRpbWV6b25lLiBUaGUgdHJhY2tlclxuICogcmVxdWlyZXMgYW4gZXhwbGljaXQgb2Zmc2V0LCBzbyByZXNvbHZlIHRoZSB3YWxsLWNsb2NrIHRpbWUgaW4gdGhlXG4gKiB0b3VybmFtZW50J3MgdGltZXpvbmU6IFwiMjAyNi0wOS0yNlQxMTozMDowMC0wNDowMFwiLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9jYWxTdGFydFRvSXNvKFxuICBtYXRjaERhdGU6IHN0cmluZyxcbiAgc3RhcnRUaW1lOiBzdHJpbmcsXG4gIHRpbWVab25lOiBzdHJpbmcsXG4pOiBzdHJpbmcgfCBudWxsIHtcbiAgY29uc3QgZGF0ZSA9IC9eKFxcZHsxLDJ9KVxcLyhcXGR7MSwyfSlcXC8oXFxkezR9KSQvLmV4ZWMobWF0Y2hEYXRlLnRyaW0oKSk7XG4gIGNvbnN0IHRpbWUgPSAvXihcXGR7MSwyfSk6KFxcZHsyfSlcXHMqKFtBYVBwXVtNbV0pJC8uZXhlYyhzdGFydFRpbWUudHJpbSgpKTtcbiAgaWYgKCFkYXRlIHx8ICF0aW1lKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBbbW9udGgsIGRheSwgeWVhcl0gPSBbTnVtYmVyKGRhdGVbMV0pLCBOdW1iZXIoZGF0ZVsyXSksIE51bWJlcihkYXRlWzNdKV07XG4gIGxldCBob3VyID0gTnVtYmVyKHRpbWVbMV0pICUgMTI7XG4gIGlmICh0aW1lWzNdLnRvVXBwZXJDYXNlKCkgPT09IFwiUE1cIikgaG91ciArPSAxMjtcbiAgY29uc3QgbWludXRlID0gTnVtYmVyKHRpbWVbMl0pO1xuXG4gIGNvbnN0IHdhbGxDbG9jayA9IERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW51dGUpO1xuICBsZXQgb2Zmc2V0ID0gdGltZVpvbmVPZmZzZXRNaW51dGVzKHdhbGxDbG9jaywgdGltZVpvbmUpO1xuICBvZmZzZXQgPSB0aW1lWm9uZU9mZnNldE1pbnV0ZXMod2FsbENsb2NrIC0gb2Zmc2V0ICogNjBfMDAwLCB0aW1lWm9uZSk7XG5cbiAgY29uc3Qgc2lnbiA9IG9mZnNldCA8IDAgPyBcIi1cIiA6IFwiK1wiO1xuICBjb25zdCBhYnNvbHV0ZSA9IE1hdGguYWJzKG9mZnNldCk7XG4gIHJldHVybiBgJHt5ZWFyfS0ke3BhZChtb250aCl9LSR7cGFkKGRheSl9VCR7cGFkKGhvdXIpfToke3BhZChtaW51dGUpfTowMCR7c2lnbn0ke3BhZChNYXRoLmZsb29yKGFic29sdXRlIC8gNjApKX06JHtwYWQoYWJzb2x1dGUgJSA2MCl9YDtcbn1cblxuLyoqXG4gKiBDbHViIExvY2tlciBzY29yZXMgYXJlIHdyaXR0ZW4gd2lubmVyLWZpcnN0IChcIjExLTIsMTEtNSwxMS01XCIpLiBUdXJuIHRoZW1cbiAqIGludG8gdGhlIHRyYWNrZWQgcGxheWVyJ3MgdmlldzogXCJXb24gM1x1MjAxMzAgKDExLTIsIDExLTUsIDExLTUpXCIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXN1bHRGb3IoXG4gIG1hdGNoOiBEcmF3TWF0Y2gsXG4gIHNpZGU6IFwiSFwiIHwgXCJWXCIsXG4pOiBzdHJpbmcgfCBudWxsIHtcbiAgY29uc3Qgc3RhdHVzID0gdGV4dChtYXRjaC5TdGF0dXMpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IHdpbm5lciA9IHRleHQobWF0Y2gud2lubmVyKS50b1VwcGVyQ2FzZSgpO1xuICBpZiAod2lubmVyICE9PSBcIkhcIiAmJiB3aW5uZXIgIT09IFwiVlwiKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qgd29uID0gd2lubmVyID09PSBzaWRlO1xuXG4gIGlmIChzdGF0dXMgPT09IFwiREZcIikgcmV0dXJuIHdvbiA/IFwiV29uIGJ5IGRlZmF1bHRcIiA6IFwiTG9zdCBieSBkZWZhdWx0XCI7XG5cbiAgY29uc3QgZ2FtZXMgPSB0ZXh0KG1hdGNoLlNjb3JlKVxuICAgIC5zcGxpdChcIixcIilcbiAgICAubWFwKChnYW1lKSA9PiAvXihcXGQrKS0oXFxkKykkLy5leGVjKGdhbWUudHJpbSgpKSlcbiAgICAuZmlsdGVyKChnYW1lKTogZ2FtZSBpcyBSZWdFeHBFeGVjQXJyYXkgPT4gZ2FtZSAhPT0gbnVsbClcbiAgICAubWFwKChnYW1lKSA9PiAod29uID8gW2dhbWVbMV0sIGdhbWVbMl1dIDogW2dhbWVbMl0sIGdhbWVbMV1dKSk7XG4gIC8vIEEgZ2FtZSBjb3VudHMgb25jZSBzb21lb25lIHJlYWNoZXMgOSsgd2l0aCBhIHR3by1wb2ludCBsZWFkLCBzbyB0aGVcbiAgLy8gdW5maW5pc2hlZCBnYW1lIG9mIGEgcmV0aXJlbWVudCBpcyBzaG93biBidXQgbm90IGNvdW50ZWQuXG4gIGNvbnN0IGZpbmlzaGVkID0gZ2FtZXNcbiAgICAubWFwKChbYSwgYl0pID0+IFtOdW1iZXIoYSksIE51bWJlcihiKV0pXG4gICAgLmZpbHRlcigoW2EsIGJdKSA9PiBNYXRoLm1heChhLCBiKSA+PSA5ICYmIE1hdGguYWJzKGEgLSBiKSA+PSAyKTtcbiAgY29uc3Qgb3VycyA9IGZpbmlzaGVkLmZpbHRlcigoW2EsIGJdKSA9PiBhID4gYikubGVuZ3RoO1xuICBjb25zdCB0aGVpcnMgPSBmaW5pc2hlZC5sZW5ndGggLSBvdXJzO1xuICBjb25zdCBzY29yZSA9IGdhbWVzLmxlbmd0aFxuICAgID8gYCAke291cnN9XHUyMDEzJHt0aGVpcnN9ICgke2dhbWVzLm1hcCgoW2EsIGJdKSA9PiBgJHthfS0ke2J9YCkuam9pbihcIiwgXCIpfSlgXG4gICAgOiBcIlwiO1xuICBjb25zdCByZXRpcmVkID0gc3RhdHVzID09PSBcIlJFXCIgPyAod29uID8gXCIsIG9wcG9uZW50IHJldGlyZWRcIiA6IFwiLCByZXRpcmVkXCIpIDogXCJcIjtcbiAgcmV0dXJuIGAke3dvbiA/IFwiV29uXCIgOiBcIkxvc3RcIn0ke3Njb3JlfSR7cmV0aXJlZH1gO1xufVxuXG4vKipcbiAqIFR1cm4gQ2x1YiBMb2NrZXIgdG91cm5hbWVudCBkcmF3cyBpbnRvIHRoZSB0cmFja2VyJ3Mgc2NoZWR1bGUgZmVlZCwga2VlcGluZ1xuICogb25seSBzaW5nbGVzIG1hdGNoZXMgZm9yIHBsYXllcnMgb24gdGhlIHJvc3RlciB0aGF0IGhhdmUgYSBzdGFydCB0aW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd3NUb0ZlZWQoXG4gIHRvdXJuYW1lbnRzOiBUb3VybmFtZW50RHJhd3NbXSxcbiAgcm9zdGVySWRzOiBSZWFkb25seVNldDxzdHJpbmc+LFxuICB0aW1lWm9uZTogc3RyaW5nLFxuKTogQ2x1YkxvY2tlckZlZWQge1xuICBjb25zdCBmb3VuZDogUm9zdGVyTWF0Y2hbXSA9IFtdO1xuXG4gIGZvciAoY29uc3QgdG91cm5hbWVudCBvZiB0b3VybmFtZW50cykge1xuICAgIGNvbnN0IHZlbnVlQ29kZXMgPSBwYXJzZVZlbnVlQ29kZXModG91cm5hbWVudC52ZW51ZUNvZGVzKTtcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIHRvdXJuYW1lbnQubWF0Y2hlcykge1xuICAgICAgaWYgKHRleHQobWF0Y2guU2luZ2xlc0RvdWJsZXMpLnRvTG93ZXJDYXNlKCkgPT09IFwiZFwiKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHJlc3VsdElkID0gbWVtYmVySWQobWF0Y2guUmVzdWx0SUQpIHx8IHRleHQobWF0Y2guUmVzdWx0SUQpO1xuICAgICAgaWYgKCFyZXN1bHRJZCkgY29udGludWU7XG4gICAgICBjb25zdCBzdGFydHNBdCA9IGxvY2FsU3RhcnRUb0lzbyhcbiAgICAgICAgdGV4dChtYXRjaC5tYXRjaGRhdGUpLFxuICAgICAgICB0ZXh0KG1hdGNoLlN0YXJ0VGltZSksXG4gICAgICAgIHRpbWVab25lLFxuICAgICAgKTtcbiAgICAgIGlmICghc3RhcnRzQXQpIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCBzaWRlcyA9IFtcbiAgICAgICAgeyBzaWRlOiBcIkhcIiBhcyBjb25zdCwgaWQ6IG1lbWJlcklkKG1hdGNoLndpZDEpLCBuYW1lOiB0ZXh0KG1hdGNoLmhwbGF5ZXIxKSwgb3RoZXI6IHRleHQobWF0Y2gudnBsYXllcjEpIH0sXG4gICAgICAgIHsgc2lkZTogXCJWXCIgYXMgY29uc3QsIGlkOiBtZW1iZXJJZChtYXRjaC5vaWQxKSwgbmFtZTogdGV4dChtYXRjaC52cGxheWVyMSksIG90aGVyOiB0ZXh0KG1hdGNoLmhwbGF5ZXIxKSB9LFxuICAgICAgXTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IHRleHQobWF0Y2guU3RhdHVzKS50b1VwcGVyQ2FzZSgpICE9PSBcIlNcIjtcbiAgICAgIGNvbnN0IHsgdmVudWUsIGNvdXJ0IH0gPSBjb3VydEFuZFZlbnVlKG1hdGNoLCB0b3VybmFtZW50LnZlbnVlTmFtZSwgdmVudWVDb2Rlcyk7XG5cbiAgICAgIGZvciAoY29uc3QgeyBzaWRlLCBpZCwgbmFtZSwgb3RoZXIgfSBvZiBzaWRlcykge1xuICAgICAgICBpZiAoIWlkIHx8ICFuYW1lIHx8ICFyb3N0ZXJJZHMuaGFzKGlkKSkgY29udGludWU7XG4gICAgICAgIGlmIChjb21wbGV0ZWQgJiYgIW90aGVyKSBjb250aW51ZTtcbiAgICAgICAgZm91bmQucHVzaCh7XG4gICAgICAgICAgZXh0ZXJuYWxJZDogYCR7dG91cm5hbWVudC50b3VybmFtZW50SWR9OiR7cmVzdWx0SWR9OiR7aWR9YCxcbiAgICAgICAgICBwbGF5ZXJJZDogaWQsXG4gICAgICAgICAgcGxheWVyTmFtZTogZGlzcGxheU5hbWUobmFtZSksXG4gICAgICAgICAgb3Bwb25lbnQ6IG90aGVyID8gZGlzcGxheU5hbWUob3RoZXIpIDogXCJUbyBiZSBkZWNpZGVkXCIsXG4gICAgICAgICAgc3RhcnRzQXQsXG4gICAgICAgICAgZW5kc0F0OiBzdGFydHNBdCxcbiAgICAgICAgICB2ZW51ZSxcbiAgICAgICAgICBjb3VydCxcbiAgICAgICAgICBzdGF0dXM6IGNvbXBsZXRlZCA/IFwiY29tcGxldGVkXCIgOiBcInVwY29taW5nXCIsXG4gICAgICAgICAgcmVzdWx0OiBjb21wbGV0ZWQgPyByZXN1bHRGb3IobWF0Y2gsIHNpZGUpIDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRXN0aW1hdGUgZmluaXNoIHRpbWVzIHdpdGhvdXQgbGV0dGluZyBhIHBsYXllcidzIG1hdGNoZXMgb3ZlcmxhcCwgd2hpY2hcbiAgLy8gdGhlIHRyYWNrZXIgcmVqZWN0cy4gU2FtZS1zdGFydCBkdXBsaWNhdGVzIGFyZSBkcm9wcGVkIGZvciB0aGUgc2FtZSByZWFzb24uXG4gIGNvbnN0IGJ5UGxheWVyID0gbmV3IE1hcDxzdHJpbmcsIFJvc3Rlck1hdGNoW10+KCk7XG4gIGZvciAoY29uc3QgbWF0Y2ggb2YgZm91bmQpIHtcbiAgICBieVBsYXllci5zZXQobWF0Y2gucGxheWVySWQsIFsuLi4oYnlQbGF5ZXIuZ2V0KG1hdGNoLnBsYXllcklkKSA/PyBbXSksIG1hdGNoXSk7XG4gIH1cbiAgY29uc3QgbWF0Y2hlczogQ2x1YkxvY2tlck1hdGNoW10gPSBbXTtcbiAgZm9yIChjb25zdCBwbGF5ZXJNYXRjaGVzIG9mIGJ5UGxheWVyLnZhbHVlcygpKSB7XG4gICAgcGxheWVyTWF0Y2hlcy5zb3J0KChhLCBiKSA9PiBEYXRlLnBhcnNlKGEuc3RhcnRzQXQpIC0gRGF0ZS5wYXJzZShiLnN0YXJ0c0F0KSk7XG4gICAgY29uc3Qga2VwdCA9IHBsYXllck1hdGNoZXMuZmlsdGVyKFxuICAgICAgKG1hdGNoLCBpbmRleCkgPT5cbiAgICAgICAgaW5kZXggPT09IDAgfHxcbiAgICAgICAgRGF0ZS5wYXJzZShtYXRjaC5zdGFydHNBdCkgPiBEYXRlLnBhcnNlKHBsYXllck1hdGNoZXNbaW5kZXggLSAxXS5zdGFydHNBdCksXG4gICAgKTtcbiAgICBrZXB0LmZvckVhY2goKG1hdGNoLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnQgPSBEYXRlLnBhcnNlKG1hdGNoLnN0YXJ0c0F0KTtcbiAgICAgIGNvbnN0IG5leHQgPSBrZXB0W2luZGV4ICsgMV07XG4gICAgICBjb25zdCBlbmQgPSBNYXRoLm1pbihcbiAgICAgICAgc3RhcnQgKyBBU1NVTUVEX01BVENIX01JTlVURVMgKiA2MF8wMDAsXG4gICAgICAgIG5leHQgPyBEYXRlLnBhcnNlKG5leHQuc3RhcnRzQXQpIDogSW5maW5pdHksXG4gICAgICApO1xuICAgICAgbWF0Y2hlcy5wdXNoKHsgLi4ubWF0Y2gsIGVuZHNBdDogbmV3IERhdGUoZW5kKS50b0lTT1N0cmluZygpIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcGxheWVycyA9IFsuLi5uZXcgTWFwKGZvdW5kLm1hcCgobWF0Y2gpID0+IFttYXRjaC5wbGF5ZXJJZCwgbWF0Y2gucGxheWVyTmFtZV0pKV1cbiAgICAubWFwKChbaWQsIG5hbWVdKSA9PiAoeyBpZCwgbmFtZSB9KSk7XG4gIHJldHVybiB7IG1hdGNoZXMsIHBsYXllcnMgfTtcbn1cblxuZXhwb3J0IHR5cGUgQ2x1YkxvY2tlckRyYXdzQ29uZmlnID0ge1xuICB0b3VybmFtZW50SWRzOiBzdHJpbmdbXTtcbiAgcm9zdGVySWRzOiBSZWFkb25seVNldDxzdHJpbmc+O1xuICB0aW1lWm9uZTogc3RyaW5nO1xufTtcblxuLyoqIFJlYWQgdG91cm5hbWVudCBJRHMsIHJvc3RlciBhbmQgdGltZXpvbmUgZnJvbSB0aGUgZW52aXJvbm1lbnQuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd3NDb25maWdGcm9tRW52KFxuICBlbnY6IE5vZGVKUy5Qcm9jZXNzRW52ID0gcHJvY2Vzcy5lbnYsXG4pOiBDbHViTG9ja2VyRHJhd3NDb25maWcgfCBudWxsIHtcbiAgY29uc3QgbGlzdCA9ICh2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PlxuICAgICh2YWx1ZSA/PyBcIlwiKS5zcGxpdChcIixcIikubWFwKChpdGVtKSA9PiBpdGVtLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pO1xuICBjb25zdCB0b3VybmFtZW50SWRzID0gbGlzdChlbnZbXCJDTFVCX0xPQ0tFUl9UT1VSTkFNRU5UX0lEU1wiXSk7XG4gIGlmICh0b3VybmFtZW50SWRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIHJldHVybiB7XG4gICAgdG91cm5hbWVudElkcyxcbiAgICByb3N0ZXJJZHM6IG5ldyBTZXQobGlzdChlbnZbXCJDTFVCX0xPQ0tFUl9QTEFZRVJfSURTXCJdKSksXG4gICAgdGltZVpvbmU6IGVudltcIkNMVUJfTE9DS0VSX1RJTUVaT05FXCJdPy50cmltKCkgfHwgXCJBbWVyaWNhL05ld19Zb3JrXCIsXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEpzb24ocGF0aDogc3RyaW5nKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgMTBfMDAwKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0NMVUJfTE9DS0VSX0FQSX0vJHtwYXRofWAsIHtcbiAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDbHViIExvY2tlciByZXR1cm5lZCBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfSBmb3IgJHtwYXRofWApO1xuICAgIH1cbiAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICB9IGZpbmFsbHkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkVG91cm5hbWVudERyYXdzKFxuICB0b3VybmFtZW50SWQ6IHN0cmluZyxcbiAgZmV0Y2hKc29uOiAocGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPHVua25vd24+LFxuKTogUHJvbWlzZTxUb3VybmFtZW50RHJhd3M+IHtcbiAgY29uc3QgaWQgPSBlbmNvZGVVUklDb21wb25lbnQodG91cm5hbWVudElkKTtcbiAgY29uc3QgdG91cm5hbWVudCA9IChhd2FpdCBmZXRjaEpzb24oYHRvdXJuYW1lbnRzLyR7aWR9YCkpIGFzIHtcbiAgICBUb3VybmFtZW50X05hbWU/OiB1bmtub3duO1xuICAgIENoZWNrc19Ubz86IHVua25vd247XG4gICAgdmVudWVzPzogQXJyYXk8eyBDbHViSWQ/OiB1bmtub3duOyBJc01haW4/OiB1bmtub3duIH0+O1xuICB9O1xuXG4gIGxldCB2ZW51ZU5hbWUgPSB0ZXh0KHRvdXJuYW1lbnQuVG91cm5hbWVudF9OYW1lKSB8fCBgVG91cm5hbWVudCAke3RvdXJuYW1lbnRJZH1gO1xuICBjb25zdCBtYWluQ2x1YiA9XG4gICAgdG91cm5hbWVudC52ZW51ZXM/LmZpbmQoKHZlbnVlKSA9PiB2ZW51ZS5Jc01haW4pID8/IHRvdXJuYW1lbnQudmVudWVzPy5bMF07XG4gIGNvbnN0IGNsdWJJZCA9IG1lbWJlcklkKG1haW5DbHViPy5DbHViSWQpO1xuICBpZiAoY2x1YklkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNsdWIgPSAoYXdhaXQgZmV0Y2hKc29uKGByZXMvY2x1YnMvJHtjbHViSWR9YCkpIGFzIHsgbmFtZT86IHVua25vd24gfTtcbiAgICAgIHZlbnVlTmFtZSA9IHRleHQoY2x1Yi5uYW1lKSB8fCB2ZW51ZU5hbWU7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBUaGUgdG91cm5hbWVudCBuYW1lIGlzIGEgcmVhc29uYWJsZSB2ZW51ZSBsYWJlbCBpZiB0aGUgY2x1YiBsb29rdXAgZmFpbHMuXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGl2aXNpb25zID0gYXdhaXQgZmV0Y2hKc29uKGB0b3VybmFtZW50cy8ke2lkfS9kaXZpc2lvbnNhbmRzZWN0aW9uc2ApO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZGl2aXNpb25zKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2x1YiBMb2NrZXIgdG91cm5hbWVudCAke3RvdXJuYW1lbnRJZH0gaGFzIG5vIGRpdmlzaW9uIGxpc3RgKTtcbiAgfVxuICBjb25zdCBkaXZpc2lvbklkcyA9IFtcbiAgICAuLi5uZXcgU2V0KGRpdmlzaW9ucy5tYXAoKGRpdmlzaW9uKSA9PiBtZW1iZXJJZChkaXZpc2lvbj8uZGl2aXNpb25JZCkpLmZpbHRlcihCb29sZWFuKSksXG4gIF07XG4gIGNvbnN0IHNlY3Rpb25zID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgZGl2aXNpb25JZHMubWFwKChkaXZpc2lvbklkKSA9PiBmZXRjaEpzb24oYHRvdXJuYW1lbnRzLyR7aWR9L2RpdmlzaW9uLyR7ZGl2aXNpb25JZH0vZHJhd3NgKSksXG4gICk7XG4gIGNvbnN0IG1hdGNoZXMgPSBzZWN0aW9ucy5mbGF0TWFwKChkcmF3KSA9PlxuICAgIEFycmF5LmlzQXJyYXkoZHJhdylcbiAgICAgID8gZHJhdy5mbGF0TWFwKChzZWN0aW9uKSA9PlxuICAgICAgICAgIEFycmF5LmlzQXJyYXkoc2VjdGlvbj8ubWF0Y2hlcykgPyAoc2VjdGlvbi5tYXRjaGVzIGFzIERyYXdNYXRjaFtdKSA6IFtdLFxuICAgICAgICApXG4gICAgICA6IFtdLFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgdG91cm5hbWVudElkLFxuICAgIHZlbnVlTmFtZSxcbiAgICB2ZW51ZUNvZGVzOiB0ZXh0KHRvdXJuYW1lbnQuQ2hlY2tzX1RvKSB8fCBudWxsLFxuICAgIG1hdGNoZXMsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaENsdWJMb2NrZXJEcmF3cyhcbiAgY29uZmlnOiBDbHViTG9ja2VyRHJhd3NDb25maWcsXG4gIGZldGNoSnNvbjogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx1bmtub3duPiA9IGdldEpzb24sXG4pOiBQcm9taXNlPENsdWJMb2NrZXJGZWVkPiB7XG4gIGlmIChjb25maWcucm9zdGVySWRzLnNpemUgPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJBZGQgVVMgU3F1YXNoIHBsYXllciBJRHMgdG8gQ0xVQl9MT0NLRVJfUExBWUVSX0lEU1wiKTtcbiAgfVxuICBjb25zdCB0b3VybmFtZW50cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIGNvbmZpZy50b3VybmFtZW50SWRzLm1hcCgoaWQpID0+IGxvYWRUb3VybmFtZW50RHJhd3MoaWQsIGZldGNoSnNvbikpLFxuICApO1xuICByZXR1cm4gZHJhd3NUb0ZlZWQodG91cm5hbWVudHMsIGNvbmZpZy5yb3N0ZXJJZHMsIGNvbmZpZy50aW1lWm9uZSk7XG59XG4iLCAiaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tIFwibm9kZTpzdHJlYW1cIjtcbmltcG9ydCB7IFN0b3JhZ2UsIHR5cGUgRmlsZSB9IGZyb20gXCJAZ29vZ2xlLWNsb3VkL3N0b3JhZ2VcIjtcblxuY29uc3QgY2xpZW50ID0gbmV3IFN0b3JhZ2Uoe1xuICBjcmVkZW50aWFsczoge1xuICAgIGF1ZGllbmNlOiBcInJlcGxpdFwiLFxuICAgIHN1YmplY3RfdG9rZW5fdHlwZTogXCJhY2Nlc3NfdG9rZW5cIixcbiAgICB0b2tlbl91cmw6IFwiaHR0cDovLzEyNy4wLjAuMToxMTA2L3Rva2VuXCIsXG4gICAgdHlwZTogXCJleHRlcm5hbF9hY2NvdW50XCIsXG4gICAgY3JlZGVudGlhbF9zb3VyY2U6IHtcbiAgICAgIHVybDogXCJodHRwOi8vMTI3LjAuMC4xOjExMDYvY3JlZGVudGlhbFwiLFxuICAgICAgZm9ybWF0OiB7IHR5cGU6IFwianNvblwiLCBzdWJqZWN0X3Rva2VuX2ZpZWxkX25hbWU6IFwiYWNjZXNzX3Rva2VuXCIgfSxcbiAgICB9LFxuICAgIHVuaXZlcnNlX2RvbWFpbjogXCJnb29nbGVhcGlzLmNvbVwiLFxuICB9LFxuICBwcm9qZWN0SWQ6IFwiXCIsXG59KTtcblxuZXhwb3J0IGNsYXNzIE9iamVjdE5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG5jb25zdCBPQkpFQ1RfUEFUSF9QQVRURVJOID0gL15cXC9vYmplY3RzXFwvdXBsb2Fkc1xcLyg/OmxvZ29zXFwvKT9bMC05YS1mLV0rJC87XG5cbmZ1bmN0aW9uIHBhcnNlU3RvcmFnZVBhdGgodmFsdWU6IHN0cmluZyk6IHsgYnVja2V0OiBzdHJpbmc7IG9iamVjdDogc3RyaW5nIH0ge1xuICBjb25zdCBwYXJ0cyA9IHZhbHVlLnJlcGxhY2UoL15cXC8rLywgXCJcIikuc3BsaXQoXCIvXCIpO1xuICBpZiAocGFydHMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBBcHAgU3RvcmFnZSBwYXRoXCIpO1xuICByZXR1cm4geyBidWNrZXQ6IHBhcnRzWzBdLCBvYmplY3Q6IHBhcnRzLnNsaWNlKDEpLmpvaW4oXCIvXCIpIH07XG59XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RTdG9yYWdlU2VydmljZSB7XG4gIHByaXZhdGUgZ2V0UHJpdmF0ZURpcigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHZhbHVlID0gcHJvY2Vzcy5lbnZbXCJQUklWQVRFX09CSkVDVF9ESVJcIl07XG4gICAgaWYgKCF2YWx1ZSkgdGhyb3cgbmV3IEVycm9yKFwiUFJJVkFURV9PQkpFQ1RfRElSIGlzIG5vdCBjb25maWd1cmVkXCIpO1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gIH1cblxuICBhc3luYyBnZXRPYmplY3Qob2JqZWN0UGF0aDogc3RyaW5nKTogUHJvbWlzZTxGaWxlPiB7XG4gICAgaWYgKCFPQkpFQ1RfUEFUSF9QQVRURVJOLnRlc3Qob2JqZWN0UGF0aCkpIHRocm93IG5ldyBPYmplY3ROb3RGb3VuZEVycm9yKCk7XG4gICAgY29uc3QgeyBidWNrZXQsIG9iamVjdDogcHJpdmF0ZU9iamVjdCB9ID0gcGFyc2VTdG9yYWdlUGF0aCh0aGlzLmdldFByaXZhdGVEaXIoKSk7XG4gICAgY29uc3QgZmlsZSA9IGNsaWVudC5idWNrZXQoYnVja2V0KS5maWxlKGAke3ByaXZhdGVPYmplY3R9LyR7b2JqZWN0UGF0aC5zbGljZShcIi9vYmplY3RzL1wiLmxlbmd0aCl9YCk7XG4gICAgY29uc3QgW2V4aXN0c10gPSBhd2FpdCBmaWxlLmV4aXN0cygpO1xuICAgIGlmICghZXhpc3RzKSB0aHJvdyBuZXcgT2JqZWN0Tm90Rm91bmRFcnJvcigpO1xuICAgIHJldHVybiBmaWxlO1xuICB9XG5cbiAgYXN5bmMgc2F2ZU9iamVjdChvYmplY3RQYXRoOiBzdHJpbmcsIGJ5dGVzOiBCdWZmZXIsIGNvbnRlbnRUeXBlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIU9CSkVDVF9QQVRIX1BBVFRFUk4udGVzdChvYmplY3RQYXRoKSkgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBvYmplY3QgcGF0aFwiKTtcbiAgICBjb25zdCB7IGJ1Y2tldCwgb2JqZWN0OiBwcml2YXRlT2JqZWN0IH0gPSBwYXJzZVN0b3JhZ2VQYXRoKHRoaXMuZ2V0UHJpdmF0ZURpcigpKTtcbiAgICBjb25zdCBmaWxlID0gY2xpZW50LmJ1Y2tldChidWNrZXQpLmZpbGUoYCR7cHJpdmF0ZU9iamVjdH0vJHtvYmplY3RQYXRoLnNsaWNlKFwiL29iamVjdHMvXCIubGVuZ3RoKX1gKTtcbiAgICBhd2FpdCBmaWxlLnNhdmUoYnl0ZXMsIHsgY29udGVudFR5cGUsIHJlc3VtYWJsZTogZmFsc2UgfSk7XG4gIH1cblxuICBhc3luYyBkZWxldGVPYmplY3Qob2JqZWN0UGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFPQkpFQ1RfUEFUSF9QQVRURVJOLnRlc3Qob2JqZWN0UGF0aCkpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgb2JqZWN0IHBhdGhcIik7XG4gICAgY29uc3QgeyBidWNrZXQsIG9iamVjdDogcHJpdmF0ZU9iamVjdCB9ID0gcGFyc2VTdG9yYWdlUGF0aCh0aGlzLmdldFByaXZhdGVEaXIoKSk7XG4gICAgY29uc3QgZmlsZSA9IGNsaWVudC5idWNrZXQoYnVja2V0KS5maWxlKGAke3ByaXZhdGVPYmplY3R9LyR7b2JqZWN0UGF0aC5zbGljZShcIi9vYmplY3RzL1wiLmxlbmd0aCl9YCk7XG4gICAgYXdhaXQgZmlsZS5kZWxldGUoeyBpZ25vcmVOb3RGb3VuZDogdHJ1ZSB9KTtcbiAgfVxuXG4gIGFzeW5jIGxpc3RWb2ljZU5vdGVzT2xkZXJUaGFuKGN1dG9mZjogRGF0ZSk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBjb25zdCB7IGJ1Y2tldCwgb2JqZWN0OiBwcml2YXRlT2JqZWN0IH0gPSBwYXJzZVN0b3JhZ2VQYXRoKHRoaXMuZ2V0UHJpdmF0ZURpcigpKTtcbiAgICBjb25zdCB1cGxvYWRQcmVmaXggPSBgJHtwcml2YXRlT2JqZWN0fS91cGxvYWRzL2A7XG4gICAgY29uc3QgW2ZpbGVzXSA9IGF3YWl0IGNsaWVudC5idWNrZXQoYnVja2V0KS5nZXRGaWxlcyh7IHByZWZpeDogdXBsb2FkUHJlZml4IH0pO1xuICAgIHJldHVybiBmaWxlcy5mbGF0TWFwKChmaWxlKSA9PiB7XG4gICAgICBjb25zdCByZWxhdGl2ZU5hbWUgPSBmaWxlLm5hbWUuc2xpY2UodXBsb2FkUHJlZml4Lmxlbmd0aCk7XG4gICAgICBpZiAoIS9eWzAtOWEtZi1dKyQvLnRlc3QocmVsYXRpdmVOYW1lKSkgcmV0dXJuIFtdO1xuICAgICAgY29uc3QgY3JlYXRlZEF0ID0gRGF0ZS5wYXJzZShmaWxlLm1ldGFkYXRhLnRpbWVDcmVhdGVkID8/IFwiXCIpO1xuICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoY3JlYXRlZEF0KSB8fCBjcmVhdGVkQXQgPj0gY3V0b2ZmLmdldFRpbWUoKSkgcmV0dXJuIFtdO1xuICAgICAgcmV0dXJuIFtgL29iamVjdHMvdXBsb2Fkcy8ke3JlbGF0aXZlTmFtZX1gXTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHN0cmVhbShmaWxlOiBGaWxlLCByZXM6IGltcG9ydChcImV4cHJlc3NcIikuUmVzcG9uc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBbbWV0YWRhdGFdID0gYXdhaXQgZmlsZS5nZXRNZXRhZGF0YSgpO1xuICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgbWV0YWRhdGEuY29udGVudFR5cGUgfHwgXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIik7XG4gICAgcmVzLnNldEhlYWRlcihcIkNhY2hlLUNvbnRyb2xcIiwgXCJwcml2YXRlLCBtYXgtYWdlPTM2MDBcIik7XG4gICAgaWYgKG1ldGFkYXRhLnNpemUpIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LUxlbmd0aFwiLCBTdHJpbmcobWV0YWRhdGEuc2l6ZSkpO1xuICAgIFJlYWRhYmxlLmZyb20oZmlsZS5jcmVhdGVSZWFkU3RyZWFtKCkpLnBpcGUocmVzKTtcbiAgfVxufSIsICJpbXBvcnQgeyBjbGVya0NsaWVudCwgZ2V0QXV0aCB9IGZyb20gXCJAY2xlcmsvZXhwcmVzc1wiO1xuaW1wb3J0IHR5cGUgeyBSZXF1ZXN0LCBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJleHByZXNzXCI7XG5cbnR5cGUgU3RhZmZBdXRob3JpemF0aW9uRGVwZW5kZW5jaWVzID0ge1xuICBnZXRVc2VySWQ6IChyZXE6IFJlcXVlc3QpID0+IHN0cmluZyB8IG51bGw7XG4gIGlzQXBwcm92ZWRTdGFmZjogKHVzZXJJZDogc3RyaW5nKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xufTtcblxuZnVuY3Rpb24gY29uZmlndXJlZFN0YWZmSWRzKCk6IFNldDxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBTZXQoXG4gICAgKHByb2Nlc3MuZW52W1wiU1RBRkZfQ0xFUktfVVNFUl9JRFNcIl0gPz8gXCJcIilcbiAgICAgIC5zcGxpdChcIixcIilcbiAgICAgIC5tYXAoKGlkKSA9PiBpZC50cmltKCkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pLFxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpc0FwcHJvdmVkQ2xlcmtTdGFmZih1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBpZiAoY29uZmlndXJlZFN0YWZmSWRzKCkuaGFzKHVzZXJJZCkpIHJldHVybiB0cnVlO1xuXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBjbGVya0NsaWVudC51c2Vycy5nZXRVc2VyKHVzZXJJZCk7XG4gIHJldHVybiB1c2VyLnB1YmxpY01ldGFkYXRhW1wicm9sZVwiXSA9PT0gXCJzdGFmZlwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVxdWlyZVN0YWZmKFxuICBkZXBlbmRlbmNpZXM6IFN0YWZmQXV0aG9yaXphdGlvbkRlcGVuZGVuY2llcyA9IHtcbiAgICBnZXRVc2VySWQ6IChyZXEpID0+IHtcbiAgICAgIGNvbnN0IGF1dGggPSBnZXRBdXRoKHJlcSk7XG4gICAgICBjb25zdCBjbGFpbVVzZXJJZCA9IGF1dGguc2Vzc2lvbkNsYWltcz8udXNlcklkO1xuICAgICAgcmV0dXJuIHR5cGVvZiBjbGFpbVVzZXJJZCA9PT0gXCJzdHJpbmdcIiA/IGNsYWltVXNlcklkIDogYXV0aC51c2VySWQ7XG4gICAgfSxcbiAgICBpc0FwcHJvdmVkU3RhZmY6IGlzQXBwcm92ZWRDbGVya1N0YWZmLFxuICB9LFxuKTogUmVxdWVzdEhhbmRsZXIge1xuICByZXR1cm4gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gZGVwZW5kZW5jaWVzLmdldFVzZXJJZChyZXEpO1xuICAgIGlmICghdXNlcklkKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiBcIlN0YWZmIHNpZ24taW4gcmVxdWlyZWRcIiB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKCEoYXdhaXQgZGVwZW5kZW5jaWVzLmlzQXBwcm92ZWRTdGFmZih1c2VySWQpKSkge1xuICAgICAgICByZXMuc3RhdHVzKDQwMykuanNvbih7IGVycm9yOiBcIlRoaXMgYWNjb3VudCBpcyBub3QgYXBwcm92ZWQgZm9yIHN0YWZmIGFjY2Vzc1wiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlcS5sb2c/LmVycm9yKHsgZXJyOiBlcnJvciwgdXNlcklkIH0sIFwiQ291bGQgbm90IHZlcmlmeSBzdGFmZiBhY2Nlc3NcIik7XG4gICAgICByZXMuc3RhdHVzKDUwMykuanNvbih7IGVycm9yOiBcIlN0YWZmIGFjY2VzcyBjb3VsZCBub3QgYmUgdmVyaWZpZWRcIiB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXMubG9jYWxzLnN0YWZmVXNlcklkID0gdXNlcklkO1xuICAgIG5leHQoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlcXVpcmVTdGFmZiA9IGNyZWF0ZVJlcXVpcmVTdGFmZigpOyIsICIvKipcbiAqIENsZXJrIEZyb250ZW5kIEFQSSBQcm94eSBNaWRkbGV3YXJlXG4gKlxuICogUHJveGllcyBDbGVyayBGcm9udGVuZCBBUEkgcmVxdWVzdHMgdGhyb3VnaCB5b3VyIGRvbWFpbiwgZW5hYmxpbmcgQ2xlcmtcbiAqIGF1dGhlbnRpY2F0aW9uIG9uIGN1c3RvbSBkb21haW5zIGFuZCAucmVwbGl0LmFwcCBkZXBsb3ltZW50cyB3aXRob3V0XG4gKiByZXF1aXJpbmcgQ05BTUUgRE5TIGNvbmZpZ3VyYXRpb24uXG4gKlxuICogQVVUSCBDT05GSUdVUkFUSU9OOiBUbyBtYW5hZ2UgdXNlcnMsIGVuYWJsZS9kaXNhYmxlIGxvZ2luIHByb3ZpZGVyc1xuICogKEdvb2dsZSwgR2l0SHViLCBldGMuKSwgY2hhbmdlIGFwcCBicmFuZGluZywgb3IgY29uZmlndXJlIE9BdXRoIGNyZWRlbnRpYWxzLFxuICogdXNlIHRoZSBBdXRoIHBhbmUgaW4gdGhlIHdvcmtzcGFjZSB0b29sYmFyLiBUaGVyZSBpcyBubyBleHRlcm5hbCBDbGVya1xuICogZGFzaGJvYXJkIFx1MjAxNCBhbGwgYXV0aCBjb25maWd1cmF0aW9uIGlzIGRvbmUgdGhyb3VnaCB0aGUgQXV0aCBwYW5lLlxuICpcbiAqIElNUE9SVEFOVDpcbiAqIC0gT25seSBhY3RpdmUgaW4gcHJvZHVjdGlvbiAoQ2xlcmsgcHJveHlpbmcgZG9lc24ndCB3b3JrIGZvciBkZXYgaW5zdGFuY2VzKVxuICogLSBNdXN0IGJlIG1vdW50ZWQgQkVGT1JFIGV4cHJlc3MuanNvbigpIG1pZGRsZXdhcmVcbiAqXG4gKiBVc2FnZSBpbiBhcHAudHM6XG4gKiAgIGltcG9ydCB7IENMRVJLX1BST1hZX1BBVEgsIGNsZXJrUHJveHlNaWRkbGV3YXJlIH0gZnJvbSBcIi4vbWlkZGxld2FyZXMvY2xlcmtQcm94eU1pZGRsZXdhcmVcIjtcbiAqICAgYXBwLnVzZShDTEVSS19QUk9YWV9QQVRILCBjbGVya1Byb3h5TWlkZGxld2FyZSgpKTtcbiAqL1xuXG5pbXBvcnQgdHlwZSB7IEluY29taW5nSHR0cEhlYWRlcnMgfSBmcm9tICdodHRwJztcbmltcG9ydCB0eXBlIHsgUmVxdWVzdEhhbmRsZXIgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGNyZWF0ZVByb3h5TWlkZGxld2FyZSB9IGZyb20gJ2h0dHAtcHJveHktbWlkZGxld2FyZSc7XG5cbmNvbnN0IENMRVJLX0ZBUEkgPSAnaHR0cHM6Ly9mcm9udGVuZC1hcGkuY2xlcmsuZGV2JztcbmV4cG9ydCBjb25zdCBDTEVSS19QUk9YWV9QQVRIID0gJy9hcGkvX19jbGVyayc7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUhvc3QodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eaHR0cHM/OlxcL1xcLy8sICcnKS5yZXBsYWNlKC9cXC8uKiQvLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGFsbG93ZWRDbGVya0hvc3RzKCk6IFNldDxzdHJpbmc+IHtcbiAgY29uc3QgY29uZmlndXJlZCA9IFtcbiAgICAuLi4ocHJvY2Vzcy5lbnYuUkVQTElUX0RPTUFJTlMgPz8gJycpLnNwbGl0KCcsJyksXG4gICAgcHJvY2Vzcy5lbnYuUkVQTElUX0RFVl9ET01BSU4gPz8gJycsXG4gIF07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uZmlndXJlZC5wdXNoKCdsb2NhbGhvc3QnLCAnMTI3LjAuMC4xJyk7XG4gIH1cbiAgcmV0dXJuIG5ldyBTZXQoY29uZmlndXJlZC5tYXAobm9ybWFsaXplSG9zdCkuZmlsdGVyKEJvb2xlYW4pKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlZmZlY3RpdmUgcHVibGljIGhvc3RuYW1lIGZvciB0aGUgZ2l2ZW4gcmVxdWVzdCxcbiAqIHByZWZlcnJpbmcgeC1mb3J3YXJkZWQtaG9zdCBvdmVyIHRoZSBIb3N0IGhlYWRlciBzbyBjYWxsZXJzIGJlaGluZCBhXG4gKiBwcm94eSBzZWUgdGhlIG9yaWdpbmFsIGNsaWVudC1mYWNpbmcgaG9zdC5cbiAqXG4gKiB4LWZvcndhcmRlZC1ob3N0IGNhbiB0YWtlIHRocmVlIHNoYXBlczpcbiAqICAgLSB1bmRlZmluZWQgKG5vIHByb3h5IGludm9sdmVkKVxuICogICAtIGEgc2luZ2xlIHN0cmluZyAob25lIHByb3h5IGhvcClcbiAqICAgLSBhIGNvbW1hLWRlbGltaXRlZCBzdHJpbmcgd2hlbiBhbiB1cHN0cmVhbSBhcHBlbmRlZCByYXRoZXIgdGhhblxuICogICAgIHJlcGxhY2VkIHRoZSBoZWFkZXIgKE5vZGUgZm9sZHMgZHVwbGljYXRlIGhlYWRlcnMgdGhpcyB3YXkpLCBvciBhXG4gKiAgICAgc3RyaW5nW10gaW4gc29tZSBFeHByZXNzIHR5cGluZ3NcbiAqIEluIHRoZSBtdWx0aS12YWx1ZSBjYXNlLCB0aGUgbGVmdG1vc3QgdmFsdWUgaXMgdGhlIG9yaWdpbmFsIGNsaWVudC1cbiAqIGZhY2luZyBob3N0LiBUYWtlIHRoYXQgb25lIGluIGFsbCBmb3Jtcy4gRXhwb3J0ZWQgc28gdGhhdCBhcHAudHNcbiAqIChjbGVya01pZGRsZXdhcmUgY2FsbGJhY2spIGFuZCB0aGlzIHByb3h5IG1pZGRsZXdhcmUgYWdyZWUgb24gd2hpY2hcbiAqIGhvc3RuYW1lIGlzIGNhbm9uaWNhbCBcdTIwMTQgb3RoZXJ3aXNlIG11bHRpLWRvbWFpbi9jdXN0b20tZG9tYWluIGZsb3dzXG4gKiBicmVhay5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENsZXJrUHJveHlIb3N0KHJlcToge1xuICBoZWFkZXJzOiBJbmNvbWluZ0h0dHBIZWFkZXJzO1xufSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IGZvcndhcmRlZCA9IHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1ob3N0J107XG4gIGNvbnN0IHJhdyA9IEFycmF5LmlzQXJyYXkoZm9yd2FyZGVkKSA/IGZvcndhcmRlZFswXSA6IGZvcndhcmRlZDtcbiAgY29uc3QgY2FuZGlkYXRlcyA9IFtcbiAgICByYXc/LnNwbGl0KCcsJylbMF0sXG4gICAgcmVxLmhlYWRlcnMuaG9zdCxcbiAgXTtcbiAgY29uc3QgYWxsb3dlZCA9IGFsbG93ZWRDbGVya0hvc3RzKCk7XG4gIHJldHVybiBjYW5kaWRhdGVzXG4gICAgLm1hcCgoaG9zdCkgPT4gaG9zdCA/IG5vcm1hbGl6ZUhvc3QoaG9zdCkgOiAnJylcbiAgICAuZmluZCgoaG9zdCkgPT4gYWxsb3dlZC5oYXMoaG9zdCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlcmtQcm94eU1pZGRsZXdhcmUoKTogUmVxdWVzdEhhbmRsZXIge1xuICAvLyBPbmx5IHJ1biBwcm94eSBpbiBwcm9kdWN0aW9uIFx1MjAxNCBDbGVyayBwcm94eWluZyBkb2Vzbid0IHdvcmsgZm9yIGRldiBpbnN0YW5jZXNcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICByZXR1cm4gKF9yZXEsIF9yZXMsIG5leHQpID0+IG5leHQoKTtcbiAgfVxuXG4gIGNvbnN0IHNlY3JldEtleSA9IHByb2Nlc3MuZW52LkNMRVJLX1NFQ1JFVF9LRVk7XG4gIGlmICghc2VjcmV0S2V5KSB7XG4gICAgcmV0dXJuIChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCk7XG4gIH1cblxuICByZXR1cm4gY3JlYXRlUHJveHlNaWRkbGV3YXJlKHtcbiAgICB0YXJnZXQ6IENMRVJLX0ZBUEksXG4gICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgIC8vIFRha2Ugb3ZlciB0aGUgcmVzcG9uc2Ugc28gaXQgY2FuIGJlIHJlLXNlbnQgd2l0aCBhIENvbnRlbnQtTGVuZ3RoIChzZWVcbiAgICAvLyBwcm94eVJlcyk7IHRoZSBkZXBsb3ltZW50IGVkZ2UgcmVqZWN0cyBjaHVua2VkIHByb3hpZWQgcmVzcG9uc2VzLlxuICAgIHNlbGZIYW5kbGVSZXNwb25zZTogdHJ1ZSxcbiAgICBwYXRoUmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT5cbiAgICAgIHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtDTEVSS19QUk9YWV9QQVRIfWApLCAnJyksXG4gICAgb246IHtcbiAgICAgIHByb3h5UmVxOiAocHJveHlSZXEsIHJlcSkgPT4ge1xuICAgICAgICBjb25zdCBwcm90b2NvbCA9IHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1wcm90byddIHx8ICdodHRwcyc7XG4gICAgICAgIGNvbnN0IGhvc3QgPSBnZXRDbGVya1Byb3h5SG9zdChyZXEpIHx8ICcnO1xuICAgICAgICBjb25zdCBwcm94eVVybCA9IGAke3Byb3RvY29sfTovLyR7aG9zdH0ke0NMRVJLX1BST1hZX1BBVEh9YDtcblxuICAgICAgICBwcm94eVJlcS5zZXRIZWFkZXIoJ0NsZXJrLVByb3h5LVVybCcsIHByb3h5VXJsKTtcbiAgICAgICAgcHJveHlSZXEuc2V0SGVhZGVyKCdDbGVyay1TZWNyZXQtS2V5Jywgc2VjcmV0S2V5KTtcblxuICAgICAgICBjb25zdCB4ZmYgPSByZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtZm9yJ107XG4gICAgICAgIGNvbnN0IGNsaWVudElwID1cbiAgICAgICAgICAoQXJyYXkuaXNBcnJheSh4ZmYpID8geGZmWzBdIDogeGZmKT8uc3BsaXQoJywnKVswXT8udHJpbSgpIHx8XG4gICAgICAgICAgcmVxLnNvY2tldD8ucmVtb3RlQWRkcmVzcyB8fFxuICAgICAgICAgICcnO1xuICAgICAgICBpZiAoY2xpZW50SXApIHtcbiAgICAgICAgICBwcm94eVJlcS5zZXRIZWFkZXIoJ1gtRm9yd2FyZGVkLUZvcicsIGNsaWVudElwKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIENsZXJrJ3MgZHluYW1pYyBGcm9udGVuZCBBUEkgcmVzcG9uc2VzICgvdjEvZW52aXJvbm1lbnQsIC92MS9jbGllbnQsXG4gICAgICAvLyBKV0tTLCAuLi4pIGFycml2ZSB3aXRob3V0IGEgQ29udGVudC1MZW5ndGgsIHNvIHJlbGF5aW5nIHRoZW0gd291bGQgdXNlXG4gICAgICAvLyBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZCBcdTIwMTQgd2hpY2ggdGhlIGRlcGxveW1lbnQgZWRnZSAoQ2xvdWQgUnVuKVxuICAgICAgLy8gcmVqZWN0cywgdHVybmluZyB0aGUgYXBwJ3MgMjAwIGludG8gYSA1MDAuIEJ1ZmZlciBvbmx5IHRob3NlIHNvIHRoZXkgY2FuXG4gICAgICAvLyBiZSByZS1zZW50IHdpdGggYSBDb250ZW50LUxlbmd0aDsgdGhlIGJvZHkgaXMgZm9yd2FyZGVkIHVudG91Y2hlZCBzb1xuICAgICAgLy8gQ29udGVudC1FbmNvZGluZyBpcyBwcmVzZXJ2ZWQuIExlbmd0aC1rbm93biByZXNwb25zZXMgKGUuZy4gL25wbS8qXG4gICAgICAvLyBhc3NldHMpIGFuZCBib2R5LWxlc3MgcmVzcG9uc2VzIHN0cmVhbSB0aHJvdWdoIHdpdGhvdXQgYnVmZmVyaW5nLlxuICAgICAgcHJveHlSZXM6IChwcm94eVJlcywgcmVxLCByZXMpID0+IHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHsgLi4ucHJveHlSZXMuaGVhZGVycyB9O1xuICAgICAgICAvLyBUcmFuc2Zlci1FbmNvZGluZy9Db25uZWN0aW9uIGFyZSBob3AtYnktaG9wIChSRkMgNzIzMCBcdTAwQTc2LjEpLlxuICAgICAgICBkZWxldGUgaGVhZGVyc1sndHJhbnNmZXItZW5jb2RpbmcnXTtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbJ2Nvbm5lY3Rpb24nXTtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbJ2tlZXAtYWxpdmUnXTtcblxuICAgICAgICBjb25zdCBzdGF0dXMgPSBwcm94eVJlcy5zdGF0dXNDb2RlID8/IDUwMjtcbiAgICAgICAgLy8gQ29udGVudC1MZW5ndGggaXMgZm9yYmlkZGVuIG9uIDF4eC8yMDQ7IEhFQUQvMzA0IG1heSBrZWVwIHRoZWlycy5cbiAgICAgICAgaWYgKHN0YXR1cyA8IDIwMCB8fCBzdGF0dXMgPT09IDIwNCkge1xuICAgICAgICAgIGRlbGV0ZSBoZWFkZXJzWydjb250ZW50LWxlbmd0aCddO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYm9keWxlc3MgPVxuICAgICAgICAgIHJlcS5tZXRob2QgPT09ICdIRUFEJyB8fFxuICAgICAgICAgIHN0YXR1cyA8IDIwMCB8fFxuICAgICAgICAgIHN0YXR1cyA9PT0gMjA0IHx8XG4gICAgICAgICAgc3RhdHVzID09PSAzMDQ7XG4gICAgICAgIGlmIChoZWFkZXJzWydjb250ZW50LWxlbmd0aCddICE9PSB1bmRlZmluZWQgfHwgYm9keWxlc3MpIHtcbiAgICAgICAgICByZXMud3JpdGVIZWFkKHN0YXR1cywgaGVhZGVycyk7XG4gICAgICAgICAgLy8gSGVhZGVycyBhcmUgYWxyZWFkeSBzZW50LCBzbyBhYm9ydCB0aGUgcmVzcG9uc2UgaWYgdGhlIHVwc3RyZWFtXG4gICAgICAgICAgLy8gc3RyZWFtIGVycm9ycyBtaWQtcGlwZSAoZS5nLiBFQ09OTlJFU0VUKSByYXRoZXIgdGhhbiBsZWF2aW5nIGFuXG4gICAgICAgICAgLy8gdW5oYW5kbGVkICdlcnJvcicgb3IgYSBodW5nIGNsaWVudC5cbiAgICAgICAgICBwcm94eVJlcy5vbignZXJyb3InLCAoKSA9PiByZXMuZGVzdHJveSgpKTtcbiAgICAgICAgICBwcm94eVJlcy5waXBlKHJlcyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFtdO1xuICAgICAgICBwcm94eVJlcy5vbignZGF0YScsIChjaHVuazogQnVmZmVyKSA9PiBjaHVua3MucHVzaChjaHVuaykpO1xuICAgICAgICBwcm94eVJlcy5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJvZHkgPSBCdWZmZXIuY29uY2F0KGNodW5rcyk7XG4gICAgICAgICAgaGVhZGVyc1snY29udGVudC1sZW5ndGgnXSA9IFN0cmluZyhib2R5Lmxlbmd0aCk7XG4gICAgICAgICAgcmVzLndyaXRlSGVhZChzdGF0dXMsIGhlYWRlcnMpO1xuICAgICAgICAgIHJlcy5lbmQoYm9keSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm94eVJlcy5vbignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKCFyZXMuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgICAgIC8vIFNldCBhIGxlbmd0aCBzbyB0aGUgZW1wdHkgNTAyIGlzbid0IHNlbnQgY2h1bmtlZCAod2hpY2ggdGhlXG4gICAgICAgICAgICAvLyBkZXBsb3ltZW50IGVkZ2Ugd291bGQgcmVqZWN0IGp1c3QgbGlrZSB0aGUgb3JpZ2luYWwgcmVzcG9uc2UpLlxuICAgICAgICAgICAgcmVzLndyaXRlSGVhZCg1MDIsIHsgJ2NvbnRlbnQtbGVuZ3RoJzogJzAnIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXMuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9LFxuICB9KSBhcyBSZXF1ZXN0SGFuZGxlcjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQSxPQUFPLFlBQVk7QUFDbkIsT0FBTyxVQUFVO0FBQ2pCLE9BQU9BLGNBQWE7OztBQ0ZwQixPQUFPLFdBQVcsY0FBaUQ7QUFDbkUsU0FBUyxhQUFhLGtCQUFrQjtBQUN4QyxTQUFTLFVBQVU7OztBQ0ZuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBTyxJQUFJO0FBQUEsQ0FDVixTQUFVQyxPQUFNO0FBQ2IsRUFBQUEsTUFBSyxjQUFjLENBQUMsTUFBTTtBQUFBLEVBQUU7QUFDNUIsV0FBUyxTQUFTLE1BQU07QUFBQSxFQUFFO0FBQzFCLEVBQUFBLE1BQUssV0FBVztBQUNoQixXQUFTLFlBQVksSUFBSTtBQUNyQixVQUFNLElBQUksTUFBTTtBQUFBLEVBQ3BCO0FBQ0EsRUFBQUEsTUFBSyxjQUFjO0FBQ25CLEVBQUFBLE1BQUssY0FBYyxDQUFDLFVBQVU7QUFDMUIsVUFBTSxNQUFNLENBQUM7QUFDYixlQUFXLFFBQVEsT0FBTztBQUN0QixVQUFJLElBQUksSUFBSTtBQUFBLElBQ2hCO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFDQSxFQUFBQSxNQUFLLHFCQUFxQixDQUFDLFFBQVE7QUFDL0IsVUFBTSxZQUFZQSxNQUFLLFdBQVcsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLFFBQVE7QUFDcEYsVUFBTSxXQUFXLENBQUM7QUFDbEIsZUFBVyxLQUFLLFdBQVc7QUFDdkIsZUFBUyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQUEsSUFDdkI7QUFDQSxXQUFPQSxNQUFLLGFBQWEsUUFBUTtBQUFBLEVBQ3JDO0FBQ0EsRUFBQUEsTUFBSyxlQUFlLENBQUMsUUFBUTtBQUN6QixXQUFPQSxNQUFLLFdBQVcsR0FBRyxFQUFFLElBQUksU0FBVSxHQUFHO0FBQ3pDLGFBQU8sSUFBSSxDQUFDO0FBQUEsSUFDaEIsQ0FBQztBQUFBLEVBQ0w7QUFDQSxFQUFBQSxNQUFLLGFBQWEsT0FBTyxPQUFPLFNBQVMsYUFDbkMsQ0FBQyxRQUFRLE9BQU8sS0FBSyxHQUFHLElBQ3hCLENBQUMsV0FBVztBQUNWLFVBQU0sT0FBTyxDQUFDO0FBQ2QsZUFBVyxPQUFPLFFBQVE7QUFDdEIsVUFBSSxPQUFPLFVBQVUsZUFBZSxLQUFLLFFBQVEsR0FBRyxHQUFHO0FBQ25ELGFBQUssS0FBSyxHQUFHO0FBQUEsTUFDakI7QUFBQSxJQUNKO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFDSixFQUFBQSxNQUFLLE9BQU8sQ0FBQyxLQUFLLFlBQVk7QUFDMUIsZUFBVyxRQUFRLEtBQUs7QUFDcEIsVUFBSSxRQUFRLElBQUk7QUFDWixlQUFPO0FBQUEsSUFDZjtBQUNBLFdBQU87QUFBQSxFQUNYO0FBQ0EsRUFBQUEsTUFBSyxZQUFZLE9BQU8sT0FBTyxjQUFjLGFBQ3ZDLENBQUMsUUFBUSxPQUFPLFVBQVUsR0FBRyxJQUM3QixDQUFDLFFBQVEsT0FBTyxRQUFRLFlBQVksT0FBTyxTQUFTLEdBQUcsS0FBSyxLQUFLLE1BQU0sR0FBRyxNQUFNO0FBQ3RGLFdBQVMsV0FBVyxPQUFPLFlBQVksT0FBTztBQUMxQyxXQUFPLE1BQU0sSUFBSSxDQUFDLFFBQVMsT0FBTyxRQUFRLFdBQVcsSUFBSSxHQUFHLE1BQU0sR0FBSSxFQUFFLEtBQUssU0FBUztBQUFBLEVBQzFGO0FBQ0EsRUFBQUEsTUFBSyxhQUFhO0FBQ2xCLEVBQUFBLE1BQUssd0JBQXdCLENBQUMsR0FBRyxVQUFVO0FBQ3ZDLFFBQUksT0FBTyxVQUFVLFVBQVU7QUFDM0IsYUFBTyxNQUFNLFNBQVM7QUFBQSxJQUMxQjtBQUNBLFdBQU87QUFBQSxFQUNYO0FBQ0osR0FBRyxTQUFTLE9BQU8sQ0FBQyxFQUFFO0FBQ2YsSUFBSTtBQUFBLENBQ1YsU0FBVUMsYUFBWTtBQUNuQixFQUFBQSxZQUFXLGNBQWMsQ0FBQyxPQUFPLFdBQVc7QUFDeEMsV0FBTztBQUFBLE1BQ0gsR0FBRztBQUFBLE1BQ0gsR0FBRztBQUFBO0FBQUEsSUFDUDtBQUFBLEVBQ0o7QUFDSixHQUFHLGVBQWUsYUFBYSxDQUFDLEVBQUU7QUFDM0IsSUFBTSxnQkFBZ0IsS0FBSyxZQUFZO0FBQUEsRUFDMUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0osQ0FBQztBQUNNLElBQU0sZ0JBQWdCLENBQUMsU0FBUztBQUNuQyxRQUFNLElBQUksT0FBTztBQUNqQixVQUFRLEdBQUc7QUFBQSxJQUNQLEtBQUs7QUFDRCxhQUFPLGNBQWM7QUFBQSxJQUN6QixLQUFLO0FBQ0QsYUFBTyxjQUFjO0FBQUEsSUFDekIsS0FBSztBQUNELGFBQU8sT0FBTyxNQUFNLElBQUksSUFBSSxjQUFjLE1BQU0sY0FBYztBQUFBLElBQ2xFLEtBQUs7QUFDRCxhQUFPLGNBQWM7QUFBQSxJQUN6QixLQUFLO0FBQ0QsYUFBTyxjQUFjO0FBQUEsSUFDekIsS0FBSztBQUNELGFBQU8sY0FBYztBQUFBLElBQ3pCLEtBQUs7QUFDRCxhQUFPLGNBQWM7QUFBQSxJQUN6QixLQUFLO0FBQ0QsVUFBSSxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBQ3JCLGVBQU8sY0FBYztBQUFBLE1BQ3pCO0FBQ0EsVUFBSSxTQUFTLE1BQU07QUFDZixlQUFPLGNBQWM7QUFBQSxNQUN6QjtBQUNBLFVBQUksS0FBSyxRQUFRLE9BQU8sS0FBSyxTQUFTLGNBQWMsS0FBSyxTQUFTLE9BQU8sS0FBSyxVQUFVLFlBQVk7QUFDaEcsZUFBTyxjQUFjO0FBQUEsTUFDekI7QUFDQSxVQUFJLE9BQU8sUUFBUSxlQUFlLGdCQUFnQixLQUFLO0FBQ25ELGVBQU8sY0FBYztBQUFBLE1BQ3pCO0FBQ0EsVUFBSSxPQUFPLFFBQVEsZUFBZSxnQkFBZ0IsS0FBSztBQUNuRCxlQUFPLGNBQWM7QUFBQSxNQUN6QjtBQUNBLFVBQUksT0FBTyxTQUFTLGVBQWUsZ0JBQWdCLE1BQU07QUFDckQsZUFBTyxjQUFjO0FBQUEsTUFDekI7QUFDQSxhQUFPLGNBQWM7QUFBQSxJQUN6QjtBQUNJLGFBQU8sY0FBYztBQUFBLEVBQzdCO0FBQ0o7OztBQ25JTyxJQUFNLGVBQWUsS0FBSyxZQUFZO0FBQUEsRUFDekM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDSixDQUFDO0FBQ00sSUFBTSxnQkFBZ0IsQ0FBQyxRQUFRO0FBQ2xDLFFBQU0sT0FBTyxLQUFLLFVBQVUsS0FBSyxNQUFNLENBQUM7QUFDeEMsU0FBTyxLQUFLLFFBQVEsZUFBZSxLQUFLO0FBQzVDO0FBQ08sSUFBTSxXQUFOLE1BQU0sa0JBQWlCLE1BQU07QUFBQSxFQUNoQyxJQUFJLFNBQVM7QUFDVCxXQUFPLEtBQUs7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsWUFBWSxRQUFRO0FBQ2hCLFVBQU07QUFDTixTQUFLLFNBQVMsQ0FBQztBQUNmLFNBQUssV0FBVyxDQUFDLFFBQVE7QUFDckIsV0FBSyxTQUFTLENBQUMsR0FBRyxLQUFLLFFBQVEsR0FBRztBQUFBLElBQ3RDO0FBQ0EsU0FBSyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU07QUFDNUIsV0FBSyxTQUFTLENBQUMsR0FBRyxLQUFLLFFBQVEsR0FBRyxJQUFJO0FBQUEsSUFDMUM7QUFDQSxVQUFNLGNBQWMsV0FBVztBQUMvQixRQUFJLE9BQU8sZ0JBQWdCO0FBRXZCLGFBQU8sZUFBZSxNQUFNLFdBQVc7QUFBQSxJQUMzQyxPQUNLO0FBQ0QsV0FBSyxZQUFZO0FBQUEsSUFDckI7QUFDQSxTQUFLLE9BQU87QUFDWixTQUFLLFNBQVM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsT0FBTyxTQUFTO0FBQ1osVUFBTSxTQUFTLFdBQ1gsU0FBVSxPQUFPO0FBQ2IsYUFBTyxNQUFNO0FBQUEsSUFDakI7QUFDSixVQUFNLGNBQWMsRUFBRSxTQUFTLENBQUMsRUFBRTtBQUNsQyxVQUFNLGVBQWUsQ0FBQyxVQUFVO0FBQzVCLGlCQUFXLFNBQVMsTUFBTSxRQUFRO0FBQzlCLFlBQUksTUFBTSxTQUFTLGlCQUFpQjtBQUNoQyxnQkFBTSxZQUFZLElBQUksWUFBWTtBQUFBLFFBQ3RDLFdBQ1MsTUFBTSxTQUFTLHVCQUF1QjtBQUMzQyx1QkFBYSxNQUFNLGVBQWU7QUFBQSxRQUN0QyxXQUNTLE1BQU0sU0FBUyxxQkFBcUI7QUFDekMsdUJBQWEsTUFBTSxjQUFjO0FBQUEsUUFDckMsV0FDUyxNQUFNLEtBQUssV0FBVyxHQUFHO0FBQzlCLHNCQUFZLFFBQVEsS0FBSyxPQUFPLEtBQUssQ0FBQztBQUFBLFFBQzFDLE9BQ0s7QUFDRCxjQUFJLE9BQU87QUFDWCxjQUFJLElBQUk7QUFDUixpQkFBTyxJQUFJLE1BQU0sS0FBSyxRQUFRO0FBQzFCLGtCQUFNLEtBQUssTUFBTSxLQUFLLENBQUM7QUFDdkIsa0JBQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxTQUFTO0FBQzNDLGdCQUFJLENBQUMsVUFBVTtBQUNYLG1CQUFLLEVBQUUsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxFQUFFO0FBQUEsWUFRekMsT0FDSztBQUNELG1CQUFLLEVBQUUsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxFQUFFO0FBQ3JDLG1CQUFLLEVBQUUsRUFBRSxRQUFRLEtBQUssT0FBTyxLQUFLLENBQUM7QUFBQSxZQUN2QztBQUNBLG1CQUFPLEtBQUssRUFBRTtBQUNkO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUNBLGlCQUFhLElBQUk7QUFDakIsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLE9BQU8sT0FBTyxPQUFPO0FBQ2pCLFFBQUksRUFBRSxpQkFBaUIsWUFBVztBQUM5QixZQUFNLElBQUksTUFBTSxtQkFBbUIsS0FBSyxFQUFFO0FBQUEsSUFDOUM7QUFBQSxFQUNKO0FBQUEsRUFDQSxXQUFXO0FBQ1AsV0FBTyxLQUFLO0FBQUEsRUFDaEI7QUFBQSxFQUNBLElBQUksVUFBVTtBQUNWLFdBQU8sS0FBSyxVQUFVLEtBQUssUUFBUSxLQUFLLHVCQUF1QixDQUFDO0FBQUEsRUFDcEU7QUFBQSxFQUNBLElBQUksVUFBVTtBQUNWLFdBQU8sS0FBSyxPQUFPLFdBQVc7QUFBQSxFQUNsQztBQUFBLEVBQ0EsUUFBUSxTQUFTLENBQUMsVUFBVSxNQUFNLFNBQVM7QUFDdkMsVUFBTSxjQUFjLENBQUM7QUFDckIsVUFBTSxhQUFhLENBQUM7QUFDcEIsZUFBVyxPQUFPLEtBQUssUUFBUTtBQUMzQixVQUFJLElBQUksS0FBSyxTQUFTLEdBQUc7QUFDckIsY0FBTSxVQUFVLElBQUksS0FBSyxDQUFDO0FBQzFCLG9CQUFZLE9BQU8sSUFBSSxZQUFZLE9BQU8sS0FBSyxDQUFDO0FBQ2hELG9CQUFZLE9BQU8sRUFBRSxLQUFLLE9BQU8sR0FBRyxDQUFDO0FBQUEsTUFDekMsT0FDSztBQUNELG1CQUFXLEtBQUssT0FBTyxHQUFHLENBQUM7QUFBQSxNQUMvQjtBQUFBLElBQ0o7QUFDQSxXQUFPLEVBQUUsWUFBWSxZQUFZO0FBQUEsRUFDckM7QUFBQSxFQUNBLElBQUksYUFBYTtBQUNiLFdBQU8sS0FBSyxRQUFRO0FBQUEsRUFDeEI7QUFDSjtBQUNBLFNBQVMsU0FBUyxDQUFDLFdBQVc7QUFDMUIsUUFBTSxRQUFRLElBQUksU0FBUyxNQUFNO0FBQ2pDLFNBQU87QUFDWDs7O0FDbElBLElBQU0sV0FBVyxDQUFDLE9BQU8sU0FBUztBQUM5QixNQUFJO0FBQ0osVUFBUSxNQUFNLE1BQU07QUFBQSxJQUNoQixLQUFLLGFBQWE7QUFDZCxVQUFJLE1BQU0sYUFBYSxjQUFjLFdBQVc7QUFDNUMsa0JBQVU7QUFBQSxNQUNkLE9BQ0s7QUFDRCxrQkFBVSxZQUFZLE1BQU0sUUFBUSxjQUFjLE1BQU0sUUFBUTtBQUFBLE1BQ3BFO0FBQ0E7QUFBQSxJQUNKLEtBQUssYUFBYTtBQUNkLGdCQUFVLG1DQUFtQyxLQUFLLFVBQVUsTUFBTSxVQUFVLEtBQUsscUJBQXFCLENBQUM7QUFDdkc7QUFBQSxJQUNKLEtBQUssYUFBYTtBQUNkLGdCQUFVLGtDQUFrQyxLQUFLLFdBQVcsTUFBTSxNQUFNLElBQUksQ0FBQztBQUM3RTtBQUFBLElBQ0osS0FBSyxhQUFhO0FBQ2QsZ0JBQVU7QUFDVjtBQUFBLElBQ0osS0FBSyxhQUFhO0FBQ2QsZ0JBQVUseUNBQXlDLEtBQUssV0FBVyxNQUFNLE9BQU8sQ0FBQztBQUNqRjtBQUFBLElBQ0osS0FBSyxhQUFhO0FBQ2QsZ0JBQVUsZ0NBQWdDLEtBQUssV0FBVyxNQUFNLE9BQU8sQ0FBQyxlQUFlLE1BQU0sUUFBUTtBQUNyRztBQUFBLElBQ0osS0FBSyxhQUFhO0FBQ2QsZ0JBQVU7QUFDVjtBQUFBLElBQ0osS0FBSyxhQUFhO0FBQ2QsZ0JBQVU7QUFDVjtBQUFBLElBQ0osS0FBSyxhQUFhO0FBQ2QsZ0JBQVU7QUFDVjtBQUFBLElBQ0osS0FBSyxhQUFhO0FBQ2QsVUFBSSxPQUFPLE1BQU0sZUFBZSxVQUFVO0FBQ3RDLFlBQUksY0FBYyxNQUFNLFlBQVk7QUFDaEMsb0JBQVUsZ0NBQWdDLE1BQU0sV0FBVyxRQUFRO0FBQ25FLGNBQUksT0FBTyxNQUFNLFdBQVcsYUFBYSxVQUFVO0FBQy9DLHNCQUFVLEdBQUcsT0FBTyxzREFBc0QsTUFBTSxXQUFXLFFBQVE7QUFBQSxVQUN2RztBQUFBLFFBQ0osV0FDUyxnQkFBZ0IsTUFBTSxZQUFZO0FBQ3ZDLG9CQUFVLG1DQUFtQyxNQUFNLFdBQVcsVUFBVTtBQUFBLFFBQzVFLFdBQ1MsY0FBYyxNQUFNLFlBQVk7QUFDckMsb0JBQVUsaUNBQWlDLE1BQU0sV0FBVyxRQUFRO0FBQUEsUUFDeEUsT0FDSztBQUNELGVBQUssWUFBWSxNQUFNLFVBQVU7QUFBQSxRQUNyQztBQUFBLE1BQ0osV0FDUyxNQUFNLGVBQWUsU0FBUztBQUNuQyxrQkFBVSxXQUFXLE1BQU0sVUFBVTtBQUFBLE1BQ3pDLE9BQ0s7QUFDRCxrQkFBVTtBQUFBLE1BQ2Q7QUFDQTtBQUFBLElBQ0osS0FBSyxhQUFhO0FBQ2QsVUFBSSxNQUFNLFNBQVM7QUFDZixrQkFBVSxzQkFBc0IsTUFBTSxRQUFRLFlBQVksTUFBTSxZQUFZLGFBQWEsV0FBVyxJQUFJLE1BQU0sT0FBTztBQUFBLGVBQ2hILE1BQU0sU0FBUztBQUNwQixrQkFBVSx1QkFBdUIsTUFBTSxRQUFRLFlBQVksTUFBTSxZQUFZLGFBQWEsTUFBTSxJQUFJLE1BQU0sT0FBTztBQUFBLGVBQzVHLE1BQU0sU0FBUztBQUNwQixrQkFBVSxrQkFBa0IsTUFBTSxRQUFRLHNCQUFzQixNQUFNLFlBQVksOEJBQThCLGVBQWUsR0FBRyxNQUFNLE9BQU87QUFBQSxlQUMxSSxNQUFNLFNBQVM7QUFDcEIsa0JBQVUsa0JBQWtCLE1BQU0sUUFBUSxzQkFBc0IsTUFBTSxZQUFZLDhCQUE4QixlQUFlLEdBQUcsTUFBTSxPQUFPO0FBQUEsZUFDMUksTUFBTSxTQUFTO0FBQ3BCLGtCQUFVLGdCQUFnQixNQUFNLFFBQVEsc0JBQXNCLE1BQU0sWUFBWSw4QkFBOEIsZUFBZSxHQUFHLElBQUksS0FBSyxPQUFPLE1BQU0sT0FBTyxDQUFDLENBQUM7QUFBQTtBQUUvSixrQkFBVTtBQUNkO0FBQUEsSUFDSixLQUFLLGFBQWE7QUFDZCxVQUFJLE1BQU0sU0FBUztBQUNmLGtCQUFVLHNCQUFzQixNQUFNLFFBQVEsWUFBWSxNQUFNLFlBQVksWUFBWSxXQUFXLElBQUksTUFBTSxPQUFPO0FBQUEsZUFDL0csTUFBTSxTQUFTO0FBQ3BCLGtCQUFVLHVCQUF1QixNQUFNLFFBQVEsWUFBWSxNQUFNLFlBQVksWUFBWSxPQUFPLElBQUksTUFBTSxPQUFPO0FBQUEsZUFDNUcsTUFBTSxTQUFTO0FBQ3BCLGtCQUFVLGtCQUFrQixNQUFNLFFBQVEsWUFBWSxNQUFNLFlBQVksMEJBQTBCLFdBQVcsSUFBSSxNQUFNLE9BQU87QUFBQSxlQUN6SCxNQUFNLFNBQVM7QUFDcEIsa0JBQVUsa0JBQWtCLE1BQU0sUUFBUSxZQUFZLE1BQU0sWUFBWSwwQkFBMEIsV0FBVyxJQUFJLE1BQU0sT0FBTztBQUFBLGVBQ3pILE1BQU0sU0FBUztBQUNwQixrQkFBVSxnQkFBZ0IsTUFBTSxRQUFRLFlBQVksTUFBTSxZQUFZLDZCQUE2QixjQUFjLElBQUksSUFBSSxLQUFLLE9BQU8sTUFBTSxPQUFPLENBQUMsQ0FBQztBQUFBO0FBRXBKLGtCQUFVO0FBQ2Q7QUFBQSxJQUNKLEtBQUssYUFBYTtBQUNkLGdCQUFVO0FBQ1Y7QUFBQSxJQUNKLEtBQUssYUFBYTtBQUNkLGdCQUFVO0FBQ1Y7QUFBQSxJQUNKLEtBQUssYUFBYTtBQUNkLGdCQUFVLGdDQUFnQyxNQUFNLFVBQVU7QUFDMUQ7QUFBQSxJQUNKLEtBQUssYUFBYTtBQUNkLGdCQUFVO0FBQ1Y7QUFBQSxJQUNKO0FBQ0ksZ0JBQVUsS0FBSztBQUNmLFdBQUssWUFBWSxLQUFLO0FBQUEsRUFDOUI7QUFDQSxTQUFPLEVBQUUsUUFBUTtBQUNyQjtBQUNBLElBQU8sYUFBUTs7O0FDM0dmLElBQUksbUJBQW1CO0FBRWhCLFNBQVMsWUFBWSxLQUFLO0FBQzdCLHFCQUFtQjtBQUN2QjtBQUNPLFNBQVMsY0FBYztBQUMxQixTQUFPO0FBQ1g7OztBQ05PLElBQU0sWUFBWSxDQUFDLFdBQVc7QUFDakMsUUFBTSxFQUFFLE1BQU0sTUFBTSxXQUFXLFVBQVUsSUFBSTtBQUM3QyxRQUFNLFdBQVcsQ0FBQyxHQUFHLE1BQU0sR0FBSSxVQUFVLFFBQVEsQ0FBQyxDQUFFO0FBQ3BELFFBQU0sWUFBWTtBQUFBLElBQ2QsR0FBRztBQUFBLElBQ0gsTUFBTTtBQUFBLEVBQ1Y7QUFDQSxNQUFJLFVBQVUsWUFBWSxRQUFXO0FBQ2pDLFdBQU87QUFBQSxNQUNILEdBQUc7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVMsVUFBVTtBQUFBLElBQ3ZCO0FBQUEsRUFDSjtBQUNBLE1BQUksZUFBZTtBQUNuQixRQUFNLE9BQU8sVUFDUixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNqQixNQUFNLEVBQ04sUUFBUTtBQUNiLGFBQVcsT0FBTyxNQUFNO0FBQ3BCLG1CQUFlLElBQUksV0FBVyxFQUFFLE1BQU0sY0FBYyxhQUFhLENBQUMsRUFBRTtBQUFBLEVBQ3hFO0FBQ0EsU0FBTztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ2I7QUFDSjtBQUNPLElBQU0sYUFBYSxDQUFDO0FBQ3BCLFNBQVMsa0JBQWtCLEtBQUssV0FBVztBQUM5QyxRQUFNLGNBQWMsWUFBWTtBQUNoQyxRQUFNLFFBQVEsVUFBVTtBQUFBLElBQ3BCO0FBQUEsSUFDQSxNQUFNLElBQUk7QUFBQSxJQUNWLE1BQU0sSUFBSTtBQUFBLElBQ1YsV0FBVztBQUFBLE1BQ1AsSUFBSSxPQUFPO0FBQUE7QUFBQSxNQUNYLElBQUk7QUFBQTtBQUFBLE1BQ0o7QUFBQTtBQUFBLE1BQ0EsZ0JBQWdCLGFBQWtCLFNBQVk7QUFBQTtBQUFBLElBQ2xELEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFBQSxFQUN2QixDQUFDO0FBQ0QsTUFBSSxPQUFPLE9BQU8sS0FBSyxLQUFLO0FBQ2hDO0FBQ08sSUFBTSxjQUFOLE1BQU0sYUFBWTtBQUFBLEVBQ3JCLGNBQWM7QUFDVixTQUFLLFFBQVE7QUFBQSxFQUNqQjtBQUFBLEVBQ0EsUUFBUTtBQUNKLFFBQUksS0FBSyxVQUFVO0FBQ2YsV0FBSyxRQUFRO0FBQUEsRUFDckI7QUFBQSxFQUNBLFFBQVE7QUFDSixRQUFJLEtBQUssVUFBVTtBQUNmLFdBQUssUUFBUTtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxPQUFPLFdBQVcsUUFBUSxTQUFTO0FBQy9CLFVBQU0sYUFBYSxDQUFDO0FBQ3BCLGVBQVcsS0FBSyxTQUFTO0FBQ3JCLFVBQUksRUFBRSxXQUFXO0FBQ2IsZUFBTztBQUNYLFVBQUksRUFBRSxXQUFXO0FBQ2IsZUFBTyxNQUFNO0FBQ2pCLGlCQUFXLEtBQUssRUFBRSxLQUFLO0FBQUEsSUFDM0I7QUFDQSxXQUFPLEVBQUUsUUFBUSxPQUFPLE9BQU8sT0FBTyxXQUFXO0FBQUEsRUFDckQ7QUFBQSxFQUNBLGFBQWEsaUJBQWlCLFFBQVEsT0FBTztBQUN6QyxVQUFNLFlBQVksQ0FBQztBQUNuQixlQUFXLFFBQVEsT0FBTztBQUN0QixZQUFNLE1BQU0sTUFBTSxLQUFLO0FBQ3ZCLFlBQU0sUUFBUSxNQUFNLEtBQUs7QUFDekIsZ0JBQVUsS0FBSztBQUFBLFFBQ1g7QUFBQSxRQUNBO0FBQUEsTUFDSixDQUFDO0FBQUEsSUFDTDtBQUNBLFdBQU8sYUFBWSxnQkFBZ0IsUUFBUSxTQUFTO0FBQUEsRUFDeEQ7QUFBQSxFQUNBLE9BQU8sZ0JBQWdCLFFBQVEsT0FBTztBQUNsQyxVQUFNLGNBQWMsQ0FBQztBQUNyQixlQUFXLFFBQVEsT0FBTztBQUN0QixZQUFNLEVBQUUsS0FBSyxNQUFNLElBQUk7QUFDdkIsVUFBSSxJQUFJLFdBQVc7QUFDZixlQUFPO0FBQ1gsVUFBSSxNQUFNLFdBQVc7QUFDakIsZUFBTztBQUNYLFVBQUksSUFBSSxXQUFXO0FBQ2YsZUFBTyxNQUFNO0FBQ2pCLFVBQUksTUFBTSxXQUFXO0FBQ2pCLGVBQU8sTUFBTTtBQUNqQixVQUFJLElBQUksVUFBVSxnQkFBZ0IsT0FBTyxNQUFNLFVBQVUsZUFBZSxLQUFLLFlBQVk7QUFDckYsb0JBQVksSUFBSSxLQUFLLElBQUksTUFBTTtBQUFBLE1BQ25DO0FBQUEsSUFDSjtBQUNBLFdBQU8sRUFBRSxRQUFRLE9BQU8sT0FBTyxPQUFPLFlBQVk7QUFBQSxFQUN0RDtBQUNKO0FBQ08sSUFBTSxVQUFVLE9BQU8sT0FBTztBQUFBLEVBQ2pDLFFBQVE7QUFDWixDQUFDO0FBQ00sSUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLFFBQVEsU0FBUyxNQUFNO0FBQ25ELElBQU0sS0FBSyxDQUFDLFdBQVcsRUFBRSxRQUFRLFNBQVMsTUFBTTtBQUNoRCxJQUFNLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVztBQUN0QyxJQUFNLFVBQVUsQ0FBQyxNQUFNLEVBQUUsV0FBVztBQUNwQyxJQUFNLFVBQVUsQ0FBQyxNQUFNLEVBQUUsV0FBVztBQUNwQyxJQUFNLFVBQVUsQ0FBQyxNQUFNLE9BQU8sWUFBWSxlQUFlLGFBQWE7OztBQzVHdEUsSUFBSTtBQUFBLENBQ1YsU0FBVUMsWUFBVztBQUNsQixFQUFBQSxXQUFVLFdBQVcsQ0FBQyxZQUFZLE9BQU8sWUFBWSxXQUFXLEVBQUUsUUFBUSxJQUFJLFdBQVcsQ0FBQztBQUUxRixFQUFBQSxXQUFVLFdBQVcsQ0FBQyxZQUFZLE9BQU8sWUFBWSxXQUFXLFVBQVUsU0FBUztBQUN2RixHQUFHLGNBQWMsWUFBWSxDQUFDLEVBQUU7OztBQ0FoQyxJQUFNLHFCQUFOLE1BQXlCO0FBQUEsRUFDckIsWUFBWSxRQUFRLE9BQU8sTUFBTSxLQUFLO0FBQ2xDLFNBQUssY0FBYyxDQUFDO0FBQ3BCLFNBQUssU0FBUztBQUNkLFNBQUssT0FBTztBQUNaLFNBQUssUUFBUTtBQUNiLFNBQUssT0FBTztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxJQUFJLE9BQU87QUFDUCxRQUFJLENBQUMsS0FBSyxZQUFZLFFBQVE7QUFDMUIsVUFBSSxNQUFNLFFBQVEsS0FBSyxJQUFJLEdBQUc7QUFDMUIsYUFBSyxZQUFZLEtBQUssR0FBRyxLQUFLLE9BQU8sR0FBRyxLQUFLLElBQUk7QUFBQSxNQUNyRCxPQUNLO0FBQ0QsYUFBSyxZQUFZLEtBQUssR0FBRyxLQUFLLE9BQU8sS0FBSyxJQUFJO0FBQUEsTUFDbEQ7QUFBQSxJQUNKO0FBQ0EsV0FBTyxLQUFLO0FBQUEsRUFDaEI7QUFDSjtBQUNBLElBQU0sZUFBZSxDQUFDLEtBQUssV0FBVztBQUNsQyxNQUFJLFFBQVEsTUFBTSxHQUFHO0FBQ2pCLFdBQU8sRUFBRSxTQUFTLE1BQU0sTUFBTSxPQUFPLE1BQU07QUFBQSxFQUMvQyxPQUNLO0FBQ0QsUUFBSSxDQUFDLElBQUksT0FBTyxPQUFPLFFBQVE7QUFDM0IsWUFBTSxJQUFJLE1BQU0sMkNBQTJDO0FBQUEsSUFDL0Q7QUFDQSxXQUFPO0FBQUEsTUFDSCxTQUFTO0FBQUEsTUFDVCxJQUFJLFFBQVE7QUFDUixZQUFJLEtBQUs7QUFDTCxpQkFBTyxLQUFLO0FBQ2hCLGNBQU0sUUFBUSxJQUFJLFNBQVMsSUFBSSxPQUFPLE1BQU07QUFDNUMsYUFBSyxTQUFTO0FBQ2QsZUFBTyxLQUFLO0FBQUEsTUFDaEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKO0FBQ0EsU0FBUyxvQkFBb0IsUUFBUTtBQUNqQyxNQUFJLENBQUM7QUFDRCxXQUFPLENBQUM7QUFDWixRQUFNLEVBQUUsVUFBQUMsV0FBVSxvQkFBb0IsZ0JBQWdCLFlBQVksSUFBSTtBQUN0RSxNQUFJQSxjQUFhLHNCQUFzQixpQkFBaUI7QUFDcEQsVUFBTSxJQUFJLE1BQU0sMEZBQTBGO0FBQUEsRUFDOUc7QUFDQSxNQUFJQTtBQUNBLFdBQU8sRUFBRSxVQUFVQSxXQUFVLFlBQVk7QUFDN0MsUUFBTSxZQUFZLENBQUMsS0FBSyxRQUFRO0FBQzVCLFVBQU0sRUFBRSxRQUFRLElBQUk7QUFDcEIsUUFBSSxJQUFJLFNBQVMsc0JBQXNCO0FBQ25DLGFBQU8sRUFBRSxTQUFTLFdBQVcsSUFBSSxhQUFhO0FBQUEsSUFDbEQ7QUFDQSxRQUFJLE9BQU8sSUFBSSxTQUFTLGFBQWE7QUFDakMsYUFBTyxFQUFFLFNBQVMsV0FBVyxrQkFBa0IsSUFBSSxhQUFhO0FBQUEsSUFDcEU7QUFDQSxRQUFJLElBQUksU0FBUztBQUNiLGFBQU8sRUFBRSxTQUFTLElBQUksYUFBYTtBQUN2QyxXQUFPLEVBQUUsU0FBUyxXQUFXLHNCQUFzQixJQUFJLGFBQWE7QUFBQSxFQUN4RTtBQUNBLFNBQU8sRUFBRSxVQUFVLFdBQVcsWUFBWTtBQUM5QztBQUNPLElBQU0sVUFBTixNQUFjO0FBQUEsRUFDakIsSUFBSSxjQUFjO0FBQ2QsV0FBTyxLQUFLLEtBQUs7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsU0FBUyxPQUFPO0FBQ1osV0FBTyxjQUFjLE1BQU0sSUFBSTtBQUFBLEVBQ25DO0FBQUEsRUFDQSxnQkFBZ0IsT0FBTyxLQUFLO0FBQ3hCLFdBQVEsT0FBTztBQUFBLE1BQ1gsUUFBUSxNQUFNLE9BQU87QUFBQSxNQUNyQixNQUFNLE1BQU07QUFBQSxNQUNaLFlBQVksY0FBYyxNQUFNLElBQUk7QUFBQSxNQUNwQyxnQkFBZ0IsS0FBSyxLQUFLO0FBQUEsTUFDMUIsTUFBTSxNQUFNO0FBQUEsTUFDWixRQUFRLE1BQU07QUFBQSxJQUNsQjtBQUFBLEVBQ0o7QUFBQSxFQUNBLG9CQUFvQixPQUFPO0FBQ3ZCLFdBQU87QUFBQSxNQUNILFFBQVEsSUFBSSxZQUFZO0FBQUEsTUFDeEIsS0FBSztBQUFBLFFBQ0QsUUFBUSxNQUFNLE9BQU87QUFBQSxRQUNyQixNQUFNLE1BQU07QUFBQSxRQUNaLFlBQVksY0FBYyxNQUFNLElBQUk7QUFBQSxRQUNwQyxnQkFBZ0IsS0FBSyxLQUFLO0FBQUEsUUFDMUIsTUFBTSxNQUFNO0FBQUEsUUFDWixRQUFRLE1BQU07QUFBQSxNQUNsQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxXQUFXLE9BQU87QUFDZCxVQUFNLFNBQVMsS0FBSyxPQUFPLEtBQUs7QUFDaEMsUUFBSSxRQUFRLE1BQU0sR0FBRztBQUNqQixZQUFNLElBQUksTUFBTSx3Q0FBd0M7QUFBQSxJQUM1RDtBQUNBLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFDQSxZQUFZLE9BQU87QUFDZixVQUFNLFNBQVMsS0FBSyxPQUFPLEtBQUs7QUFDaEMsV0FBTyxRQUFRLFFBQVEsTUFBTTtBQUFBLEVBQ2pDO0FBQUEsRUFDQSxNQUFNLE1BQU0sUUFBUTtBQUNoQixVQUFNLFNBQVMsS0FBSyxVQUFVLE1BQU0sTUFBTTtBQUMxQyxRQUFJLE9BQU87QUFDUCxhQUFPLE9BQU87QUFDbEIsVUFBTSxPQUFPO0FBQUEsRUFDakI7QUFBQSxFQUNBLFVBQVUsTUFBTSxRQUFRO0FBQ3BCLFVBQU0sTUFBTTtBQUFBLE1BQ1IsUUFBUTtBQUFBLFFBQ0osUUFBUSxDQUFDO0FBQUEsUUFDVCxPQUFPLFFBQVEsU0FBUztBQUFBLFFBQ3hCLG9CQUFvQixRQUFRO0FBQUEsTUFDaEM7QUFBQSxNQUNBLE1BQU0sUUFBUSxRQUFRLENBQUM7QUFBQSxNQUN2QixnQkFBZ0IsS0FBSyxLQUFLO0FBQUEsTUFDMUIsUUFBUTtBQUFBLE1BQ1I7QUFBQSxNQUNBLFlBQVksY0FBYyxJQUFJO0FBQUEsSUFDbEM7QUFDQSxVQUFNLFNBQVMsS0FBSyxXQUFXLEVBQUUsTUFBTSxNQUFNLElBQUksTUFBTSxRQUFRLElBQUksQ0FBQztBQUNwRSxXQUFPLGFBQWEsS0FBSyxNQUFNO0FBQUEsRUFDbkM7QUFBQSxFQUNBLFlBQVksTUFBTTtBQUNkLFVBQU0sTUFBTTtBQUFBLE1BQ1IsUUFBUTtBQUFBLFFBQ0osUUFBUSxDQUFDO0FBQUEsUUFDVCxPQUFPLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtBQUFBLE1BQy9CO0FBQUEsTUFDQSxNQUFNLENBQUM7QUFBQSxNQUNQLGdCQUFnQixLQUFLLEtBQUs7QUFBQSxNQUMxQixRQUFRO0FBQUEsTUFDUjtBQUFBLE1BQ0EsWUFBWSxjQUFjLElBQUk7QUFBQSxJQUNsQztBQUNBLFFBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRSxPQUFPO0FBQzFCLFVBQUk7QUFDQSxjQUFNLFNBQVMsS0FBSyxXQUFXLEVBQUUsTUFBTSxNQUFNLENBQUMsR0FBRyxRQUFRLElBQUksQ0FBQztBQUM5RCxlQUFPLFFBQVEsTUFBTSxJQUNmO0FBQUEsVUFDRSxPQUFPLE9BQU87QUFBQSxRQUNsQixJQUNFO0FBQUEsVUFDRSxRQUFRLElBQUksT0FBTztBQUFBLFFBQ3ZCO0FBQUEsTUFDUixTQUNPLEtBQUs7QUFDUixZQUFJLEtBQUssU0FBUyxZQUFZLEdBQUcsU0FBUyxhQUFhLEdBQUc7QUFDdEQsZUFBSyxXQUFXLEVBQUUsUUFBUTtBQUFBLFFBQzlCO0FBQ0EsWUFBSSxTQUFTO0FBQUEsVUFDVCxRQUFRLENBQUM7QUFBQSxVQUNULE9BQU87QUFBQSxRQUNYO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFDQSxXQUFPLEtBQUssWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDLEdBQUcsUUFBUSxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsV0FBVyxRQUFRLE1BQU0sSUFDbEY7QUFBQSxNQUNFLE9BQU8sT0FBTztBQUFBLElBQ2xCLElBQ0U7QUFBQSxNQUNFLFFBQVEsSUFBSSxPQUFPO0FBQUEsSUFDdkIsQ0FBQztBQUFBLEVBQ1Q7QUFBQSxFQUNBLE1BQU0sV0FBVyxNQUFNLFFBQVE7QUFDM0IsVUFBTSxTQUFTLE1BQU0sS0FBSyxlQUFlLE1BQU0sTUFBTTtBQUNyRCxRQUFJLE9BQU87QUFDUCxhQUFPLE9BQU87QUFDbEIsVUFBTSxPQUFPO0FBQUEsRUFDakI7QUFBQSxFQUNBLE1BQU0sZUFBZSxNQUFNLFFBQVE7QUFDL0IsVUFBTSxNQUFNO0FBQUEsTUFDUixRQUFRO0FBQUEsUUFDSixRQUFRLENBQUM7QUFBQSxRQUNULG9CQUFvQixRQUFRO0FBQUEsUUFDNUIsT0FBTztBQUFBLE1BQ1g7QUFBQSxNQUNBLE1BQU0sUUFBUSxRQUFRLENBQUM7QUFBQSxNQUN2QixnQkFBZ0IsS0FBSyxLQUFLO0FBQUEsTUFDMUIsUUFBUTtBQUFBLE1BQ1I7QUFBQSxNQUNBLFlBQVksY0FBYyxJQUFJO0FBQUEsSUFDbEM7QUFDQSxVQUFNLG1CQUFtQixLQUFLLE9BQU8sRUFBRSxNQUFNLE1BQU0sSUFBSSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQzFFLFVBQU0sU0FBUyxPQUFPLFFBQVEsZ0JBQWdCLElBQUksbUJBQW1CLFFBQVEsUUFBUSxnQkFBZ0I7QUFDckcsV0FBTyxhQUFhLEtBQUssTUFBTTtBQUFBLEVBQ25DO0FBQUEsRUFDQSxPQUFPLE9BQU8sU0FBUztBQUNuQixVQUFNLHFCQUFxQixDQUFDLFFBQVE7QUFDaEMsVUFBSSxPQUFPLFlBQVksWUFBWSxPQUFPLFlBQVksYUFBYTtBQUMvRCxlQUFPLEVBQUUsUUFBUTtBQUFBLE1BQ3JCLFdBQ1MsT0FBTyxZQUFZLFlBQVk7QUFDcEMsZUFBTyxRQUFRLEdBQUc7QUFBQSxNQUN0QixPQUNLO0FBQ0QsZUFBTztBQUFBLE1BQ1g7QUFBQSxJQUNKO0FBQ0EsV0FBTyxLQUFLLFlBQVksQ0FBQyxLQUFLLFFBQVE7QUFDbEMsWUFBTSxTQUFTLE1BQU0sR0FBRztBQUN4QixZQUFNLFdBQVcsTUFBTSxJQUFJLFNBQVM7QUFBQSxRQUNoQyxNQUFNLGFBQWE7QUFBQSxRQUNuQixHQUFHLG1CQUFtQixHQUFHO0FBQUEsTUFDN0IsQ0FBQztBQUNELFVBQUksT0FBTyxZQUFZLGVBQWUsa0JBQWtCLFNBQVM7QUFDN0QsZUFBTyxPQUFPLEtBQUssQ0FBQyxTQUFTO0FBQ3pCLGNBQUksQ0FBQyxNQUFNO0FBQ1AscUJBQVM7QUFDVCxtQkFBTztBQUFBLFVBQ1gsT0FDSztBQUNELG1CQUFPO0FBQUEsVUFDWDtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0w7QUFDQSxVQUFJLENBQUMsUUFBUTtBQUNULGlCQUFTO0FBQ1QsZUFBTztBQUFBLE1BQ1gsT0FDSztBQUNELGVBQU87QUFBQSxNQUNYO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsV0FBVyxPQUFPLGdCQUFnQjtBQUM5QixXQUFPLEtBQUssWUFBWSxDQUFDLEtBQUssUUFBUTtBQUNsQyxVQUFJLENBQUMsTUFBTSxHQUFHLEdBQUc7QUFDYixZQUFJLFNBQVMsT0FBTyxtQkFBbUIsYUFBYSxlQUFlLEtBQUssR0FBRyxJQUFJLGNBQWM7QUFDN0YsZUFBTztBQUFBLE1BQ1gsT0FDSztBQUNELGVBQU87QUFBQSxNQUNYO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsWUFBWSxZQUFZO0FBQ3BCLFdBQU8sSUFBSSxXQUFXO0FBQUEsTUFDbEIsUUFBUTtBQUFBLE1BQ1IsVUFBVSxzQkFBc0I7QUFBQSxNQUNoQyxRQUFRLEVBQUUsTUFBTSxjQUFjLFdBQVc7QUFBQSxJQUM3QyxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsWUFBWSxZQUFZO0FBQ3BCLFdBQU8sS0FBSyxZQUFZLFVBQVU7QUFBQSxFQUN0QztBQUFBLEVBQ0EsWUFBWSxLQUFLO0FBRWIsU0FBSyxNQUFNLEtBQUs7QUFDaEIsU0FBSyxPQUFPO0FBQ1osU0FBSyxRQUFRLEtBQUssTUFBTSxLQUFLLElBQUk7QUFDakMsU0FBSyxZQUFZLEtBQUssVUFBVSxLQUFLLElBQUk7QUFDekMsU0FBSyxhQUFhLEtBQUssV0FBVyxLQUFLLElBQUk7QUFDM0MsU0FBSyxpQkFBaUIsS0FBSyxlQUFlLEtBQUssSUFBSTtBQUNuRCxTQUFLLE1BQU0sS0FBSyxJQUFJLEtBQUssSUFBSTtBQUM3QixTQUFLLFNBQVMsS0FBSyxPQUFPLEtBQUssSUFBSTtBQUNuQyxTQUFLLGFBQWEsS0FBSyxXQUFXLEtBQUssSUFBSTtBQUMzQyxTQUFLLGNBQWMsS0FBSyxZQUFZLEtBQUssSUFBSTtBQUM3QyxTQUFLLFdBQVcsS0FBSyxTQUFTLEtBQUssSUFBSTtBQUN2QyxTQUFLLFdBQVcsS0FBSyxTQUFTLEtBQUssSUFBSTtBQUN2QyxTQUFLLFVBQVUsS0FBSyxRQUFRLEtBQUssSUFBSTtBQUNyQyxTQUFLLFFBQVEsS0FBSyxNQUFNLEtBQUssSUFBSTtBQUNqQyxTQUFLLFVBQVUsS0FBSyxRQUFRLEtBQUssSUFBSTtBQUNyQyxTQUFLLEtBQUssS0FBSyxHQUFHLEtBQUssSUFBSTtBQUMzQixTQUFLLE1BQU0sS0FBSyxJQUFJLEtBQUssSUFBSTtBQUM3QixTQUFLLFlBQVksS0FBSyxVQUFVLEtBQUssSUFBSTtBQUN6QyxTQUFLLFFBQVEsS0FBSyxNQUFNLEtBQUssSUFBSTtBQUNqQyxTQUFLLFVBQVUsS0FBSyxRQUFRLEtBQUssSUFBSTtBQUNyQyxTQUFLLFFBQVEsS0FBSyxNQUFNLEtBQUssSUFBSTtBQUNqQyxTQUFLLFdBQVcsS0FBSyxTQUFTLEtBQUssSUFBSTtBQUN2QyxTQUFLLE9BQU8sS0FBSyxLQUFLLEtBQUssSUFBSTtBQUMvQixTQUFLLFdBQVcsS0FBSyxTQUFTLEtBQUssSUFBSTtBQUN2QyxTQUFLLGFBQWEsS0FBSyxXQUFXLEtBQUssSUFBSTtBQUMzQyxTQUFLLGFBQWEsS0FBSyxXQUFXLEtBQUssSUFBSTtBQUMzQyxTQUFLLFdBQVcsSUFBSTtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxNQUNSLFVBQVUsQ0FBQyxTQUFTLEtBQUssV0FBVyxFQUFFLElBQUk7QUFBQSxJQUM5QztBQUFBLEVBQ0o7QUFBQSxFQUNBLFdBQVc7QUFDUCxXQUFPLFlBQVksT0FBTyxNQUFNLEtBQUssSUFBSTtBQUFBLEVBQzdDO0FBQUEsRUFDQSxXQUFXO0FBQ1AsV0FBTyxZQUFZLE9BQU8sTUFBTSxLQUFLLElBQUk7QUFBQSxFQUM3QztBQUFBLEVBQ0EsVUFBVTtBQUNOLFdBQU8sS0FBSyxTQUFTLEVBQUUsU0FBUztBQUFBLEVBQ3BDO0FBQUEsRUFDQSxRQUFRO0FBQ0osV0FBTyxTQUFTLE9BQU8sSUFBSTtBQUFBLEVBQy9CO0FBQUEsRUFDQSxVQUFVO0FBQ04sV0FBTyxXQUFXLE9BQU8sTUFBTSxLQUFLLElBQUk7QUFBQSxFQUM1QztBQUFBLEVBQ0EsR0FBRyxRQUFRO0FBQ1AsV0FBTyxTQUFTLE9BQU8sQ0FBQyxNQUFNLE1BQU0sR0FBRyxLQUFLLElBQUk7QUFBQSxFQUNwRDtBQUFBLEVBQ0EsSUFBSSxVQUFVO0FBQ1YsV0FBTyxnQkFBZ0IsT0FBTyxNQUFNLFVBQVUsS0FBSyxJQUFJO0FBQUEsRUFDM0Q7QUFBQSxFQUNBLFVBQVUsV0FBVztBQUNqQixXQUFPLElBQUksV0FBVztBQUFBLE1BQ2xCLEdBQUcsb0JBQW9CLEtBQUssSUFBSTtBQUFBLE1BQ2hDLFFBQVE7QUFBQSxNQUNSLFVBQVUsc0JBQXNCO0FBQUEsTUFDaEMsUUFBUSxFQUFFLE1BQU0sYUFBYSxVQUFVO0FBQUEsSUFDM0MsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFFBQVEsS0FBSztBQUNULFVBQU0sbUJBQW1CLE9BQU8sUUFBUSxhQUFhLE1BQU0sTUFBTTtBQUNqRSxXQUFPLElBQUksV0FBVztBQUFBLE1BQ2xCLEdBQUcsb0JBQW9CLEtBQUssSUFBSTtBQUFBLE1BQ2hDLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFVBQVUsc0JBQXNCO0FBQUEsSUFDcEMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFFBQVE7QUFDSixXQUFPLElBQUksV0FBVztBQUFBLE1BQ2xCLFVBQVUsc0JBQXNCO0FBQUEsTUFDaEMsTUFBTTtBQUFBLE1BQ04sR0FBRyxvQkFBb0IsS0FBSyxJQUFJO0FBQUEsSUFDcEMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE1BQU0sS0FBSztBQUNQLFVBQU0saUJBQWlCLE9BQU8sUUFBUSxhQUFhLE1BQU0sTUFBTTtBQUMvRCxXQUFPLElBQUksU0FBUztBQUFBLE1BQ2hCLEdBQUcsb0JBQW9CLEtBQUssSUFBSTtBQUFBLE1BQ2hDLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNaLFVBQVUsc0JBQXNCO0FBQUEsSUFDcEMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFNBQVMsYUFBYTtBQUNsQixVQUFNLE9BQU8sS0FBSztBQUNsQixXQUFPLElBQUksS0FBSztBQUFBLE1BQ1osR0FBRyxLQUFLO0FBQUEsTUFDUjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLEtBQUssUUFBUTtBQUNULFdBQU8sWUFBWSxPQUFPLE1BQU0sTUFBTTtBQUFBLEVBQzFDO0FBQUEsRUFDQSxXQUFXO0FBQ1AsV0FBTyxZQUFZLE9BQU8sSUFBSTtBQUFBLEVBQ2xDO0FBQUEsRUFDQSxhQUFhO0FBQ1QsV0FBTyxLQUFLLFVBQVUsTUFBUyxFQUFFO0FBQUEsRUFDckM7QUFBQSxFQUNBLGFBQWE7QUFDVCxXQUFPLEtBQUssVUFBVSxJQUFJLEVBQUU7QUFBQSxFQUNoQztBQUNKO0FBQ0EsSUFBTSxZQUFZO0FBQ2xCLElBQU0sYUFBYTtBQUNuQixJQUFNLFlBQVk7QUFHbEIsSUFBTSxZQUFZO0FBQ2xCLElBQU0sY0FBYztBQUNwQixJQUFNLFdBQVc7QUFDakIsSUFBTSxnQkFBZ0I7QUFhdEIsSUFBTSxhQUFhO0FBSW5CLElBQU0sY0FBYztBQUNwQixJQUFJO0FBRUosSUFBTSxZQUFZO0FBQ2xCLElBQU0sZ0JBQWdCO0FBR3RCLElBQU0sWUFBWTtBQUNsQixJQUFNLGdCQUFnQjtBQUV0QixJQUFNLGNBQWM7QUFFcEIsSUFBTSxpQkFBaUI7QUFNdkIsSUFBTSxrQkFBa0I7QUFDeEIsSUFBTSxZQUFZLElBQUksT0FBTyxJQUFJLGVBQWUsR0FBRztBQUNuRCxTQUFTLGdCQUFnQixNQUFNO0FBQzNCLE1BQUkscUJBQXFCO0FBQ3pCLE1BQUksS0FBSyxXQUFXO0FBQ2hCLHlCQUFxQixHQUFHLGtCQUFrQixVQUFVLEtBQUssU0FBUztBQUFBLEVBQ3RFLFdBQ1MsS0FBSyxhQUFhLE1BQU07QUFDN0IseUJBQXFCLEdBQUcsa0JBQWtCO0FBQUEsRUFDOUM7QUFDQSxRQUFNLG9CQUFvQixLQUFLLFlBQVksTUFBTTtBQUNqRCxTQUFPLDhCQUE4QixrQkFBa0IsSUFBSSxpQkFBaUI7QUFDaEY7QUFDQSxTQUFTLFVBQVUsTUFBTTtBQUNyQixTQUFPLElBQUksT0FBTyxJQUFJLGdCQUFnQixJQUFJLENBQUMsR0FBRztBQUNsRDtBQUVPLFNBQVMsY0FBYyxNQUFNO0FBQ2hDLE1BQUksUUFBUSxHQUFHLGVBQWUsSUFBSSxnQkFBZ0IsSUFBSSxDQUFDO0FBQ3ZELFFBQU0sT0FBTyxDQUFDO0FBQ2QsT0FBSyxLQUFLLEtBQUssUUFBUSxPQUFPLEdBQUc7QUFDakMsTUFBSSxLQUFLO0FBQ0wsU0FBSyxLQUFLLHNCQUFzQjtBQUNwQyxVQUFRLEdBQUcsS0FBSyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUM7QUFDbEMsU0FBTyxJQUFJLE9BQU8sSUFBSSxLQUFLLEdBQUc7QUFDbEM7QUFDQSxTQUFTLFVBQVUsSUFBSSxTQUFTO0FBQzVCLE9BQUssWUFBWSxRQUFRLENBQUMsWUFBWSxVQUFVLEtBQUssRUFBRSxHQUFHO0FBQ3RELFdBQU87QUFBQSxFQUNYO0FBQ0EsT0FBSyxZQUFZLFFBQVEsQ0FBQyxZQUFZLFVBQVUsS0FBSyxFQUFFLEdBQUc7QUFDdEQsV0FBTztBQUFBLEVBQ1g7QUFDQSxTQUFPO0FBQ1g7QUFDQSxTQUFTLFdBQVcsS0FBSyxLQUFLO0FBQzFCLE1BQUksQ0FBQyxTQUFTLEtBQUssR0FBRztBQUNsQixXQUFPO0FBQ1gsTUFBSTtBQUNBLFVBQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxNQUFNLEdBQUc7QUFDOUIsUUFBSSxDQUFDO0FBQ0QsYUFBTztBQUVYLFVBQU0sU0FBUyxPQUNWLFFBQVEsTUFBTSxHQUFHLEVBQ2pCLFFBQVEsTUFBTSxHQUFHLEVBQ2pCLE9BQU8sT0FBTyxVQUFXLElBQUssT0FBTyxTQUFTLEtBQU0sR0FBSSxHQUFHO0FBQ2hFLFVBQU0sVUFBVSxLQUFLLE1BQU0sS0FBSyxNQUFNLENBQUM7QUFDdkMsUUFBSSxPQUFPLFlBQVksWUFBWSxZQUFZO0FBQzNDLGFBQU87QUFDWCxRQUFJLFNBQVMsV0FBVyxTQUFTLFFBQVE7QUFDckMsYUFBTztBQUNYLFFBQUksQ0FBQyxRQUFRO0FBQ1QsYUFBTztBQUNYLFFBQUksT0FBTyxRQUFRLFFBQVE7QUFDdkIsYUFBTztBQUNYLFdBQU87QUFBQSxFQUNYLFFBQ007QUFDRixXQUFPO0FBQUEsRUFDWDtBQUNKO0FBQ0EsU0FBUyxZQUFZLElBQUksU0FBUztBQUM5QixPQUFLLFlBQVksUUFBUSxDQUFDLFlBQVksY0FBYyxLQUFLLEVBQUUsR0FBRztBQUMxRCxXQUFPO0FBQUEsRUFDWDtBQUNBLE9BQUssWUFBWSxRQUFRLENBQUMsWUFBWSxjQUFjLEtBQUssRUFBRSxHQUFHO0FBQzFELFdBQU87QUFBQSxFQUNYO0FBQ0EsU0FBTztBQUNYO0FBQ08sSUFBTSxZQUFOLE1BQU0sbUJBQWtCLFFBQVE7QUFBQSxFQUNuQyxPQUFPLE9BQU87QUFDVixRQUFJLEtBQUssS0FBSyxRQUFRO0FBQ2xCLFlBQU0sT0FBTyxPQUFPLE1BQU0sSUFBSTtBQUFBLElBQ2xDO0FBQ0EsVUFBTSxhQUFhLEtBQUssU0FBUyxLQUFLO0FBQ3RDLFFBQUksZUFBZSxjQUFjLFFBQVE7QUFDckMsWUFBTUMsT0FBTSxLQUFLLGdCQUFnQixLQUFLO0FBQ3RDLHdCQUFrQkEsTUFBSztBQUFBLFFBQ25CLE1BQU0sYUFBYTtBQUFBLFFBQ25CLFVBQVUsY0FBYztBQUFBLFFBQ3hCLFVBQVVBLEtBQUk7QUFBQSxNQUNsQixDQUFDO0FBQ0QsYUFBTztBQUFBLElBQ1g7QUFDQSxVQUFNLFNBQVMsSUFBSSxZQUFZO0FBQy9CLFFBQUksTUFBTTtBQUNWLGVBQVcsU0FBUyxLQUFLLEtBQUssUUFBUTtBQUNsQyxVQUFJLE1BQU0sU0FBUyxPQUFPO0FBQ3RCLFlBQUksTUFBTSxLQUFLLFNBQVMsTUFBTSxPQUFPO0FBQ2pDLGdCQUFNLEtBQUssZ0JBQWdCLE9BQU8sR0FBRztBQUNyQyw0QkFBa0IsS0FBSztBQUFBLFlBQ25CLE1BQU0sYUFBYTtBQUFBLFlBQ25CLFNBQVMsTUFBTTtBQUFBLFlBQ2YsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFlBQ1gsT0FBTztBQUFBLFlBQ1AsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsT0FBTztBQUMzQixZQUFJLE1BQU0sS0FBSyxTQUFTLE1BQU0sT0FBTztBQUNqQyxnQkFBTSxLQUFLLGdCQUFnQixPQUFPLEdBQUc7QUFDckMsNEJBQWtCLEtBQUs7QUFBQSxZQUNuQixNQUFNLGFBQWE7QUFBQSxZQUNuQixTQUFTLE1BQU07QUFBQSxZQUNmLE1BQU07QUFBQSxZQUNOLFdBQVc7QUFBQSxZQUNYLE9BQU87QUFBQSxZQUNQLFNBQVMsTUFBTTtBQUFBLFVBQ25CLENBQUM7QUFDRCxpQkFBTyxNQUFNO0FBQUEsUUFDakI7QUFBQSxNQUNKLFdBQ1MsTUFBTSxTQUFTLFVBQVU7QUFDOUIsY0FBTSxTQUFTLE1BQU0sS0FBSyxTQUFTLE1BQU07QUFDekMsY0FBTSxXQUFXLE1BQU0sS0FBSyxTQUFTLE1BQU07QUFDM0MsWUFBSSxVQUFVLFVBQVU7QUFDcEIsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLGNBQUksUUFBUTtBQUNSLDhCQUFrQixLQUFLO0FBQUEsY0FDbkIsTUFBTSxhQUFhO0FBQUEsY0FDbkIsU0FBUyxNQUFNO0FBQUEsY0FDZixNQUFNO0FBQUEsY0FDTixXQUFXO0FBQUEsY0FDWCxPQUFPO0FBQUEsY0FDUCxTQUFTLE1BQU07QUFBQSxZQUNuQixDQUFDO0FBQUEsVUFDTCxXQUNTLFVBQVU7QUFDZiw4QkFBa0IsS0FBSztBQUFBLGNBQ25CLE1BQU0sYUFBYTtBQUFBLGNBQ25CLFNBQVMsTUFBTTtBQUFBLGNBQ2YsTUFBTTtBQUFBLGNBQ04sV0FBVztBQUFBLGNBQ1gsT0FBTztBQUFBLGNBQ1AsU0FBUyxNQUFNO0FBQUEsWUFDbkIsQ0FBQztBQUFBLFVBQ0w7QUFDQSxpQkFBTyxNQUFNO0FBQUEsUUFDakI7QUFBQSxNQUNKLFdBQ1MsTUFBTSxTQUFTLFNBQVM7QUFDN0IsWUFBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLElBQUksR0FBRztBQUM5QixnQkFBTSxLQUFLLGdCQUFnQixPQUFPLEdBQUc7QUFDckMsNEJBQWtCLEtBQUs7QUFBQSxZQUNuQixZQUFZO0FBQUEsWUFDWixNQUFNLGFBQWE7QUFBQSxZQUNuQixTQUFTLE1BQU07QUFBQSxVQUNuQixDQUFDO0FBQ0QsaUJBQU8sTUFBTTtBQUFBLFFBQ2pCO0FBQUEsTUFDSixXQUNTLE1BQU0sU0FBUyxTQUFTO0FBQzdCLFlBQUksQ0FBQyxZQUFZO0FBQ2IsdUJBQWEsSUFBSSxPQUFPLGFBQWEsR0FBRztBQUFBLFFBQzVDO0FBQ0EsWUFBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLElBQUksR0FBRztBQUM5QixnQkFBTSxLQUFLLGdCQUFnQixPQUFPLEdBQUc7QUFDckMsNEJBQWtCLEtBQUs7QUFBQSxZQUNuQixZQUFZO0FBQUEsWUFDWixNQUFNLGFBQWE7QUFBQSxZQUNuQixTQUFTLE1BQU07QUFBQSxVQUNuQixDQUFDO0FBQ0QsaUJBQU8sTUFBTTtBQUFBLFFBQ2pCO0FBQUEsTUFDSixXQUNTLE1BQU0sU0FBUyxRQUFRO0FBQzVCLFlBQUksQ0FBQyxVQUFVLEtBQUssTUFBTSxJQUFJLEdBQUc7QUFDN0IsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLDRCQUFrQixLQUFLO0FBQUEsWUFDbkIsWUFBWTtBQUFBLFlBQ1osTUFBTSxhQUFhO0FBQUEsWUFDbkIsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsVUFBVTtBQUM5QixZQUFJLENBQUMsWUFBWSxLQUFLLE1BQU0sSUFBSSxHQUFHO0FBQy9CLGdCQUFNLEtBQUssZ0JBQWdCLE9BQU8sR0FBRztBQUNyQyw0QkFBa0IsS0FBSztBQUFBLFlBQ25CLFlBQVk7QUFBQSxZQUNaLE1BQU0sYUFBYTtBQUFBLFlBQ25CLFNBQVMsTUFBTTtBQUFBLFVBQ25CLENBQUM7QUFDRCxpQkFBTyxNQUFNO0FBQUEsUUFDakI7QUFBQSxNQUNKLFdBQ1MsTUFBTSxTQUFTLFFBQVE7QUFDNUIsWUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNLElBQUksR0FBRztBQUM3QixnQkFBTSxLQUFLLGdCQUFnQixPQUFPLEdBQUc7QUFDckMsNEJBQWtCLEtBQUs7QUFBQSxZQUNuQixZQUFZO0FBQUEsWUFDWixNQUFNLGFBQWE7QUFBQSxZQUNuQixTQUFTLE1BQU07QUFBQSxVQUNuQixDQUFDO0FBQ0QsaUJBQU8sTUFBTTtBQUFBLFFBQ2pCO0FBQUEsTUFDSixXQUNTLE1BQU0sU0FBUyxTQUFTO0FBQzdCLFlBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxJQUFJLEdBQUc7QUFDOUIsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLDRCQUFrQixLQUFLO0FBQUEsWUFDbkIsWUFBWTtBQUFBLFlBQ1osTUFBTSxhQUFhO0FBQUEsWUFDbkIsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsUUFBUTtBQUM1QixZQUFJLENBQUMsVUFBVSxLQUFLLE1BQU0sSUFBSSxHQUFHO0FBQzdCLGdCQUFNLEtBQUssZ0JBQWdCLE9BQU8sR0FBRztBQUNyQyw0QkFBa0IsS0FBSztBQUFBLFlBQ25CLFlBQVk7QUFBQSxZQUNaLE1BQU0sYUFBYTtBQUFBLFlBQ25CLFNBQVMsTUFBTTtBQUFBLFVBQ25CLENBQUM7QUFDRCxpQkFBTyxNQUFNO0FBQUEsUUFDakI7QUFBQSxNQUNKLFdBQ1MsTUFBTSxTQUFTLE9BQU87QUFDM0IsWUFBSTtBQUNBLGNBQUksSUFBSSxNQUFNLElBQUk7QUFBQSxRQUN0QixRQUNNO0FBQ0YsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLDRCQUFrQixLQUFLO0FBQUEsWUFDbkIsWUFBWTtBQUFBLFlBQ1osTUFBTSxhQUFhO0FBQUEsWUFDbkIsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsU0FBUztBQUM3QixjQUFNLE1BQU0sWUFBWTtBQUN4QixjQUFNLGFBQWEsTUFBTSxNQUFNLEtBQUssTUFBTSxJQUFJO0FBQzlDLFlBQUksQ0FBQyxZQUFZO0FBQ2IsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLDRCQUFrQixLQUFLO0FBQUEsWUFDbkIsWUFBWTtBQUFBLFlBQ1osTUFBTSxhQUFhO0FBQUEsWUFDbkIsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsUUFBUTtBQUM1QixjQUFNLE9BQU8sTUFBTSxLQUFLLEtBQUs7QUFBQSxNQUNqQyxXQUNTLE1BQU0sU0FBUyxZQUFZO0FBQ2hDLFlBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxNQUFNLE9BQU8sTUFBTSxRQUFRLEdBQUc7QUFDbkQsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLDRCQUFrQixLQUFLO0FBQUEsWUFDbkIsTUFBTSxhQUFhO0FBQUEsWUFDbkIsWUFBWSxFQUFFLFVBQVUsTUFBTSxPQUFPLFVBQVUsTUFBTSxTQUFTO0FBQUEsWUFDOUQsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsZUFBZTtBQUNuQyxjQUFNLE9BQU8sTUFBTSxLQUFLLFlBQVk7QUFBQSxNQUN4QyxXQUNTLE1BQU0sU0FBUyxlQUFlO0FBQ25DLGNBQU0sT0FBTyxNQUFNLEtBQUssWUFBWTtBQUFBLE1BQ3hDLFdBQ1MsTUFBTSxTQUFTLGNBQWM7QUFDbEMsWUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxHQUFHO0FBQ3JDLGdCQUFNLEtBQUssZ0JBQWdCLE9BQU8sR0FBRztBQUNyQyw0QkFBa0IsS0FBSztBQUFBLFlBQ25CLE1BQU0sYUFBYTtBQUFBLFlBQ25CLFlBQVksRUFBRSxZQUFZLE1BQU0sTUFBTTtBQUFBLFlBQ3RDLFNBQVMsTUFBTTtBQUFBLFVBQ25CLENBQUM7QUFDRCxpQkFBTyxNQUFNO0FBQUEsUUFDakI7QUFBQSxNQUNKLFdBQ1MsTUFBTSxTQUFTLFlBQVk7QUFDaEMsWUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLE1BQU0sS0FBSyxHQUFHO0FBQ25DLGdCQUFNLEtBQUssZ0JBQWdCLE9BQU8sR0FBRztBQUNyQyw0QkFBa0IsS0FBSztBQUFBLFlBQ25CLE1BQU0sYUFBYTtBQUFBLFlBQ25CLFlBQVksRUFBRSxVQUFVLE1BQU0sTUFBTTtBQUFBLFlBQ3BDLFNBQVMsTUFBTTtBQUFBLFVBQ25CLENBQUM7QUFDRCxpQkFBTyxNQUFNO0FBQUEsUUFDakI7QUFBQSxNQUNKLFdBQ1MsTUFBTSxTQUFTLFlBQVk7QUFDaEMsY0FBTSxRQUFRLGNBQWMsS0FBSztBQUNqQyxZQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxHQUFHO0FBQ3pCLGdCQUFNLEtBQUssZ0JBQWdCLE9BQU8sR0FBRztBQUNyQyw0QkFBa0IsS0FBSztBQUFBLFlBQ25CLE1BQU0sYUFBYTtBQUFBLFlBQ25CLFlBQVk7QUFBQSxZQUNaLFNBQVMsTUFBTTtBQUFBLFVBQ25CLENBQUM7QUFDRCxpQkFBTyxNQUFNO0FBQUEsUUFDakI7QUFBQSxNQUNKLFdBQ1MsTUFBTSxTQUFTLFFBQVE7QUFDNUIsY0FBTSxRQUFRO0FBQ2QsWUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksR0FBRztBQUN6QixnQkFBTSxLQUFLLGdCQUFnQixPQUFPLEdBQUc7QUFDckMsNEJBQWtCLEtBQUs7QUFBQSxZQUNuQixNQUFNLGFBQWE7QUFBQSxZQUNuQixZQUFZO0FBQUEsWUFDWixTQUFTLE1BQU07QUFBQSxVQUNuQixDQUFDO0FBQ0QsaUJBQU8sTUFBTTtBQUFBLFFBQ2pCO0FBQUEsTUFDSixXQUNTLE1BQU0sU0FBUyxRQUFRO0FBQzVCLGNBQU0sUUFBUSxVQUFVLEtBQUs7QUFDN0IsWUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksR0FBRztBQUN6QixnQkFBTSxLQUFLLGdCQUFnQixPQUFPLEdBQUc7QUFDckMsNEJBQWtCLEtBQUs7QUFBQSxZQUNuQixNQUFNLGFBQWE7QUFBQSxZQUNuQixZQUFZO0FBQUEsWUFDWixTQUFTLE1BQU07QUFBQSxVQUNuQixDQUFDO0FBQ0QsaUJBQU8sTUFBTTtBQUFBLFFBQ2pCO0FBQUEsTUFDSixXQUNTLE1BQU0sU0FBUyxZQUFZO0FBQ2hDLFlBQUksQ0FBQyxjQUFjLEtBQUssTUFBTSxJQUFJLEdBQUc7QUFDakMsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLDRCQUFrQixLQUFLO0FBQUEsWUFDbkIsWUFBWTtBQUFBLFlBQ1osTUFBTSxhQUFhO0FBQUEsWUFDbkIsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsTUFBTTtBQUMxQixZQUFJLENBQUMsVUFBVSxNQUFNLE1BQU0sTUFBTSxPQUFPLEdBQUc7QUFDdkMsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLDRCQUFrQixLQUFLO0FBQUEsWUFDbkIsWUFBWTtBQUFBLFlBQ1osTUFBTSxhQUFhO0FBQUEsWUFDbkIsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsT0FBTztBQUMzQixZQUFJLENBQUMsV0FBVyxNQUFNLE1BQU0sTUFBTSxHQUFHLEdBQUc7QUFDcEMsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLDRCQUFrQixLQUFLO0FBQUEsWUFDbkIsWUFBWTtBQUFBLFlBQ1osTUFBTSxhQUFhO0FBQUEsWUFDbkIsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsUUFBUTtBQUM1QixZQUFJLENBQUMsWUFBWSxNQUFNLE1BQU0sTUFBTSxPQUFPLEdBQUc7QUFDekMsZ0JBQU0sS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ3JDLDRCQUFrQixLQUFLO0FBQUEsWUFDbkIsWUFBWTtBQUFBLFlBQ1osTUFBTSxhQUFhO0FBQUEsWUFDbkIsU0FBUyxNQUFNO0FBQUEsVUFDbkIsQ0FBQztBQUNELGlCQUFPLE1BQU07QUFBQSxRQUNqQjtBQUFBLE1BQ0osV0FDUyxNQUFNLFNBQVMsVUFBVTtBQUM5QixZQUFJLENBQUMsWUFBWSxLQUFLLE1BQU0sSUFBSSxHQUFHO0FBQy9CLGdCQUFNLEtBQUssZ0JBQWdCLE9BQU8sR0FBRztBQUNyQyw0QkFBa0IsS0FBSztBQUFBLFlBQ25CLFlBQVk7QUFBQSxZQUNaLE1BQU0sYUFBYTtBQUFBLFlBQ25CLFNBQVMsTUFBTTtBQUFBLFVBQ25CLENBQUM7QUFDRCxpQkFBTyxNQUFNO0FBQUEsUUFDakI7QUFBQSxNQUNKLFdBQ1MsTUFBTSxTQUFTLGFBQWE7QUFDakMsWUFBSSxDQUFDLGVBQWUsS0FBSyxNQUFNLElBQUksR0FBRztBQUNsQyxnQkFBTSxLQUFLLGdCQUFnQixPQUFPLEdBQUc7QUFDckMsNEJBQWtCLEtBQUs7QUFBQSxZQUNuQixZQUFZO0FBQUEsWUFDWixNQUFNLGFBQWE7QUFBQSxZQUNuQixTQUFTLE1BQU07QUFBQSxVQUNuQixDQUFDO0FBQ0QsaUJBQU8sTUFBTTtBQUFBLFFBQ2pCO0FBQUEsTUFDSixPQUNLO0FBQ0QsYUFBSyxZQUFZLEtBQUs7QUFBQSxNQUMxQjtBQUFBLElBQ0o7QUFDQSxXQUFPLEVBQUUsUUFBUSxPQUFPLE9BQU8sT0FBTyxNQUFNLEtBQUs7QUFBQSxFQUNyRDtBQUFBLEVBQ0EsT0FBTyxPQUFPLFlBQVksU0FBUztBQUMvQixXQUFPLEtBQUssV0FBVyxDQUFDLFNBQVMsTUFBTSxLQUFLLElBQUksR0FBRztBQUFBLE1BQy9DO0FBQUEsTUFDQSxNQUFNLGFBQWE7QUFBQSxNQUNuQixHQUFHLFVBQVUsU0FBUyxPQUFPO0FBQUEsSUFDakMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFVBQVUsT0FBTztBQUNiLFdBQU8sSUFBSSxXQUFVO0FBQUEsTUFDakIsR0FBRyxLQUFLO0FBQUEsTUFDUixRQUFRLENBQUMsR0FBRyxLQUFLLEtBQUssUUFBUSxLQUFLO0FBQUEsSUFDdkMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE1BQU0sU0FBUztBQUNYLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxTQUFTLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDM0U7QUFBQSxFQUNBLElBQUksU0FBUztBQUNULFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxPQUFPLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDekU7QUFBQSxFQUNBLE1BQU0sU0FBUztBQUNYLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxTQUFTLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDM0U7QUFBQSxFQUNBLEtBQUssU0FBUztBQUNWLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxRQUFRLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDMUU7QUFBQSxFQUNBLE9BQU8sU0FBUztBQUNaLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxVQUFVLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDNUU7QUFBQSxFQUNBLEtBQUssU0FBUztBQUNWLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxRQUFRLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDMUU7QUFBQSxFQUNBLE1BQU0sU0FBUztBQUNYLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxTQUFTLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDM0U7QUFBQSxFQUNBLEtBQUssU0FBUztBQUNWLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxRQUFRLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDMUU7QUFBQSxFQUNBLE9BQU8sU0FBUztBQUNaLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxVQUFVLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDNUU7QUFBQSxFQUNBLFVBQVUsU0FBUztBQUVmLFdBQU8sS0FBSyxVQUFVO0FBQUEsTUFDbEIsTUFBTTtBQUFBLE1BQ04sR0FBRyxVQUFVLFNBQVMsT0FBTztBQUFBLElBQ2pDLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxJQUFJLFNBQVM7QUFDVCxXQUFPLEtBQUssVUFBVSxFQUFFLE1BQU0sT0FBTyxHQUFHLFVBQVUsU0FBUyxPQUFPLEVBQUUsQ0FBQztBQUFBLEVBQ3pFO0FBQUEsRUFDQSxHQUFHLFNBQVM7QUFDUixXQUFPLEtBQUssVUFBVSxFQUFFLE1BQU0sTUFBTSxHQUFHLFVBQVUsU0FBUyxPQUFPLEVBQUUsQ0FBQztBQUFBLEVBQ3hFO0FBQUEsRUFDQSxLQUFLLFNBQVM7QUFDVixXQUFPLEtBQUssVUFBVSxFQUFFLE1BQU0sUUFBUSxHQUFHLFVBQVUsU0FBUyxPQUFPLEVBQUUsQ0FBQztBQUFBLEVBQzFFO0FBQUEsRUFDQSxTQUFTLFNBQVM7QUFDZCxRQUFJLE9BQU8sWUFBWSxVQUFVO0FBQzdCLGFBQU8sS0FBSyxVQUFVO0FBQUEsUUFDbEIsTUFBTTtBQUFBLFFBQ04sV0FBVztBQUFBLFFBQ1gsUUFBUTtBQUFBLFFBQ1IsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLE1BQ2IsQ0FBQztBQUFBLElBQ0w7QUFDQSxXQUFPLEtBQUssVUFBVTtBQUFBLE1BQ2xCLE1BQU07QUFBQSxNQUNOLFdBQVcsT0FBTyxTQUFTLGNBQWMsY0FBYyxPQUFPLFNBQVM7QUFBQSxNQUN2RSxRQUFRLFNBQVMsVUFBVTtBQUFBLE1BQzNCLE9BQU8sU0FBUyxTQUFTO0FBQUEsTUFDekIsR0FBRyxVQUFVLFNBQVMsU0FBUyxPQUFPO0FBQUEsSUFDMUMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLEtBQUssU0FBUztBQUNWLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxRQUFRLFFBQVEsQ0FBQztBQUFBLEVBQ25EO0FBQUEsRUFDQSxLQUFLLFNBQVM7QUFDVixRQUFJLE9BQU8sWUFBWSxVQUFVO0FBQzdCLGFBQU8sS0FBSyxVQUFVO0FBQUEsUUFDbEIsTUFBTTtBQUFBLFFBQ04sV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLE1BQ2IsQ0FBQztBQUFBLElBQ0w7QUFDQSxXQUFPLEtBQUssVUFBVTtBQUFBLE1BQ2xCLE1BQU07QUFBQSxNQUNOLFdBQVcsT0FBTyxTQUFTLGNBQWMsY0FBYyxPQUFPLFNBQVM7QUFBQSxNQUN2RSxHQUFHLFVBQVUsU0FBUyxTQUFTLE9BQU87QUFBQSxJQUMxQyxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUyxTQUFTO0FBQ2QsV0FBTyxLQUFLLFVBQVUsRUFBRSxNQUFNLFlBQVksR0FBRyxVQUFVLFNBQVMsT0FBTyxFQUFFLENBQUM7QUFBQSxFQUM5RTtBQUFBLEVBQ0EsTUFBTSxPQUFPLFNBQVM7QUFDbEIsV0FBTyxLQUFLLFVBQVU7QUFBQSxNQUNsQixNQUFNO0FBQUEsTUFDTjtBQUFBLE1BQ0EsR0FBRyxVQUFVLFNBQVMsT0FBTztBQUFBLElBQ2pDLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTLE9BQU8sU0FBUztBQUNyQixXQUFPLEtBQUssVUFBVTtBQUFBLE1BQ2xCLE1BQU07QUFBQSxNQUNOO0FBQUEsTUFDQSxVQUFVLFNBQVM7QUFBQSxNQUNuQixHQUFHLFVBQVUsU0FBUyxTQUFTLE9BQU87QUFBQSxJQUMxQyxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsV0FBVyxPQUFPLFNBQVM7QUFDdkIsV0FBTyxLQUFLLFVBQVU7QUFBQSxNQUNsQixNQUFNO0FBQUEsTUFDTjtBQUFBLE1BQ0EsR0FBRyxVQUFVLFNBQVMsT0FBTztBQUFBLElBQ2pDLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTLE9BQU8sU0FBUztBQUNyQixXQUFPLEtBQUssVUFBVTtBQUFBLE1BQ2xCLE1BQU07QUFBQSxNQUNOO0FBQUEsTUFDQSxHQUFHLFVBQVUsU0FBUyxPQUFPO0FBQUEsSUFDakMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLElBQUksV0FBVyxTQUFTO0FBQ3BCLFdBQU8sS0FBSyxVQUFVO0FBQUEsTUFDbEIsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsR0FBRyxVQUFVLFNBQVMsT0FBTztBQUFBLElBQ2pDLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxJQUFJLFdBQVcsU0FBUztBQUNwQixXQUFPLEtBQUssVUFBVTtBQUFBLE1BQ2xCLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLEdBQUcsVUFBVSxTQUFTLE9BQU87QUFBQSxJQUNqQyxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsT0FBTyxLQUFLLFNBQVM7QUFDakIsV0FBTyxLQUFLLFVBQVU7QUFBQSxNQUNsQixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxHQUFHLFVBQVUsU0FBUyxPQUFPO0FBQUEsSUFDakMsQ0FBQztBQUFBLEVBQ0w7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlBLFNBQVMsU0FBUztBQUNkLFdBQU8sS0FBSyxJQUFJLEdBQUcsVUFBVSxTQUFTLE9BQU8sQ0FBQztBQUFBLEVBQ2xEO0FBQUEsRUFDQSxPQUFPO0FBQ0gsV0FBTyxJQUFJLFdBQVU7QUFBQSxNQUNqQixHQUFHLEtBQUs7QUFBQSxNQUNSLFFBQVEsQ0FBQyxHQUFHLEtBQUssS0FBSyxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFBQSxJQUNsRCxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsY0FBYztBQUNWLFdBQU8sSUFBSSxXQUFVO0FBQUEsTUFDakIsR0FBRyxLQUFLO0FBQUEsTUFDUixRQUFRLENBQUMsR0FBRyxLQUFLLEtBQUssUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQUEsSUFDekQsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLGNBQWM7QUFDVixXQUFPLElBQUksV0FBVTtBQUFBLE1BQ2pCLEdBQUcsS0FBSztBQUFBLE1BQ1IsUUFBUSxDQUFDLEdBQUcsS0FBSyxLQUFLLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUFBLElBQ3pELENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxJQUFJLGFBQWE7QUFDYixXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVTtBQUFBLEVBQ2pFO0FBQUEsRUFDQSxJQUFJLFNBQVM7QUFDVCxXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFBLEVBQzdEO0FBQUEsRUFDQSxJQUFJLFNBQVM7QUFDVCxXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFBLEVBQzdEO0FBQUEsRUFDQSxJQUFJLGFBQWE7QUFDYixXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVTtBQUFBLEVBQ2pFO0FBQUEsRUFDQSxJQUFJLFVBQVU7QUFDVixXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTztBQUFBLEVBQzlEO0FBQUEsRUFDQSxJQUFJLFFBQVE7QUFDUixXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSztBQUFBLEVBQzVEO0FBQUEsRUFDQSxJQUFJLFVBQVU7QUFDVixXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTztBQUFBLEVBQzlEO0FBQUEsRUFDQSxJQUFJLFNBQVM7QUFDVCxXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFBLEVBQzdEO0FBQUEsRUFDQSxJQUFJLFdBQVc7QUFDWCxXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUTtBQUFBLEVBQy9EO0FBQUEsRUFDQSxJQUFJLFNBQVM7QUFDVCxXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFBLEVBQzdEO0FBQUEsRUFDQSxJQUFJLFVBQVU7QUFDVixXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTztBQUFBLEVBQzlEO0FBQUEsRUFDQSxJQUFJLFNBQVM7QUFDVCxXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFBLEVBQzdEO0FBQUEsRUFDQSxJQUFJLE9BQU87QUFDUCxXQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsSUFBSTtB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QUcsb0JBQW9CLEVBQUUsUUFBUSxPQUFPLENBQUM7QUFDakYsYUFBTyxNQUFNLFNBQVMsUUFBUSxHQUFHO0FBQ2pDLGFBQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUFBLElBQ2pDLENBQUM7QUFBQSxFQUNILFVBQUU7QUFDQSxlQUFXLFFBQVE7QUFDbkIsUUFBSSx3QkFBd0IsT0FBVyxRQUFPLFFBQVEsSUFBSSwwQkFBMEI7QUFBQSxRQUMvRSxTQUFRLElBQUksMEJBQTBCLElBQUk7QUFDL0MsUUFBSSx1QkFBdUIsT0FBVyxRQUFPLFFBQVEsSUFBSSx5QkFBeUI7QUFBQSxRQUM3RSxTQUFRLElBQUkseUJBQXlCLElBQUk7QUFBQSxFQUNoRDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbImV4cHJlc3MiLCAidXRpbCIsICJvYmplY3RVdGlsIiwgImVycm9yVXRpbCIsICJlcnJvck1hcCIsICJjdHgiLCAicmVzdWx0IiwgImlzc3VlcyIsICJlbGVtZW50cyIsICJwcm9jZXNzZWQiLCAicmVzdWx0IiwgInIiLCAiWm9kRmlyc3RQYXJ0eVR5cGVLaW5kIiwgImV4cHJlc3MiLCAicmVzdWx0Il0KfQo=
