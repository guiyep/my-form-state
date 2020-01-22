import * as YUP from 'yup';
import { formValidator } from '../form-validator/sync';

const schema = YUP.object().shape({
  name: YUP.string().required(),
  familyName: YUP.string().required(),
  favoriteColor: YUP.string().required(),
  alias: YUP.string().required(),
});

it('formValidator to throw if no schema', () => {
  expect(() => formValidator()).toThrow();
});

it('formValidator to not throw if schema', () => {
  expect(() => formValidator(schema)).not.toThrow();
});

it('formValidator to return errors', () => {
  const resultValidation = formValidator(schema)({});
  expect(resultValidation).toEqual({
    alias: 'alias is a required field',
    familyName: 'familyName is a required field',
    favoriteColor: 'favoriteColor is a required field',
    name: 'name is a required field',
  });
});

it('formValidator to return errors 2', () => {
  const resultValidation = formValidator(schema)({
    alias: 'xxx',
    familyName: 'xxx',
    favoriteColor: 'xxx',
  });
  expect(resultValidation).toEqual({
    name: 'name is a required field',
  });
});

it('formValidator to return all valid', () => {
  const resultValidation = formValidator(schema)({
    alias: 'xxx',
    familyName: 'xxx',
    favoriteColor: 'xxx',
    name: 'xxx',
  });
  expect(resultValidation).toEqual(undefined);
});
