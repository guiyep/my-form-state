import { useMemo, useEffect, useCallback } from 'react';
import { registerForm } from '@mfs-core';
import reducer from '../redux/reducer';
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
 * - removeForm
 *
 * @kind React Hook
 * @param {*} arguments - arguments as object.
 * @param {string} [arguments.formId] - The unique form id indicator, will generate a unique id if not.
 * @param {Function} [arguments.formSchema] - The form schema. This can be json-schema, yup or joi.
 * @param {Function} [arguments.formValidator] - The form validator.
 * @param {Object} [arguments.initialState] - The initial state you want to use.
 * @return {MyFormStateHook} Hook to be use in a React component.
 *
 * @example
 *
 *const [formState, { updateField, updateForm, submitForm, resetForm}] = useMyFormState({
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
      dispatch(operations.removeForm({ dispatch, state }));
    };
  }, []);

  const resetForm = useCallback((param) => dispatch(operations.resetForm({ initialState: param.initialState })), [
    operations.resetForm,
  ]);

  const updateForm = useCallback(({ data }) => dispatch(operations.updateForm({ data })), [operations.updateForm]);

  const submitForm = useCallback(() => dispatch(operations.submitForm()), [operations.submitForm]);

  const updateField = useCallback(({ field, value }) => dispatch(operations.updateField({ field, value })), [
    operations.updateField,
  ]);

  const thisForm = getForm(state);

  return [
    thisForm,
    {
      resetForm,
      updateForm,
      updateField,
      submitForm,
    },
  ];
};
