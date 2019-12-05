const findErrorsFromException = (ex) =>
  ex &&
  ex.inner &&
  ex.inner.reduce((acc, validationError) => {
    acc[validationError.path] = validationError.message;
    return acc;
  }, {});

export const addYUPSchemaValidator = (schema) => (formData) => {
  try {
    schema.validateSync(formData, { abortEarly: false });
  } catch (ex) {
    // it is invalid
    if (ex.name === 'ValidationError') {
      return findErrorsFromException(ex);
    }
    throw new Error(ex);
  }
  // it is valid
  return undefined;
};

export const addYUPAsyncSchemaValidator = (schema) => async (formData) => {
  try {
    await schema.validate(formData, { abortEarly: false });
  } catch (ex) {
    // it is invalid
    if (ex.name === 'ValidationError') {
      return findErrorsFromException(ex);
    }
    throw new Error(ex);
  }
};
