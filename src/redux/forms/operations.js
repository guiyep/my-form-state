import debounce from 'lodash.debounce';
import { getFormFromRegistry } from '@mfs-registry';

import { getFormIdState } from './selectors';

import {
  validateForm as validateFormAction,
  updateForm as updateFormAction,
  submitForm as submitFormAction,
  clearForm as clearFormAction,
  initializeForm as initializeFormAction,
  resetForm as resetFormAction,
} from './actions';

export const validateForm = ({ formId }) => (dispatch, getState) => {
  const formData = getFormFromRegistry(formId);
  const validatorFunction = formData.formValidator;

  if (!validatorFunction) {
    return;
  }

  const formState = getFormIdState({ formId }, getState());

  const errors = validatorFunction(formState.data);

  if (!!errors) {
    dispatch(validateFormAction({ errors, formId }));
    return false;
  }

  dispatch(validateFormAction({ errors: undefined, formId }));
  return true;
};

export const updateField = ({ formId, field, value }) => (dispatch) => {
  dispatch(
    updateForm({
      formId,
      data: {
        [field]: value,
      },
    }),
  );
};

export const updateForm = ({ formId, data }) => (dispatch) => {
  dispatch(updateFormAction({ data, formId }));

  // debounce the validation of the form so we validate only once on multiple inputs
  const validateFormDebounced = debounce(
    () => {
      dispatch(validateForm({ formId }));
    },
    // this number need to be bellow 100 so it is not noticeable to the user
    10,
  );

  validateFormDebounced();
};

export const submitForm = ({ formId }) => async (dispatch) => {
  dispatch(submitFormAction({ formId }));

  const result = await dispatch(validateForm({ formId }));
  return result;
};

export const initializeForm = ({ formId, initialState }) => async (dispatch) => {
  dispatch(initializeFormAction({ initialState, formId }));

  // it is not always the case we need to validate the schema on initialization
  dispatch(validateForm({ formId }));
};

export const clearForm = ({ formId }) => (dispatch) => {
  dispatch(clearFormAction({ formId }));
};

export const resetForm = ({ formId, initialState }) => (dispatch) => {
  const formData = getFormFromRegistry(formId);
  dispatch(clearFormAction({ formId }));
  dispatch(resetFormAction({ formId, initialState: initialState || formData.initialState }));
};
