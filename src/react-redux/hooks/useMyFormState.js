import { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerForm, unregisterForm } from '@mfs-core';

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
 * @module my-form-state/react-redux
 *
 * @param {Object} Arguments - Arguments as object.
 * @param {string} [Arguments.formId] - the unique form id indicator, will generate a unique id if not.
 * @param {Function} [Arguments.formValidator] - the form validator.
 * @param {Object} [Arguments.initialState] - the initial state you want to use.
 * @param {boolean} [Arguments.clearOnUnmount=true] - the unique form id indicator.
 * @return {MyFormStateHook} hook to be use in a react component.
 *
 * @example
 *
 *const [formState, { updateField, updateForm, submitForm, resetForm }] = useMyFormState({
 *    initialState: {},
 *    formValidator: addYUPSchemaValidator(schema),
 *});
 */

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

  const resetForm = useCallback(({ initialState }) => dispatch(operations.resetForm({ initialState })), [
    operations.resetForm,
  ]);

  const updateForm = useCallback(({ data }) => dispatch(operations.updateForm(data)), [operations.updateForm]);

  const submitForm = useCallback(() => dispatch(operations.submitForm()), [operations.submitForm]);

  const updateField = useCallback(({ field, value }) => dispatch(operations.updateField({ field, value })), [
    operations.updateField,
  ]);

  return [
    formState,
    {
      resetForm,
      updateForm,
      updateField,
      submitForm,
    },
  ];
};
