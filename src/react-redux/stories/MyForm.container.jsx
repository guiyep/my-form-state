import React, { useCallback } from 'react';
import { useMyFormState } from '../hooks/useMyFormState';
import yup from '../../core/validators/yup';
import ajv from '../../core/validators/json-schema/ajv';
import Form from '../../stories/shared/Form';

const MyForm = ({ initialState, emptyState, schema, jsonSchemaUsingAjv, onSubmit }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState,
    formSchema: (schema && yup.formSchema(schema)) || (jsonSchemaUsingAjv && ajv.formSchema(jsonSchemaUsingAjv)),
  });

  const onFieldChangeHandler = useCallback((field, value) => updateField({ field, value }), [updateField]);

  const onEmptyHandler = useCallback(() => resetForm({ initialState: emptyState }), [resetForm, emptyState]);

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

export default MyForm;
