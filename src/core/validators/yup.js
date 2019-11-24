export const addYUPSchemaValidator = (schema) => (formData) => {
  try {
    schema.validateSync(formData, { abortEarly: false });
  } catch (ex) {
    // it is invalid
    return (
      ex &&
      ex.inner &&
      ex.inner.reduce((acc, validationError) => {
        acc[validationError.path] = validationError.message;
        return acc;
      }, {})
    );
  }
  // it is valid
  return undefined;
};
