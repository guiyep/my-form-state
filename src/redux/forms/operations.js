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
 * @returns {Promise}
 */

/**
 * Will validate the form state based on your validation function and update the form state and props.
 *
 * @name validateForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a Promise.
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
 * This operation update one field and inside the my-form-state redux state. Will also update all the
 * form related props like isValid, isInvalid, etc. Normally it is triggered once an input value in the form changes.
 *
 * @name updateField
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @param {string} Arguments.field - the field name inside the form.
 * @param {any} Arguments.value - any value.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a Promise.
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
 * This operation update one/more fields inside the my-form-state redux state. Will also update all the
 * form related props like isValid, isInvalid, isSubmittable, etc. Normally it is triggered once an input value in the form changes.
 *
 * @name updateForm
 * @param {Object} Arguments - Arguments as object.
 * @param {Object} Arguments.data -  a key value pair with the form data. { [key] : value, [key] : value }
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a Promise.
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
 * This operation wil submit and lock the form. Will set the isSubmitted form prop to true.
 * You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.
 *
 * @name submitForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a Promise.
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
 * This operation wil initialize the form. Normally use after the component that uses this operation is mounted.
 * You can await for this operation and will resolve the promise once the validation is completed after the form is initialized.
 *
 * @name initializeForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @param {Object} [Arguments.initialState] - the form initial state
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a Promise.
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
 * This operation will clear the form state from the store. Normally use after the component that uses this operation is unmounted.
 *
 * @name clearForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a Promise.
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
 * This operation will reset the form state to the initial state. You can also change the initialState using the operation.
 *
 * @name resetForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - the unique form id indicator.
 * @param {Object} [Arguments.initialState] - the form initial state
 * @returns {Thunk} a function to be executed passing dispatch and getState that returns a Promise.
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
