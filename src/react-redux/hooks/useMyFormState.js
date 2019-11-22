import { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerForm, unregisterForm } from '@mfs-core';

export const useMyFormState = ({ formId, formValidator, initialState, clearOnUnmount = true }) => {
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

  const formState = useSelector(getForm());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.initializeForm({ initialState }));
    return () => {
      unregisterForm({ formId: formInfo.formId });
      if (clearOnUnmount) {
        dispatch(operations.clearForm());
      }
    };
  }, []);

  const resetForm = useCallback((args) => dispatch(operations.resetForm(args)), [operations.resetForm]);
  const updateForm = useCallback((args) => dispatch(operations.updateForm(args)), [operations.updateForm]);
  const submitForm = useCallback((args) => dispatch(operations.submitForm(args)), [operations.submitForm]);
  const updateField = useCallback((args) => dispatch(operations.updateField(args)), [operations.updateField]);

  return [formState, { resetForm, updateForm, updateField, submitForm }];
};
