import React, { useCallback } from 'react';
import { useMyFormState } from '../hooks/useMyFormState';
import { formSchema } from '../../core/validators/yup/form-schema';
import FormNested from '../../stories/shared/FormNested';

const MyFormNestedContainer = ({ initialState, emptyState, schema, onSubmit }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState,
    formSchema: schema && formSchema(schema),
  });

  const onFieldChangeHandler = useCallback((field, value) => updateField({ field, value }), [updateField]);

  const onEmptyHandler = useCallback(() => resetForm({ initialState: emptyState }), [resetForm, emptyState]);

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

export default MyFormNestedContainer;
