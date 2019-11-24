import React, { useCallback } from 'react';
import { useMyFormState } from '../hooks/useMyFormState';
import { addYUPSchemaValidator } from '../../core';
import FormNested from '../../stories/shared/FormNested';

const MyFormContainer = ({ initialState, emptyState, schema }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState,
    formValidator: addYUPSchemaValidator(schema),
  });

  const onFieldChangeHandler = useCallback((field, value) => updateField({ field, value }));

  const onEmptyHandler = useCallback(() => resetForm({ initialState: emptyState }));

  return (
    <FormNested
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={submitForm}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyFormContainer;
