import { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerForm, getFormFromRegistry } from '@mfs-core';

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
 * @module my-form-state/react-redux
 *
 * @param {Object} Arguments - Arguments as object.
 * @param {string} [Arguments.formId] - the unique form id indicator, will generate a unique id if not.
 * @param {Function} [Arguments.formValidator] - the form validator.
 * @param {Object} [Arguments.initialState] - the initial state you want to use.
 * @param {boolean} [Arguments.clearOnUnmount=true] - the unique form id indicator.
 * @param {boolean} [Arguments.isGlobalForm=false] - tells if the form is defined global or not. If that is the case we will just reuse it.
 * @return {MyFormStateHook} hook to be use in a react component {@link MyFormStateHook}.
 *
 * @example
 *
 *const [formState, { updateField, updateForm, submitForm, resetForm }] = useMyFormState({
 *    initialState: {},
 *    formValidator: addYUPSyncSchemaValidator(schema),
 *});
 */

export const useMyFormState = ({
  formId,
  formValidator,
  initialState,
  clearOnUnmount = true,
  isGlobalForm = false,
}) => {
  const {
    operations,
    selectors: { getForm },
    unregister,
  } = useMemo(
    () =>
      ((!isGlobalForm && registerForm) || getFormFromRegistry)({
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
      unregister();
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

  const clearForm = useCallback(() => dispatch(operations.clearForm()), [operations.clearForm]);

  return [
    formState,
    {
      resetForm,
      updateForm,
      updateField,
      submitForm,
      clearForm,
    },
  ];
};
