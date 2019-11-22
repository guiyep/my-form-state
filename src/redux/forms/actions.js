import { VALIDATED_FORM, UPDATE_FORM, SUBMIT_FORM, CLEAR_FORM, INITIALIZE_FORM, RESET_FORM } from './types';

export const validateForm = ({ errors, formId }) => ({
  type: VALIDATED_FORM,
  payload: typeof errors === 'object' ? errors : {},
  options: {
    formId,
  },
});

export const updateForm = ({ data, formId }) => ({
  type: UPDATE_FORM,
  payload: data,
  options: {
    formId,
  },
});

export const submitForm = ({ formId }) => ({
  type: SUBMIT_FORM,
  options: {
    formId,
  },
});

export const initializeForm = ({ initialState, formId }) => ({
  type: INITIALIZE_FORM,
  payload: initialState,
  options: {
    formId,
  },
});

export const clearForm = ({ formId }) => ({
  type: CLEAR_FORM,
  options: {
    formId,
  },
});

export const resetForm = ({ formId, initialState }) => ({
  type: RESET_FORM,
  payload: initialState,
  options: {
    formId,
  },
});
