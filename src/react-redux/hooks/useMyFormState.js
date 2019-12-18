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
 * @kind react-redux hook.
 * @param {Object} Arguments - Arguments as object.
 * @param {string} [Arguments.formId] - The unique form id indicator, will generate a unique id if not.
 * @param {Function} [Arguments.formValidator] - The form validator.
 * @param {Object} [Arguments.initialState] - The initial state you want to use.
 * @param {boolean} [Arguments.clearOnUnmount=true] - When the component unmounts it will remove the form reference.
 * @param {boolean} [Arguments.isGlobalForm=false] - Tells if the form is defined global or not. If that is the case we will just reuse it.
 * @return {MyFormStateHook} hook to be use in a react component.
 *
 * @example
 *
 *const [formState, { updateField, updateForm, submitForm, resetForm, clearForm }] = useMyFormState({
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
    [formId, formValidator, initialState, isGlobalForm],
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
  }, [clearOnUnmount, dispatch, initialState, operations, unregister]);

  const resetForm = useCallback((param) => dispatch(operations.resetForm(param.initialState)), [dispatch, operations]);

  const updateForm = useCallback(({ data }) => dispatch(operations.updateForm(data)), [dispatch, operations]);

  const submitForm = useCallback(() => dispatch(operations.submitForm()), [dispatch, operations]);

  const updateField = useCallback(({ field, value }) => dispatch(operations.updateField({ field, value })), [
    dispatch,
    operations,
  ]);

  const clearForm = useCallback(() => dispatch(operations.clearForm()), [dispatch, operations]);

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
