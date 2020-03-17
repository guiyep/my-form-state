import { formValidator as formValidatorSync } from '../form-validator/sync';
import { formSchema } from '../form-schema';

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    familyName: {
      type: 'string',
    },
    favoriteColor: {
      type: 'string',
    },
    alias: {
      type: 'string',
    },
  },
};

it('parameters validation', () => {
  expect(() => formSchema()).toThrow();
  expect(() => formSchema(schema)).not.toThrow();
  expect(() => formSchema(schema, { async: 123 })).toThrow();
  expect(() => formSchema(schema, { async: true })).toThrow();
  expect(() => formSchema(schema)).not.toThrow();
  expect(() => formSchema(schema)).not.toThrow();
});

it('return expected sync', () => {
  const schemaFunction = formSchema(schema);
  const object = schemaFunction();
  expect(object.formValidator).toBeDefined();
  expect(object.jsonSchema).toBeDefined();
  expect(object.jsonSchema).toEqual(schema);
  expect(object.formValidator).toBeInstanceOf(Function);
  expect(object.formValidator({})).toEqual(formValidatorSync(schema)({}));
});
