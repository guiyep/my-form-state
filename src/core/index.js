import * as operationsRedux from '@mfs-redux/forms/operations';
import * as selectorsRedux from '@mfs-redux/forms/selectors';
import { uuid } from '@mfs-lib/uuid';
import { flatten, unflatten } from '@mfs-lib/flat';
import { getFlatMap } from '@mfs-lib/json-schema-parser';
import ParamValidator from '@mfs-lib/param-validator';
import {
  addFormToRegistry,
  removeFormFromRegistry,
  getFormFromRegistry as getFormFromInternalRegistry,
} from '@mfs-registry';

const scopeOperationToForm = (moduleMap, originalArgs) => {
  return Object.keys(moduleMap).reduce((acc, name) => {
    acc[name] = (args = {}) => {
      return moduleMap[name]({ ...originalArgs, ...args });
    };
    return acc;
  }, {});
};

const scopeSelectorToForm = (moduleMap, originalArgs) => {
  return Object.keys(moduleMap).reduce((acc, name) => {
    acc[name] = (state) => {
      return moduleMap[name](state, { ...originalArgs });
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
 * @kind function
 * @param {*} arguments - arguments as object.
 * @param {string} [arguments.formId] - the unique form id indicator.
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
 * This is used for reusing the selectors and operations for a particular form in any place of an app. Once is not used remember to
 * remove the reference with `unregisterForm`.
 *
 *
 * @kind function
 * @param {*} arguments - arguments as object.
 * @param {String} [arguments.formId] - the unique form id indicator, will generate a unique id if not.
 * @param {Function} [arguments.formValidator] - the form validator function.
 * @param {Function} [arguments.formSchema] - the form schema function.
 * @param {Object} [arguments.initialState] - the initial state you want to use.
 * @return {MyForm} - available functionality for the form {@link MyForm}
 *
 * @example
 *
 *const { formId, operations, selectors, unregister } = registerForm({
 *    initialState: {},
 *    formSchema: formSchema(schema),
 *});
 */

export const registerForm = ({ formId = uuid(), formValidator, formSchema, initialState }) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.notRequired.isFunction(formValidator, 'formValidator');
  ParamValidator.notRequired.isObject(initialState, 'initialState');

  // protect the initial state
  const initial = Object.freeze({ ...initialState });

  const formSchemaResolved =
    typeof formSchema === 'function'
      ? formSchema()
      : {
          jsonSchema: formSchema,
        };

  if (formSchemaResolved.jsonSchema) {
    formSchemaResolved.fieldsDefinition = getFlatMap({ jsonSchema: formSchemaResolved.jsonSchema });
  }

  if (formValidator) {
    formSchemaResolved.formValidator = formValidator;
  }

  addFormToRegistry(formId, {
    ...formSchemaResolved,
    initialState: initial,
    initialFields: unflatten(
      Object.entries(flatten(initial, formSchemaResolved.jsonSchemaFlatMap)).reduce((acc, [key, val]) => {
        acc[key] = {
          value: val,
        };
        return acc;
      }, {}),
    ),
  });

  return {
    operations: scopeOperationToForm(operationsRedux, { formId }),
    selectors: scopeSelectorToForm(selectorsRedux, { formId }),
    formId,
    unregister: () => unregisterForm({ formId }),
  };
};

/**
 * Get an already registered form from the `my-form-state` registry.
 *
 * @kind function
 * @param {*} arguments - arguments as object.
 * @param {string} [arguments.formId] - the unique form id.
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
