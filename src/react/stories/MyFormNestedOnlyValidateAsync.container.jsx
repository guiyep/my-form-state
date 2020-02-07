import React, { useCallback, useEffect } from 'react';
import { useMyFormState } from '../hooks/useMyFormState';
import formValidatorAsync from '../../core/validators/yup/form-validator/async';
import FormNested from '../../stories/shared/FormNested';

const MyFormNestedOnlyValidateAsyncContainer = ({ initialState, emptyState, schema, onFormWasUpdated, onSubmit }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState,
    formValidator: formValidatorAsync(schema),
  });

  // this is only for testing purposes
  useEffect(() => onFormWasUpdated(formState), [formState]);

  const onFieldChangeHandler = useCallback((field, value) => updateField({ field, value }), [updateField]);

  const onEmptyHandler = useCallback(() => resetForm({ initialState: emptyState }), [emptyState, resetForm]);

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <FormNested
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={onSubmitHandler}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyFormNestedOnlyValidateAsyncContainer;
