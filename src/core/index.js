import * as operationsRedux from '@mfs-redux/forms/operations';
import * as selectorsRedux from '@mfs-redux/forms/selectors';
import { uuid } from '@mfs-lib/uuid';
import { flatten, unflatten } from '@mfs-lib/flat';
import ParamValidator, { IS_NOT_REQ } from '@mfs-lib/param-validator';
import {
  addFormToRegistry,
  removeFormFromRegistry,
  getFormFromRegistry as getFormFromInternalRegistry,
} from '@mfs-registry';

const scopeModuleToForm = (moduleMap, originalArgs) => {
  return Object.keys(moduleMap).reduce((acc, name) => {
    acc[name] = (args = {}) => {
      return moduleMap[name]({ ...originalArgs, ...args });
    };
    return acc;
  }, {});
};

/**
 * @typedef {object} MyForm.
 * @property {{ resetForm: function, validateForm: function, updateForm: function, submitForm: function, updateField: function, clearForm: function }} operations - form operations to be dispatched.
 * @property {{ getForm: function }} selectors - form selectors.
 * @property {string} formId - unique form indicator.
 */

/**
 * Remove a registered form from the `my-form-state` registry.
 *
 * @module my-form-state/core
 * @param {Object} Arguments - Arguments as object.
 * @param {string} [Arguments.formId] - the unique form id indicator.
 * @return undefined
 * @throws if formId is falsy
 *
 * @example
 *
 * unregisterForm({
 *    formId,
 *});
 */

const unregisterForm = ({ formId }) => {
  ParamValidator.isString(formId, 'formId');
  removeFormFromRegistry(formId);
};

/**
 * Register a form in the `my-form-state` registry and expose all the functionality available for being used in redux.
 *
 * @module my-form-state/core
 * @param {Object} Arguments - Arguments as object.
 * @param {string} [Arguments.formId] - the unique form id indicator, will generate a unique id if not.
 * @param {Function} [Arguments.formValidator] - the form validator function.
 * @param {Object} [Arguments.initialState] - the initial state you want to use.
 * @return {MyForm} - available functionality for the form {@link MyForm}
 *
 * @example
 *
 *const { formId, operations, selectors, unregister } = registerForm({
 *    initialState: {},
 *    formValidator: addYUPSyncSchemaValidator(schema),
 *});
 */

export const registerForm = ({ formId = uuid(), formValidator, initialState }) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isFunction(formValidator, 'formValidator', IS_NOT_REQ);
  ParamValidator.isObject(initialState, 'initialState', IS_NOT_REQ);

  // protect the initial state
  const initial = Object.freeze({ ...initialState });

  addFormToRegistry(formId, {
    formValidator,
    initialState: initial,
    initialFields: unflatten(
      Object.entries(flatten(initial)).reduce((acc, [key, val]) => {
        acc[key] = {
          value: val,
        };
        return acc;
      }, {}),
    ),
  });

  return {
    operations: scopeModuleToForm(operationsRedux, { formId }),
    selectors: scopeModuleToForm(selectorsRedux, { formId }),
    formId,
    unregister: () => unregisterForm({ formId }),
  };
};

/**
 * Get an already registered form from the `my-form-state` registry.
 *
 * @module my-form-state/core
 * @param {Object} Arguments - Arguments as object.
 * @param {string} [Arguments.formId] - the unique form id.
 * @return {MyForm} - available functionality for the form {@link MyForm}
 * @throws if formId is falsy.
 * @throws if form was not found.
 *
 * @example
 *
 * unregisterForm({
 *    formId,
 *});
 */

export const getFormFromRegistry = ({ formId }) => {
  ParamValidator.isString(formId, 'formId');

  const form = getFormFromInternalRegistry(formId);
  if (!form) {
    throw new Error(`the formId ${formId} is not valid and doesn't exists`);
  }
};

export * from './validators/yup';

export default registerForm;
