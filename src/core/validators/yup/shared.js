export const findErrorsFromException = (ex) =>
  ex &&
  ex.inner &&
  ex.inner.reduce((acc, validationError) => {
    acc[validationError.path] = validationError.message;
    return acc;
  }, {});
