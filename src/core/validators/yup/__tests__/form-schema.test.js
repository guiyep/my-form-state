import * as YUP from 'yup';
import { formValidator as formValidatorSync } from '../form-validator/sync';
import { formValidator as formValidatorAsync } from '../form-validator/async';
import { formSchema } from '../form-schema';
import { jsonSchema } from '../json-schema';

const schema = YUP.object().shape({
  name: YUP.string().required(),
  familyName: YUP.string().required(),
  favoriteColor: YUP.string().required(),
  alias: YUP.string().required(),
});

it('parameters validation', () => {
  expect(() => formSchema()).toThrow();
  expect(() => formSchema(schema)).not.toThrow();
  expect(() => formSchema(schema, { async: 123 })).toThrow();
  expect(() => formSchema(schema, {})).not.toThrow();
  expect(() => formSchema(schema, { async: true })).not.toThrow();
});

it('return expected sync', () => {
  const schemaFunction = formSchema(schema);
  const object = schemaFunction();
  expect(object.formValidator).toBeDefined();
  expect(object.jsonSchema).toBeDefined();
  expect(object.jsonSchema).toEqual(jsonSchema(schema));
  expect(object.formValidator).toBeInstanceOf(Function);
  expect(object.formValidator({})).toEqual(formValidatorSync(schema)({}));
});

it('return expected async', async () => {
  const resultToMatch = await formValidatorAsync(schema)({});
  const schemaFunction = formSchema(schema);
  const object = schemaFunction();
  expect(object.formValidator).toBeDefined();
  expect(object.jsonSchema).toBeDefined();
  expect(object.jsonSchema).toEqual(jsonSchema(schema));
  expect(object.formValidator).toBeInstanceOf(Function);
  await expect(object.formValidator({})).toEqual(resultToMatch);
});
