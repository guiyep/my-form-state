import core, { yup, registerForm, getFormFromRegistry } from '../index';
import { formSchema } from '../validators/yup';

it('exporting core module', () => {
  expect(yup).toBeDefined();
  expect(formSchema).toBeDefined();
  expect(yup.formSchema).toBeDefined();
  expect(registerForm).toBeDefined();
  expect(getFormFromRegistry).toBeDefined();
  expect(core).toEqual(registerForm);
});
