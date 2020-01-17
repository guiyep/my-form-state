import ParamValidator from '@mfs-lib/param-validator';

const toJsonSchema = (fields) => ({
  type: 'object',
  properties: Object.entries(fields).reduce((acc, [key, field]) => {
    acc[key] = {
      type: field.type,
      // value: field.label,
    };

    if (field.fields) {
      acc[key].properties = toJsonSchema(field.fields);
    }

    return acc;
  }, {}),
});

export const jsonSchema = (schema) => {
  ParamValidator.isObject(schema, 'schema');
  const description = schema.describe();
  return toJsonSchema(description.fields);
};
