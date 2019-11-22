import { getFormFromRegistry } from '@mfs-registry';

export const getFormIdState = ({ formId }, state) => (state && state.forms && state.forms[formId]) || {};

// memoize this!!!
export const getForm = ({ formId }) => (state) => {
  const thisFormIdState = getFormIdState({ formId }, state) || {};

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
};
