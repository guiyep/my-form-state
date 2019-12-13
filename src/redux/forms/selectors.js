import { memoize } from '@mfs-lib/memoize';
import ParamValidator from '@mfs-lib/param-validator';
import { getFormFromRegistry } from '@mfs-registry';

export const getFormIdState = ({ formId }) => (state) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(state, 'state');

  return (state && state.forms && state.forms[formId]) || {};
};

const memoizeGetForm = memoize((formId, thisFormIdState) => {
  const { initialFields, initialState } = getFormFromRegistry(formId);

  return {
    data: thisFormIdState.data || initialState || {},

    isSubmitted: thisFormIdState.isSubmitted,

    isSubmittable: thisFormIdState.isSubmittable,

    isTouched: thisFormIdState.isTouched,

    isPristine: thisFormIdState.isPristine,

    errors: thisFormIdState.errors || {},

    isValid: thisFormIdState.isValid,

    isInvalid: thisFormIdState.isInvalid,

    dirtyFields: thisFormIdState.dirtyFields || {},

    fields: thisFormIdState.fields || initialFields || {},
  };
});

export const getForm = ({ formId }) => (state) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(state, 'state');

  const thisFormIdState = getFormIdState({ formId })(state) || {};
  return memoizeGetForm(formId, thisFormIdState);
};
