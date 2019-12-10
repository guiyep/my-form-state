import { validateForm, updateField, updateForm, submitForm, initializeForm, clearForm, resetForm } from '../operations';

const formId = undefined;

it('validateForm to throw with wrong params', () => {
  expect(() => validateForm()).toThrow();
  expect(() => validateForm({ formId })()).toThrow();
  expect(() => validateForm({ formId })(() => {})).toThrow();
  expect(() => validateForm({ formId })(undefined, () => {})).toThrow();
});

it('updateField to throw with wrong params', () => {
  expect(() => updateField()).toThrow();
});

it('updateForm to throw with wrong params', () => {
  expect(() => updateForm()).toThrow();
});

it('submitForm to throw with wrong params', () => {
  expect(() => submitForm()).toThrow();
});

it('initializeForm to throw with wrong params', () => {
  expect(() => initializeForm()).toThrow();
});
it('clearForm to throw with wrong params', () => {
  expect(() => clearForm()).toThrow();
});

it('resetForm to throw with wrong params', () => {
  expect(() => resetForm()).toThrow();
});
