import { useMemo, useEffect, useCallback } from 'react';
import reducer from '../redux/reducer';
import { registerForm } from '@mfs-core';
import { useThunkReducer } from './useThunkReducer';

/**
 * @typedef {object} formState
 * @property {string} fromId
 */

/**
 * @typedef {[formState, { resetForm: function, updateForm: function, submitForm:function, updateField: function}]} MyFormStateHook
 */

/**
 * React-redux hook that will execute an update each time the redux form state changes. you will be able to
 * perform any of the next actions:
 * - resetForm
 * - updateForm
 * - submitForm : Promise. (will be resolve when the form is locked)
 * - updateField
 * - clearForm
 *
 * @kind React Hook
 * @param {Object} Arguments - Arguments as object.
 * @param {string} [Arguments.formId] - The unique form id indicator, will generate a unique id if not.
 * @param {Function} [Arguments.formValidator] - The form validator.
 * @param {Object} [Arguments.initialState] - The initial state you want to use.
 * @return {MyFormStateHook} Hook to be use in a React component.
 *
 * @example
 *
 *const [formState, { updateField, updateForm, submitForm, resetForm, clearForm}] = useMyFormState({
 *    initialState: {},
 *    formValidator: yupSyncSchemaValidator(schema),
 *});
 */

export const useMyFormState = ({ formId, formValidator, initialState }) => {
  const {
    operations,
    selectors: { getForm },
    unregister,
  } = useMemo(
    () =>
      registerForm({
        formId,
        formValidator,
        initialState,
      }),
    [formId, formValidator, initialState],
  );

  const [state, dispatch] = useThunkReducer(reducer, { forms: {} });

  useEffect(() => {
    dispatch(operations.initializeForm({ initialState }));
    return () => {
      unregister();
      dispatch(operations.clearForm({ dispatch, state }));
    };
  }, [dispatch, initialState, operations, state, unregister]);

  const resetForm = useCallback((param) => dispatch(operations.resetForm(param.initialState)), [dispatch, operations]);

  const updateForm = useCallback(({ data }) => dispatch(operations.updateForm({ data })), [dispatch, operations]);

  const submitForm = useCallback(() => dispatch(operations.submitForm()), [dispatch, operations]);

  const updateField = useCallback(({ field, value }) => dispatch(operations.updateField({ field, value })), [
    dispatch,
    operations,
  ]);

  const clearForm = useCallback(() => dispatch(operations.clearForm()), [dispatch, operations]);

  const thisForm = getForm()(state);

  return [
    thisForm,
    {
      resetForm,
      updateForm,
      updateField,
      submitForm,
      clearForm,
    },
  ];
};
