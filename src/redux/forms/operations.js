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
} from './action-creators';

/**
 * A Redux Thunk. A function that returns a Promise
 * @typedef {function} Thunk
 * @returns {Promise}
 */

/**
 * Will validate the form state based on your validation function and update the form state and props.
 *
 * @kind function
 * @name validateForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk}.
 * @throws Arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(validateForm({
 *        formId: 'unique-form-id'
 *     }))
 */

const validateForm = ({ formId }) => async (dispatch, getState) => {
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
 * Operation that updates one field value inside the `my-form-state` redux state. Will update any form/field property
 * that is being affected by this field. (ex: isSubmittable, isValid, isInvalid, etc)
 *
 * @desc formId is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux` .
 * @kind function
 * @name updateField
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @param {string} Arguments.field - the field name inside the form.
 * @param {any} Arguments.value - any value.
 * @returns {Thunk}
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
 * Operation that updates one/more field/s value/s inside the `my-form-state` redux state. Will update any form/field property
 * that is being affected by this field. (ex: isSubmittable, isValid, isInvalid, etc)
 *
 * @desc formId is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux` .
 * @kind function
 * @name updateForm
 * @param {Object} Arguments - Arguments as object.
 * @param {Object} Arguments.data -  a key value pair with the form data. { [key] : value, [key] : value }
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk}
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
 * Operation that will submit and lock the form state. Will set the isSubmitted form property to true.
 * You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.
 *
 * @desc formId is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux` .
 * @kind function
 * @name submitForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk}
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
 * Operation that will initialize the form state. Normally use it after the component that uses this operation is mounted.
 * You can await for this operation and will resolve the promise once the form is initialized.
 *
 * @desc formId is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux` .
 * @kind function
 * @name initializeForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @param {Object} [Arguments.initialState] - the form initial state
 * @returns {Thunk}
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
 * Operation that will clear the form state from the store. Normally use it after the component that uses this operation is unmounted.
 *
 * @desc formId is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux` .
 * @kind function
 * @name clearForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk}
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
 * Operation that will reset the form state to the initial state. You can also change the initialState using the operation.
 *
 * @desc formId is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux` .
 * @kind function
 * @name resetForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @param {Object} [Arguments.initialState] - the form initial state
 * @returns {Thunk}
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
