import { debounce } from '@mfs-lib/debounce';
import { unflatten } from '@mfs-lib/flat';
import ParamValidator, { IS_NOT_REQ } from '@mfs-lib/param-validator';
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

/**
 * A Redux Thunk. Function that returns a Promise
 * @typedef {function} Thunk
 */

/**
 * Will validate the form state based on your validation function and update the form state and props.
 *
 * @module my-form-state/redux
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a thunk.
 * @throws Arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(validateForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const validateForm = ({ formId }) => async (dispatch, getState) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isFunction(dispatch, 'dispatch');
  ParamValidator.isFunction(getState, 'getState');

  const formData = getFormFromRegistry(formId);
  const validatorFunction = formData.formValidator;

  if (!validatorFunction) {
    dispatch(validateFormAction({ errors: undefined, formId }));
    return true;
  }

  const formState = getFormIdState({ formId })(getState());

  const errors = await validatorFunction(unflatten(formState.data));

  if (errors) {
    dispatch(validateFormAction({ errors, formId }));
    return false;
  }

  dispatch(validateFormAction({ errors: undefined, formId }));
  return true;
};

/**
 * Will update the field state inside the form, after that will validate the form and update all the form state and field props.
 *
 * @module my-form-state/redux
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @param {string} Arguments.field - the field name inside the form.
 * @param {any} Arguments.value - any value.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a thunk.
 * @throws Arguments.formId is falsy
 * @throws Arguments.field is falsy
 *
 * @example
 *
 *     dispatch(updateField({
 *        field: 'color',
 *        value: 'red',
 *        formId: 'unique-form-id'
 *     }))
 */
export const updateField = ({ formId, field, value }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isString(field, 'field');
  ParamValidator.isFunction(dispatch, 'dispatch');

  dispatch(
    updateForm({
      formId,
      data: {
        [field]: value,
      },
    }),
  );
};

const validateFormDebounced = debounce(
  (formId, dispatch) => {
    dispatch(validateForm({ formId }));
  },
  // this number need to be bellow 100 so it is not noticeable to the user
  100,
  { leading: false, trailing: true },
);

/**
 * Will update the form data, validate the form and update all the form state and field props.
 *
 * @module my-form-state/redux
 * @param {Object} Arguments - Arguments as object.
 * @param {Object} Arguments.data -  a ke value pair with the form data.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a thunk.
 * @throws Arguments.formId is falsy
 * @throws Arguments.data is falsy
 *
 * @example
 *
 *     dispatch(updateForm({
 *        data: {
 *          color: 'red'
 *        },
 *        formId: 'unique-form-id'
 *     }))
 */

export const updateForm = ({ formId, data }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(data, 'data');
  ParamValidator.isFunction(dispatch, 'dispatch');

  dispatch(updateFormAction({ data, formId }));

  validateFormDebounced(formId, dispatch);
};

/**
 * Will submit and lock the form.
 * You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.
 *
 * @module my-form-state/redux
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a thunk.
 * @throws Arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(submitForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const submitForm = ({ formId }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isFunction(dispatch, 'dispatch');

  dispatch(submitFormAction({ formId }));

  return dispatch(validateForm({ formId }));
};

/**
 * Will initialize the form. Normally use after the component that uses this operation is mounted.
 * You can await for this operation and will resolve the promise once the validation is completed after the form is initialized.
 *
 * @module my-form-state/redux
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @param {Object} [Arguments.initialState] - the form initial state
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a thunk.
 * @throws Arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(initializeForm({
 *        formId: 'unique-form-id'
 *     }))
 *
 */

export const initializeForm = ({ formId, initialState = {} }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(initialState, 'initialState');
  ParamValidator.isFunction(dispatch, 'dispatch');

  dispatch(initializeFormAction({ initialState, formId }));

  // it is not always the case we need to validate the schema on initialization
  return dispatch(validateForm({ formId }));
};

/**
 * Will clear the form state from the store. Normally use after the component that uses this operation is unmounted.
 *
 * @module my-form-state/redux
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a thunk.
 * @throws Arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(clearForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const clearForm = ({ formId }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isFunction(dispatch, 'dispatch');

  return dispatch(clearFormAction({ formId }));
};

/**
 * Will reset the form state to the initial state. You can also change the initialState using the operation.
 *
 * @module my-form-state/redux
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @param {Object} [Arguments.initialState] - the form initial state
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a thunk.
 * @throws Arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(clearForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const resetForm = ({ formId, initialState }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(initialState, 'initialState', IS_NOT_REQ);
  ParamValidator.isFunction(dispatch, 'dispatch');

  const formData = getFormFromRegistry(formId);
  dispatch(clearFormAction({ formId }));
  dispatch(resetFormAction({ formId, initialState: initialState || formData.initialState }));
};
