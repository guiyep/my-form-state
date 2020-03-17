import Ajv from 'ajv';

export const ajv = new Ajv({ allErrors: true });

export default ajv;
