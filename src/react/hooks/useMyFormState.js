import { useMemo, useEffect, useCallback } from 'react';
import reducer from '../redux/reducer';
import { registerForm, unregisterForm } from '@mfs-core';
import { useThunkReducer } from '../hooks/useThunkReducer';

export const useMyFormState = ({ formId, formValidator, initialState }) => {
  const {
    operations,
    selectors: { getForm },
    ...formInfo
  } = useMemo(
    () =>
      registerForm({
        formId,
        formValidator,
        initialState,
      }),
    [],
  );

  const [state, dispatch] = useThunkReducer(reducer, { forms: {} });

  useEffect(() => {
    dispatch(operations.initializeForm({ initialState }));
    return () => {
      unregisterForm({ formId: formInfo.formId, dispatch, state });
      dispatch(operations.clearForm({ dispatch, state }));
    };
  }, []);

  const resetForm = useCallback(({ initialState }) => dispatch(operations.resetForm({ initialState })), [
    operations.resetForm,
  ]);

  const updateForm = useCallback(({ data }) => dispatch(operations.updateForm({ data })), [operations.updateForm]);

  const submitForm = useCallback(() => dispatch(operations.submitForm()), [operations.submitForm]);

  const updateField = useCallback(({ field, value }) => dispatch(operations.updateField({ field, value })), [
    operations.updateField,
  ]);

  const thisForm = getForm()(state);

  return [thisForm, { resetForm, updateForm, updateField, submitForm }];
};
