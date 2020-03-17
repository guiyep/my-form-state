import { unflatten } from '../flat';
import { get } from '../get';

export const getFields = (formState = {}, updateValueOnly = false) => {
  const data = { ...(formState.initialData || {}), ...(formState.data || {}) };
  return (
    data &&
    unflatten(
      Object.keys(data).reduce((acc, fieldName) => {
        const isTouched = !!formState.dirtyFields && !!formState.dirtyFields[fieldName];
        const error = formState.errors && formState.errors[fieldName];
        const isSubmitted = formState.isSubmitted;

        if (!updateValueOnly) {
          // only after validating we need to the whole field state
          acc[fieldName] = {
            value: data[fieldName],
            isPristine: !isTouched,
            isTouched,
            isSubmitted,
            isInitialized: formState.isInitialized,
            error,
            isValid: !formState.errors || !error,
            isInvalid: !!formState.errors && !!error,
            showError: (isTouched || isSubmitted) && !!error,
            path: fieldName,
          };
          return acc;
        }

        const updateValueField = get(formState.fields, fieldName) || {};

        // before validating only update the value
        updateValueField.value = data[fieldName];

        acc[fieldName] = updateValueField;
        return acc;
      }, {}),
    )
  );
};
