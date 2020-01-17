import ParamValidator from '@mfs-lib/param-validator';
import { formValidator } from './form-validator/sync';
import { jsonSchema } from './json-schema';

export const formSchema = (schema) => {
  ParamValidator.isObject(schema, 'schema');

  return () => ({
    formValidator: formValidator(schema),
    jsonSchema: jsonSchema(schema),
  });
};
