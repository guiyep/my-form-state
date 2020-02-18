import React, { useCallback, useEffect } from 'react';
import { useMyFormState } from '../hooks/useMyFormState';
import { formSchema } from '../../core/validators/yup/form-schema';
import Form from '../../stories/shared/Form';

const MyFormContainer = ({ initialState, emptyState, schema, onFormWasUpdated, onSubmit }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState,
    formSchema: schema && formSchema(schema),
  });

  const onFieldChangeHandler = useCallback((field, value) => updateField({ field, value }), [updateField]);

  const onEmptyHandler = useCallback(() => resetForm({ initialState: emptyState }), [resetForm, emptyState]);

  // this is only for testing purposes
  useEffect(() => onFormWasUpdated(formState), [formState]);

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={onSubmitHandler}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyFormContainer;
