import { useMemo, useEffect, useCallback } from 'react';
import reducer from '../redux/reducer';
import { registerForm, unregisterForm } from '@mfs-core';
import { useThunkReducer } from '../hooks/useThunkReducer';

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
 *
 * @module my-form-state/react
 *
 * @param {Object} Arguments - Arguments as object.
 * @param {string} [Arguments.formId] - the unique form id indicator, will generate a unique id if not.
 * @param {Function} [Arguments.formValidator] - the form validator.
 * @param {Object} [Arguments.initialState] - the initial state you want to use.
 * @return {MyFormStateHook} hook to be use in a react component.
 *
 * @example
 *
 *const [formState, { updateField, updateForm, submitForm, resetForm }] = useMyFormState({
 *    initialState: {},
 *    formValidator: addYUPSchemaValidator(schema),
 *});
 */

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

useMyFormState();
