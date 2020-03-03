import core, { registerForm, getFormFromRegistry } from '../index';
import yup, { formSchema as formSchemaYup } from '../validators/yup';
import jsonSchema, { formSchema as formSchemaAjv, ajv } from '../validators/json-schema/ajv';

it('exporting core module', () => {
  expect(yup).toBeDefined();
  expect(formSchemaYup).toBeDefined();
  expect(jsonSchema).toBeDefined();
  expect(ajv).toBeDefined();
  expect(formSchemaAjv).toBeDefined();
  expect(yup.formSchema).toBeDefined();
  expect(registerForm).toBeDefined();
  expect(getFormFromRegistry).toBeDefined();
  expect(core).toEqual(registerForm);
});
