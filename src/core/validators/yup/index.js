import * as async from './form-validator/async';
import * as sync from './form-validator/sync';
import * as formSchema from './form-schema';

export const yup = {
  formValidators: {
    async,
    sync,
  },
  formSchema,
};
