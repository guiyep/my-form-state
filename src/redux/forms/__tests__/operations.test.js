import { validateForm, updateField, updateForm, submitForm, initializeForm, clearForm, resetForm } from '../operations';

const mockDispatch = jest.fn();

const formId = 'unique-form-id';

it('validateForm to throw with wrong params', () => {
  expect(() => validateForm()).toThrow();
  expect(() => validateForm({ formId })()).toThrow();
  expect(() => validateForm({ formId })(() => {})).toThrow();
  expect(() => validateForm({ formId })(undefined, () => {})).toThrow();
});

it('updateField to throw with wrong params', () => {
  expect(() => updateField()).toThrow();
  expect(() => validateForm({ formId })).toThrow();
  expect(() => validateForm({ formId, field: 'test' })()).toThrow();
});

describe('updateField, normal flow', () => {
  it('updateField to not throw', () => {
    expect(() => updateField({ formId, field: 'test' })(mockDispatch)).not.toThrow();
  });

  it('updateField execute updateForm with good params', () => {
    expect(mockDispatch.mock.calls.length).toBe(1);
  });
});

it('updateForm to throw with wrong params', () => {
  expect(() => updateForm()).toThrow();
  expect(() => validateForm({ formId })()).toThrow();
});

it('submitForm to throw with wrong params', () => {
  expect(() => submitForm()).toThrow();
  expect(() => validateForm({ formId })()).toThrow();
});

it('initializeForm to throw with wrong params', () => {
  expect(() => initializeForm()).toThrow();
  expect(() => validateForm({ formId })()).toThrow();
});
it('clearForm to throw with wrong params', () => {
  expect(() => clearForm()).toThrow();
  expect(() => validateForm({ formId })()).toThrow();
});

it('resetForm to throw with wrong params', () => {
  expect(() => resetForm()).toThrow();
  expect(() => validateForm({ formId })()).toThrow();
});
