import { validateForm, updateForm, submitForm, initializeForm, clearForm, resetForm } from '../action-creators';

const formId = 'test-form-id';

it('validateForm action', () => {
  const action1 = validateForm({ errors: { error1: 'this is an error' }, formId });
  const action2 = validateForm({ errors: undefined, formId });

  expect(action1).toEqual({
    type: 'MY-FORM-STATE/VALIDATED_FORM',
    payload: { error1: 'this is an error' },
    options: {
      formId,
    },
  });

  expect(action2).toEqual({
    type: 'MY-FORM-STATE/VALIDATED_FORM',
    payload: {},
    options: {
      formId,
    },
  });
});

it('initializeForm action', () => {
  const action1 = initializeForm({ initialState: { field: 'this is an field' }, formId });
  const action2 = initializeForm({ initialState: undefined, formId });

  expect(action1).toEqual({
    type: 'MY-FORM-STATE/INITIALIZE_FORM',
    payload: { field: 'this is an field' },
    options: {
      formId,
    },
  });

  expect(action2).toEqual({
    type: 'MY-FORM-STATE/INITIALIZE_FORM',
    payload: undefined,
    options: {
      formId,
    },
  });
});

it('submitForm action', () => {
  const action = submitForm({ formId });

  expect(action).toEqual({
    type: 'MY-FORM-STATE/SUBMIT_FORM',
    options: {
      formId,
    },
  });
});

it('updateForm action', () => {
  const action1 = updateForm({ data: { field: 'this is an field' }, formId });
  const action2 = updateForm({ data: undefined, formId });

  expect(action1).toEqual({
    type: 'MY-FORM-STATE/UPDATE_FORM',
    payload: { field: 'this is an field' },
    options: {
      formId,
    },
  });

  expect(action2).toEqual({
    type: 'MY-FORM-STATE/UPDATE_FORM',
    payload: undefined,
    options: {
      formId,
    },
  });
});

it('clearForm action', () => {
  const action = clearForm({ formId });

  expect(action).toEqual({
    type: 'MY-FORM-STATE/CLEAR_FORM',
    options: {
      formId,
    },
  });
});

it('resetForm action', () => {
  const action1 = resetForm({ initialState: { field: 'this is an field' }, formId });
  const action2 = resetForm({ initialState: undefined, formId });

  expect(action1).toEqual({
    type: 'MY-FORM-STATE/RESET_FORM',
    payload: { field: 'this is an field' },
    options: {
      formId,
    },
  });

  expect(action2).toEqual({
    type: 'MY-FORM-STATE/RESET_FORM',
    payload: undefined,
    options: {
      formId,
    },
  });
});
