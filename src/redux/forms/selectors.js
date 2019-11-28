import { getFormFromRegistry } from '@mfs-registry';
import { memoize } from '@mfs-lib/memoize';

// TODO review this, brute force first
export const getFormIdState = ({ formId }) => (state) => (state && state.forms && state.forms[formId]) || {};

const memoizeGetForm = memoize((formId, thisFormIdState) => {
  const { initialFields, initialState } = getFormFromRegistry(formId);

  return {
    data: thisFormIdState.data || initialState || {},

    isSubmitted: thisFormIdState.isSubmitted,

    isSubmittable: thisFormIdState.isSubmittable,

    isTouched: thisFormIdState.isTouched,

    isPristine: thisFormIdState.isPristine,

    errors: thisFormIdState.errors,

    isValid: thisFormIdState.isValid,

    isInvalid: thisFormIdState.isInvalid,

    dirtyFields: thisFormIdState.dirtyFields,

    fields: thisFormIdState.fields || initialFields || {},
  };
});

export const getForm = ({ formId }) => (state) => {
  const thisFormIdState = getFormIdState({ formId })(state) || {};
  return memoizeGetForm(formId, thisFormIdState);
};
