export const Types = {
  FUNCTION: typeof function() {},
  NUMBER: typeof 1,
  BOOLEAN: typeof true,
  STRING: typeof 'string',
  OBJECT: typeof {},
};

export const IS_REQ = true;
export const IS_NOT_REQ = false;

export const validateParamAndThrow = (param, type, name = 'UNDEFINED_FIELD', isRequired = true) => {
  if (type && Types[type.toUpperCase()] === undefined) {
    throw new Error(
      `Invalid field ${name} type, ${type} is invalid ${typeof param}. ${name} is a ${(isRequired && 'required') ||
        'not required'} parameter`,
    );
  }
  if (typeof param !== type && (isRequired || (param !== undefined && !isRequired))) {
    throw new Error(
      `Invalid ${name} param, expected ${type} and received ${typeof param}. ${name} is a ${(isRequired &&
        'required') ||
        'not required'} parameter`,
    );
  }
};

export const isBooleanParam = (value, name, isRequired) =>
  validateParamAndThrow(value, Types.BOOLEAN, name, isRequired);

export const isStringParam = (value, name, isRequired) => validateParamAndThrow(value, Types.STRING, name, isRequired);

export const isFunctionParam = (value, name, isRequired) =>
  validateParamAndThrow(value, Types.FUNCTION, name, isRequired);

export const isObjectParam = (value, name, isRequired) => validateParamAndThrow(value, Types.OBJECT, name, isRequired);

export const isNumberParam = (value, name, isRequired) => validateParamAndThrow(value, Types.NUMBER, name, isRequired);
