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
import { randomUUID } from "node:crypto";
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
var getTrackerResponseMatchesItemReportOneObservationsMin = 3;
var getTrackerResponseMatchesItemReportOneObservationsMax = 3;
var getTrackerResponseMatchesItemReportOneAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var getTrackerResponseRefreshHealthConsecutiveFailuresMin = 0;
var getTrackerResponseRefreshHealthPendingRecoveryNoticesMin = 0;
var getTrackerResponseBrandingNameMax = 80;
var getTrackerResponseBrandingLogoPathMax = 100;
var getTrackerResponseBrandingLogoPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var GetTrackerResponse = objectType({
  "players": arrayType(objectType({
    "id": stringType(),
    "name": stringType()
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
var GetPlayerTrackerParams = objectType({
  "playerId": coerce.string()
});
var getPlayerTrackerResponseMatchesItemReportOneObservationsMin = 3;
var getPlayerTrackerResponseMatchesItemReportOneObservationsMax = 3;
var getPlayerTrackerResponseMatchesItemReportOneAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var getPlayerTrackerResponseBrandingNameMax = 80;
var getPlayerTrackerResponseBrandingLogoPathMax = 100;
var getPlayerTrackerResponseBrandingLogoPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
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
var saveTrackerSettingsBodyBrandingLogoPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
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
var saveTrackerSettingsResponseMatchesItemReportOneObservationsMin = 3;
var saveTrackerSettingsResponseMatchesItemReportOneObservationsMax = 3;
var saveTrackerSettingsResponseMatchesItemReportOneAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var saveTrackerSettingsResponseRefreshHealthConsecutiveFailuresMin = 0;
var saveTrackerSettingsResponseRefreshHealthPendingRecoveryNoticesMin = 0;
var saveTrackerSettingsResponseBrandingNameMax = 80;
var saveTrackerSettingsResponseBrandingLogoPathMax = 100;
var saveTrackerSettingsResponseBrandingLogoPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var SaveTrackerSettingsResponse = objectType({
  "players": arrayType(objectType({
    "id": stringType(),
    "name": stringType()
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
var uploadTrackerLogoResponseObjectPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var UploadTrackerLogoResponse = objectType({
  "objectPath": stringType().regex(uploadTrackerLogoResponseObjectPathRegExp)
});
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
var refreshTrackerResponseMatchesItemReportOneObservationsMin = 3;
var refreshTrackerResponseMatchesItemReportOneObservationsMax = 3;
var refreshTrackerResponseMatchesItemReportOneAudioPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var refreshTrackerResponseRefreshHealthConsecutiveFailuresMin = 0;
var refreshTrackerResponseRefreshHealthPendingRecoveryNoticesMin = 0;
var refreshTrackerResponseBrandingNameMax = 80;
var refreshTrackerResponseBrandingLogoPathMax = 100;
var refreshTrackerResponseBrandingLogoPathRegExp = new RegExp("^/objects/uploads/[0-9a-f-]+$");
var RefreshTrackerResponse = objectType({
  "players": arrayType(objectType({
    "id": stringType(),
    "name": stringType()
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
  name: external_exports.string().min(1)
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
  for (const recovery2 of state.refreshHealth.pendingRecoveries) {
    Object.freeze(recovery2);
  }
  Object.freeze(state.refreshHealth.pendingRecoveries);
  Object.freeze(state.refreshHealth);
  return Object.freeze(state);
}
function cloneRefreshRecoveries(recoveries) {
  return recoveries.map((recovery2) => ({ ...recovery2 }));
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
  const recovery2 = getRefreshRecovery(state, recoveredAt);
  if (recovery2) pendingRecoveries.push(recovery2);
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
      recoveryClaim: null
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
    const startsAt = readRequiredString(match.startsAt, "startsAt", index);
    const endsAt = readRequiredString(match.endsAt, "endsAt", index);
    if (Number.isNaN(Date.parse(startsAt)) || Number.isNaN(Date.parse(endsAt))) {
      throw new Error(`Match ${index + 1} has an invalid start or end time`);
    }
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
function mergeClubLockerFeed(state, feed) {
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
    return incoming ? {
      ...cloneTrackerMatch(match),
      playerId: incoming.playerId,
      opponent: incoming.opponent,
      startsAt: incoming.startsAt,
      endsAt: incoming.endsAt,
      venue: incoming.venue,
      court: incoming.court
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
    playersById.set(player.id, { ...player });
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
    if (!/^\/objects\/uploads\/[0-9a-f-]+$/.test(objectPath)) throw new ObjectNotFoundError();
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const file = client.bucket(bucket).file(`${privateObject}/${objectPath.slice("/objects/".length)}`);
    const [exists] = await file.exists();
    if (!exists) throw new ObjectNotFoundError();
    return file;
  }
  async saveObject(objectPath, bytes, contentType) {
    if (!/^\/objects\/uploads\/[0-9a-f-]+$/.test(objectPath)) throw new Error("Invalid object path");
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const file = client.bucket(bucket).file(`${privateObject}/${objectPath.slice("/objects/".length)}`);
    await file.save(bytes, { contentType, resumable: false });
  }
  async deleteObject(objectPath) {
    if (!/^\/objects\/uploads\/[0-9a-f-]+$/.test(objectPath)) throw new Error("Invalid object path");
    const { bucket, object: privateObject } = parseStoragePath(this.getPrivateDir());
    const file = client.bucket(bucket).file(`${privateObject}/${objectPath.slice("/objects/".length)}`);
    await file.delete({ ignoreNotFound: true });
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
    next();
  };
}
var requireStaff = createRequireStaff();

// src/routes/tracker.ts
var INITIAL_STATE = {
  players: [{ id: "cameron-stait", name: "Cameron Stait" }],
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
    players: state.players.map((player) => ({ ...player })),
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
      pendingRecoveries: storedRefreshHealth?.pendingRecoveries?.map((recovery2) => ({
        ...recovery2
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
  if (row) return normalizeState(parsePersistedTrackerState(row.data));
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
  const url = process.env["CLUB_LOCKER_SCHEDULE_URL"];
  if (!url) {
    throw new Error("Club Locker feed is not configured");
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
async function alertStaffOfRecovery(recovery2) {
  const url = process.env["STAFF_ALERT_WEBHOOK_URL"];
  if (!url) throw new Error("STAFF_ALERT_WEBHOOK_URL is not configured");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1e4);
  try {
    const outageDuration = formatDuration(recovery2.outageDurationMs);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `StaitSquash recovery: Club Locker schedule refresh is working again after ${outageDuration} and ${recovery2.failedAttempts} failed attempt${recovery2.failedAttempts === 1 ? "" : "s"}. The schedule is current.`,
        event: "club-locker-refresh-recovered",
        failedAttempts: recovery2.failedAttempts,
        outageDurationMs: recovery2.outageDurationMs,
        outageStartedAt: recovery2.outageStartedAt,
        recoveredAt: recovery2.recoveredAt
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
function trackerResponse(state) {
  return {
    ...state,
    branding: state.branding ?? { name: "StaitSquash", logoPath: null },
    refreshHealth: {
      ...state.refreshHealth,
      pendingRecoveryNotices: state.refreshHealth.pendingRecoveries.length
    }
  };
}
function trackerHealthResponse(state) {
  return {
    ...state.refreshHealth,
    pendingRecoveryNotices: state.refreshHealth.pendingRecoveries.length
  };
}
function createTrackerRouter(dependencies = {
  getState,
  saveState,
  mutateState: mutateStateInTransaction
}) {
  const router = Router();
  const objectStorage = dependencies.objectStorage ?? new ObjectStorageService();
  const authorizeStaff = dependencies.authorizeStaff ?? requireStaff;
  const { getState: loadState, saveState: persistState } = dependencies;
  let mutationQueue = Promise.resolve();
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
  router.get("/tracker", authorizeStaff, async (_req, res) => {
    res.json(GetTrackerResponse.parse(trackerResponse(await loadState())));
  });
  router.get("/tracker/health", authorizeStaff, async (_req, res) => {
    res.json(GetTrackerHealthResponse.parse(trackerHealthResponse(await loadState())));
  });
  router.get("/players/:playerId/tracker", async (req, res) => {
    const params = GetPlayerTrackerParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    const state = await loadState();
    const player = state.players.find((item) => item.id === params.data.playerId);
    if (!player) {
      res.status(404).json({ error: "Player not found" });
      return;
    }
    const matches = state.matches.filter((match) => match.playerId === player.id);
    const coachIds = new Set(matches.map((match) => match.coachId));
    res.json(GetPlayerTrackerResponse.parse({
      player,
      matches,
      coaches: state.coaches.filter((coach) => coachIds.has(coach.id)),
      branding: state.branding,
      lastUpdatedAt: state.lastUpdatedAt
    }));
  });
  router.put("/tracker/settings", authorizeStaff, async (req, res) => {
    const body = SaveTrackerSettingsBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }
    await coordinateMutation(async (loadLockedState, saveLockedState) => {
      const state = cloneTrackerState(await loadLockedState());
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
    });
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
        const objectPath = `/objects/uploads/${randomUUID()}`;
        await objectStorage.saveObject(objectPath, req.body, req.get("content-type"));
        res.json(UploadTrackerLogoResponse.parse({ objectPath }));
      } catch (error) {
        req.log.error({ err: error }, "Could not store tracker logo");
        res.status(500).json({ error: "Could not store tracker logo" });
      }
    }
  );
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
      } catch (error) {
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
          const recovery2 = current.refreshHealth.pendingRecoveries[0];
          if (!recovery2 || current.refreshHealth.consecutiveFailures > 0 || isActiveNotificationClaim(
            current.refreshHealth.recoveryClaim?.claimedAt
          )) {
            return null;
          }
          const next = cloneTrackerState(current);
          const claimedAt = (/* @__PURE__ */ new Date()).toISOString();
          next.refreshHealth.recoveryClaim = {
            outageStartedAt: recovery2.outageStartedAt,
            recoveredAt: recovery2.recoveredAt,
            claimedAt
          };
          await saveLockedState(next);
          return { recovery: { ...recovery2 }, claimedAt };
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
            failedAttempts: recovery.failedAttempts,
            outageDurationMs: recovery.outageDurationMs
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
  players: [{ id: "player-1", name: "Player One" }],
  coaches: [{ id: "coach-1", name: "Coach One" }],
  matches: [],
  lastUpdatedAt: "2026-09-16T12:00:00.000Z",
  source: "club-locker",
  refreshHealth: {
    consecutiveFailures: 0,
    alertThreshold: 1,
    firstFailureAt: null,
    lastFailureAt: null,
    alertSentAt: null,
    pendingRecoveries: []
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
      const recovery2 = await originalFetch(`${url}/tracker/refresh`, { method: "POST" });
      assert.equal(recovery2.status, 200);
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
test("refresh route succeeds while a recovery webhook is retried until delivered", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnvironment = {
    scheduleUrl: process.env["CLUB_LOCKER_SCHEDULE_URL"],
    webhookUrl: process.env["STAFF_ALERT_WEBHOOK_URL"]
  };
  const recovery2 = {
    failedAttempts: 2,
    outageStartedAt: "2026-09-16T11:50:00.000Z",
    recoveredAt: "2026-09-16T12:00:00.000Z",
    outageDurationMs: 10 * 6e4
  };
  const state = healthyState();
  state.refreshHealth.pendingRecoveries = [recovery2];
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
      assert.equal(webhookPayloads[0]?.failedAttempts, recovery2.failedAttempts);
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
      const recovery2 = await originalFetch(`${url}/tracker/refresh`, {
        method: "POST"
      });
      assert.equal(recovery2.status, 200);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3JvdXRlcy90cmFja2VyLnRlc3QudHMiLCAiLi4vLi4vc3JjL3JvdXRlcy90cmFja2VyLnRzIiwgIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS96b2RAMy4yNS43Ni9ub2RlX21vZHVsZXMvem9kL3YzL2V4dGVybmFsLmpzIiwgIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS96b2RAMy4yNS43Ni9ub2RlX21vZHVsZXMvem9kL3YzL2hlbHBlcnMvdXRpbC5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My9ab2RFcnJvci5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My9sb2NhbGVzL2VuLmpzIiwgIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS96b2RAMy4yNS43Ni9ub2RlX21vZHVsZXMvem9kL3YzL2Vycm9ycy5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My9oZWxwZXJzL3BhcnNlVXRpbC5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My9oZWxwZXJzL2Vycm9yVXRpbC5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vem9kQDMuMjUuNzYvbm9kZV9tb2R1bGVzL3pvZC92My90eXBlcy5qcyIsICIuLi8uLi8uLi8uLi9saWIvYXBpLXpvZC9zcmMvZ2VuZXJhdGVkL2FwaS50cyIsICIuLi8uLi8uLi8uLi9saWIvYXBpLXpvZC9zcmMvcGVyc2lzdGVkLXRyYWNrZXItc3RhdGUudHMiLCAiLi4vLi4vc3JjL2xpYi9jbHViLWxvY2tlci50cyIsICIuLi8uLi9zcmMvbGliL29iamVjdC1zdG9yYWdlLnRzIiwgIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9yZXF1aXJlU3RhZmYudHMiLCAiLi4vLi4vc3JjL21pZGRsZXdhcmVzL2NsZXJrUHJveHlNaWRkbGV3YXJlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJub2RlOmFzc2VydC9zdHJpY3RcIjtcbmltcG9ydCB0ZXN0IGZyb20gXCJub2RlOnRlc3RcIjtcbmltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQge1xuICBjcmVhdGVUcmFja2VyUm91dGVyLFxuICBpc0xvZ29JbWFnZSxcbiAgcGFyc2VQZXJzaXN0ZWRUcmFja2VyU3RhdGUsXG59IGZyb20gXCIuL3RyYWNrZXIudHNcIjtcbmltcG9ydCB0eXBlIHsgVHJhY2tlclN0YXRlIH0gZnJvbSBcIi4uL2xpYi9jbHViLWxvY2tlci50c1wiO1xuaW1wb3J0IHsgY3JlYXRlUmVxdWlyZVN0YWZmIH0gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVTdGFmZi50c1wiO1xuaW1wb3J0IHsgZ2V0Q2xlcmtQcm94eUhvc3QgfSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvY2xlcmtQcm94eU1pZGRsZXdhcmUudHNcIjtcblxuY29uc3QgaGVhbHRoeVN0YXRlID0gKCk6IFRyYWNrZXJTdGF0ZSA9PiAoe1xuICBwbGF5ZXJzOiBbeyBpZDogXCJwbGF5ZXItMVwiLCBuYW1lOiBcIlBsYXllciBPbmVcIiB9XSxcbiAgY29hY2hlczogW3sgaWQ6IFwiY29hY2gtMVwiLCBuYW1lOiBcIkNvYWNoIE9uZVwiIH1dLFxuICBtYXRjaGVzOiBbXSxcbiAgbGFzdFVwZGF0ZWRBdDogXCIyMDI2LTA5LTE2VDEyOjAwOjAwLjAwMFpcIixcbiAgc291cmNlOiBcImNsdWItbG9ja2VyXCIsXG4gIHJlZnJlc2hIZWFsdGg6IHtcbiAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiAwLFxuICAgIGFsZXJ0VGhyZXNob2xkOiAxLFxuICAgIGZpcnN0RmFpbHVyZUF0OiBudWxsLFxuICAgIGxhc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgYWxlcnRTZW50QXQ6IG51bGwsXG4gICAgcGVuZGluZ1JlY292ZXJpZXM6IFtdLFxuICB9LFxufSk7XG5cbnRlc3QoXCJsb2dvIHZhbGlkYXRpb24gY2hlY2tzIGFjdHVhbCBieXRlcyByYXRoZXIgdGhhbiBjbGFpbWVkIE1JTUUgdHlwZVwiLCAoKSA9PiB7XG4gIGFzc2VydC5lcXVhbChpc0xvZ29JbWFnZShCdWZmZXIuZnJvbShcIm5vdCBhbiBpbWFnZVwiKSwgXCJpbWFnZS9wbmdcIiksIGZhbHNlKTtcbiAgYXNzZXJ0LmVxdWFsKFxuICAgIGlzTG9nb0ltYWdlKEJ1ZmZlci5mcm9tKFsweDg5LCAweDUwLCAweDRlLCAweDQ3LCAweDBkLCAweDBhLCAweDFhLCAweDBhXSksIFwiaW1hZ2UvcG5nXCIpLFxuICAgIHRydWUsXG4gICk7XG4gIGFzc2VydC5lcXVhbChpc0xvZ29JbWFnZShCdWZmZXIuYWxsb2MoNSAqIDEwMjQgKiAxMDI0ICsgMSksIFwiaW1hZ2UvcG5nXCIpLCBmYWxzZSk7XG59KTtcblxudGVzdChcInN0YWZmIHJvdXRlcyBkaXN0aW5ndWlzaCBhbm9ueW1vdXMsIHVuYXBwcm92ZWQsIGFuZCBhcHByb3ZlZCBhY2NvdW50c1wiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGNhc2VzOiBBcnJheTxbc3RyaW5nIHwgbnVsbCwgYm9vbGVhbiwgbnVtYmVyXT4gPSBbXG4gICAgW251bGwsIGZhbHNlLCA0MDFdLFxuICAgIFtcInVzZXJfdW5hcHByb3ZlZFwiLCBmYWxzZSwgNDAzXSxcbiAgICBbXCJ1c2VyX3N0YWZmXCIsIHRydWUsIDIwMF0sXG4gIF07XG5cbiAgZm9yIChjb25zdCBbdXNlcklkLCBhcHByb3ZlZCwgZXhwZWN0ZWRTdGF0dXNdIG9mIGNhc2VzKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gICAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gICAgYXBwLnVzZShjcmVhdGVUcmFja2VyUm91dGVyKHtcbiAgICAgIGdldFN0YXRlOiBhc3luYyAoKSA9PiBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpLFxuICAgICAgc2F2ZVN0YXRlOiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgICBhdXRob3JpemVTdGFmZjogY3JlYXRlUmVxdWlyZVN0YWZmKHtcbiAgICAgICAgZ2V0VXNlcklkOiAoKSA9PiB1c2VySWQsXG4gICAgICAgIGlzQXBwcm92ZWRTdGFmZjogYXN5bmMgKGNhbmRpZGF0ZSkgPT4gY2FuZGlkYXRlID09PSBcInVzZXJfc3RhZmZcIiAmJiBhcHByb3ZlZCxcbiAgICAgIH0pLFxuICAgIH0pKTtcbiAgICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDAsIFwiMTI3LjAuMC4xXCIpO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNlcnZlci5vbmNlKFwibGlzdGVuaW5nXCIsIHJlc29sdmUpO1xuICAgICAgc2VydmVyLm9uY2UoXCJlcnJvclwiLCByZWplY3QpO1xuICAgIH0pO1xuICAgIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICAgIGFzc2VydChhZGRyZXNzICYmIHR5cGVvZiBhZGRyZXNzICE9PSBcInN0cmluZ1wiKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH0vdHJhY2tlcmApO1xuICAgICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLnN0YXR1cywgZXhwZWN0ZWRTdGF0dXMpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn0pO1xuXG50ZXN0KFwiQ2xlcmsgcHJveHkgaWdub3JlcyBzcG9vZmVkIGZvcndhcmRlZCBob3N0c1wiLCAoKSA9PiB7XG4gIGNvbnN0IHByZXZpb3VzRG9tYWlucyA9IHByb2Nlc3MuZW52LlJFUExJVF9ET01BSU5TO1xuICBjb25zdCBwcmV2aW91c05vZGVFbnZpcm9ubWVudCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WO1xuICBwcm9jZXNzLmVudi5SRVBMSVRfRE9NQUlOUyA9IFwidHJhY2tlci5leGFtcGxlLmNvbVwiO1xuICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiO1xuICB0cnkge1xuICAgIGFzc2VydC5lcXVhbChcbiAgICAgIGdldENsZXJrUHJveHlIb3N0KHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIGhvc3Q6IFwidHJhY2tlci5leGFtcGxlLmNvbVwiLFxuICAgICAgICAgIFwieC1mb3J3YXJkZWQtaG9zdFwiOiBcImF0dGFja2VyLmV4YW1wbGVcIixcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgXCJ0cmFja2VyLmV4YW1wbGUuY29tXCIsXG4gICAgKTtcbiAgICBhc3NlcnQuZXF1YWwoXG4gICAgICBnZXRDbGVya1Byb3h5SG9zdCh7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBob3N0OiBcImF0dGFja2VyLmV4YW1wbGVcIixcbiAgICAgICAgICBcIngtZm9yd2FyZGVkLWhvc3RcIjogXCJhdHRhY2tlci5leGFtcGxlXCIsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICApO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChwcmV2aW91c0RvbWFpbnMgPT09IHVuZGVmaW5lZCkgZGVsZXRlIHByb2Nlc3MuZW52LlJFUExJVF9ET01BSU5TO1xuICAgIGVsc2UgcHJvY2Vzcy5lbnYuUkVQTElUX0RPTUFJTlMgPSBwcmV2aW91c0RvbWFpbnM7XG4gICAgaWYgKHByZXZpb3VzTm9kZUVudmlyb25tZW50ID09PSB1bmRlZmluZWQpIGRlbGV0ZSBwcm9jZXNzLmVudi5OT0RFX0VOVjtcbiAgICBlbHNlIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gcHJldmlvdXNOb2RlRW52aXJvbm1lbnQ7XG4gIH1cbn0pO1xuXG50ZXN0KFwicGVyc2lzdGVkIHRyYWNrZXIgdmFsaWRhdGlvbiBpZGVudGlmaWVzIG1hbGZvcm1lZCBuZXN0ZWQgcmVjb3Jkc1wiLCAoKSA9PiB7XG4gIGNvbnN0IHZhbGlkU3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgdmFsaWRTdGF0ZS5icmFuZGluZyA9IHsgbmFtZTogXCJTdGFpdFNxdWFzaFwiLCBsb2dvUGF0aDogbnVsbCB9O1xuICB2YWxpZFN0YXRlLm1hdGNoZXMgPSBbe1xuICAgIGlkOiBcIm1hdGNoLTFcIixcbiAgICBleHRlcm5hbElkOiBudWxsLFxuICAgIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gICAgb3Bwb25lbnQ6IFwiT3Bwb25lbnRcIixcbiAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEwOjAwOjAwLjAwMFpcIixcbiAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMDo0NTowMC4wMDBaXCIsXG4gICAgdmVudWU6IFwiVmVudWVcIixcbiAgICBjb3VydDogXCJDb3VydCAxXCIsXG4gICAgY29hY2hJZDogXCJjb2FjaC0xXCIsXG4gICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcIm1hdGNoLTFcIixcbiAgICAgIG9ic2VydmF0aW9uczogW1wiU3Ryb25nIGxlbmd0aC5cIiwgXCJSZWNvdmVyZWQgd2VsbC5cIiwgXCJTdGF5ZWQgY29tcG9zZWQuXCJdLFxuICAgICAgdHJhbnNjcmlwdDogbnVsbCxcbiAgICAgIGF1ZGlvUGF0aDogbnVsbCxcbiAgICAgIHVwZGF0ZWRBdDogXCIyMDI2LTA5LTE2VDExOjAwOjAwLjAwMFpcIixcbiAgICB9LFxuICB9XTtcbiAgdmFsaWRTdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW3tcbiAgICBmYWlsZWRBdHRlbXB0czogMixcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQwOTowMDowMC4wMDBaXCIsXG4gICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQwOToxMDowMC4wMDBaXCIsXG4gICAgb3V0YWdlRHVyYXRpb25NczogNjAwXzAwMCxcbiAgfV07XG5cbiAgY29uc3QgY29ycnVwdGlvbnM6IEFycmF5PFtzdHJpbmcsIChzbmFwc2hvdDogUmVjb3JkPHN0cmluZywgYW55PikgPT4gdm9pZCwgUmVnRXhwXT4gPSBbXG4gICAgW1wibWF0Y2hcIiwgKHNuYXBzaG90KSA9PiB7XG4gICAgICBzbmFwc2hvdC5tYXRjaGVzWzBdLnN0YXJ0c0F0ID0gXCJub3QtYS1kYXRlXCI7XG4gICAgfSwgL21hdGNoZXNcXC4wXFwuc3RhcnRzQXQvXSxcbiAgICBbXCJyZXBvcnRcIiwgKHNuYXBzaG90KSA9PiB7XG4gICAgICBzbmFwc2hvdC5tYXRjaGVzWzBdLnJlcG9ydC5vYnNlcnZhdGlvbnMgPSBcIm5vdC1hbi1hcnJheVwiO1xuICAgIH0sIC9tYXRjaGVzXFwuMFxcLnJlcG9ydFxcLm9ic2VydmF0aW9ucy9dLFxuICAgIFtcInBlcnNvblwiLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90LnBsYXllcnNbMF0ubmFtZSA9IDQyO1xuICAgIH0sIC9wbGF5ZXJzXFwuMFxcLm5hbWUvXSxcbiAgICBbXCJicmFuZGluZ1wiLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90LmJyYW5kaW5nLmxvZ29QYXRoID0gXCIvdW5zYWZlL2xvZ28ucG5nXCI7XG4gICAgfSwgL2JyYW5kaW5nXFwubG9nb1BhdGgvXSxcbiAgICBbXCJyZWZyZXNoIGhlYWx0aFwiLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90LnJlZnJlc2hIZWFsdGguY29uc2VjdXRpdmVGYWlsdXJlcyA9IC0xO1xuICAgIH0sIC9yZWZyZXNoSGVhbHRoXFwuY29uc2VjdXRpdmVGYWlsdXJlcy9dLFxuICAgIFtcInJlY292ZXJ5XCIsIChzbmFwc2hvdCkgPT4ge1xuICAgICAgc25hcHNob3QucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllc1swXS5mYWlsZWRBdHRlbXB0cyA9IDA7XG4gICAgfSwgL3JlZnJlc2hIZWFsdGhcXC5wZW5kaW5nUmVjb3Zlcmllc1xcLjBcXC5mYWlsZWRBdHRlbXB0cy9dLFxuICBdO1xuXG4gIGZvciAoY29uc3QgW25hbWUsIGNvcnJ1cHQsIGV4cGVjdGVkUGF0aF0gb2YgY29ycnVwdGlvbnMpIHtcbiAgICBjb25zdCBzbmFwc2hvdCA9IHN0cnVjdHVyZWRDbG9uZSh2YWxpZFN0YXRlKSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgY29ycnVwdChzbmFwc2hvdCk7XG4gICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICgpID0+IHBhcnNlUGVyc2lzdGVkVHJhY2tlclN0YXRlKHNuYXBzaG90KSxcbiAgICAgIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgYXNzZXJ0Lm1hdGNoKGVycm9yLm1lc3NhZ2UsIC9TdG9yZWQgdHJhY2tlciBzbmFwc2hvdCBpcyBpbnZhbGlkLyk7XG4gICAgICAgIGFzc2VydC5tYXRjaChlcnJvci5tZXNzYWdlLCAvUmVwYWlyIG9yIHJlcGxhY2UgdGhlIFwibWFpblwiIHRyYWNrZXJfc3RhdGUgcmVjb3JkLyk7XG4gICAgICAgIGFzc2VydC5tYXRjaChlcnJvci5tZXNzYWdlLCBleHBlY3RlZFBhdGgsIG5hbWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufSk7XG5cbmFzeW5jIGZ1bmN0aW9uIHdpdGhUcmFja2VyU2VydmVyKFxuICBzdGF0ZTogVHJhY2tlclN0YXRlLFxuICBydW46ICh1cmw6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPixcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuICBhcHAudXNlKChyZXEsIF9yZXMsIG5leHQpID0+IHtcbiAgICByZXEubG9nID0ge1xuICAgICAgaW5mbygpIHt9LFxuICAgICAgd2FybigpIHt9LFxuICAgICAgZXJyb3IoKSB7fSxcbiAgICB9IGFzIHVua25vd24gYXMgdHlwZW9mIHJlcS5sb2c7XG4gICAgbmV4dCgpO1xuICB9KTtcbiAgYXBwLnVzZShcbiAgICBjcmVhdGVUcmFja2VyUm91dGVyKHtcbiAgICAgIGdldFN0YXRlOiBhc3luYyAoKSA9PiBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpLFxuICAgICAgc2F2ZVN0YXRlOiBhc3luYyAobmV4dCkgPT4ge1xuICAgICAgICBzdGF0ZSA9IHN0cnVjdHVyZWRDbG9uZShuZXh0KTtcbiAgICAgIH0sXG4gICAgICBhdXRob3JpemVTdGFmZjogKF9yZXEsIF9yZXMsIG5leHQpID0+IG5leHQoKSxcbiAgICB9KSxcbiAgKTtcblxuICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDAsIFwiMTI3LjAuMC4xXCIpO1xuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2VydmVyLm9uY2UoXCJsaXN0ZW5pbmdcIiwgcmVzb2x2ZSk7XG4gICAgc2VydmVyLm9uY2UoXCJlcnJvclwiLCByZWplY3QpO1xuICB9KTtcbiAgY29uc3QgYWRkcmVzcyA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIGFzc2VydChhZGRyZXNzICYmIHR5cGVvZiBhZGRyZXNzICE9PSBcInN0cmluZ1wiKTtcblxuICB0cnkge1xuICAgIGF3YWl0IHJ1bihgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH1gKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgc2VydmVyLmNsb3NlKChlcnJvcikgPT4gKGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSkpLFxuICAgICk7XG4gIH1cbn1cblxudGVzdChcInJlZnJlc2ggcm91dGUgc2VuZHMgbWF0Y2hpbmcgZmFpbHVyZSBhbmQgcmVjb3Zlcnkgd2ViaG9vayBwYXlsb2FkcyBvbmNlXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxGZXRjaCA9IGdsb2JhbFRoaXMuZmV0Y2g7XG4gIGNvbnN0IG9yaWdpbmFsRW52aXJvbm1lbnQgPSB7XG4gICAgdGhyZXNob2xkOiBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX0FMRVJUX1RIUkVTSE9MRFwiXSxcbiAgICBzY2hlZHVsZVVybDogcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl0sXG4gICAgd2ViaG9va1VybDogcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXSxcbiAgfTtcbiAgY29uc3Qgd2ViaG9va1BheWxvYWRzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdID0gW107XG4gIGxldCBzY2hlZHVsZUZhaWxzID0gdHJ1ZTtcblxuICBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX0FMRVJUX1RIUkVTSE9MRFwiXSA9IFwiMVwiO1xuICBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSA9IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIjtcbiAgcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXSA9IFwiaHR0cHM6Ly9hbGVydHMudGVzdC9ob29rXCI7XG4gIGdsb2JhbFRoaXMuZmV0Y2ggPSBhc3luYyAoaW5wdXQsIGluaXQpID0+IHtcbiAgICBjb25zdCB1cmwgPSBTdHJpbmcoaW5wdXQpO1xuICAgIGlmICh1cmwgPT09IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIikge1xuICAgICAgaWYgKHNjaGVkdWxlRmFpbHMpIHJldHVybiBuZXcgUmVzcG9uc2UoXCJ1bmF2YWlsYWJsZVwiLCB7IHN0YXR1czogNTAzIH0pO1xuICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBtYXRjaGVzOiBbXSB9KTtcbiAgICB9XG4gICAgaWYgKHVybCA9PT0gXCJodHRwczovL2FsZXJ0cy50ZXN0L2hvb2tcIikge1xuICAgICAgd2ViaG9va1BheWxvYWRzLnB1c2goSlNPTi5wYXJzZShTdHJpbmcoaW5pdD8uYm9keSkpKTtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDIwNCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpbmFsRmV0Y2goaW5wdXQsIGluaXQpO1xuICB9O1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgd2l0aFRyYWNrZXJTZXJ2ZXIoaGVhbHRoeVN0YXRlKCksIGFzeW5jICh1cmwpID0+IHtcbiAgICAgIGNvbnN0IGZhaWx1cmUgPSBhd2FpdCBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwgeyBtZXRob2Q6IFwiUE9TVFwiIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKGZhaWx1cmUuc3RhdHVzLCA1MDIpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tQYXlsb2Fkcy5sZW5ndGgsIDEpO1xuXG4gICAgICBjb25zdCBmYWlsdXJlUGF5bG9hZCA9IHdlYmhvb2tQYXlsb2Fkc1swXSE7XG4gICAgICBhc3NlcnQuZXF1YWwoZmFpbHVyZVBheWxvYWQuZXZlbnQsIFwiY2x1Yi1sb2NrZXItcmVmcmVzaC1mYWlsaW5nXCIpO1xuICAgICAgYXNzZXJ0LmVxdWFsKGZhaWx1cmVQYXlsb2FkLmNvbnNlY3V0aXZlRmFpbHVyZXMsIDEpO1xuICAgICAgYXNzZXJ0Lm1hdGNoKFN0cmluZyhmYWlsdXJlUGF5bG9hZC50ZXh0KSwgL2ZhaWxlZCAxIGNvbnNlY3V0aXZlIHRpbWVzLyk7XG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGZhaWx1cmVQYXlsb2FkLmxhc3RGYWlsdXJlQXQsIFwic3RyaW5nXCIpO1xuXG4gICAgICBjb25zdCByZXBlYXRlZEZhaWx1cmUgPSBhd2FpdCBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwocmVwZWF0ZWRGYWlsdXJlLnN0YXR1cywgNTAyKTtcbiAgICAgIGFzc2VydC5lcXVhbCh3ZWJob29rUGF5bG9hZHMubGVuZ3RoLCAxKTtcblxuICAgICAgc2NoZWR1bGVGYWlscyA9IGZhbHNlO1xuICAgICAgY29uc3QgcmVjb3ZlcnkgPSBhd2FpdCBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwgeyBtZXRob2Q6IFwiUE9TVFwiIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKHJlY292ZXJ5LnN0YXR1cywgMjAwKTtcbiAgICAgIGFzc2VydC5lcXVhbCh3ZWJob29rUGF5bG9hZHMubGVuZ3RoLCAyKTtcblxuICAgICAgY29uc3QgcmVjb3ZlcnlQYXlsb2FkID0gd2ViaG9va1BheWxvYWRzWzFdITtcbiAgICAgIGFzc2VydC5lcXVhbChyZWNvdmVyeVBheWxvYWQuZXZlbnQsIFwiY2x1Yi1sb2NrZXItcmVmcmVzaC1yZWNvdmVyZWRcIik7XG4gICAgICBhc3NlcnQuZXF1YWwocmVjb3ZlcnlQYXlsb2FkLmZhaWxlZEF0dGVtcHRzLCAyKTtcbiAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgcmVjb3ZlcnlQYXlsb2FkLm91dGFnZUR1cmF0aW9uTXMsIFwibnVtYmVyXCIpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByZWNvdmVyeVBheWxvYWQub3V0YWdlU3RhcnRlZEF0LCBcInN0cmluZ1wiKTtcbiAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgcmVjb3ZlcnlQYXlsb2FkLnJlY292ZXJlZEF0LCBcInN0cmluZ1wiKTtcbiAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgcmVjb3ZlcnlQYXlsb2FkLm91dGFnZUR1cmF0aW9uTXMsXG4gICAgICAgIERhdGUucGFyc2UoU3RyaW5nKHJlY292ZXJ5UGF5bG9hZC5yZWNvdmVyZWRBdCkpIC1cbiAgICAgICAgICBEYXRlLnBhcnNlKFN0cmluZyhyZWNvdmVyeVBheWxvYWQub3V0YWdlU3RhcnRlZEF0KSksXG4gICAgICApO1xuICAgICAgYXNzZXJ0Lm1hdGNoKFN0cmluZyhyZWNvdmVyeVBheWxvYWQudGV4dCksIC8yIGZhaWxlZCBhdHRlbXB0c1xcLi8pO1xuXG4gICAgICBjb25zdCBub3JtYWxTdWNjZXNzID0gYXdhaXQgb3JpZ2luYWxGZXRjaChgJHt1cmx9L3RyYWNrZXIvcmVmcmVzaGAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKG5vcm1hbFN1Y2Nlc3Muc3RhdHVzLCAyMDApO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tQYXlsb2Fkcy5sZW5ndGgsIDIpO1xuICAgIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIGdsb2JhbFRoaXMuZmV0Y2ggPSBvcmlnaW5hbEZldGNoO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHtcbiAgICAgIENMVUJfTE9DS0VSX0FMRVJUX1RIUkVTSE9MRDogb3JpZ2luYWxFbnZpcm9ubWVudC50aHJlc2hvbGQsXG4gICAgICBDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkw6IG9yaWdpbmFsRW52aXJvbm1lbnQuc2NoZWR1bGVVcmwsXG4gICAgICBTVEFGRl9BTEVSVF9XRUJIT09LX1VSTDogb3JpZ2luYWxFbnZpcm9ubWVudC53ZWJob29rVXJsLFxuICAgIH0pKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgZGVsZXRlIHByb2Nlc3MuZW52W2tleV07XG4gICAgICBlbHNlIHByb2Nlc3MuZW52W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG50ZXN0KFwicmVmcmVzaCByb3V0ZSBzdWNjZWVkcyB3aGlsZSBhIHJlY292ZXJ5IHdlYmhvb2sgaXMgcmV0cmllZCB1bnRpbCBkZWxpdmVyZWRcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvcmlnaW5hbEZldGNoID0gZ2xvYmFsVGhpcy5mZXRjaDtcbiAgY29uc3Qgb3JpZ2luYWxFbnZpcm9ubWVudCA9IHtcbiAgICBzY2hlZHVsZVVybDogcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl0sXG4gICAgd2ViaG9va1VybDogcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXSxcbiAgfTtcbiAgY29uc3QgcmVjb3ZlcnkgPSB7XG4gICAgZmFpbGVkQXR0ZW1wdHM6IDIsXG4gICAgb3V0YWdlU3RhcnRlZEF0OiBcIjIwMjYtMDktMTZUMTE6NTA6MDAuMDAwWlwiLFxuICAgIHJlY292ZXJlZEF0OiBcIjIwMjYtMDktMTZUMTI6MDA6MDAuMDAwWlwiLFxuICAgIG91dGFnZUR1cmF0aW9uTXM6IDEwICogNjBfMDAwLFxuICB9O1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW3JlY292ZXJ5XTtcbiAgY29uc3Qgd2ViaG9va1BheWxvYWRzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdID0gW107XG4gIGxldCB3ZWJob29rRmFpbHMgPSB0cnVlO1xuXG4gIHByb2Nlc3MuZW52W1wiQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMXCJdID0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiO1xuICBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdID0gXCJodHRwczovL2FsZXJ0cy50ZXN0L2hvb2tcIjtcbiAgZ2xvYmFsVGhpcy5mZXRjaCA9IGFzeW5jIChpbnB1dCwgaW5pdCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgaWYgKHVybCA9PT0gXCJodHRwczovL3NjaGVkdWxlLnRlc3QvZmVlZFwiKSB7XG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IG1hdGNoZXM6IFtdIH0pO1xuICAgIH1cbiAgICBpZiAodXJsID09PSBcImh0dHBzOi8vYWxlcnRzLnRlc3QvaG9va1wiKSB7XG4gICAgICB3ZWJob29rUGF5bG9hZHMucHVzaChKU09OLnBhcnNlKFN0cmluZyhpbml0Py5ib2R5KSkpO1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogd2ViaG9va0ZhaWxzID8gNTAzIDogMjA0IH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luYWxGZXRjaChpbnB1dCwgaW5pdCk7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCB3aXRoVHJhY2tlclNlcnZlcihzdGF0ZSwgYXN5bmMgKHVybCkgPT4ge1xuICAgICAgY29uc3QgZmFpbGVkRGVsaXZlcnkgPSBhd2FpdCBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwoZmFpbGVkRGVsaXZlcnkuc3RhdHVzLCAyMDApO1xuICAgICAgY29uc3QgZmFpbGVkRGVsaXZlcnlCb2R5ID0gYXdhaXQgZmFpbGVkRGVsaXZlcnkuanNvbigpIGFzIHtcbiAgICAgICAgcmVmcmVzaEhlYWx0aDogeyBwZW5kaW5nUmVjb3ZlcnlOb3RpY2VzOiBudW1iZXIgfTtcbiAgICAgIH07XG4gICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgIGZhaWxlZERlbGl2ZXJ5Qm9keS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyeU5vdGljZXMsXG4gICAgICAgIDEsXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tQYXlsb2Fkcy5sZW5ndGgsIDEpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tQYXlsb2Fkc1swXT8uZXZlbnQsIFwiY2x1Yi1sb2NrZXItcmVmcmVzaC1yZWNvdmVyZWRcIik7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1BheWxvYWRzWzBdPy5mYWlsZWRBdHRlbXB0cywgcmVjb3ZlcnkuZmFpbGVkQXR0ZW1wdHMpO1xuXG4gICAgICB3ZWJob29rRmFpbHMgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NmdWxSZXRyeSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5lcXVhbChzdWNjZXNzZnVsUmV0cnkuc3RhdHVzLCAyMDApO1xuICAgICAgY29uc3Qgc3VjY2Vzc2Z1bFJldHJ5Qm9keSA9IGF3YWl0IHN1Y2Nlc3NmdWxSZXRyeS5qc29uKCkgYXMge1xuICAgICAgICByZWZyZXNoSGVhbHRoOiB7IHBlbmRpbmdSZWNvdmVyeU5vdGljZXM6IG51bWJlciB9O1xuICAgICAgfTtcbiAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgc3VjY2Vzc2Z1bFJldHJ5Qm9keS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyeU5vdGljZXMsXG4gICAgICAgIDAsXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tQYXlsb2Fkcy5sZW5ndGgsIDIpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh3ZWJob29rUGF5bG9hZHNbMV0sIHdlYmhvb2tQYXlsb2Fkc1swXSk7XG5cbiAgICAgIGNvbnN0IGFmdGVyRGVsaXZlcnkgPSBhd2FpdCBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwoYWZ0ZXJEZWxpdmVyeS5zdGF0dXMsIDIwMCk7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1BheWxvYWRzLmxlbmd0aCwgMik7XG4gICAgfSk7XG4gIH0gZmluYWxseSB7XG4gICAgZ2xvYmFsVGhpcy5mZXRjaCA9IG9yaWdpbmFsRmV0Y2g7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoe1xuICAgICAgQ0xVQl9MT0NLRVJfU0NIRURVTEVfVVJMOiBvcmlnaW5hbEVudmlyb25tZW50LnNjaGVkdWxlVXJsLFxuICAgICAgU1RBRkZfQUxFUlRfV0VCSE9PS19VUkw6IG9yaWdpbmFsRW52aXJvbm1lbnQud2ViaG9va1VybCxcbiAgICB9KSkge1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIGRlbGV0ZSBwcm9jZXNzLmVudltrZXldO1xuICAgICAgZWxzZSBwcm9jZXNzLmVudltrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudGVzdChcInRyYWNrZXIgaGVhbHRoIHJlcG9ydHMgcXVldWVkIHJlY292ZXJ5IG5vdGljZSBjb3VudFwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMgPSBbXG4gICAge1xuICAgICAgZmFpbGVkQXR0ZW1wdHM6IDIsXG4gICAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsXG4gICAgICByZWNvdmVyZWRBdDogXCIyMDI2LTA5LTE2VDEwOjEwOjAwLjAwMFpcIixcbiAgICAgIG91dGFnZUR1cmF0aW9uTXM6IDEwICogNjBfMDAwLFxuICAgIH0sXG4gICAge1xuICAgICAgZmFpbGVkQXR0ZW1wdHM6IDEsXG4gICAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQxMTowMDowMC4wMDBaXCIsXG4gICAgICByZWNvdmVyZWRBdDogXCIyMDI2LTA5LTE2VDExOjA1OjAwLjAwMFpcIixcbiAgICAgIG91dGFnZUR1cmF0aW9uTXM6IDUgKiA2MF8wMDAsXG4gICAgfSxcbiAgXTtcblxuICBhd2FpdCB3aXRoVHJhY2tlclNlcnZlcihzdGF0ZSwgYXN5bmMgKHVybCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dXJsfS90cmFja2VyYCk7XG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLnN0YXR1cywgMjAwKTtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpIGFzIHtcbiAgICAgIHJlZnJlc2hIZWFsdGg6IHsgcGVuZGluZ1JlY292ZXJ5Tm90aWNlczogbnVtYmVyIH07XG4gICAgfTtcbiAgICBhc3NlcnQuZXF1YWwoXG4gICAgICBib2R5LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJ5Tm90aWNlcyxcbiAgICAgIDIsXG4gICAgKTtcbiAgfSk7XG59KTtcblxudGVzdChcInJlZnJlc2ggcm91dGUgZGVsaXZlcnMgcXVldWVkIHJlY292ZXJpZXMgb25jZSBpbiBpbmNpZGVudCBvcmRlclwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsRmV0Y2ggPSBnbG9iYWxUaGlzLmZldGNoO1xuICBjb25zdCBvcmlnaW5hbEVudmlyb25tZW50ID0ge1xuICAgIHNjaGVkdWxlVXJsOiBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSxcbiAgICB3ZWJob29rVXJsOiBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdLFxuICB9O1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW1xuICAgIHtcbiAgICAgIGZhaWxlZEF0dGVtcHRzOiAyLFxuICAgICAgb3V0YWdlU3RhcnRlZEF0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQxMDoxMDowMC4wMDBaXCIsXG4gICAgICBvdXRhZ2VEdXJhdGlvbk1zOiAxMCAqIDYwXzAwMCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZhaWxlZEF0dGVtcHRzOiAzLFxuICAgICAgb3V0YWdlU3RhcnRlZEF0OiBcIjIwMjYtMDktMTZUMTE6MDA6MDAuMDAwWlwiLFxuICAgICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQxMToxNTowMC4wMDBaXCIsXG4gICAgICBvdXRhZ2VEdXJhdGlvbk1zOiAxNSAqIDYwXzAwMCxcbiAgICB9LFxuICBdO1xuICBjb25zdCB3ZWJob29rUGF5bG9hZHM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10gPSBbXTtcblxuICBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSA9IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIjtcbiAgcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXSA9IFwiaHR0cHM6Ly9hbGVydHMudGVzdC9ob29rXCI7XG4gIGdsb2JhbFRoaXMuZmV0Y2ggPSBhc3luYyAoaW5wdXQsIGluaXQpID0+IHtcbiAgICBjb25zdCB1cmwgPSBTdHJpbmcoaW5wdXQpO1xuICAgIGlmICh1cmwgPT09IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIikge1xuICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBtYXRjaGVzOiBbXSB9KTtcbiAgICB9XG4gICAgaWYgKHVybCA9PT0gXCJodHRwczovL2FsZXJ0cy50ZXN0L2hvb2tcIikge1xuICAgICAgd2ViaG9va1BheWxvYWRzLnB1c2goSlNPTi5wYXJzZShTdHJpbmcoaW5pdD8uYm9keSkpKTtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDIwNCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpbmFsRmV0Y2goaW5wdXQsIGluaXQpO1xuICB9O1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgd2l0aFRyYWNrZXJTZXJ2ZXIoc3RhdGUsIGFzeW5jICh1cmwpID0+IHtcbiAgICAgIGNvbnN0IHJlY292ZXJ5ID0gYXdhaXQgb3JpZ2luYWxGZXRjaChgJHt1cmx9L3RyYWNrZXIvcmVmcmVzaGAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKHJlY292ZXJ5LnN0YXR1cywgMjAwKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIHdlYmhvb2tQYXlsb2Fkcy5tYXAoKHBheWxvYWQpID0+IHBheWxvYWQub3V0YWdlU3RhcnRlZEF0KSxcbiAgICAgICAgW1wiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsIFwiMjAyNi0wOS0xNlQxMTowMDowMC4wMDBaXCJdLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgYWZ0ZXJEZWxpdmVyeSA9IGF3YWl0IG9yaWdpbmFsRmV0Y2goYCR7dXJsfS90cmFja2VyL3JlZnJlc2hgLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5lcXVhbChhZnRlckRlbGl2ZXJ5LnN0YXR1cywgMjAwKTtcbiAgICAgIGFzc2VydC5lcXVhbCh3ZWJob29rUGF5bG9hZHMubGVuZ3RoLCAyKTtcbiAgICB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICBnbG9iYWxUaGlzLmZldGNoID0gb3JpZ2luYWxGZXRjaDtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh7XG4gICAgICBDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkw6IG9yaWdpbmFsRW52aXJvbm1lbnQuc2NoZWR1bGVVcmwsXG4gICAgICBTVEFGRl9BTEVSVF9XRUJIT09LX1VSTDogb3JpZ2luYWxFbnZpcm9ubWVudC53ZWJob29rVXJsLFxuICAgIH0pKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgZGVsZXRlIHByb2Nlc3MuZW52W2tleV07XG4gICAgICBlbHNlIHByb2Nlc3MuZW52W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG50ZXN0KFwib3ZlcmxhcHBpbmcgcmVmcmVzaCByZXF1ZXN0cyBkZWxpdmVyIGEgcXVldWVkIHJlY292ZXJ5IGV4YWN0bHkgb25jZVwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsRmV0Y2ggPSBnbG9iYWxUaGlzLmZldGNoO1xuICBjb25zdCBvcmlnaW5hbEVudmlyb25tZW50ID0ge1xuICAgIHNjaGVkdWxlVXJsOiBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSxcbiAgICB3ZWJob29rVXJsOiBwcm9jZXNzLmVudltcIlNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMXCJdLFxuICB9O1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW1xuICAgIHtcbiAgICAgIGZhaWxlZEF0dGVtcHRzOiAyLFxuICAgICAgb3V0YWdlU3RhcnRlZEF0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQxMDoxMDowMC4wMDBaXCIsXG4gICAgICBvdXRhZ2VEdXJhdGlvbk1zOiAxMCAqIDYwXzAwMCxcbiAgICB9LFxuICBdO1xuICBjb25zdCB3ZWJob29rUGF5bG9hZHM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10gPSBbXTtcbiAgbGV0IHJlbGVhc2VXZWJob29rITogKCkgPT4gdm9pZDtcbiAgY29uc3Qgd2ViaG9va0Jsb2NrZWQgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgIHJlbGVhc2VXZWJob29rID0gcmVzb2x2ZTtcbiAgfSk7XG4gIGxldCBtYXJrV2ViaG9va1N0YXJ0ZWQhOiAoKSA9PiB2b2lkO1xuICBjb25zdCB3ZWJob29rU3RhcnRlZCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgbWFya1dlYmhvb2tTdGFydGVkID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl0gPSBcImh0dHBzOi8vc2NoZWR1bGUudGVzdC9mZWVkXCI7XG4gIHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl0gPSBcImh0dHBzOi8vYWxlcnRzLnRlc3QvaG9va1wiO1xuICBnbG9iYWxUaGlzLmZldGNoID0gYXN5bmMgKGlucHV0LCBpbml0KSA9PiB7XG4gICAgY29uc3QgdXJsID0gU3RyaW5nKGlucHV0KTtcbiAgICBpZiAodXJsID09PSBcImh0dHBzOi8vc2NoZWR1bGUudGVzdC9mZWVkXCIpIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKHsgbWF0Y2hlczogW10gfSk7XG4gICAgfVxuICAgIGlmICh1cmwgPT09IFwiaHR0cHM6Ly9hbGVydHMudGVzdC9ob29rXCIpIHtcbiAgICAgIHdlYmhvb2tQYXlsb2Fkcy5wdXNoKEpTT04ucGFyc2UoU3RyaW5nKGluaXQ/LmJvZHkpKSk7XG4gICAgICBtYXJrV2ViaG9va1N0YXJ0ZWQoKTtcbiAgICAgIGF3YWl0IHdlYmhvb2tCbG9ja2VkO1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjA0IH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luYWxGZXRjaChpbnB1dCwgaW5pdCk7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCB3aXRoVHJhY2tlclNlcnZlcihzdGF0ZSwgYXN5bmMgKHVybCkgPT4ge1xuICAgICAgY29uc3QgZmlyc3RSZWZyZXNoID0gb3JpZ2luYWxGZXRjaChgJHt1cmx9L3RyYWNrZXIvcmVmcmVzaGAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgd2ViaG9va1N0YXJ0ZWQ7XG4gICAgICBjb25zdCBzZWNvbmRSZWZyZXNoID0gb3JpZ2luYWxGZXRjaChgJHt1cmx9L3RyYWNrZXIvcmVmcmVzaGAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMCkpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHdlYmhvb2tQYXlsb2Fkcy5sZW5ndGgsIDEpO1xuXG4gICAgICByZWxlYXNlV2ViaG9vaygpO1xuICAgICAgY29uc3QgcmVzcG9uc2VzID0gYXdhaXQgUHJvbWlzZS5hbGwoW2ZpcnN0UmVmcmVzaCwgc2Vjb25kUmVmcmVzaF0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXNwb25zZXMubWFwKChyZXNwb25zZSkgPT4gcmVzcG9uc2Uuc3RhdHVzKSwgWzIwMCwgMjAwXSk7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1BheWxvYWRzLmxlbmd0aCwgMSk7XG5cbiAgICAgIGNvbnN0IGJvZGllcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICByZXNwb25zZXMubWFwKGFzeW5jIChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8e1xuICAgICAgICAgIHJlZnJlc2hIZWFsdGg6IHsgcGVuZGluZ1JlY292ZXJ5Tm90aWNlczogbnVtYmVyIH07XG4gICAgICAgIH0+KSxcbiAgICAgICk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBib2RpZXMubWFwKChib2R5KSA9PiBib2R5LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJ5Tm90aWNlcyksXG4gICAgICAgIFswLCAwXSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH0gZmluYWxseSB7XG4gICAgcmVsZWFzZVdlYmhvb2soKTtcbiAgICBnbG9iYWxUaGlzLmZldGNoID0gb3JpZ2luYWxGZXRjaDtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh7XG4gICAgICBDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkw6IG9yaWdpbmFsRW52aXJvbm1lbnQuc2NoZWR1bGVVcmwsXG4gICAgICBTVEFGRl9BTEVSVF9XRUJIT09LX1VSTDogb3JpZ2luYWxFbnZpcm9ubWVudC53ZWJob29rVXJsLFxuICAgIH0pKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgZGVsZXRlIHByb2Nlc3MuZW52W2tleV07XG4gICAgICBlbHNlIHByb2Nlc3MuZW52W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG50ZXN0KFwic2xvdyBzY2hlZHVsZSBhbmQgd2ViaG9vayByZXF1ZXN0cyBkbyBub3QgZGVsYXkgbWF0Y2ggZWRpdHNcIiwgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvcmlnaW5hbEZldGNoID0gZ2xvYmFsVGhpcy5mZXRjaDtcbiAgY29uc3Qgb3JpZ2luYWxFbnZpcm9ubWVudCA9IHtcbiAgICBzY2hlZHVsZVVybDogcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl0sXG4gICAgd2ViaG9va1VybDogcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXSxcbiAgfTtcbiAgY29uc3Qgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUubWF0Y2hlcyA9IFt7XG4gICAgaWQ6IFwibWF0Y2gtMVwiLFxuICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgICBvcHBvbmVudDogXCJPcHBvbmVudFwiLFxuICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEwOjQ1OjAwLjAwMFpcIixcbiAgICB2ZW51ZTogXCJWZW51ZVwiLFxuICAgIGNvdXJ0OiBcIkNvdXJ0IDFcIixcbiAgICBjb2FjaElkOiBcImNvYWNoLTFcIixcbiAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgcmVzdWx0OiBcIldvbiAzLTFcIixcbiAgICByZXBvcnQ6IG51bGwsXG4gIH1dO1xuICBzdGF0ZS5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzID0gW3tcbiAgICBmYWlsZWRBdHRlbXB0czogMixcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IFwiMjAyNi0wOS0xNlQwOTowMDowMC4wMDBaXCIsXG4gICAgcmVjb3ZlcmVkQXQ6IFwiMjAyNi0wOS0xNlQwOToxMDowMC4wMDBaXCIsXG4gICAgb3V0YWdlRHVyYXRpb25NczogMTAgKiA2MF8wMDAsXG4gIH1dO1xuXG4gIGxldCByZWxlYXNlU2NoZWR1bGUhOiAoKSA9PiB2b2lkO1xuICBjb25zdCBzY2hlZHVsZUJsb2NrZWQgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgIHJlbGVhc2VTY2hlZHVsZSA9IHJlc29sdmU7XG4gIH0pO1xuICBsZXQgbWFya1NjaGVkdWxlU3RhcnRlZCE6ICgpID0+IHZvaWQ7XG4gIGNvbnN0IHNjaGVkdWxlU3RhcnRlZCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgbWFya1NjaGVkdWxlU3RhcnRlZCA9IHJlc29sdmU7XG4gIH0pO1xuICBsZXQgcmVsZWFzZVdlYmhvb2shOiAoKSA9PiB2b2lkO1xuICBjb25zdCB3ZWJob29rQmxvY2tlZCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgcmVsZWFzZVdlYmhvb2sgPSByZXNvbHZlO1xuICB9KTtcbiAgbGV0IG1hcmtXZWJob29rU3RhcnRlZCE6ICgpID0+IHZvaWQ7XG4gIGNvbnN0IHdlYmhvb2tTdGFydGVkID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICBtYXJrV2ViaG9va1N0YXJ0ZWQgPSByZXNvbHZlO1xuICB9KTtcblxuICBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSA9IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIjtcbiAgcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXSA9IFwiaHR0cHM6Ly9hbGVydHMudGVzdC9ob29rXCI7XG4gIGdsb2JhbFRoaXMuZmV0Y2ggPSBhc3luYyAoaW5wdXQpID0+IHtcbiAgICBjb25zdCB1cmwgPSBTdHJpbmcoaW5wdXQpO1xuICAgIGlmICh1cmwgPT09IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIikge1xuICAgICAgbWFya1NjaGVkdWxlU3RhcnRlZCgpO1xuICAgICAgYXdhaXQgc2NoZWR1bGVCbG9ja2VkO1xuICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBtYXRjaGVzOiBbXSB9KTtcbiAgICB9XG4gICAgaWYgKHVybCA9PT0gXCJodHRwczovL2FsZXJ0cy50ZXN0L2hvb2tcIikge1xuICAgICAgbWFya1dlYmhvb2tTdGFydGVkKCk7XG4gICAgICBhd2FpdCB3ZWJob29rQmxvY2tlZDtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDIwNCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpbmFsRmV0Y2goaW5wdXQpO1xuICB9O1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgd2l0aFRyYWNrZXJTZXJ2ZXIoc3RhdGUsIGFzeW5jICh1cmwpID0+IHtcbiAgICAgIGNvbnN0IHJlZnJlc2ggPSBvcmlnaW5hbEZldGNoKGAke3VybH0vdHJhY2tlci9yZWZyZXNoYCwgeyBtZXRob2Q6IFwiUE9TVFwiIH0pO1xuICAgICAgYXdhaXQgc2NoZWR1bGVTdGFydGVkO1xuXG4gICAgICBjb25zdCBlZGl0RHVyaW5nU2NoZWR1bGUgPSBhd2FpdCBvcmlnaW5hbEZldGNoKGAke3VybH0vbWF0Y2hlcy9tYXRjaC0xYCwge1xuICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvdXJ0OiBcIkNvdXJ0IDJcIiB9KSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKGVkaXREdXJpbmdTY2hlZHVsZS5zdGF0dXMsIDIwMCk7XG5cbiAgICAgIHJlbGVhc2VTY2hlZHVsZSgpO1xuICAgICAgYXdhaXQgd2ViaG9va1N0YXJ0ZWQ7XG5cbiAgICAgIGNvbnN0IGVkaXREdXJpbmdXZWJob29rID0gYXdhaXQgb3JpZ2luYWxGZXRjaChgJHt1cmx9L21hdGNoZXMvbWF0Y2gtMWAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb3VydDogXCJDb3VydCAzXCIgfSksXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5lcXVhbChlZGl0RHVyaW5nV2ViaG9vay5zdGF0dXMsIDIwMCk7XG5cbiAgICAgIHJlbGVhc2VXZWJob29rKCk7XG4gICAgICBhc3NlcnQuZXF1YWwoKGF3YWl0IHJlZnJlc2gpLnN0YXR1cywgMjAwKTtcbiAgICB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICByZWxlYXNlU2NoZWR1bGUoKTtcbiAgICByZWxlYXNlV2ViaG9vaygpO1xuICAgIGdsb2JhbFRoaXMuZmV0Y2ggPSBvcmlnaW5hbEZldGNoO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHtcbiAgICAgIENMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTDogb3JpZ2luYWxFbnZpcm9ubWVudC5zY2hlZHVsZVVybCxcbiAgICAgIFNUQUZGX0FMRVJUX1dFQkhPT0tfVVJMOiBvcmlnaW5hbEVudmlyb25tZW50LndlYmhvb2tVcmwsXG4gICAgfSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBkZWxldGUgcHJvY2Vzcy5lbnZba2V5XTtcbiAgICAgIGVsc2UgcHJvY2Vzcy5lbnZba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufSk7XG5cbnRlc3QoXCJvdmVybGFwcGluZyBtYXRjaCBlZGl0IGFuZCByZXBvcnQgc2F2ZSBwcmVzZXJ2ZSBib3RoIGNoYW5nZXNcIiwgYXN5bmMgKCkgPT4ge1xuICBsZXQgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUubWF0Y2hlcyA9IFtcbiAgICB7XG4gICAgICBpZDogXCJtYXRjaC0xXCIsXG4gICAgICBleHRlcm5hbElkOiBudWxsLFxuICAgICAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgICAgIG9wcG9uZW50OiBcIk9wcG9uZW50XCIsXG4gICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEwOjAwOjAwLjAwMFpcIixcbiAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEwOjQ1OjAwLjAwMFpcIixcbiAgICAgIHZlbnVlOiBcIlZlbnVlXCIsXG4gICAgICBjb3VydDogXCJDb3VydCAxXCIsXG4gICAgICBjb2FjaElkOiBcImNvYWNoLTFcIixcbiAgICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgICByZXBvcnQ6IG51bGwsXG4gICAgfSxcbiAgXTtcblxuICBsZXQgcmVsZWFzZUZpcnN0U2F2ZSE6ICgpID0+IHZvaWQ7XG4gIGNvbnN0IGZpcnN0U2F2ZUJsb2NrZWQgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgIHJlbGVhc2VGaXJzdFNhdmUgPSByZXNvbHZlO1xuICB9KTtcbiAgbGV0IG1hcmtGaXJzdFNhdmVTdGFydGVkITogKCkgPT4gdm9pZDtcbiAgY29uc3QgZmlyc3RTYXZlU3RhcnRlZCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgbWFya0ZpcnN0U2F2ZVN0YXJ0ZWQgPSByZXNvbHZlO1xuICB9KTtcbiAgbGV0IHNhdmVDb3VudCA9IDA7XG5cbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgYXBwLnVzZShcbiAgICBjcmVhdGVUcmFja2VyUm91dGVyKHtcbiAgICAgIGdldFN0YXRlOiBhc3luYyAoKSA9PiBzdHJ1Y3R1cmVkQ2xvbmUoc3RhdGUpLFxuICAgICAgc2F2ZVN0YXRlOiBhc3luYyAobmV4dCkgPT4ge1xuICAgICAgICBzYXZlQ291bnQgKz0gMTtcbiAgICAgICAgaWYgKHNhdmVDb3VudCA9PT0gMSkge1xuICAgICAgICAgIG1hcmtGaXJzdFNhdmVTdGFydGVkKCk7XG4gICAgICAgICAgYXdhaXQgZmlyc3RTYXZlQmxvY2tlZDtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IHN0cnVjdHVyZWRDbG9uZShuZXh0KTtcbiAgICAgIH0sXG4gICAgICBvYmplY3RTdG9yYWdlOiB7XG4gICAgICAgIHNhdmVPYmplY3Q6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICAgICAgZ2V0T2JqZWN0OiBhc3luYyAoKSA9PiAoe30pIGFzIG5ldmVyLFxuICAgICAgICBkZWxldGVPYmplY3Q6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICBhdXRob3JpemVTdGFmZjogKF9yZXEsIF9yZXMsIG5leHQpID0+IG5leHQoKSxcbiAgICB9KSxcbiAgKTtcblxuICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDAsIFwiMTI3LjAuMC4xXCIpO1xuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2VydmVyLm9uY2UoXCJsaXN0ZW5pbmdcIiwgcmVzb2x2ZSk7XG4gICAgc2VydmVyLm9uY2UoXCJlcnJvclwiLCByZWplY3QpO1xuICB9KTtcbiAgY29uc3QgYWRkcmVzcyA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIGFzc2VydChhZGRyZXNzICYmIHR5cGVvZiBhZGRyZXNzICE9PSBcInN0cmluZ1wiKTtcbiAgY29uc3QgdXJsID0gYGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9YDtcblxuICB0cnkge1xuICAgIGNvbnN0IGVkaXQgPSBmZXRjaChgJHt1cmx9L21hdGNoZXMvbWF0Y2gtMWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb3VydDogXCJDb3VydCAyXCIgfSksXG4gICAgfSk7XG4gICAgYXdhaXQgZmlyc3RTYXZlU3RhcnRlZDtcblxuICAgIGNvbnN0IHJlcG9ydCA9IGZldGNoKGAke3VybH0vbWF0Y2hlcy9tYXRjaC0xL3JlcG9ydGAsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgb2JzZXJ2YXRpb25zOiBbXG4gICAgICAgICAgXCJDb250cm9sbGVkIHRoZSBtaWRkbGUgd2VsbC5cIixcbiAgICAgICAgICBcIkNvbnNpc3RlbnRseSByZWNvdmVyZWQgdG8gdGhlIFQuXCIsXG4gICAgICAgICAgXCJLZXB0IGdvb2Qgd2lkdGggdW5kZXIgcHJlc3N1cmUuXCIsXG4gICAgICAgIF0sXG4gICAgICAgIHRyYW5zY3JpcHQ6IFwiU3RheWVkIGNvbXBvc2VkIGluIHRoZSBsb25nIHJhbGxpZXMuXCIsXG4gICAgICAgIGF1ZGlvUGF0aDogXCIvb2JqZWN0cy91cGxvYWRzLzEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMFwiLFxuICAgICAgfSksXG4gICAgfSk7XG5cbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMCkpO1xuICAgIGFzc2VydC5lcXVhbChzYXZlQ291bnQsIDEpO1xuXG4gICAgcmVsZWFzZUZpcnN0U2F2ZSgpO1xuICAgIGNvbnN0IHJlc3BvbnNlcyA9IGF3YWl0IFByb21pc2UuYWxsKFtlZGl0LCByZXBvcnRdKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3BvbnNlcy5tYXAoKHJlc3BvbnNlKSA9PiByZXNwb25zZS5zdGF0dXMpLCBbMjAwLCAyMDBdKTtcbiAgICBhc3NlcnQuZXF1YWwoc2F2ZUNvdW50LCAyKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUubWF0Y2hlc1swXT8uY291cnQsIFwiQ291cnQgMlwiKTtcbiAgICBhc3NlcnQuZXF1YWwoXG4gICAgICBzdGF0ZS5tYXRjaGVzWzBdPy5yZXBvcnQ/Lm9ic2VydmF0aW9uc1swXSxcbiAgICAgIFwiQ29udHJvbGxlZCB0aGUgbWlkZGxlIHdlbGwuXCIsXG4gICAgKTtcbiAgICBhc3NlcnQuZXF1YWwoXG4gICAgICBzdGF0ZS5tYXRjaGVzWzBdPy5yZXBvcnQ/LmF1ZGlvUGF0aCxcbiAgICAgIFwiL29iamVjdHMvdXBsb2Fkcy8xMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDBcIixcbiAgICApO1xuICB9IGZpbmFsbHkge1xuICAgIHJlbGVhc2VGaXJzdFNhdmUoKTtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgc2VydmVyLmNsb3NlKChlcnJvcikgPT4gKGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSkpLFxuICAgICk7XG4gIH1cbn0pO1xuXG50ZXN0KFwiaW5kZXBlbmRlbnQgQVBJIGluc3RhbmNlcyBjb29yZGluYXRlIG92ZXJsYXBwaW5nIHRyYWNrZXIgd3JpdGVzXCIsIGFzeW5jICgpID0+IHtcbiAgbGV0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLm1hdGNoZXMgPSBbe1xuICAgIGlkOiBcIm1hdGNoLTFcIixcbiAgICBleHRlcm5hbElkOiBudWxsLFxuICAgIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gICAgb3Bwb25lbnQ6IFwiT3Bwb25lbnRcIixcbiAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEwOjAwOjAwLjAwMFpcIixcbiAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMDo0NTowMC4wMDBaXCIsXG4gICAgdmVudWU6IFwiVmVudWVcIixcbiAgICBjb3VydDogXCJDb3VydCAxXCIsXG4gICAgY29hY2hJZDogXCJjb2FjaC0xXCIsXG4gICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgcmVwb3J0OiBudWxsLFxuICB9XTtcblxuICBsZXQgdHJhbnNhY3Rpb25RdWV1ZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICBjb25zdCBtdXRhdGVTdGF0ZSA9IGFzeW5jIDxULD4oXG4gICAgb3BlcmF0aW9uOiAoXG4gICAgICBsb2FkU3RhdGU6ICgpID0+IFByb21pc2U8VHJhY2tlclN0YXRlPixcbiAgICAgIHNhdmVTdGF0ZTogKG5leHQ6IFRyYWNrZXJTdGF0ZSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICApID0+IFByb21pc2U8VD4sXG4gICk6IFByb21pc2U8VD4gPT4ge1xuICAgIGNvbnN0IHByZXZpb3VzID0gdHJhbnNhY3Rpb25RdWV1ZTtcbiAgICBsZXQgcmVsZWFzZSE6ICgpID0+IHZvaWQ7XG4gICAgdHJhbnNhY3Rpb25RdWV1ZSA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICByZWxlYXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcbiAgICBhd2FpdCBwcmV2aW91cztcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IG9wZXJhdGlvbihcbiAgICAgICAgYXN5bmMgKCkgPT4gc3RydWN0dXJlZENsb25lKHN0YXRlKSxcbiAgICAgICAgYXN5bmMgKG5leHQpID0+IHtcbiAgICAgICAgICBzdGF0ZSA9IHN0cnVjdHVyZWRDbG9uZShuZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQXBwID0gKCkgPT4ge1xuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgICBhcHAudXNlKGNyZWF0ZVRyYWNrZXJSb3V0ZXIoe1xuICAgICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IHN0cnVjdHVyZWRDbG9uZShzdGF0ZSksXG4gICAgICBzYXZlU3RhdGU6IGFzeW5jIChuZXh0KSA9PiB7XG4gICAgICAgIHN0YXRlID0gc3RydWN0dXJlZENsb25lKG5leHQpO1xuICAgICAgfSxcbiAgICAgIG11dGF0ZVN0YXRlLFxuICAgICAgYXV0aG9yaXplU3RhZmY6IChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCksXG4gICAgfSkpO1xuICAgIHJldHVybiBhcHA7XG4gIH07XG4gIGNvbnN0IHNlcnZlcnMgPSBbY3JlYXRlQXBwKCkubGlzdGVuKDAsIFwiMTI3LjAuMC4xXCIpLCBjcmVhdGVBcHAoKS5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIildO1xuICBhd2FpdCBQcm9taXNlLmFsbChzZXJ2ZXJzLm1hcCgoc2VydmVyKSA9PiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2VydmVyLm9uY2UoXCJsaXN0ZW5pbmdcIiwgcmVzb2x2ZSk7XG4gICAgc2VydmVyLm9uY2UoXCJlcnJvclwiLCByZWplY3QpO1xuICB9KSkpO1xuICBjb25zdCB1cmxzID0gc2VydmVycy5tYXAoKHNlcnZlcikgPT4ge1xuICAgIGNvbnN0IGFkZHJlc3MgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICAgIGFzc2VydChhZGRyZXNzICYmIHR5cGVvZiBhZGRyZXNzICE9PSBcInN0cmluZ1wiKTtcbiAgICByZXR1cm4gYGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9YDtcbiAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBbZWRpdCwgcmVwb3J0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGZldGNoKGAke3VybHNbMF19L21hdGNoZXMvbWF0Y2gtMWAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb3VydDogXCJDb3VydCAyXCIgfSksXG4gICAgICB9KSxcbiAgICAgIGZldGNoKGAke3VybHNbMV19L21hdGNoZXMvbWF0Y2gtMS9yZXBvcnRgLCB7XG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgb2JzZXJ2YXRpb25zOiBbXCJTdHJvbmcgbGVuZ3RoLlwiLCBcIlJlY292ZXJlZCB0byB0aGUgVC5cIiwgXCJTdGF5ZWQgY29tcG9zZWQuXCJdLFxuICAgICAgICAgIHRyYW5zY3JpcHQ6IFwiR29vZCB3b3JrIHVuZGVyIHByZXNzdXJlLlwiLFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIF0pO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChbZWRpdC5zdGF0dXMsIHJlcG9ydC5zdGF0dXNdLCBbMjAwLCAyMDBdKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUubWF0Y2hlc1swXT8uY291cnQsIFwiQ291cnQgMlwiKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUubWF0Y2hlc1swXT8ucmVwb3J0Py50cmFuc2NyaXB0LCBcIkdvb2Qgd29yayB1bmRlciBwcmVzc3VyZS5cIik7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoc2VydmVycy5tYXAoKHNlcnZlcikgPT4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHNlcnZlci5jbG9zZSgoZXJyb3IpID0+IGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSksXG4gICAgKSkpO1xuICB9XG59KTtcblxudGVzdChcImNvYWNoIHJlcG9ydCBhdWRpbyB1cGxvYWQgc3RvcmVzIGJ5dGVzIGFuZCByZXR1cm5zIGl0cyBvYmplY3QgcGF0aFwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0YXRlID0gaGVhbHRoeVN0YXRlKCk7XG4gIHN0YXRlLm1hdGNoZXMgPSBbe1xuICAgIGlkOiBcImNvbXBsZXRlZC1tYXRjaFwiLFxuICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgcGxheWVySWQ6IFwicGxheWVyLTFcIixcbiAgICBvcHBvbmVudDogXCJPcHBvbmVudFwiLFxuICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTZUMTA6MDA6MDAuMDAwWlwiLFxuICAgIGVuZHNBdDogXCIyMDI2LTA5LTE2VDEwOjQ1OjAwLjAwMFpcIixcbiAgICB2ZW51ZTogXCJWZW51ZVwiLFxuICAgIGNvdXJ0OiBcIkNvdXJ0IDFcIixcbiAgICBjb2FjaElkOiBcImNvYWNoLTFcIixcbiAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgcmVzdWx0OiBcIldvbiAzLTFcIixcbiAgICByZXBvcnQ6IG51bGwsXG4gIH1dO1xuICBjb25zdCBhdWRpbyA9IEJ1ZmZlci5mcm9tKFwicmVjb3JkZWQgdm9pY2Ugbm90ZVwiKTtcbiAgY29uc3Qgc2F2ZWQ6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBieXRlczogQnVmZmVyOyBjb250ZW50VHlwZTogc3RyaW5nIH0+ID0gW107XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IHN0cnVjdHVyZWRDbG9uZShzdGF0ZSksXG4gICAgc2F2ZVN0YXRlOiBhc3luYyAoKSA9PiB1bmRlZmluZWQsXG4gICAgb2JqZWN0U3RvcmFnZToge1xuICAgICAgc2F2ZU9iamVjdDogYXN5bmMgKHBhdGgsIGJ5dGVzLCBjb250ZW50VHlwZSkgPT4ge1xuICAgICAgICBzYXZlZC5wdXNoKHsgcGF0aCwgYnl0ZXMsIGNvbnRlbnRUeXBlIH0pO1xuICAgICAgfSxcbiAgICAgIGdldE9iamVjdDogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgdXNlZFwiKTtcbiAgICAgIH0sXG4gICAgICBkZWxldGVPYmplY3Q6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIGF1dGhvcml6ZVN0YWZmOiAoX3JlcSwgX3JlcywgbmV4dCkgPT4gbmV4dCgpLFxuICB9KSk7XG4gIGNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIik7XG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzZXJ2ZXIub25jZShcImxpc3RlbmluZ1wiLCByZXNvbHZlKTtcbiAgICBzZXJ2ZXIub25jZShcImVycm9yXCIsIHJlamVjdCk7XG4gIH0pO1xuICBjb25zdCBhZGRyZXNzID0gc2VydmVyLmFkZHJlc3MoKTtcbiAgYXNzZXJ0KGFkZHJlc3MgJiYgdHlwZW9mIGFkZHJlc3MgIT09IFwic3RyaW5nXCIpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cDovLzEyNy4wLjAuMToke2FkZHJlc3MucG9ydH0vbWF0Y2hlcy9jb21wbGV0ZWQtbWF0Y2gvcmVwb3J0L2F1ZGlvYCxcbiAgICAgIHsgbWV0aG9kOiBcIlBPU1RcIiwgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImF1ZGlvL3dlYm1cIiB9LCBib2R5OiBhdWRpbyB9LFxuICAgICk7XG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLnN0YXR1cywgMjAwKTtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpIGFzIHsgb2JqZWN0UGF0aDogc3RyaW5nIH07XG4gICAgYXNzZXJ0Lm1hdGNoKGJvZHkub2JqZWN0UGF0aCwgL15cXC9vYmplY3RzXFwvdXBsb2Fkc1xcL1swLTlhLWYtXSskLyk7XG4gICAgYXNzZXJ0LmVxdWFsKHNhdmVkLmxlbmd0aCwgMSk7XG4gICAgYXNzZXJ0LmVxdWFsKHNhdmVkWzBdPy5wYXRoLCBib2R5Lm9iamVjdFBhdGgpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoc2F2ZWRbMF0/LmJ5dGVzLCBhdWRpbyk7XG4gICAgYXNzZXJ0LmVxdWFsKHNhdmVkWzBdPy5jb250ZW50VHlwZSwgXCJhdWRpby93ZWJtXCIpO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiAoZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSksXG4gICAgKTtcbiAgfVxufSk7XG5cbnRlc3QoXCJyZXBsYWNpbmcgcmVwb3J0IGF1ZGlvIGRlbGV0ZXMgdGhlIHByZXZpb3VzIG9iamVjdCBhZnRlciBwZXJzaXN0ZW5jZVwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHByZXZpb3VzQXVkaW9QYXRoID0gXCIvb2JqZWN0cy91cGxvYWRzLzExMTExMTExLTExMTEtNDExMS04MTExLTExMTExMTExMTExMVwiO1xuICBjb25zdCByZXBsYWNlbWVudEF1ZGlvUGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy8yMjIyMjIyMi0yMjIyLTQyMjItODIyMi0yMjIyMjIyMjIyMjJcIjtcbiAgY29uc3Qgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUubWF0Y2hlcyA9IFt7XG4gICAgaWQ6IFwiY29tcGxldGVkLW1hdGNoXCIsXG4gICAgZXh0ZXJuYWxJZDogbnVsbCxcbiAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgIG9wcG9uZW50OiBcIk9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsXG4gICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTA6NDU6MDAuMDAwWlwiLFxuICAgIHZlbnVlOiBcIlZlbnVlXCIsXG4gICAgY291cnQ6IFwiQ291cnQgMVwiLFxuICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICByZXN1bHQ6IFwiV29uIDMtMVwiLFxuICAgIHJlcG9ydDoge1xuICAgICAgbWF0Y2hJZDogXCJjb21wbGV0ZWQtbWF0Y2hcIixcbiAgICAgIG9ic2VydmF0aW9uczogW1wiT2xkIG9ic2VydmF0aW9uLlwiXSxcbiAgICAgIHRyYW5zY3JpcHQ6IG51bGwsXG4gICAgICBhdWRpb1BhdGg6IHByZXZpb3VzQXVkaW9QYXRoLFxuICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTE6MDA6MDAuMDAwWlwiLFxuICAgIH0sXG4gIH1dO1xuICBjb25zdCBldmVudHM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHN0b3JlZE9iamVjdHMgPSBuZXcgU2V0KFtwcmV2aW91c0F1ZGlvUGF0aCwgcmVwbGFjZW1lbnRBdWRpb1BhdGhdKTtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgYXBwLnVzZSgocmVxLCBfcmVzLCBuZXh0KSA9PiB7XG4gICAgcmVxLmxvZyA9IHsgZXJyb3I6ICgpID0+IHVuZGVmaW5lZCB9IGFzIHVua25vd24gYXMgdHlwZW9mIHJlcS5sb2c7XG4gICAgbmV4dCgpO1xuICB9KTtcbiAgYXBwLnVzZShjcmVhdGVUcmFja2VyUm91dGVyKHtcbiAgICBnZXRTdGF0ZTogYXN5bmMgKCkgPT4gc3RydWN0dXJlZENsb25lKHN0YXRlKSxcbiAgICBzYXZlU3RhdGU6IGFzeW5jIChuZXh0KSA9PiB7XG4gICAgICBldmVudHMucHVzaChcInBlcnNpc3RcIik7XG4gICAgICBPYmplY3QuYXNzaWduKHN0YXRlLCBzdHJ1Y3R1cmVkQ2xvbmUobmV4dCkpO1xuICAgIH0sXG4gICAgb2JqZWN0U3RvcmFnZToge1xuICAgICAgc2F2ZU9iamVjdDogYXN5bmMgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgZ2V0T2JqZWN0OiBhc3luYyAocGF0aCkgPT4ge1xuICAgICAgICBpZiAoIXN0b3JlZE9iamVjdHMuaGFzKHBhdGgpKSB0aHJvdyBuZXcgRXJyb3IoXCJub3QgZm91bmRcIik7XG4gICAgICAgIHJldHVybiB7fSBhcyBuZXZlcjtcbiAgICAgIH0sXG4gICAgICBkZWxldGVPYmplY3Q6IGFzeW5jIChwYXRoKSA9PiB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGBkZWxldGU6JHtwYXRofWApO1xuICAgICAgICBzdG9yZWRPYmplY3RzLmRlbGV0ZShwYXRoKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhdXRob3JpemVTdGFmZjogKF9yZXEsIF9yZXMsIG5leHQpID0+IG5leHQoKSxcbiAgfSkpO1xuICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDAsIFwiMTI3LjAuMC4xXCIpO1xuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2VydmVyLm9uY2UoXCJsaXN0ZW5pbmdcIiwgcmVzb2x2ZSk7XG4gICAgc2VydmVyLm9uY2UoXCJlcnJvclwiLCByZWplY3QpO1xuICB9KTtcbiAgY29uc3QgYWRkcmVzcyA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIGFzc2VydChhZGRyZXNzICYmIHR5cGVvZiBhZGRyZXNzICE9PSBcInN0cmluZ1wiKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkcmVzcy5wb3J0fS9tYXRjaGVzL2NvbXBsZXRlZC1tYXRjaC9yZXBvcnRgLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG9ic2VydmF0aW9uczogW1wiTmV3IG9ic2VydmF0aW9uLlwiLCBcIlJlY292ZXJlZCB0byB0aGUgVC5cIiwgXCJTdGF5ZWQgY29tcG9zZWQuXCJdLFxuICAgICAgICBhdWRpb1BhdGg6IHJlcGxhY2VtZW50QXVkaW9QYXRoLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLnN0YXR1cywgMjAwKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGV2ZW50cywgW1wicGVyc2lzdFwiLCBgZGVsZXRlOiR7cHJldmlvdXNBdWRpb1BhdGh9YF0pO1xuICAgIGFzc2VydC5lcXVhbChzdGF0ZS5tYXRjaGVzWzBdPy5yZXBvcnQ/LmF1ZGlvUGF0aCwgcmVwbGFjZW1lbnRBdWRpb1BhdGgpO1xuXG4gICAgY29uc3Qgc3RhbGVSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9L21hdGNoZXMvY29tcGxldGVkLW1hdGNoL3JlcG9ydGAsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgb2JzZXJ2YXRpb25zOiBbXCJTdGFsZSBlZGl0LlwiLCBcIlJlY292ZXJlZCB0byB0aGUgVC5cIiwgXCJTdGF5ZWQgY29tcG9zZWQuXCJdLFxuICAgICAgICAgIGF1ZGlvUGF0aDogcHJldmlvdXNBdWRpb1BhdGgsXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICApO1xuICAgIGFzc2VydC5lcXVhbChzdGFsZVJlc3BvbnNlLnN0YXR1cywgNDAwKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUubWF0Y2hlc1swXT8ucmVwb3J0Py5hdWRpb1BhdGgsIHJlcGxhY2VtZW50QXVkaW9QYXRoKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RvcmVkT2JqZWN0cy5oYXMocmVwbGFjZW1lbnRBdWRpb1BhdGgpLCB0cnVlKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgc2VydmVyLmNsb3NlKChlcnJvcikgPT4gZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSxcbiAgICApO1xuICB9XG59KTtcblxudGVzdChcImZhaWxlZCByZXBvcnQgcGVyc2lzdGVuY2UgcmV0YWlucyB0aGUgcHJldmlvdXMgdm9pY2Ugbm90ZVwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHByZXZpb3VzQXVkaW9QYXRoID0gXCIvb2JqZWN0cy91cGxvYWRzLzExMTExMTExLTExMTEtNDExMS04MTExLTExMTExMTExMTExMVwiO1xuICBjb25zdCBzdGF0ZSA9IGhlYWx0aHlTdGF0ZSgpO1xuICBzdGF0ZS5tYXRjaGVzID0gW3tcbiAgICBpZDogXCJjb21wbGV0ZWQtbWF0Y2hcIixcbiAgICBleHRlcm5hbElkOiBudWxsLFxuICAgIHBsYXllcklkOiBcInBsYXllci0xXCIsXG4gICAgb3Bwb25lbnQ6IFwiT3Bwb25lbnRcIixcbiAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE2VDEwOjAwOjAwLjAwMFpcIixcbiAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xNlQxMDo0NTowMC4wMDBaXCIsXG4gICAgdmVudWU6IFwiVmVudWVcIixcbiAgICBjb3VydDogXCJDb3VydCAxXCIsXG4gICAgY29hY2hJZDogXCJjb2FjaC0xXCIsXG4gICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgIHJlc3VsdDogXCJXb24gMy0xXCIsXG4gICAgcmVwb3J0OiB7XG4gICAgICBtYXRjaElkOiBcImNvbXBsZXRlZC1tYXRjaFwiLFxuICAgICAgb2JzZXJ2YXRpb25zOiBbXCJPbGQgb2JzZXJ2YXRpb24uXCJdLFxuICAgICAgdHJhbnNjcmlwdDogbnVsbCxcbiAgICAgIGF1ZGlvUGF0aDogcHJldmlvdXNBdWRpb1BhdGgsXG4gICAgICB1cGRhdGVkQXQ6IFwiMjAyNi0wOS0xNlQxMTowMDowMC4wMDBaXCIsXG4gICAgfSxcbiAgfV07XG4gIGNvbnN0IGRlbGV0ZWQ6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IHN0cnVjdHVyZWRDbG9uZShzdGF0ZSksXG4gICAgc2F2ZVN0YXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhYmFzZSB1bmF2YWlsYWJsZVwiKTtcbiAgICB9LFxuICAgIG9iamVjdFN0b3JhZ2U6IHtcbiAgICAgIHNhdmVPYmplY3Q6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICAgIGdldE9iamVjdDogYXN5bmMgKCkgPT4gKHt9KSBhcyBuZXZlcixcbiAgICAgIGRlbGV0ZU9iamVjdDogYXN5bmMgKHBhdGgpID0+IHtcbiAgICAgICAgZGVsZXRlZC5wdXNoKHBhdGgpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGF1dGhvcml6ZVN0YWZmOiAoX3JlcSwgX3JlcywgbmV4dCkgPT4gbmV4dCgpLFxuICB9KSk7XG4gIGNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIik7XG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzZXJ2ZXIub25jZShcImxpc3RlbmluZ1wiLCByZXNvbHZlKTtcbiAgICBzZXJ2ZXIub25jZShcImVycm9yXCIsIHJlamVjdCk7XG4gIH0pO1xuICBjb25zdCBhZGRyZXNzID0gc2VydmVyLmFkZHJlc3MoKTtcbiAgYXNzZXJ0KGFkZHJlc3MgJiYgdHlwZW9mIGFkZHJlc3MgIT09IFwic3RyaW5nXCIpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9L21hdGNoZXMvY29tcGxldGVkLW1hdGNoL3JlcG9ydGAsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgb2JzZXJ2YXRpb25zOiBbXCJOZXcgb2JzZXJ2YXRpb24uXCIsIFwiUmVjb3ZlcmVkIHRvIHRoZSBULlwiLCBcIlN0YXllZCBjb21wb3NlZC5cIl0sXG4gICAgICAgIGF1ZGlvUGF0aDogXCIvb2JqZWN0cy91cGxvYWRzLzIyMjIyMjIyLTIyMjItNDIyMi04MjIyLTIyMjIyMjIyMjIyMlwiLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLnN0YXR1cywgNTAwKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGRlbGV0ZWQsIFtdKTtcbiAgICBhc3NlcnQuZXF1YWwoc3RhdGUubWF0Y2hlc1swXT8ucmVwb3J0Py5hdWRpb1BhdGgsIHByZXZpb3VzQXVkaW9QYXRoKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgc2VydmVyLmNsb3NlKChlcnJvcikgPT4gZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSxcbiAgICApO1xuICB9XG59KTtcblxudGVzdChcInZvaWNlIG5vdGUgY2xlYW51cCBmYWlsdXJlIGlzIGxvZ2dlZCB3aXRob3V0IGZhaWxpbmcgdGhlIHNhdmVkIHJlcG9ydFwiLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHByZXZpb3VzQXVkaW9QYXRoID0gXCIvb2JqZWN0cy91cGxvYWRzLzExMTExMTExLTExMTEtNDExMS04MTExLTExMTExMTExMTExMVwiO1xuICBjb25zdCByZXBsYWNlbWVudEF1ZGlvUGF0aCA9IFwiL29iamVjdHMvdXBsb2Fkcy8yMjIyMjIyMi0yMjIyLTQyMjItODIyMi0yMjIyMjIyMjIyMjJcIjtcbiAgY29uc3Qgc3RhdGUgPSBoZWFsdGh5U3RhdGUoKTtcbiAgc3RhdGUubWF0Y2hlcyA9IFt7XG4gICAgaWQ6IFwiY29tcGxldGVkLW1hdGNoXCIsXG4gICAgZXh0ZXJuYWxJZDogbnVsbCxcbiAgICBwbGF5ZXJJZDogXCJwbGF5ZXItMVwiLFxuICAgIG9wcG9uZW50OiBcIk9wcG9uZW50XCIsXG4gICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxMDowMDowMC4wMDBaXCIsXG4gICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTA6NDU6MDAuMDAwWlwiLFxuICAgIHZlbnVlOiBcIlZlbnVlXCIsXG4gICAgY291cnQ6IFwiQ291cnQgMVwiLFxuICAgIGNvYWNoSWQ6IFwiY29hY2gtMVwiLFxuICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICByZXN1bHQ6IFwiV29uIDMtMVwiLFxuICAgIHJlcG9ydDoge1xuICAgICAgbWF0Y2hJZDogXCJjb21wbGV0ZWQtbWF0Y2hcIixcbiAgICAgIG9ic2VydmF0aW9uczogW1wiT2xkIG9ic2VydmF0aW9uLlwiXSxcbiAgICAgIHRyYW5zY3JpcHQ6IG51bGwsXG4gICAgICBhdWRpb1BhdGg6IHByZXZpb3VzQXVkaW9QYXRoLFxuICAgICAgdXBkYXRlZEF0OiBcIjIwMjYtMDktMTZUMTE6MDA6MDAuMDAwWlwiLFxuICAgIH0sXG4gIH1dO1xuICBjb25zdCBsb2dnZWQ6IEFycmF5PFt1bmtub3duLCBzdHJpbmddPiA9IFtdO1xuICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuICBhcHAudXNlKChyZXEsIF9yZXMsIG5leHQpID0+IHtcbiAgICByZXEubG9nID0ge1xuICAgICAgZXJyb3I6IChkZXRhaWxzOiB1bmtub3duLCBtZXNzYWdlOiBzdHJpbmcpID0+IGxvZ2dlZC5wdXNoKFtkZXRhaWxzLCBtZXNzYWdlXSksXG4gICAgfSBhcyB1bmtub3duIGFzIHR5cGVvZiByZXEubG9nO1xuICAgIG5leHQoKTtcbiAgfSk7XG4gIGFwcC51c2UoY3JlYXRlVHJhY2tlclJvdXRlcih7XG4gICAgZ2V0U3RhdGU6IGFzeW5jICgpID0+IHN0cnVjdHVyZWRDbG9uZShzdGF0ZSksXG4gICAgc2F2ZVN0YXRlOiBhc3luYyAobmV4dCkgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgc3RydWN0dXJlZENsb25lKG5leHQpKTtcbiAgICB9LFxuICAgIG9iamVjdFN0b3JhZ2U6IHtcbiAgICAgIHNhdmVPYmplY3Q6IGFzeW5jICgpID0+IHVuZGVmaW5lZCxcbiAgICAgIGdldE9iamVjdDogYXN5bmMgKCkgPT4gKHt9KSBhcyBuZXZlcixcbiAgICAgIGRlbGV0ZU9iamVjdDogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdG9yYWdlIHVuYXZhaWxhYmxlXCIpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGF1dGhvcml6ZVN0YWZmOiAoX3JlcSwgX3JlcywgbmV4dCkgPT4gbmV4dCgpLFxuICB9KSk7XG4gIGNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oMCwgXCIxMjcuMC4wLjFcIik7XG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzZXJ2ZXIub25jZShcImxpc3RlbmluZ1wiLCByZXNvbHZlKTtcbiAgICBzZXJ2ZXIub25jZShcImVycm9yXCIsIHJlamVjdCk7XG4gIH0pO1xuICBjb25zdCBhZGRyZXNzID0gc2VydmVyLmFkZHJlc3MoKTtcbiAgYXNzZXJ0KGFkZHJlc3MgJiYgdHlwZW9mIGFkZHJlc3MgIT09IFwic3RyaW5nXCIpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9L21hdGNoZXMvY29tcGxldGVkLW1hdGNoL3JlcG9ydGAsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgb2JzZXJ2YXRpb25zOiBbXCJOZXcgb2JzZXJ2YXRpb24uXCIsIFwiUmVjb3ZlcmVkIHRvIHRoZSBULlwiLCBcIlN0YXllZCBjb21wb3NlZC5cIl0sXG4gICAgICAgIGF1ZGlvUGF0aDogcmVwbGFjZW1lbnRBdWRpb1BhdGgsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2Uuc3RhdHVzLCAyMDApO1xuICAgIGFzc2VydC5lcXVhbChzdGF0ZS5tYXRjaGVzWzBdPy5yZXBvcnQ/LmF1ZGlvUGF0aCwgcmVwbGFjZW1lbnRBdWRpb1BhdGgpO1xuICAgIGFzc2VydC5lcXVhbChsb2dnZWQubGVuZ3RoLCAxKTtcbiAgICBhc3NlcnQuZXF1YWwobG9nZ2VkWzBdPy5bMV0sIFwiQ291bGQgbm90IHJlbW92ZSByZXBsYWNlZCBjb2FjaCB2b2ljZSBub3RlXCIpO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBzZXJ2ZXIuY2xvc2UoKGVycm9yKSA9PiBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKCkpLFxuICAgICk7XG4gIH1cbn0pO1xuXG50ZXN0KFwibm9ybWFsIHN1Y2Nlc3NmdWwgcmVmcmVzaCBzZW5kcyBubyBzdGFmZiB3ZWJob29rXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxGZXRjaCA9IGdsb2JhbFRoaXMuZmV0Y2g7XG4gIGNvbnN0IG9yaWdpbmFsU2NoZWR1bGVVcmwgPSBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXTtcbiAgY29uc3Qgb3JpZ2luYWxXZWJob29rVXJsID0gcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXTtcbiAgbGV0IHdlYmhvb2tSZXF1ZXN0cyA9IDA7XG5cbiAgcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl0gPSBcImh0dHBzOi8vc2NoZWR1bGUudGVzdC9mZWVkXCI7XG4gIHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl0gPSBcImh0dHBzOi8vYWxlcnRzLnRlc3QvaG9va1wiO1xuICBnbG9iYWxUaGlzLmZldGNoID0gYXN5bmMgKGlucHV0KSA9PiB7XG4gICAgaWYgKFN0cmluZyhpbnB1dCkgPT09IFwiaHR0cHM6Ly9zY2hlZHVsZS50ZXN0L2ZlZWRcIikge1xuICAgICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBtYXRjaGVzOiBbXSB9KTtcbiAgICB9XG4gICAgd2ViaG9va1JlcXVlc3RzICs9IDE7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjA0IH0pO1xuICB9O1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgd2l0aFRyYWNrZXJTZXJ2ZXIoaGVhbHRoeVN0YXRlKCksIGFzeW5jICh1cmwpID0+IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb3JpZ2luYWxGZXRjaChgJHt1cmx9L3RyYWNrZXIvcmVmcmVzaGAsIHsgbWV0aG9kOiBcIlBPU1RcIiB9KTtcbiAgICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5zdGF0dXMsIDIwMCk7XG4gICAgICBhc3NlcnQuZXF1YWwod2ViaG9va1JlcXVlc3RzLCAwKTtcbiAgICB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICBnbG9iYWxUaGlzLmZldGNoID0gb3JpZ2luYWxGZXRjaDtcbiAgICBpZiAob3JpZ2luYWxTY2hlZHVsZVVybCA9PT0gdW5kZWZpbmVkKSBkZWxldGUgcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9TQ0hFRFVMRV9VUkxcIl07XG4gICAgZWxzZSBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXSA9IG9yaWdpbmFsU2NoZWR1bGVVcmw7XG4gICAgaWYgKG9yaWdpbmFsV2ViaG9va1VybCA9PT0gdW5kZWZpbmVkKSBkZWxldGUgcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXTtcbiAgICBlbHNlIHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl0gPSBvcmlnaW5hbFdlYmhvb2tVcmw7XG4gIH1cbn0pOyIsICJpbXBvcnQgZXhwcmVzcywgeyBSb3V0ZXIsIHR5cGUgSVJvdXRlciwgdHlwZSBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyByYW5kb21VVUlEIH0gZnJvbSBcIm5vZGU6Y3J5cHRvXCI7XG5pbXBvcnQgeyBlcSB9IGZyb20gXCJkcml6emxlLW9ybVwiO1xuaW1wb3J0IHtcbiAgR2V0VHJhY2tlclJlc3BvbnNlLFxuICBQZXJzaXN0ZWRUcmFja2VyU3RhdGUsXG4gIEdldFRyYWNrZXJIZWFsdGhSZXNwb25zZSxcbiAgR2V0UGxheWVyVHJhY2tlclBhcmFtcyxcbiAgR2V0UGxheWVyVHJhY2tlclJlc3BvbnNlLFxuICBSZWZyZXNoVHJhY2tlclJlc3BvbnNlLFxuICBVcGxvYWRUcmFja2VyTG9nb1Jlc3BvbnNlLFxuICBVcGxvYWRDb2FjaFJlcG9ydEF1ZGlvUGFyYW1zLFxuICBVcGxvYWRDb2FjaFJlcG9ydEF1ZGlvUmVzcG9uc2UsXG4gIFNhdmVDb2FjaFJlcG9ydEJvZHksXG4gIFNhdmVDb2FjaFJlcG9ydFBhcmFtcyxcbiAgU2F2ZUNvYWNoUmVwb3J0UmVzcG9uc2UsXG4gIFNhdmVUcmFja2VyU2V0dGluZ3NCb2R5LFxuICBTYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2UsXG4gIFVwZGF0ZU1hdGNoQm9keSxcbiAgVXBkYXRlTWF0Y2hQYXJhbXMsXG4gIFVwZGF0ZU1hdGNoUmVzcG9uc2UsXG4gIHR5cGUgUGVyc2lzdGVkVHJhY2tlclN0YXRlIGFzIFBlcnNpc3RlZFRyYWNrZXJTbmFwc2hvdCxcbn0gZnJvbSBcIkB3b3Jrc3BhY2UvYXBpLXpvZFwiO1xuaW1wb3J0IHtcbiAgY2xlYXJSZWZyZXNoRmFpbHVyZXMsXG4gIGNsb25lVHJhY2tlclN0YXRlLFxuICBmcmVlemVUcmFja2VyU3RhdGUsXG4gIG1lcmdlQ2x1YkxvY2tlckZlZWQsXG4gIHBhcnNlQ2x1YkxvY2tlckZlZWQsXG4gIHJlY29yZFJlZnJlc2hGYWlsdXJlLFxuICB0eXBlIFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQsXG4gIHR5cGUgUmVhZG9ubHlUcmFja2VyU3RhdGUsXG4gIHR5cGUgUmVmcmVzaFJlY292ZXJ5LFxuICB0eXBlIFRyYWNrZXJTdGF0ZSxcbn0gZnJvbSBcIi4uL2xpYi9jbHViLWxvY2tlci5qc1wiO1xuaW1wb3J0IHsgT2JqZWN0U3RvcmFnZVNlcnZpY2UgfSBmcm9tIFwiLi4vbGliL29iamVjdC1zdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyByZXF1aXJlU3RhZmYgfSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcmVxdWlyZVN0YWZmLmpzXCI7XG5cbmNvbnN0IElOSVRJQUxfU1RBVEU6IFRyYWNrZXJTdGF0ZSA9IHtcbiAgcGxheWVyczogW3sgaWQ6IFwiY2FtZXJvbi1zdGFpdFwiLCBuYW1lOiBcIkNhbWVyb24gU3RhaXRcIiB9XSxcbiAgY29hY2hlczogW1xuICAgIHsgaWQ6IFwiYWxleFwiLCBuYW1lOiBcIkFsZXhcIiB9LFxuICAgIHsgaWQ6IFwibmFyZWxsZVwiLCBuYW1lOiBcIk5hcmVsbGVcIiB9LFxuICAgIHsgaWQ6IFwicm9iXCIsIG5hbWU6IFwiUm9iXCIgfSxcbiAgICB7IGlkOiBcImphbWllXCIsIG5hbWU6IFwiSmFtaWVcIiB9LFxuICAgIHsgaWQ6IFwibmljb1wiLCBuYW1lOiBcIk5pY29cIiB9LFxuICAgIHsgaWQ6IFwidW5hc3NpZ25lZFwiLCBuYW1lOiBcIlVuYXNzaWduZWRcIiB9LFxuICBdLFxuICBicmFuZGluZzogeyBuYW1lOiBcIlN0YWl0U3F1YXNoXCIsIGxvZ29QYXRoOiBudWxsIH0sXG4gIG1hdGNoZXM6IFtcbiAgICB7XG4gICAgICBpZDogXCJtYXRjaC0xXCIsXG4gICAgICBleHRlcm5hbElkOiBudWxsLFxuICAgICAgcGxheWVySWQ6IFwiY2FtZXJvbi1zdGFpdFwiLFxuICAgICAgb3Bwb25lbnQ6IFwiRXRoYW4gQ29sZVwiLFxuICAgICAgc3RhcnRzQXQ6IFwiMjAyNi0wOS0xNlQxNDozMDowMC0wNDowMFwiLFxuICAgICAgZW5kc0F0OiBcIjIwMjYtMDktMTZUMTU6MTU6MDAtMDQ6MDBcIixcbiAgICAgIHZlbnVlOiBcIkFybGVuIFNwZWN0ZXIgVVMgU3F1YXNoIENlbnRlclwiLFxuICAgICAgY291cnQ6IFwiQ291cnQgNlwiLFxuICAgICAgY29hY2hJZDogXCJhbGV4XCIsXG4gICAgICBzdGF0dXM6IFwidXBjb21pbmdcIixcbiAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgIHJlcG9ydDogbnVsbCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiBcIm1hdGNoLTJcIixcbiAgICAgIGV4dGVybmFsSWQ6IG51bGwsXG4gICAgICBwbGF5ZXJJZDogXCJjYW1lcm9uLXN0YWl0XCIsXG4gICAgICBvcHBvbmVudDogXCJNaWxlcyBCcmVubmFuXCIsXG4gICAgICBzdGFydHNBdDogXCIyMDI2LTA5LTE3VDEwOjAwOjAwLTA0OjAwXCIsXG4gICAgICBlbmRzQXQ6IFwiMjAyNi0wOS0xN1QxMDo0NTowMC0wNDowMFwiLFxuICAgICAgdmVudWU6IFwiUGVubiBTcXVhc2ggQ2VudGVyXCIsXG4gICAgICBjb3VydDogXCJDb3VydCAzXCIsXG4gICAgICBjb2FjaElkOiBcInVuYXNzaWduZWRcIixcbiAgICAgIHN0YXR1czogXCJ1cGNvbWluZ1wiLFxuICAgICAgcmVzdWx0OiBudWxsLFxuICAgICAgcmVwb3J0OiBudWxsLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwibWF0Y2gtMFwiLFxuICAgICAgZXh0ZXJuYWxJZDogbnVsbCxcbiAgICAgIHBsYXllcklkOiBcImNhbWVyb24tc3RhaXRcIixcbiAgICAgIG9wcG9uZW50OiBcIkpvcmRhbiBMZWVcIixcbiAgICAgIHN0YXJ0c0F0OiBcIjIwMjYtMDktMTVUMDk6MDA6MDAtMDQ6MDBcIixcbiAgICAgIGVuZHNBdDogXCIyMDI2LTA5LTE1VDA5OjQyOjAwLTA0OjAwXCIsXG4gICAgICB2ZW51ZTogXCJBcmxlbiBTcGVjdGVyIFVTIFNxdWFzaCBDZW50ZXJcIixcbiAgICAgIGNvdXJ0OiBcIkNvdXJ0IDJcIixcbiAgICAgIGNvYWNoSWQ6IFwibmFyZWxsZVwiLFxuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgcmVzdWx0OiBcIldvbiAzXHUyMDEzMVwiLFxuICAgICAgcmVwb3J0OiBudWxsLFxuICAgIH0sXG4gIF0sXG4gIGxhc3RVcGRhdGVkQXQ6IFwiMjAyNi0wOS0xNVQxMjowMDowMC0wNDowMFwiLFxuICBzb3VyY2U6IFwic2FtcGxlXCIsXG4gIHJlZnJlc2hIZWFsdGg6IHtcbiAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiAwLFxuICAgIGFsZXJ0VGhyZXNob2xkOiAzLFxuICAgIGZpcnN0RmFpbHVyZUF0OiBudWxsLFxuICAgIGxhc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgYWxlcnRTZW50QXQ6IG51bGwsXG4gICAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OiBudWxsLFxuICAgIHBlbmRpbmdSZWNvdmVyaWVzOiBbXSxcbiAgICByZWNvdmVyeUNsYWltOiBudWxsLFxuICB9LFxufTtcblxuZnVuY3Rpb24gZ2V0QWxlcnRUaHJlc2hvbGQoKTogbnVtYmVyIHtcbiAgY29uc3QgY29uZmlndXJlZCA9IE51bWJlci5wYXJzZUludChcbiAgICBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX0FMRVJUX1RIUkVTSE9MRFwiXSA/PyBcIlwiLFxuICAgIDEwLFxuICApO1xuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihjb25maWd1cmVkKSAmJiBjb25maWd1cmVkID4gMCA/IGNvbmZpZ3VyZWQgOiAzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQZXJzaXN0ZWRUcmFja2VyU3RhdGUoXG4gIHZhbHVlOiB1bmtub3duLFxuKTogUGVyc2lzdGVkVHJhY2tlclNuYXBzaG90IHtcbiAgY29uc3QgcmVzdWx0ID0gUGVyc2lzdGVkVHJhY2tlclN0YXRlLnNhZmVQYXJzZSh2YWx1ZSk7XG4gIGlmIChyZXN1bHQuc3VjY2VzcykgcmV0dXJuIHJlc3VsdC5kYXRhO1xuXG4gIGNvbnN0IGRldGFpbHMgPSByZXN1bHQuZXJyb3IuaXNzdWVzXG4gICAgLm1hcCgoaXNzdWUpID0+IGAke2lzc3VlLnBhdGguam9pbihcIi5cIikgfHwgXCI8cm9vdD5cIn06ICR7aXNzdWUubWVzc2FnZX1gKVxuICAgIC5qb2luKFwiOyBcIik7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICBgU3RvcmVkIHRyYWNrZXIgc25hcHNob3QgaXMgaW52YWxpZC4gUmVwYWlyIG9yIHJlcGxhY2UgdGhlIFwibWFpblwiIHRyYWNrZXJfc3RhdGUgcmVjb3JkLiBWYWxpZGF0aW9uIGVycm9yczogJHtkZXRhaWxzfWAsXG4gICk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0YXRlKHN0YXRlOiBQZXJzaXN0ZWRUcmFja2VyU25hcHNob3QpOiBSZWFkb25seVRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IGFsZXJ0VGhyZXNob2xkID0gZ2V0QWxlcnRUaHJlc2hvbGQoKTtcbiAgY29uc3Qgc3RvcmVkQnJhbmRpbmcgPSBzdGF0ZS5icmFuZGluZztcbiAgY29uc3Qgc3RvcmVkUmVmcmVzaEhlYWx0aCA9IHN0YXRlLnJlZnJlc2hIZWFsdGg7XG4gIHJldHVybiBmcmVlemVUcmFja2VyU3RhdGUoe1xuICAgIHBsYXllcnM6IHN0YXRlLnBsYXllcnMubWFwKChwbGF5ZXIpID0+ICh7IC4uLnBsYXllciB9KSksXG4gICAgY29hY2hlczogc3RhdGUuY29hY2hlcy5tYXAoKGNvYWNoKSA9PiAoeyAuLi5jb2FjaCB9KSksXG4gICAgYnJhbmRpbmc6IHN0b3JlZEJyYW5kaW5nXG4gICAgICA/IHtcbiAgICAgICAgICBuYW1lOiBzdG9yZWRCcmFuZGluZy5uYW1lLFxuICAgICAgICAgIGxvZ29QYXRoOiBzdG9yZWRCcmFuZGluZy5sb2dvUGF0aCA/PyBudWxsLFxuICAgICAgICB9XG4gICAgICA6IHsgbmFtZTogXCJTdGFpdFNxdWFzaFwiLCBsb2dvUGF0aDogbnVsbCB9LFxuICAgIG1hdGNoZXM6IHN0YXRlLm1hdGNoZXMubWFwKChtYXRjaCkgPT4gKHtcbiAgICAgIC4uLm1hdGNoLFxuICAgICAgcmVwb3J0OiBtYXRjaC5yZXBvcnRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICAuLi5tYXRjaC5yZXBvcnQsXG4gICAgICAgICAgICBvYnNlcnZhdGlvbnM6IFsuLi5tYXRjaC5yZXBvcnQub2JzZXJ2YXRpb25zXSxcbiAgICAgICAgICAgIGF1ZGlvUGF0aDogbWF0Y2gucmVwb3J0LmF1ZGlvUGF0aCA/PyBudWxsLFxuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsLFxuICAgIH0pKSxcbiAgICBsYXN0VXBkYXRlZEF0OiBzdGF0ZS5sYXN0VXBkYXRlZEF0LFxuICAgIHNvdXJjZTogc3RhdGUuc291cmNlLFxuICAgIHJlZnJlc2hIZWFsdGg6IHN0YXRlLnJlZnJlc2hIZWFsdGhcbiAgICAgID8ge1xuICAgICAgICAgIC4uLnN0YXRlLnJlZnJlc2hIZWFsdGgsXG4gICAgICAgICAgZmlyc3RGYWlsdXJlQXQ6XG4gICAgICAgICAgICBzdGF0ZS5yZWZyZXNoSGVhbHRoLmZpcnN0RmFpbHVyZUF0ID8/XG4gICAgICAgICAgICAoc3RhdGUucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzID4gMFxuICAgICAgICAgICAgICA/IHN0YXRlLnJlZnJlc2hIZWFsdGgubGFzdEZhaWx1cmVBdFxuICAgICAgICAgICAgICA6IG51bGwpLFxuICAgICAgICAgIHBlbmRpbmdSZWNvdmVyaWVzOlxuICAgICAgICAgICAgc3RvcmVkUmVmcmVzaEhlYWx0aD8ucGVuZGluZ1JlY292ZXJpZXM/Lm1hcCgocmVjb3ZlcnkpID0+ICh7XG4gICAgICAgICAgICAgIC4uLnJlY292ZXJ5LFxuICAgICAgICAgICAgfSkpID8/XG4gICAgICAgICAgICAoc3RvcmVkUmVmcmVzaEhlYWx0aD8ucGVuZGluZ1JlY292ZXJ5XG4gICAgICAgICAgICAgID8gW3sgLi4uc3RvcmVkUmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcnkgfV1cbiAgICAgICAgICAgICAgOiBbXSksXG4gICAgICAgICAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OlxuICAgICAgICAgICAgc3RvcmVkUmVmcmVzaEhlYWx0aD8uZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0ID8/IG51bGwsXG4gICAgICAgICAgcmVjb3ZlcnlDbGFpbTogc3RvcmVkUmVmcmVzaEhlYWx0aD8ucmVjb3ZlcnlDbGFpbVxuICAgICAgICAgICAgPyB7IC4uLnN0b3JlZFJlZnJlc2hIZWFsdGgucmVjb3ZlcnlDbGFpbSB9XG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIGNvbnNlY3V0aXZlRmFpbHVyZXM6IDAsXG4gICAgICAgICAgYWxlcnRUaHJlc2hvbGQsXG4gICAgICAgICAgZmlyc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgICAgICAgbGFzdEZhaWx1cmVBdDogbnVsbCxcbiAgICAgICAgICBhbGVydFNlbnRBdDogbnVsbCxcbiAgICAgICAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IG51bGwsXG4gICAgICAgICAgcGVuZGluZ1JlY292ZXJpZXM6IFtdLFxuICAgICAgICAgIHJlY292ZXJ5Q2xhaW06IG51bGwsXG4gICAgICAgIH0sXG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTdGF0ZSgpOiBQcm9taXNlPFJlYWRvbmx5VHJhY2tlclN0YXRlPiB7XG4gIGNvbnN0IHsgZGIsIHRyYWNrZXJTdGF0ZVRhYmxlIH0gPSBhd2FpdCBpbXBvcnQoXCJAd29ya3NwYWNlL2RiXCIpO1xuICBjb25zdCBbcm93XSA9IGF3YWl0IGRiXG4gICAgLnNlbGVjdCgpXG4gICAgLmZyb20odHJhY2tlclN0YXRlVGFibGUpXG4gICAgLndoZXJlKGVxKHRyYWNrZXJTdGF0ZVRhYmxlLmlkLCBcIm1haW5cIikpO1xuXG4gIGlmIChyb3cpIHJldHVybiBub3JtYWxpemVTdGF0ZShwYXJzZVBlcnNpc3RlZFRyYWNrZXJTdGF0ZShyb3cuZGF0YSkpO1xuXG4gIGNvbnN0IFtjcmVhdGVkXSA9IGF3YWl0IGRiXG4gICAgLmluc2VydCh0cmFja2VyU3RhdGVUYWJsZSlcbiAgICAudmFsdWVzKHsgaWQ6IFwibWFpblwiLCBkYXRhOiBJTklUSUFMX1NUQVRFIH0pXG4gICAgLnJldHVybmluZygpO1xuXG4gIHJldHVybiBub3JtYWxpemVTdGF0ZShwYXJzZVBlcnNpc3RlZFRyYWNrZXJTdGF0ZShjcmVhdGVkLmRhdGEpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZVN0YXRlKHN0YXRlOiBUcmFja2VyU3RhdGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgeyBkYiwgdHJhY2tlclN0YXRlVGFibGUgfSA9IGF3YWl0IGltcG9ydChcIkB3b3Jrc3BhY2UvZGJcIik7XG4gIGF3YWl0IGRiXG4gICAgLnVwZGF0ZSh0cmFja2VyU3RhdGVUYWJsZSlcbiAgICAuc2V0KHsgZGF0YTogc3RhdGUsIHVwZGF0ZWRBdDogbmV3IERhdGUoKSB9KVxuICAgIC53aGVyZShlcSh0cmFja2VyU3RhdGVUYWJsZS5pZCwgXCJtYWluXCIpKTtcbn1cblxudHlwZSBTdGF0ZU11dGF0aW9uT3BlcmF0aW9uPFQ+ID0gKFxuICBsb2FkU3RhdGU6ICgpID0+IFByb21pc2U8UmVhZG9ubHlUcmFja2VyU3RhdGU+LFxuICBzYXZlU3RhdGU6IChzdGF0ZTogVHJhY2tlclN0YXRlKSA9PiBQcm9taXNlPHZvaWQ+LFxuKSA9PiBQcm9taXNlPFQ+O1xuXG5hc3luYyBmdW5jdGlvbiBtdXRhdGVTdGF0ZUluVHJhbnNhY3Rpb248VD4oXG4gIG9wZXJhdGlvbjogU3RhdGVNdXRhdGlvbk9wZXJhdGlvbjxUPixcbik6IFByb21pc2U8VD4ge1xuICBjb25zdCB7IGRiLCB0cmFja2VyU3RhdGVUYWJsZSB9ID0gYXdhaXQgaW1wb3J0KFwiQHdvcmtzcGFjZS9kYlwiKTtcbiAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKGFzeW5jICh0cmFuc2FjdGlvbikgPT4ge1xuICAgIGF3YWl0IHRyYW5zYWN0aW9uXG4gICAgICAuaW5zZXJ0KHRyYWNrZXJTdGF0ZVRhYmxlKVxuICAgICAgLnZhbHVlcyh7IGlkOiBcIm1haW5cIiwgZGF0YTogSU5JVElBTF9TVEFURSB9KVxuICAgICAgLm9uQ29uZmxpY3REb05vdGhpbmcoKTtcblxuICAgIGNvbnN0IFtyb3ddID0gYXdhaXQgdHJhbnNhY3Rpb25cbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLmZyb20odHJhY2tlclN0YXRlVGFibGUpXG4gICAgICAud2hlcmUoZXEodHJhY2tlclN0YXRlVGFibGUuaWQsIFwibWFpblwiKSlcbiAgICAgIC5mb3IoXCJ1cGRhdGVcIik7XG4gICAgaWYgKCFyb3cpIHRocm93IG5ldyBFcnJvcihcIlRyYWNrZXIgc3RhdGUgcm93IGNvdWxkIG5vdCBiZSBsb2NrZWRcIik7XG5cbiAgICBsZXQgY3VycmVudCA9IG5vcm1hbGl6ZVN0YXRlKHBhcnNlUGVyc2lzdGVkVHJhY2tlclN0YXRlKHJvdy5kYXRhKSk7XG4gICAgcmV0dXJuIG9wZXJhdGlvbihcbiAgICAgIGFzeW5jICgpID0+IGN1cnJlbnQsXG4gICAgICBhc3luYyAobmV4dCkgPT4ge1xuICAgICAgICBhd2FpdCB0cmFuc2FjdGlvblxuICAgICAgICAgIC51cGRhdGUodHJhY2tlclN0YXRlVGFibGUpXG4gICAgICAgICAgLnNldCh7IGRhdGE6IG5leHQsIHVwZGF0ZWRBdDogbmV3IERhdGUoKSB9KVxuICAgICAgICAgIC53aGVyZShlcSh0cmFja2VyU3RhdGVUYWJsZS5pZCwgXCJtYWluXCIpKTtcbiAgICAgICAgY3VycmVudCA9IGZyZWV6ZVRyYWNrZXJTdGF0ZShjbG9uZVRyYWNrZXJTdGF0ZShuZXh0KSk7XG4gICAgICB9LFxuICAgICk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaENsdWJMb2NrZXJGZWVkKCk6IFByb21pc2U8UmVhZG9ubHlDbHViTG9ja2VyRmVlZD4ge1xuICBjb25zdCB1cmwgPSBwcm9jZXNzLmVudltcIkNMVUJfTE9DS0VSX1NDSEVEVUxFX1VSTFwiXTtcbiAgaWYgKCF1cmwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDbHViIExvY2tlciBmZWVkIGlzIG5vdCBjb25maWd1cmVkXCIpO1xuICB9XG5cbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCAxMF8wMDApO1xuICB0cnkge1xuICAgIGNvbnN0IHRva2VuID0gcHJvY2Vzcy5lbnZbXCJDTFVCX0xPQ0tFUl9BUElfVE9LRU5cIl07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgIGhlYWRlcnM6IHRva2VuID8geyBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCB9IDogdW5kZWZpbmVkLFxuICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENsdWIgTG9ja2VyIHJldHVybmVkIEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUNsdWJMb2NrZXJGZWVkKGF3YWl0IHJlc3BvbnNlLmpzb24oKSk7XG4gIH0gZmluYWxseSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFsZXJ0U3RhZmYoc3RhdGU6IFRyYWNrZXJTdGF0ZSwgZXJyb3I6IHVua25vd24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgdXJsID0gcHJvY2Vzcy5lbnZbXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTFwiXTtcbiAgaWYgKCF1cmwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTCBpcyBub3QgY29uZmlndXJlZFwiKTtcbiAgfVxuXG4gIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFwiVW5rbm93biBDbHViIExvY2tlciBlcnJvclwiO1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIDEwXzAwMCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHRleHQ6IGBTdGFpdFNxdWFzaCBhbGVydDogQ2x1YiBMb2NrZXIgc2NoZWR1bGUgcmVmcmVzaCBoYXMgZmFpbGVkICR7c3RhdGUucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzfSBjb25zZWN1dGl2ZSB0aW1lcy4gTGF0ZXN0IGVycm9yOiAke21lc3NhZ2V9YCxcbiAgICAgICAgZXZlbnQ6IFwiY2x1Yi1sb2NrZXItcmVmcmVzaC1mYWlsaW5nXCIsXG4gICAgICAgIGNvbnNlY3V0aXZlRmFpbHVyZXM6IHN0YXRlLnJlZnJlc2hIZWFsdGguY29uc2VjdXRpdmVGYWlsdXJlcyxcbiAgICAgICAgbGFzdEZhaWx1cmVBdDogc3RhdGUucmVmcmVzaEhlYWx0aC5sYXN0RmFpbHVyZUF0LFxuICAgICAgfSksXG4gICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU3RhZmYgYWxlcnQgd2ViaG9vayByZXR1cm5lZCBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0RHVyYXRpb24oZHVyYXRpb25NczogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3QgdG90YWxNaW51dGVzID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChkdXJhdGlvbk1zIC8gNjBfMDAwKSk7XG4gIGlmICh0b3RhbE1pbnV0ZXMgPCA2MCkge1xuICAgIHJldHVybiBgJHt0b3RhbE1pbnV0ZXN9IG1pbnV0ZSR7dG90YWxNaW51dGVzID09PSAxID8gXCJcIiA6IFwic1wifWA7XG4gIH1cblxuICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodG90YWxNaW51dGVzIC8gNjApO1xuICBjb25zdCBtaW51dGVzID0gdG90YWxNaW51dGVzICUgNjA7XG4gIHJldHVybiBgJHtob3Vyc30gaG91ciR7aG91cnMgPT09IDEgPyBcIlwiIDogXCJzXCJ9JHtcbiAgICBtaW51dGVzID09PSAwID8gXCJcIiA6IGAgJHttaW51dGVzfSBtaW51dGUke21pbnV0ZXMgPT09IDEgPyBcIlwiIDogXCJzXCJ9YFxuICB9YDtcbn1cblxuY29uc3QgTk9USUZJQ0FUSU9OX0NMQUlNX0xFQVNFX01TID0gMzBfMDAwO1xuXG5mdW5jdGlvbiBpc0FjdGl2ZU5vdGlmaWNhdGlvbkNsYWltKGNsYWltZWRBdDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICBpZiAoIWNsYWltZWRBdCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBhZ2UgPSBEYXRlLm5vdygpIC0gRGF0ZS5wYXJzZShjbGFpbWVkQXQpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKGFnZSkgJiYgYWdlID49IDAgJiYgYWdlIDwgTk9USUZJQ0FUSU9OX0NMQUlNX0xFQVNFX01TO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dvSW1hZ2UoYnl0ZXM6IEJ1ZmZlciwgY29udGVudFR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoYnl0ZXMubGVuZ3RoID09PSAwIHx8IGJ5dGVzLmxlbmd0aCA+IDUgKiAxMDI0ICogMTAyNCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoY29udGVudFR5cGUgPT09IFwiaW1hZ2UvcG5nXCIpIHtcbiAgICByZXR1cm4gYnl0ZXMuc3ViYXJyYXkoMCwgOCkuZXF1YWxzKEJ1ZmZlci5mcm9tKFsweDg5LCAweDUwLCAweDRlLCAweDQ3LCAweDBkLCAweDBhLCAweDFhLCAweDBhXSkpO1xuICB9XG4gIGlmIChjb250ZW50VHlwZSA9PT0gXCJpbWFnZS9qcGVnXCIpIHJldHVybiBieXRlc1swXSA9PT0gMHhmZiAmJiBieXRlc1sxXSA9PT0gMHhkOCAmJiBieXRlc1syXSA9PT0gMHhmZjtcbiAgaWYgKGNvbnRlbnRUeXBlID09PSBcImltYWdlL2dpZlwiKSByZXR1cm4gW1wiR0lGODdhXCIsIFwiR0lGODlhXCJdLmluY2x1ZGVzKGJ5dGVzLnN1YmFycmF5KDAsIDYpLnRvU3RyaW5nKFwiYXNjaWlcIikpO1xuICBpZiAoY29udGVudFR5cGUgPT09IFwiaW1hZ2Uvd2VicFwiKSB7XG4gICAgcmV0dXJuIGJ5dGVzLnN1YmFycmF5KDAsIDQpLnRvU3RyaW5nKFwiYXNjaWlcIikgPT09IFwiUklGRlwiICYmIGJ5dGVzLnN1YmFycmF5KDgsIDEyKS50b1N0cmluZyhcImFzY2lpXCIpID09PSBcIldFQlBcIjtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFsZXJ0U3RhZmZPZlJlY292ZXJ5KFxuICByZWNvdmVyeTogUmVmcmVzaFJlY292ZXJ5LFxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHVybCA9IHByb2Nlc3MuZW52W1wiU1RBRkZfQUxFUlRfV0VCSE9PS19VUkxcIl07XG4gIGlmICghdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJTVEFGRl9BTEVSVF9XRUJIT09LX1VSTCBpcyBub3QgY29uZmlndXJlZFwiKTtcblxuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIDEwXzAwMCk7XG4gIHRyeSB7XG4gICAgY29uc3Qgb3V0YWdlRHVyYXRpb24gPSBmb3JtYXREdXJhdGlvbihyZWNvdmVyeS5vdXRhZ2VEdXJhdGlvbk1zKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdGV4dDogYFN0YWl0U3F1YXNoIHJlY292ZXJ5OiBDbHViIExvY2tlciBzY2hlZHVsZSByZWZyZXNoIGlzIHdvcmtpbmcgYWdhaW4gYWZ0ZXIgJHtvdXRhZ2VEdXJhdGlvbn0gYW5kICR7cmVjb3ZlcnkuZmFpbGVkQXR0ZW1wdHN9IGZhaWxlZCBhdHRlbXB0JHtyZWNvdmVyeS5mYWlsZWRBdHRlbXB0cyA9PT0gMSA/IFwiXCIgOiBcInNcIn0uIFRoZSBzY2hlZHVsZSBpcyBjdXJyZW50LmAsXG4gICAgICAgIGV2ZW50OiBcImNsdWItbG9ja2VyLXJlZnJlc2gtcmVjb3ZlcmVkXCIsXG4gICAgICAgIGZhaWxlZEF0dGVtcHRzOiByZWNvdmVyeS5mYWlsZWRBdHRlbXB0cyxcbiAgICAgICAgb3V0YWdlRHVyYXRpb25NczogcmVjb3Zlcnkub3V0YWdlRHVyYXRpb25NcyxcbiAgICAgICAgb3V0YWdlU3RhcnRlZEF0OiByZWNvdmVyeS5vdXRhZ2VTdGFydGVkQXQsXG4gICAgICAgIHJlY292ZXJlZEF0OiByZWNvdmVyeS5yZWNvdmVyZWRBdCxcbiAgICAgIH0pLFxuICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0YWZmIGFsZXJ0IHdlYmhvb2sgcmV0dXJuZWQgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG59XG5cbnR5cGUgVHJhY2tlclJvdXRlckRlcGVuZGVuY2llcyA9IHtcbiAgZ2V0U3RhdGU6ICgpID0+IFByb21pc2U8UmVhZG9ubHlUcmFja2VyU3RhdGU+O1xuICBzYXZlU3RhdGU6IChzdGF0ZTogVHJhY2tlclN0YXRlKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBtdXRhdGVTdGF0ZT86IDxUPihvcGVyYXRpb246IFN0YXRlTXV0YXRpb25PcGVyYXRpb248VD4pID0+IFByb21pc2U8VD47XG4gIG9iamVjdFN0b3JhZ2U/OiBQaWNrPE9iamVjdFN0b3JhZ2VTZXJ2aWNlLCBcInNhdmVPYmplY3RcIiB8IFwiZ2V0T2JqZWN0XCIgfCBcImRlbGV0ZU9iamVjdFwiPjtcbiAgYXV0aG9yaXplU3RhZmY/OiBSZXF1ZXN0SGFuZGxlcjtcbn07XG5cbmZ1bmN0aW9uIHRyYWNrZXJSZXNwb25zZShzdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBicmFuZGluZzogc3RhdGUuYnJhbmRpbmcgPz8geyBuYW1lOiBcIlN0YWl0U3F1YXNoXCIsIGxvZ29QYXRoOiBudWxsIH0sXG4gICAgcmVmcmVzaEhlYWx0aDoge1xuICAgICAgLi4uc3RhdGUucmVmcmVzaEhlYWx0aCxcbiAgICAgIHBlbmRpbmdSZWNvdmVyeU5vdGljZXM6IHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMubGVuZ3RoLFxuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIHRyYWNrZXJIZWFsdGhSZXNwb25zZShzdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZS5yZWZyZXNoSGVhbHRoLFxuICAgIHBlbmRpbmdSZWNvdmVyeU5vdGljZXM6IHN0YXRlLnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMubGVuZ3RoLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVHJhY2tlclJvdXRlcihcbiAgZGVwZW5kZW5jaWVzOiBUcmFja2VyUm91dGVyRGVwZW5kZW5jaWVzID0ge1xuICAgIGdldFN0YXRlLFxuICAgIHNhdmVTdGF0ZSxcbiAgICBtdXRhdGVTdGF0ZTogbXV0YXRlU3RhdGVJblRyYW5zYWN0aW9uLFxuICB9LFxuKTogSVJvdXRlciB7XG4gIGNvbnN0IHJvdXRlcjogSVJvdXRlciA9IFJvdXRlcigpO1xuICBjb25zdCBvYmplY3RTdG9yYWdlID0gZGVwZW5kZW5jaWVzLm9iamVjdFN0b3JhZ2UgPz8gbmV3IE9iamVjdFN0b3JhZ2VTZXJ2aWNlKCk7XG4gIGNvbnN0IGF1dGhvcml6ZVN0YWZmID0gZGVwZW5kZW5jaWVzLmF1dGhvcml6ZVN0YWZmID8/IHJlcXVpcmVTdGFmZjtcbiAgY29uc3QgeyBnZXRTdGF0ZTogbG9hZFN0YXRlLCBzYXZlU3RhdGU6IHBlcnNpc3RTdGF0ZSB9ID0gZGVwZW5kZW5jaWVzO1xuICBsZXQgbXV0YXRpb25RdWV1ZTogUHJvbWlzZTx2b2lkPiA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZU11dGF0aW9uPFQ+KG9wZXJhdGlvbjogKCkgPT4gUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IG11dGF0aW9uUXVldWUudGhlbihvcGVyYXRpb24sIG9wZXJhdGlvbik7XG4gICAgbXV0YXRpb25RdWV1ZSA9IHJlc3VsdC50aGVuKFxuICAgICAgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgKCkgPT4gdW5kZWZpbmVkLFxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3JkaW5hdGVNdXRhdGlvbjxUPihcbiAgICBvcGVyYXRpb246IFN0YXRlTXV0YXRpb25PcGVyYXRpb248VD4sXG4gICk6IFByb21pc2U8VD4ge1xuICAgIGlmIChkZXBlbmRlbmNpZXMubXV0YXRlU3RhdGUpIHJldHVybiBkZXBlbmRlbmNpZXMubXV0YXRlU3RhdGUob3BlcmF0aW9uKTtcbiAgICByZXR1cm4gc2VyaWFsaXplTXV0YXRpb24oKCkgPT4gb3BlcmF0aW9uKGxvYWRTdGF0ZSwgcGVyc2lzdFN0YXRlKSk7XG4gIH1cblxuICByb3V0ZXIuZ2V0KFwiL3RyYWNrZXJcIiwgYXV0aG9yaXplU3RhZmYsIGFzeW5jIChfcmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICByZXMuanNvbihHZXRUcmFja2VyUmVzcG9uc2UucGFyc2UodHJhY2tlclJlc3BvbnNlKGF3YWl0IGxvYWRTdGF0ZSgpKSkpO1xuICB9KTtcblxuICByb3V0ZXIuZ2V0KFwiL3RyYWNrZXIvaGVhbHRoXCIsIGF1dGhvcml6ZVN0YWZmLCBhc3luYyAoX3JlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgcmVzLmpzb24oR2V0VHJhY2tlckhlYWx0aFJlc3BvbnNlLnBhcnNlKHRyYWNrZXJIZWFsdGhSZXNwb25zZShhd2FpdCBsb2FkU3RhdGUoKSkpKTtcbiAgfSk7XG5cbiAgcm91dGVyLmdldChcIi9wbGF5ZXJzLzpwbGF5ZXJJZC90cmFja2VyXCIsIGFzeW5jIChyZXEsIHJlcyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IEdldFBsYXllclRyYWNrZXJQYXJhbXMuc2FmZVBhcnNlKHJlcS5wYXJhbXMpO1xuICAgIGlmICghcGFyYW1zLnN1Y2Nlc3MpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHBhcmFtcy5lcnJvci5tZXNzYWdlIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IGxvYWRTdGF0ZSgpO1xuICAgIGNvbnN0IHBsYXllciA9IHN0YXRlLnBsYXllcnMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gcGFyYW1zLmRhdGEucGxheWVySWQpO1xuICAgIGlmICghcGxheWVyKSB7XG4gICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIlBsYXllciBub3QgZm91bmRcIiB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2hlcyA9IHN0YXRlLm1hdGNoZXMuZmlsdGVyKChtYXRjaCkgPT4gbWF0Y2gucGxheWVySWQgPT09IHBsYXllci5pZCk7XG4gICAgY29uc3QgY29hY2hJZHMgPSBuZXcgU2V0KG1hdGNoZXMubWFwKChtYXRjaCkgPT4gbWF0Y2guY29hY2hJZCkpO1xuICAgIHJlcy5qc29uKEdldFBsYXllclRyYWNrZXJSZXNwb25zZS5wYXJzZSh7XG4gICAgICBwbGF5ZXIsXG4gICAgICBtYXRjaGVzLFxuICAgICAgY29hY2hlczogc3RhdGUuY29hY2hlcy5maWx0ZXIoKGNvYWNoKSA9PiBjb2FjaElkcy5oYXMoY29hY2guaWQpKSxcbiAgICAgIGJyYW5kaW5nOiBzdGF0ZS5icmFuZGluZyxcbiAgICAgIGxhc3RVcGRhdGVkQXQ6IHN0YXRlLmxhc3RVcGRhdGVkQXQsXG4gICAgfSkpO1xuICB9KTtcblxuICByb3V0ZXIucHV0KFwiL3RyYWNrZXIvc2V0dGluZ3NcIiwgYXV0aG9yaXplU3RhZmYsIGFzeW5jIChyZXEsIHJlcyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBTYXZlVHJhY2tlclNldHRpbmdzQm9keS5zYWZlUGFyc2UocmVxLmJvZHkpO1xuICAgIGlmICghYm9keS5zdWNjZXNzKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBib2R5LmVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IGNvb3JkaW5hdGVNdXRhdGlvbihhc3luYyAobG9hZExvY2tlZFN0YXRlLCBzYXZlTG9ja2VkU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gY2xvbmVUcmFja2VyU3RhdGUoYXdhaXQgbG9hZExvY2tlZFN0YXRlKCkpO1xuICAgICAgY29uc3QgY29hY2hlcyA9IFsuLi5ib2R5LmRhdGEuY29hY2hlc107XG4gICAgICBpZiAoIWNvYWNoZXMuc29tZSgoY29hY2gpID0+IGNvYWNoLmlkID09PSBcInVuYXNzaWduZWRcIikpIHtcbiAgICAgICAgY29hY2hlcy5wdXNoKHsgaWQ6IFwidW5hc3NpZ25lZFwiLCBuYW1lOiBcIlVuYXNzaWduZWRcIiB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvYWNoSWRzID0gbmV3IFNldChjb2FjaGVzLm1hcCgoY29hY2gpID0+IGNvYWNoLmlkKSk7XG4gICAgICBzdGF0ZS5jb2FjaGVzID0gY29hY2hlcztcbiAgICAgIHN0YXRlLm1hdGNoZXMgPSBzdGF0ZS5tYXRjaGVzLm1hcCgobWF0Y2gpID0+ICh7XG4gICAgICAgIC4uLm1hdGNoLFxuICAgICAgICBjb2FjaElkOiBjb2FjaElkcy5oYXMobWF0Y2guY29hY2hJZCkgPyBtYXRjaC5jb2FjaElkIDogXCJ1bmFzc2lnbmVkXCIsXG4gICAgICB9KSk7XG4gICAgICBzdGF0ZS5icmFuZGluZyA9IGJvZHkuZGF0YS5icmFuZGluZztcbiAgICAgIHN0YXRlLmxhc3RVcGRhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICBhd2FpdCBzYXZlTG9ja2VkU3RhdGUoc3RhdGUpO1xuICAgICAgcmVzLmpzb24oU2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlLnBhcnNlKHRyYWNrZXJSZXNwb25zZShzdGF0ZSkpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcm91dGVyLnBvc3QoXG4gICAgXCIvdHJhY2tlci9sb2dvXCIsXG4gICAgYXV0aG9yaXplU3RhZmYsXG4gICAgZXhwcmVzcy5yYXcoeyB0eXBlOiBbXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS9qcGVnXCIsIFwiaW1hZ2Uvd2VicFwiLCBcImltYWdlL2dpZlwiXSwgbGltaXQ6IFwiNW1iXCIgfSksXG4gICAgYXN5bmMgKHJlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihyZXEuYm9keSkgfHwgIWlzTG9nb0ltYWdlKHJlcS5ib2R5LCByZXEuZ2V0KFwiY29udGVudC10eXBlXCIpID8/IFwiXCIpKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiQ2hvb3NlIGEgdmFsaWQgUE5HLCBKUEcsIFdlYlAsIG9yIEdJRiBpbWFnZSB1cCB0byA1IE1CXCIgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG9iamVjdFBhdGggPSBgL29iamVjdHMvdXBsb2Fkcy8ke3JhbmRvbVVVSUQoKX1gO1xuICAgICAgICBhd2FpdCBvYmplY3RTdG9yYWdlLnNhdmVPYmplY3Qob2JqZWN0UGF0aCwgcmVxLmJvZHksIHJlcS5nZXQoXCJjb250ZW50LXR5cGVcIikhKTtcbiAgICAgICAgcmVzLmpzb24oVXBsb2FkVHJhY2tlckxvZ29SZXNwb25zZS5wYXJzZSh7IG9iamVjdFBhdGggfSkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVxLmxvZy5lcnJvcih7IGVycjogZXJyb3IgfSwgXCJDb3VsZCBub3Qgc3RvcmUgdHJhY2tlciBsb2dvXCIpO1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBcIkNvdWxkIG5vdCBzdG9yZSB0cmFja2VyIGxvZ29cIiB9KTtcbiAgICAgIH1cbiAgICB9LFxuICApO1xuXG4gIHJvdXRlci5wYXRjaChcIi9tYXRjaGVzLzptYXRjaElkXCIsIGF1dGhvcml6ZVN0YWZmLCBhc3luYyAocmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBwYXJhbXMgPSBVcGRhdGVNYXRjaFBhcmFtcy5zYWZlUGFyc2UocmVxLnBhcmFtcyk7XG4gICAgY29uc3QgYm9keSA9IFVwZGF0ZU1hdGNoQm9keS5zYWZlUGFyc2UocmVxLmJvZHkpO1xuICAgIGlmICghcGFyYW1zLnN1Y2Nlc3MpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHBhcmFtcy5lcnJvci5tZXNzYWdlIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWJvZHkuc3VjY2Vzcykge1xuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogYm9keS5lcnJvci5tZXNzYWdlIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGNvb3JkaW5hdGVNdXRhdGlvbihhc3luYyAobG9hZExvY2tlZFN0YXRlLCBzYXZlTG9ja2VkU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gY2xvbmVUcmFja2VyU3RhdGUoYXdhaXQgbG9hZExvY2tlZFN0YXRlKCkpO1xuICAgICAgY29uc3QgbWF0Y2ggPSBzdGF0ZS5tYXRjaGVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHBhcmFtcy5kYXRhLm1hdGNoSWQpO1xuICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIk1hdGNoIG5vdCBmb3VuZFwiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24obWF0Y2gsIGJvZHkuZGF0YSk7XG4gICAgICBzdGF0ZS5sYXN0VXBkYXRlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgYXdhaXQgc2F2ZUxvY2tlZFN0YXRlKHN0YXRlKTtcbiAgICAgIHJlcy5qc29uKFVwZGF0ZU1hdGNoUmVzcG9uc2UucGFyc2UobWF0Y2gpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcm91dGVyLnB1dChcIi9tYXRjaGVzLzptYXRjaElkL3JlcG9ydFwiLCBhdXRob3JpemVTdGFmZiwgYXN5bmMgKHJlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0gU2F2ZUNvYWNoUmVwb3J0UGFyYW1zLnNhZmVQYXJzZShyZXEucGFyYW1zKTtcbiAgICBjb25zdCBib2R5ID0gU2F2ZUNvYWNoUmVwb3J0Qm9keS5zYWZlUGFyc2UocmVxLmJvZHkpO1xuICAgIGlmICghcGFyYW1zLnN1Y2Nlc3MpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHBhcmFtcy5lcnJvci5tZXNzYWdlIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWJvZHkuc3VjY2Vzcykge1xuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogYm9keS5lcnJvci5tZXNzYWdlIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNhdmVkID0gYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKGFzeW5jIChsb2FkTG9ja2VkU3RhdGUsIHNhdmVMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBjbG9uZVRyYWNrZXJTdGF0ZShhd2FpdCBsb2FkTG9ja2VkU3RhdGUoKSk7XG4gICAgICBjb25zdCBtYXRjaCA9IHN0YXRlLm1hdGNoZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gcGFyYW1zLmRhdGEubWF0Y2hJZCk7XG4gICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6IFwiTWF0Y2ggbm90IGZvdW5kXCIgfSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKG1hdGNoLnN0YXR1cyAhPT0gXCJjb21wbGV0ZWRcIikge1xuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIlJlcG9ydHMgY2FuIG9ubHkgYmUgYWRkZWQgdG8gY29tcGxldGVkIG1hdGNoZXNcIiB9KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzQXVkaW9QYXRoID0gbWF0Y2gucmVwb3J0Py5hdWRpb1BhdGggPz8gbnVsbDtcbiAgICAgIGNvbnN0IG5leHRBdWRpb1BhdGggPSBib2R5LmRhdGEuYXVkaW9QYXRoID8/IHByZXZpb3VzQXVkaW9QYXRoO1xuICAgICAgaWYgKG5leHRBdWRpb1BhdGggJiYgbmV4dEF1ZGlvUGF0aCAhPT0gcHJldmlvdXNBdWRpb1BhdGgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBvYmplY3RTdG9yYWdlLmdldE9iamVjdChuZXh0QXVkaW9QYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZXEubG9nLmVycm9yKFxuICAgICAgICAgICAgeyBlcnI6IGVycm9yLCBvYmplY3RQYXRoOiBuZXh0QXVkaW9QYXRoLCBtYXRjaElkOiBwYXJhbXMuZGF0YS5tYXRjaElkIH0sXG4gICAgICAgICAgICBcIkNvdWxkIG5vdCB2ZXJpZnkgcmVwbGFjZW1lbnQgY29hY2ggdm9pY2Ugbm90ZVwiLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJUaGUgcmVwbGFjZW1lbnQgdm9pY2Ugbm90ZSBpcyBubyBsb25nZXIgYXZhaWxhYmxlXCIgfSk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG1hdGNoLnJlcG9ydCA9IHtcbiAgICAgICAgbWF0Y2hJZDogbWF0Y2guaWQsXG4gICAgICAgIG9ic2VydmF0aW9uczogYm9keS5kYXRhLm9ic2VydmF0aW9ucyxcbiAgICAgICAgdHJhbnNjcmlwdDogYm9keS5kYXRhLnRyYW5zY3JpcHQgPz8gbnVsbCxcbiAgICAgICAgYXVkaW9QYXRoOiBib2R5LmRhdGEuYXVkaW9QYXRoID8/IG1hdGNoLnJlcG9ydD8uYXVkaW9QYXRoID8/IG51bGwsXG4gICAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIHN0YXRlLmxhc3RVcGRhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICBhd2FpdCBzYXZlTG9ja2VkU3RhdGUoc3RhdGUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVwb3J0OiBTYXZlQ29hY2hSZXBvcnRSZXNwb25zZS5wYXJzZShtYXRjaC5yZXBvcnQpLFxuICAgICAgICByZXBsYWNlZEF1ZGlvUGF0aDpcbiAgICAgICAgICBwcmV2aW91c0F1ZGlvUGF0aCAmJiBwcmV2aW91c0F1ZGlvUGF0aCAhPT0gbWF0Y2gucmVwb3J0LmF1ZGlvUGF0aFxuICAgICAgICAgICAgPyBwcmV2aW91c0F1ZGlvUGF0aFxuICAgICAgICAgICAgOiBudWxsLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBpZiAoIXNhdmVkKSByZXR1cm47XG5cbiAgICBpZiAoc2F2ZWQucmVwbGFjZWRBdWRpb1BhdGgpIHtcbiAgICAgIGF3YWl0IGNvb3JkaW5hdGVNdXRhdGlvbihhc3luYyAobG9hZExvY2tlZFN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGF3YWl0IGxvYWRMb2NrZWRTdGF0ZSgpO1xuICAgICAgICBjb25zdCBpc1N0aWxsUmVmZXJlbmNlZCA9IGN1cnJlbnRTdGF0ZS5tYXRjaGVzLnNvbWUoXG4gICAgICAgICAgKG1hdGNoKSA9PiBtYXRjaC5yZXBvcnQ/LmF1ZGlvUGF0aCA9PT0gc2F2ZWQucmVwbGFjZWRBdWRpb1BhdGgsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpc1N0aWxsUmVmZXJlbmNlZCkgcmV0dXJuO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgb2JqZWN0U3RvcmFnZS5kZWxldGVPYmplY3Qoc2F2ZWQucmVwbGFjZWRBdWRpb1BhdGghKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZXEubG9nLmVycm9yKFxuICAgICAgICAgICAgeyBlcnI6IGVycm9yLCBvYmplY3RQYXRoOiBzYXZlZC5yZXBsYWNlZEF1ZGlvUGF0aCwgbWF0Y2hJZDogcGFyYW1zLmRhdGEubWF0Y2hJZCB9LFxuICAgICAgICAgICAgXCJDb3VsZCBub3QgcmVtb3ZlIHJlcGxhY2VkIGNvYWNoIHZvaWNlIG5vdGVcIixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVzLmpzb24oc2F2ZWQucmVwb3J0KTtcbiAgfSk7XG5cbiAgcm91dGVyLnBvc3QoXG4gICAgXCIvbWF0Y2hlcy86bWF0Y2hJZC9yZXBvcnQvYXVkaW9cIixcbiAgICBhdXRob3JpemVTdGFmZixcbiAgICBleHByZXNzLnJhdyh7IHR5cGU6IFtcImF1ZGlvL3dlYm1cIiwgXCJhdWRpby9vZ2dcIiwgXCJhdWRpby9tcDRcIl0sIGxpbWl0OiBcIjI1bWJcIiB9KSxcbiAgICBhc3luYyAocmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IFVwbG9hZENvYWNoUmVwb3J0QXVkaW9QYXJhbXMuc2FmZVBhcnNlKHJlcS5wYXJhbXMpO1xuICAgICAgaWYgKCFwYXJhbXMuc3VjY2Vzcykge1xuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBwYXJhbXMuZXJyb3IubWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIocmVxLmJvZHkpIHx8IHJlcS5ib2R5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIlJlY29yZCBhIHZvaWNlIG5vdGUgYmVmb3JlIHVwbG9hZGluZ1wiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IGxvYWRTdGF0ZSgpO1xuICAgICAgY29uc3QgbWF0Y2ggPSBzdGF0ZS5tYXRjaGVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHBhcmFtcy5kYXRhLm1hdGNoSWQpO1xuICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIk1hdGNoIG5vdCBmb3VuZFwiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAobWF0Y2guc3RhdHVzICE9PSBcImNvbXBsZXRlZFwiKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiVm9pY2Ugbm90ZXMgY2FuIG9ubHkgYmUgYWRkZWQgdG8gY29tcGxldGVkIG1hdGNoZXNcIiB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0UGF0aCA9IGAvb2JqZWN0cy91cGxvYWRzLyR7cmFuZG9tVVVJRCgpfWA7XG4gICAgICAgIGF3YWl0IG9iamVjdFN0b3JhZ2Uuc2F2ZU9iamVjdChvYmplY3RQYXRoLCByZXEuYm9keSwgcmVxLmdldChcImNvbnRlbnQtdHlwZVwiKSEpO1xuICAgICAgICByZXMuanNvbihVcGxvYWRDb2FjaFJlcG9ydEF1ZGlvUmVzcG9uc2UucGFyc2UoeyBvYmplY3RQYXRoIH0pKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlcS5sb2cuZXJyb3IoeyBlcnI6IGVycm9yIH0sIFwiQ291bGQgbm90IHN0b3JlIGNvYWNoIHZvaWNlIG5vdGVcIik7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IFwiQ291bGQgbm90IHN0b3JlIGNvYWNoIHZvaWNlIG5vdGVcIiB9KTtcbiAgICAgIH1cbiAgICB9LFxuICApO1xuXG4gIHJvdXRlci5wb3N0KFwiL3RyYWNrZXIvcmVmcmVzaFwiLCBhdXRob3JpemVTdGFmZiwgYXN5bmMgKHJlcSwgcmVzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgYWxlcnRUaHJlc2hvbGQgPSBnZXRBbGVydFRocmVzaG9sZCgpO1xuICAgIGNvbnN0IHJlc3BvbmRUb0ZhaWx1cmUgPSBhc3luYyAoZXJyb3I6IHVua25vd24pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIGNvbnN0IGZhaWx1cmUgPSBhd2FpdCBjb29yZGluYXRlTXV0YXRpb24oYXN5bmMgKGxvYWRMb2NrZWRTdGF0ZSwgc2F2ZUxvY2tlZFN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGZhaWxlZFN0YXRlID0gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gICAgICAgICAgYXdhaXQgbG9hZExvY2tlZFN0YXRlKCksXG4gICAgICAgICAgYWxlcnRUaHJlc2hvbGQsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNob3VsZEFsZXJ0ID1cbiAgICAgICAgICBmYWlsZWRTdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMgPj0gYWxlcnRUaHJlc2hvbGQgJiZcbiAgICAgICAgICBmYWlsZWRTdGF0ZS5yZWZyZXNoSGVhbHRoLmFsZXJ0U2VudEF0ID09PSBudWxsICYmXG4gICAgICAgICAgIWlzQWN0aXZlTm90aWZpY2F0aW9uQ2xhaW0oXG4gICAgICAgICAgICBmYWlsZWRTdGF0ZS5yZWZyZXNoSGVhbHRoLmZhaWx1cmVBbGVydENsYWltZWRBdCxcbiAgICAgICAgICApO1xuICAgICAgICBjb25zdCBhbGVydENsYWltID0gc2hvdWxkQWxlcnQgPyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgOiBudWxsO1xuICAgICAgICBpZiAoYWxlcnRDbGFpbSkge1xuICAgICAgICAgIGZhaWxlZFN0YXRlLnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0ID0gYWxlcnRDbGFpbTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBzYXZlTG9ja2VkU3RhdGUoZmFpbGVkU3RhdGUpO1xuICAgICAgICByZXR1cm4geyBmYWlsZWRTdGF0ZSwgYWxlcnRDbGFpbSB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJlcS5sb2cud2FybihcbiAgICAgICAge1xuICAgICAgICAgIGVycjogZXJyb3IsXG4gICAgICAgICAgY29uc2VjdXRpdmVGYWlsdXJlczpcbiAgICAgICAgICAgIGZhaWx1cmUuZmFpbGVkU3RhdGUucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzLFxuICAgICAgICAgIGFsZXJ0VGhyZXNob2xkLFxuICAgICAgICB9LFxuICAgICAgICBcIkNsdWIgTG9ja2VyIHJlZnJlc2ggZmFpbGVkXCIsXG4gICAgICApO1xuXG4gICAgICBpZiAoZmFpbHVyZS5hbGVydENsYWltKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgYWxlcnRTdGFmZihmYWlsdXJlLmZhaWxlZFN0YXRlLCBlcnJvcik7XG4gICAgICAgICAgYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKGFzeW5jIChsb2FkTG9ja2VkU3RhdGUsIHNhdmVMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGNsb25lVHJhY2tlclN0YXRlKGF3YWl0IGxvYWRMb2NrZWRTdGF0ZSgpKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLmZhaWx1cmVBbGVydENsYWltZWRBdCA9PT0gZmFpbHVyZS5hbGVydENsYWltXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLmFsZXJ0U2VudEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgICBjdXJyZW50LnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0ID0gbnVsbDtcbiAgICAgICAgICAgICAgYXdhaXQgc2F2ZUxvY2tlZFN0YXRlKGN1cnJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlcS5sb2cuZXJyb3IoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnNlY3V0aXZlRmFpbHVyZXM6XG4gICAgICAgICAgICAgICAgZmFpbHVyZS5mYWlsZWRTdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJTdGFmZiBhbGVydGVkIGFib3V0IHJlcGVhdGVkIENsdWIgTG9ja2VyIHJlZnJlc2ggZmFpbHVyZXNcIixcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChhbGVydEVycm9yKSB7XG4gICAgICAgICAgYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKGFzeW5jIChsb2FkTG9ja2VkU3RhdGUsIHNhdmVMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGNsb25lVHJhY2tlclN0YXRlKGF3YWl0IGxvYWRMb2NrZWRTdGF0ZSgpKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLmZhaWx1cmVBbGVydENsYWltZWRBdCA9PT0gZmFpbHVyZS5hbGVydENsYWltXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLmZhaWx1cmVBbGVydENsYWltZWRBdCA9IG51bGw7XG4gICAgICAgICAgICAgIGF3YWl0IHNhdmVMb2NrZWRTdGF0ZShjdXJyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXEubG9nLmVycm9yKFxuICAgICAgICAgICAgeyBlcnI6IGFsZXJ0RXJyb3IgfSxcbiAgICAgICAgICAgIFwiQ291bGQgbm90IGFsZXJ0IHN0YWZmIGFib3V0IHJlZnJlc2ggZmFpbHVyZXNcIixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFwiVW5rbm93biBDbHViIExvY2tlciBlcnJvclwiO1xuICAgICAgcmVzLnN0YXR1cyg1MDIpLmpzb24oeyBlcnJvcjogYFJlZnJlc2ggZmFpbGVkOiAke21lc3NhZ2V9YCB9KTtcbiAgICB9O1xuXG4gICAgbGV0IGZlZWQ6IFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQ7XG4gICAgdHJ5IHtcbiAgICAgIGZlZWQgPSBhd2FpdCBmZXRjaENsdWJMb2NrZXJGZWVkKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IHJlc3BvbmRUb0ZhaWx1cmUoZXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBub3RpZmljYXRpb25TdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGU7XG4gICAgdHJ5IHtcbiAgICAgIG5vdGlmaWNhdGlvblN0YXRlID0gYXdhaXQgY29vcmRpbmF0ZU11dGF0aW9uKFxuICAgICAgICBhc3luYyAobG9hZExvY2tlZFN0YXRlLCBzYXZlTG9ja2VkU3RhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgbG9hZExvY2tlZFN0YXRlKCk7XG4gICAgICAgICAgY29uc3QgbWVyZ2VkID0gbWVyZ2VDbHViTG9ja2VyRmVlZChjdXJyZW50LCBmZWVkKTtcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IGlzQWN0aXZlTm90aWZpY2F0aW9uQ2xhaW0oXG4gICAgICAgICAgICBjdXJyZW50LnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0LFxuICAgICAgICAgIClcbiAgICAgICAgICAgID8gbWVyZ2VkXG4gICAgICAgICAgICA6IGNsZWFyUmVmcmVzaEZhaWx1cmVzKG1lcmdlZCwgYWxlcnRUaHJlc2hvbGQpO1xuICAgICAgICAgIGF3YWl0IHNhdmVMb2NrZWRTdGF0ZShzdGF0ZSk7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYXdhaXQgcmVzcG9uZFRvRmFpbHVyZShlcnJvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGNsYWltZWQgPSBhd2FpdCBjb29yZGluYXRlTXV0YXRpb24oXG4gICAgICAgIGFzeW5jIChsb2FkTG9ja2VkU3RhdGUsIHNhdmVMb2NrZWRTdGF0ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBsb2FkTG9ja2VkU3RhdGUoKTtcbiAgICAgICAgICBjb25zdCByZWNvdmVyeSA9IGN1cnJlbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllc1swXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhcmVjb3ZlcnkgfHxcbiAgICAgICAgICAgIGN1cnJlbnQucmVmcmVzaEhlYWx0aC5jb25zZWN1dGl2ZUZhaWx1cmVzID4gMCB8fFxuICAgICAgICAgICAgaXNBY3RpdmVOb3RpZmljYXRpb25DbGFpbShcbiAgICAgICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0/LmNsYWltZWRBdCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBuZXh0ID0gY2xvbmVUcmFja2VyU3RhdGUoY3VycmVudCk7XG4gICAgICAgICAgY29uc3QgY2xhaW1lZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgIG5leHQucmVmcmVzaEhlYWx0aC5yZWNvdmVyeUNsYWltID0ge1xuICAgICAgICAgICAgb3V0YWdlU3RhcnRlZEF0OiByZWNvdmVyeS5vdXRhZ2VTdGFydGVkQXQsXG4gICAgICAgICAgICByZWNvdmVyZWRBdDogcmVjb3ZlcnkucmVjb3ZlcmVkQXQsXG4gICAgICAgICAgICBjbGFpbWVkQXQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBhd2FpdCBzYXZlTG9ja2VkU3RhdGUobmV4dCk7XG4gICAgICAgICAgcmV0dXJuIHsgcmVjb3Zlcnk6IHsgLi4ucmVjb3ZlcnkgfSwgY2xhaW1lZEF0IH07XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgaWYgKCFjbGFpbWVkKSBicmVhaztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYWxlcnRTdGFmZk9mUmVjb3ZlcnkoY2xhaW1lZC5yZWNvdmVyeSk7XG4gICAgICAgIGF3YWl0IGNvb3JkaW5hdGVNdXRhdGlvbihhc3luYyAobG9hZExvY2tlZFN0YXRlLCBzYXZlTG9ja2VkU3RhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoYXdhaXQgbG9hZExvY2tlZFN0YXRlKCkpO1xuICAgICAgICAgIGlmIChjdXJyZW50LnJlZnJlc2hIZWFsdGgucmVjb3ZlcnlDbGFpbT8uY2xhaW1lZEF0ICE9PSBjbGFpbWVkLmNsYWltZWRBdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBpbmRleCA9IGN1cnJlbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcy5maW5kSW5kZXgoXG4gICAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgICAgaXRlbS5vdXRhZ2VTdGFydGVkQXQgPT09IGNsYWltZWQucmVjb3Zlcnkub3V0YWdlU3RhcnRlZEF0ICYmXG4gICAgICAgICAgICAgIGl0ZW0ucmVjb3ZlcmVkQXQgPT09IGNsYWltZWQucmVjb3ZlcnkucmVjb3ZlcmVkQXQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoaW5kZXggPj0gMCkgY3VycmVudC5yZWZyZXNoSGVhbHRoLnBlbmRpbmdSZWNvdmVyaWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgY3VycmVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0gPSBudWxsO1xuICAgICAgICAgIGF3YWl0IHNhdmVMb2NrZWRTdGF0ZShjdXJyZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgICAgcmVxLmxvZy5pbmZvKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmYWlsZWRBdHRlbXB0czogcmVjb3ZlcnkuZmFpbGVkQXR0ZW1wdHMsXG4gICAgICAgICAgICAgIG91dGFnZUR1cmF0aW9uTXM6IHJlY292ZXJ5Lm91dGFnZUR1cmF0aW9uTXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJTdGFmZiBhbGVydGVkIHRoYXQgQ2x1YiBMb2NrZXIgcmVmcmVzaCByZWNvdmVyZWRcIixcbiAgICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoYWxlcnRFcnJvcikge1xuICAgICAgICBhd2FpdCBjb29yZGluYXRlTXV0YXRpb24oYXN5bmMgKGxvYWRMb2NrZWRTdGF0ZSwgc2F2ZUxvY2tlZFN0YXRlKSA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudCA9IGNsb25lVHJhY2tlclN0YXRlKGF3YWl0IGxvYWRMb2NrZWRTdGF0ZSgpKTtcbiAgICAgICAgICBpZiAoY3VycmVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0/LmNsYWltZWRBdCA9PT0gY2xhaW1lZC5jbGFpbWVkQXQpIHtcbiAgICAgICAgICAgIGN1cnJlbnQucmVmcmVzaEhlYWx0aC5yZWNvdmVyeUNsYWltID0gbnVsbDtcbiAgICAgICAgICAgIGF3YWl0IHNhdmVMb2NrZWRTdGF0ZShjdXJyZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAgIHJlcS5sb2cuZXJyb3IoXG4gICAgICAgICAgICB7IGVycjogYWxlcnRFcnJvciB9LFxuICAgICAgICAgICAgXCJDb3VsZCBub3QgYWxlcnQgc3RhZmYgYWJvdXQgcmVmcmVzaCByZWNvdmVyeVwiLFxuICAgICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvblN0YXRlID0gYXdhaXQgbG9hZFN0YXRlKCk7XG4gICAgcmVzLmpzb24oXG4gICAgICBSZWZyZXNoVHJhY2tlclJlc3BvbnNlLnBhcnNlKHRyYWNrZXJSZXNwb25zZShub3RpZmljYXRpb25TdGF0ZSkpLFxuICAgICk7XG4gIH0pO1xuXG4gIHJldHVybiByb3V0ZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVRyYWNrZXJSb3V0ZXIoKTsiLCAiZXhwb3J0ICogZnJvbSBcIi4vZXJyb3JzLmpzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9oZWxwZXJzL3BhcnNlVXRpbC5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vaGVscGVycy90eXBlQWxpYXNlcy5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vaGVscGVycy91dGlsLmpzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90eXBlcy5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vWm9kRXJyb3IuanNcIjtcbiIsICJleHBvcnQgdmFyIHV0aWw7XG4oZnVuY3Rpb24gKHV0aWwpIHtcbiAgICB1dGlsLmFzc2VydEVxdWFsID0gKF8pID0+IHsgfTtcbiAgICBmdW5jdGlvbiBhc3NlcnRJcyhfYXJnKSB7IH1cbiAgICB1dGlsLmFzc2VydElzID0gYXNzZXJ0SXM7XG4gICAgZnVuY3Rpb24gYXNzZXJ0TmV2ZXIoX3gpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgfVxuICAgIHV0aWwuYXNzZXJ0TmV2ZXIgPSBhc3NlcnROZXZlcjtcbiAgICB1dGlsLmFycmF5VG9FbnVtID0gKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIG9ialtpdGVtXSA9IGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICAgIHV0aWwuZ2V0VmFsaWRFbnVtVmFsdWVzID0gKG9iaikgPT4ge1xuICAgICAgICBjb25zdCB2YWxpZEtleXMgPSB1dGlsLm9iamVjdEtleXMob2JqKS5maWx0ZXIoKGspID0+IHR5cGVvZiBvYmpbb2JqW2tdXSAhPT0gXCJudW1iZXJcIik7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0ge307XG4gICAgICAgIGZvciAoY29uc3QgayBvZiB2YWxpZEtleXMpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkW2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1dGlsLm9iamVjdFZhbHVlcyhmaWx0ZXJlZCk7XG4gICAgfTtcbiAgICB1dGlsLm9iamVjdFZhbHVlcyA9IChvYmopID0+IHtcbiAgICAgICAgcmV0dXJuIHV0aWwub2JqZWN0S2V5cyhvYmopLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9ialtlXTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB1dGlsLm9iamVjdEtleXMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09IFwiZnVuY3Rpb25cIiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGJhbi9iYW5cbiAgICAgICAgPyAob2JqKSA9PiBPYmplY3Qua2V5cyhvYmopIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgYmFuL2JhblxuICAgICAgICA6IChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICB9O1xuICAgIHV0aWwuZmluZCA9IChhcnIsIGNoZWNrZXIpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGFycikge1xuICAgICAgICAgICAgaWYgKGNoZWNrZXIoaXRlbSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHV0aWwuaXNJbnRlZ2VyID0gdHlwZW9mIE51bWJlci5pc0ludGVnZXIgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/ICh2YWwpID0+IE51bWJlci5pc0ludGVnZXIodmFsKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGJhbi9iYW5cbiAgICAgICAgOiAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWwpICYmIE1hdGguZmxvb3IodmFsKSA9PT0gdmFsO1xuICAgIGZ1bmN0aW9uIGpvaW5WYWx1ZXMoYXJyYXksIHNlcGFyYXRvciA9IFwiIHwgXCIpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5Lm1hcCgodmFsKSA9PiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiA/IGAnJHt2YWx9J2AgOiB2YWwpKS5qb2luKHNlcGFyYXRvcik7XG4gICAgfVxuICAgIHV0aWwuam9pblZhbHVlcyA9IGpvaW5WYWx1ZXM7XG4gICAgdXRpbC5qc29uU3RyaW5naWZ5UmVwbGFjZXIgPSAoXywgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJiaWdpbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59KSh1dGlsIHx8ICh1dGlsID0ge30pKTtcbmV4cG9ydCB2YXIgb2JqZWN0VXRpbDtcbihmdW5jdGlvbiAob2JqZWN0VXRpbCkge1xuICAgIG9iamVjdFV0aWwubWVyZ2VTaGFwZXMgPSAoZmlyc3QsIHNlY29uZCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZmlyc3QsXG4gICAgICAgICAgICAuLi5zZWNvbmQsIC8vIHNlY29uZCBvdmVyd3JpdGVzIGZpcnN0XG4gICAgICAgIH07XG4gICAgfTtcbn0pKG9iamVjdFV0aWwgfHwgKG9iamVjdFV0aWwgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IFpvZFBhcnNlZFR5cGUgPSB1dGlsLmFycmF5VG9FbnVtKFtcbiAgICBcInN0cmluZ1wiLFxuICAgIFwibmFuXCIsXG4gICAgXCJudW1iZXJcIixcbiAgICBcImludGVnZXJcIixcbiAgICBcImZsb2F0XCIsXG4gICAgXCJib29sZWFuXCIsXG4gICAgXCJkYXRlXCIsXG4gICAgXCJiaWdpbnRcIixcbiAgICBcInN5bWJvbFwiLFxuICAgIFwiZnVuY3Rpb25cIixcbiAgICBcInVuZGVmaW5lZFwiLFxuICAgIFwibnVsbFwiLFxuICAgIFwiYXJyYXlcIixcbiAgICBcIm9iamVjdFwiLFxuICAgIFwidW5rbm93blwiLFxuICAgIFwicHJvbWlzZVwiLFxuICAgIFwidm9pZFwiLFxuICAgIFwibmV2ZXJcIixcbiAgICBcIm1hcFwiLFxuICAgIFwic2V0XCIsXG5dKTtcbmV4cG9ydCBjb25zdCBnZXRQYXJzZWRUeXBlID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCB0ID0gdHlwZW9mIGRhdGE7XG4gICAgc3dpdGNoICh0KSB7XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLnVuZGVmaW5lZDtcbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIFpvZFBhcnNlZFR5cGUuc3RyaW5nO1xuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyLmlzTmFOKGRhdGEpID8gWm9kUGFyc2VkVHlwZS5uYW4gOiBab2RQYXJzZWRUeXBlLm51bWJlcjtcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLmJvb2xlYW47XG4gICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgICAgcmV0dXJuIFpvZFBhcnNlZFR5cGUuZnVuY3Rpb247XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLmJpZ2ludDtcbiAgICAgICAgY2FzZSBcInN5bWJvbFwiOlxuICAgICAgICAgICAgcmV0dXJuIFpvZFBhcnNlZFR5cGUuc3ltYm9sO1xuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLmFycmF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWm9kUGFyc2VkVHlwZS5udWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEudGhlbiAmJiB0eXBlb2YgZGF0YS50aGVuID09PSBcImZ1bmN0aW9uXCIgJiYgZGF0YS5jYXRjaCAmJiB0eXBlb2YgZGF0YS5jYXRjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvZFBhcnNlZFR5cGUucHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgTWFwICE9PSBcInVuZGVmaW5lZFwiICYmIGRhdGEgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWm9kUGFyc2VkVHlwZS5tYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIFNldCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkYXRhIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvZFBhcnNlZFR5cGUuc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBEYXRlICE9PSBcInVuZGVmaW5lZFwiICYmIGRhdGEgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvZFBhcnNlZFR5cGUuZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLm9iamVjdDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBab2RQYXJzZWRUeXBlLnVua25vd247XG4gICAgfVxufTtcbiIsICJpbXBvcnQgeyB1dGlsIH0gZnJvbSBcIi4vaGVscGVycy91dGlsLmpzXCI7XG5leHBvcnQgY29uc3QgWm9kSXNzdWVDb2RlID0gdXRpbC5hcnJheVRvRW51bShbXG4gICAgXCJpbnZhbGlkX3R5cGVcIixcbiAgICBcImludmFsaWRfbGl0ZXJhbFwiLFxuICAgIFwiY3VzdG9tXCIsXG4gICAgXCJpbnZhbGlkX3VuaW9uXCIsXG4gICAgXCJpbnZhbGlkX3VuaW9uX2Rpc2NyaW1pbmF0b3JcIixcbiAgICBcImludmFsaWRfZW51bV92YWx1ZVwiLFxuICAgIFwidW5yZWNvZ25pemVkX2tleXNcIixcbiAgICBcImludmFsaWRfYXJndW1lbnRzXCIsXG4gICAgXCJpbnZhbGlkX3JldHVybl90eXBlXCIsXG4gICAgXCJpbnZhbGlkX2RhdGVcIixcbiAgICBcImludmFsaWRfc3RyaW5nXCIsXG4gICAgXCJ0b29fc21hbGxcIixcbiAgICBcInRvb19iaWdcIixcbiAgICBcImludmFsaWRfaW50ZXJzZWN0aW9uX3R5cGVzXCIsXG4gICAgXCJub3RfbXVsdGlwbGVfb2ZcIixcbiAgICBcIm5vdF9maW5pdGVcIixcbl0pO1xuZXhwb3J0IGNvbnN0IHF1b3RlbGVzc0pzb24gPSAob2JqKSA9PiB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgMik7XG4gICAgcmV0dXJuIGpzb24ucmVwbGFjZSgvXCIoW15cIl0rKVwiOi9nLCBcIiQxOlwiKTtcbn07XG5leHBvcnQgY2xhc3MgWm9kRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgZ2V0IGVycm9ycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNzdWVzO1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihpc3N1ZXMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pc3N1ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5hZGRJc3N1ZSA9IChzdWIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNzdWVzID0gWy4uLnRoaXMuaXNzdWVzLCBzdWJdO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZElzc3VlcyA9IChzdWJzID0gW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNzdWVzID0gWy4uLnRoaXMuaXNzdWVzLCAuLi5zdWJzXTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0dWFsUHJvdG8gPSBuZXcudGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGJhbi9iYW5cbiAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBhY3R1YWxQcm90byk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9fcHJvdG9fXyA9IGFjdHVhbFByb3RvO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IFwiWm9kRXJyb3JcIjtcbiAgICAgICAgdGhpcy5pc3N1ZXMgPSBpc3N1ZXM7XG4gICAgfVxuICAgIGZvcm1hdChfbWFwcGVyKSB7XG4gICAgICAgIGNvbnN0IG1hcHBlciA9IF9tYXBwZXIgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChpc3N1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc3N1ZS5tZXNzYWdlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZmllbGRFcnJvcnMgPSB7IF9lcnJvcnM6IFtdIH07XG4gICAgICAgIGNvbnN0IHByb2Nlc3NFcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpc3N1ZSBvZiBlcnJvci5pc3N1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNzdWUuY29kZSA9PT0gXCJpbnZhbGlkX3VuaW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNzdWUudW5pb25FcnJvcnMubWFwKHByb2Nlc3NFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzc3VlLmNvZGUgPT09IFwiaW52YWxpZF9yZXR1cm5fdHlwZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NFcnJvcihpc3N1ZS5yZXR1cm5UeXBlRXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc3N1ZS5jb2RlID09PSBcImludmFsaWRfYXJndW1lbnRzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0Vycm9yKGlzc3VlLmFyZ3VtZW50c0Vycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUucGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFcnJvcnMuX2Vycm9ycy5wdXNoKG1hcHBlcihpc3N1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnIgPSBmaWVsZEVycm9ycztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGlzc3VlLnBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGlzc3VlLnBhdGhbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXJtaW5hbCA9IGkgPT09IGlzc3VlLnBhdGgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGVybWluYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyW2VsXSA9IGN1cnJbZWxdIHx8IHsgX2Vycm9yczogW10gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjdXJyW2VsXSA9IGN1cnJbZWxdIHx8IHsgX2Vycm9yczogW10gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHR5cGVvZiBlbCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgZXJyb3JBcnJheTogYW55ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBlcnJvckFycmF5Ll9lcnJvcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGN1cnJbZWxdID0gY3VycltlbF0gfHwgZXJyb3JBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyW2VsXSA9IGN1cnJbZWxdIHx8IHsgX2Vycm9yczogW10gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyW2VsXS5fZXJyb3JzLnB1c2gobWFwcGVyKGlzc3VlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyID0gY3VycltlbF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHByb2Nlc3NFcnJvcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIGZpZWxkRXJyb3JzO1xuICAgIH1cbiAgICBzdGF0aWMgYXNzZXJ0KHZhbHVlKSB7XG4gICAgICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgWm9kRXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBhIFpvZEVycm9yOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xuICAgIH1cbiAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuaXNzdWVzLCB1dGlsLmpzb25TdHJpbmdpZnlSZXBsYWNlciwgMik7XG4gICAgfVxuICAgIGdldCBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc3N1ZXMubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgICBmbGF0dGVuKG1hcHBlciA9IChpc3N1ZSkgPT4gaXNzdWUubWVzc2FnZSkge1xuICAgICAgICBjb25zdCBmaWVsZEVycm9ycyA9IHt9O1xuICAgICAgICBjb25zdCBmb3JtRXJyb3JzID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMuaXNzdWVzKSB7XG4gICAgICAgICAgICBpZiAoc3ViLnBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0RWwgPSBzdWIucGF0aFswXTtcbiAgICAgICAgICAgICAgICBmaWVsZEVycm9yc1tmaXJzdEVsXSA9IGZpZWxkRXJyb3JzW2ZpcnN0RWxdIHx8IFtdO1xuICAgICAgICAgICAgICAgIGZpZWxkRXJyb3JzW2ZpcnN0RWxdLnB1c2gobWFwcGVyKHN1YikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9ybUVycm9ycy5wdXNoKG1hcHBlcihzdWIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBmb3JtRXJyb3JzLCBmaWVsZEVycm9ycyB9O1xuICAgIH1cbiAgICBnZXQgZm9ybUVycm9ycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxhdHRlbigpO1xuICAgIH1cbn1cblpvZEVycm9yLmNyZWF0ZSA9IChpc3N1ZXMpID0+IHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBab2RFcnJvcihpc3N1ZXMpO1xuICAgIHJldHVybiBlcnJvcjtcbn07XG4iLCAiaW1wb3J0IHsgWm9kSXNzdWVDb2RlIH0gZnJvbSBcIi4uL1pvZEVycm9yLmpzXCI7XG5pbXBvcnQgeyB1dGlsLCBab2RQYXJzZWRUeXBlIH0gZnJvbSBcIi4uL2hlbHBlcnMvdXRpbC5qc1wiO1xuY29uc3QgZXJyb3JNYXAgPSAoaXNzdWUsIF9jdHgpID0+IHtcbiAgICBsZXQgbWVzc2FnZTtcbiAgICBzd2l0Y2ggKGlzc3VlLmNvZGUpIHtcbiAgICAgICAgY2FzZSBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlOlxuICAgICAgICAgICAgaWYgKGlzc3VlLnJlY2VpdmVkID09PSBab2RQYXJzZWRUeXBlLnVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlJlcXVpcmVkXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYEV4cGVjdGVkICR7aXNzdWUuZXhwZWN0ZWR9LCByZWNlaXZlZCAke2lzc3VlLnJlY2VpdmVkfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBab2RJc3N1ZUNvZGUuaW52YWxpZF9saXRlcmFsOlxuICAgICAgICAgICAgbWVzc2FnZSA9IGBJbnZhbGlkIGxpdGVyYWwgdmFsdWUsIGV4cGVjdGVkICR7SlNPTi5zdHJpbmdpZnkoaXNzdWUuZXhwZWN0ZWQsIHV0aWwuanNvblN0cmluZ2lmeVJlcGxhY2VyKX1gO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLnVucmVjb2duaXplZF9rZXlzOlxuICAgICAgICAgICAgbWVzc2FnZSA9IGBVbnJlY29nbml6ZWQga2V5KHMpIGluIG9iamVjdDogJHt1dGlsLmpvaW5WYWx1ZXMoaXNzdWUua2V5cywgXCIsIFwiKX1gO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfdW5pb246XG4gICAgICAgICAgICBtZXNzYWdlID0gYEludmFsaWQgaW5wdXRgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfdW5pb25fZGlzY3JpbWluYXRvcjpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgSW52YWxpZCBkaXNjcmltaW5hdG9yIHZhbHVlLiBFeHBlY3RlZCAke3V0aWwuam9pblZhbHVlcyhpc3N1ZS5vcHRpb25zKX1gO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfZW51bV92YWx1ZTpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgSW52YWxpZCBlbnVtIHZhbHVlLiBFeHBlY3RlZCAke3V0aWwuam9pblZhbHVlcyhpc3N1ZS5vcHRpb25zKX0sIHJlY2VpdmVkICcke2lzc3VlLnJlY2VpdmVkfSdgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfYXJndW1lbnRzOlxuICAgICAgICAgICAgbWVzc2FnZSA9IGBJbnZhbGlkIGZ1bmN0aW9uIGFyZ3VtZW50c2A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBab2RJc3N1ZUNvZGUuaW52YWxpZF9yZXR1cm5fdHlwZTpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgSW52YWxpZCBmdW5jdGlvbiByZXR1cm4gdHlwZWA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBab2RJc3N1ZUNvZGUuaW52YWxpZF9kYXRlOlxuICAgICAgICAgICAgbWVzc2FnZSA9IGBJbnZhbGlkIGRhdGVgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nOlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpc3N1ZS52YWxpZGF0aW9uID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKFwiaW5jbHVkZXNcIiBpbiBpc3N1ZS52YWxpZGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgSW52YWxpZCBpbnB1dDogbXVzdCBpbmNsdWRlIFwiJHtpc3N1ZS52YWxpZGF0aW9uLmluY2x1ZGVzfVwiYDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpc3N1ZS52YWxpZGF0aW9uLnBvc2l0aW9uID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gYCR7bWVzc2FnZX0gYXQgb25lIG9yIG1vcmUgcG9zaXRpb25zIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAke2lzc3VlLnZhbGlkYXRpb24ucG9zaXRpb259YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChcInN0YXJ0c1dpdGhcIiBpbiBpc3N1ZS52YWxpZGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgSW52YWxpZCBpbnB1dDogbXVzdCBzdGFydCB3aXRoIFwiJHtpc3N1ZS52YWxpZGF0aW9uLnN0YXJ0c1dpdGh9XCJgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChcImVuZHNXaXRoXCIgaW4gaXNzdWUudmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gYEludmFsaWQgaW5wdXQ6IG11c3QgZW5kIHdpdGggXCIke2lzc3VlLnZhbGlkYXRpb24uZW5kc1dpdGh9XCJgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5hc3NlcnROZXZlcihpc3N1ZS52YWxpZGF0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc3N1ZS52YWxpZGF0aW9uICE9PSBcInJlZ2V4XCIpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYEludmFsaWQgJHtpc3N1ZS52YWxpZGF0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJJbnZhbGlkXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBab2RJc3N1ZUNvZGUudG9vX3NtYWxsOlxuICAgICAgICAgICAgaWYgKGlzc3VlLnR5cGUgPT09IFwiYXJyYXlcIilcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYEFycmF5IG11c3QgY29udGFpbiAke2lzc3VlLmV4YWN0ID8gXCJleGFjdGx5XCIgOiBpc3N1ZS5pbmNsdXNpdmUgPyBgYXQgbGVhc3RgIDogYG1vcmUgdGhhbmB9ICR7aXNzdWUubWluaW11bX0gZWxlbWVudChzKWA7XG4gICAgICAgICAgICBlbHNlIGlmIChpc3N1ZS50eXBlID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgU3RyaW5nIG11c3QgY29udGFpbiAke2lzc3VlLmV4YWN0ID8gXCJleGFjdGx5XCIgOiBpc3N1ZS5pbmNsdXNpdmUgPyBgYXQgbGVhc3RgIDogYG92ZXJgfSAke2lzc3VlLm1pbmltdW19IGNoYXJhY3RlcihzKWA7XG4gICAgICAgICAgICBlbHNlIGlmIChpc3N1ZS50eXBlID09PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgTnVtYmVyIG11c3QgYmUgJHtpc3N1ZS5leGFjdCA/IGBleGFjdGx5IGVxdWFsIHRvIGAgOiBpc3N1ZS5pbmNsdXNpdmUgPyBgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGAgOiBgZ3JlYXRlciB0aGFuIGB9JHtpc3N1ZS5taW5pbXVtfWA7XG4gICAgICAgICAgICBlbHNlIGlmIChpc3N1ZS50eXBlID09PSBcImJpZ2ludFwiKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgTnVtYmVyIG11c3QgYmUgJHtpc3N1ZS5leGFjdCA/IGBleGFjdGx5IGVxdWFsIHRvIGAgOiBpc3N1ZS5pbmNsdXNpdmUgPyBgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGAgOiBgZ3JlYXRlciB0aGFuIGB9JHtpc3N1ZS5taW5pbXVtfWA7XG4gICAgICAgICAgICBlbHNlIGlmIChpc3N1ZS50eXBlID09PSBcImRhdGVcIilcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYERhdGUgbXVzdCBiZSAke2lzc3VlLmV4YWN0ID8gYGV4YWN0bHkgZXF1YWwgdG8gYCA6IGlzc3VlLmluY2x1c2l2ZSA/IGBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gYCA6IGBncmVhdGVyIHRoYW4gYH0ke25ldyBEYXRlKE51bWJlcihpc3N1ZS5taW5pbXVtKSl9YDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJJbnZhbGlkIGlucHV0XCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBab2RJc3N1ZUNvZGUudG9vX2JpZzpcbiAgICAgICAgICAgIGlmIChpc3N1ZS50eXBlID09PSBcImFycmF5XCIpXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBBcnJheSBtdXN0IGNvbnRhaW4gJHtpc3N1ZS5leGFjdCA/IGBleGFjdGx5YCA6IGlzc3VlLmluY2x1c2l2ZSA/IGBhdCBtb3N0YCA6IGBsZXNzIHRoYW5gfSAke2lzc3VlLm1heGltdW19IGVsZW1lbnQocylgO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUudHlwZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYFN0cmluZyBtdXN0IGNvbnRhaW4gJHtpc3N1ZS5leGFjdCA/IGBleGFjdGx5YCA6IGlzc3VlLmluY2x1c2l2ZSA/IGBhdCBtb3N0YCA6IGB1bmRlcmB9ICR7aXNzdWUubWF4aW11bX0gY2hhcmFjdGVyKHMpYDtcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzc3VlLnR5cGUgPT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBOdW1iZXIgbXVzdCBiZSAke2lzc3VlLmV4YWN0ID8gYGV4YWN0bHlgIDogaXNzdWUuaW5jbHVzaXZlID8gYGxlc3MgdGhhbiBvciBlcXVhbCB0b2AgOiBgbGVzcyB0aGFuYH0gJHtpc3N1ZS5tYXhpbXVtfWA7XG4gICAgICAgICAgICBlbHNlIGlmIChpc3N1ZS50eXBlID09PSBcImJpZ2ludFwiKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgQmlnSW50IG11c3QgYmUgJHtpc3N1ZS5leGFjdCA/IGBleGFjdGx5YCA6IGlzc3VlLmluY2x1c2l2ZSA/IGBsZXNzIHRoYW4gb3IgZXF1YWwgdG9gIDogYGxlc3MgdGhhbmB9ICR7aXNzdWUubWF4aW11bX1gO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNzdWUudHlwZSA9PT0gXCJkYXRlXCIpXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBEYXRlIG11c3QgYmUgJHtpc3N1ZS5leGFjdCA/IGBleGFjdGx5YCA6IGlzc3VlLmluY2x1c2l2ZSA/IGBzbWFsbGVyIHRoYW4gb3IgZXF1YWwgdG9gIDogYHNtYWxsZXIgdGhhbmB9ICR7bmV3IERhdGUoTnVtYmVyKGlzc3VlLm1heGltdW0pKX1gO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkludmFsaWQgaW5wdXRcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFpvZElzc3VlQ29kZS5jdXN0b206XG4gICAgICAgICAgICBtZXNzYWdlID0gYEludmFsaWQgaW5wdXRgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgWm9kSXNzdWVDb2RlLmludmFsaWRfaW50ZXJzZWN0aW9uX3R5cGVzOlxuICAgICAgICAgICAgbWVzc2FnZSA9IGBJbnRlcnNlY3Rpb24gcmVzdWx0cyBjb3VsZCBub3QgYmUgbWVyZ2VkYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFpvZElzc3VlQ29kZS5ub3RfbXVsdGlwbGVfb2Y6XG4gICAgICAgICAgICBtZXNzYWdlID0gYE51bWJlciBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgJHtpc3N1ZS5tdWx0aXBsZU9mfWA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBab2RJc3N1ZUNvZGUubm90X2Zpbml0ZTpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBcIk51bWJlciBtdXN0IGJlIGZpbml0ZVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBtZXNzYWdlID0gX2N0eC5kZWZhdWx0RXJyb3I7XG4gICAgICAgICAgICB1dGlsLmFzc2VydE5ldmVyKGlzc3VlKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgbWVzc2FnZSB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IGVycm9yTWFwO1xuIiwgImltcG9ydCBkZWZhdWx0RXJyb3JNYXAgZnJvbSBcIi4vbG9jYWxlcy9lbi5qc1wiO1xubGV0IG92ZXJyaWRlRXJyb3JNYXAgPSBkZWZhdWx0RXJyb3JNYXA7XG5leHBvcnQgeyBkZWZhdWx0RXJyb3JNYXAgfTtcbmV4cG9ydCBmdW5jdGlvbiBzZXRFcnJvck1hcChtYXApIHtcbiAgICBvdmVycmlkZUVycm9yTWFwID0gbWFwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEVycm9yTWFwKCkge1xuICAgIHJldHVybiBvdmVycmlkZUVycm9yTWFwO1xufVxuIiwgImltcG9ydCB7IGdldEVycm9yTWFwIH0gZnJvbSBcIi4uL2Vycm9ycy5qc1wiO1xuaW1wb3J0IGRlZmF1bHRFcnJvck1hcCBmcm9tIFwiLi4vbG9jYWxlcy9lbi5qc1wiO1xuZXhwb3J0IGNvbnN0IG1ha2VJc3N1ZSA9IChwYXJhbXMpID0+IHtcbiAgICBjb25zdCB7IGRhdGEsIHBhdGgsIGVycm9yTWFwcywgaXNzdWVEYXRhIH0gPSBwYXJhbXM7XG4gICAgY29uc3QgZnVsbFBhdGggPSBbLi4ucGF0aCwgLi4uKGlzc3VlRGF0YS5wYXRoIHx8IFtdKV07XG4gICAgY29uc3QgZnVsbElzc3VlID0ge1xuICAgICAgICAuLi5pc3N1ZURhdGEsXG4gICAgICAgIHBhdGg6IGZ1bGxQYXRoLFxuICAgIH07XG4gICAgaWYgKGlzc3VlRGF0YS5tZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmlzc3VlRGF0YSxcbiAgICAgICAgICAgIHBhdGg6IGZ1bGxQYXRoLFxuICAgICAgICAgICAgbWVzc2FnZTogaXNzdWVEYXRhLm1lc3NhZ2UsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIlwiO1xuICAgIGNvbnN0IG1hcHMgPSBlcnJvck1hcHNcbiAgICAgICAgLmZpbHRlcigobSkgPT4gISFtKVxuICAgICAgICAuc2xpY2UoKVxuICAgICAgICAucmV2ZXJzZSgpO1xuICAgIGZvciAoY29uc3QgbWFwIG9mIG1hcHMpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gbWFwKGZ1bGxJc3N1ZSwgeyBkYXRhLCBkZWZhdWx0RXJyb3I6IGVycm9yTWVzc2FnZSB9KS5tZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5pc3N1ZURhdGEsXG4gICAgICAgIHBhdGg6IGZ1bGxQYXRoLFxuICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgfTtcbn07XG5leHBvcnQgY29uc3QgRU1QVFlfUEFUSCA9IFtdO1xuZXhwb3J0IGZ1bmN0aW9uIGFkZElzc3VlVG9Db250ZXh0KGN0eCwgaXNzdWVEYXRhKSB7XG4gICAgY29uc3Qgb3ZlcnJpZGVNYXAgPSBnZXRFcnJvck1hcCgpO1xuICAgIGNvbnN0IGlzc3VlID0gbWFrZUlzc3VlKHtcbiAgICAgICAgaXNzdWVEYXRhOiBpc3N1ZURhdGEsXG4gICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgZXJyb3JNYXBzOiBbXG4gICAgICAgICAgICBjdHguY29tbW9uLmNvbnRleHR1YWxFcnJvck1hcCwgLy8gY29udGV4dHVhbCBlcnJvciBtYXAgaXMgZmlyc3QgcHJpb3JpdHlcbiAgICAgICAgICAgIGN0eC5zY2hlbWFFcnJvck1hcCwgLy8gdGhlbiBzY2hlbWEtYm91bmQgbWFwIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgb3ZlcnJpZGVNYXAsIC8vIHRoZW4gZ2xvYmFsIG92ZXJyaWRlIG1hcFxuICAgICAgICAgICAgb3ZlcnJpZGVNYXAgPT09IGRlZmF1bHRFcnJvck1hcCA/IHVuZGVmaW5lZCA6IGRlZmF1bHRFcnJvck1hcCwgLy8gdGhlbiBnbG9iYWwgZGVmYXVsdCBtYXBcbiAgICAgICAgXS5maWx0ZXIoKHgpID0+ICEheCksXG4gICAgfSk7XG4gICAgY3R4LmNvbW1vbi5pc3N1ZXMucHVzaChpc3N1ZSk7XG59XG5leHBvcnQgY2xhc3MgUGFyc2VTdGF0dXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gXCJ2YWxpZFwiO1xuICAgIH1cbiAgICBkaXJ0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IFwidmFsaWRcIilcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBcImRpcnR5XCI7XG4gICAgfVxuICAgIGFib3J0KCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSAhPT0gXCJhYm9ydGVkXCIpXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gXCJhYm9ydGVkXCI7XG4gICAgfVxuICAgIHN0YXRpYyBtZXJnZUFycmF5KHN0YXR1cywgcmVzdWx0cykge1xuICAgICAgICBjb25zdCBhcnJheVZhbHVlID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiByZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAocy5zdGF0dXMgPT09IFwiYWJvcnRlZFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgaWYgKHMuc3RhdHVzID09PSBcImRpcnR5XCIpXG4gICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICBhcnJheVZhbHVlLnB1c2gocy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMudmFsdWUsIHZhbHVlOiBhcnJheVZhbHVlIH07XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyBtZXJnZU9iamVjdEFzeW5jKHN0YXR1cywgcGFpcnMpIHtcbiAgICAgICAgY29uc3Qgc3luY1BhaXJzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcGFpciBvZiBwYWlycykge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYXdhaXQgcGFpci5rZXk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IHBhaXIudmFsdWU7XG4gICAgICAgICAgICBzeW5jUGFpcnMucHVzaCh7XG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFBhcnNlU3RhdHVzLm1lcmdlT2JqZWN0U3luYyhzdGF0dXMsIHN5bmNQYWlycyk7XG4gICAgfVxuICAgIHN0YXRpYyBtZXJnZU9iamVjdFN5bmMoc3RhdHVzLCBwYWlycykge1xuICAgICAgICBjb25zdCBmaW5hbE9iamVjdCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHBhaXIgb2YgcGFpcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsga2V5LCB2YWx1ZSB9ID0gcGFpcjtcbiAgICAgICAgICAgIGlmIChrZXkuc3RhdHVzID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5zdGF0dXMgPT09IFwiYWJvcnRlZFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgaWYgKGtleS5zdGF0dXMgPT09IFwiZGlydHlcIilcbiAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5zdGF0dXMgPT09IFwiZGlydHlcIilcbiAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgIGlmIChrZXkudmFsdWUgIT09IFwiX19wcm90b19fXCIgJiYgKHR5cGVvZiB2YWx1ZS52YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiB8fCBwYWlyLmFsd2F5c1NldCkpIHtcbiAgICAgICAgICAgICAgICBmaW5hbE9iamVjdFtrZXkudmFsdWVdID0gdmFsdWUudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMudmFsdWUsIHZhbHVlOiBmaW5hbE9iamVjdCB9O1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBJTlZBTElEID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgc3RhdHVzOiBcImFib3J0ZWRcIixcbn0pO1xuZXhwb3J0IGNvbnN0IERJUlRZID0gKHZhbHVlKSA9PiAoeyBzdGF0dXM6IFwiZGlydHlcIiwgdmFsdWUgfSk7XG5leHBvcnQgY29uc3QgT0sgPSAodmFsdWUpID0+ICh7IHN0YXR1czogXCJ2YWxpZFwiLCB2YWx1ZSB9KTtcbmV4cG9ydCBjb25zdCBpc0Fib3J0ZWQgPSAoeCkgPT4geC5zdGF0dXMgPT09IFwiYWJvcnRlZFwiO1xuZXhwb3J0IGNvbnN0IGlzRGlydHkgPSAoeCkgPT4geC5zdGF0dXMgPT09IFwiZGlydHlcIjtcbmV4cG9ydCBjb25zdCBpc1ZhbGlkID0gKHgpID0+IHguc3RhdHVzID09PSBcInZhbGlkXCI7XG5leHBvcnQgY29uc3QgaXNBc3luYyA9ICh4KSA9PiB0eXBlb2YgUHJvbWlzZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB4IGluc3RhbmNlb2YgUHJvbWlzZTtcbiIsICJleHBvcnQgdmFyIGVycm9yVXRpbDtcbihmdW5jdGlvbiAoZXJyb3JVdGlsKSB7XG4gICAgZXJyb3JVdGlsLmVyclRvT2JqID0gKG1lc3NhZ2UpID0+IHR5cGVvZiBtZXNzYWdlID09PSBcInN0cmluZ1wiID8geyBtZXNzYWdlIH0gOiBtZXNzYWdlIHx8IHt9O1xuICAgIC8vIGJpb21lLWlnbm9yZSBsaW50OlxuICAgIGVycm9yVXRpbC50b1N0cmluZyA9IChtZXNzYWdlKSA9PiB0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIiA/IG1lc3NhZ2UgOiBtZXNzYWdlPy5tZXNzYWdlO1xufSkoZXJyb3JVdGlsIHx8IChlcnJvclV0aWwgPSB7fSkpO1xuIiwgImltcG9ydCB7IFpvZEVycm9yLCBab2RJc3N1ZUNvZGUsIH0gZnJvbSBcIi4vWm9kRXJyb3IuanNcIjtcbmltcG9ydCB7IGRlZmF1bHRFcnJvck1hcCwgZ2V0RXJyb3JNYXAgfSBmcm9tIFwiLi9lcnJvcnMuanNcIjtcbmltcG9ydCB7IGVycm9yVXRpbCB9IGZyb20gXCIuL2hlbHBlcnMvZXJyb3JVdGlsLmpzXCI7XG5pbXBvcnQgeyBESVJUWSwgSU5WQUxJRCwgT0ssIFBhcnNlU3RhdHVzLCBhZGRJc3N1ZVRvQ29udGV4dCwgaXNBYm9ydGVkLCBpc0FzeW5jLCBpc0RpcnR5LCBpc1ZhbGlkLCBtYWtlSXNzdWUsIH0gZnJvbSBcIi4vaGVscGVycy9wYXJzZVV0aWwuanNcIjtcbmltcG9ydCB7IHV0aWwsIFpvZFBhcnNlZFR5cGUsIGdldFBhcnNlZFR5cGUgfSBmcm9tIFwiLi9oZWxwZXJzL3V0aWwuanNcIjtcbmNsYXNzIFBhcnNlSW5wdXRMYXp5UGF0aCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCB2YWx1ZSwgcGF0aCwga2V5KSB7XG4gICAgICAgIHRoaXMuX2NhY2hlZFBhdGggPSBbXTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuZGF0YSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5fa2V5ID0ga2V5O1xuICAgIH1cbiAgICBnZXQgcGF0aCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWNoZWRQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fa2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlZFBhdGgucHVzaCguLi50aGlzLl9wYXRoLCAuLi50aGlzLl9rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVkUGF0aC5wdXNoKC4uLnRoaXMuX3BhdGgsIHRoaXMuX2tleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlZFBhdGg7XG4gICAgfVxufVxuY29uc3QgaGFuZGxlUmVzdWx0ID0gKGN0eCwgcmVzdWx0KSA9PiB7XG4gICAgaWYgKGlzVmFsaWQocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXN1bHQudmFsdWUgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghY3R4LmNvbW1vbi5pc3N1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJWYWxpZGF0aW9uIGZhaWxlZCBidXQgbm8gaXNzdWVzIGRldGVjdGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBnZXQgZXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Vycm9yKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXJyb3I7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgWm9kRXJyb3IoY3R4LmNvbW1vbi5pc3N1ZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG59O1xuZnVuY3Rpb24gcHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpIHtcbiAgICBpZiAoIXBhcmFtcylcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIGNvbnN0IHsgZXJyb3JNYXAsIGludmFsaWRfdHlwZV9lcnJvciwgcmVxdWlyZWRfZXJyb3IsIGRlc2NyaXB0aW9uIH0gPSBwYXJhbXM7XG4gICAgaWYgKGVycm9yTWFwICYmIChpbnZhbGlkX3R5cGVfZXJyb3IgfHwgcmVxdWlyZWRfZXJyb3IpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgdXNlIFwiaW52YWxpZF90eXBlX2Vycm9yXCIgb3IgXCJyZXF1aXJlZF9lcnJvclwiIGluIGNvbmp1bmN0aW9uIHdpdGggY3VzdG9tIGVycm9yIG1hcC5gKTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWFwKVxuICAgICAgICByZXR1cm4geyBlcnJvck1hcDogZXJyb3JNYXAsIGRlc2NyaXB0aW9uIH07XG4gICAgY29uc3QgY3VzdG9tTWFwID0gKGlzcywgY3R4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbWVzc2FnZSB9ID0gcGFyYW1zO1xuICAgICAgICBpZiAoaXNzLmNvZGUgPT09IFwiaW52YWxpZF9lbnVtX3ZhbHVlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IG1lc3NhZ2UgPz8gY3R4LmRlZmF1bHRFcnJvciB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY3R4LmRhdGEgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IG1lc3NhZ2UgPz8gcmVxdWlyZWRfZXJyb3IgPz8gY3R4LmRlZmF1bHRFcnJvciB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc3MuY29kZSAhPT0gXCJpbnZhbGlkX3R5cGVcIilcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IGN0eC5kZWZhdWx0RXJyb3IgfTtcbiAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogbWVzc2FnZSA/PyBpbnZhbGlkX3R5cGVfZXJyb3IgPz8gY3R4LmRlZmF1bHRFcnJvciB9O1xuICAgIH07XG4gICAgcmV0dXJuIHsgZXJyb3JNYXA6IGN1c3RvbU1hcCwgZGVzY3JpcHRpb24gfTtcbn1cbmV4cG9ydCBjbGFzcyBab2RUeXBlIHtcbiAgICBnZXQgZGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuZGVzY3JpcHRpb247XG4gICAgfVxuICAgIF9nZXRUeXBlKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBnZXRQYXJzZWRUeXBlKGlucHV0LmRhdGEpO1xuICAgIH1cbiAgICBfZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCkge1xuICAgICAgICByZXR1cm4gKGN0eCB8fCB7XG4gICAgICAgICAgICBjb21tb246IGlucHV0LnBhcmVudC5jb21tb24sXG4gICAgICAgICAgICBkYXRhOiBpbnB1dC5kYXRhLFxuICAgICAgICAgICAgcGFyc2VkVHlwZTogZ2V0UGFyc2VkVHlwZShpbnB1dC5kYXRhKSxcbiAgICAgICAgICAgIHNjaGVtYUVycm9yTWFwOiB0aGlzLl9kZWYuZXJyb3JNYXAsXG4gICAgICAgICAgICBwYXRoOiBpbnB1dC5wYXRoLFxuICAgICAgICAgICAgcGFyZW50OiBpbnB1dC5wYXJlbnQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IG5ldyBQYXJzZVN0YXR1cygpLFxuICAgICAgICAgICAgY3R4OiB7XG4gICAgICAgICAgICAgICAgY29tbW9uOiBpbnB1dC5wYXJlbnQuY29tbW9uLFxuICAgICAgICAgICAgICAgIGRhdGE6IGlucHV0LmRhdGEsXG4gICAgICAgICAgICAgICAgcGFyc2VkVHlwZTogZ2V0UGFyc2VkVHlwZShpbnB1dC5kYXRhKSxcbiAgICAgICAgICAgICAgICBzY2hlbWFFcnJvck1hcDogdGhpcy5fZGVmLmVycm9yTWFwLFxuICAgICAgICAgICAgICAgIHBhdGg6IGlucHV0LnBhdGgsXG4gICAgICAgICAgICAgICAgcGFyZW50OiBpbnB1dC5wYXJlbnQsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBfcGFyc2VTeW5jKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3BhcnNlKGlucHV0KTtcbiAgICAgICAgaWYgKGlzQXN5bmMocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3luY2hyb25vdXMgcGFyc2UgZW5jb3VudGVyZWQgcHJvbWlzZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgX3BhcnNlQXN5bmMoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fcGFyc2UoaW5wdXQpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfVxuICAgIHBhcnNlKGRhdGEsIHBhcmFtcykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNhZmVQYXJzZShkYXRhLCBwYXJhbXMpO1xuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG4gICAgICAgIHRocm93IHJlc3VsdC5lcnJvcjtcbiAgICB9XG4gICAgc2FmZVBhcnNlKGRhdGEsIHBhcmFtcykge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgICBjb21tb246IHtcbiAgICAgICAgICAgICAgICBpc3N1ZXM6IFtdLFxuICAgICAgICAgICAgICAgIGFzeW5jOiBwYXJhbXM/LmFzeW5jID8/IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRleHR1YWxFcnJvck1hcDogcGFyYW1zPy5lcnJvck1hcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoOiBwYXJhbXM/LnBhdGggfHwgW10sXG4gICAgICAgICAgICBzY2hlbWFFcnJvck1hcDogdGhpcy5fZGVmLmVycm9yTWFwLFxuICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHBhcnNlZFR5cGU6IGdldFBhcnNlZFR5cGUoZGF0YSksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3BhcnNlU3luYyh7IGRhdGEsIHBhdGg6IGN0eC5wYXRoLCBwYXJlbnQ6IGN0eCB9KTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZVJlc3VsdChjdHgsIHJlc3VsdCk7XG4gICAgfVxuICAgIFwifnZhbGlkYXRlXCIoZGF0YSkge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgICBjb21tb246IHtcbiAgICAgICAgICAgICAgICBpc3N1ZXM6IFtdLFxuICAgICAgICAgICAgICAgIGFzeW5jOiAhIXRoaXNbXCJ+c3RhbmRhcmRcIl0uYXN5bmMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aDogW10sXG4gICAgICAgICAgICBzY2hlbWFFcnJvck1hcDogdGhpcy5fZGVmLmVycm9yTWFwLFxuICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHBhcnNlZFR5cGU6IGdldFBhcnNlZFR5cGUoZGF0YSksXG4gICAgICAgIH07XG4gICAgICAgIGlmICghdGhpc1tcIn5zdGFuZGFyZFwiXS5hc3luYykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9wYXJzZVN5bmMoeyBkYXRhLCBwYXRoOiBbXSwgcGFyZW50OiBjdHggfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc3N1ZXM6IGN0eC5jb21tb24uaXNzdWVzLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnI/Lm1lc3NhZ2U/LnRvTG93ZXJDYXNlKCk/LmluY2x1ZGVzKFwiZW5jb3VudGVyZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tcIn5zdGFuZGFyZFwiXS5hc3luYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN0eC5jb21tb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzc3VlczogW10sXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlQXN5bmMoeyBkYXRhLCBwYXRoOiBbXSwgcGFyZW50OiBjdHggfSkudGhlbigocmVzdWx0KSA9PiBpc1ZhbGlkKHJlc3VsdClcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQudmFsdWUsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICBpc3N1ZXM6IGN0eC5jb21tb24uaXNzdWVzLFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIHBhcnNlQXN5bmMoZGF0YSwgcGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2FmZVBhcnNlQXN5bmMoZGF0YSwgcGFyYW1zKTtcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG4gICAgfVxuICAgIGFzeW5jIHNhZmVQYXJzZUFzeW5jKGRhdGEsIHBhcmFtcykge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgICBjb21tb246IHtcbiAgICAgICAgICAgICAgICBpc3N1ZXM6IFtdLFxuICAgICAgICAgICAgICAgIGNvbnRleHR1YWxFcnJvck1hcDogcGFyYW1zPy5lcnJvck1hcCxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoOiBwYXJhbXM/LnBhdGggfHwgW10sXG4gICAgICAgICAgICBzY2hlbWFFcnJvck1hcDogdGhpcy5fZGVmLmVycm9yTWFwLFxuICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHBhcnNlZFR5cGU6IGdldFBhcnNlZFR5cGUoZGF0YSksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1heWJlQXN5bmNSZXN1bHQgPSB0aGlzLl9wYXJzZSh7IGRhdGEsIHBhdGg6IGN0eC5wYXRoLCBwYXJlbnQ6IGN0eCB9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgKGlzQXN5bmMobWF5YmVBc3luY1Jlc3VsdCkgPyBtYXliZUFzeW5jUmVzdWx0IDogUHJvbWlzZS5yZXNvbHZlKG1heWJlQXN5bmNSZXN1bHQpKTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZVJlc3VsdChjdHgsIHJlc3VsdCk7XG4gICAgfVxuICAgIHJlZmluZShjaGVjaywgbWVzc2FnZSkge1xuICAgICAgICBjb25zdCBnZXRJc3N1ZVByb3BlcnRpZXMgPSAodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIG1lc3NhZ2UgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UodmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVmaW5lbWVudCgodmFsLCBjdHgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNoZWNrKHZhbCk7XG4gICAgICAgICAgICBjb25zdCBzZXRFcnJvciA9ICgpID0+IGN0eC5hZGRJc3N1ZSh7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmN1c3RvbSxcbiAgICAgICAgICAgICAgICAuLi5nZXRJc3N1ZVByb3BlcnRpZXModmFsKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBQcm9taXNlICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlZmluZW1lbnQoY2hlY2ssIHJlZmluZW1lbnREYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZpbmVtZW50KCh2YWwsIGN0eCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjaGVjayh2YWwpKSB7XG4gICAgICAgICAgICAgICAgY3R4LmFkZElzc3VlKHR5cGVvZiByZWZpbmVtZW50RGF0YSA9PT0gXCJmdW5jdGlvblwiID8gcmVmaW5lbWVudERhdGEodmFsLCBjdHgpIDogcmVmaW5lbWVudERhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3JlZmluZW1lbnQocmVmaW5lbWVudCkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZEVmZmVjdHMoe1xuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLFxuICAgICAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RFZmZlY3RzLFxuICAgICAgICAgICAgZWZmZWN0OiB7IHR5cGU6IFwicmVmaW5lbWVudFwiLCByZWZpbmVtZW50IH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdXBlclJlZmluZShyZWZpbmVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZpbmVtZW50KHJlZmluZW1lbnQpO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihkZWYpIHtcbiAgICAgICAgLyoqIEFsaWFzIG9mIHNhZmVQYXJzZUFzeW5jICovXG4gICAgICAgIHRoaXMuc3BhID0gdGhpcy5zYWZlUGFyc2VBc3luYztcbiAgICAgICAgdGhpcy5fZGVmID0gZGVmO1xuICAgICAgICB0aGlzLnBhcnNlID0gdGhpcy5wYXJzZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNhZmVQYXJzZSA9IHRoaXMuc2FmZVBhcnNlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucGFyc2VBc3luYyA9IHRoaXMucGFyc2VBc3luYy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNhZmVQYXJzZUFzeW5jID0gdGhpcy5zYWZlUGFyc2VBc3luYy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNwYSA9IHRoaXMuc3BhLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVmaW5lID0gdGhpcy5yZWZpbmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZWZpbmVtZW50ID0gdGhpcy5yZWZpbmVtZW50LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3VwZXJSZWZpbmUgPSB0aGlzLnN1cGVyUmVmaW5lLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub3B0aW9uYWwgPSB0aGlzLm9wdGlvbmFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMubnVsbGFibGUgPSB0aGlzLm51bGxhYmxlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMubnVsbGlzaCA9IHRoaXMubnVsbGlzaC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmFycmF5ID0gdGhpcy5hcnJheS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnByb21pc2UgPSB0aGlzLnByb21pc2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vciA9IHRoaXMub3IuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hbmQgPSB0aGlzLmFuZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYnJhbmQgPSB0aGlzLmJyYW5kLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IHRoaXMuZGVmYXVsdC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNhdGNoID0gdGhpcy5jYXRjaC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmRlc2NyaWJlID0gdGhpcy5kZXNjcmliZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnBpcGUgPSB0aGlzLnBpcGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZWFkb25seSA9IHRoaXMucmVhZG9ubHkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5pc051bGxhYmxlID0gdGhpcy5pc051bGxhYmxlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaXNPcHRpb25hbCA9IHRoaXMuaXNPcHRpb25hbC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzW1wifnN0YW5kYXJkXCJdID0ge1xuICAgICAgICAgICAgdmVyc2lvbjogMSxcbiAgICAgICAgICAgIHZlbmRvcjogXCJ6b2RcIixcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoZGF0YSkgPT4gdGhpc1tcIn52YWxpZGF0ZVwiXShkYXRhKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgb3B0aW9uYWwoKSB7XG4gICAgICAgIHJldHVybiBab2RPcHRpb25hbC5jcmVhdGUodGhpcywgdGhpcy5fZGVmKTtcbiAgICB9XG4gICAgbnVsbGFibGUoKSB7XG4gICAgICAgIHJldHVybiBab2ROdWxsYWJsZS5jcmVhdGUodGhpcywgdGhpcy5fZGVmKTtcbiAgICB9XG4gICAgbnVsbGlzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVsbGFibGUoKS5vcHRpb25hbCgpO1xuICAgIH1cbiAgICBhcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIFpvZEFycmF5LmNyZWF0ZSh0aGlzKTtcbiAgICB9XG4gICAgcHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIFpvZFByb21pc2UuY3JlYXRlKHRoaXMsIHRoaXMuX2RlZik7XG4gICAgfVxuICAgIG9yKG9wdGlvbikge1xuICAgICAgICByZXR1cm4gWm9kVW5pb24uY3JlYXRlKFt0aGlzLCBvcHRpb25dLCB0aGlzLl9kZWYpO1xuICAgIH1cbiAgICBhbmQoaW5jb21pbmcpIHtcbiAgICAgICAgcmV0dXJuIFpvZEludGVyc2VjdGlvbi5jcmVhdGUodGhpcywgaW5jb21pbmcsIHRoaXMuX2RlZik7XG4gICAgfVxuICAgIHRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RFZmZlY3RzKHtcbiAgICAgICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXModGhpcy5fZGVmKSxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcyxcbiAgICAgICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kRWZmZWN0cyxcbiAgICAgICAgICAgIGVmZmVjdDogeyB0eXBlOiBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0gfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRlZmF1bHQoZGVmKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZUZ1bmMgPSB0eXBlb2YgZGVmID09PSBcImZ1bmN0aW9uXCIgPyBkZWYgOiAoKSA9PiBkZWY7XG4gICAgICAgIHJldHVybiBuZXcgWm9kRGVmYXVsdCh7XG4gICAgICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHRoaXMuX2RlZiksXG4gICAgICAgICAgICBpbm5lclR5cGU6IHRoaXMsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRlZmF1bHRWYWx1ZUZ1bmMsXG4gICAgICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZERlZmF1bHQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBicmFuZCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RCcmFuZGVkKHtcbiAgICAgICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kQnJhbmRlZCxcbiAgICAgICAgICAgIHR5cGU6IHRoaXMsXG4gICAgICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHRoaXMuX2RlZiksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYXRjaChkZWYpIHtcbiAgICAgICAgY29uc3QgY2F0Y2hWYWx1ZUZ1bmMgPSB0eXBlb2YgZGVmID09PSBcImZ1bmN0aW9uXCIgPyBkZWYgOiAoKSA9PiBkZWY7XG4gICAgICAgIHJldHVybiBuZXcgWm9kQ2F0Y2goe1xuICAgICAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyh0aGlzLl9kZWYpLFxuICAgICAgICAgICAgaW5uZXJUeXBlOiB0aGlzLFxuICAgICAgICAgICAgY2F0Y2hWYWx1ZTogY2F0Y2hWYWx1ZUZ1bmMsXG4gICAgICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZENhdGNoLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVzY3JpYmUoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgY29uc3QgVGhpcyA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICAgIHJldHVybiBuZXcgVGhpcyh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBpcGUodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBab2RQaXBlbGluZS5jcmVhdGUodGhpcywgdGFyZ2V0KTtcbiAgICB9XG4gICAgcmVhZG9ubHkoKSB7XG4gICAgICAgIHJldHVybiBab2RSZWFkb25seS5jcmVhdGUodGhpcyk7XG4gICAgfVxuICAgIGlzT3B0aW9uYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhZmVQYXJzZSh1bmRlZmluZWQpLnN1Y2Nlc3M7XG4gICAgfVxuICAgIGlzTnVsbGFibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhZmVQYXJzZShudWxsKS5zdWNjZXNzO1xuICAgIH1cbn1cbmNvbnN0IGN1aWRSZWdleCA9IC9eY1teXFxzLV17OCx9JC9pO1xuY29uc3QgY3VpZDJSZWdleCA9IC9eWzAtOWEtel0rJC87XG5jb25zdCB1bGlkUmVnZXggPSAvXlswLTlBLUhKS01OUC1UVi1aXXsyNn0kL2k7XG4vLyBjb25zdCB1dWlkUmVnZXggPVxuLy8gICAvXihbYS1mMC05XXs4fS1bYS1mMC05XXs0fS1bMS01XVthLWYwLTldezN9LVthLWYwLTldezR9LVthLWYwLTldezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pO1xuY29uc3QgdXVpZFJlZ2V4ID0gL15bMC05YS1mQS1GXXs4fVxcYi1bMC05YS1mQS1GXXs0fVxcYi1bMC05YS1mQS1GXXs0fVxcYi1bMC05YS1mQS1GXXs0fVxcYi1bMC05YS1mQS1GXXsxMn0kL2k7XG5jb25zdCBuYW5vaWRSZWdleCA9IC9eW2EtejAtOV8tXXsyMX0kL2k7XG5jb25zdCBqd3RSZWdleCA9IC9eW0EtWmEtejAtOS1fXStcXC5bQS1aYS16MC05LV9dK1xcLltBLVphLXowLTktX10qJC87XG5jb25zdCBkdXJhdGlvblJlZ2V4ID0gL15bLStdP1AoPyEkKSg/Oig/OlstK10/XFxkK1kpfCg/OlstK10/XFxkK1suLF1cXGQrWSQpKT8oPzooPzpbLStdP1xcZCtNKXwoPzpbLStdP1xcZCtbLixdXFxkK00kKSk/KD86KD86Wy0rXT9cXGQrVyl8KD86Wy0rXT9cXGQrWy4sXVxcZCtXJCkpPyg/Oig/OlstK10/XFxkK0QpfCg/OlstK10/XFxkK1suLF1cXGQrRCQpKT8oPzpUKD89W1xcZCstXSkoPzooPzpbLStdP1xcZCtIKXwoPzpbLStdP1xcZCtbLixdXFxkK0gkKSk/KD86KD86Wy0rXT9cXGQrTSl8KD86Wy0rXT9cXGQrWy4sXVxcZCtNJCkpPyg/OlstK10/XFxkKyg/OlsuLF1cXGQrKT9TKT8pPz8kLztcbi8vIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ2MTgxLzE1NTAxNTVcbi8vIG9sZCB2ZXJzaW9uOiB0b28gc2xvdywgZGlkbid0IHN1cHBvcnQgdW5pY29kZVxuLy8gY29uc3QgZW1haWxSZWdleCA9IC9eKCgoW2Etel18XFxkfFshI1xcJCUmJ1xcKlxcK1xcLVxcLz1cXD9cXF5fYHtcXHx9fl18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKyhcXC4oW2Etel18XFxkfFshI1xcJCUmJ1xcKlxcK1xcLVxcLz1cXD9cXF5fYHtcXHx9fl18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKykqKXwoKFxceDIyKSgoKChcXHgyMHxcXHgwOSkqKFxceDBkXFx4MGEpKT8oXFx4MjB8XFx4MDkpKyk/KChbXFx4MDEtXFx4MDhcXHgwYlxceDBjXFx4MGUtXFx4MWZcXHg3Zl18XFx4MjF8W1xceDIzLVxceDViXXxbXFx4NWQtXFx4N2VdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoXFxcXChbXFx4MDEtXFx4MDlcXHgwYlxceDBjXFx4MGQtXFx4N2ZdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSkpKSooKChcXHgyMHxcXHgwOSkqKFxceDBkXFx4MGEpKT8oXFx4MjB8XFx4MDkpKyk/KFxceDIyKSkpQCgoKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KChbYS16XXxcXGR8W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKihbYS16XXxcXGR8W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKSlcXC4pKygoW2Etel18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCgoW2Etel18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKihbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKSQvaTtcbi8vb2xkIGVtYWlsIHJlZ2V4XG4vLyBjb25zdCBlbWFpbFJlZ2V4ID0gL14oKFtePD4oKVtcXF0uLDs6XFxzQFwiXSsoXFwuW148PigpW1xcXS4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKCg/IS0pKFtePD4oKVtcXF0uLDs6XFxzQFwiXStcXC4pK1tePD4oKVtcXF0uLDs6XFxzQFwiXXsxLH0pW14tPD4oKVtcXF0uLDs6XFxzQFwiXSQvaTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuLy8gY29uc3QgZW1haWxSZWdleCA9XG4vLyAgIC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcWygoKDI1WzAtNV0pfCgyWzAtNF1bMC05XSl8KDFbMC05XXsyfSl8KFswLTldezEsMn0pKVxcLil7M30oKDI1WzAtNV0pfCgyWzAtNF1bMC05XSl8KDFbMC05XXsyfSl8KFswLTldezEsMn0pKVxcXSl8KFxcW0lQdjY6KChbYS1mMC05XXsxLDR9Oil7N318OjooW2EtZjAtOV17MSw0fTopezAsNn18KFthLWYwLTldezEsNH06KXsxfTooW2EtZjAtOV17MSw0fTopezAsNX18KFthLWYwLTldezEsNH06KXsyfTooW2EtZjAtOV17MSw0fTopezAsNH18KFthLWYwLTldezEsNH06KXszfTooW2EtZjAtOV17MSw0fTopezAsM318KFthLWYwLTldezEsNH06KXs0fTooW2EtZjAtOV17MSw0fTopezAsMn18KFthLWYwLTldezEsNH06KXs1fTooW2EtZjAtOV17MSw0fTopezAsMX0pKFthLWYwLTldezEsNH18KCgoMjVbMC01XSl8KDJbMC00XVswLTldKXwoMVswLTldezJ9KXwoWzAtOV17MSwyfSkpXFwuKXszfSgoMjVbMC01XSl8KDJbMC00XVswLTldKXwoMVswLTldezJ9KXwoWzAtOV17MSwyfSkpKVxcXSl8KFtBLVphLXowLTldKFtBLVphLXowLTktXSpbQS1aYS16MC05XSkqKFxcLltBLVphLXpdezIsfSkrKSkkLztcbi8vIGNvbnN0IGVtYWlsUmVnZXggPVxuLy8gICAvXlthLXpBLVowLTlcXC5cXCFcXCNcXCRcXCVcXCZcXCdcXCpcXCtcXC9cXD1cXD9cXF5cXF9cXGBcXHtcXHxcXH1cXH5cXC1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKiQvO1xuLy8gY29uc3QgZW1haWxSZWdleCA9XG4vLyAgIC9eKD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlxcLlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSspKnxcIig/OltcXHgwMS1cXHgwOFxceDBiXFx4MGNcXHgwZS1cXHgxZlxceDIxXFx4MjMtXFx4NWJcXHg1ZC1cXHg3Zl18XFxcXFtcXHgwMS1cXHgwOVxceDBiXFx4MGNcXHgwZS1cXHg3Zl0pKlwiKUAoPzooPzpbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XFwuKStbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/fFxcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXC4pezN9KD86MjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/fFthLXowLTktXSpbYS16MC05XTooPzpbXFx4MDEtXFx4MDhcXHgwYlxceDBjXFx4MGUtXFx4MWZcXHgyMS1cXHg1YVxceDUzLVxceDdmXXxcXFxcW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBlLVxceDdmXSkrKVxcXSkkL2k7XG5jb25zdCBlbWFpbFJlZ2V4ID0gL14oPyFcXC4pKD8hLipcXC5cXC4pKFtBLVowLTlfJytcXC1cXC5dKilbQS1aMC05XystXUAoW0EtWjAtOV1bQS1aMC05XFwtXSpcXC4pK1tBLVpdezIsfSQvaTtcbi8vIGNvbnN0IGVtYWlsUmVnZXggPVxuLy8gICAvXlthLXowLTkuISMkJSZcdTIwMTkqKy89P15fYHt8fX4tXStAW2EtejAtOS1dKyg/OlxcLlthLXowLTlcXC1dKykqJC9pO1xuLy8gZnJvbSBodHRwczovL3RoZWtldmluc2NvdHQuY29tL2Vtb2ppcy1pbi1qYXZhc2NyaXB0LyN3cml0aW5nLWEtcmVndWxhci1leHByZXNzaW9uXG5jb25zdCBfZW1vamlSZWdleCA9IGBeKFxcXFxwe0V4dGVuZGVkX1BpY3RvZ3JhcGhpY318XFxcXHB7RW1vamlfQ29tcG9uZW50fSkrJGA7XG5sZXQgZW1vamlSZWdleDtcbi8vIGZhc3Rlciwgc2ltcGxlciwgc2FmZXJcbmNvbnN0IGlwdjRSZWdleCA9IC9eKD86KD86MjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV1bMC05XXxbMS05XVswLTldfFswLTldKVxcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfDFbMC05XVswLTldfFsxLTldWzAtOV18WzAtOV0pJC87XG5jb25zdCBpcHY0Q2lkclJlZ2V4ID0gL14oPzooPzoyNVswLTVdfDJbMC00XVswLTldfDFbMC05XVswLTldfFsxLTldWzAtOV18WzAtOV0pXFwuKXszfSg/OjI1WzAtNV18MlswLTRdWzAtOV18MVswLTldWzAtOV18WzEtOV1bMC05XXxbMC05XSlcXC8oM1swLTJdfFsxMl0/WzAtOV0pJC87XG4vLyBjb25zdCBpcHY2UmVnZXggPVxuLy8gL14oKFthLWYwLTldezEsNH06KXs3fXw6OihbYS1mMC05XXsxLDR9Oil7MCw2fXwoW2EtZjAtOV17MSw0fTopezF9OihbYS1mMC05XXsxLDR9Oil7MCw1fXwoW2EtZjAtOV17MSw0fTopezJ9OihbYS1mMC05XXsxLDR9Oil7MCw0fXwoW2EtZjAtOV17MSw0fTopezN9OihbYS1mMC05XXsxLDR9Oil7MCwzfXwoW2EtZjAtOV17MSw0fTopezR9OihbYS1mMC05XXsxLDR9Oil7MCwyfXwoW2EtZjAtOV17MSw0fTopezV9OihbYS1mMC05XXsxLDR9Oil7MCwxfSkoW2EtZjAtOV17MSw0fXwoKCgyNVswLTVdKXwoMlswLTRdWzAtOV0pfCgxWzAtOV17Mn0pfChbMC05XXsxLDJ9KSlcXC4pezN9KCgyNVswLTVdKXwoMlswLTRdWzAtOV0pfCgxWzAtOV17Mn0pfChbMC05XXsxLDJ9KSkpJC87XG5jb25zdCBpcHY2UmVnZXggPSAvXigoWzAtOWEtZkEtRl17MSw0fTopezcsN31bMC05YS1mQS1GXXsxLDR9fChbMC05YS1mQS1GXXsxLDR9Oil7MSw3fTp8KFswLTlhLWZBLUZdezEsNH06KXsxLDZ9OlswLTlhLWZBLUZdezEsNH18KFswLTlhLWZBLUZdezEsNH06KXsxLDV9KDpbMC05YS1mQS1GXXsxLDR9KXsxLDJ9fChbMC05YS1mQS1GXXsxLDR9Oil7MSw0fSg6WzAtOWEtZkEtRl17MSw0fSl7MSwzfXwoWzAtOWEtZkEtRl17MSw0fTopezEsM30oOlswLTlhLWZBLUZdezEsNH0pezEsNH18KFswLTlhLWZBLUZdezEsNH06KXsxLDJ9KDpbMC05YS1mQS1GXXsxLDR9KXsxLDV9fFswLTlhLWZBLUZdezEsNH06KCg6WzAtOWEtZkEtRl17MSw0fSl7MSw2fSl8OigoOlswLTlhLWZBLUZdezEsNH0pezEsN318Oil8ZmU4MDooOlswLTlhLWZBLUZdezAsNH0pezAsNH0lWzAtOWEtekEtWl17MSx9fDo6KGZmZmYoOjB7MSw0fSl7MCwxfTopezAsMX0oKDI1WzAtNV18KDJbMC00XXwxezAsMX1bMC05XSl7MCwxfVswLTldKVxcLil7MywzfSgyNVswLTVdfCgyWzAtNF18MXswLDF9WzAtOV0pezAsMX1bMC05XSl8KFswLTlhLWZBLUZdezEsNH06KXsxLDR9OigoMjVbMC01XXwoMlswLTRdfDF7MCwxfVswLTldKXswLDF9WzAtOV0pXFwuKXszLDN9KDI1WzAtNV18KDJbMC00XXwxezAsMX1bMC05XSl7MCwxfVswLTldKSkkLztcbmNvbnN0IGlwdjZDaWRyUmVnZXggPSAvXigoWzAtOWEtZkEtRl17MSw0fTopezcsN31bMC05YS1mQS1GXXsxLDR9fChbMC05YS1mQS1GXXsxLDR9Oil7MSw3fTp8KFswLTlhLWZBLUZdezEsNH06KXsxLDZ9OlswLTlhLWZBLUZdezEsNH18KFswLTlhLWZBLUZdezEsNH06KXsxLDV9KDpbMC05YS1mQS1GXXsxLDR9KXsxLDJ9fChbMC05YS1mQS1GXXsxLDR9Oil7MSw0fSg6WzAtOWEtZkEtRl17MSw0fSl7MSwzfXwoWzAtOWEtZkEtRl17MSw0fTopezEsM30oOlswLTlhLWZBLUZdezEsNH0pezEsNH18KFswLTlhLWZBLUZdezEsNH06KXsxLDJ9KDpbMC05YS1mQS1GXXsxLDR9KXsxLDV9fFswLTlhLWZBLUZdezEsNH06KCg6WzAtOWEtZkEtRl17MSw0fSl7MSw2fSl8OigoOlswLTlhLWZBLUZdezEsNH0pezEsN318Oil8ZmU4MDooOlswLTlhLWZBLUZdezAsNH0pezAsNH0lWzAtOWEtekEtWl17MSx9fDo6KGZmZmYoOjB7MSw0fSl7MCwxfTopezAsMX0oKDI1WzAtNV18KDJbMC00XXwxezAsMX1bMC05XSl7MCwxfVswLTldKVxcLil7MywzfSgyNVswLTVdfCgyWzAtNF18MXswLDF9WzAtOV0pezAsMX1bMC05XSl8KFswLTlhLWZBLUZdezEsNH06KXsxLDR9OigoMjVbMC01XXwoMlswLTRdfDF7MCwxfVswLTldKXswLDF9WzAtOV0pXFwuKXszLDN9KDI1WzAtNV18KDJbMC00XXwxezAsMX1bMC05XSl7MCwxfVswLTldKSlcXC8oMTJbMC04XXwxWzAxXVswLTldfFsxLTldP1swLTldKSQvO1xuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzg2MDM5Mi9kZXRlcm1pbmUtaWYtc3RyaW5nLWlzLWluLWJhc2U2NC11c2luZy1qYXZhc2NyaXB0XG5jb25zdCBiYXNlNjRSZWdleCA9IC9eKFswLTlhLXpBLVorL117NH0pKigoWzAtOWEtekEtWisvXXsyfT09KXwoWzAtOWEtekEtWisvXXszfT0pKT8kLztcbi8vIGh0dHBzOi8vYmFzZTY0Lmd1cnUvc3RhbmRhcmRzL2Jhc2U2NHVybFxuY29uc3QgYmFzZTY0dXJsUmVnZXggPSAvXihbMC05YS16QS1aLV9dezR9KSooKFswLTlhLXpBLVotX117Mn0oPT0pPyl8KFswLTlhLXpBLVotX117M30oPSk/KSk/JC87XG4vLyBzaW1wbGVcbi8vIGNvbnN0IGRhdGVSZWdleFNvdXJjZSA9IGBcXFxcZHs0fS1cXFxcZHsyfS1cXFxcZHsyfWA7XG4vLyBubyBsZWFwIHllYXIgdmFsaWRhdGlvblxuLy8gY29uc3QgZGF0ZVJlZ2V4U291cmNlID0gYFxcXFxkezR9LSgoMFsxMzU3OF18MTB8MTIpLTMxfCgwWzEzLTldfDFbMC0yXSktMzB8KDBbMS05XXwxWzAtMl0pLSgwWzEtOV18MVxcXFxkfDJcXFxcZCkpYDtcbi8vIHdpdGggbGVhcCB5ZWFyIHZhbGlkYXRpb25cbmNvbnN0IGRhdGVSZWdleFNvdXJjZSA9IGAoKFxcXFxkXFxcXGRbMjQ2OF1bMDQ4XXxcXFxcZFxcXFxkWzEzNTc5XVsyNl18XFxcXGRcXFxcZDBbNDhdfFswMjQ2OF1bMDQ4XTAwfFsxMzU3OV1bMjZdMDApLTAyLTI5fFxcXFxkezR9LSgoMFsxMzU3OF18MVswMl0pLSgwWzEtOV18WzEyXVxcXFxkfDNbMDFdKXwoMFs0NjldfDExKS0oMFsxLTldfFsxMl1cXFxcZHwzMCl8KDAyKS0oMFsxLTldfDFcXFxcZHwyWzAtOF0pKSlgO1xuY29uc3QgZGF0ZVJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7ZGF0ZVJlZ2V4U291cmNlfSRgKTtcbmZ1bmN0aW9uIHRpbWVSZWdleFNvdXJjZShhcmdzKSB7XG4gICAgbGV0IHNlY29uZHNSZWdleFNvdXJjZSA9IGBbMC01XVxcXFxkYDtcbiAgICBpZiAoYXJncy5wcmVjaXNpb24pIHtcbiAgICAgICAgc2Vjb25kc1JlZ2V4U291cmNlID0gYCR7c2Vjb25kc1JlZ2V4U291cmNlfVxcXFwuXFxcXGR7JHthcmdzLnByZWNpc2lvbn19YDtcbiAgICB9XG4gICAgZWxzZSBpZiAoYXJncy5wcmVjaXNpb24gPT0gbnVsbCkge1xuICAgICAgICBzZWNvbmRzUmVnZXhTb3VyY2UgPSBgJHtzZWNvbmRzUmVnZXhTb3VyY2V9KFxcXFwuXFxcXGQrKT9gO1xuICAgIH1cbiAgICBjb25zdCBzZWNvbmRzUXVhbnRpZmllciA9IGFyZ3MucHJlY2lzaW9uID8gXCIrXCIgOiBcIj9cIjsgLy8gcmVxdWlyZSBzZWNvbmRzIGlmIHByZWNpc2lvbiBpcyBub256ZXJvXG4gICAgcmV0dXJuIGAoWzAxXVxcXFxkfDJbMC0zXSk6WzAtNV1cXFxcZCg6JHtzZWNvbmRzUmVnZXhTb3VyY2V9KSR7c2Vjb25kc1F1YW50aWZpZXJ9YDtcbn1cbmZ1bmN0aW9uIHRpbWVSZWdleChhcmdzKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoYF4ke3RpbWVSZWdleFNvdXJjZShhcmdzKX0kYCk7XG59XG4vLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMxNDMyMzFcbmV4cG9ydCBmdW5jdGlvbiBkYXRldGltZVJlZ2V4KGFyZ3MpIHtcbiAgICBsZXQgcmVnZXggPSBgJHtkYXRlUmVnZXhTb3VyY2V9VCR7dGltZVJlZ2V4U291cmNlKGFyZ3MpfWA7XG4gICAgY29uc3Qgb3B0cyA9IFtdO1xuICAgIG9wdHMucHVzaChhcmdzLmxvY2FsID8gYFo/YCA6IGBaYCk7XG4gICAgaWYgKGFyZ3Mub2Zmc2V0KVxuICAgICAgICBvcHRzLnB1c2goYChbKy1dXFxcXGR7Mn06P1xcXFxkezJ9KWApO1xuICAgIHJlZ2V4ID0gYCR7cmVnZXh9KCR7b3B0cy5qb2luKFwifFwiKX0pYDtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChgXiR7cmVnZXh9JGApO1xufVxuZnVuY3Rpb24gaXNWYWxpZElQKGlwLCB2ZXJzaW9uKSB7XG4gICAgaWYgKCh2ZXJzaW9uID09PSBcInY0XCIgfHwgIXZlcnNpb24pICYmIGlwdjRSZWdleC50ZXN0KGlwKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCh2ZXJzaW9uID09PSBcInY2XCIgfHwgIXZlcnNpb24pICYmIGlwdjZSZWdleC50ZXN0KGlwKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNWYWxpZEpXVChqd3QsIGFsZykge1xuICAgIGlmICghand0UmVnZXgudGVzdChqd3QpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgW2hlYWRlcl0gPSBqd3Quc3BsaXQoXCIuXCIpO1xuICAgICAgICBpZiAoIWhlYWRlcilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gQ29udmVydCBiYXNlNjR1cmwgdG8gYmFzZTY0XG4gICAgICAgIGNvbnN0IGJhc2U2NCA9IGhlYWRlclxuICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgXCIrXCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvXy9nLCBcIi9cIilcbiAgICAgICAgICAgIC5wYWRFbmQoaGVhZGVyLmxlbmd0aCArICgoNCAtIChoZWFkZXIubGVuZ3RoICUgNCkpICUgNCksIFwiPVwiKTtcbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IEpTT04ucGFyc2UoYXRvYihiYXNlNjQpKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkZWNvZGVkICE9PSBcIm9iamVjdFwiIHx8IGRlY29kZWQgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChcInR5cFwiIGluIGRlY29kZWQgJiYgZGVjb2RlZD8udHlwICE9PSBcIkpXVFwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIWRlY29kZWQuYWxnKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoYWxnICYmIGRlY29kZWQuYWxnICE9PSBhbGcpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBpc1ZhbGlkQ2lkcihpcCwgdmVyc2lvbikge1xuICAgIGlmICgodmVyc2lvbiA9PT0gXCJ2NFwiIHx8ICF2ZXJzaW9uKSAmJiBpcHY0Q2lkclJlZ2V4LnRlc3QoaXApKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoKHZlcnNpb24gPT09IFwidjZcIiB8fCAhdmVyc2lvbikgJiYgaXB2NkNpZHJSZWdleC50ZXN0KGlwKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0IGNsYXNzIFpvZFN0cmluZyBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5fZGVmLmNvZXJjZSkge1xuICAgICAgICAgICAgaW5wdXQuZGF0YSA9IFN0cmluZyhpbnB1dC5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLnN0cmluZykge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5zdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0dXMgPSBuZXcgUGFyc2VTdGF0dXMoKTtcbiAgICAgICAgbGV0IGN0eCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yIChjb25zdCBjaGVjayBvZiB0aGlzLl9kZWYuY2hlY2tzKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2sua2luZCA9PT0gXCJtaW5cIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5kYXRhLmxlbmd0aCA8IGNoZWNrLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fc21hbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiBjaGVjay52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleGFjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJtYXhcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5kYXRhLmxlbmd0aCA+IGNoZWNrLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fYmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bTogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwibGVuZ3RoXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b29CaWcgPSBpbnB1dC5kYXRhLmxlbmd0aCA+IGNoZWNrLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvb1NtYWxsID0gaW5wdXQuZGF0YS5sZW5ndGggPCBjaGVjay52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodG9vQmlnIHx8IHRvb1NtYWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9vQmlnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUudG9vX2JpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtOiBjaGVjay52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGFjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodG9vU21hbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fc21hbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bTogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwiZW1haWxcIikge1xuICAgICAgICAgICAgICAgIGlmICghZW1haWxSZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImVtb2ppXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVtb2ppUmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1vamlSZWdleCA9IG5ldyBSZWdFeHAoX2Vtb2ppUmVnZXgsIFwidVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlbW9qaVJlZ2V4LnRlc3QoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJlbW9qaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwidXVpZFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1dWlkUmVnZXgudGVzdChpbnB1dC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcInV1aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcIm5hbm9pZFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW5vaWRSZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwibmFub2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJjdWlkXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1aWRSZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiY3VpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwiY3VpZDJcIikge1xuICAgICAgICAgICAgICAgIGlmICghY3VpZDJSZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiY3VpZDJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcInVsaWRcIikge1xuICAgICAgICAgICAgICAgIGlmICghdWxpZFJlZ2V4LnRlc3QoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJ1bGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJ1cmxcIikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBVUkwoaW5wdXQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJ1cmxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcInJlZ2V4XCIpIHtcbiAgICAgICAgICAgICAgICBjaGVjay5yZWdleC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlc3RSZXN1bHQgPSBjaGVjay5yZWdleC50ZXN0KGlucHV0LmRhdGEpO1xuICAgICAgICAgICAgICAgIGlmICghdGVzdFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcInJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJ0cmltXCIpIHtcbiAgICAgICAgICAgICAgICBpbnB1dC5kYXRhID0gaW5wdXQuZGF0YS50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImluY2x1ZGVzXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlucHV0LmRhdGEuaW5jbHVkZXMoY2hlY2sudmFsdWUsIGNoZWNrLnBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7IGluY2x1ZGVzOiBjaGVjay52YWx1ZSwgcG9zaXRpb246IGNoZWNrLnBvc2l0aW9uIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJ0b0xvd2VyQ2FzZVwiKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuZGF0YSA9IGlucHV0LmRhdGEudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwidG9VcHBlckNhc2VcIikge1xuICAgICAgICAgICAgICAgIGlucHV0LmRhdGEgPSBpbnB1dC5kYXRhLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcInN0YXJ0c1dpdGhcIikge1xuICAgICAgICAgICAgICAgIGlmICghaW5wdXQuZGF0YS5zdGFydHNXaXRoKGNoZWNrLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7IHN0YXJ0c1dpdGg6IGNoZWNrLnZhbHVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJlbmRzV2l0aFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpbnB1dC5kYXRhLmVuZHNXaXRoKGNoZWNrLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB7IGVuZHNXaXRoOiBjaGVjay52YWx1ZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwiZGF0ZXRpbWVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gZGF0ZXRpbWVSZWdleChjaGVjayk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWdleC50ZXN0KGlucHV0LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiZGF0ZXRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImRhdGVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gZGF0ZVJlZ2V4O1xuICAgICAgICAgICAgICAgIGlmICghcmVnZXgudGVzdChpbnB1dC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcInRpbWVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gdGltZVJlZ2V4KGNoZWNrKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlZ2V4LnRlc3QoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJ0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJkdXJhdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkdXJhdGlvblJlZ2V4LnRlc3QoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJkdXJhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwiaXBcIikge1xuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZElQKGlucHV0LmRhdGEsIGNoZWNrLnZlcnNpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IFwiaXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImp3dFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkSldUKGlucHV0LmRhdGEsIGNoZWNrLmFsZykpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJqd3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImNpZHJcIikge1xuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZENpZHIoaW5wdXQuZGF0YSwgY2hlY2sudmVyc2lvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJjaWRyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJiYXNlNjRcIikge1xuICAgICAgICAgICAgICAgIGlmICghYmFzZTY0UmVnZXgudGVzdChpbnB1dC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiBcImJhc2U2NFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwiYmFzZTY0dXJsXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJhc2U2NHVybFJlZ2V4LnRlc3QoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogXCJiYXNlNjR1cmxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1dGlsLmFzc2VydE5ldmVyKGNoZWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdGF0dXM6IHN0YXR1cy52YWx1ZSwgdmFsdWU6IGlucHV0LmRhdGEgfTtcbiAgICB9XG4gICAgX3JlZ2V4KHJlZ2V4LCB2YWxpZGF0aW9uLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZmluZW1lbnQoKGRhdGEpID0+IHJlZ2V4LnRlc3QoZGF0YSksIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb24sXG4gICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9zdHJpbmcsXG4gICAgICAgICAgICAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfYWRkQ2hlY2soY2hlY2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RTdHJpbmcoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgY2hlY2tzOiBbLi4udGhpcy5fZGVmLmNoZWNrcywgY2hlY2tdLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZW1haWwobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soeyBraW5kOiBcImVtYWlsXCIsIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSB9KTtcbiAgICB9XG4gICAgdXJsKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJ1cmxcIiwgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpIH0pO1xuICAgIH1cbiAgICBlbW9qaShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwiZW1vamlcIiwgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpIH0pO1xuICAgIH1cbiAgICB1dWlkKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJ1dWlkXCIsIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSB9KTtcbiAgICB9XG4gICAgbmFub2lkKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJuYW5vaWRcIiwgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpIH0pO1xuICAgIH1cbiAgICBjdWlkKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJjdWlkXCIsIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSB9KTtcbiAgICB9XG4gICAgY3VpZDIobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soeyBraW5kOiBcImN1aWQyXCIsIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSB9KTtcbiAgICB9XG4gICAgdWxpZChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwidWxpZFwiLCAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSkgfSk7XG4gICAgfVxuICAgIGJhc2U2NChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwiYmFzZTY0XCIsIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSB9KTtcbiAgICB9XG4gICAgYmFzZTY0dXJsKG1lc3NhZ2UpIHtcbiAgICAgICAgLy8gYmFzZTY0dXJsIGVuY29kaW5nIGlzIGEgbW9kaWZpY2F0aW9uIG9mIGJhc2U2NCB0aGF0IGNhbiBzYWZlbHkgYmUgdXNlZCBpbiBVUkxzIGFuZCBmaWxlbmFtZXNcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwiYmFzZTY0dXJsXCIsXG4gICAgICAgICAgICAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBqd3Qob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soeyBraW5kOiBcImp3dFwiLCAuLi5lcnJvclV0aWwuZXJyVG9PYmoob3B0aW9ucykgfSk7XG4gICAgfVxuICAgIGlwKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJpcFwiLCAuLi5lcnJvclV0aWwuZXJyVG9PYmoob3B0aW9ucykgfSk7XG4gICAgfVxuICAgIGNpZHIob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soeyBraW5kOiBcImNpZHJcIiwgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG9wdGlvbnMpIH0pO1xuICAgIH1cbiAgICBkYXRldGltZShvcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgICAgICBraW5kOiBcImRhdGV0aW1lXCIsXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uOiBudWxsLFxuICAgICAgICAgICAgICAgIG9mZnNldDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9jYWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG9wdGlvbnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJkYXRldGltZVwiLFxuICAgICAgICAgICAgcHJlY2lzaW9uOiB0eXBlb2Ygb3B0aW9ucz8ucHJlY2lzaW9uID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IG9wdGlvbnM/LnByZWNpc2lvbixcbiAgICAgICAgICAgIG9mZnNldDogb3B0aW9ucz8ub2Zmc2V0ID8/IGZhbHNlLFxuICAgICAgICAgICAgbG9jYWw6IG9wdGlvbnM/LmxvY2FsID8/IGZhbHNlLFxuICAgICAgICAgICAgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG9wdGlvbnM/Lm1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGF0ZShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7IGtpbmQ6IFwiZGF0ZVwiLCBtZXNzYWdlIH0pO1xuICAgIH1cbiAgICB0aW1lKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAgICAgIGtpbmQ6IFwidGltZVwiLFxuICAgICAgICAgICAgICAgIHByZWNpc2lvbjogbnVsbCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwidGltZVwiLFxuICAgICAgICAgICAgcHJlY2lzaW9uOiB0eXBlb2Ygb3B0aW9ucz8ucHJlY2lzaW9uID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IG9wdGlvbnM/LnByZWNpc2lvbixcbiAgICAgICAgICAgIC4uLmVycm9yVXRpbC5lcnJUb09iaihvcHRpb25zPy5tZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGR1cmF0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHsga2luZDogXCJkdXJhdGlvblwiLCAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSkgfSk7XG4gICAgfVxuICAgIHJlZ2V4KHJlZ2V4LCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcInJlZ2V4XCIsXG4gICAgICAgICAgICByZWdleDogcmVnZXgsXG4gICAgICAgICAgICAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpbmNsdWRlcyh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJpbmNsdWRlc1wiLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgcG9zaXRpb246IG9wdGlvbnM/LnBvc2l0aW9uLFxuICAgICAgICAgICAgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG9wdGlvbnM/Lm1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhcnRzV2l0aCh2YWx1ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJzdGFydHNXaXRoXCIsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbmRzV2l0aCh2YWx1ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJlbmRzV2l0aFwiLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWluKG1pbkxlbmd0aCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtaW5cIixcbiAgICAgICAgICAgIHZhbHVlOiBtaW5MZW5ndGgsXG4gICAgICAgICAgICAuLi5lcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtYXgobWF4TGVuZ3RoLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcIm1heFwiLFxuICAgICAgICAgICAgdmFsdWU6IG1heExlbmd0aCxcbiAgICAgICAgICAgIC4uLmVycm9yVXRpbC5lcnJUb09iaihtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxlbmd0aChsZW4sIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibGVuZ3RoXCIsXG4gICAgICAgICAgICB2YWx1ZTogbGVuLFxuICAgICAgICAgICAgLi4uZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXF1aXZhbGVudCB0byBgLm1pbigxKWBcbiAgICAgKi9cbiAgICBub25lbXB0eShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbigxLCBlcnJvclV0aWwuZXJyVG9PYmoobWVzc2FnZSkpO1xuICAgIH1cbiAgICB0cmltKCkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZFN0cmluZyh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBjaGVja3M6IFsuLi50aGlzLl9kZWYuY2hlY2tzLCB7IGtpbmQ6IFwidHJpbVwiIH1dLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdG9Mb3dlckNhc2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kU3RyaW5nKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIGNoZWNrczogWy4uLnRoaXMuX2RlZi5jaGVja3MsIHsga2luZDogXCJ0b0xvd2VyQ2FzZVwiIH1dLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdG9VcHBlckNhc2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kU3RyaW5nKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIGNoZWNrczogWy4uLnRoaXMuX2RlZi5jaGVja3MsIHsga2luZDogXCJ0b1VwcGVyQ2FzZVwiIH1dLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IGlzRGF0ZXRpbWUoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwiZGF0ZXRpbWVcIik7XG4gICAgfVxuICAgIGdldCBpc0RhdGUoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwiZGF0ZVwiKTtcbiAgICB9XG4gICAgZ2V0IGlzVGltZSgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGVmLmNoZWNrcy5maW5kKChjaCkgPT4gY2gua2luZCA9PT0gXCJ0aW1lXCIpO1xuICAgIH1cbiAgICBnZXQgaXNEdXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGVmLmNoZWNrcy5maW5kKChjaCkgPT4gY2gua2luZCA9PT0gXCJkdXJhdGlvblwiKTtcbiAgICB9XG4gICAgZ2V0IGlzRW1haWwoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwiZW1haWxcIik7XG4gICAgfVxuICAgIGdldCBpc1VSTCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGVmLmNoZWNrcy5maW5kKChjaCkgPT4gY2gua2luZCA9PT0gXCJ1cmxcIik7XG4gICAgfVxuICAgIGdldCBpc0Vtb2ppKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImVtb2ppXCIpO1xuICAgIH1cbiAgICBnZXQgaXNVVUlEKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcInV1aWRcIik7XG4gICAgfVxuICAgIGdldCBpc05BTk9JRCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGVmLmNoZWNrcy5maW5kKChjaCkgPT4gY2gua2luZCA9PT0gXCJuYW5vaWRcIik7XG4gICAgfVxuICAgIGdldCBpc0NVSUQoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwiY3VpZFwiKTtcbiAgICB9XG4gICAgZ2V0IGlzQ1VJRDIoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwiY3VpZDJcIik7XG4gICAgfVxuICAgIGdldCBpc1VMSUQoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwidWxpZFwiKTtcbiAgICB9XG4gICAgZ2V0IGlzSVAoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwiaXBcIik7XG4gICAgfVxuICAgIGdldCBpc0NJRFIoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2RlZi5jaGVja3MuZmluZCgoY2gpID0+IGNoLmtpbmQgPT09IFwiY2lkclwiKTtcbiAgICB9XG4gICAgZ2V0IGlzQmFzZTY0KCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImJhc2U2NFwiKTtcbiAgICB9XG4gICAgZ2V0IGlzQmFzZTY0dXJsKCkge1xuICAgICAgICAvLyBiYXNlNjR1cmwgZW5jb2RpbmcgaXMgYSBtb2RpZmljYXRpb24gb2YgYmFzZTY0IHRoYXQgY2FuIHNhZmVseSBiZSB1c2VkIGluIFVSTHMgYW5kIGZpbGVuYW1lc1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImJhc2U2NHVybFwiKTtcbiAgICB9XG4gICAgZ2V0IG1pbkxlbmd0aCgpIHtcbiAgICAgICAgbGV0IG1pbiA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3QgY2ggb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoLmtpbmQgPT09IFwibWluXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWluID09PSBudWxsIHx8IGNoLnZhbHVlID4gbWluKVxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBjaC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluO1xuICAgIH1cbiAgICBnZXQgbWF4TGVuZ3RoKCkge1xuICAgICAgICBsZXQgbWF4ID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBjaCBvZiB0aGlzLl9kZWYuY2hlY2tzKSB7XG4gICAgICAgICAgICBpZiAoY2gua2luZCA9PT0gXCJtYXhcIikge1xuICAgICAgICAgICAgICAgIGlmIChtYXggPT09IG51bGwgfHwgY2gudmFsdWUgPCBtYXgpXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IGNoLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxufVxuWm9kU3RyaW5nLmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZFN0cmluZyh7XG4gICAgICAgIGNoZWNrczogW10sXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kU3RyaW5nLFxuICAgICAgICBjb2VyY2U6IHBhcmFtcz8uY29lcmNlID8/IGZhbHNlLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzk2NjQ4NC93aHktZG9lcy1tb2R1bHVzLW9wZXJhdG9yLXJldHVybi1mcmFjdGlvbmFsLW51bWJlci1pbi1qYXZhc2NyaXB0LzMxNzExMDM0IzMxNzExMDM0XG5mdW5jdGlvbiBmbG9hdFNhZmVSZW1haW5kZXIodmFsLCBzdGVwKSB7XG4gICAgY29uc3QgdmFsRGVjQ291bnQgPSAodmFsLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdIHx8IFwiXCIpLmxlbmd0aDtcbiAgICBjb25zdCBzdGVwRGVjQ291bnQgPSAoc3RlcC50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXSB8fCBcIlwiKS5sZW5ndGg7XG4gICAgY29uc3QgZGVjQ291bnQgPSB2YWxEZWNDb3VudCA+IHN0ZXBEZWNDb3VudCA/IHZhbERlY0NvdW50IDogc3RlcERlY0NvdW50O1xuICAgIGNvbnN0IHZhbEludCA9IE51bWJlci5wYXJzZUludCh2YWwudG9GaXhlZChkZWNDb3VudCkucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgIGNvbnN0IHN0ZXBJbnQgPSBOdW1iZXIucGFyc2VJbnQoc3RlcC50b0ZpeGVkKGRlY0NvdW50KS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgcmV0dXJuICh2YWxJbnQgJSBzdGVwSW50KSAvIDEwICoqIGRlY0NvdW50O1xufVxuZXhwb3J0IGNsYXNzIFpvZE51bWJlciBleHRlbmRzIFpvZFR5cGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLm1pbiA9IHRoaXMuZ3RlO1xuICAgICAgICB0aGlzLm1heCA9IHRoaXMubHRlO1xuICAgICAgICB0aGlzLnN0ZXAgPSB0aGlzLm11bHRpcGxlT2Y7XG4gICAgfVxuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5fZGVmLmNvZXJjZSkge1xuICAgICAgICAgICAgaW5wdXQuZGF0YSA9IE51bWJlcihpbnB1dC5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLm51bWJlcikge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5udW1iZXIsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3R4ID0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBzdGF0dXMgPSBuZXcgUGFyc2VTdGF0dXMoKTtcbiAgICAgICAgZm9yIChjb25zdCBjaGVjayBvZiB0aGlzLl9kZWYuY2hlY2tzKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2sua2luZCA9PT0gXCJpbnRcIikge1xuICAgICAgICAgICAgICAgIGlmICghdXRpbC5pc0ludGVnZXIoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBcImludGVnZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBcImZsb2F0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hlY2sua2luZCA9PT0gXCJtaW5cIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvb1NtYWxsID0gY2hlY2suaW5jbHVzaXZlID8gaW5wdXQuZGF0YSA8IGNoZWNrLnZhbHVlIDogaW5wdXQuZGF0YSA8PSBjaGVjay52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodG9vU21hbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19zbWFsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW06IGNoZWNrLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogY2hlY2suaW5jbHVzaXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwibWF4XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b29CaWcgPSBjaGVjay5pbmNsdXNpdmUgPyBpbnB1dC5kYXRhID4gY2hlY2sudmFsdWUgOiBpbnB1dC5kYXRhID49IGNoZWNrLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0b29CaWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19iaWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtOiBjaGVjay52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IGNoZWNrLmluY2x1c2l2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcIm11bHRpcGxlT2ZcIikge1xuICAgICAgICAgICAgICAgIGlmIChmbG9hdFNhZmVSZW1haW5kZXIoaW5wdXQuZGF0YSwgY2hlY2sudmFsdWUpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0LCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5ub3RfbXVsdGlwbGVfb2YsXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZU9mOiBjaGVjay52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcImZpbml0ZVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLm5vdF9maW5pdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXRpbC5hc3NlcnROZXZlcihjaGVjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMudmFsdWUsIHZhbHVlOiBpbnB1dC5kYXRhIH07XG4gICAgfVxuICAgIGd0ZSh2YWx1ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRMaW1pdChcIm1pblwiLCB2YWx1ZSwgdHJ1ZSwgZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgZ3QodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TGltaXQoXCJtaW5cIiwgdmFsdWUsIGZhbHNlLCBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSkpO1xuICAgIH1cbiAgICBsdGUodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TGltaXQoXCJtYXhcIiwgdmFsdWUsIHRydWUsIGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSk7XG4gICAgfVxuICAgIGx0KHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldExpbWl0KFwibWF4XCIsIHZhbHVlLCBmYWxzZSwgZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgc2V0TGltaXQoa2luZCwgdmFsdWUsIGluY2x1c2l2ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZE51bWJlcih7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBjaGVja3M6IFtcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9kZWYuY2hlY2tzLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2FkZENoZWNrKGNoZWNrKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kTnVtYmVyKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIGNoZWNrczogWy4uLnRoaXMuX2RlZi5jaGVja3MsIGNoZWNrXSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGludChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcImludFwiLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcG9zaXRpdmUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtaW5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgaW5jbHVzaXZlOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5lZ2F0aXZlKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibWF4XCIsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIGluY2x1c2l2ZTogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBub25wb3NpdGl2ZShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcIm1heFwiLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBub25uZWdhdGl2ZShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcIm1pblwiLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtdWx0aXBsZU9mKHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcIm11bHRpcGxlT2ZcIixcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbml0ZShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcImZpbml0ZVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2FmZShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcIm1pblwiLFxuICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KS5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtYXhcIixcbiAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBtaW5WYWx1ZSgpIHtcbiAgICAgICAgbGV0IG1pbiA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3QgY2ggb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoLmtpbmQgPT09IFwibWluXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWluID09PSBudWxsIHx8IGNoLnZhbHVlID4gbWluKVxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBjaC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluO1xuICAgIH1cbiAgICBnZXQgbWF4VmFsdWUoKSB7XG4gICAgICAgIGxldCBtYXggPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGNoIG9mIHRoaXMuX2RlZi5jaGVja3MpIHtcbiAgICAgICAgICAgIGlmIChjaC5raW5kID09PSBcIm1heFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1heCA9PT0gbnVsbCB8fCBjaC52YWx1ZSA8IG1heClcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gY2gudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICB9XG4gICAgZ2V0IGlzSW50KCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kZWYuY2hlY2tzLmZpbmQoKGNoKSA9PiBjaC5raW5kID09PSBcImludFwiIHx8IChjaC5raW5kID09PSBcIm11bHRpcGxlT2ZcIiAmJiB1dGlsLmlzSW50ZWdlcihjaC52YWx1ZSkpKTtcbiAgICB9XG4gICAgZ2V0IGlzRmluaXRlKCkge1xuICAgICAgICBsZXQgbWF4ID0gbnVsbDtcbiAgICAgICAgbGV0IG1pbiA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3QgY2ggb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoLmtpbmQgPT09IFwiZmluaXRlXCIgfHwgY2gua2luZCA9PT0gXCJpbnRcIiB8fCBjaC5raW5kID09PSBcIm11bHRpcGxlT2ZcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2gua2luZCA9PT0gXCJtaW5cIikge1xuICAgICAgICAgICAgICAgIGlmIChtaW4gPT09IG51bGwgfHwgY2gudmFsdWUgPiBtaW4pXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IGNoLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2gua2luZCA9PT0gXCJtYXhcIikge1xuICAgICAgICAgICAgICAgIGlmIChtYXggPT09IG51bGwgfHwgY2gudmFsdWUgPCBtYXgpXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IGNoLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUobWluKSAmJiBOdW1iZXIuaXNGaW5pdGUobWF4KTtcbiAgICB9XG59XG5ab2ROdW1iZXIuY3JlYXRlID0gKHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kTnVtYmVyKHtcbiAgICAgICAgY2hlY2tzOiBbXSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2ROdW1iZXIsXG4gICAgICAgIGNvZXJjZTogcGFyYW1zPy5jb2VyY2UgfHwgZmFsc2UsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kQmlnSW50IGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMubWluID0gdGhpcy5ndGU7XG4gICAgICAgIHRoaXMubWF4ID0gdGhpcy5sdGU7XG4gICAgfVxuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5fZGVmLmNvZXJjZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbnB1dC5kYXRhID0gQmlnSW50KGlucHV0LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRJbnZhbGlkSW5wdXQoaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0aGlzLl9nZXRUeXBlKGlucHV0KTtcbiAgICAgICAgaWYgKHBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUuYmlnaW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0SW52YWxpZElucHV0KGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3R4ID0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBzdGF0dXMgPSBuZXcgUGFyc2VTdGF0dXMoKTtcbiAgICAgICAgZm9yIChjb25zdCBjaGVjayBvZiB0aGlzLl9kZWYuY2hlY2tzKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2sua2luZCA9PT0gXCJtaW5cIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvb1NtYWxsID0gY2hlY2suaW5jbHVzaXZlID8gaW5wdXQuZGF0YSA8IGNoZWNrLnZhbHVlIDogaW5wdXQuZGF0YSA8PSBjaGVjay52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodG9vU21hbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19zbWFsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYmlnaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiBjaGVjay52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogY2hlY2suaW5jbHVzaXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoZWNrLmtpbmQgPT09IFwibWF4XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b29CaWcgPSBjaGVjay5pbmNsdXNpdmUgPyBpbnB1dC5kYXRhID4gY2hlY2sudmFsdWUgOiBpbnB1dC5kYXRhID49IGNoZWNrLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0b29CaWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19iaWcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImJpZ2ludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bTogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IGNoZWNrLmluY2x1c2l2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNoZWNrLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcIm11bHRpcGxlT2ZcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5kYXRhICUgY2hlY2sudmFsdWUgIT09IEJpZ0ludCgwKSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUubm90X211bHRpcGxlX29mLFxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGVPZjogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXRpbC5hc3NlcnROZXZlcihjaGVjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMudmFsdWUsIHZhbHVlOiBpbnB1dC5kYXRhIH07XG4gICAgfVxuICAgIF9nZXRJbnZhbGlkSW5wdXQoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5iaWdpbnQsXG4gICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICB9XG4gICAgZ3RlKHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldExpbWl0KFwibWluXCIsIHZhbHVlLCB0cnVlLCBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSkpO1xuICAgIH1cbiAgICBndCh2YWx1ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRMaW1pdChcIm1pblwiLCB2YWx1ZSwgZmFsc2UsIGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSk7XG4gICAgfVxuICAgIGx0ZSh2YWx1ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRMaW1pdChcIm1heFwiLCB2YWx1ZSwgdHJ1ZSwgZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgbHQodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TGltaXQoXCJtYXhcIiwgdmFsdWUsIGZhbHNlLCBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSkpO1xuICAgIH1cbiAgICBzZXRMaW1pdChraW5kLCB2YWx1ZSwgaW5jbHVzaXZlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kQmlnSW50KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIGNoZWNrczogW1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX2RlZi5jaGVja3MsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVzaXZlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfYWRkQ2hlY2soY2hlY2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RCaWdJbnQoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgY2hlY2tzOiBbLi4udGhpcy5fZGVmLmNoZWNrcywgY2hlY2tdLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcG9zaXRpdmUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtaW5cIixcbiAgICAgICAgICAgIHZhbHVlOiBCaWdJbnQoMCksXG4gICAgICAgICAgICBpbmNsdXNpdmU6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbmVnYXRpdmUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtYXhcIixcbiAgICAgICAgICAgIHZhbHVlOiBCaWdJbnQoMCksXG4gICAgICAgICAgICBpbmNsdXNpdmU6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbm9ucG9zaXRpdmUobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtYXhcIixcbiAgICAgICAgICAgIHZhbHVlOiBCaWdJbnQoMCksXG4gICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBub25uZWdhdGl2ZShtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRDaGVjayh7XG4gICAgICAgICAgICBraW5kOiBcIm1pblwiLFxuICAgICAgICAgICAgdmFsdWU6IEJpZ0ludCgwKSxcbiAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG11bHRpcGxlT2YodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibXVsdGlwbGVPZlwiLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgbWluVmFsdWUoKSB7XG4gICAgICAgIGxldCBtaW4gPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGNoIG9mIHRoaXMuX2RlZi5jaGVja3MpIHtcbiAgICAgICAgICAgIGlmIChjaC5raW5kID09PSBcIm1pblwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1pbiA9PT0gbnVsbCB8fCBjaC52YWx1ZSA+IG1pbilcbiAgICAgICAgICAgICAgICAgICAgbWluID0gY2gudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgZ2V0IG1heFZhbHVlKCkge1xuICAgICAgICBsZXQgbWF4ID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBjaCBvZiB0aGlzLl9kZWYuY2hlY2tzKSB7XG4gICAgICAgICAgICBpZiAoY2gua2luZCA9PT0gXCJtYXhcIikge1xuICAgICAgICAgICAgICAgIGlmIChtYXggPT09IG51bGwgfHwgY2gudmFsdWUgPCBtYXgpXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IGNoLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxufVxuWm9kQmlnSW50LmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZEJpZ0ludCh7XG4gICAgICAgIGNoZWNrczogW10sXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kQmlnSW50LFxuICAgICAgICBjb2VyY2U6IHBhcmFtcz8uY29lcmNlID8/IGZhbHNlLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZEJvb2xlYW4gZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RlZi5jb2VyY2UpIHtcbiAgICAgICAgICAgIGlucHV0LmRhdGEgPSBCb29sZWFuKGlucHV0LmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0aGlzLl9nZXRUeXBlKGlucHV0KTtcbiAgICAgICAgaWYgKHBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUuYm9vbGVhbikge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5ib29sZWFuLFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9LKGlucHV0LmRhdGEpO1xuICAgIH1cbn1cblpvZEJvb2xlYW4uY3JlYXRlID0gKHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kQm9vbGVhbih7XG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kQm9vbGVhbixcbiAgICAgICAgY29lcmNlOiBwYXJhbXM/LmNvZXJjZSB8fCBmYWxzZSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2REYXRlIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLl9kZWYuY29lcmNlKSB7XG4gICAgICAgICAgICBpbnB1dC5kYXRhID0gbmV3IERhdGUoaW5wdXQuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyc2VkVHlwZSA9IHRoaXMuX2dldFR5cGUoaW5wdXQpO1xuICAgICAgICBpZiAocGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5kYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLmRhdGUsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGlucHV0LmRhdGEuZ2V0VGltZSgpKSkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfZGF0ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdHVzID0gbmV3IFBhcnNlU3RhdHVzKCk7XG4gICAgICAgIGxldCBjdHggPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAoY29uc3QgY2hlY2sgb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoZWNrLmtpbmQgPT09IFwibWluXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZGF0YS5nZXRUaW1lKCkgPCBjaGVjay52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUudG9vX3NtYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogY2hlY2subWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4YWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW06IGNoZWNrLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGVjay5raW5kID09PSBcIm1heFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LmRhdGEuZ2V0VGltZSgpID4gY2hlY2sudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19iaWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjaGVjay5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVzaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bTogY2hlY2sudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0aWwuYXNzZXJ0TmV2ZXIoY2hlY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1cy52YWx1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShpbnB1dC5kYXRhLmdldFRpbWUoKSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIF9hZGRDaGVjayhjaGVjaykge1xuICAgICAgICByZXR1cm4gbmV3IFpvZERhdGUoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgY2hlY2tzOiBbLi4udGhpcy5fZGVmLmNoZWNrcywgY2hlY2tdLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWluKG1pbkRhdGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZENoZWNrKHtcbiAgICAgICAgICAgIGtpbmQ6IFwibWluXCIsXG4gICAgICAgICAgICB2YWx1ZTogbWluRGF0ZS5nZXRUaW1lKCksXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtYXgobWF4RGF0ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkQ2hlY2soe1xuICAgICAgICAgICAga2luZDogXCJtYXhcIixcbiAgICAgICAgICAgIHZhbHVlOiBtYXhEYXRlLmdldFRpbWUoKSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBtaW5EYXRlKCkge1xuICAgICAgICBsZXQgbWluID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBjaCBvZiB0aGlzLl9kZWYuY2hlY2tzKSB7XG4gICAgICAgICAgICBpZiAoY2gua2luZCA9PT0gXCJtaW5cIikge1xuICAgICAgICAgICAgICAgIGlmIChtaW4gPT09IG51bGwgfHwgY2gudmFsdWUgPiBtaW4pXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IGNoLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW4gIT0gbnVsbCA/IG5ldyBEYXRlKG1pbikgOiBudWxsO1xuICAgIH1cbiAgICBnZXQgbWF4RGF0ZSgpIHtcbiAgICAgICAgbGV0IG1heCA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3QgY2ggb2YgdGhpcy5fZGVmLmNoZWNrcykge1xuICAgICAgICAgICAgaWYgKGNoLmtpbmQgPT09IFwibWF4XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF4ID09PSBudWxsIHx8IGNoLnZhbHVlIDwgbWF4KVxuICAgICAgICAgICAgICAgICAgICBtYXggPSBjaC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4ICE9IG51bGwgPyBuZXcgRGF0ZShtYXgpIDogbnVsbDtcbiAgICB9XG59XG5ab2REYXRlLmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZERhdGUoe1xuICAgICAgICBjaGVja3M6IFtdLFxuICAgICAgICBjb2VyY2U6IHBhcmFtcz8uY29lcmNlIHx8IGZhbHNlLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZERhdGUsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kU3ltYm9sIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0aGlzLl9nZXRUeXBlKGlucHV0KTtcbiAgICAgICAgaWYgKHBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUuc3ltYm9sKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLnN5bWJvbCxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPSyhpbnB1dC5kYXRhKTtcbiAgICB9XG59XG5ab2RTeW1ib2wuY3JlYXRlID0gKHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kU3ltYm9sKHtcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RTeW1ib2wsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kVW5kZWZpbmVkIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0aGlzLl9nZXRUeXBlKGlucHV0KTtcbiAgICAgICAgaWYgKHBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUudW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLnVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPSyhpbnB1dC5kYXRhKTtcbiAgICB9XG59XG5ab2RVbmRlZmluZWQuY3JlYXRlID0gKHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kVW5kZWZpbmVkKHtcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RVbmRlZmluZWQsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kTnVsbCBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLm51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUubnVsbCxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPSyhpbnB1dC5kYXRhKTtcbiAgICB9XG59XG5ab2ROdWxsLmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZE51bGwoe1xuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZE51bGwsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kQW55IGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIC8vIHRvIHByZXZlbnQgaW5zdGFuY2VzIG9mIG90aGVyIGNsYXNzZXMgZnJvbSBleHRlbmRpbmcgWm9kQW55LiB0aGlzIGNhdXNlcyBpc3N1ZXMgd2l0aCBjYXRjaGFsbCBpbiBab2RPYmplY3QuXG4gICAgICAgIHRoaXMuX2FueSA9IHRydWU7XG4gICAgfVxuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gT0soaW5wdXQuZGF0YSk7XG4gICAgfVxufVxuWm9kQW55LmNyZWF0ZSA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZEFueSh7XG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kQW55LFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZFVua25vd24gZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgLy8gcmVxdWlyZWRcbiAgICAgICAgdGhpcy5fdW5rbm93biA9IHRydWU7XG4gICAgfVxuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gT0soaW5wdXQuZGF0YSk7XG4gICAgfVxufVxuWm9kVW5rbm93bi5jcmVhdGUgPSAocGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RVbmtub3duKHtcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RVbmtub3duLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZE5ldmVyIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUubmV2ZXIsXG4gICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICB9XG59XG5ab2ROZXZlci5jcmVhdGUgPSAocGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2ROZXZlcih7XG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kTmV2ZXIsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kVm9pZCBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCBwYXJzZWRUeXBlID0gdGhpcy5fZ2V0VHlwZShpbnB1dCk7XG4gICAgICAgIGlmIChwYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLnVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fZ2V0T3JSZXR1cm5DdHgoaW5wdXQpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS52b2lkLFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9LKGlucHV0LmRhdGEpO1xuICAgIH1cbn1cblpvZFZvaWQuY3JlYXRlID0gKHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kVm9pZCh7XG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kVm9pZCxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2RBcnJheSBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCB7IGN0eCwgc3RhdHVzIH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBjb25zdCBkZWYgPSB0aGlzLl9kZWY7XG4gICAgICAgIGlmIChjdHgucGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5hcnJheSkge1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5hcnJheSxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWYuZXhhY3RMZW5ndGggIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvb0JpZyA9IGN0eC5kYXRhLmxlbmd0aCA+IGRlZi5leGFjdExlbmd0aC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHRvb1NtYWxsID0gY3R4LmRhdGEubGVuZ3RoIDwgZGVmLmV4YWN0TGVuZ3RoLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHRvb0JpZyB8fCB0b29TbWFsbCkge1xuICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiB0b29CaWcgPyBab2RJc3N1ZUNvZGUudG9vX2JpZyA6IFpvZElzc3VlQ29kZS50b29fc21hbGwsXG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW06ICh0b29TbWFsbCA/IGRlZi5leGFjdExlbmd0aC52YWx1ZSA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgICAgIG1heGltdW06ICh0b29CaWcgPyBkZWYuZXhhY3RMZW5ndGgudmFsdWUgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlZi5leGFjdExlbmd0aC5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkZWYubWluTGVuZ3RoICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY3R4LmRhdGEubGVuZ3RoIDwgZGVmLm1pbkxlbmd0aC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUudG9vX3NtYWxsLFxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiBkZWYubWluTGVuZ3RoLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZWYubWluTGVuZ3RoLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZi5tYXhMZW5ndGggIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjdHguZGF0YS5sZW5ndGggPiBkZWYubWF4TGVuZ3RoLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fYmlnLFxuICAgICAgICAgICAgICAgICAgICBtYXhpbXVtOiBkZWYubWF4TGVuZ3RoLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZWYubWF4TGVuZ3RoLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbLi4uY3R4LmRhdGFdLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWYudHlwZS5fcGFyc2VBc3luYyhuZXcgUGFyc2VJbnB1dExhenlQYXRoKGN0eCwgaXRlbSwgY3R4LnBhdGgsIGkpKTtcbiAgICAgICAgICAgIH0pKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUGFyc2VTdGF0dXMubWVyZ2VBcnJheShzdGF0dXMsIHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBbLi4uY3R4LmRhdGFdLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRlZi50eXBlLl9wYXJzZVN5bmMobmV3IFBhcnNlSW5wdXRMYXp5UGF0aChjdHgsIGl0ZW0sIGN0eC5wYXRoLCBpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUGFyc2VTdGF0dXMubWVyZ2VBcnJheShzdGF0dXMsIHJlc3VsdCk7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnR5cGU7XG4gICAgfVxuICAgIG1pbihtaW5MZW5ndGgsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RBcnJheSh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBtaW5MZW5ndGg6IHsgdmFsdWU6IG1pbkxlbmd0aCwgbWVzc2FnZTogZXJyb3JVdGlsLnRvU3RyaW5nKG1lc3NhZ2UpIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtYXgobWF4TGVuZ3RoLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kQXJyYXkoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgbWF4TGVuZ3RoOiB7IHZhbHVlOiBtYXhMZW5ndGgsIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGVuZ3RoKGxlbiwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZEFycmF5KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIGV4YWN0TGVuZ3RoOiB7IHZhbHVlOiBsZW4sIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbm9uZW1wdHkobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5taW4oMSwgbWVzc2FnZSk7XG4gICAgfVxufVxuWm9kQXJyYXkuY3JlYXRlID0gKHNjaGVtYSwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RBcnJheSh7XG4gICAgICAgIHR5cGU6IHNjaGVtYSxcbiAgICAgICAgbWluTGVuZ3RoOiBudWxsLFxuICAgICAgICBtYXhMZW5ndGg6IG51bGwsXG4gICAgICAgIGV4YWN0TGVuZ3RoOiBudWxsLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEFycmF5LFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZnVuY3Rpb24gZGVlcFBhcnRpYWxpZnkoc2NoZW1hKSB7XG4gICAgaWYgKHNjaGVtYSBpbnN0YW5jZW9mIFpvZE9iamVjdCkge1xuICAgICAgICBjb25zdCBuZXdTaGFwZSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEuc2hhcGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkU2NoZW1hID0gc2NoZW1hLnNoYXBlW2tleV07XG4gICAgICAgICAgICBuZXdTaGFwZVtrZXldID0gWm9kT3B0aW9uYWwuY3JlYXRlKGRlZXBQYXJ0aWFsaWZ5KGZpZWxkU2NoZW1hKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBab2RPYmplY3Qoe1xuICAgICAgICAgICAgLi4uc2NoZW1hLl9kZWYsXG4gICAgICAgICAgICBzaGFwZTogKCkgPT4gbmV3U2hhcGUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChzY2hlbWEgaW5zdGFuY2VvZiBab2RBcnJheSkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZEFycmF5KHtcbiAgICAgICAgICAgIC4uLnNjaGVtYS5fZGVmLFxuICAgICAgICAgICAgdHlwZTogZGVlcFBhcnRpYWxpZnkoc2NoZW1hLmVsZW1lbnQpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2NoZW1hIGluc3RhbmNlb2YgWm9kT3B0aW9uYWwpIHtcbiAgICAgICAgcmV0dXJuIFpvZE9wdGlvbmFsLmNyZWF0ZShkZWVwUGFydGlhbGlmeShzY2hlbWEudW53cmFwKCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2NoZW1hIGluc3RhbmNlb2YgWm9kTnVsbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIFpvZE51bGxhYmxlLmNyZWF0ZShkZWVwUGFydGlhbGlmeShzY2hlbWEudW53cmFwKCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2NoZW1hIGluc3RhbmNlb2YgWm9kVHVwbGUpIHtcbiAgICAgICAgcmV0dXJuIFpvZFR1cGxlLmNyZWF0ZShzY2hlbWEuaXRlbXMubWFwKChpdGVtKSA9PiBkZWVwUGFydGlhbGlmeShpdGVtKSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgWm9kT2JqZWN0IGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX2NhY2hlZCA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVwcmVjYXRlZCBJbiBtb3N0IGNhc2VzLCB0aGlzIGlzIG5vIGxvbmdlciBuZWVkZWQgLSB1bmtub3duIHByb3BlcnRpZXMgYXJlIG5vdyBzaWxlbnRseSBzdHJpcHBlZC5cbiAgICAgICAgICogSWYgeW91IHdhbnQgdG8gcGFzcyB0aHJvdWdoIHVua25vd24gcHJvcGVydGllcywgdXNlIGAucGFzc3Rocm91Z2goKWAgaW5zdGVhZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubm9uc3RyaWN0ID0gdGhpcy5wYXNzdGhyb3VnaDtcbiAgICAgICAgLy8gZXh0ZW5kPFxuICAgICAgICAvLyAgIEF1Z21lbnRhdGlvbiBleHRlbmRzIFpvZFJhd1NoYXBlLFxuICAgICAgICAvLyAgIE5ld091dHB1dCBleHRlbmRzIHV0aWwuZmxhdHRlbjx7XG4gICAgICAgIC8vICAgICBbayBpbiBrZXlvZiBBdWdtZW50YXRpb24gfCBrZXlvZiBPdXRwdXRdOiBrIGV4dGVuZHMga2V5b2YgQXVnbWVudGF0aW9uXG4gICAgICAgIC8vICAgICAgID8gQXVnbWVudGF0aW9uW2tdW1wiX291dHB1dFwiXVxuICAgICAgICAvLyAgICAgICA6IGsgZXh0ZW5kcyBrZXlvZiBPdXRwdXRcbiAgICAgICAgLy8gICAgICAgPyBPdXRwdXRba11cbiAgICAgICAgLy8gICAgICAgOiBuZXZlcjtcbiAgICAgICAgLy8gICB9PixcbiAgICAgICAgLy8gICBOZXdJbnB1dCBleHRlbmRzIHV0aWwuZmxhdHRlbjx7XG4gICAgICAgIC8vICAgICBbayBpbiBrZXlvZiBBdWdtZW50YXRpb24gfCBrZXlvZiBJbnB1dF06IGsgZXh0ZW5kcyBrZXlvZiBBdWdtZW50YXRpb25cbiAgICAgICAgLy8gICAgICAgPyBBdWdtZW50YXRpb25ba11bXCJfaW5wdXRcIl1cbiAgICAgICAgLy8gICAgICAgOiBrIGV4dGVuZHMga2V5b2YgSW5wdXRcbiAgICAgICAgLy8gICAgICAgPyBJbnB1dFtrXVxuICAgICAgICAvLyAgICAgICA6IG5ldmVyO1xuICAgICAgICAvLyAgIH0+XG4gICAgICAgIC8vID4oXG4gICAgICAgIC8vICAgYXVnbWVudGF0aW9uOiBBdWdtZW50YXRpb25cbiAgICAgICAgLy8gKTogWm9kT2JqZWN0PFxuICAgICAgICAvLyAgIGV4dGVuZFNoYXBlPFQsIEF1Z21lbnRhdGlvbj4sXG4gICAgICAgIC8vICAgVW5rbm93bktleXMsXG4gICAgICAgIC8vICAgQ2F0Y2hhbGwsXG4gICAgICAgIC8vICAgTmV3T3V0cHV0LFxuICAgICAgICAvLyAgIE5ld0lucHV0XG4gICAgICAgIC8vID4ge1xuICAgICAgICAvLyAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgLy8gICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgLy8gICAgIHNoYXBlOiAoKSA9PiAoe1xuICAgICAgICAvLyAgICAgICAuLi50aGlzLl9kZWYuc2hhcGUoKSxcbiAgICAgICAgLy8gICAgICAgLi4uYXVnbWVudGF0aW9uLFxuICAgICAgICAvLyAgICAgfSksXG4gICAgICAgIC8vICAgfSkgYXMgYW55O1xuICAgICAgICAvLyB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYC5leHRlbmRgIGluc3RlYWRcbiAgICAgICAgICogICovXG4gICAgICAgIHRoaXMuYXVnbWVudCA9IHRoaXMuZXh0ZW5kO1xuICAgIH1cbiAgICBfZ2V0Q2FjaGVkKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FjaGVkICE9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlZDtcbiAgICAgICAgY29uc3Qgc2hhcGUgPSB0aGlzLl9kZWYuc2hhcGUoKTtcbiAgICAgICAgY29uc3Qga2V5cyA9IHV0aWwub2JqZWN0S2V5cyhzaGFwZSk7XG4gICAgICAgIHRoaXMuX2NhY2hlZCA9IHsgc2hhcGUsIGtleXMgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlZDtcbiAgICB9XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0aGlzLl9nZXRUeXBlKGlucHV0KTtcbiAgICAgICAgaWYgKHBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUub2JqZWN0KSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLm9iamVjdCxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzLCBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGNvbnN0IHsgc2hhcGUsIGtleXM6IHNoYXBlS2V5cyB9ID0gdGhpcy5fZ2V0Q2FjaGVkKCk7XG4gICAgICAgIGNvbnN0IGV4dHJhS2V5cyA9IFtdO1xuICAgICAgICBpZiAoISh0aGlzLl9kZWYuY2F0Y2hhbGwgaW5zdGFuY2VvZiBab2ROZXZlciAmJiB0aGlzLl9kZWYudW5rbm93bktleXMgPT09IFwic3RyaXBcIikpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGN0eC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzaGFwZUtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBleHRyYUtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWlycyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBzaGFwZUtleXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleVZhbGlkYXRvciA9IHNoYXBlW2tleV07XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN0eC5kYXRhW2tleV07XG4gICAgICAgICAgICBwYWlycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXk6IHsgc3RhdHVzOiBcInZhbGlkXCIsIHZhbHVlOiBrZXkgfSxcbiAgICAgICAgICAgICAgICB2YWx1ZToga2V5VmFsaWRhdG9yLl9wYXJzZShuZXcgUGFyc2VJbnB1dExhenlQYXRoKGN0eCwgdmFsdWUsIGN0eC5wYXRoLCBrZXkpKSxcbiAgICAgICAgICAgICAgICBhbHdheXNTZXQ6IGtleSBpbiBjdHguZGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9kZWYuY2F0Y2hhbGwgaW5zdGFuY2VvZiBab2ROZXZlcikge1xuICAgICAgICAgICAgY29uc3QgdW5rbm93bktleXMgPSB0aGlzLl9kZWYudW5rbm93bktleXM7XG4gICAgICAgICAgICBpZiAodW5rbm93bktleXMgPT09IFwicGFzc3Rocm91Z2hcIikge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGV4dHJhS2V5cykge1xuICAgICAgICAgICAgICAgICAgICBwYWlycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogeyBzdGF0dXM6IFwidmFsaWRcIiwgdmFsdWU6IGtleSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHsgc3RhdHVzOiBcInZhbGlkXCIsIHZhbHVlOiBjdHguZGF0YVtrZXldIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHVua25vd25LZXlzID09PSBcInN0cmljdFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnVucmVjb2duaXplZF9rZXlzLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogZXh0cmFLZXlzLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodW5rbm93bktleXMgPT09IFwic3RyaXBcIikge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnRlcm5hbCBab2RPYmplY3QgZXJyb3I6IGludmFsaWQgdW5rbm93bktleXMgdmFsdWUuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBydW4gY2F0Y2hhbGwgdmFsaWRhdGlvblxuICAgICAgICAgICAgY29uc3QgY2F0Y2hhbGwgPSB0aGlzLl9kZWYuY2F0Y2hhbGw7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBleHRyYUtleXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN0eC5kYXRhW2tleV07XG4gICAgICAgICAgICAgICAgcGFpcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogeyBzdGF0dXM6IFwidmFsaWRcIiwgdmFsdWU6IGtleSB9LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY2F0Y2hhbGwuX3BhcnNlKG5ldyBQYXJzZUlucHV0TGF6eVBhdGgoY3R4LCB2YWx1ZSwgY3R4LnBhdGgsIGtleSkgLy8sIGN0eC5jaGlsZChrZXkpLCB2YWx1ZSwgZ2V0UGFyc2VkVHlwZSh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgYWx3YXlzU2V0OiBrZXkgaW4gY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgICAgIC50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzeW5jUGFpcnMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhaXIgb2YgcGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYXdhaXQgcGFpci5rZXk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgcGFpci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3luY1BhaXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHdheXNTZXQ6IHBhaXIuYWx3YXlzU2V0LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN5bmNQYWlycztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHN5bmNQYWlycykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBQYXJzZVN0YXR1cy5tZXJnZU9iamVjdFN5bmMoc3RhdHVzLCBzeW5jUGFpcnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUGFyc2VTdGF0dXMubWVyZ2VPYmplY3RTeW5jKHN0YXR1cywgcGFpcnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBzaGFwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5zaGFwZSgpO1xuICAgIH1cbiAgICBzdHJpY3QobWVzc2FnZSkge1xuICAgICAgICBlcnJvclV0aWwuZXJyVG9PYmo7XG4gICAgICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIHVua25vd25LZXlzOiBcInN0cmljdFwiLFxuICAgICAgICAgICAgLi4uKG1lc3NhZ2UgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICBlcnJvck1hcDogKGlzc3VlLCBjdHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRFcnJvciA9IHRoaXMuX2RlZi5lcnJvck1hcD8uKGlzc3VlLCBjdHgpLm1lc3NhZ2UgPz8gY3R4LmRlZmF1bHRFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc3N1ZS5jb2RlID09PSBcInVucmVjb2duaXplZF9rZXlzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JVdGlsLmVyclRvT2JqKG1lc3NhZ2UpLm1lc3NhZ2UgPz8gZGVmYXVsdEVycm9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlZmF1bHRFcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RyaXAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIHVua25vd25LZXlzOiBcInN0cmlwXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwYXNzdGhyb3VnaCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RPYmplY3Qoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgdW5rbm93bktleXM6IFwicGFzc3Rocm91Z2hcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGNvbnN0IEF1Z21lbnRGYWN0b3J5ID1cbiAgICAvLyAgIDxEZWYgZXh0ZW5kcyBab2RPYmplY3REZWY+KGRlZjogRGVmKSA9PlxuICAgIC8vICAgPEF1Z21lbnRhdGlvbiBleHRlbmRzIFpvZFJhd1NoYXBlPihcbiAgICAvLyAgICAgYXVnbWVudGF0aW9uOiBBdWdtZW50YXRpb25cbiAgICAvLyAgICk6IFpvZE9iamVjdDxcbiAgICAvLyAgICAgZXh0ZW5kU2hhcGU8UmV0dXJuVHlwZTxEZWZbXCJzaGFwZVwiXT4sIEF1Z21lbnRhdGlvbj4sXG4gICAgLy8gICAgIERlZltcInVua25vd25LZXlzXCJdLFxuICAgIC8vICAgICBEZWZbXCJjYXRjaGFsbFwiXVxuICAgIC8vICAgPiA9PiB7XG4gICAgLy8gICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAvLyAgICAgICAuLi5kZWYsXG4gICAgLy8gICAgICAgc2hhcGU6ICgpID0+ICh7XG4gICAgLy8gICAgICAgICAuLi5kZWYuc2hhcGUoKSxcbiAgICAvLyAgICAgICAgIC4uLmF1Z21lbnRhdGlvbixcbiAgICAvLyAgICAgICB9KSxcbiAgICAvLyAgICAgfSkgYXMgYW55O1xuICAgIC8vICAgfTtcbiAgICBleHRlbmQoYXVnbWVudGF0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIHNoYXBlOiAoKSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX2RlZi5zaGFwZSgpLFxuICAgICAgICAgICAgICAgIC4uLmF1Z21lbnRhdGlvbixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJpb3IgdG8gem9kQDEuMC4xMiB0aGVyZSB3YXMgYSBidWcgaW4gdGhlXG4gICAgICogaW5mZXJyZWQgdHlwZSBvZiBtZXJnZWQgb2JqZWN0cy4gUGxlYXNlXG4gICAgICogdXBncmFkZSBpZiB5b3UgYXJlIGV4cGVyaWVuY2luZyBpc3N1ZXMuXG4gICAgICovXG4gICAgbWVyZ2UobWVyZ2luZykge1xuICAgICAgICBjb25zdCBtZXJnZWQgPSBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIHVua25vd25LZXlzOiBtZXJnaW5nLl9kZWYudW5rbm93bktleXMsXG4gICAgICAgICAgICBjYXRjaGFsbDogbWVyZ2luZy5fZGVmLmNhdGNoYWxsLFxuICAgICAgICAgICAgc2hhcGU6ICgpID0+ICh7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5fZGVmLnNoYXBlKCksXG4gICAgICAgICAgICAgICAgLi4ubWVyZ2luZy5fZGVmLnNoYXBlKCksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kT2JqZWN0LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1lcmdlZDtcbiAgICB9XG4gICAgLy8gbWVyZ2U8XG4gICAgLy8gICBJbmNvbWluZyBleHRlbmRzIEFueVpvZE9iamVjdCxcbiAgICAvLyAgIEF1Z21lbnRhdGlvbiBleHRlbmRzIEluY29taW5nW1wic2hhcGVcIl0sXG4gICAgLy8gICBOZXdPdXRwdXQgZXh0ZW5kcyB7XG4gICAgLy8gICAgIFtrIGluIGtleW9mIEF1Z21lbnRhdGlvbiB8IGtleW9mIE91dHB1dF06IGsgZXh0ZW5kcyBrZXlvZiBBdWdtZW50YXRpb25cbiAgICAvLyAgICAgICA/IEF1Z21lbnRhdGlvbltrXVtcIl9vdXRwdXRcIl1cbiAgICAvLyAgICAgICA6IGsgZXh0ZW5kcyBrZXlvZiBPdXRwdXRcbiAgICAvLyAgICAgICA/IE91dHB1dFtrXVxuICAgIC8vICAgICAgIDogbmV2ZXI7XG4gICAgLy8gICB9LFxuICAgIC8vICAgTmV3SW5wdXQgZXh0ZW5kcyB7XG4gICAgLy8gICAgIFtrIGluIGtleW9mIEF1Z21lbnRhdGlvbiB8IGtleW9mIElucHV0XTogayBleHRlbmRzIGtleW9mIEF1Z21lbnRhdGlvblxuICAgIC8vICAgICAgID8gQXVnbWVudGF0aW9uW2tdW1wiX2lucHV0XCJdXG4gICAgLy8gICAgICAgOiBrIGV4dGVuZHMga2V5b2YgSW5wdXRcbiAgICAvLyAgICAgICA/IElucHV0W2tdXG4gICAgLy8gICAgICAgOiBuZXZlcjtcbiAgICAvLyAgIH1cbiAgICAvLyA+KFxuICAgIC8vICAgbWVyZ2luZzogSW5jb21pbmdcbiAgICAvLyApOiBab2RPYmplY3Q8XG4gICAgLy8gICBleHRlbmRTaGFwZTxULCBSZXR1cm5UeXBlPEluY29taW5nW1wiX2RlZlwiXVtcInNoYXBlXCJdPj4sXG4gICAgLy8gICBJbmNvbWluZ1tcIl9kZWZcIl1bXCJ1bmtub3duS2V5c1wiXSxcbiAgICAvLyAgIEluY29taW5nW1wiX2RlZlwiXVtcImNhdGNoYWxsXCJdLFxuICAgIC8vICAgTmV3T3V0cHV0LFxuICAgIC8vICAgTmV3SW5wdXRcbiAgICAvLyA+IHtcbiAgICAvLyAgIGNvbnN0IG1lcmdlZDogYW55ID0gbmV3IFpvZE9iamVjdCh7XG4gICAgLy8gICAgIHVua25vd25LZXlzOiBtZXJnaW5nLl9kZWYudW5rbm93bktleXMsXG4gICAgLy8gICAgIGNhdGNoYWxsOiBtZXJnaW5nLl9kZWYuY2F0Y2hhbGwsXG4gICAgLy8gICAgIHNoYXBlOiAoKSA9PlxuICAgIC8vICAgICAgIG9iamVjdFV0aWwubWVyZ2VTaGFwZXModGhpcy5fZGVmLnNoYXBlKCksIG1lcmdpbmcuX2RlZi5zaGFwZSgpKSxcbiAgICAvLyAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RPYmplY3QsXG4gICAgLy8gICB9KSBhcyBhbnk7XG4gICAgLy8gICByZXR1cm4gbWVyZ2VkO1xuICAgIC8vIH1cbiAgICBzZXRLZXkoa2V5LCBzY2hlbWEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXVnbWVudCh7IFtrZXldOiBzY2hlbWEgfSk7XG4gICAgfVxuICAgIC8vIG1lcmdlPEluY29taW5nIGV4dGVuZHMgQW55Wm9kT2JqZWN0PihcbiAgICAvLyAgIG1lcmdpbmc6IEluY29taW5nXG4gICAgLy8gKTogLy9ab2RPYmplY3Q8VCAmIEluY29taW5nW1wiX3NoYXBlXCJdLCBVbmtub3duS2V5cywgQ2F0Y2hhbGw+ID0gKG1lcmdpbmcpID0+IHtcbiAgICAvLyBab2RPYmplY3Q8XG4gICAgLy8gICBleHRlbmRTaGFwZTxULCBSZXR1cm5UeXBlPEluY29taW5nW1wiX2RlZlwiXVtcInNoYXBlXCJdPj4sXG4gICAgLy8gICBJbmNvbWluZ1tcIl9kZWZcIl1bXCJ1bmtub3duS2V5c1wiXSxcbiAgICAvLyAgIEluY29taW5nW1wiX2RlZlwiXVtcImNhdGNoYWxsXCJdXG4gICAgLy8gPiB7XG4gICAgLy8gICAvLyBjb25zdCBtZXJnZWRTaGFwZSA9IG9iamVjdFV0aWwubWVyZ2VTaGFwZXMoXG4gICAgLy8gICAvLyAgIHRoaXMuX2RlZi5zaGFwZSgpLFxuICAgIC8vICAgLy8gICBtZXJnaW5nLl9kZWYuc2hhcGUoKVxuICAgIC8vICAgLy8gKTtcbiAgICAvLyAgIGNvbnN0IG1lcmdlZDogYW55ID0gbmV3IFpvZE9iamVjdCh7XG4gICAgLy8gICAgIHVua25vd25LZXlzOiBtZXJnaW5nLl9kZWYudW5rbm93bktleXMsXG4gICAgLy8gICAgIGNhdGNoYWxsOiBtZXJnaW5nLl9kZWYuY2F0Y2hhbGwsXG4gICAgLy8gICAgIHNoYXBlOiAoKSA9PlxuICAgIC8vICAgICAgIG9iamVjdFV0aWwubWVyZ2VTaGFwZXModGhpcy5fZGVmLnNoYXBlKCksIG1lcmdpbmcuX2RlZi5zaGFwZSgpKSxcbiAgICAvLyAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RPYmplY3QsXG4gICAgLy8gICB9KSBhcyBhbnk7XG4gICAgLy8gICByZXR1cm4gbWVyZ2VkO1xuICAgIC8vIH1cbiAgICBjYXRjaGFsbChpbmRleCkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZE9iamVjdCh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBjYXRjaGFsbDogaW5kZXgsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwaWNrKG1hc2spIHtcbiAgICAgICAgY29uc3Qgc2hhcGUgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdXRpbC5vYmplY3RLZXlzKG1hc2spKSB7XG4gICAgICAgICAgICBpZiAobWFza1trZXldICYmIHRoaXMuc2hhcGVba2V5XSkge1xuICAgICAgICAgICAgICAgIHNoYXBlW2tleV0gPSB0aGlzLnNoYXBlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBab2RPYmplY3Qoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgc2hhcGU6ICgpID0+IHNoYXBlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb21pdChtYXNrKSB7XG4gICAgICAgIGNvbnN0IHNoYXBlID0ge307XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHV0aWwub2JqZWN0S2V5cyh0aGlzLnNoYXBlKSkge1xuICAgICAgICAgICAgaWYgKCFtYXNrW2tleV0pIHtcbiAgICAgICAgICAgICAgICBzaGFwZVtrZXldID0gdGhpcy5zaGFwZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIHNoYXBlOiAoKSA9PiBzaGFwZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgZGVlcFBhcnRpYWwoKSB7XG4gICAgICAgIHJldHVybiBkZWVwUGFydGlhbGlmeSh0aGlzKTtcbiAgICB9XG4gICAgcGFydGlhbChtYXNrKSB7XG4gICAgICAgIGNvbnN0IG5ld1NoYXBlID0ge307XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHV0aWwub2JqZWN0S2V5cyh0aGlzLnNoYXBlKSkge1xuICAgICAgICAgICAgY29uc3QgZmllbGRTY2hlbWEgPSB0aGlzLnNoYXBlW2tleV07XG4gICAgICAgICAgICBpZiAobWFzayAmJiAhbWFza1trZXldKSB7XG4gICAgICAgICAgICAgICAgbmV3U2hhcGVba2V5XSA9IGZpZWxkU2NoZW1hO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U2hhcGVba2V5XSA9IGZpZWxkU2NoZW1hLm9wdGlvbmFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBab2RPYmplY3Qoe1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgc2hhcGU6ICgpID0+IG5ld1NoYXBlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVxdWlyZWQobWFzaykge1xuICAgICAgICBjb25zdCBuZXdTaGFwZSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB1dGlsLm9iamVjdEtleXModGhpcy5zaGFwZSkpIHtcbiAgICAgICAgICAgIGlmIChtYXNrICYmICFtYXNrW2tleV0pIHtcbiAgICAgICAgICAgICAgICBuZXdTaGFwZVtrZXldID0gdGhpcy5zaGFwZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGRTY2hlbWEgPSB0aGlzLnNoYXBlW2tleV07XG4gICAgICAgICAgICAgICAgbGV0IG5ld0ZpZWxkID0gZmllbGRTY2hlbWE7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG5ld0ZpZWxkIGluc3RhbmNlb2YgWm9kT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmllbGQgPSBuZXdGaWVsZC5fZGVmLmlubmVyVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3U2hhcGVba2V5XSA9IG5ld0ZpZWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIHNoYXBlOiAoKSA9PiBuZXdTaGFwZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGtleW9mKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlWm9kRW51bSh1dGlsLm9iamVjdEtleXModGhpcy5zaGFwZSkpO1xuICAgIH1cbn1cblpvZE9iamVjdC5jcmVhdGUgPSAoc2hhcGUsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgc2hhcGU6ICgpID0+IHNoYXBlLFxuICAgICAgICB1bmtub3duS2V5czogXCJzdHJpcFwiLFxuICAgICAgICBjYXRjaGFsbDogWm9kTmV2ZXIuY3JlYXRlKCksXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kT2JqZWN0LFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuWm9kT2JqZWN0LnN0cmljdENyZWF0ZSA9IChzaGFwZSwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RPYmplY3Qoe1xuICAgICAgICBzaGFwZTogKCkgPT4gc2hhcGUsXG4gICAgICAgIHVua25vd25LZXlzOiBcInN0cmljdFwiLFxuICAgICAgICBjYXRjaGFsbDogWm9kTmV2ZXIuY3JlYXRlKCksXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kT2JqZWN0LFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuWm9kT2JqZWN0LmxhenljcmVhdGUgPSAoc2hhcGUsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kT2JqZWN0KHtcbiAgICAgICAgc2hhcGUsXG4gICAgICAgIHVua25vd25LZXlzOiBcInN0cmlwXCIsXG4gICAgICAgIGNhdGNoYWxsOiBab2ROZXZlci5jcmVhdGUoKSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RPYmplY3QsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kVW5pb24gZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9kZWYub3B0aW9ucztcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVzdWx0cyhyZXN1bHRzKSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gZmlyc3QgaXNzdWUtZnJlZSB2YWxpZGF0aW9uIGlmIGl0IGV4aXN0c1xuICAgICAgICAgICAgZm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0LnN0YXR1cyA9PT0gXCJ2YWxpZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQucmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdC5zdGF0dXMgPT09IFwiZGlydHlcIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgaXNzdWVzIGZyb20gZGlydHkgb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgIGN0eC5jb21tb24uaXNzdWVzLnB1c2goLi4ucmVzdWx0LmN0eC5jb21tb24uaXNzdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmV0dXJuIGludmFsaWRcbiAgICAgICAgICAgIGNvbnN0IHVuaW9uRXJyb3JzID0gcmVzdWx0cy5tYXAoKHJlc3VsdCkgPT4gbmV3IFpvZEVycm9yKHJlc3VsdC5jdHguY29tbW9uLmlzc3VlcykpO1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdW5pb24sXG4gICAgICAgICAgICAgICAgdW5pb25FcnJvcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwob3B0aW9ucy5tYXAoYXN5bmMgKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkQ3R4ID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5jdHgsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uY3R4LmNvbW1vbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzc3VlczogW10sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogYXdhaXQgb3B0aW9uLl9wYXJzZUFzeW5jKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGNoaWxkQ3R4LFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgY3R4OiBjaGlsZEN0eCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkpLnRoZW4oaGFuZGxlUmVzdWx0cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGlydHkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBpc3N1ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZEN0eCA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uY3R4LFxuICAgICAgICAgICAgICAgICAgICBjb21tb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmN0eC5jb21tb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBpc3N1ZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBvcHRpb24uX3BhcnNlU3luYyh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBjaGlsZEN0eCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gXCJ2YWxpZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdC5zdGF0dXMgPT09IFwiZGlydHlcIiAmJiAhZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlydHkgPSB7IHJlc3VsdCwgY3R4OiBjaGlsZEN0eCB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRDdHguY29tbW9uLmlzc3Vlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNzdWVzLnB1c2goY2hpbGRDdHguY29tbW9uLmlzc3Vlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRpcnR5KSB7XG4gICAgICAgICAgICAgICAgY3R4LmNvbW1vbi5pc3N1ZXMucHVzaCguLi5kaXJ0eS5jdHguY29tbW9uLmlzc3Vlcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpcnR5LnJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHVuaW9uRXJyb3JzID0gaXNzdWVzLm1hcCgoaXNzdWVzKSA9PiBuZXcgWm9kRXJyb3IoaXNzdWVzKSk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF91bmlvbixcbiAgICAgICAgICAgICAgICB1bmlvbkVycm9ycyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYub3B0aW9ucztcbiAgICB9XG59XG5ab2RVbmlvbi5jcmVhdGUgPSAodHlwZXMsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kVW5pb24oe1xuICAgICAgICBvcHRpb25zOiB0eXBlcyxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RVbmlvbixcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy9cbi8vLy8vLy8vLy8gICAgICBab2REaXNjcmltaW5hdGVkVW5pb24gICAgICAvLy8vLy8vLy8vXG4vLy8vLy8vLy8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBnZXREaXNjcmltaW5hdG9yID0gKHR5cGUpID0+IHtcbiAgICBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZExhenkpIHtcbiAgICAgICAgcmV0dXJuIGdldERpc2NyaW1pbmF0b3IodHlwZS5zY2hlbWEpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlIGluc3RhbmNlb2YgWm9kRWZmZWN0cykge1xuICAgICAgICByZXR1cm4gZ2V0RGlzY3JpbWluYXRvcih0eXBlLmlubmVyVHlwZSgpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZExpdGVyYWwpIHtcbiAgICAgICAgcmV0dXJuIFt0eXBlLnZhbHVlXTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZEVudW0pIHtcbiAgICAgICAgcmV0dXJuIHR5cGUub3B0aW9ucztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZE5hdGl2ZUVudW0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGJhbi9iYW5cbiAgICAgICAgcmV0dXJuIHV0aWwub2JqZWN0VmFsdWVzKHR5cGUuZW51bSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2REZWZhdWx0KSB7XG4gICAgICAgIHJldHVybiBnZXREaXNjcmltaW5hdG9yKHR5cGUuX2RlZi5pbm5lclR5cGUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlIGluc3RhbmNlb2YgWm9kVW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBbdW5kZWZpbmVkXTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZE51bGwpIHtcbiAgICAgICAgcmV0dXJuIFtudWxsXTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZE9wdGlvbmFsKSB7XG4gICAgICAgIHJldHVybiBbdW5kZWZpbmVkLCAuLi5nZXREaXNjcmltaW5hdG9yKHR5cGUudW53cmFwKCkpXTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIFpvZE51bGxhYmxlKSB7XG4gICAgICAgIHJldHVybiBbbnVsbCwgLi4uZ2V0RGlzY3JpbWluYXRvcih0eXBlLnVud3JhcCgpKV07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2RCcmFuZGVkKSB7XG4gICAgICAgIHJldHVybiBnZXREaXNjcmltaW5hdG9yKHR5cGUudW53cmFwKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlIGluc3RhbmNlb2YgWm9kUmVhZG9ubHkpIHtcbiAgICAgICAgcmV0dXJuIGdldERpc2NyaW1pbmF0b3IodHlwZS51bndyYXAoKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBab2RDYXRjaCkge1xuICAgICAgICByZXR1cm4gZ2V0RGlzY3JpbWluYXRvcih0eXBlLl9kZWYuaW5uZXJUeXBlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG59O1xuZXhwb3J0IGNsYXNzIFpvZERpc2NyaW1pbmF0ZWRVbmlvbiBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCB7IGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgaWYgKGN0eC5wYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLm9iamVjdCkge1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5vYmplY3QsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXNjcmltaW5hdG9yID0gdGhpcy5kaXNjcmltaW5hdG9yO1xuICAgICAgICBjb25zdCBkaXNjcmltaW5hdG9yVmFsdWUgPSBjdHguZGF0YVtkaXNjcmltaW5hdG9yXTtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5vcHRpb25zTWFwLmdldChkaXNjcmltaW5hdG9yVmFsdWUpO1xuICAgICAgICBpZiAoIW9wdGlvbikge1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdW5pb25fZGlzY3JpbWluYXRvcixcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBBcnJheS5mcm9tKHRoaXMub3B0aW9uc01hcC5rZXlzKCkpLFxuICAgICAgICAgICAgICAgIHBhdGg6IFtkaXNjcmltaW5hdG9yXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uX3BhcnNlQXN5bmMoe1xuICAgICAgICAgICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLl9wYXJzZVN5bmMoe1xuICAgICAgICAgICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGRpc2NyaW1pbmF0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuZGlzY3JpbWluYXRvcjtcbiAgICB9XG4gICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYub3B0aW9ucztcbiAgICB9XG4gICAgZ2V0IG9wdGlvbnNNYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYub3B0aW9uc01hcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBkaXNjcmltaW5hdGVkIHVuaW9uIHNjaGVtYS4gSXRzIGJlaGF2aW91ciBpcyB2ZXJ5IHNpbWlsYXIgdG8gdGhhdCBvZiB0aGUgbm9ybWFsIHoudW5pb24oKSBjb25zdHJ1Y3Rvci5cbiAgICAgKiBIb3dldmVyLCBpdCBvbmx5IGFsbG93cyBhIHVuaW9uIG9mIG9iamVjdHMsIGFsbCBvZiB3aGljaCBuZWVkIHRvIHNoYXJlIGEgZGlzY3JpbWluYXRvciBwcm9wZXJ0eS4gVGhpcyBwcm9wZXJ0eSBtdXN0XG4gICAgICogaGF2ZSBhIGRpZmZlcmVudCB2YWx1ZSBmb3IgZWFjaCBvYmplY3QgaW4gdGhlIHVuaW9uLlxuICAgICAqIEBwYXJhbSBkaXNjcmltaW5hdG9yIHRoZSBuYW1lIG9mIHRoZSBkaXNjcmltaW5hdG9yIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHR5cGVzIGFuIGFycmF5IG9mIG9iamVjdCBzY2hlbWFzXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUoZGlzY3JpbWluYXRvciwgb3B0aW9ucywgcGFyYW1zKSB7XG4gICAgICAgIC8vIEdldCBhbGwgdGhlIHZhbGlkIGRpc2NyaW1pbmF0b3IgdmFsdWVzXG4gICAgICAgIGNvbnN0IG9wdGlvbnNNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8vIHRyeSB7XG4gICAgICAgIGZvciAoY29uc3QgdHlwZSBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBkaXNjcmltaW5hdG9yVmFsdWVzID0gZ2V0RGlzY3JpbWluYXRvcih0eXBlLnNoYXBlW2Rpc2NyaW1pbmF0b3JdKTtcbiAgICAgICAgICAgIGlmICghZGlzY3JpbWluYXRvclZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgZGlzY3JpbWluYXRvciB2YWx1ZSBmb3Iga2V5IFxcYCR7ZGlzY3JpbWluYXRvcn1cXGAgY291bGQgbm90IGJlIGV4dHJhY3RlZCBmcm9tIGFsbCBzY2hlbWEgb3B0aW9uc2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBkaXNjcmltaW5hdG9yVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnNNYXAuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYERpc2NyaW1pbmF0b3IgcHJvcGVydHkgJHtTdHJpbmcoZGlzY3JpbWluYXRvcil9IGhhcyBkdXBsaWNhdGUgdmFsdWUgJHtTdHJpbmcodmFsdWUpfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRpb25zTWFwLnNldCh2YWx1ZSwgdHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBab2REaXNjcmltaW5hdGVkVW5pb24oe1xuICAgICAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2REaXNjcmltaW5hdGVkVW5pb24sXG4gICAgICAgICAgICBkaXNjcmltaW5hdG9yLFxuICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgIG9wdGlvbnNNYXAsXG4gICAgICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1lcmdlVmFsdWVzKGEsIGIpIHtcbiAgICBjb25zdCBhVHlwZSA9IGdldFBhcnNlZFR5cGUoYSk7XG4gICAgY29uc3QgYlR5cGUgPSBnZXRQYXJzZWRUeXBlKGIpO1xuICAgIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiB7IHZhbGlkOiB0cnVlLCBkYXRhOiBhIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGFUeXBlID09PSBab2RQYXJzZWRUeXBlLm9iamVjdCAmJiBiVHlwZSA9PT0gWm9kUGFyc2VkVHlwZS5vYmplY3QpIHtcbiAgICAgICAgY29uc3QgYktleXMgPSB1dGlsLm9iamVjdEtleXMoYik7XG4gICAgICAgIGNvbnN0IHNoYXJlZEtleXMgPSB1dGlsLm9iamVjdEtleXMoYSkuZmlsdGVyKChrZXkpID0+IGJLZXlzLmluZGV4T2Yoa2V5KSAhPT0gLTEpO1xuICAgICAgICBjb25zdCBuZXdPYmogPSB7IC4uLmEsIC4uLmIgfTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Ygc2hhcmVkS2V5cykge1xuICAgICAgICAgICAgY29uc3Qgc2hhcmVkVmFsdWUgPSBtZXJnZVZhbHVlcyhhW2tleV0sIGJba2V5XSk7XG4gICAgICAgICAgICBpZiAoIXNoYXJlZFZhbHVlLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsaWQ6IGZhbHNlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdPYmpba2V5XSA9IHNoYXJlZFZhbHVlLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdmFsaWQ6IHRydWUsIGRhdGE6IG5ld09iaiB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChhVHlwZSA9PT0gWm9kUGFyc2VkVHlwZS5hcnJheSAmJiBiVHlwZSA9PT0gWm9kUGFyc2VkVHlwZS5hcnJheSkge1xuICAgICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1BID0gYVtpbmRleF07XG4gICAgICAgICAgICBjb25zdCBpdGVtQiA9IGJbaW5kZXhdO1xuICAgICAgICAgICAgY29uc3Qgc2hhcmVkVmFsdWUgPSBtZXJnZVZhbHVlcyhpdGVtQSwgaXRlbUIpO1xuICAgICAgICAgICAgaWYgKCFzaGFyZWRWYWx1ZS52YWxpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbGlkOiBmYWxzZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3QXJyYXkucHVzaChzaGFyZWRWYWx1ZS5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSwgZGF0YTogbmV3QXJyYXkgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYVR5cGUgPT09IFpvZFBhcnNlZFR5cGUuZGF0ZSAmJiBiVHlwZSA9PT0gWm9kUGFyc2VkVHlwZS5kYXRlICYmICthID09PSArYikge1xuICAgICAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSwgZGF0YTogYSB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsaWQ6IGZhbHNlIH07XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFpvZEludGVyc2VjdGlvbiBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCB7IHN0YXR1cywgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBjb25zdCBoYW5kbGVQYXJzZWQgPSAocGFyc2VkTGVmdCwgcGFyc2VkUmlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0Fib3J0ZWQocGFyc2VkTGVmdCkgfHwgaXNBYm9ydGVkKHBhcnNlZFJpZ2h0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWVyZ2VkID0gbWVyZ2VWYWx1ZXMocGFyc2VkTGVmdC52YWx1ZSwgcGFyc2VkUmlnaHQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFtZXJnZWQudmFsaWQpIHtcbiAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfaW50ZXJzZWN0aW9uX3R5cGVzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRGlydHkocGFyc2VkTGVmdCkgfHwgaXNEaXJ0eShwYXJzZWRSaWdodCkpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogbWVyZ2VkLmRhdGEgfTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmLmxlZnQuX3BhcnNlQXN5bmMoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RlZi5yaWdodC5fcGFyc2VBc3luYyh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBjdHgsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdKS50aGVuKChbbGVmdCwgcmlnaHRdKSA9PiBoYW5kbGVQYXJzZWQobGVmdCwgcmlnaHQpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVQYXJzZWQodGhpcy5fZGVmLmxlZnQuX3BhcnNlU3luYyh7XG4gICAgICAgICAgICAgICAgZGF0YTogY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgcGFyZW50OiBjdHgsXG4gICAgICAgICAgICB9KSwgdGhpcy5fZGVmLnJpZ2h0Ll9wYXJzZVN5bmMoe1xuICAgICAgICAgICAgICAgIGRhdGE6IGN0eC5kYXRhLFxuICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuWm9kSW50ZXJzZWN0aW9uLmNyZWF0ZSA9IChsZWZ0LCByaWdodCwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RJbnRlcnNlY3Rpb24oe1xuICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICByaWdodDogcmlnaHQsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kSW50ZXJzZWN0aW9uLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuLy8gdHlwZSBab2RUdXBsZUl0ZW1zID0gW1pvZFR5cGVBbnksIC4uLlpvZFR5cGVBbnlbXV07XG5leHBvcnQgY2xhc3MgWm9kVHVwbGUgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMsIGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgaWYgKGN0eC5wYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLmFycmF5KSB7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLmFycmF5LFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0eC5kYXRhLmxlbmd0aCA8IHRoaXMuX2RlZi5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS50b29fc21hbGwsXG4gICAgICAgICAgICAgICAgbWluaW11bTogdGhpcy5fZGVmLml0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdCA9IHRoaXMuX2RlZi5yZXN0O1xuICAgICAgICBpZiAoIXJlc3QgJiYgY3R4LmRhdGEubGVuZ3RoID4gdGhpcy5fZGVmLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19iaWcsXG4gICAgICAgICAgICAgICAgbWF4aW11bTogdGhpcy5fZGVmLml0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBpbmNsdXNpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSBbLi4uY3R4LmRhdGFdXG4gICAgICAgICAgICAubWFwKChpdGVtLCBpdGVtSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMuX2RlZi5pdGVtc1tpdGVtSW5kZXhdIHx8IHRoaXMuX2RlZi5yZXN0O1xuICAgICAgICAgICAgaWYgKCFzY2hlbWEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gc2NoZW1hLl9wYXJzZShuZXcgUGFyc2VJbnB1dExhenlQYXRoKGN0eCwgaXRlbSwgY3R4LnBhdGgsIGl0ZW1JbmRleCkpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gISF4KTsgLy8gZmlsdGVyIG51bGxzXG4gICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoaXRlbXMpLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUGFyc2VTdGF0dXMubWVyZ2VBcnJheShzdGF0dXMsIHJlc3VsdHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUGFyc2VTdGF0dXMubWVyZ2VBcnJheShzdGF0dXMsIGl0ZW1zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuaXRlbXM7XG4gICAgfVxuICAgIHJlc3QocmVzdCkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZFR1cGxlKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIHJlc3QsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblpvZFR1cGxlLmNyZWF0ZSA9IChzY2hlbWFzLCBwYXJhbXMpID0+IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2NoZW1hcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgcGFzcyBhbiBhcnJheSBvZiBzY2hlbWFzIHRvIHoudHVwbGUoWyAuLi4gXSlcIik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgWm9kVHVwbGUoe1xuICAgICAgICBpdGVtczogc2NoZW1hcyxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RUdXBsZSxcbiAgICAgICAgcmVzdDogbnVsbCxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2RSZWNvcmQgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBnZXQga2V5U2NoZW1hKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLmtleVR5cGU7XG4gICAgfVxuICAgIGdldCB2YWx1ZVNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi52YWx1ZVR5cGU7XG4gICAgfVxuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCB7IHN0YXR1cywgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBpZiAoY3R4LnBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUub2JqZWN0KSB7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLm9iamVjdCxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhaXJzID0gW107XG4gICAgICAgIGNvbnN0IGtleVR5cGUgPSB0aGlzLl9kZWYua2V5VHlwZTtcbiAgICAgICAgY29uc3QgdmFsdWVUeXBlID0gdGhpcy5fZGVmLnZhbHVlVHlwZTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY3R4LmRhdGEpIHtcbiAgICAgICAgICAgIHBhaXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIGtleToga2V5VHlwZS5fcGFyc2UobmV3IFBhcnNlSW5wdXRMYXp5UGF0aChjdHgsIGtleSwgY3R4LnBhdGgsIGtleSkpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVR5cGUuX3BhcnNlKG5ldyBQYXJzZUlucHV0TGF6eVBhdGgoY3R4LCBjdHguZGF0YVtrZXldLCBjdHgucGF0aCwga2V5KSksXG4gICAgICAgICAgICAgICAgYWx3YXlzU2V0OiBrZXkgaW4gY3R4LmRhdGEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3R4LmNvbW1vbi5hc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIFBhcnNlU3RhdHVzLm1lcmdlT2JqZWN0QXN5bmMoc3RhdHVzLCBwYWlycyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUGFyc2VTdGF0dXMubWVyZ2VPYmplY3RTeW5jKHN0YXR1cywgcGFpcnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnZhbHVlVHlwZTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZShmaXJzdCwgc2Vjb25kLCB0aGlyZCkge1xuICAgICAgICBpZiAoc2Vjb25kIGluc3RhbmNlb2YgWm9kVHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBab2RSZWNvcmQoe1xuICAgICAgICAgICAgICAgIGtleVR5cGU6IGZpcnN0LFxuICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogc2Vjb25kLFxuICAgICAgICAgICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kUmVjb3JkLFxuICAgICAgICAgICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXModGhpcmQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBab2RSZWNvcmQoe1xuICAgICAgICAgICAga2V5VHlwZTogWm9kU3RyaW5nLmNyZWF0ZSgpLFxuICAgICAgICAgICAgdmFsdWVUeXBlOiBmaXJzdCxcbiAgICAgICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kUmVjb3JkLFxuICAgICAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhzZWNvbmQpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgWm9kTWFwIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgZ2V0IGtleVNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5rZXlUeXBlO1xuICAgIH1cbiAgICBnZXQgdmFsdWVTY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYudmFsdWVUeXBlO1xuICAgIH1cbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMsIGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgaWYgKGN0eC5wYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLm1hcCkge1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5tYXAsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXlUeXBlID0gdGhpcy5fZGVmLmtleVR5cGU7XG4gICAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IHRoaXMuX2RlZi52YWx1ZVR5cGU7XG4gICAgICAgIGNvbnN0IHBhaXJzID0gWy4uLmN0eC5kYXRhLmVudHJpZXMoKV0ubWFwKChba2V5LCB2YWx1ZV0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGtleToga2V5VHlwZS5fcGFyc2UobmV3IFBhcnNlSW5wdXRMYXp5UGF0aChjdHgsIGtleSwgY3R4LnBhdGgsIFtpbmRleCwgXCJrZXlcIl0pKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVUeXBlLl9wYXJzZShuZXcgUGFyc2VJbnB1dExhenlQYXRoKGN0eCwgdmFsdWUsIGN0eC5wYXRoLCBbaW5kZXgsIFwidmFsdWVcIl0pKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY3R4LmNvbW1vbi5hc3luYykge1xuICAgICAgICAgICAgY29uc3QgZmluYWxNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYWlyIG9mIHBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGF3YWl0IHBhaXIua2V5O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IHBhaXIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkuc3RhdHVzID09PSBcImFib3J0ZWRcIiB8fCB2YWx1ZS5zdGF0dXMgPT09IFwiYWJvcnRlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LnN0YXR1cyA9PT0gXCJkaXJ0eVwiIHx8IHZhbHVlLnN0YXR1cyA9PT0gXCJkaXJ0eVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbE1hcC5zZXQoa2V5LnZhbHVlLCB2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogZmluYWxNYXAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZmluYWxNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhaXIgb2YgcGFpcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBwYWlyLmtleTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBhaXIudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGtleS5zdGF0dXMgPT09IFwiYWJvcnRlZFwiIHx8IHZhbHVlLnN0YXR1cyA9PT0gXCJhYm9ydGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChrZXkuc3RhdHVzID09PSBcImRpcnR5XCIgfHwgdmFsdWUuc3RhdHVzID09PSBcImRpcnR5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsTWFwLnNldChrZXkudmFsdWUsIHZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogZmluYWxNYXAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblpvZE1hcC5jcmVhdGUgPSAoa2V5VHlwZSwgdmFsdWVUeXBlLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZE1hcCh7XG4gICAgICAgIHZhbHVlVHlwZSxcbiAgICAgICAga2V5VHlwZSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RNYXAsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kU2V0IGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzLCBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGlmIChjdHgucGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5zZXQpIHtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX3R5cGUsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IFpvZFBhcnNlZFR5cGUuc2V0LFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVmID0gdGhpcy5fZGVmO1xuICAgICAgICBpZiAoZGVmLm1pblNpemUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjdHguZGF0YS5zaXplIDwgZGVmLm1pblNpemUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLnRvb19zbWFsbCxcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bTogZGVmLm1pblNpemUudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZWYubWluU2l6ZS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkZWYubWF4U2l6ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGN0eC5kYXRhLnNpemUgPiBkZWYubWF4U2l6ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUudG9vX2JpZyxcbiAgICAgICAgICAgICAgICAgICAgbWF4aW11bTogZGVmLm1heFNpemUudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIGluY2x1c2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXhhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZWYubWF4U2l6ZS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IHRoaXMuX2RlZi52YWx1ZVR5cGU7XG4gICAgICAgIGZ1bmN0aW9uIGZpbmFsaXplU2V0KGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRTZXQgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5zdGF0dXMgPT09IFwiYWJvcnRlZFwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5zdGF0dXMgPT09IFwiZGlydHlcIilcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRpcnR5KCk7XG4gICAgICAgICAgICAgICAgcGFyc2VkU2V0LmFkZChlbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogcGFyc2VkU2V0IH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBbLi4uY3R4LmRhdGEudmFsdWVzKCldLm1hcCgoaXRlbSwgaSkgPT4gdmFsdWVUeXBlLl9wYXJzZShuZXcgUGFyc2VJbnB1dExhenlQYXRoKGN0eCwgaXRlbSwgY3R4LnBhdGgsIGkpKSk7XG4gICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZWxlbWVudHMpLnRoZW4oKGVsZW1lbnRzKSA9PiBmaW5hbGl6ZVNldChlbGVtZW50cykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmFsaXplU2V0KGVsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtaW4obWluU2l6ZSwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IFpvZFNldCh7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBtaW5TaXplOiB7IHZhbHVlOiBtaW5TaXplLCBtZXNzYWdlOiBlcnJvclV0aWwudG9TdHJpbmcobWVzc2FnZSkgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1heChtYXhTaXplLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kU2V0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIG1heFNpemU6IHsgdmFsdWU6IG1heFNpemUsIG1lc3NhZ2U6IGVycm9yVXRpbC50b1N0cmluZyhtZXNzYWdlKSB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2l6ZShzaXplLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbihzaXplLCBtZXNzYWdlKS5tYXgoc2l6ZSwgbWVzc2FnZSk7XG4gICAgfVxuICAgIG5vbmVtcHR5KG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWluKDEsIG1lc3NhZ2UpO1xuICAgIH1cbn1cblpvZFNldC5jcmVhdGUgPSAodmFsdWVUeXBlLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZFNldCh7XG4gICAgICAgIHZhbHVlVHlwZSxcbiAgICAgICAgbWluU2l6ZTogbnVsbCxcbiAgICAgICAgbWF4U2l6ZTogbnVsbCxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RTZXQsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kRnVuY3Rpb24gZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9IHRoaXMuaW1wbGVtZW50O1xuICAgIH1cbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGlmIChjdHgucGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5mdW5jdGlvbikge1xuICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCB7XG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogWm9kUGFyc2VkVHlwZS5mdW5jdGlvbixcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VBcmdzSXNzdWUoYXJncywgZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWtlSXNzdWUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgZXJyb3JNYXBzOiBbY3R4LmNvbW1vbi5jb250ZXh0dWFsRXJyb3JNYXAsIGN0eC5zY2hlbWFFcnJvck1hcCwgZ2V0RXJyb3JNYXAoKSwgZGVmYXVsdEVycm9yTWFwXS5maWx0ZXIoKHgpID0+ICEheCksXG4gICAgICAgICAgICAgICAgaXNzdWVEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IFpvZElzc3VlQ29kZS5pbnZhbGlkX2FyZ3VtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzRXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtYWtlUmV0dXJuc0lzc3VlKHJldHVybnMsIGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFrZUlzc3VlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiByZXR1cm5zLFxuICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgIGVycm9yTWFwczogW2N0eC5jb21tb24uY29udGV4dHVhbEVycm9yTWFwLCBjdHguc2NoZW1hRXJyb3JNYXAsIGdldEVycm9yTWFwKCksIGRlZmF1bHRFcnJvck1hcF0uZmlsdGVyKCh4KSA9PiAhIXgpLFxuICAgICAgICAgICAgICAgIGlzc3VlRGF0YToge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9yZXR1cm5fdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVHlwZUVycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyYW1zID0geyBlcnJvck1hcDogY3R4LmNvbW1vbi5jb250ZXh0dWFsRXJyb3JNYXAgfTtcbiAgICAgICAgY29uc3QgZm4gPSBjdHguZGF0YTtcbiAgICAgICAgaWYgKHRoaXMuX2RlZi5yZXR1cm5zIGluc3RhbmNlb2YgWm9kUHJvbWlzZSkge1xuICAgICAgICAgICAgLy8gV291bGQgbG92ZSBhIHdheSB0byBhdm9pZCBkaXNhYmxpbmcgdGhpcyBydWxlLCBidXQgd2UgbmVlZFxuICAgICAgICAgICAgLy8gYW4gYWxpYXMgKHVzaW5nIGFuIGFycm93IGZ1bmN0aW9uIHdhcyB3aGF0IGNhdXNlZCAyNjUxKS5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhc1xuICAgICAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIE9LKGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgWm9kRXJyb3IoW10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZEFyZ3MgPSBhd2FpdCBtZS5fZGVmLmFyZ3MucGFyc2VBc3luYyhhcmdzLCBwYXJhbXMpLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmFkZElzc3VlKG1ha2VBcmdzSXNzdWUoYXJncywgZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBSZWZsZWN0LmFwcGx5KGZuLCB0aGlzLCBwYXJzZWRBcmdzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRSZXR1cm5zID0gYXdhaXQgbWUuX2RlZi5yZXR1cm5zLl9kZWYudHlwZVxuICAgICAgICAgICAgICAgICAgICAucGFyc2VBc3luYyhyZXN1bHQsIHBhcmFtcylcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmFkZElzc3VlKG1ha2VSZXR1cm5zSXNzdWUocmVzdWx0LCBlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWRSZXR1cm5zO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBXb3VsZCBsb3ZlIGEgd2F5IHRvIGF2b2lkIGRpc2FibGluZyB0aGlzIHJ1bGUsIGJ1dCB3ZSBuZWVkXG4gICAgICAgICAgICAvLyBhbiBhbGlhcyAodXNpbmcgYW4gYXJyb3cgZnVuY3Rpb24gd2FzIHdoYXQgY2F1c2VkIDI2NTEpLlxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG4gICAgICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gT0soZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRBcmdzID0gbWUuX2RlZi5hcmdzLnNhZmVQYXJzZShhcmdzLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgIGlmICghcGFyc2VkQXJncy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBab2RFcnJvcihbbWFrZUFyZ3NJc3N1ZShhcmdzLCBwYXJzZWRBcmdzLmVycm9yKV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBSZWZsZWN0LmFwcGx5KGZuLCB0aGlzLCBwYXJzZWRBcmdzLmRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZFJldHVybnMgPSBtZS5fZGVmLnJldHVybnMuc2FmZVBhcnNlKHJlc3VsdCwgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnNlZFJldHVybnMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgWm9kRXJyb3IoW21ha2VSZXR1cm5zSXNzdWUocmVzdWx0LCBwYXJzZWRSZXR1cm5zLmVycm9yKV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkUmV0dXJucy5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFyYW1ldGVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5hcmdzO1xuICAgIH1cbiAgICByZXR1cm5UeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnJldHVybnM7XG4gICAgfVxuICAgIGFyZ3MoLi4uaXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RGdW5jdGlvbih7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICBhcmdzOiBab2RUdXBsZS5jcmVhdGUoaXRlbXMpLnJlc3QoWm9kVW5rbm93bi5jcmVhdGUoKSksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm5zKHJldHVyblR5cGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RGdW5jdGlvbih7XG4gICAgICAgICAgICAuLi50aGlzLl9kZWYsXG4gICAgICAgICAgICByZXR1cm5zOiByZXR1cm5UeXBlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW1wbGVtZW50KGZ1bmMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVkRnVuYyA9IHRoaXMucGFyc2UoZnVuYyk7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRGdW5jO1xuICAgIH1cbiAgICBzdHJpY3RJbXBsZW1lbnQoZnVuYykge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZWRGdW5jID0gdGhpcy5wYXJzZShmdW5jKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZEZ1bmM7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUoYXJncywgcmV0dXJucywgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBuZXcgWm9kRnVuY3Rpb24oe1xuICAgICAgICAgICAgYXJnczogKGFyZ3MgPyBhcmdzIDogWm9kVHVwbGUuY3JlYXRlKFtdKS5yZXN0KFpvZFVua25vd24uY3JlYXRlKCkpKSxcbiAgICAgICAgICAgIHJldHVybnM6IHJldHVybnMgfHwgWm9kVW5rbm93bi5jcmVhdGUoKSxcbiAgICAgICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kRnVuY3Rpb24sXG4gICAgICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBab2RMYXp5IGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgZ2V0IHNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5nZXR0ZXIoKTtcbiAgICB9XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBjb25zdCBsYXp5U2NoZW1hID0gdGhpcy5fZGVmLmdldHRlcigpO1xuICAgICAgICByZXR1cm4gbGF6eVNjaGVtYS5fcGFyc2UoeyBkYXRhOiBjdHguZGF0YSwgcGF0aDogY3R4LnBhdGgsIHBhcmVudDogY3R4IH0pO1xuICAgIH1cbn1cblpvZExhenkuY3JlYXRlID0gKGdldHRlciwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RMYXp5KHtcbiAgICAgICAgZ2V0dGVyOiBnZXR0ZXIsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kTGF6eSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2RMaXRlcmFsIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5kYXRhICE9PSB0aGlzLl9kZWYudmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9saXRlcmFsLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiB0aGlzLl9kZWYudmFsdWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN0YXR1czogXCJ2YWxpZFwiLCB2YWx1ZTogaW5wdXQuZGF0YSB9O1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYudmFsdWU7XG4gICAgfVxufVxuWm9kTGl0ZXJhbC5jcmVhdGUgPSAodmFsdWUsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kTGl0ZXJhbCh7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RMaXRlcmFsLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZnVuY3Rpb24gY3JlYXRlWm9kRW51bSh2YWx1ZXMsIHBhcmFtcykge1xuICAgIHJldHVybiBuZXcgWm9kRW51bSh7XG4gICAgICAgIHZhbHVlcyxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RFbnVtLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59XG5leHBvcnQgY2xhc3MgWm9kRW51bSBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0LmRhdGEgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVmFsdWVzID0gdGhpcy5fZGVmLnZhbHVlcztcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiB1dGlsLmpvaW5WYWx1ZXMoZXhwZWN0ZWRWYWx1ZXMpLFxuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHgucGFyc2VkVHlwZSxcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2NhY2hlKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZSA9IG5ldyBTZXQodGhpcy5fZGVmLnZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9jYWNoZS5oYXMoaW5wdXQuZGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVmFsdWVzID0gdGhpcy5fZGVmLnZhbHVlcztcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9lbnVtX3ZhbHVlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGV4cGVjdGVkVmFsdWVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT0soaW5wdXQuZGF0YSk7XG4gICAgfVxuICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnZhbHVlcztcbiAgICB9XG4gICAgZ2V0IGVudW0oKSB7XG4gICAgICAgIGNvbnN0IGVudW1WYWx1ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCB2YWwgb2YgdGhpcy5fZGVmLnZhbHVlcykge1xuICAgICAgICAgICAgZW51bVZhbHVlc1t2YWxdID0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbnVtVmFsdWVzO1xuICAgIH1cbiAgICBnZXQgVmFsdWVzKCkge1xuICAgICAgICBjb25zdCBlbnVtVmFsdWVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgdmFsIG9mIHRoaXMuX2RlZi52YWx1ZXMpIHtcbiAgICAgICAgICAgIGVudW1WYWx1ZXNbdmFsXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW51bVZhbHVlcztcbiAgICB9XG4gICAgZ2V0IEVudW0oKSB7XG4gICAgICAgIGNvbnN0IGVudW1WYWx1ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCB2YWwgb2YgdGhpcy5fZGVmLnZhbHVlcykge1xuICAgICAgICAgICAgZW51bVZhbHVlc1t2YWxdID0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbnVtVmFsdWVzO1xuICAgIH1cbiAgICBleHRyYWN0KHZhbHVlcywgbmV3RGVmID0gdGhpcy5fZGVmKSB7XG4gICAgICAgIHJldHVybiBab2RFbnVtLmNyZWF0ZSh2YWx1ZXMsIHtcbiAgICAgICAgICAgIC4uLnRoaXMuX2RlZixcbiAgICAgICAgICAgIC4uLm5ld0RlZixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4Y2x1ZGUodmFsdWVzLCBuZXdEZWYgPSB0aGlzLl9kZWYpIHtcbiAgICAgICAgcmV0dXJuIFpvZEVudW0uY3JlYXRlKHRoaXMub3B0aW9ucy5maWx0ZXIoKG9wdCkgPT4gIXZhbHVlcy5pbmNsdWRlcyhvcHQpKSwge1xuICAgICAgICAgICAgLi4udGhpcy5fZGVmLFxuICAgICAgICAgICAgLi4ubmV3RGVmLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5ab2RFbnVtLmNyZWF0ZSA9IGNyZWF0ZVpvZEVudW07XG5leHBvcnQgY2xhc3MgWm9kTmF0aXZlRW51bSBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCBuYXRpdmVFbnVtVmFsdWVzID0gdXRpbC5nZXRWYWxpZEVudW1WYWx1ZXModGhpcy5fZGVmLnZhbHVlcyk7XG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2dldE9yUmV0dXJuQ3R4KGlucHV0KTtcbiAgICAgICAgaWYgKGN0eC5wYXJzZWRUeXBlICE9PSBab2RQYXJzZWRUeXBlLnN0cmluZyAmJiBjdHgucGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5udW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVmFsdWVzID0gdXRpbC5vYmplY3RWYWx1ZXMobmF0aXZlRW51bVZhbHVlcyk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZDogdXRpbC5qb2luVmFsdWVzKGV4cGVjdGVkVmFsdWVzKSxcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICAgICAgY29kZTogWm9kSXNzdWVDb2RlLmludmFsaWRfdHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9jYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSBuZXcgU2V0KHV0aWwuZ2V0VmFsaWRFbnVtVmFsdWVzKHRoaXMuX2RlZi52YWx1ZXMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2NhY2hlLmhhcyhpbnB1dC5kYXRhKSkge1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWRWYWx1ZXMgPSB1dGlsLm9iamVjdFZhbHVlcyhuYXRpdmVFbnVtVmFsdWVzKTtcbiAgICAgICAgICAgIGFkZElzc3VlVG9Db250ZXh0KGN0eCwge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVkOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF9lbnVtX3ZhbHVlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGV4cGVjdGVkVmFsdWVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT0soaW5wdXQuZGF0YSk7XG4gICAgfVxuICAgIGdldCBlbnVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnZhbHVlcztcbiAgICB9XG59XG5ab2ROYXRpdmVFbnVtLmNyZWF0ZSA9ICh2YWx1ZXMsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kTmF0aXZlRW51bSh7XG4gICAgICAgIHZhbHVlczogdmFsdWVzLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZE5hdGl2ZUVudW0sXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kUHJvbWlzZSBleHRlbmRzIFpvZFR5cGUge1xuICAgIHVud3JhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi50eXBlO1xuICAgIH1cbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBjdHggfSA9IHRoaXMuX3Byb2Nlc3NJbnB1dFBhcmFtcyhpbnB1dCk7XG4gICAgICAgIGlmIChjdHgucGFyc2VkVHlwZSAhPT0gWm9kUGFyc2VkVHlwZS5wcm9taXNlICYmIGN0eC5jb21tb24uYXN5bmMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLnByb21pc2UsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWQ6IGN0eC5wYXJzZWRUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm9taXNpZmllZCA9IGN0eC5wYXJzZWRUeXBlID09PSBab2RQYXJzZWRUeXBlLnByb21pc2UgPyBjdHguZGF0YSA6IFByb21pc2UucmVzb2x2ZShjdHguZGF0YSk7XG4gICAgICAgIHJldHVybiBPSyhwcm9taXNpZmllZC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnR5cGUucGFyc2VBc3luYyhkYXRhLCB7XG4gICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgZXJyb3JNYXA6IGN0eC5jb21tb24uY29udGV4dHVhbEVycm9yTWFwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG5ab2RQcm9taXNlLmNyZWF0ZSA9IChzY2hlbWEsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kUHJvbWlzZSh7XG4gICAgICAgIHR5cGU6IHNjaGVtYSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RQcm9taXNlLFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIFpvZEVmZmVjdHMgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBpbm5lclR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuc2NoZW1hO1xuICAgIH1cbiAgICBzb3VyY2VUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLnNjaGVtYS5fZGVmLnR5cGVOYW1lID09PSBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kRWZmZWN0c1xuICAgICAgICAgICAgPyB0aGlzLl9kZWYuc2NoZW1hLnNvdXJjZVR5cGUoKVxuICAgICAgICAgICAgOiB0aGlzLl9kZWYuc2NoZW1hO1xuICAgIH1cbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMsIGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgY29uc3QgZWZmZWN0ID0gdGhpcy5fZGVmLmVmZmVjdCB8fCBudWxsO1xuICAgICAgICBjb25zdCBjaGVja0N0eCA9IHtcbiAgICAgICAgICAgIGFkZElzc3VlOiAoYXJnKSA9PiB7XG4gICAgICAgICAgICAgICAgYWRkSXNzdWVUb0NvbnRleHQoY3R4LCBhcmcpO1xuICAgICAgICAgICAgICAgIGlmIChhcmcuZmF0YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHBhdGgoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN0eC5wYXRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY2hlY2tDdHguYWRkSXNzdWUgPSBjaGVja0N0eC5hZGRJc3N1ZS5iaW5kKGNoZWNrQ3R4KTtcbiAgICAgICAgaWYgKGVmZmVjdC50eXBlID09PSBcInByZXByb2Nlc3NcIikge1xuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkID0gZWZmZWN0LnRyYW5zZm9ybShjdHguZGF0YSwgY2hlY2tDdHgpO1xuICAgICAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHByb2Nlc3NlZCkudGhlbihhc3luYyAocHJvY2Vzc2VkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMudmFsdWUgPT09IFwiYWJvcnRlZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2RlZi5zY2hlbWEuX3BhcnNlQXN5bmMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcHJvY2Vzc2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gXCJkaXJ0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERJUlRZKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMudmFsdWUgPT09IFwiZGlydHlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBESVJUWShyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy52YWx1ZSA9PT0gXCJhYm9ydGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2RlZi5zY2hlbWEuX3BhcnNlU3luYyh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHByb2Nlc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IFwiZGlydHlcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERJUlRZKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy52YWx1ZSA9PT0gXCJkaXJ0eVwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRElSVFkocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlZmZlY3QudHlwZSA9PT0gXCJyZWZpbmVtZW50XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGVSZWZpbmVtZW50ID0gKGFjYykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGVmZmVjdC5yZWZpbmVtZW50KGFjYywgY2hlY2tDdHgpO1xuICAgICAgICAgICAgICAgIGlmIChjdHguY29tbW9uLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXN5bmMgcmVmaW5lbWVudCBlbmNvdW50ZXJlZCBkdXJpbmcgc3luY2hyb25vdXMgcGFyc2Ugb3BlcmF0aW9uLiBVc2UgLnBhcnNlQXN5bmMgaW5zdGVhZC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5uZXIgPSB0aGlzLl9kZWYuc2NoZW1hLl9wYXJzZVN5bmMoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChpbm5lci5zdGF0dXMgPT09IFwiYWJvcnRlZFwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSU5WQUxJRDtcbiAgICAgICAgICAgICAgICBpZiAoaW5uZXIuc3RhdHVzID09PSBcImRpcnR5XCIpXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB2YWx1ZSBpcyBpZ25vcmVkXG4gICAgICAgICAgICAgICAgZXhlY3V0ZVJlZmluZW1lbnQoaW5uZXIudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogaW5uZXIudmFsdWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWYuc2NoZW1hLl9wYXJzZUFzeW5jKHsgZGF0YTogY3R4LmRhdGEsIHBhdGg6IGN0eC5wYXRoLCBwYXJlbnQ6IGN0eCB9KS50aGVuKChpbm5lcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXIuc3RhdHVzID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXIuc3RhdHVzID09PSBcImRpcnR5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4ZWN1dGVSZWZpbmVtZW50KGlubmVyLnZhbHVlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN0YXR1czogc3RhdHVzLnZhbHVlLCB2YWx1ZTogaW5uZXIudmFsdWUgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVmZmVjdC50eXBlID09PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgICAgICAgICBpZiAoY3R4LmNvbW1vbi5hc3luYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlID0gdGhpcy5fZGVmLnNjaGVtYS5fcGFyc2VTeW5jKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWQoYmFzZSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGVmZmVjdC50cmFuc2Zvcm0oYmFzZS52YWx1ZSwgY2hlY2tDdHgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQXN5bmNocm9ub3VzIHRyYW5zZm9ybSBlbmNvdW50ZXJlZCBkdXJpbmcgc3luY2hyb25vdXMgcGFyc2Ugb3BlcmF0aW9uLiBVc2UgLnBhcnNlQXN5bmMgaW5zdGVhZC5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiBzdGF0dXMudmFsdWUsIHZhbHVlOiByZXN1bHQgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWYuc2NoZW1hLl9wYXJzZUFzeW5jKHsgZGF0YTogY3R4LmRhdGEsIHBhdGg6IGN0eC5wYXRoLCBwYXJlbnQ6IGN0eCB9KS50aGVuKChiYXNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZChiYXNlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVmZmVjdC50cmFuc2Zvcm0oYmFzZS52YWx1ZSwgY2hlY2tDdHgpKS50aGVuKChyZXN1bHQpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1cy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1dGlsLmFzc2VydE5ldmVyKGVmZmVjdCk7XG4gICAgfVxufVxuWm9kRWZmZWN0cy5jcmVhdGUgPSAoc2NoZW1hLCBlZmZlY3QsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kRWZmZWN0cyh7XG4gICAgICAgIHNjaGVtYSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2RFZmZlY3RzLFxuICAgICAgICBlZmZlY3QsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5ab2RFZmZlY3RzLmNyZWF0ZVdpdGhQcmVwcm9jZXNzID0gKHByZXByb2Nlc3MsIHNjaGVtYSwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2RFZmZlY3RzKHtcbiAgICAgICAgc2NoZW1hLFxuICAgICAgICBlZmZlY3Q6IHsgdHlwZTogXCJwcmVwcm9jZXNzXCIsIHRyYW5zZm9ybTogcHJlcHJvY2VzcyB9LFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZEVmZmVjdHMsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgeyBab2RFZmZlY3RzIGFzIFpvZFRyYW5zZm9ybWVyIH07XG5leHBvcnQgY2xhc3MgWm9kT3B0aW9uYWwgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVHlwZSA9IHRoaXMuX2dldFR5cGUoaW5wdXQpO1xuICAgICAgICBpZiAocGFyc2VkVHlwZSA9PT0gWm9kUGFyc2VkVHlwZS51bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBPSyh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuaW5uZXJUeXBlLl9wYXJzZShpbnB1dCk7XG4gICAgfVxuICAgIHVud3JhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5pbm5lclR5cGU7XG4gICAgfVxufVxuWm9kT3B0aW9uYWwuY3JlYXRlID0gKHR5cGUsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kT3B0aW9uYWwoe1xuICAgICAgICBpbm5lclR5cGU6IHR5cGUsXG4gICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kT3B0aW9uYWwsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kTnVsbGFibGUgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVHlwZSA9IHRoaXMuX2dldFR5cGUoaW5wdXQpO1xuICAgICAgICBpZiAocGFyc2VkVHlwZSA9PT0gWm9kUGFyc2VkVHlwZS5udWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gT0sobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5pbm5lclR5cGUuX3BhcnNlKGlucHV0KTtcbiAgICB9XG4gICAgdW53cmFwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmLmlubmVyVHlwZTtcbiAgICB9XG59XG5ab2ROdWxsYWJsZS5jcmVhdGUgPSAodHlwZSwgcGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2ROdWxsYWJsZSh7XG4gICAgICAgIGlubmVyVHlwZTogdHlwZSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2ROdWxsYWJsZSxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2REZWZhdWx0IGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBsZXQgZGF0YSA9IGN0eC5kYXRhO1xuICAgICAgICBpZiAoY3R4LnBhcnNlZFR5cGUgPT09IFpvZFBhcnNlZFR5cGUudW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5fZGVmLmRlZmF1bHRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuaW5uZXJUeXBlLl9wYXJzZSh7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZURlZmF1bHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuaW5uZXJUeXBlO1xuICAgIH1cbn1cblpvZERlZmF1bHQuY3JlYXRlID0gKHR5cGUsIHBhcmFtcykgPT4ge1xuICAgIHJldHVybiBuZXcgWm9kRGVmYXVsdCh7XG4gICAgICAgIGlubmVyVHlwZTogdHlwZSxcbiAgICAgICAgdHlwZU5hbWU6IFpvZEZpcnN0UGFydHlUeXBlS2luZC5ab2REZWZhdWx0LFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHR5cGVvZiBwYXJhbXMuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiID8gcGFyYW1zLmRlZmF1bHQgOiAoKSA9PiBwYXJhbXMuZGVmYXVsdCxcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBab2RDYXRjaCBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCB7IGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgLy8gbmV3Q3R4IGlzIHVzZWQgdG8gbm90IGNvbGxlY3QgaXNzdWVzIGZyb20gaW5uZXIgdHlwZXMgaW4gY3R4XG4gICAgICAgIGNvbnN0IG5ld0N0eCA9IHtcbiAgICAgICAgICAgIC4uLmN0eCxcbiAgICAgICAgICAgIGNvbW1vbjoge1xuICAgICAgICAgICAgICAgIC4uLmN0eC5jb21tb24sXG4gICAgICAgICAgICAgICAgaXNzdWVzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2RlZi5pbm5lclR5cGUuX3BhcnNlKHtcbiAgICAgICAgICAgIGRhdGE6IG5ld0N0eC5kYXRhLFxuICAgICAgICAgICAgcGF0aDogbmV3Q3R4LnBhdGgsXG4gICAgICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICAgICAgICAuLi5uZXdDdHgsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGlzQXN5bmMocmVzdWx0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwidmFsaWRcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlc3VsdC5zdGF0dXMgPT09IFwidmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPyByZXN1bHQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5fZGVmLmNhdGNoVmFsdWUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldCBlcnJvcigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBab2RFcnJvcihuZXdDdHguY29tbW9uLmlzc3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogbmV3Q3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogXCJ2YWxpZFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQuc3RhdHVzID09PSBcInZhbGlkXCJcbiAgICAgICAgICAgICAgICAgICAgPyByZXN1bHQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl9kZWYuY2F0Y2hWYWx1ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQgZXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBab2RFcnJvcihuZXdDdHguY29tbW9uLmlzc3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IG5ld0N0eC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlQ2F0Y2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuaW5uZXJUeXBlO1xuICAgIH1cbn1cblpvZENhdGNoLmNyZWF0ZSA9ICh0eXBlLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZENhdGNoKHtcbiAgICAgICAgaW5uZXJUeXBlOiB0eXBlLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZENhdGNoLFxuICAgICAgICBjYXRjaFZhbHVlOiB0eXBlb2YgcGFyYW1zLmNhdGNoID09PSBcImZ1bmN0aW9uXCIgPyBwYXJhbXMuY2F0Y2ggOiAoKSA9PiBwYXJhbXMuY2F0Y2gsXG4gICAgICAgIC4uLnByb2Nlc3NDcmVhdGVQYXJhbXMocGFyYW1zKSxcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgWm9kTmFOIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0aGlzLl9nZXRUeXBlKGlucHV0KTtcbiAgICAgICAgaWYgKHBhcnNlZFR5cGUgIT09IFpvZFBhcnNlZFR5cGUubmFuKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9nZXRPclJldHVybkN0eChpbnB1dCk7XG4gICAgICAgICAgICBhZGRJc3N1ZVRvQ29udGV4dChjdHgsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBab2RJc3N1ZUNvZGUuaW52YWxpZF90eXBlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBab2RQYXJzZWRUeXBlLm5hbixcbiAgICAgICAgICAgICAgICByZWNlaXZlZDogY3R4LnBhcnNlZFR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBJTlZBTElEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN0YXR1czogXCJ2YWxpZFwiLCB2YWx1ZTogaW5wdXQuZGF0YSB9O1xuICAgIH1cbn1cblpvZE5hTi5jcmVhdGUgPSAocGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBab2ROYU4oe1xuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZE5hTixcbiAgICAgICAgLi4ucHJvY2Vzc0NyZWF0ZVBhcmFtcyhwYXJhbXMpLFxuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBCUkFORCA9IFN5bWJvbChcInpvZF9icmFuZFwiKTtcbmV4cG9ydCBjbGFzcyBab2RCcmFuZGVkIGV4dGVuZHMgWm9kVHlwZSB7XG4gICAgX3BhcnNlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgY3R4IH0gPSB0aGlzLl9wcm9jZXNzSW5wdXRQYXJhbXMoaW5wdXQpO1xuICAgICAgICBjb25zdCBkYXRhID0gY3R4LmRhdGE7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYudHlwZS5fcGFyc2Uoe1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgcGFyZW50OiBjdHgsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1bndyYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYudHlwZTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgWm9kUGlwZWxpbmUgZXh0ZW5kcyBab2RUeXBlIHtcbiAgICBfcGFyc2UoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMsIGN0eCB9ID0gdGhpcy5fcHJvY2Vzc0lucHV0UGFyYW1zKGlucHV0KTtcbiAgICAgICAgaWYgKGN0eC5jb21tb24uYXN5bmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZUFzeW5jID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluUmVzdWx0ID0gYXdhaXQgdGhpcy5fZGVmLmluLl9wYXJzZUFzeW5jKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogY3R4LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5SZXN1bHQuc3RhdHVzID09PSBcImFib3J0ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgICAgICAgICAgaWYgKGluUmVzdWx0LnN0YXR1cyA9PT0gXCJkaXJ0eVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kaXJ0eSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRElSVFkoaW5SZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZi5vdXQuX3BhcnNlQXN5bmMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5SZXN1bHQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogY3R4LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUFzeW5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpblJlc3VsdCA9IHRoaXMuX2RlZi5pbi5fcGFyc2VTeW5jKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBjdHguZGF0YSxcbiAgICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGluUmVzdWx0LnN0YXR1cyA9PT0gXCJhYm9ydGVkXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIElOVkFMSUQ7XG4gICAgICAgICAgICBpZiAoaW5SZXN1bHQuc3RhdHVzID09PSBcImRpcnR5XCIpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMuZGlydHkoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZGlydHlcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGluUmVzdWx0LnZhbHVlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmLm91dC5fcGFyc2VTeW5jKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5SZXN1bHQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGN0eC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGN0eCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBab2RQaXBlbGluZSh7XG4gICAgICAgICAgICBpbjogYSxcbiAgICAgICAgICAgIG91dDogYixcbiAgICAgICAgICAgIHR5cGVOYW1lOiBab2RGaXJzdFBhcnR5VHlwZUtpbmQuWm9kUGlwZWxpbmUsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBab2RSZWFkb25seSBleHRlbmRzIFpvZFR5cGUge1xuICAgIF9wYXJzZShpbnB1dCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9kZWYuaW5uZXJUeXBlLl9wYXJzZShpbnB1dCk7XG4gICAgICAgIGNvbnN0IGZyZWV6ZSA9IChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNWYWxpZChkYXRhKSkge1xuICAgICAgICAgICAgICAgIGRhdGEudmFsdWUgPSBPYmplY3QuZnJlZXplKGRhdGEudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpc0FzeW5jKHJlc3VsdCkgPyByZXN1bHQudGhlbigoZGF0YSkgPT4gZnJlZXplKGRhdGEpKSA6IGZyZWV6ZShyZXN1bHQpO1xuICAgIH1cbiAgICB1bndyYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYuaW5uZXJUeXBlO1xuICAgIH1cbn1cblpvZFJlYWRvbmx5LmNyZWF0ZSA9ICh0eXBlLCBwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFpvZFJlYWRvbmx5KHtcbiAgICAgICAgaW5uZXJUeXBlOiB0eXBlLFxuICAgICAgICB0eXBlTmFtZTogWm9kRmlyc3RQYXJ0eVR5cGVLaW5kLlpvZFJlYWRvbmx5LFxuICAgICAgICAuLi5wcm9jZXNzQ3JlYXRlUGFyYW1zKHBhcmFtcyksXG4gICAgfSk7XG59O1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLyAgICAgICAgICAgICAgICAgICAgLy8vLy8vLy8vL1xuLy8vLy8vLy8vLyAgICAgIHouY3VzdG9tICAgICAgLy8vLy8vLy8vL1xuLy8vLy8vLy8vLyAgICAgICAgICAgICAgICAgICAgLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gY2xlYW5QYXJhbXMocGFyYW1zLCBkYXRhKSB7XG4gICAgY29uc3QgcCA9IHR5cGVvZiBwYXJhbXMgPT09IFwiZnVuY3Rpb25cIiA/IHBhcmFtcyhkYXRhKSA6IHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIgPyB7IG1lc3NhZ2U6IHBhcmFtcyB9IDogcGFyYW1zO1xuICAgIGNvbnN0IHAyID0gdHlwZW9mIHAgPT09IFwic3RyaW5nXCIgPyB7IG1lc3NhZ2U6IHAgfSA6IHA7XG4gICAgcmV0dXJuIHAyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGN1c3RvbShjaGVjaywgX3BhcmFtcyA9IHt9LCBcbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqXG4gKiBQYXNzIGBmYXRhbGAgaW50byB0aGUgcGFyYW1zIG9iamVjdCBpbnN0ZWFkOlxuICpcbiAqIGBgYHRzXG4gKiB6LnN0cmluZygpLmN1c3RvbSgodmFsKSA9PiB2YWwubGVuZ3RoID4gNSwgeyBmYXRhbDogZmFsc2UgfSlcbiAqIGBgYFxuICpcbiAqL1xuZmF0YWwpIHtcbiAgICBpZiAoY2hlY2spXG4gICAgICAgIHJldHVybiBab2RBbnkuY3JlYXRlKCkuc3VwZXJSZWZpbmUoKGRhdGEsIGN0eCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgciA9IGNoZWNrKGRhdGEpO1xuICAgICAgICAgICAgaWYgKHIgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHIudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IGNsZWFuUGFyYW1zKF9wYXJhbXMsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2ZhdGFsID0gcGFyYW1zLmZhdGFsID8/IGZhdGFsID8/IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguYWRkSXNzdWUoeyBjb2RlOiBcImN1c3RvbVwiLCAuLi5wYXJhbXMsIGZhdGFsOiBfZmF0YWwgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IGNsZWFuUGFyYW1zKF9wYXJhbXMsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IF9mYXRhbCA9IHBhcmFtcy5mYXRhbCA/PyBmYXRhbCA/PyB0cnVlO1xuICAgICAgICAgICAgICAgIGN0eC5hZGRJc3N1ZSh7IGNvZGU6IFwiY3VzdG9tXCIsIC4uLnBhcmFtcywgZmF0YWw6IF9mYXRhbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIFpvZEFueS5jcmVhdGUoKTtcbn1cbmV4cG9ydCB7IFpvZFR5cGUgYXMgU2NoZW1hLCBab2RUeXBlIGFzIFpvZFNjaGVtYSB9O1xuZXhwb3J0IGNvbnN0IGxhdGUgPSB7XG4gICAgb2JqZWN0OiBab2RPYmplY3QubGF6eWNyZWF0ZSxcbn07XG5leHBvcnQgdmFyIFpvZEZpcnN0UGFydHlUeXBlS2luZDtcbihmdW5jdGlvbiAoWm9kRmlyc3RQYXJ0eVR5cGVLaW5kKSB7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kU3RyaW5nXCJdID0gXCJab2RTdHJpbmdcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2ROdW1iZXJcIl0gPSBcIlpvZE51bWJlclwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZE5hTlwiXSA9IFwiWm9kTmFOXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kQmlnSW50XCJdID0gXCJab2RCaWdJbnRcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RCb29sZWFuXCJdID0gXCJab2RCb29sZWFuXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kRGF0ZVwiXSA9IFwiWm9kRGF0ZVwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFN5bWJvbFwiXSA9IFwiWm9kU3ltYm9sXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kVW5kZWZpbmVkXCJdID0gXCJab2RVbmRlZmluZWRcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2ROdWxsXCJdID0gXCJab2ROdWxsXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kQW55XCJdID0gXCJab2RBbnlcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RVbmtub3duXCJdID0gXCJab2RVbmtub3duXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kTmV2ZXJcIl0gPSBcIlpvZE5ldmVyXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kVm9pZFwiXSA9IFwiWm9kVm9pZFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZEFycmF5XCJdID0gXCJab2RBcnJheVwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZE9iamVjdFwiXSA9IFwiWm9kT2JqZWN0XCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kVW5pb25cIl0gPSBcIlpvZFVuaW9uXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kRGlzY3JpbWluYXRlZFVuaW9uXCJdID0gXCJab2REaXNjcmltaW5hdGVkVW5pb25cIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RJbnRlcnNlY3Rpb25cIl0gPSBcIlpvZEludGVyc2VjdGlvblwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFR1cGxlXCJdID0gXCJab2RUdXBsZVwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFJlY29yZFwiXSA9IFwiWm9kUmVjb3JkXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kTWFwXCJdID0gXCJab2RNYXBcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RTZXRcIl0gPSBcIlpvZFNldFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZEZ1bmN0aW9uXCJdID0gXCJab2RGdW5jdGlvblwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZExhenlcIl0gPSBcIlpvZExhenlcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RMaXRlcmFsXCJdID0gXCJab2RMaXRlcmFsXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kRW51bVwiXSA9IFwiWm9kRW51bVwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZEVmZmVjdHNcIl0gPSBcIlpvZEVmZmVjdHNcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2ROYXRpdmVFbnVtXCJdID0gXCJab2ROYXRpdmVFbnVtXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kT3B0aW9uYWxcIl0gPSBcIlpvZE9wdGlvbmFsXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kTnVsbGFibGVcIl0gPSBcIlpvZE51bGxhYmxlXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kRGVmYXVsdFwiXSA9IFwiWm9kRGVmYXVsdFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZENhdGNoXCJdID0gXCJab2RDYXRjaFwiO1xuICAgIFpvZEZpcnN0UGFydHlUeXBlS2luZFtcIlpvZFByb21pc2VcIl0gPSBcIlpvZFByb21pc2VcIjtcbiAgICBab2RGaXJzdFBhcnR5VHlwZUtpbmRbXCJab2RCcmFuZGVkXCJdID0gXCJab2RCcmFuZGVkXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kUGlwZWxpbmVcIl0gPSBcIlpvZFBpcGVsaW5lXCI7XG4gICAgWm9kRmlyc3RQYXJ0eVR5cGVLaW5kW1wiWm9kUmVhZG9ubHlcIl0gPSBcIlpvZFJlYWRvbmx5XCI7XG59KShab2RGaXJzdFBhcnR5VHlwZUtpbmQgfHwgKFpvZEZpcnN0UGFydHlUeXBlS2luZCA9IHt9KSk7XG4vLyByZXF1aXJlcyBUUyA0LjQrXG5jbGFzcyBDbGFzcyB7XG4gICAgY29uc3RydWN0b3IoLi4uXykgeyB9XG59XG5jb25zdCBpbnN0YW5jZU9mVHlwZSA9IChcbi8vIGNvbnN0IGluc3RhbmNlT2ZUeXBlID0gPFQgZXh0ZW5kcyBuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk+KFxuY2xzLCBwYXJhbXMgPSB7XG4gICAgbWVzc2FnZTogYElucHV0IG5vdCBpbnN0YW5jZSBvZiAke2Nscy5uYW1lfWAsXG59KSA9PiBjdXN0b20oKGRhdGEpID0+IGRhdGEgaW5zdGFuY2VvZiBjbHMsIHBhcmFtcyk7XG5jb25zdCBzdHJpbmdUeXBlID0gWm9kU3RyaW5nLmNyZWF0ZTtcbmNvbnN0IG51bWJlclR5cGUgPSBab2ROdW1iZXIuY3JlYXRlO1xuY29uc3QgbmFuVHlwZSA9IFpvZE5hTi5jcmVhdGU7XG5jb25zdCBiaWdJbnRUeXBlID0gWm9kQmlnSW50LmNyZWF0ZTtcbmNvbnN0IGJvb2xlYW5UeXBlID0gWm9kQm9vbGVhbi5jcmVhdGU7XG5jb25zdCBkYXRlVHlwZSA9IFpvZERhdGUuY3JlYXRlO1xuY29uc3Qgc3ltYm9sVHlwZSA9IFpvZFN5bWJvbC5jcmVhdGU7XG5jb25zdCB1bmRlZmluZWRUeXBlID0gWm9kVW5kZWZpbmVkLmNyZWF0ZTtcbmNvbnN0IG51bGxUeXBlID0gWm9kTnVsbC5jcmVhdGU7XG5jb25zdCBhbnlUeXBlID0gWm9kQW55LmNyZWF0ZTtcbmNvbnN0IHVua25vd25UeXBlID0gWm9kVW5rbm93bi5jcmVhdGU7XG5jb25zdCBuZXZlclR5cGUgPSBab2ROZXZlci5jcmVhdGU7XG5jb25zdCB2b2lkVHlwZSA9IFpvZFZvaWQuY3JlYXRlO1xuY29uc3QgYXJyYXlUeXBlID0gWm9kQXJyYXkuY3JlYXRlO1xuY29uc3Qgb2JqZWN0VHlwZSA9IFpvZE9iamVjdC5jcmVhdGU7XG5jb25zdCBzdHJpY3RPYmplY3RUeXBlID0gWm9kT2JqZWN0LnN0cmljdENyZWF0ZTtcbmNvbnN0IHVuaW9uVHlwZSA9IFpvZFVuaW9uLmNyZWF0ZTtcbmNvbnN0IGRpc2NyaW1pbmF0ZWRVbmlvblR5cGUgPSBab2REaXNjcmltaW5hdGVkVW5pb24uY3JlYXRlO1xuY29uc3QgaW50ZXJzZWN0aW9uVHlwZSA9IFpvZEludGVyc2VjdGlvbi5jcmVhdGU7XG5jb25zdCB0dXBsZVR5cGUgPSBab2RUdXBsZS5jcmVhdGU7XG5jb25zdCByZWNvcmRUeXBlID0gWm9kUmVjb3JkLmNyZWF0ZTtcbmNvbnN0IG1hcFR5cGUgPSBab2RNYXAuY3JlYXRlO1xuY29uc3Qgc2V0VHlwZSA9IFpvZFNldC5jcmVhdGU7XG5jb25zdCBmdW5jdGlvblR5cGUgPSBab2RGdW5jdGlvbi5jcmVhdGU7XG5jb25zdCBsYXp5VHlwZSA9IFpvZExhenkuY3JlYXRlO1xuY29uc3QgbGl0ZXJhbFR5cGUgPSBab2RMaXRlcmFsLmNyZWF0ZTtcbmNvbnN0IGVudW1UeXBlID0gWm9kRW51bS5jcmVhdGU7XG5jb25zdCBuYXRpdmVFbnVtVHlwZSA9IFpvZE5hdGl2ZUVudW0uY3JlYXRlO1xuY29uc3QgcHJvbWlzZVR5cGUgPSBab2RQcm9taXNlLmNyZWF0ZTtcbmNvbnN0IGVmZmVjdHNUeXBlID0gWm9kRWZmZWN0cy5jcmVhdGU7XG5jb25zdCBvcHRpb25hbFR5cGUgPSBab2RPcHRpb25hbC5jcmVhdGU7XG5jb25zdCBudWxsYWJsZVR5cGUgPSBab2ROdWxsYWJsZS5jcmVhdGU7XG5jb25zdCBwcmVwcm9jZXNzVHlwZSA9IFpvZEVmZmVjdHMuY3JlYXRlV2l0aFByZXByb2Nlc3M7XG5jb25zdCBwaXBlbGluZVR5cGUgPSBab2RQaXBlbGluZS5jcmVhdGU7XG5jb25zdCBvc3RyaW5nID0gKCkgPT4gc3RyaW5nVHlwZSgpLm9wdGlvbmFsKCk7XG5jb25zdCBvbnVtYmVyID0gKCkgPT4gbnVtYmVyVHlwZSgpLm9wdGlvbmFsKCk7XG5jb25zdCBvYm9vbGVhbiA9ICgpID0+IGJvb2xlYW5UeXBlKCkub3B0aW9uYWwoKTtcbmV4cG9ydCBjb25zdCBjb2VyY2UgPSB7XG4gICAgc3RyaW5nOiAoKGFyZykgPT4gWm9kU3RyaW5nLmNyZWF0ZSh7IC4uLmFyZywgY29lcmNlOiB0cnVlIH0pKSxcbiAgICBudW1iZXI6ICgoYXJnKSA9PiBab2ROdW1iZXIuY3JlYXRlKHsgLi4uYXJnLCBjb2VyY2U6IHRydWUgfSkpLFxuICAgIGJvb2xlYW46ICgoYXJnKSA9PiBab2RCb29sZWFuLmNyZWF0ZSh7XG4gICAgICAgIC4uLmFyZyxcbiAgICAgICAgY29lcmNlOiB0cnVlLFxuICAgIH0pKSxcbiAgICBiaWdpbnQ6ICgoYXJnKSA9PiBab2RCaWdJbnQuY3JlYXRlKHsgLi4uYXJnLCBjb2VyY2U6IHRydWUgfSkpLFxuICAgIGRhdGU6ICgoYXJnKSA9PiBab2REYXRlLmNyZWF0ZSh7IC4uLmFyZywgY29lcmNlOiB0cnVlIH0pKSxcbn07XG5leHBvcnQgeyBhbnlUeXBlIGFzIGFueSwgYXJyYXlUeXBlIGFzIGFycmF5LCBiaWdJbnRUeXBlIGFzIGJpZ2ludCwgYm9vbGVhblR5cGUgYXMgYm9vbGVhbiwgZGF0ZVR5cGUgYXMgZGF0ZSwgZGlzY3JpbWluYXRlZFVuaW9uVHlwZSBhcyBkaXNjcmltaW5hdGVkVW5pb24sIGVmZmVjdHNUeXBlIGFzIGVmZmVjdCwgZW51bVR5cGUgYXMgZW51bSwgZnVuY3Rpb25UeXBlIGFzIGZ1bmN0aW9uLCBpbnN0YW5jZU9mVHlwZSBhcyBpbnN0YW5jZW9mLCBpbnRlcnNlY3Rpb25UeXBlIGFzIGludGVyc2VjdGlvbiwgbGF6eVR5cGUgYXMgbGF6eSwgbGl0ZXJhbFR5cGUgYXMgbGl0ZXJhbCwgbWFwVHlwZSBhcyBtYXAsIG5hblR5cGUgYXMgbmFuLCBuYXRpdmVFbnVtVHlwZSBhcyBuYXRpdmVFbnVtLCBuZXZlclR5cGUgYXMgbmV2ZXIsIG51bGxUeXBlIGFzIG51bGwsIG51bGxhYmxlVHlwZSBhcyBudWxsYWJsZSwgbnVtYmVyVHlwZSBhcyBudW1iZXIsIG9iamVjdFR5cGUgYXMgb2JqZWN0LCBvYm9vbGVhbiwgb251bWJlciwgb3B0aW9uYWxUeXBlIGFzIG9wdGlvbmFsLCBvc3RyaW5nLCBwaXBlbGluZVR5cGUgYXMgcGlwZWxpbmUsIHByZXByb2Nlc3NUeXBlIGFzIHByZXByb2Nlc3MsIHByb21pc2VUeXBlIGFzIHByb21pc2UsIHJlY29yZFR5cGUgYXMgcmVjb3JkLCBzZXRUeXBlIGFzIHNldCwgc3RyaWN0T2JqZWN0VHlwZSBhcyBzdHJpY3RPYmplY3QsIHN0cmluZ1R5cGUgYXMgc3RyaW5nLCBzeW1ib2xUeXBlIGFzIHN5bWJvbCwgZWZmZWN0c1R5cGUgYXMgdHJhbnNmb3JtZXIsIHR1cGxlVHlwZSBhcyB0dXBsZSwgdW5kZWZpbmVkVHlwZSBhcyB1bmRlZmluZWQsIHVuaW9uVHlwZSBhcyB1bmlvbiwgdW5rbm93blR5cGUgYXMgdW5rbm93biwgdm9pZFR5cGUgYXMgdm9pZCwgfTtcbmV4cG9ydCBjb25zdCBORVZFUiA9IElOVkFMSUQ7XG4iLCAiLyoqXG4gKiBHZW5lcmF0ZWQgYnkgb3J2YWwgXHVEODNDXHVERjdBXG4gKiBEbyBub3QgZWRpdCBtYW51YWxseS5cbiAqIEFwaVxuICogQVBJIHNwZWNpZmljYXRpb25cbiAqIE9wZW5BUEkgc3BlYyB2ZXJzaW9uOiAwLjEuMFxuICovXG5pbXBvcnQgKiBhcyB6b2QgZnJvbSAnem9kJztcblxuXG4vKipcbiAqIFJldHVybnMgc2VydmVyIGhlYWx0aCBzdGF0dXNcbiAqIEBzdW1tYXJ5IEhlYWx0aCBjaGVja1xuICovXG5leHBvcnQgY29uc3QgSGVhbHRoQ2hlY2tSZXNwb25zZSA9IHpvZC5vYmplY3Qoe1xuICBcInN0YXR1c1wiOiB6b2Quc3RyaW5nKClcbn0pXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGNvbXBsZXRlIHRvdXJuYW1lbnQgdHJhY2tlclxuICovXG5leHBvcnQgY29uc3QgZ2V0VHJhY2tlclJlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVPYnNlcnZhdGlvbnNNaW4gPSAzO1xuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWF4ID0gMztcblxuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lQXVkaW9QYXRoUmVnRXhwID0gbmV3IFJlZ0V4cCgnXi9vYmplY3RzL3VwbG9hZHMvWzAtOWEtZi1dKyQnKTtcbmV4cG9ydCBjb25zdCBnZXRUcmFja2VyUmVzcG9uc2VSZWZyZXNoSGVhbHRoQ29uc2VjdXRpdmVGYWlsdXJlc01pbiA9IDA7XG5cblxuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJSZXNwb25zZVJlZnJlc2hIZWFsdGhQZW5kaW5nUmVjb3ZlcnlOb3RpY2VzTWluID0gMDtcblxuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTmFtZU1heCA9IDgwO1xuXG5leHBvcnQgY29uc3QgZ2V0VHJhY2tlclJlc3BvbnNlQnJhbmRpbmdMb2dvUGF0aE1heCA9IDEwMDtcblxuXG5leHBvcnQgY29uc3QgZ2V0VHJhY2tlclJlc3BvbnNlQnJhbmRpbmdMb2dvUGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL1swLTlhLWYtXSskJyk7XG5cblxuZXhwb3J0IGNvbnN0IEdldFRyYWNrZXJSZXNwb25zZSA9IHpvZC5vYmplY3Qoe1xuICBcInBsYXllcnNcIjogem9kLmFycmF5KHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKVxufSkpLFxuICBcImNvYWNoZXNcIjogem9kLmFycmF5KHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKVxufSkpLFxuICBcIm1hdGNoZXNcIjogem9kLmFycmF5KHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJleHRlcm5hbElkXCI6IHpvZC5zdHJpbmcoKS5udWxsYWJsZSgpLFxuICBcInBsYXllcklkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJvcHBvbmVudFwiOiB6b2Quc3RyaW5nKCksXG4gIFwic3RhcnRzQXRcIjogem9kLmNvZXJjZS5kYXRlKCksXG4gIFwiZW5kc0F0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcInZlbnVlXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJjb3VydFwiOiB6b2Quc3RyaW5nKCksXG4gIFwiY29hY2hJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwic3RhdHVzXCI6IHpvZC5lbnVtKFsndXBjb21pbmcnLCAnY29tcGxldGVkJ10pLFxuICBcInJlc3VsdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpLFxuICBcInJlcG9ydFwiOiB6b2QudW5pb24oW3pvZC5vYmplY3Qoe1xuICBcIm1hdGNoSWRcIjogem9kLnN0cmluZygpLFxuICBcIm9ic2VydmF0aW9uc1wiOiB6b2QuYXJyYXkoem9kLnN0cmluZygpKS5taW4oZ2V0VHJhY2tlclJlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVPYnNlcnZhdGlvbnNNaW4pLm1heChnZXRUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCksXG4gIFwidHJhbnNjcmlwdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpLFxuICBcImF1ZGlvUGF0aFwiOiB6b2Quc3RyaW5nKCkucmVnZXgoZ2V0VHJhY2tlclJlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVBdWRpb1BhdGhSZWdFeHApLm51bGxhYmxlKCksXG4gIFwidXBkYXRlZEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpXG59KSx6b2QubnVsbCgpXSkub3B0aW9uYWwoKVxufSkpLFxuICBcImxhc3RVcGRhdGVkQXRcIjogem9kLmNvZXJjZS5kYXRlKCksXG4gIFwic291cmNlXCI6IHpvZC5lbnVtKFsnc2FtcGxlJywgJ2NsdWItbG9ja2VyJ10pLFxuICBcInJlZnJlc2hIZWFsdGhcIjogem9kLm9iamVjdCh7XG4gIFwiY29uc2VjdXRpdmVGYWlsdXJlc1wiOiB6b2QubnVtYmVyKCkuaW50KCkubWluKGdldFRyYWNrZXJSZXNwb25zZVJlZnJlc2hIZWFsdGhDb25zZWN1dGl2ZUZhaWx1cmVzTWluKSxcbiAgXCJhbGVydFRocmVzaG9sZFwiOiB6b2QubnVtYmVyKCkuaW50KCkubWluKDEpLFxuICBcImxhc3RGYWlsdXJlQXRcIjogem9kLmNvZXJjZS5kYXRlKCkubnVsbGFibGUoKSxcbiAgXCJhbGVydFNlbnRBdFwiOiB6b2QuY29lcmNlLmRhdGUoKS5udWxsYWJsZSgpLFxuICBcInBlbmRpbmdSZWNvdmVyeU5vdGljZXNcIjogem9kLm51bWJlcigpLmludCgpLm1pbihnZXRUcmFja2VyUmVzcG9uc2VSZWZyZXNoSGVhbHRoUGVuZGluZ1JlY292ZXJ5Tm90aWNlc01pbikuZGVzY3JpYmUoJ1JlY292ZXJ5IG5vdGljZXMgd2FpdGluZyB0byBiZSBkZWxpdmVyZWQgdG8gc3RhZmYnKVxufSksXG4gIFwiYnJhbmRpbmdcIjogem9kLm9iamVjdCh7XG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKCkubWluKDEpLm1heChnZXRUcmFja2VyUmVzcG9uc2VCcmFuZGluZ05hbWVNYXgpLFxuICBcImxvZ29QYXRoXCI6IHpvZC5zdHJpbmcoKS5tYXgoZ2V0VHJhY2tlclJlc3BvbnNlQnJhbmRpbmdMb2dvUGF0aE1heCkucmVnZXgoZ2V0VHJhY2tlclJlc3BvbnNlQnJhbmRpbmdMb2dvUGF0aFJlZ0V4cCkubnVsbGFibGUoKVxufSlcbn0pXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBHZXQgc2NoZWR1bGUgcmVmcmVzaCBhbmQgc3RhZmYgbm90aWZpY2F0aW9uIGhlYWx0aFxuICovXG5leHBvcnQgY29uc3QgZ2V0VHJhY2tlckhlYWx0aFJlc3BvbnNlQ29uc2VjdXRpdmVGYWlsdXJlc01pbiA9IDA7XG5cblxuZXhwb3J0IGNvbnN0IGdldFRyYWNrZXJIZWFsdGhSZXNwb25zZVBlbmRpbmdSZWNvdmVyeU5vdGljZXNNaW4gPSAwO1xuXG5cblxuZXhwb3J0IGNvbnN0IEdldFRyYWNrZXJIZWFsdGhSZXNwb25zZSA9IHpvZC5vYmplY3Qoe1xuICBcImNvbnNlY3V0aXZlRmFpbHVyZXNcIjogem9kLm51bWJlcigpLmludCgpLm1pbihnZXRUcmFja2VySGVhbHRoUmVzcG9uc2VDb25zZWN1dGl2ZUZhaWx1cmVzTWluKSxcbiAgXCJhbGVydFRocmVzaG9sZFwiOiB6b2QubnVtYmVyKCkuaW50KCkubWluKDEpLFxuICBcImxhc3RGYWlsdXJlQXRcIjogem9kLmNvZXJjZS5kYXRlKCkubnVsbGFibGUoKSxcbiAgXCJhbGVydFNlbnRBdFwiOiB6b2QuY29lcmNlLmRhdGUoKS5udWxsYWJsZSgpLFxuICBcInBlbmRpbmdSZWNvdmVyeU5vdGljZXNcIjogem9kLm51bWJlcigpLmludCgpLm1pbihnZXRUcmFja2VySGVhbHRoUmVzcG9uc2VQZW5kaW5nUmVjb3ZlcnlOb3RpY2VzTWluKS5kZXNjcmliZSgnUmVjb3Zlcnkgbm90aWNlcyB3YWl0aW5nIHRvIGJlIGRlbGl2ZXJlZCB0byBzdGFmZicpXG59KVxuXG5cbi8qKlxuICogQHN1bW1hcnkgR2V0IGEgcmVhZC1vbmx5IHRyYWNrZXIgdmlldyBmb3Igb25lIHBsYXllclxuICovXG5leHBvcnQgY29uc3QgR2V0UGxheWVyVHJhY2tlclBhcmFtcyA9IHpvZC5vYmplY3Qoe1xuICBcInBsYXllcklkXCI6IHpvZC5jb2VyY2Uuc3RyaW5nKClcbn0pXG5cbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01pbiA9IDM7XG5leHBvcnQgY29uc3QgZ2V0UGxheWVyVHJhY2tlclJlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVPYnNlcnZhdGlvbnNNYXggPSAzO1xuXG5leHBvcnQgY29uc3QgZ2V0UGxheWVyVHJhY2tlclJlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVBdWRpb1BhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy9bMC05YS1mLV0rJCcpO1xuZXhwb3J0IGNvbnN0IGdldFBsYXllclRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTmFtZU1heCA9IDgwO1xuXG5leHBvcnQgY29uc3QgZ2V0UGxheWVyVHJhY2tlclJlc3BvbnNlQnJhbmRpbmdMb2dvUGF0aE1heCA9IDEwMDtcblxuXG5leHBvcnQgY29uc3QgZ2V0UGxheWVyVHJhY2tlclJlc3BvbnNlQnJhbmRpbmdMb2dvUGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL1swLTlhLWYtXSskJyk7XG5cblxuZXhwb3J0IGNvbnN0IEdldFBsYXllclRyYWNrZXJSZXNwb25zZSA9IHpvZC5vYmplY3Qoe1xuICBcInBsYXllclwiOiB6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKClcbn0pLFxuICBcImNvYWNoZXNcIjogem9kLmFycmF5KHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKVxufSkpLFxuICBcIm1hdGNoZXNcIjogem9kLmFycmF5KHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJleHRlcm5hbElkXCI6IHpvZC5zdHJpbmcoKS5udWxsYWJsZSgpLFxuICBcInBsYXllcklkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJvcHBvbmVudFwiOiB6b2Quc3RyaW5nKCksXG4gIFwic3RhcnRzQXRcIjogem9kLmNvZXJjZS5kYXRlKCksXG4gIFwiZW5kc0F0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcInZlbnVlXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJjb3VydFwiOiB6b2Quc3RyaW5nKCksXG4gIFwiY29hY2hJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwic3RhdHVzXCI6IHpvZC5lbnVtKFsndXBjb21pbmcnLCAnY29tcGxldGVkJ10pLFxuICBcInJlc3VsdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpLFxuICBcInJlcG9ydFwiOiB6b2QudW5pb24oW3pvZC5vYmplY3Qoe1xuICBcIm1hdGNoSWRcIjogem9kLnN0cmluZygpLFxuICBcIm9ic2VydmF0aW9uc1wiOiB6b2QuYXJyYXkoem9kLnN0cmluZygpKS5taW4oZ2V0UGxheWVyVHJhY2tlclJlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVPYnNlcnZhdGlvbnNNaW4pLm1heChnZXRQbGF5ZXJUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCksXG4gIFwidHJhbnNjcmlwdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpLFxuICBcImF1ZGlvUGF0aFwiOiB6b2Quc3RyaW5nKCkucmVnZXgoZ2V0UGxheWVyVHJhY2tlclJlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVBdWRpb1BhdGhSZWdFeHApLm51bGxhYmxlKCksXG4gIFwidXBkYXRlZEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpXG59KSx6b2QubnVsbCgpXSkub3B0aW9uYWwoKVxufSkpLFxuICBcImJyYW5kaW5nXCI6IHpvZC5vYmplY3Qoe1xuICBcIm5hbWVcIjogem9kLnN0cmluZygpLm1pbigxKS5tYXgoZ2V0UGxheWVyVHJhY2tlclJlc3BvbnNlQnJhbmRpbmdOYW1lTWF4KSxcbiAgXCJsb2dvUGF0aFwiOiB6b2Quc3RyaW5nKCkubWF4KGdldFBsYXllclRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhNYXgpLnJlZ2V4KGdldFBsYXllclRyYWNrZXJSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhSZWdFeHApLm51bGxhYmxlKClcbn0pLFxuICBcImxhc3RVcGRhdGVkQXRcIjogem9kLmNvZXJjZS5kYXRlKClcbn0pXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBSZXBsYWNlIHRoZSBwbGF5ZXIgcm9zdGVyLCBjb2FjaCBvcHRpb25zLCBhbmQgdHJhY2tlciBicmFuZGluZ1xuICovXG5cbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzQm9keUJyYW5kaW5nTmFtZU1heCA9IDgwO1xuXG5leHBvcnQgY29uc3Qgc2F2ZVRyYWNrZXJTZXR0aW5nc0JvZHlCcmFuZGluZ0xvZ29QYXRoTWF4ID0gMTAwO1xuXG5cbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzQm9keUJyYW5kaW5nTG9nb1BhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBTYXZlVHJhY2tlclNldHRpbmdzQm9keSA9IHpvZC5vYmplY3Qoe1xuICBcImNvYWNoZXNcIjogem9kLmFycmF5KHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKVxufSkpLm1pbigxKSxcbiAgXCJicmFuZGluZ1wiOiB6b2Qub2JqZWN0KHtcbiAgXCJuYW1lXCI6IHpvZC5zdHJpbmcoKS5taW4oMSkubWF4KHNhdmVUcmFja2VyU2V0dGluZ3NCb2R5QnJhbmRpbmdOYW1lTWF4KSxcbiAgXCJsb2dvUGF0aFwiOiB6b2Quc3RyaW5nKCkubWF4KHNhdmVUcmFja2VyU2V0dGluZ3NCb2R5QnJhbmRpbmdMb2dvUGF0aE1heCkucmVnZXgoc2F2ZVRyYWNrZXJTZXR0aW5nc0JvZHlCcmFuZGluZ0xvZ29QYXRoUmVnRXhwKS5udWxsYWJsZSgpXG59KVxufSlcblxuZXhwb3J0IGNvbnN0IHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWluID0gMztcbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCA9IDM7XG5cbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZUF1ZGlvUGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL1swLTlhLWYtXSskJyk7XG5leHBvcnQgY29uc3Qgc2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlUmVmcmVzaEhlYWx0aENvbnNlY3V0aXZlRmFpbHVyZXNNaW4gPSAwO1xuXG5cbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VSZWZyZXNoSGVhbHRoUGVuZGluZ1JlY292ZXJ5Tm90aWNlc01pbiA9IDA7XG5cbmV4cG9ydCBjb25zdCBzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VCcmFuZGluZ05hbWVNYXggPSA4MDtcblxuZXhwb3J0IGNvbnN0IHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhNYXggPSAxMDA7XG5cblxuZXhwb3J0IGNvbnN0IHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBTYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2UgPSB6b2Qub2JqZWN0KHtcbiAgXCJwbGF5ZXJzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKClcbn0pKSxcbiAgXCJjb2FjaGVzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKClcbn0pKSxcbiAgXCJtYXRjaGVzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwiZXh0ZXJuYWxJZFwiOiB6b2Quc3RyaW5nKCkubnVsbGFibGUoKSxcbiAgXCJwbGF5ZXJJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwib3Bwb25lbnRcIjogem9kLnN0cmluZygpLFxuICBcInN0YXJ0c0F0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcImVuZHNBdFwiOiB6b2QuY29lcmNlLmRhdGUoKSxcbiAgXCJ2ZW51ZVwiOiB6b2Quc3RyaW5nKCksXG4gIFwiY291cnRcIjogem9kLnN0cmluZygpLFxuICBcImNvYWNoSWRcIjogem9kLnN0cmluZygpLFxuICBcInN0YXR1c1wiOiB6b2QuZW51bShbJ3VwY29taW5nJywgJ2NvbXBsZXRlZCddKSxcbiAgXCJyZXN1bHRcIjogem9kLnN0cmluZygpLm51bGxpc2goKSxcbiAgXCJyZXBvcnRcIjogem9kLnVuaW9uKFt6b2Qub2JqZWN0KHtcbiAgXCJtYXRjaElkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJvYnNlcnZhdGlvbnNcIjogem9kLmFycmF5KHpvZC5zdHJpbmcoKSkubWluKHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWluKS5tYXgoc2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlTWF0Y2hlc0l0ZW1SZXBvcnRPbmVPYnNlcnZhdGlvbnNNYXgpLFxuICBcInRyYW5zY3JpcHRcIjogem9kLnN0cmluZygpLm51bGxpc2goKSxcbiAgXCJhdWRpb1BhdGhcIjogem9kLnN0cmluZygpLnJlZ2V4KHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lQXVkaW9QYXRoUmVnRXhwKS5udWxsYWJsZSgpLFxuICBcInVwZGF0ZWRBdFwiOiB6b2QuY29lcmNlLmRhdGUoKVxufSksem9kLm51bGwoKV0pLm9wdGlvbmFsKClcbn0pKSxcbiAgXCJsYXN0VXBkYXRlZEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcInNvdXJjZVwiOiB6b2QuZW51bShbJ3NhbXBsZScsICdjbHViLWxvY2tlciddKSxcbiAgXCJyZWZyZXNoSGVhbHRoXCI6IHpvZC5vYmplY3Qoe1xuICBcImNvbnNlY3V0aXZlRmFpbHVyZXNcIjogem9kLm51bWJlcigpLmludCgpLm1pbihzYXZlVHJhY2tlclNldHRpbmdzUmVzcG9uc2VSZWZyZXNoSGVhbHRoQ29uc2VjdXRpdmVGYWlsdXJlc01pbiksXG4gIFwiYWxlcnRUaHJlc2hvbGRcIjogem9kLm51bWJlcigpLmludCgpLm1pbigxKSxcbiAgXCJsYXN0RmFpbHVyZUF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLm51bGxhYmxlKCksXG4gIFwiYWxlcnRTZW50QXRcIjogem9kLmNvZXJjZS5kYXRlKCkubnVsbGFibGUoKSxcbiAgXCJwZW5kaW5nUmVjb3ZlcnlOb3RpY2VzXCI6IHpvZC5udW1iZXIoKS5pbnQoKS5taW4oc2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlUmVmcmVzaEhlYWx0aFBlbmRpbmdSZWNvdmVyeU5vdGljZXNNaW4pLmRlc2NyaWJlKCdSZWNvdmVyeSBub3RpY2VzIHdhaXRpbmcgdG8gYmUgZGVsaXZlcmVkIHRvIHN0YWZmJylcbn0pLFxuICBcImJyYW5kaW5nXCI6IHpvZC5vYmplY3Qoe1xuICBcIm5hbWVcIjogem9kLnN0cmluZygpLm1pbigxKS5tYXgoc2F2ZVRyYWNrZXJTZXR0aW5nc1Jlc3BvbnNlQnJhbmRpbmdOYW1lTWF4KSxcbiAgXCJsb2dvUGF0aFwiOiB6b2Quc3RyaW5nKCkubWF4KHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhNYXgpLnJlZ2V4KHNhdmVUcmFja2VyU2V0dGluZ3NSZXNwb25zZUJyYW5kaW5nTG9nb1BhdGhSZWdFeHApLm51bGxhYmxlKClcbn0pXG59KVxuXG5cbi8qKlxuICogQHN1bW1hcnkgVmFsaWRhdGUgYW5kIHVwbG9hZCBhIHRyYWNrZXIgbG9nbyB0byBBcHAgU3RvcmFnZVxuICovXG5leHBvcnQgY29uc3QgdXBsb2FkVHJhY2tlckxvZ29SZXNwb25zZU9iamVjdFBhdGhSZWdFeHAgPSBuZXcgUmVnRXhwKCdeL29iamVjdHMvdXBsb2Fkcy9bMC05YS1mLV0rJCcpO1xuXG5cbmV4cG9ydCBjb25zdCBVcGxvYWRUcmFja2VyTG9nb1Jlc3BvbnNlID0gem9kLm9iamVjdCh7XG4gIFwib2JqZWN0UGF0aFwiOiB6b2Quc3RyaW5nKCkucmVnZXgodXBsb2FkVHJhY2tlckxvZ29SZXNwb25zZU9iamVjdFBhdGhSZWdFeHApXG59KVxuXG5cbi8qKlxuICogQHN1bW1hcnkgU2VydmUgYW4gdXBsb2FkZWQgb2JqZWN0IGZyb20gQXBwIFN0b3JhZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IEdldFN0b3JhZ2VPYmplY3RQYXJhbXMgPSB6b2Qub2JqZWN0KHtcbiAgXCJvYmplY3RQYXRoXCI6IHpvZC5jb2VyY2Uuc3RyaW5nKClcbn0pXG5cbmV4cG9ydCBjb25zdCBHZXRTdG9yYWdlT2JqZWN0UmVzcG9uc2UgPSB6b2QudW5rbm93bigpXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBVcGRhdGUgbWF0Y2ggZGV0YWlscywgYXNzaWdubWVudCwgc3RhdHVzLCBvciByZXN1bHRcbiAqL1xuZXhwb3J0IGNvbnN0IFVwZGF0ZU1hdGNoUGFyYW1zID0gem9kLm9iamVjdCh7XG4gIFwibWF0Y2hJZFwiOiB6b2QuY29lcmNlLnN0cmluZygpXG59KVxuXG5leHBvcnQgY29uc3QgVXBkYXRlTWF0Y2hCb2R5ID0gem9kLm9iamVjdCh7XG4gIFwib3Bwb25lbnRcIjogem9kLnN0cmluZygpLm9wdGlvbmFsKCksXG4gIFwic3RhcnRzQXRcIjogem9kLmNvZXJjZS5kYXRlKCkub3B0aW9uYWwoKSxcbiAgXCJlbmRzQXRcIjogem9kLmNvZXJjZS5kYXRlKCkub3B0aW9uYWwoKSxcbiAgXCJ2ZW51ZVwiOiB6b2Quc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgXCJjb3VydFwiOiB6b2Quc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgXCJjb2FjaElkXCI6IHpvZC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBcInN0YXR1c1wiOiB6b2QuZW51bShbJ3VwY29taW5nJywgJ2NvbXBsZXRlZCddKS5vcHRpb25hbCgpLFxuICBcInJlc3VsdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpXG59KVxuXG5leHBvcnQgY29uc3QgdXBkYXRlTWF0Y2hSZXNwb25zZVJlcG9ydE9uZU9ic2VydmF0aW9uc01pbiA9IDM7XG5leHBvcnQgY29uc3QgdXBkYXRlTWF0Y2hSZXNwb25zZVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCA9IDM7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVNYXRjaFJlc3BvbnNlUmVwb3J0T25lQXVkaW9QYXRoUmVnRXhwID0gbmV3IFJlZ0V4cCgnXi9vYmplY3RzL3VwbG9hZHMvWzAtOWEtZi1dKyQnKTtcblxuXG5leHBvcnQgY29uc3QgVXBkYXRlTWF0Y2hSZXNwb25zZSA9IHpvZC5vYmplY3Qoe1xuICBcImlkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJleHRlcm5hbElkXCI6IHpvZC5zdHJpbmcoKS5udWxsYWJsZSgpLFxuICBcInBsYXllcklkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJvcHBvbmVudFwiOiB6b2Quc3RyaW5nKCksXG4gIFwic3RhcnRzQXRcIjogem9kLmNvZXJjZS5kYXRlKCksXG4gIFwiZW5kc0F0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcInZlbnVlXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJjb3VydFwiOiB6b2Quc3RyaW5nKCksXG4gIFwiY29hY2hJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwic3RhdHVzXCI6IHpvZC5lbnVtKFsndXBjb21pbmcnLCAnY29tcGxldGVkJ10pLFxuICBcInJlc3VsdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpLFxuICBcInJlcG9ydFwiOiB6b2QudW5pb24oW3pvZC5vYmplY3Qoe1xuICBcIm1hdGNoSWRcIjogem9kLnN0cmluZygpLFxuICBcIm9ic2VydmF0aW9uc1wiOiB6b2QuYXJyYXkoem9kLnN0cmluZygpKS5taW4odXBkYXRlTWF0Y2hSZXNwb25zZVJlcG9ydE9uZU9ic2VydmF0aW9uc01pbikubWF4KHVwZGF0ZU1hdGNoUmVzcG9uc2VSZXBvcnRPbmVPYnNlcnZhdGlvbnNNYXgpLFxuICBcInRyYW5zY3JpcHRcIjogem9kLnN0cmluZygpLm51bGxpc2goKSxcbiAgXCJhdWRpb1BhdGhcIjogem9kLnN0cmluZygpLnJlZ2V4KHVwZGF0ZU1hdGNoUmVzcG9uc2VSZXBvcnRPbmVBdWRpb1BhdGhSZWdFeHApLm51bGxhYmxlKCksXG4gIFwidXBkYXRlZEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpXG59KSx6b2QubnVsbCgpXSkub3B0aW9uYWwoKVxufSlcblxuXG4vKipcbiAqIEBzdW1tYXJ5IFNhdmUgZXhhY3RseSB0aHJlZSBjb2FjaCBvYnNlcnZhdGlvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IFNhdmVDb2FjaFJlcG9ydFBhcmFtcyA9IHpvZC5vYmplY3Qoe1xuICBcIm1hdGNoSWRcIjogem9kLmNvZXJjZS5zdHJpbmcoKVxufSlcblxuZXhwb3J0IGNvbnN0IHNhdmVDb2FjaFJlcG9ydEJvZHlPYnNlcnZhdGlvbnNJdGVtTWF4ID0gMjIwO1xuXG5leHBvcnQgY29uc3Qgc2F2ZUNvYWNoUmVwb3J0Qm9keU9ic2VydmF0aW9uc01pbiA9IDM7XG5leHBvcnQgY29uc3Qgc2F2ZUNvYWNoUmVwb3J0Qm9keU9ic2VydmF0aW9uc01heCA9IDM7XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29hY2hSZXBvcnRCb2R5QXVkaW9QYXRoUmVnRXhwID0gbmV3IFJlZ0V4cCgnXi9vYmplY3RzL3VwbG9hZHMvWzAtOWEtZi1dKyQnKTtcblxuXG5leHBvcnQgY29uc3QgU2F2ZUNvYWNoUmVwb3J0Qm9keSA9IHpvZC5vYmplY3Qoe1xuICBcIm9ic2VydmF0aW9uc1wiOiB6b2QuYXJyYXkoem9kLnN0cmluZygpLm1pbigxKS5tYXgoc2F2ZUNvYWNoUmVwb3J0Qm9keU9ic2VydmF0aW9uc0l0ZW1NYXgpKS5taW4oc2F2ZUNvYWNoUmVwb3J0Qm9keU9ic2VydmF0aW9uc01pbikubWF4KHNhdmVDb2FjaFJlcG9ydEJvZHlPYnNlcnZhdGlvbnNNYXgpLFxuICBcInRyYW5zY3JpcHRcIjogem9kLnN0cmluZygpLm51bGxpc2goKSxcbiAgXCJhdWRpb1BhdGhcIjogem9kLnN0cmluZygpLnJlZ2V4KHNhdmVDb2FjaFJlcG9ydEJvZHlBdWRpb1BhdGhSZWdFeHApLm51bGxpc2goKVxufSlcblxuZXhwb3J0IGNvbnN0IHNhdmVDb2FjaFJlcG9ydFJlc3BvbnNlT2JzZXJ2YXRpb25zTWluID0gMztcbmV4cG9ydCBjb25zdCBzYXZlQ29hY2hSZXBvcnRSZXNwb25zZU9ic2VydmF0aW9uc01heCA9IDM7XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29hY2hSZXBvcnRSZXNwb25zZUF1ZGlvUGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL1swLTlhLWYtXSskJyk7XG5cblxuZXhwb3J0IGNvbnN0IFNhdmVDb2FjaFJlcG9ydFJlc3BvbnNlID0gem9kLm9iamVjdCh7XG4gIFwibWF0Y2hJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwib2JzZXJ2YXRpb25zXCI6IHpvZC5hcnJheSh6b2Quc3RyaW5nKCkpLm1pbihzYXZlQ29hY2hSZXBvcnRSZXNwb25zZU9ic2VydmF0aW9uc01pbikubWF4KHNhdmVDb2FjaFJlcG9ydFJlc3BvbnNlT2JzZXJ2YXRpb25zTWF4KSxcbiAgXCJ0cmFuc2NyaXB0XCI6IHpvZC5zdHJpbmcoKS5udWxsaXNoKCksXG4gIFwiYXVkaW9QYXRoXCI6IHpvZC5zdHJpbmcoKS5yZWdleChzYXZlQ29hY2hSZXBvcnRSZXNwb25zZUF1ZGlvUGF0aFJlZ0V4cCkubnVsbGFibGUoKSxcbiAgXCJ1cGRhdGVkQXRcIjogem9kLmNvZXJjZS5kYXRlKClcbn0pXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBTdG9yZSBhIHJlY29yZGVkIGNvYWNoIHZvaWNlIG5vdGUgaW4gQXBwIFN0b3JhZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IFVwbG9hZENvYWNoUmVwb3J0QXVkaW9QYXJhbXMgPSB6b2Qub2JqZWN0KHtcbiAgXCJtYXRjaElkXCI6IHpvZC5jb2VyY2Uuc3RyaW5nKClcbn0pXG5cbmV4cG9ydCBjb25zdCB1cGxvYWRDb2FjaFJlcG9ydEF1ZGlvUmVzcG9uc2VPYmplY3RQYXRoUmVnRXhwID0gbmV3IFJlZ0V4cCgnXi9vYmplY3RzL3VwbG9hZHMvWzAtOWEtZi1dKyQnKTtcblxuXG5leHBvcnQgY29uc3QgVXBsb2FkQ29hY2hSZXBvcnRBdWRpb1Jlc3BvbnNlID0gem9kLm9iamVjdCh7XG4gIFwib2JqZWN0UGF0aFwiOiB6b2Quc3RyaW5nKCkucmVnZXgodXBsb2FkQ29hY2hSZXBvcnRBdWRpb1Jlc3BvbnNlT2JqZWN0UGF0aFJlZ0V4cClcbn0pXG5cblxuLyoqXG4gKiBAc3VtbWFyeSBJbXBvcnQgdGhlIGxhdGVzdCBzY2hlZHVsZSBmcm9tIHRoZSBjb25maWd1cmVkIENsdWIgTG9ja2VyIGZlZWRcbiAqL1xuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01pbiA9IDM7XG5leHBvcnQgY29uc3QgcmVmcmVzaFRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lT2JzZXJ2YXRpb25zTWF4ID0gMztcblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZUF1ZGlvUGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL1swLTlhLWYtXSskJyk7XG5leHBvcnQgY29uc3QgcmVmcmVzaFRyYWNrZXJSZXNwb25zZVJlZnJlc2hIZWFsdGhDb25zZWN1dGl2ZUZhaWx1cmVzTWluID0gMDtcblxuXG5leHBvcnQgY29uc3QgcmVmcmVzaFRyYWNrZXJSZXNwb25zZVJlZnJlc2hIZWFsdGhQZW5kaW5nUmVjb3ZlcnlOb3RpY2VzTWluID0gMDtcblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmFja2VyUmVzcG9uc2VCcmFuZGluZ05hbWVNYXggPSA4MDtcblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoTWF4ID0gMTAwO1xuXG5cbmV4cG9ydCBjb25zdCByZWZyZXNoVHJhY2tlclJlc3BvbnNlQnJhbmRpbmdMb2dvUGF0aFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14vb2JqZWN0cy91cGxvYWRzL1swLTlhLWYtXSskJyk7XG5cblxuZXhwb3J0IGNvbnN0IFJlZnJlc2hUcmFja2VyUmVzcG9uc2UgPSB6b2Qub2JqZWN0KHtcbiAgXCJwbGF5ZXJzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKClcbn0pKSxcbiAgXCJjb2FjaGVzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKClcbn0pKSxcbiAgXCJtYXRjaGVzXCI6IHpvZC5hcnJheSh6b2Qub2JqZWN0KHtcbiAgXCJpZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwiZXh0ZXJuYWxJZFwiOiB6b2Quc3RyaW5nKCkubnVsbGFibGUoKSxcbiAgXCJwbGF5ZXJJZFwiOiB6b2Quc3RyaW5nKCksXG4gIFwib3Bwb25lbnRcIjogem9kLnN0cmluZygpLFxuICBcInN0YXJ0c0F0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcImVuZHNBdFwiOiB6b2QuY29lcmNlLmRhdGUoKSxcbiAgXCJ2ZW51ZVwiOiB6b2Quc3RyaW5nKCksXG4gIFwiY291cnRcIjogem9kLnN0cmluZygpLFxuICBcImNvYWNoSWRcIjogem9kLnN0cmluZygpLFxuICBcInN0YXR1c1wiOiB6b2QuZW51bShbJ3VwY29taW5nJywgJ2NvbXBsZXRlZCddKSxcbiAgXCJyZXN1bHRcIjogem9kLnN0cmluZygpLm51bGxpc2goKSxcbiAgXCJyZXBvcnRcIjogem9kLnVuaW9uKFt6b2Qub2JqZWN0KHtcbiAgXCJtYXRjaElkXCI6IHpvZC5zdHJpbmcoKSxcbiAgXCJvYnNlcnZhdGlvbnNcIjogem9kLmFycmF5KHpvZC5zdHJpbmcoKSkubWluKHJlZnJlc2hUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01pbikubWF4KHJlZnJlc2hUcmFja2VyUmVzcG9uc2VNYXRjaGVzSXRlbVJlcG9ydE9uZU9ic2VydmF0aW9uc01heCksXG4gIFwidHJhbnNjcmlwdFwiOiB6b2Quc3RyaW5nKCkubnVsbGlzaCgpLFxuICBcImF1ZGlvUGF0aFwiOiB6b2Quc3RyaW5nKCkucmVnZXgocmVmcmVzaFRyYWNrZXJSZXNwb25zZU1hdGNoZXNJdGVtUmVwb3J0T25lQXVkaW9QYXRoUmVnRXhwKS5udWxsYWJsZSgpLFxuICBcInVwZGF0ZWRBdFwiOiB6b2QuY29lcmNlLmRhdGUoKVxufSksem9kLm51bGwoKV0pLm9wdGlvbmFsKClcbn0pKSxcbiAgXCJsYXN0VXBkYXRlZEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLFxuICBcInNvdXJjZVwiOiB6b2QuZW51bShbJ3NhbXBsZScsICdjbHViLWxvY2tlciddKSxcbiAgXCJyZWZyZXNoSGVhbHRoXCI6IHpvZC5vYmplY3Qoe1xuICBcImNvbnNlY3V0aXZlRmFpbHVyZXNcIjogem9kLm51bWJlcigpLmludCgpLm1pbihyZWZyZXNoVHJhY2tlclJlc3BvbnNlUmVmcmVzaEhlYWx0aENvbnNlY3V0aXZlRmFpbHVyZXNNaW4pLFxuICBcImFsZXJ0VGhyZXNob2xkXCI6IHpvZC5udW1iZXIoKS5pbnQoKS5taW4oMSksXG4gIFwibGFzdEZhaWx1cmVBdFwiOiB6b2QuY29lcmNlLmRhdGUoKS5udWxsYWJsZSgpLFxuICBcImFsZXJ0U2VudEF0XCI6IHpvZC5jb2VyY2UuZGF0ZSgpLm51bGxhYmxlKCksXG4gIFwicGVuZGluZ1JlY292ZXJ5Tm90aWNlc1wiOiB6b2QubnVtYmVyKCkuaW50KCkubWluKHJlZnJlc2hUcmFja2VyUmVzcG9uc2VSZWZyZXNoSGVhbHRoUGVuZGluZ1JlY292ZXJ5Tm90aWNlc01pbikuZGVzY3JpYmUoJ1JlY292ZXJ5IG5vdGljZXMgd2FpdGluZyB0byBiZSBkZWxpdmVyZWQgdG8gc3RhZmYnKVxufSksXG4gIFwiYnJhbmRpbmdcIjogem9kLm9iamVjdCh7XG4gIFwibmFtZVwiOiB6b2Quc3RyaW5nKCkubWluKDEpLm1heChyZWZyZXNoVHJhY2tlclJlc3BvbnNlQnJhbmRpbmdOYW1lTWF4KSxcbiAgXCJsb2dvUGF0aFwiOiB6b2Quc3RyaW5nKCkubWF4KHJlZnJlc2hUcmFja2VyUmVzcG9uc2VCcmFuZGluZ0xvZ29QYXRoTWF4KS5yZWdleChyZWZyZXNoVHJhY2tlclJlc3BvbnNlQnJhbmRpbmdMb2dvUGF0aFJlZ0V4cCkubnVsbGFibGUoKVxufSlcbn0pXG5cblxuIiwgImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmNvbnN0IERhdGVUaW1lU3RyaW5nID0gei5zdHJpbmcoKS5kYXRldGltZSh7IG9mZnNldDogdHJ1ZSB9KTtcbmNvbnN0IE9iamVjdFBhdGggPSB6LnN0cmluZygpLnJlZ2V4KC9eXFwvb2JqZWN0c1xcL3VwbG9hZHNcXC9bMC05YS1mLV0rJC8pO1xuXG5jb25zdCBUcmFja2VyUGVyc29uID0gei5vYmplY3Qoe1xuICBpZDogei5zdHJpbmcoKS5taW4oMSksXG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDEpLFxufSk7XG5cbmNvbnN0IFJlZnJlc2hSZWNvdmVyeSA9IHoub2JqZWN0KHtcbiAgZmFpbGVkQXR0ZW1wdHM6IHoubnVtYmVyKCkuaW50KCkubWluKDEpLFxuICBvdXRhZ2VTdGFydGVkQXQ6IERhdGVUaW1lU3RyaW5nLFxuICByZWNvdmVyZWRBdDogRGF0ZVRpbWVTdHJpbmcsXG4gIG91dGFnZUR1cmF0aW9uTXM6IHoubnVtYmVyKCkuaW50KCkubWluKDApLFxufSk7XG5cbmNvbnN0IFJlZnJlc2hIZWFsdGggPSB6Lm9iamVjdCh7XG4gIGNvbnNlY3V0aXZlRmFpbHVyZXM6IHoubnVtYmVyKCkuaW50KCkubWluKDApLFxuICBhbGVydFRocmVzaG9sZDogei5udW1iZXIoKS5pbnQoKS5taW4oMSksXG4gIGZpcnN0RmFpbHVyZUF0OiBEYXRlVGltZVN0cmluZy5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG4gIGxhc3RGYWlsdXJlQXQ6IERhdGVUaW1lU3RyaW5nLm51bGxhYmxlKCksXG4gIGFsZXJ0U2VudEF0OiBEYXRlVGltZVN0cmluZy5udWxsYWJsZSgpLFxuICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IERhdGVUaW1lU3RyaW5nLm51bGxhYmxlKCkub3B0aW9uYWwoKSxcbiAgcGVuZGluZ1JlY292ZXJpZXM6IHouYXJyYXkoUmVmcmVzaFJlY292ZXJ5KS5vcHRpb25hbCgpLFxuICBwZW5kaW5nUmVjb3Zlcnk6IFJlZnJlc2hSZWNvdmVyeS5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG4gIHJlY292ZXJ5Q2xhaW06IHoub2JqZWN0KHtcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IERhdGVUaW1lU3RyaW5nLFxuICAgIHJlY292ZXJlZEF0OiBEYXRlVGltZVN0cmluZyxcbiAgICBjbGFpbWVkQXQ6IERhdGVUaW1lU3RyaW5nLFxuICB9KS5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG59KTtcblxuY29uc3QgQ29hY2hSZXBvcnQgPSB6Lm9iamVjdCh7XG4gIG1hdGNoSWQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBvYnNlcnZhdGlvbnM6IHouYXJyYXkoei5zdHJpbmcoKS5taW4oMSkpLmxlbmd0aCgzKSxcbiAgdHJhbnNjcmlwdDogei5zdHJpbmcoKS5udWxsYWJsZSgpLFxuICBhdWRpb1BhdGg6IE9iamVjdFBhdGgubnVsbGFibGUoKS5vcHRpb25hbCgpLFxuICB1cGRhdGVkQXQ6IERhdGVUaW1lU3RyaW5nLFxufSk7XG5cbmNvbnN0IFRyYWNrZXJNYXRjaCA9IHoub2JqZWN0KHtcbiAgaWQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBleHRlcm5hbElkOiB6LnN0cmluZygpLm51bGxhYmxlKCksXG4gIHBsYXllcklkOiB6LnN0cmluZygpLm1pbigxKSxcbiAgb3Bwb25lbnQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBzdGFydHNBdDogRGF0ZVRpbWVTdHJpbmcsXG4gIGVuZHNBdDogRGF0ZVRpbWVTdHJpbmcsXG4gIHZlbnVlOiB6LnN0cmluZygpLm1pbigxKSxcbiAgY291cnQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBjb2FjaElkOiB6LnN0cmluZygpLm1pbigxKSxcbiAgc3RhdHVzOiB6LmVudW0oW1widXBjb21pbmdcIiwgXCJjb21wbGV0ZWRcIl0pLFxuICByZXN1bHQ6IHouc3RyaW5nKCkubnVsbGFibGUoKSxcbiAgcmVwb3J0OiBDb2FjaFJlcG9ydC5udWxsYWJsZSgpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBQZXJzaXN0ZWRUcmFja2VyU3RhdGUgPSB6Lm9iamVjdCh7XG4gIHBsYXllcnM6IHouYXJyYXkoVHJhY2tlclBlcnNvbiksXG4gIGNvYWNoZXM6IHouYXJyYXkoVHJhY2tlclBlcnNvbiksXG4gIGJyYW5kaW5nOiB6XG4gICAgLm9iamVjdCh7XG4gICAgICBuYW1lOiB6LnN0cmluZygpLm1pbigxKS5tYXgoODApLFxuICAgICAgbG9nb1BhdGg6IE9iamVjdFBhdGgubnVsbGFibGUoKS5vcHRpb25hbCgpLFxuICAgICAgbG9nb1VybDogei5zdHJpbmcoKS5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG4gICAgfSlcbiAgICAub3B0aW9uYWwoKSxcbiAgbWF0Y2hlczogei5hcnJheShUcmFja2VyTWF0Y2gpLFxuICBsYXN0VXBkYXRlZEF0OiBEYXRlVGltZVN0cmluZyxcbiAgc291cmNlOiB6LmVudW0oW1wic2FtcGxlXCIsIFwiY2x1Yi1sb2NrZXJcIl0pLFxuICByZWZyZXNoSGVhbHRoOiBSZWZyZXNoSGVhbHRoLm9wdGlvbmFsKCksXG59KTtcblxuZXhwb3J0IHR5cGUgUGVyc2lzdGVkVHJhY2tlclN0YXRlID0gei5pbmZlcjx0eXBlb2YgUGVyc2lzdGVkVHJhY2tlclN0YXRlPjsiLCAidHlwZSBUcmFja2VyUGVyc29uID0geyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfTtcblxudHlwZSBUcmFja2VyTWF0Y2ggPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBleHRlcm5hbElkOiBzdHJpbmcgfCBudWxsO1xuICAgIHBsYXllcklkOiBzdHJpbmc7XG4gICAgb3Bwb25lbnQ6IHN0cmluZztcbiAgICBzdGFydHNBdDogc3RyaW5nO1xuICAgIGVuZHNBdDogc3RyaW5nO1xuICAgIHZlbnVlOiBzdHJpbmc7XG4gICAgY291cnQ6IHN0cmluZztcbiAgICBjb2FjaElkOiBzdHJpbmc7XG4gICAgc3RhdHVzOiBcInVwY29taW5nXCIgfCBcImNvbXBsZXRlZFwiO1xuICAgIHJlc3VsdDogc3RyaW5nIHwgbnVsbDtcbiAgICByZXBvcnQ6IHtcbiAgICAgIG1hdGNoSWQ6IHN0cmluZztcbiAgICAgIG9ic2VydmF0aW9uczogc3RyaW5nW107XG4gICAgICB0cmFuc2NyaXB0OiBzdHJpbmcgfCBudWxsO1xuICAgICAgYXVkaW9QYXRoPzogc3RyaW5nIHwgbnVsbDtcbiAgICAgIHVwZGF0ZWRBdDogc3RyaW5nO1xuICAgIH0gfCBudWxsO1xuICB9O1xuXG5leHBvcnQgdHlwZSBUcmFja2VyU3RhdGUgPSB7XG4gIHBsYXllcnM6IFRyYWNrZXJQZXJzb25bXTtcbiAgY29hY2hlczogVHJhY2tlclBlcnNvbltdO1xuICBicmFuZGluZz86IHsgbmFtZTogc3RyaW5nOyBsb2dvUGF0aDogc3RyaW5nIHwgbnVsbCB9O1xuICBtYXRjaGVzOiBUcmFja2VyTWF0Y2hbXTtcbiAgbGFzdFVwZGF0ZWRBdDogc3RyaW5nO1xuICBzb3VyY2U6IFwic2FtcGxlXCIgfCBcImNsdWItbG9ja2VyXCI7XG4gIHJlZnJlc2hIZWFsdGg6IFJlZnJlc2hIZWFsdGg7XG59O1xuXG50eXBlIERlZXBSZWFkb25seTxUPiA9IFQgZXh0ZW5kcyAoLi4uYXJnczogbmV2ZXJbXSkgPT4gdW5rbm93blxuICA/IFRcbiAgOiBUIGV4dGVuZHMgcmVhZG9ubHkgKGluZmVyIEl0ZW0pW11cbiAgICA/IHJlYWRvbmx5IERlZXBSZWFkb25seTxJdGVtPltdXG4gICAgOiBUIGV4dGVuZHMgb2JqZWN0XG4gICAgICA/IHsgcmVhZG9ubHkgW0tleSBpbiBrZXlvZiBUXTogRGVlcFJlYWRvbmx5PFRbS2V5XT4gfVxuICAgICAgOiBUO1xuXG5leHBvcnQgdHlwZSBSZWFkb25seVRyYWNrZXJTdGF0ZSA9IERlZXBSZWFkb25seTxUcmFja2VyU3RhdGU+O1xuXG5leHBvcnQgdHlwZSBSZWZyZXNoSGVhbHRoID0ge1xuICBjb25zZWN1dGl2ZUZhaWx1cmVzOiBudW1iZXI7XG4gIGFsZXJ0VGhyZXNob2xkOiBudW1iZXI7XG4gIGZpcnN0RmFpbHVyZUF0OiBzdHJpbmcgfCBudWxsO1xuICBsYXN0RmFpbHVyZUF0OiBzdHJpbmcgfCBudWxsO1xuICBhbGVydFNlbnRBdDogc3RyaW5nIHwgbnVsbDtcbiAgZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0OiBzdHJpbmcgfCBudWxsO1xuICBwZW5kaW5nUmVjb3ZlcmllczogUmVmcmVzaFJlY292ZXJ5W107XG4gIHJlY292ZXJ5Q2xhaW06IHtcbiAgICBvdXRhZ2VTdGFydGVkQXQ6IHN0cmluZztcbiAgICByZWNvdmVyZWRBdDogc3RyaW5nO1xuICAgIGNsYWltZWRBdDogc3RyaW5nO1xuICB9IHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIFJlZnJlc2hSZWNvdmVyeSA9IHtcbiAgZmFpbGVkQXR0ZW1wdHM6IG51bWJlcjtcbiAgb3V0YWdlU3RhcnRlZEF0OiBzdHJpbmc7XG4gIHJlY292ZXJlZEF0OiBzdHJpbmc7XG4gIG91dGFnZUR1cmF0aW9uTXM6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZVRyYWNrZXJTdGF0ZShzdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGUpOiBUcmFja2VyU3RhdGUge1xuICByZXR1cm4ge1xuICAgIHBsYXllcnM6IHN0YXRlLnBsYXllcnMubWFwKChwbGF5ZXIpID0+ICh7IC4uLnBsYXllciB9KSksXG4gICAgY29hY2hlczogc3RhdGUuY29hY2hlcy5tYXAoKGNvYWNoKSA9PiAoeyAuLi5jb2FjaCB9KSksXG4gICAgYnJhbmRpbmc6IHN0YXRlLmJyYW5kaW5nID8geyAuLi5zdGF0ZS5icmFuZGluZyB9IDogdW5kZWZpbmVkLFxuICAgIG1hdGNoZXM6IHN0YXRlLm1hdGNoZXMubWFwKGNsb25lVHJhY2tlck1hdGNoKSxcbiAgICBsYXN0VXBkYXRlZEF0OiBzdGF0ZS5sYXN0VXBkYXRlZEF0LFxuICAgIHNvdXJjZTogc3RhdGUuc291cmNlLFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIC4uLnN0YXRlLnJlZnJlc2hIZWFsdGgsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogY2xvbmVSZWZyZXNoUmVjb3ZlcmllcyhcbiAgICAgICAgc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyxcbiAgICAgICksXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZVRyYWNrZXJTdGF0ZShzdGF0ZTogVHJhY2tlclN0YXRlKTogUmVhZG9ubHlUcmFja2VyU3RhdGUge1xuICBmb3IgKGNvbnN0IHBsYXllciBvZiBzdGF0ZS5wbGF5ZXJzKSBPYmplY3QuZnJlZXplKHBsYXllcik7XG4gIE9iamVjdC5mcmVlemUoc3RhdGUucGxheWVycyk7XG4gIGZvciAoY29uc3QgY29hY2ggb2Ygc3RhdGUuY29hY2hlcykgT2JqZWN0LmZyZWV6ZShjb2FjaCk7XG4gIE9iamVjdC5mcmVlemUoc3RhdGUuY29hY2hlcyk7XG4gIGlmIChzdGF0ZS5icmFuZGluZykgT2JqZWN0LmZyZWV6ZShzdGF0ZS5icmFuZGluZyk7XG4gIGZvciAoY29uc3QgbWF0Y2ggb2Ygc3RhdGUubWF0Y2hlcykge1xuICAgIGlmIChtYXRjaC5yZXBvcnQpIHtcbiAgICAgIE9iamVjdC5mcmVlemUobWF0Y2gucmVwb3J0Lm9ic2VydmF0aW9ucyk7XG4gICAgICBPYmplY3QuZnJlZXplKG1hdGNoLnJlcG9ydCk7XG4gICAgfVxuICAgIE9iamVjdC5mcmVlemUobWF0Y2gpO1xuICB9XG4gIE9iamVjdC5mcmVlemUoc3RhdGUubWF0Y2hlcyk7XG4gIGZvciAoY29uc3QgcmVjb3Zlcnkgb2Ygc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcykge1xuICAgIE9iamVjdC5mcmVlemUocmVjb3ZlcnkpO1xuICB9XG4gIE9iamVjdC5mcmVlemUoc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcyk7XG4gIE9iamVjdC5mcmVlemUoc3RhdGUucmVmcmVzaEhlYWx0aCk7XG4gIHJldHVybiBPYmplY3QuZnJlZXplKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY2xvbmVSZWZyZXNoUmVjb3ZlcmllcyhcbiAgcmVjb3ZlcmllczogcmVhZG9ubHkgRGVlcFJlYWRvbmx5PFJlZnJlc2hSZWNvdmVyeT5bXSxcbik6IFJlZnJlc2hSZWNvdmVyeVtdIHtcbiAgcmV0dXJuIHJlY292ZXJpZXMubWFwKChyZWNvdmVyeSkgPT4gKHsgLi4ucmVjb3ZlcnkgfSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVmcmVzaFJlY292ZXJ5KFxuICBzdGF0ZTogUmVhZG9ubHlUcmFja2VyU3RhdGUsXG4gIHJlY292ZXJlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuKTogUmVmcmVzaFJlY292ZXJ5IHwgbnVsbCB7XG4gIGNvbnN0IHsgYWxlcnRTZW50QXQsIGNvbnNlY3V0aXZlRmFpbHVyZXMsIGZpcnN0RmFpbHVyZUF0IH0gPVxuICAgIHN0YXRlLnJlZnJlc2hIZWFsdGg7XG4gIGlmIChcbiAgICBhbGVydFNlbnRBdCA9PT0gbnVsbCB8fFxuICAgIGNvbnNlY3V0aXZlRmFpbHVyZXMgPT09IDAgfHxcbiAgICBmaXJzdEZhaWx1cmVBdCA9PT0gbnVsbFxuICApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmFpbGVkQXR0ZW1wdHM6IGNvbnNlY3V0aXZlRmFpbHVyZXMsXG4gICAgb3V0YWdlU3RhcnRlZEF0OiBmaXJzdEZhaWx1cmVBdCxcbiAgICByZWNvdmVyZWRBdCxcbiAgICBvdXRhZ2VEdXJhdGlvbk1zOiBNYXRoLm1heChcbiAgICAgIDAsXG4gICAgICBEYXRlLnBhcnNlKHJlY292ZXJlZEF0KSAtIERhdGUucGFyc2UoZmlyc3RGYWlsdXJlQXQpLFxuICAgICksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclJlZnJlc2hGYWlsdXJlcyhcbiAgc3RhdGU6IFJlYWRvbmx5VHJhY2tlclN0YXRlLFxuICBhbGVydFRocmVzaG9sZDogbnVtYmVyLFxuICByZWNvdmVyZWRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbik6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoc3RhdGUpO1xuICBjb25zdCBwZW5kaW5nUmVjb3ZlcmllcyA9IHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXM7XG4gIGNvbnN0IHJlY292ZXJ5ID0gZ2V0UmVmcmVzaFJlY292ZXJ5KHN0YXRlLCByZWNvdmVyZWRBdCk7XG4gIGlmIChyZWNvdmVyeSkgcGVuZGluZ1JlY292ZXJpZXMucHVzaChyZWNvdmVyeSk7XG4gIHJldHVybiB7XG4gICAgLi4ucmVwbGFjZW1lbnQsXG4gICAgcmVmcmVzaEhlYWx0aDoge1xuICAgICAgY29uc2VjdXRpdmVGYWlsdXJlczogMCxcbiAgICAgIGFsZXJ0VGhyZXNob2xkLFxuICAgICAgZmlyc3RGYWlsdXJlQXQ6IG51bGwsXG4gICAgICBsYXN0RmFpbHVyZUF0OiBudWxsLFxuICAgICAgYWxlcnRTZW50QXQ6IG51bGwsXG4gICAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IG51bGwsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllcyxcbiAgICAgIHJlY292ZXJ5Q2xhaW06IG51bGwsXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyUGVuZGluZ1JlY292ZXJ5KHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSk6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gY2xvbmVUcmFja2VyU3RhdGUoc3RhdGUpO1xuICByZXR1cm4ge1xuICAgIC4uLnJlcGxhY2VtZW50LFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIC4uLnJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogcmVwbGFjZW1lbnQucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3Zlcmllcy5zbGljZSgxKSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkUmVmcmVzaEZhaWx1cmUoXG4gIHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgYWxlcnRUaHJlc2hvbGQ6IG51bWJlcixcbiAgZmFpbGVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4pOiBUcmFja2VyU3RhdGUge1xuICBjb25zdCByZXBsYWNlbWVudCA9IGNsb25lVHJhY2tlclN0YXRlKHN0YXRlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXBsYWNlbWVudCxcbiAgICByZWZyZXNoSGVhbHRoOiB7XG4gICAgICBjb25zZWN1dGl2ZUZhaWx1cmVzOiBzdGF0ZS5yZWZyZXNoSGVhbHRoLmNvbnNlY3V0aXZlRmFpbHVyZXMgKyAxLFxuICAgICAgYWxlcnRUaHJlc2hvbGQsXG4gICAgICBmaXJzdEZhaWx1cmVBdDogc3RhdGUucmVmcmVzaEhlYWx0aC5maXJzdEZhaWx1cmVBdCA/PyBmYWlsZWRBdCxcbiAgICAgIGxhc3RGYWlsdXJlQXQ6IGZhaWxlZEF0LFxuICAgICAgYWxlcnRTZW50QXQ6IHN0YXRlLnJlZnJlc2hIZWFsdGguYWxlcnRTZW50QXQsXG4gICAgICBmYWlsdXJlQWxlcnRDbGFpbWVkQXQ6IHN0YXRlLnJlZnJlc2hIZWFsdGguZmFpbHVyZUFsZXJ0Q2xhaW1lZEF0LFxuICAgICAgcGVuZGluZ1JlY292ZXJpZXM6IHJlcGxhY2VtZW50LnJlZnJlc2hIZWFsdGgucGVuZGluZ1JlY292ZXJpZXMsXG4gICAgICByZWNvdmVyeUNsYWltOiByZXBsYWNlbWVudC5yZWZyZXNoSGVhbHRoLnJlY292ZXJ5Q2xhaW0sXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQ2x1YkxvY2tlck1hdGNoID0ge1xuICBleHRlcm5hbElkOiBzdHJpbmc7XG4gIHBsYXllcklkOiBzdHJpbmc7XG4gIHBsYXllck5hbWU/OiBzdHJpbmc7XG4gIG9wcG9uZW50OiBzdHJpbmc7XG4gIHN0YXJ0c0F0OiBzdHJpbmc7XG4gIGVuZHNBdDogc3RyaW5nO1xuICB2ZW51ZTogc3RyaW5nO1xuICBjb3VydDogc3RyaW5nO1xuICBzdGF0dXM/OiBcInVwY29taW5nXCIgfCBcImNvbXBsZXRlZFwiO1xuICByZXN1bHQ/OiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgQ2x1YkxvY2tlckZlZWQgPSB7XG4gIG1hdGNoZXM6IENsdWJMb2NrZXJNYXRjaFtdO1xuICBwbGF5ZXJzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT47XG59O1xuXG5leHBvcnQgdHlwZSBSZWFkb25seUNsdWJMb2NrZXJGZWVkID0gRGVlcFJlYWRvbmx5PENsdWJMb2NrZXJGZWVkPjtcblxuZnVuY3Rpb24gY2xvbmVUcmFja2VyTWF0Y2gobWF0Y2g6IFJlYWRvbmx5VHJhY2tlclN0YXRlW1wibWF0Y2hlc1wiXVtudW1iZXJdKTogVHJhY2tlck1hdGNoIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5tYXRjaCxcbiAgICByZXBvcnQ6XG4gICAgICBtYXRjaC5yZXBvcnQgPT09IG51bGxcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDoge1xuICAgICAgICAgICAgLi4ubWF0Y2gucmVwb3J0LFxuICAgICAgICAgICAgb2JzZXJ2YXRpb25zOiBbLi4ubWF0Y2gucmVwb3J0Lm9ic2VydmF0aW9uc10sXG4gICAgICAgICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVhZFJlcXVpcmVkU3RyaW5nKHZhbHVlOiB1bmtub3duLCBmaWVsZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIiB8fCB2YWx1ZS50cmltKCkgPT09IFwiXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCAke2ZpZWxkfWApO1xuICB9XG4gIHJldHVybiB2YWx1ZS50cmltKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNsdWJMb2NrZXJGZWVkKHZhbHVlOiB1bmtub3duKTogUmVhZG9ubHlDbHViTG9ja2VyRmVlZCB7XG4gIGlmIChcbiAgICAhdmFsdWUgfHxcbiAgICB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHxcbiAgICAhQXJyYXkuaXNBcnJheSgodmFsdWUgYXMgeyBtYXRjaGVzPzogdW5rbm93biB9KS5tYXRjaGVzKVxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgQ2x1YiBMb2NrZXIgcmVzcG9uc2UgZG9lcyBub3QgY29udGFpbiBhIG1hdGNoZXMgYXJyYXlcIik7XG4gIH1cblxuICBjb25zdCByYXcgPSB2YWx1ZSBhcyB7XG4gICAgbWF0Y2hlczogQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+O1xuICAgIHBsYXllcnM/OiB1bmtub3duO1xuICB9O1xuICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IG1hdGNoZXMgPSByYXcubWF0Y2hlcy5tYXAoKG1hdGNoLCBpbmRleCk6IENsdWJMb2NrZXJNYXRjaCA9PiB7XG4gICAgY29uc3QgZXh0ZXJuYWxJZCA9IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5leHRlcm5hbElkLCBcImV4dGVybmFsSWRcIiwgaW5kZXgpO1xuICAgIGlmIChzZWVuLmhhcyhleHRlcm5hbElkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDbHViIExvY2tlciByZXR1cm5lZCBkdXBsaWNhdGUgbWF0Y2ggSUQgXCIke2V4dGVybmFsSWR9XCJgKTtcbiAgICB9XG4gICAgc2Vlbi5hZGQoZXh0ZXJuYWxJZCk7XG5cbiAgICBjb25zdCBzdGFydHNBdCA9IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5zdGFydHNBdCwgXCJzdGFydHNBdFwiLCBpbmRleCk7XG4gICAgY29uc3QgZW5kc0F0ID0gcmVhZFJlcXVpcmVkU3RyaW5nKG1hdGNoLmVuZHNBdCwgXCJlbmRzQXRcIiwgaW5kZXgpO1xuICAgIGlmIChOdW1iZXIuaXNOYU4oRGF0ZS5wYXJzZShzdGFydHNBdCkpIHx8IE51bWJlci5pc05hTihEYXRlLnBhcnNlKGVuZHNBdCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBoYXMgYW4gaW52YWxpZCBzdGFydCBvciBlbmQgdGltZWApO1xuICAgIH1cbiAgICBpZiAoRGF0ZS5wYXJzZShlbmRzQXQpIDw9IERhdGUucGFyc2Uoc3RhcnRzQXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hdGNoICR7aW5kZXggKyAxfSBtdXN0IGVuZCBhZnRlciBpdCBzdGFydHNgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgbWF0Y2guc3RhdHVzICE9IG51bGwgJiZcbiAgICAgIG1hdGNoLnN0YXR1cyAhPT0gXCJ1cGNvbWluZ1wiICYmXG4gICAgICBtYXRjaC5zdGF0dXMgIT09IFwiY29tcGxldGVkXCJcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTWF0Y2ggJHtpbmRleCArIDF9IGhhcyBhbiBpbnZhbGlkIHN0YXR1c2ApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBleHRlcm5hbElkLFxuICAgICAgcGxheWVySWQ6IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5wbGF5ZXJJZCwgXCJwbGF5ZXJJZFwiLCBpbmRleCksXG4gICAgICBwbGF5ZXJOYW1lOlxuICAgICAgICB0eXBlb2YgbWF0Y2gucGxheWVyTmFtZSA9PT0gXCJzdHJpbmdcIiA/IG1hdGNoLnBsYXllck5hbWUudHJpbSgpIDogdW5kZWZpbmVkLFxuICAgICAgb3Bwb25lbnQ6IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5vcHBvbmVudCwgXCJvcHBvbmVudFwiLCBpbmRleCksXG4gICAgICBzdGFydHNBdCxcbiAgICAgIGVuZHNBdCxcbiAgICAgIHZlbnVlOiByZWFkUmVxdWlyZWRTdHJpbmcobWF0Y2gudmVudWUsIFwidmVudWVcIiwgaW5kZXgpLFxuICAgICAgY291cnQ6IHJlYWRSZXF1aXJlZFN0cmluZyhtYXRjaC5jb3VydCwgXCJjb3VydFwiLCBpbmRleCksXG4gICAgICBzdGF0dXM6XG4gICAgICAgIG1hdGNoLnN0YXR1cyA9PT0gXCJ1cGNvbWluZ1wiIHx8IG1hdGNoLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIlxuICAgICAgICAgID8gbWF0Y2guc3RhdHVzXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICByZXN1bHQ6XG4gICAgICAgIHR5cGVvZiBtYXRjaC5yZXN1bHQgPT09IFwic3RyaW5nXCIgfHwgbWF0Y2gucmVzdWx0ID09PSBudWxsXG4gICAgICAgICAgPyBtYXRjaC5yZXN1bHRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCBtYXRjaGVzQnlQbGF5ZXIgPSBuZXcgTWFwPHN0cmluZywgQ2x1YkxvY2tlck1hdGNoW10+KCk7XG4gIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgIGNvbnN0IHBsYXllck1hdGNoZXMgPSBtYXRjaGVzQnlQbGF5ZXIuZ2V0KG1hdGNoLnBsYXllcklkKSA/PyBbXTtcbiAgICBwbGF5ZXJNYXRjaGVzLnB1c2gobWF0Y2gpO1xuICAgIG1hdGNoZXNCeVBsYXllci5zZXQobWF0Y2gucGxheWVySWQsIHBsYXllck1hdGNoZXMpO1xuICB9XG4gIGZvciAoY29uc3QgW3BsYXllcklkLCBwbGF5ZXJNYXRjaGVzXSBvZiBtYXRjaGVzQnlQbGF5ZXIpIHtcbiAgICBwbGF5ZXJNYXRjaGVzLnNvcnQoXG4gICAgICAobGVmdCwgcmlnaHQpID0+IERhdGUucGFyc2UobGVmdC5zdGFydHNBdCkgLSBEYXRlLnBhcnNlKHJpZ2h0LnN0YXJ0c0F0KSxcbiAgICApO1xuICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBwbGF5ZXJNYXRjaGVzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgY29uc3QgcHJldmlvdXMgPSBwbGF5ZXJNYXRjaGVzW2luZGV4IC0gMV07XG4gICAgICBjb25zdCBjdXJyZW50ID0gcGxheWVyTWF0Y2hlc1tpbmRleF07XG4gICAgICBpZiAoRGF0ZS5wYXJzZShjdXJyZW50LnN0YXJ0c0F0KSA8IERhdGUucGFyc2UocHJldmlvdXMuZW5kc0F0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYENsdWIgTG9ja2VyIHJldHVybmVkIG92ZXJsYXBwaW5nIG1hdGNoZXMgZm9yIHBsYXllciBJRCBcIiR7cGxheWVySWR9XCJgLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYXllck5hbWVzQnlJZCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGNvbnN0IHBsYXllcnMgPSBBcnJheS5pc0FycmF5KHJhdy5wbGF5ZXJzKVxuICAgID8gcmF3LnBsYXllcnMubWFwKChwbGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICghcGxheWVyIHx8IHR5cGVvZiBwbGF5ZXIgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsYXllciAke2luZGV4ICsgMX0gaXMgaW52YWxpZGApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5ZXIgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICAgIGNvbnN0IGlkID0gcmVhZFJlcXVpcmVkU3RyaW5nKGl0ZW0uaWQsIFwicGxheWVyIGlkXCIsIGluZGV4KTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHJlYWRSZXF1aXJlZFN0cmluZyhpdGVtLm5hbWUsIFwicGxheWVyIG5hbWVcIiwgaW5kZXgpO1xuICAgICAgICBjb25zdCBleGlzdGluZ05hbWUgPSBwbGF5ZXJOYW1lc0J5SWQuZ2V0KGlkKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nTmFtZSAhPT0gdW5kZWZpbmVkICYmIGV4aXN0aW5nTmFtZSAhPT0gbmFtZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBDbHViIExvY2tlciByZXR1cm5lZCBjb25mbGljdGluZyBuYW1lcyBmb3IgcGxheWVyIElEIFwiJHtpZH1cImAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXJOYW1lc0J5SWQuc2V0KGlkLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIHsgaWQsIG5hbWUgfTtcbiAgICAgIH0pXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzKSBPYmplY3QuZnJlZXplKG1hdGNoKTtcbiAgT2JqZWN0LmZyZWV6ZShtYXRjaGVzKTtcbiAgaWYgKHBsYXllcnMpIHtcbiAgICBmb3IgKGNvbnN0IHBsYXllciBvZiBwbGF5ZXJzKSBPYmplY3QuZnJlZXplKHBsYXllcik7XG4gICAgT2JqZWN0LmZyZWV6ZShwbGF5ZXJzKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuZnJlZXplKHsgbWF0Y2hlcywgcGxheWVycyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQ2x1YkxvY2tlckZlZWQoXG4gIHN0YXRlOiBSZWFkb25seVRyYWNrZXJTdGF0ZSxcbiAgZmVlZDogUmVhZG9ubHlDbHViTG9ja2VyRmVlZCxcbik6IFRyYWNrZXJTdGF0ZSB7XG4gIGNvbnN0IGN1cnJlbnRCeUV4dGVybmFsSWQgPSBuZXcgTWFwKFxuICAgIHN0YXRlLm1hdGNoZXNcbiAgICAgIC5maWx0ZXIoXG4gICAgICAgIChtYXRjaCk6IG1hdGNoIGlzIHR5cGVvZiBtYXRjaCAmIHsgZXh0ZXJuYWxJZDogc3RyaW5nIH0gPT5cbiAgICAgICAgICBtYXRjaC5leHRlcm5hbElkICE9PSBudWxsLFxuICAgICAgKVxuICAgICAgLm1hcCgobWF0Y2gpID0+IFttYXRjaC5leHRlcm5hbElkLCBtYXRjaF0pLFxuICApO1xuICBjb25zdCBpbmNvbWluZ0J5RXh0ZXJuYWxJZCA9IG5ldyBNYXAoXG4gICAgZmVlZC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IFttYXRjaC5leHRlcm5hbElkLCBtYXRjaF0pLFxuICApO1xuICBjb25zdCBpbXBvcnRlZElkcyA9IG5ldyBTZXQoZmVlZC5tYXRjaGVzLm1hcCgobWF0Y2gpID0+IG1hdGNoLmV4dGVybmFsSWQpKTtcbiAgY29uc3QgbG9jYWxseVJldGFpbmVkID0gc3RhdGUubWF0Y2hlcy5maWx0ZXIoXG4gICAgKG1hdGNoKSA9PlxuICAgICAgKG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGwgfHwgIWltcG9ydGVkSWRzLmhhcyhtYXRjaC5leHRlcm5hbElkKSkgJiZcbiAgICAgIChtYXRjaC5leHRlcm5hbElkID09PSBudWxsIHx8XG4gICAgICAgIG1hdGNoLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIiB8fFxuICAgICAgICBtYXRjaC5yZXBvcnQgIT09IG51bGwpLFxuICApO1xuICBmb3IgKGNvbnN0IGluY29taW5nIG9mIGZlZWQubWF0Y2hlcykge1xuICAgIGNvbnN0IG92ZXJsYXBzUmV0YWluZWRNYXRjaCA9IGxvY2FsbHlSZXRhaW5lZC5zb21lKFxuICAgICAgKHJldGFpbmVkTWF0Y2gpID0+XG4gICAgICAgIHJldGFpbmVkTWF0Y2gucGxheWVySWQgPT09IGluY29taW5nLnBsYXllcklkICYmXG4gICAgICAgIERhdGUucGFyc2UoaW5jb21pbmcuc3RhcnRzQXQpIDwgRGF0ZS5wYXJzZShyZXRhaW5lZE1hdGNoLmVuZHNBdCkgJiZcbiAgICAgICAgRGF0ZS5wYXJzZShyZXRhaW5lZE1hdGNoLnN0YXJ0c0F0KSA8IERhdGUucGFyc2UoaW5jb21pbmcuZW5kc0F0KSxcbiAgICApO1xuICAgIGlmIChvdmVybGFwc1JldGFpbmVkTWF0Y2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENsdWIgTG9ja2VyIHJldHVybmVkIGEgbWF0Y2ggb3ZlcmxhcHBpbmcgYSByZXRhaW5lZCBtYXRjaCBmb3IgcGxheWVyIElEIFwiJHtpbmNvbWluZy5wbGF5ZXJJZH1cImAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJldGFpbmVkID0gc3RhdGUubWF0Y2hlc1xuICAgIC5maWx0ZXIoXG4gICAgICAobWF0Y2gpID0+XG4gICAgICAgIG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGwgfHxcbiAgICAgICAgaW1wb3J0ZWRJZHMuaGFzKG1hdGNoLmV4dGVybmFsSWQpIHx8XG4gICAgICAgIG1hdGNoLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIiB8fFxuICAgICAgICBtYXRjaC5yZXBvcnQgIT09IG51bGwsXG4gICAgKVxuICAgIC5tYXAoKG1hdGNoKSA9PiB7XG4gICAgICBjb25zdCBpbmNvbWluZyA9XG4gICAgICAgIG1hdGNoLmV4dGVybmFsSWQgPT09IG51bGxcbiAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgIDogaW5jb21pbmdCeUV4dGVybmFsSWQuZ2V0KG1hdGNoLmV4dGVybmFsSWQpO1xuICAgICAgcmV0dXJuIGluY29taW5nXG4gICAgICAgID8ge1xuICAgICAgICAgICAgLi4uY2xvbmVUcmFja2VyTWF0Y2gobWF0Y2gpLFxuICAgICAgICAgICAgcGxheWVySWQ6IGluY29taW5nLnBsYXllcklkLFxuICAgICAgICAgICAgb3Bwb25lbnQ6IGluY29taW5nLm9wcG9uZW50LFxuICAgICAgICAgICAgc3RhcnRzQXQ6IGluY29taW5nLnN0YXJ0c0F0LFxuICAgICAgICAgICAgZW5kc0F0OiBpbmNvbWluZy5lbmRzQXQsXG4gICAgICAgICAgICB2ZW51ZTogaW5jb21pbmcudmVudWUsXG4gICAgICAgICAgICBjb3VydDogaW5jb21pbmcuY291cnQsXG4gICAgICAgICAgfVxuICAgICAgICA6IGNsb25lVHJhY2tlck1hdGNoKG1hdGNoKTtcbiAgICB9KTtcblxuICBmb3IgKGNvbnN0IGluY29taW5nIG9mIGZlZWQubWF0Y2hlcykge1xuICAgIGNvbnN0IGV4aXN0aW5nID0gY3VycmVudEJ5RXh0ZXJuYWxJZC5nZXQoaW5jb21pbmcuZXh0ZXJuYWxJZCk7XG4gICAgaWYgKGV4aXN0aW5nKSBjb250aW51ZTtcblxuICAgIHJldGFpbmVkLnB1c2goe1xuICAgICAgaWQ6IGBjbHViLWxvY2tlcjoke0J1ZmZlci5mcm9tKGluY29taW5nLmV4dGVybmFsSWQpLnRvU3RyaW5nKFwiYmFzZTY0dXJsXCIpfWAsXG4gICAgICBleHRlcm5hbElkOiBpbmNvbWluZy5leHRlcm5hbElkLFxuICAgICAgcGxheWVySWQ6IGluY29taW5nLnBsYXllcklkLFxuICAgICAgb3Bwb25lbnQ6IGluY29taW5nLm9wcG9uZW50LFxuICAgICAgc3RhcnRzQXQ6IGluY29taW5nLnN0YXJ0c0F0LFxuICAgICAgZW5kc0F0OiBpbmNvbWluZy5lbmRzQXQsXG4gICAgICB2ZW51ZTogaW5jb21pbmcudmVudWUsXG4gICAgICBjb3VydDogaW5jb21pbmcuY291cnQsXG4gICAgICBjb2FjaElkOiBcInVuYXNzaWduZWRcIixcbiAgICAgIHN0YXR1czogaW5jb21pbmcuc3RhdHVzID8/IFwidXBjb21pbmdcIixcbiAgICAgIHJlc3VsdDogaW5jb21pbmcucmVzdWx0ID8/IG51bGwsXG4gICAgICByZXBvcnQ6IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBwbGF5ZXJzQnlJZCA9IG5ldyBNYXAoXG4gICAgc3RhdGUucGxheWVycy5tYXAoKHBsYXllcikgPT4gW3BsYXllci5pZCwgeyAuLi5wbGF5ZXIgfV0pLFxuICApO1xuICBmb3IgKGNvbnN0IHBsYXllciBvZiBmZWVkLnBsYXllcnMgPz8gW10pIHtcbiAgICBwbGF5ZXJzQnlJZC5zZXQocGxheWVyLmlkLCB7IC4uLnBsYXllciB9KTtcbiAgfVxuICBmb3IgKGNvbnN0IG1hdGNoIG9mIGZlZWQubWF0Y2hlcykge1xuICAgIGlmICghcGxheWVyc0J5SWQuaGFzKG1hdGNoLnBsYXllcklkKSkge1xuICAgICAgcGxheWVyc0J5SWQuc2V0KG1hdGNoLnBsYXllcklkLCB7XG4gICAgICAgIGlkOiBtYXRjaC5wbGF5ZXJJZCxcbiAgICAgICAgbmFtZTogbWF0Y2gucGxheWVyTmFtZSB8fCBtYXRjaC5wbGF5ZXJJZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYnJhbmRpbmc6IHN0YXRlLmJyYW5kaW5nID8geyAuLi5zdGF0ZS5icmFuZGluZyB9IDogdW5kZWZpbmVkLFxuICAgIGNvYWNoZXM6IHN0YXRlLmNvYWNoZXMubWFwKChjb2FjaCkgPT4gKHsgLi4uY29hY2ggfSkpLFxuICAgIHJlZnJlc2hIZWFsdGg6IHtcbiAgICAgIC4uLnN0YXRlLnJlZnJlc2hIZWFsdGgsXG4gICAgICBwZW5kaW5nUmVjb3ZlcmllczogY2xvbmVSZWZyZXNoUmVjb3ZlcmllcyhcbiAgICAgICAgc3RhdGUucmVmcmVzaEhlYWx0aC5wZW5kaW5nUmVjb3ZlcmllcyxcbiAgICAgICksXG4gICAgfSxcbiAgICBwbGF5ZXJzOiBbLi4ucGxheWVyc0J5SWQudmFsdWVzKCldLFxuICAgIG1hdGNoZXM6IHJldGFpbmVkLFxuICAgIGxhc3RVcGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICBzb3VyY2U6IFwiY2x1Yi1sb2NrZXJcIixcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hUcmFja2VyU3RhdGUoXG4gIGxvYWRTdGF0ZTogKCkgPT4gUHJvbWlzZTxSZWFkb25seVRyYWNrZXJTdGF0ZT4sXG4gIGxvYWRGZWVkOiAoKSA9PiBQcm9taXNlPFJlYWRvbmx5Q2x1YkxvY2tlckZlZWQ+LFxuICBwZXJzaXN0U3RhdGU6IChzdGF0ZTogVHJhY2tlclN0YXRlKSA9PiBQcm9taXNlPHZvaWQ+LFxuICBhbGVydFRocmVzaG9sZCA9IDMsXG4pOiBQcm9taXNlPFRyYWNrZXJTdGF0ZT4ge1xuICBjb25zdCBmZWVkID0gcGFyc2VDbHViTG9ja2VyRmVlZChhd2FpdCBsb2FkRmVlZCgpKTtcbiAgY29uc3Qgc3RhdGUgPSBjbGVhclJlZnJlc2hGYWlsdXJlcyhcbiAgICBtZXJnZUNsdWJMb2NrZXJGZWVkKGF3YWl0IGxvYWRTdGF0ZSgpLCBmZWVkKSxcbiAgICBhbGVydFRocmVzaG9sZCxcbiAgKTtcbiAgYXdhaXQgcGVyc2lzdFN0YXRlKHN0YXRlKTtcbiAgcmV0dXJuIHN0YXRlO1xufSIsICJpbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gXCJub2RlOnN0cmVhbVwiO1xuaW1wb3J0IHsgU3RvcmFnZSwgdHlwZSBGaWxlIH0gZnJvbSBcIkBnb29nbGUtY2xvdWQvc3RvcmFnZVwiO1xuXG5jb25zdCBjbGllbnQgPSBuZXcgU3RvcmFnZSh7XG4gIGNyZWRlbnRpYWxzOiB7XG4gICAgYXVkaWVuY2U6IFwicmVwbGl0XCIsXG4gICAgc3ViamVjdF90b2tlbl90eXBlOiBcImFjY2Vzc190b2tlblwiLFxuICAgIHRva2VuX3VybDogXCJodHRwOi8vMTI3LjAuMC4xOjExMDYvdG9rZW5cIixcbiAgICB0eXBlOiBcImV4dGVybmFsX2FjY291bnRcIixcbiAgICBjcmVkZW50aWFsX3NvdXJjZToge1xuICAgICAgdXJsOiBcImh0dHA6Ly8xMjcuMC4wLjE6MTEwNi9jcmVkZW50aWFsXCIsXG4gICAgICBmb3JtYXQ6IHsgdHlwZTogXCJqc29uXCIsIHN1YmplY3RfdG9rZW5fZmllbGRfbmFtZTogXCJhY2Nlc3NfdG9rZW5cIiB9LFxuICAgIH0sXG4gICAgdW5pdmVyc2VfZG9tYWluOiBcImdvb2dsZWFwaXMuY29tXCIsXG4gIH0sXG4gIHByb2plY3RJZDogXCJcIixcbn0pO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0Tm90Rm91bmRFcnJvciBleHRlbmRzIEVycm9yIHt9XG5cbmZ1bmN0aW9uIHBhcnNlU3RvcmFnZVBhdGgodmFsdWU6IHN0cmluZyk6IHsgYnVja2V0OiBzdHJpbmc7IG9iamVjdDogc3RyaW5nIH0ge1xuICBjb25zdCBwYXJ0cyA9IHZhbHVlLnJlcGxhY2UoL15cXC8rLywgXCJcIikuc3BsaXQoXCIvXCIpO1xuICBpZiAocGFydHMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBBcHAgU3RvcmFnZSBwYXRoXCIpO1xuICByZXR1cm4geyBidWNrZXQ6IHBhcnRzWzBdLCBvYmplY3Q6IHBhcnRzLnNsaWNlKDEpLmpvaW4oXCIvXCIpIH07XG59XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RTdG9yYWdlU2VydmljZSB7XG4gIHByaXZhdGUgZ2V0UHJpdmF0ZURpcigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHZhbHVlID0gcHJvY2Vzcy5lbnZbXCJQUklWQVRFX09CSkVDVF9ESVJcIl07XG4gICAgaWYgKCF2YWx1ZSkgdGhyb3cgbmV3IEVycm9yKFwiUFJJVkFURV9PQkpFQ1RfRElSIGlzIG5vdCBjb25maWd1cmVkXCIpO1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gIH1cblxuICBhc3luYyBnZXRPYmplY3Qob2JqZWN0UGF0aDogc3RyaW5nKTogUHJvbWlzZTxGaWxlPiB7XG4gICAgaWYgKCEvXlxcL29iamVjdHNcXC91cGxvYWRzXFwvWzAtOWEtZi1dKyQvLnRlc3Qob2JqZWN0UGF0aCkpIHRocm93IG5ldyBPYmplY3ROb3RGb3VuZEVycm9yKCk7XG4gICAgY29uc3QgeyBidWNrZXQsIG9iamVjdDogcHJpdmF0ZU9iamVjdCB9ID0gcGFyc2VTdG9yYWdlUGF0aCh0aGlzLmdldFByaXZhdGVEaXIoKSk7XG4gICAgY29uc3QgZmlsZSA9IGNsaWVudC5idWNrZXQoYnVja2V0KS5maWxlKGAke3ByaXZhdGVPYmplY3R9LyR7b2JqZWN0UGF0aC5zbGljZShcIi9vYmplY3RzL1wiLmxlbmd0aCl9YCk7XG4gICAgY29uc3QgW2V4aXN0c10gPSBhd2FpdCBmaWxlLmV4aXN0cygpO1xuICAgIGlmICghZXhpc3RzKSB0aHJvdyBuZXcgT2JqZWN0Tm90Rm91bmRFcnJvcigpO1xuICAgIHJldHVybiBmaWxlO1xuICB9XG5cbiAgYXN5bmMgc2F2ZU9iamVjdChvYmplY3RQYXRoOiBzdHJpbmcsIGJ5dGVzOiBCdWZmZXIsIGNvbnRlbnRUeXBlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIS9eXFwvb2JqZWN0c1xcL3VwbG9hZHNcXC9bMC05YS1mLV0rJC8udGVzdChvYmplY3RQYXRoKSkgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBvYmplY3QgcGF0aFwiKTtcbiAgICBjb25zdCB7IGJ1Y2tldCwgb2JqZWN0OiBwcml2YXRlT2JqZWN0IH0gPSBwYXJzZVN0b3JhZ2VQYXRoKHRoaXMuZ2V0UHJpdmF0ZURpcigpKTtcbiAgICBjb25zdCBmaWxlID0gY2xpZW50LmJ1Y2tldChidWNrZXQpLmZpbGUoYCR7cHJpdmF0ZU9iamVjdH0vJHtvYmplY3RQYXRoLnNsaWNlKFwiL29iamVjdHMvXCIubGVuZ3RoKX1gKTtcbiAgICBhd2FpdCBmaWxlLnNhdmUoYnl0ZXMsIHsgY29udGVudFR5cGUsIHJlc3VtYWJsZTogZmFsc2UgfSk7XG4gIH1cblxuICBhc3luYyBkZWxldGVPYmplY3Qob2JqZWN0UGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCEvXlxcL29iamVjdHNcXC91cGxvYWRzXFwvWzAtOWEtZi1dKyQvLnRlc3Qob2JqZWN0UGF0aCkpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgb2JqZWN0IHBhdGhcIik7XG4gICAgY29uc3QgeyBidWNrZXQsIG9iamVjdDogcHJpdmF0ZU9iamVjdCB9ID0gcGFyc2VTdG9yYWdlUGF0aCh0aGlzLmdldFByaXZhdGVEaXIoKSk7XG4gICAgY29uc3QgZmlsZSA9IGNsaWVudC5idWNrZXQoYnVja2V0KS5maWxlKGAke3ByaXZhdGVPYmplY3R9LyR7b2JqZWN0UGF0aC5zbGljZShcIi9vYmplY3RzL1wiLmxlbmd0aCl9YCk7XG4gICAgYXdhaXQgZmlsZS5kZWxldGUoeyBpZ25vcmVOb3RGb3VuZDogdHJ1ZSB9KTtcbiAgfVxuXG4gIGFzeW5jIHN0cmVhbShmaWxlOiBGaWxlLCByZXM6IGltcG9ydChcImV4cHJlc3NcIikuUmVzcG9uc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBbbWV0YWRhdGFdID0gYXdhaXQgZmlsZS5nZXRNZXRhZGF0YSgpO1xuICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgbWV0YWRhdGEuY29udGVudFR5cGUgfHwgXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIik7XG4gICAgcmVzLnNldEhlYWRlcihcIkNhY2hlLUNvbnRyb2xcIiwgXCJwcml2YXRlLCBtYXgtYWdlPTM2MDBcIik7XG4gICAgaWYgKG1ldGFkYXRhLnNpemUpIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LUxlbmd0aFwiLCBTdHJpbmcobWV0YWRhdGEuc2l6ZSkpO1xuICAgIFJlYWRhYmxlLmZyb20oZmlsZS5jcmVhdGVSZWFkU3RyZWFtKCkpLnBpcGUocmVzKTtcbiAgfVxufSIsICJpbXBvcnQgeyBjbGVya0NsaWVudCwgZ2V0QXV0aCB9IGZyb20gXCJAY2xlcmsvZXhwcmVzc1wiO1xuaW1wb3J0IHR5cGUgeyBSZXF1ZXN0LCBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJleHByZXNzXCI7XG5cbnR5cGUgU3RhZmZBdXRob3JpemF0aW9uRGVwZW5kZW5jaWVzID0ge1xuICBnZXRVc2VySWQ6IChyZXE6IFJlcXVlc3QpID0+IHN0cmluZyB8IG51bGw7XG4gIGlzQXBwcm92ZWRTdGFmZjogKHVzZXJJZDogc3RyaW5nKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xufTtcblxuZnVuY3Rpb24gY29uZmlndXJlZFN0YWZmSWRzKCk6IFNldDxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBTZXQoXG4gICAgKHByb2Nlc3MuZW52W1wiU1RBRkZfQ0xFUktfVVNFUl9JRFNcIl0gPz8gXCJcIilcbiAgICAgIC5zcGxpdChcIixcIilcbiAgICAgIC5tYXAoKGlkKSA9PiBpZC50cmltKCkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pLFxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpc0FwcHJvdmVkQ2xlcmtTdGFmZih1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBpZiAoY29uZmlndXJlZFN0YWZmSWRzKCkuaGFzKHVzZXJJZCkpIHJldHVybiB0cnVlO1xuXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBjbGVya0NsaWVudC51c2Vycy5nZXRVc2VyKHVzZXJJZCk7XG4gIHJldHVybiB1c2VyLnB1YmxpY01ldGFkYXRhW1wicm9sZVwiXSA9PT0gXCJzdGFmZlwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVxdWlyZVN0YWZmKFxuICBkZXBlbmRlbmNpZXM6IFN0YWZmQXV0aG9yaXphdGlvbkRlcGVuZGVuY2llcyA9IHtcbiAgICBnZXRVc2VySWQ6IChyZXEpID0+IHtcbiAgICAgIGNvbnN0IGF1dGggPSBnZXRBdXRoKHJlcSk7XG4gICAgICBjb25zdCBjbGFpbVVzZXJJZCA9IGF1dGguc2Vzc2lvbkNsYWltcz8udXNlcklkO1xuICAgICAgcmV0dXJuIHR5cGVvZiBjbGFpbVVzZXJJZCA9PT0gXCJzdHJpbmdcIiA/IGNsYWltVXNlcklkIDogYXV0aC51c2VySWQ7XG4gICAgfSxcbiAgICBpc0FwcHJvdmVkU3RhZmY6IGlzQXBwcm92ZWRDbGVya1N0YWZmLFxuICB9LFxuKTogUmVxdWVzdEhhbmRsZXIge1xuICByZXR1cm4gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gZGVwZW5kZW5jaWVzLmdldFVzZXJJZChyZXEpO1xuICAgIGlmICghdXNlcklkKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiBcIlN0YWZmIHNpZ24taW4gcmVxdWlyZWRcIiB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKCEoYXdhaXQgZGVwZW5kZW5jaWVzLmlzQXBwcm92ZWRTdGFmZih1c2VySWQpKSkge1xuICAgICAgICByZXMuc3RhdHVzKDQwMykuanNvbih7IGVycm9yOiBcIlRoaXMgYWNjb3VudCBpcyBub3QgYXBwcm92ZWQgZm9yIHN0YWZmIGFjY2Vzc1wiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlcS5sb2c/LmVycm9yKHsgZXJyOiBlcnJvciwgdXNlcklkIH0sIFwiQ291bGQgbm90IHZlcmlmeSBzdGFmZiBhY2Nlc3NcIik7XG4gICAgICByZXMuc3RhdHVzKDUwMykuanNvbih7IGVycm9yOiBcIlN0YWZmIGFjY2VzcyBjb3VsZCBub3QgYmUgdmVyaWZpZWRcIiB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuZXh0KCk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCByZXF1aXJlU3RhZmYgPSBjcmVhdGVSZXF1aXJlU3RhZmYoKTsiLCAiLyoqXG4gKiBDbGVyayBGcm9udGVuZCBBUEkgUHJveHkgTWlkZGxld2FyZVxuICpcbiAqIFByb3hpZXMgQ2xlcmsgRnJvbnRlbmQgQVBJIHJlcXVlc3RzIHRocm91Z2ggeW91ciBkb21haW4sIGVuYWJsaW5nIENsZXJrXG4gKiBhdXRoZW50aWNhdGlvbiBvbiBjdXN0b20gZG9tYWlucyBhbmQgLnJlcGxpdC5hcHAgZGVwbG95bWVudHMgd2l0aG91dFxuICogcmVxdWlyaW5nIENOQU1FIEROUyBjb25maWd1cmF0aW9uLlxuICpcbiAqIEFVVEggQ09ORklHVVJBVElPTjogVG8gbWFuYWdlIHVzZXJzLCBlbmFibGUvZGlzYWJsZSBsb2dpbiBwcm92aWRlcnNcbiAqIChHb29nbGUsIEdpdEh1YiwgZXRjLiksIGNoYW5nZSBhcHAgYnJhbmRpbmcsIG9yIGNvbmZpZ3VyZSBPQXV0aCBjcmVkZW50aWFscyxcbiAqIHVzZSB0aGUgQXV0aCBwYW5lIGluIHRoZSB3b3Jrc3BhY2UgdG9vbGJhci4gVGhlcmUgaXMgbm8gZXh0ZXJuYWwgQ2xlcmtcbiAqIGRhc2hib2FyZCBcdTIwMTQgYWxsIGF1dGggY29uZmlndXJhdGlvbiBpcyBkb25lIHRocm91Z2ggdGhlIEF1dGggcGFuZS5cbiAqXG4gKiBJTVBPUlRBTlQ6XG4gKiAtIE9ubHkgYWN0aXZlIGluIHByb2R1Y3Rpb24gKENsZXJrIHByb3h5aW5nIGRvZXNuJ3Qgd29yayBmb3IgZGV2IGluc3RhbmNlcylcbiAqIC0gTXVzdCBiZSBtb3VudGVkIEJFRk9SRSBleHByZXNzLmpzb24oKSBtaWRkbGV3YXJlXG4gKlxuICogVXNhZ2UgaW4gYXBwLnRzOlxuICogICBpbXBvcnQgeyBDTEVSS19QUk9YWV9QQVRILCBjbGVya1Byb3h5TWlkZGxld2FyZSB9IGZyb20gXCIuL21pZGRsZXdhcmVzL2NsZXJrUHJveHlNaWRkbGV3YXJlXCI7XG4gKiAgIGFwcC51c2UoQ0xFUktfUFJPWFlfUEFUSCwgY2xlcmtQcm94eU1pZGRsZXdhcmUoKSk7XG4gKi9cblxuaW1wb3J0IHR5cGUgeyBJbmNvbWluZ0h0dHBIZWFkZXJzIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgdHlwZSB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBjcmVhdGVQcm94eU1pZGRsZXdhcmUgfSBmcm9tICdodHRwLXByb3h5LW1pZGRsZXdhcmUnO1xuXG5jb25zdCBDTEVSS19GQVBJID0gJ2h0dHBzOi8vZnJvbnRlbmQtYXBpLmNsZXJrLmRldic7XG5leHBvcnQgY29uc3QgQ0xFUktfUFJPWFlfUEFUSCA9ICcvYXBpL19fY2xlcmsnO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIb3N0KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXmh0dHBzPzpcXC9cXC8vLCAnJykucmVwbGFjZSgvXFwvLiokLywgJycpO1xufVxuXG5mdW5jdGlvbiBhbGxvd2VkQ2xlcmtIb3N0cygpOiBTZXQ8c3RyaW5nPiB7XG4gIGNvbnN0IGNvbmZpZ3VyZWQgPSBbXG4gICAgLi4uKHByb2Nlc3MuZW52LlJFUExJVF9ET01BSU5TID8/ICcnKS5zcGxpdCgnLCcpLFxuICAgIHByb2Nlc3MuZW52LlJFUExJVF9ERVZfRE9NQUlOID8/ICcnLFxuICBdO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNvbmZpZ3VyZWQucHVzaCgnbG9jYWxob3N0JywgJzEyNy4wLjAuMScpO1xuICB9XG4gIHJldHVybiBuZXcgU2V0KGNvbmZpZ3VyZWQubWFwKG5vcm1hbGl6ZUhvc3QpLmZpbHRlcihCb29sZWFuKSk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWZmZWN0aXZlIHB1YmxpYyBob3N0bmFtZSBmb3IgdGhlIGdpdmVuIHJlcXVlc3QsXG4gKiBwcmVmZXJyaW5nIHgtZm9yd2FyZGVkLWhvc3Qgb3ZlciB0aGUgSG9zdCBoZWFkZXIgc28gY2FsbGVycyBiZWhpbmQgYVxuICogcHJveHkgc2VlIHRoZSBvcmlnaW5hbCBjbGllbnQtZmFjaW5nIGhvc3QuXG4gKlxuICogeC1mb3J3YXJkZWQtaG9zdCBjYW4gdGFrZSB0aHJlZSBzaGFwZXM6XG4gKiAgIC0gdW5kZWZpbmVkIChubyBwcm94eSBpbnZvbHZlZClcbiAqICAgLSBhIHNpbmdsZSBzdHJpbmcgKG9uZSBwcm94eSBob3ApXG4gKiAgIC0gYSBjb21tYS1kZWxpbWl0ZWQgc3RyaW5nIHdoZW4gYW4gdXBzdHJlYW0gYXBwZW5kZWQgcmF0aGVyIHRoYW5cbiAqICAgICByZXBsYWNlZCB0aGUgaGVhZGVyIChOb2RlIGZvbGRzIGR1cGxpY2F0ZSBoZWFkZXJzIHRoaXMgd2F5KSwgb3IgYVxuICogICAgIHN0cmluZ1tdIGluIHNvbWUgRXhwcmVzcyB0eXBpbmdzXG4gKiBJbiB0aGUgbXVsdGktdmFsdWUgY2FzZSwgdGhlIGxlZnRtb3N0IHZhbHVlIGlzIHRoZSBvcmlnaW5hbCBjbGllbnQtXG4gKiBmYWNpbmcgaG9zdC4gVGFrZSB0aGF0IG9uZSBpbiBhbGwgZm9ybXMuIEV4cG9ydGVkIHNvIHRoYXQgYXBwLnRzXG4gKiAoY2xlcmtNaWRkbGV3YXJlIGNhbGxiYWNrKSBhbmQgdGhpcyBwcm94eSBtaWRkbGV3YXJlIGFncmVlIG9uIHdoaWNoXG4gKiBob3N0bmFtZSBpcyBjYW5vbmljYWwgXHUyMDE0IG90aGVyd2lzZSBtdWx0aS1kb21haW4vY3VzdG9tLWRvbWFpbiBmbG93c1xuICogYnJlYWsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGVya1Byb3h5SG9zdChyZXE6IHtcbiAgaGVhZGVyczogSW5jb21pbmdIdHRwSGVhZGVycztcbn0pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCBmb3J3YXJkZWQgPSByZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtaG9zdCddO1xuICBjb25zdCByYXcgPSBBcnJheS5pc0FycmF5KGZvcndhcmRlZCkgPyBmb3J3YXJkZWRbMF0gOiBmb3J3YXJkZWQ7XG4gIGNvbnN0IGNhbmRpZGF0ZXMgPSBbXG4gICAgcmF3Py5zcGxpdCgnLCcpWzBdLFxuICAgIHJlcS5oZWFkZXJzLmhvc3QsXG4gIF07XG4gIGNvbnN0IGFsbG93ZWQgPSBhbGxvd2VkQ2xlcmtIb3N0cygpO1xuICByZXR1cm4gY2FuZGlkYXRlc1xuICAgIC5tYXAoKGhvc3QpID0+IGhvc3QgPyBub3JtYWxpemVIb3N0KGhvc3QpIDogJycpXG4gICAgLmZpbmQoKGhvc3QpID0+IGFsbG93ZWQuaGFzKGhvc3QpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZXJrUHJveHlNaWRkbGV3YXJlKCk6IFJlcXVlc3RIYW5kbGVyIHtcbiAgLy8gT25seSBydW4gcHJveHkgaW4gcHJvZHVjdGlvbiBcdTIwMTQgQ2xlcmsgcHJveHlpbmcgZG9lc24ndCB3b3JrIGZvciBkZXYgaW5zdGFuY2VzXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcmV0dXJuIChfcmVxLCBfcmVzLCBuZXh0KSA9PiBuZXh0KCk7XG4gIH1cblxuICBjb25zdCBzZWNyZXRLZXkgPSBwcm9jZXNzLmVudi5DTEVSS19TRUNSRVRfS0VZO1xuICBpZiAoIXNlY3JldEtleSkge1xuICAgIHJldHVybiAoX3JlcSwgX3JlcywgbmV4dCkgPT4gbmV4dCgpO1xuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZVByb3h5TWlkZGxld2FyZSh7XG4gICAgdGFyZ2V0OiBDTEVSS19GQVBJLFxuICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAvLyBUYWtlIG92ZXIgdGhlIHJlc3BvbnNlIHNvIGl0IGNhbiBiZSByZS1zZW50IHdpdGggYSBDb250ZW50LUxlbmd0aCAoc2VlXG4gICAgLy8gcHJveHlSZXMpOyB0aGUgZGVwbG95bWVudCBlZGdlIHJlamVjdHMgY2h1bmtlZCBwcm94aWVkIHJlc3BvbnNlcy5cbiAgICBzZWxmSGFuZGxlUmVzcG9uc2U6IHRydWUsXG4gICAgcGF0aFJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+XG4gICAgICBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7Q0xFUktfUFJPWFlfUEFUSH1gKSwgJycpLFxuICAgIG9uOiB7XG4gICAgICBwcm94eVJlcTogKHByb3h5UmVxLCByZXEpID0+IHtcbiAgICAgICAgY29uc3QgcHJvdG9jb2wgPSByZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtcHJvdG8nXSB8fCAnaHR0cHMnO1xuICAgICAgICBjb25zdCBob3N0ID0gZ2V0Q2xlcmtQcm94eUhvc3QocmVxKSB8fCAnJztcbiAgICAgICAgY29uc3QgcHJveHlVcmwgPSBgJHtwcm90b2NvbH06Ly8ke2hvc3R9JHtDTEVSS19QUk9YWV9QQVRIfWA7XG5cbiAgICAgICAgcHJveHlSZXEuc2V0SGVhZGVyKCdDbGVyay1Qcm94eS1VcmwnLCBwcm94eVVybCk7XG4gICAgICAgIHByb3h5UmVxLnNldEhlYWRlcignQ2xlcmstU2VjcmV0LUtleScsIHNlY3JldEtleSk7XG5cbiAgICAgICAgY29uc3QgeGZmID0gcmVxLmhlYWRlcnNbJ3gtZm9yd2FyZGVkLWZvciddO1xuICAgICAgICBjb25zdCBjbGllbnRJcCA9XG4gICAgICAgICAgKEFycmF5LmlzQXJyYXkoeGZmKSA/IHhmZlswXSA6IHhmZik/LnNwbGl0KCcsJylbMF0/LnRyaW0oKSB8fFxuICAgICAgICAgIHJlcS5zb2NrZXQ/LnJlbW90ZUFkZHJlc3MgfHxcbiAgICAgICAgICAnJztcbiAgICAgICAgaWYgKGNsaWVudElwKSB7XG4gICAgICAgICAgcHJveHlSZXEuc2V0SGVhZGVyKCdYLUZvcndhcmRlZC1Gb3InLCBjbGllbnRJcCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBDbGVyaydzIGR5bmFtaWMgRnJvbnRlbmQgQVBJIHJlc3BvbnNlcyAoL3YxL2Vudmlyb25tZW50LCAvdjEvY2xpZW50LFxuICAgICAgLy8gSldLUywgLi4uKSBhcnJpdmUgd2l0aG91dCBhIENvbnRlbnQtTGVuZ3RoLCBzbyByZWxheWluZyB0aGVtIHdvdWxkIHVzZVxuICAgICAgLy8gVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWQgXHUyMDE0IHdoaWNoIHRoZSBkZXBsb3ltZW50IGVkZ2UgKENsb3VkIFJ1bilcbiAgICAgIC8vIHJlamVjdHMsIHR1cm5pbmcgdGhlIGFwcCdzIDIwMCBpbnRvIGEgNTAwLiBCdWZmZXIgb25seSB0aG9zZSBzbyB0aGV5IGNhblxuICAgICAgLy8gYmUgcmUtc2VudCB3aXRoIGEgQ29udGVudC1MZW5ndGg7IHRoZSBib2R5IGlzIGZvcndhcmRlZCB1bnRvdWNoZWQgc29cbiAgICAgIC8vIENvbnRlbnQtRW5jb2RpbmcgaXMgcHJlc2VydmVkLiBMZW5ndGgta25vd24gcmVzcG9uc2VzIChlLmcuIC9ucG0vKlxuICAgICAgLy8gYXNzZXRzKSBhbmQgYm9keS1sZXNzIHJlc3BvbnNlcyBzdHJlYW0gdGhyb3VnaCB3aXRob3V0IGJ1ZmZlcmluZy5cbiAgICAgIHByb3h5UmVzOiAocHJveHlSZXMsIHJlcSwgcmVzKSA9PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7IC4uLnByb3h5UmVzLmhlYWRlcnMgfTtcbiAgICAgICAgLy8gVHJhbnNmZXItRW5jb2RpbmcvQ29ubmVjdGlvbiBhcmUgaG9wLWJ5LWhvcCAoUkZDIDcyMzAgXHUwMEE3Ni4xKS5cbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzWydjb25uZWN0aW9uJ107XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzWydrZWVwLWFsaXZlJ107XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzID0gcHJveHlSZXMuc3RhdHVzQ29kZSA/PyA1MDI7XG4gICAgICAgIC8vIENvbnRlbnQtTGVuZ3RoIGlzIGZvcmJpZGRlbiBvbiAxeHgvMjA0OyBIRUFELzMwNCBtYXkga2VlcCB0aGVpcnMuXG4gICAgICAgIGlmIChzdGF0dXMgPCAyMDAgfHwgc3RhdHVzID09PSAyMDQpIHtcbiAgICAgICAgICBkZWxldGUgaGVhZGVyc1snY29udGVudC1sZW5ndGgnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJvZHlsZXNzID1cbiAgICAgICAgICByZXEubWV0aG9kID09PSAnSEVBRCcgfHxcbiAgICAgICAgICBzdGF0dXMgPCAyMDAgfHxcbiAgICAgICAgICBzdGF0dXMgPT09IDIwNCB8fFxuICAgICAgICAgIHN0YXR1cyA9PT0gMzA0O1xuICAgICAgICBpZiAoaGVhZGVyc1snY29udGVudC1sZW5ndGgnXSAhPT0gdW5kZWZpbmVkIHx8IGJvZHlsZXNzKSB7XG4gICAgICAgICAgcmVzLndyaXRlSGVhZChzdGF0dXMsIGhlYWRlcnMpO1xuICAgICAgICAgIC8vIEhlYWRlcnMgYXJlIGFscmVhZHkgc2VudCwgc28gYWJvcnQgdGhlIHJlc3BvbnNlIGlmIHRoZSB1cHN0cmVhbVxuICAgICAgICAgIC8vIHN0cmVhbSBlcnJvcnMgbWlkLXBpcGUgKGUuZy4gRUNPTk5SRVNFVCkgcmF0aGVyIHRoYW4gbGVhdmluZyBhblxuICAgICAgICAgIC8vIHVuaGFuZGxlZCAnZXJyb3InIG9yIGEgaHVuZyBjbGllbnQuXG4gICAgICAgICAgcHJveHlSZXMub24oJ2Vycm9yJywgKCkgPT4gcmVzLmRlc3Ryb3koKSk7XG4gICAgICAgICAgcHJveHlSZXMucGlwZShyZXMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNodW5rczogQnVmZmVyW10gPSBbXTtcbiAgICAgICAgcHJveHlSZXMub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4gY2h1bmtzLnB1c2goY2h1bmspKTtcbiAgICAgICAgcHJveHlSZXMub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBib2R5ID0gQnVmZmVyLmNvbmNhdChjaHVua3MpO1xuICAgICAgICAgIGhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ10gPSBTdHJpbmcoYm9keS5sZW5ndGgpO1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoc3RhdHVzLCBoZWFkZXJzKTtcbiAgICAgICAgICByZXMuZW5kKGJvZHkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJveHlSZXMub24oJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgICAgIGlmICghcmVzLmhlYWRlcnNTZW50KSB7XG4gICAgICAgICAgICAvLyBTZXQgYSBsZW5ndGggc28gdGhlIGVtcHR5IDUwMiBpc24ndCBzZW50IGNodW5rZWQgKHdoaWNoIHRoZVxuICAgICAgICAgICAgLy8gZGVwbG95bWVudCBlZGdlIHdvdWxkIHJlamVjdCBqdXN0IGxpa2UgdGhlIG9yaWdpbmFsIHJlc3BvbnNlKS5cbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNTAyLCB7ICdjb250ZW50LWxlbmd0aCc6ICcwJyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSkgYXMgUmVxdWVzdEhhbmRsZXI7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7O0FBQUEsT0FBTyxZQUFZO0FBQ25CLE9BQU8sVUFBVTtBQUNqQixPQUFPQSxjQUFhOzs7QUNGcEIsT0FBTyxXQUFXLGNBQWlEO0FBQ25FLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsVUFBVTs7O0FDRm5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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RSxNQUFNLFNBQVMsR0FBRyxVQUFVLFNBQVMsT0FBTyxFQUFFLENBQUM7QUFBQSxFQUMzRTtBQUFBLEVBQ0EsS0FBSyxTQUFTO0FBQ1YsV0FBTyxLQUFLLFVBQVUsRUFBRSxNQUFNLFFBQVEsR0FBRyxVQUFVLFNBQVMsT0FBTyxFQUFFLENBQUM7QUFBQSxFQUMxRTtBQUFBLEVBQ0EsT0FBTyxTQUFTO0FBQ1osV0FBTyxLQUFLLFVBQVUsRUFBRSxNQUFNLFVBQVUsR0FBRyxVQUFVLFNBQVMsT0FBTyxFQUFFLENBQUM7QUFBQSxFQUM1RTtBQUFBLEVBQ0EsS0FBSyxTQUFTO0FBQ1YsV0FBTyxLQUFLLFVBQVUsRUFBRSxNQUFNLFFBQVEsR0FBRyxVQUFVLFNBQVMsT0FBTyxFQUFFLENBQUM7QUFBQSxFQUMxRTtBQUFBLEVBQ0EsTUFBTSxTQUFTO0FBQ1gsV0FBTyxLQUFLLFVBQVUsRUFBRSxNQUFNLFNBQVMsR0FBRyxVQUFVLFNBQVMsT0FBTyxFQUFFLENBQUM7QUFBQSxFQUMzRTtBQUFBLEVBQ0EsS0FBSyxTQUFTO0FBQ1YsV0FBTyxLQUFLLFVBQVUsRUFBRSxNQUFNLFFBQVEsR0FBRyxVQUFVLFNBQVMsT0FBTyxFQUFFLENBQUM7QUFBQSxFQUMxRTtBQUFBLEVBQ0EsT0FBTyxTQUFTO0FBQ1osV0FBTyxLQUFLLFVBQVUsRUFBRSxNQUFNLFVBQVUsR0FBRyxVQUFVLFNBQVMsT0FBTyxFQUFFLENBQUM7QUFBQSxFQUM1RTtBQUFBLEVBQ0EsVUFBVSxTQUFTO0FBRWYsV0FBTyxLQUFLLFVBQVU7QUFBQSxNQUNsQixNQUFNO0FBQUEsTUFDTixHQUFHLFVBQVUsU0FBUyxPQUFPO0FBQUEsSUFDakMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLElBQUksU0FBUztBQUNULFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxPQUFPLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDekU7QUFBQSxFQUNBLEdBQUcsU0FBUztBQUNSLFdBQU8sS0FBSyxVQUFVLEVBQUUsTUFBTSxNQUFNLEdBQUcsVUFB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YUFBYTtBQUNiLFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxVQUFVO0FBQUEsRUFDakU7QUFBQSxFQUNBLElBQUksVUFBVTtBQUNWLFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPO0FBQUEsRUFDOUQ7QUFBQSxFQUNBLElBQUksUUFBUTtBQUNSLFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLO0FBQUEsRUFDNUQ7QUFBQSxFQUNBLElBQUksVUFBVTtBQUNWLFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPO0FBQUEsRUFDOUQ7QUFBQSxFQUNBLElBQUksU0FBUztBQUNULFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUEsRUFDN0Q7QUFBQSxFQUNBLElBQUksV0FBVztBQUNYLFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxRQUFRO0FBQUEsRUFDL0Q7QUFBQSxFQUNBLElBQUksU0FBUztBQUNULFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUEsRUFDN0Q7QUFBQSxFQUNBLElBQUksVUFBVTtBQUNWLFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPO0FBQUEsRUFDOUQ7QUFBQSxFQUNBLElBQUksU0FBUztBQUNULFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUEsRUFDN0Q7QUFBQSxFQUNBLElBQUksT0FBTztBQUNQLFdBQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxP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V0FBVyxvQkFBb0I7QUFDdEUsV0FBTyxNQUFNLE9BQU8sUUFBUSxDQUFDO0FBQzdCLFdBQU8sTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsNENBQTRDO0FBQUEsRUFDM0UsVUFBRTtBQUNBLFVBQU0sSUFBSTtBQUFBLE1BQWMsQ0FBQyxTQUFTLFdBQ2hDLE9BQU8sTUFBTSxDQUFDLFVBQVUsUUFBUSxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7QUFBQSxJQUMzRDtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsS0FBSyxvREFBb0QsWUFBWTtBQUNuRSxRQUFNLGdCQUFnQixXQUFXO0FBQ2pDLFFBQU0sc0JBQXNCLFFBQVEsSUFBSSwwQkFBMEI7QUFDbEUsUUFBTSxxQkFBcUIsUUFBUSxJQUFJLHlCQUF5QjtBQUNoRSxNQUFJLGtCQUFrQjtBQUV0QixVQUFRLElBQUksMEJBQTBCLElBQUk7QUFDMUMsVUFBUSxJQUFJLHlCQUF5QixJQUFJO0FBQ3pDLGFBQVcsUUFBUSxPQUFPLFVBQVU7QUFDbEMsUUFBSSxPQUFPLEtBQUssTUFBTSw4QkFBOEI7QUFDbEQsYUFBTyxTQUFTLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDO0FBQUEsSUFDdEM7QUFDQSx1QkFBbUI7QUFDbkIsV0FBTyxJQUFJLFNBQVMsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDO0FBQUEsRUFDM0M7QUFFQSxNQUFJO0FBQ0YsVUFBTSxrQkFBa0IsYUFBYSxHQUFHLE9BQU8sUUFBUTtBQUNyRCxZQUFNLFdBQVcsTUFBTSxjQUFjLEdBQUcsR0FBRyxvQkFBb0IsRUFBRSxRQUFRLE9BQU8sQ0FBQztBQUNqRixhQUFPLE1BQU0sU0FBUyxRQUFRLEdBQUc7QUFDakMsYUFBTyxNQUFNLGlCQUFpQixDQUFDO0FBQUEsSUFDakMsQ0FBQztBQUFBLEVBQ0gsVUFBRTtBQUNBLGVBQVcsUUFBUTtBQUNuQixRQUFJLHdCQUF3QixPQUFXLFFBQU8sUUFBUSxJQUFJLDBCQUEwQjtBQUFBLFFBQy9FLFNBQVEsSUFBSSwwQkFBMEIsSUFBSTtBQUMvQyxRQUFJLHVCQUF1QixPQUFXLFFBQU8sUUFBUSxJQUFJLHlCQUF5QjtBQUFBLFFBQzdFLFNBQVEsSUFBSSx5QkFBeUIsSUFBSTtBQUFBLEVBQ2hEO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiZXhwcmVzcyIsICJ1dGlsIiwgIm9iamVjdFV0aWwiLCAiZXJyb3JVdGlsIiwgImVycm9yTWFwIiwgImN0eCIsICJyZXN1bHQiLCAiaXNzdWVzIiwgImVsZW1lbnRzIiwgInByb2Nlc3NlZCIsICJyZXN1bHQiLCAiciIsICJab2RGaXJzdFBhcnR5VHlwZUtpbmQiLCAicmVjb3ZlcnkiLCAicmVjb3ZlcnkiLCAiZXhwcmVzcyIsICJyZWNvdmVyeSJdCn0K
