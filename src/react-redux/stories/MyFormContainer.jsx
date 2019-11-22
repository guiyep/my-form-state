import React, { useCallback } from 'react';
import { useMyFormState } from '../hooks/useMyFormState';
import { addYUPSchemaValidator } from '../../core';
import Form from '../../stories/shared/Form';

const MyFormContainer = ({ initialState, emptyState, schema }) => {

  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState,
    formValidator: addYUPSchemaValidator(schema),
  });

  const onFieldChangeHandler = useCallback((field, value) => updateField({ field, value }));

  const onEmptyHandler = useCallback(() => resetForm({ initialState: emptyState }));

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={submitForm}
      onClear={onEmptyHandler}
      onReset={resetForm}
    ></Form>
  );
};

export default MyFormContainer;
