import { validateParamAndThrow, Types } from '@mfs-lib/validate-param';

const findErrorsFromException = (ex) =>
  ex &&
  ex.inner &&
  ex.inner.reduce((acc, validationError) => {
    acc[validationError.path] = validationError.message;
    return acc;
  }, {});

/**
 * Creates a SYNC Yup schema validator to be used inside the operations.
 *
 * @module my-form-state/core
 * @param {object} schema - a YUP schema
 * @return {function} - function to be use inside operations for validating the schema against the form state
 * @throws if schema is falsy and not a YUP schema.
 *
 * @example
 *
 * addYUPSyncSchemaValidator(schema);
 */
export const addYUPSyncSchemaValidator = (schema) => {
  validateParamAndThrow(schema, Types.OBJECT, 'schema');
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
 * Creates a ASYNC Yup schema validator to be used inside the operations.
 *
 * @module my-form-state/core
 * @param {object} schema - a YUP schema
 * @return {function} - function to be use inside operations for validating the schema against the form state
 * @throws if schema is falsy and not a YUP schema.
 *
 * @example
 *
 * addYUPAsyncSchemaValidator(schema);
 */
export const addYUPAsyncSchemaValidator = (schema) => {
  validateParamAndThrow(schema, Types.OBJECT, 'schema');
  return async (formData) => {
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
};
