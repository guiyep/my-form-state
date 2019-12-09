export const Types = {
  FUNCTION: typeof function() {},
  NUMBER: typeof 1,
  BOOLEAN: typeof true,
  STRING: typeof '',
  OBJECT: typeof {},
};

export const IS_REQ = true;
export const IS_NOT_REQ = false;

export const validateParamAndThrow = (param, type, name = 'UNDEFINED_FIELD', isRequired = true) => {
  if (typeof param !== type && (isRequired || (param !== undefined && !isRequired))) {
    throw new Error(
      `Invalid ${name} param, expected ${type} and received ${typeof param}. ${name} is a ${(isRequired &&
        'required') ||
        'not required'} parameter`,
    );
  }
};
