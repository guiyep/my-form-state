import { unflatten } from '../flat';

export const getFields = (formState, updateValueOnly = false) =>
  formState &&
  formState.data &&
  unflatten(
    Object.keys(formState.data).reduce((acc, fieldName) => {
      const isTouched = !!formState.dirtyFields && !!formState.dirtyFields[fieldName];
      const error = formState.errors && formState.errors[fieldName];
      const isSubmitted = formState.isSubmitted;

      if (!updateValueOnly) {
        // only after validating we need to the whole field state
        acc[fieldName] = {
          value: formState.data[fieldName],
          isPristine: !isTouched,
          isTouched,
          isSubmitted,
          isInitialized: formState.isInitialized,
          error,
          isValid: !formState.errors || !error,
          isInvalid: !!formState.errors && !!error,
          showError: (isTouched || isSubmitted) && !!error,
        };
        return acc;
      }

      let updateValueField = {};

      if (formState.fields && formState.fields[fieldName]) {
        updateValueField = formState.fields[fieldName];
      }

      // before validating only update the value
      updateValueField.value = formState.data[fieldName];

      acc[fieldName] = updateValueField;
      return acc;
    }, {}),
  );