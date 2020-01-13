import * as async from './form-validator/async';
import * as sync from './form-validator/sync';
import * as formDefinition from './form-definition';
import * as formSchema from './form-schema';

export const yup = {
  formValidators: {
    async,
    sync,
  },
  formDefinition,
  formSchema,
};
