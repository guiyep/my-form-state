import { memoize } from '@mfs-lib/memoize';
import ParamValidator from '@mfs-lib/param-validator';
import { getFormFromRegistry } from '@mfs-registry';
import { gerReducerProp } from '../init';

export const getFormIdState = ({ formId }) => (state) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(state, 'state');

  return (state && state[gerReducerProp()] && state[gerReducerProp()][formId]) || {};
};

const memoizeGetForm = memoize((formId, thisFormIdState) => {
  const { initialFields, initialState } = getFormFromRegistry(formId);

  return {
    data: thisFormIdState.data || initialState || {},

    initialData: thisFormIdState.initialData || initialState,

    resultData: thisFormIdState.resultData,

    isSubmitted: thisFormIdState.isSubmitted,

    isSubmittable: thisFormIdState.isSubmittable,

    isInitialized: thisFormIdState.isInitialized,

    isTouched: thisFormIdState.isTouched,

    isPristine: thisFormIdState.isPristine,

    errors: thisFormIdState.errors || {},

    isValid: thisFormIdState.isValid,

    isInvalid: thisFormIdState.isInvalid,

    dirtyFields: thisFormIdState.dirtyFields || {},

    fields: thisFormIdState.fields || initialFields || {},
  };
});

/**
 * Memoize selector that return a function that will get the current state of the form from the Redux/React store. This state can come from React or Redux.
 * Passing formId is not required when used using `registerForm` from `my-form-state/core`.
 *
 * @kind function
 * @name getForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - The unique form id indicator.
 * @returns {function} It is a function to be executed with the state.
 * @throws Arguments.formId is falsy
 *
 * @example
 *
 *     getForm({ formId: 'unique-form-id' })(state)
 *
 */

export const getForm = ({ formId }) => (state) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(state, 'state');

  const thisFormIdState = getFormIdState({ formId })(state) || {};
  return memoizeGetForm(formId, thisFormIdState);
};

/**
 * Gets the forms result data. This result data is the merge between the form changes and the initial state.
 * Passing formId is not required when used using `registerForm` from `my-form-state/core`.
 *
 * @kind function
 * @name getForm
 * @param {Object} Arguments - Arguments as object.
 * @param {string} Arguments.formId - The unique form id indicator.
 * @returns {function} It is a function to be executed with the state.
 * @throws Arguments.formId is falsy
 *
 * @example
 *
 *     getForm({ formId: 'unique-form-id' })(state)
 *
 */

export const getFormResult = ({ formId }) => (state) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(state, 'state');

  const thisFormIdState = getFormIdState({ formId })(state) || {};
  return thisFormIdState && thisFormIdState.resultData;
};
