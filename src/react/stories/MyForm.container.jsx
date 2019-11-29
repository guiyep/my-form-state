import React, { useCallback, useEffect } from 'react';
import { useMyFormState } from '../hooks/useMyFormState';
import { addYUPSchemaValidator } from '../../core';
import Form from '../../stories/shared/Form';

const MyFormContainer = ({ initialState, emptyState, schema, onFormWasUpdated }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState,
    formValidator: addYUPSchemaValidator(schema),
  });

  const onFieldChangeHandler = useCallback((field, value) => updateField({ field, value }));

  const onEmptyHandler = useCallback(() => resetForm({ initialState: emptyState }));

  // this is only for testing purposes
  useEffect(() => onFormWasUpdated(formState), [formState]);

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={submitForm}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyFormContainer;