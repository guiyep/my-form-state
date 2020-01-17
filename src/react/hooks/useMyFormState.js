import { useMemo, useEffect, useCallback } from 'react';
import reducer from '../redux/reducer';
import { registerForm } from '@mfs-core';
import { useThunkReducer } from './useThunkReducer';
import { gerDefaultReducerProp } from '../../redux/init';

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
 * @param {Function} [Arguments.formSchema] - The form schema. This can be json-schema, yup or joi.
 * @param {Function} [Arguments.formValidator] - The form validator.
 * @param {Object} [Arguments.initialState] - The initial state you want to use.
 * @return {MyFormStateHook} Hook to be use in a React component.
 *
 * @example
 *
 *const [formState, { updateField, updateForm, submitForm, resetForm, clearForm}] = useMyFormState({
 *    initialState: {},
 *    formValidator: formValidator(schema),
 *});
 */

export const useMyFormState = ({ formId, formValidator, formSchema, initialState }) => {
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
        formSchema,
      }),
    [],
  );

  const [state, dispatch] = useThunkReducer(reducer, { [gerDefaultReducerProp()]: {} });

  useEffect(() => {
    dispatch(operations.initializeForm({ initialState }));
    return () => {
      unregister();
      dispatch(operations.clearForm({ dispatch, state }));
    };
  }, []);

  const resetForm = useCallback((param) => dispatch(operations.resetForm(param.initialState)), [operations.resetForm]);

  const updateForm = useCallback(({ data }) => dispatch(operations.updateForm({ data })), [operations.updateForm]);

  const submitForm = useCallback(() => dispatch(operations.submitForm()), [operations.submitForm]);

  const updateField = useCallback(({ field, value }) => dispatch(operations.updateField({ field, value })), [
    operations.updateField,
  ]);

  const clearForm = useCallback(() => dispatch(operations.clearForm()), [operations.clearForm]);

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
