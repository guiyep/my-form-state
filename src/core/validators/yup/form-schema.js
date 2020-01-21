import ParamValidator from '@mfs-lib/param-validator';
import { formValidator as formValidatorSync } from './form-validator/sync';
import { formValidator as formValidatorAsync } from './form-validator/async';
import { jsonSchema } from './json-schema';

export const formSchema = (schema, { async = false } = {}) => {
  ParamValidator.isObject(schema, 'schema');

  return () => ({
    formValidator: (!async && formValidatorSync(schema)) || formValidatorAsync(schema),
    jsonSchema: jsonSchema(schema),
  });
};
