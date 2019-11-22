import { flatten } from '@mfs-lib/flat';
import { getFields } from '@mfs-lib/get-fields';
import { VALIDATED_FORM, UPDATE_FORM, SUBMIT_FORM, CLEAR_FORM, INITIALIZE_FORM, RESET_FORM } from './types';

export const reducer = (state = {}, action) => {
  const formId = action.options && action.options.formId;
  const previousFormState = state[formId];

  switch (action.type) {
    case VALIDATED_FORM:
      const isInvalid = (action.payload && Object.keys(action.payload).length > 0) || false;

      state[formId] = {
        ...previousFormState,
      };

      state[formId].errors = flatten(action.payload);
      state[formId].isInvalid = isInvalid;
      state[formId].isValid = !isInvalid;
      state[formId].fields = getFields(state[formId]);
      state[formId].isSubmittable = !!state[formId].isTouched && !!state[formId].isValid;

      return state;

    case UPDATE_FORM:
      if (!!action.payload) {
        const flattenData = flatten(action.payload);

        state[formId] = {
          ...previousFormState,
        };

        Object.assign(state[formId].data, flattenData);

        state[formId].dirtyFields = state[formId].dirtyFields || {};

        Object.assign(
          state[formId].dirtyFields,
          Object.keys(flattenData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {}),
        );

        state[formId].isPristine = false;
        state[formId].isTouched = true;
        state[formId].isSubmitted = false;
        state[formId].isSubmittable = !!state[formId].isTouched && !!state[formId].isValid;
        state[formId].fields = getFields(state[formId], true);
      }

      return state;

    case INITIALIZE_FORM:
    case RESET_FORM:
      state[formId] = {
        ...previousFormState,
      };

      state[formId].data = flatten(action.payload);
      state[formId].isPristine = true;
      state[formId].isInitialized = true;
      state[formId].isSubmitted = false;
      state[formId].isSubmittable = !!state[formId].isTouched && !!state[formId].isValid;
      state[formId].isTouched = false;
      state[formId].fields = getFields(state[formId], true);

      return state;

    case SUBMIT_FORM:
      state[formId] = {
        ...previousFormState,
        isSubmitted: true,
      };

      state[formId].fields = getFields(state[formId]);

      return state;

    case CLEAR_FORM:
      state[formId] = undefined;

      return state;

    default:
      return state;
  }
};

export default reducer;
