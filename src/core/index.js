import * as operationsRedux from '@mfs-redux/forms/operations';
import * as selectorsRedux from '@mfs-redux/forms/selectors';
import {
  addFormToRegistry,
  removeFormFromRegistry,
  getFormFromRegistry as getFormFromInternalRegistry,
} from '@mfs-registry';
import { uuid } from '@mfs-lib/uuid';
import { flatten, unflatten } from '@mfs-lib/flat';
import { validateParamAndThrow } from '@mfs-lib/validate-param';

const scopeModuleToForm = (moduleMap, originalArgs) => {
  return Object.keys(moduleMap).reduce((acc, name) => {
    acc[name] = (args = {}) => {
      return moduleMap[name]({ ...originalArgs, ...args });
    };
    return acc;
  }, {});
};

export const registerForm = ({ formId = uuid(), formValidator, initialState }) => {
  validateParamAndThrow(formId, 'string', 'formId');
  validateParamAndThrow(formValidator, 'function', 'formValidator', false);
  validateParamAndThrow(initialState, 'function', 'initialState', false);

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
  };
};

export const unregisterForm = ({ formId }) => {
  validateParamAndThrow(formId, 'string', 'formId');
  removeFormFromRegistry(formId);
};

export const getFormFromRegistry = ({ formId }) => {
  validateParamAndThrow(formId, 'string', 'formId');

  const form = getFormFromInternalRegistry(formId);
  if (!form) {
    throw new Error(`the formId ${formId} is not valid and doesn't exists`);
  }
};

export * from './validators/yup';

export default registerForm;
