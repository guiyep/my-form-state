export const validateParamAndThrow = (param, type, name, isRequired = true) => {
  if (typeof param !== type && isRequired) {
    throw new Error(
      `Invalid ${name} param, expected ${type} and received ${typeof param}. ${name} is a ${(isRequired &&
        'required') ||
        'not required'} parameter`,
    );
  }
};
