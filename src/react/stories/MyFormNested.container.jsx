import React, { useCallback, useEffect } from 'react';
import { useMyFormState } from '../hooks/useMyFormState';
import { yupSyncSchemaValidator } from '../../core';
import FormNested from '../../stories/shared/FormNested';

const MyFormNestedContainer = ({ initialState, emptyState, schema, onFormWasUpdated }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState,
    formValidator: yupSyncSchemaValidator(schema),
  });

  // this is only for testing purposes
  useEffect(() => onFormWasUpdated(formState), [formState]);

  const onFieldChangeHandler = useCallback((field, value) => updateField({ field, value }), [updateField]);

  const onEmptyHandler = useCallback(() => resetForm({ initialState: emptyState }), [emptyState, resetForm]);

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

export default MyFormNestedContainer;
