class ParamValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = 'ParamValidationError'; // (2)
  }
}

const Types = {
  FUNCTION: typeof function empty() {},
  NUMBER: typeof 1,
  BOOLEAN: typeof true,
  STRING: typeof 'string',
  OBJECT: typeof {},
};

const validateParamAndThrow = (param, type, name = 'UNDEFINED_FIELD', isRequired = true) => {
  if (type && Types[type.toUpperCase()] === undefined) {
    throw new ParamValidationError(
      `Invalid field ${name} type, ${type} is invalid ${typeof param}. ${name} is a ${(isRequired && 'required') ||
        'not required'} parameter`,
    );
  }
  // eslint-disable-next-line
  if (typeof param !== type && (isRequired || (param !== undefined && !isRequired))) {
    throw new ParamValidationError(
      `Invalid ${name} param, expected ${type} and received ${typeof param}. ${name} is a ${(isRequired &&
        'required') ||
        'not required'} parameter`,
    );
  }
};

export const isBoolean = (value, name, isRequired) => validateParamAndThrow(value, Types.BOOLEAN, name, isRequired);

export const isString = (value, name, isRequired) => validateParamAndThrow(value, Types.STRING, name, isRequired);

export const isFunction = (value, name, isRequired) => validateParamAndThrow(value, Types.FUNCTION, name, isRequired);

export const isObject = (value, name, isRequired) => validateParamAndThrow(value, Types.OBJECT, name, isRequired);

export const isNumber = (value, name, isRequired) => validateParamAndThrow(value, Types.NUMBER, name, isRequired);

export default {
  notRequired: {
    isBoolean: (...args) => isBoolean(...args, false),
    isString: (...args) => isString(...args, false),
    isFunction: (...args) => isFunction(...args, false),
    isObject: (...args) => isObject(...args, false),
    isNumber: (...args) => isNumber(...args, false),
  },
  isBoolean,
  isString,
  isFunction,
  isObject,
  isNumber,
};
