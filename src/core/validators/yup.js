import ParamValidator from '@mfs-lib/param-validator';

const findErrorsFromException = (ex) =>
  ex &&
  ex.inner &&
  ex.inner.reduce((acc, validationError) => {
    acc[validationError.path] = validationError.message;
    return acc;
  }, {});

/**
 * Creates a SYNC Yup schema validator to be used inside the operations.
 * This is used in `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux` .
 *
 * @kind function
 * @param {object} schema - a YUP schema
 * @return {function} - function to be use inside operations for validating the schema against the form state
 * @throws if schema is falsy and not a YUP schema.
 *
 * @example
 *
 * addYUPSyncSchemaValidator(schema);
 */
export const addYUPSyncSchemaValidator = (schema) => {
  ParamValidator.isObject(schema, 'schema');

  return (formData) => {
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
};

/**
 * Creates an ASYNC Yup schema validator to be used inside the operations.
 * This is used in  `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux`.
 *
 * @kind function
 * @param {object} schema - a YUP schema
 * @return {function} - function to be use inside operations for validating the schema against the form state
 * @throws if schema is falsy and not a YUP schema.
 *
 * @example
 *
 * addYUPAsyncSchemaValidator(schema);
 */
export const addYUPAsyncSchemaValidator = (schema) => {
  ParamValidator.isObject(schema, 'schema');

  return async (formData) => {
    try {
      return await schema.validate(formData, { abortEarly: false });
    } catch (ex) {
      // it is invalid
      if (ex.name === 'ValidationError') {
        return findErrorsFromException(ex);
      }
      throw new Error(ex);
    }
  };
};
