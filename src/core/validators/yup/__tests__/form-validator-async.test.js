import * as YUP from 'yup';
import { formValidator } from '../form-validator/async';

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

it('formValidator to return errors', async () => {
  const resultValidation = formValidator(schema)({});
  await expect(resultValidation).resolves.toEqual({
    alias: 'alias is a required field',
    familyName: 'familyName is a required field',
    favoriteColor: 'favoriteColor is a required field',
    name: 'name is a required field',
  });
});

it('formValidator to return errors 2', async () => {
  const resultValidation = formValidator(schema)({
    alias: 'xxx',
    familyName: 'xxx',
    favoriteColor: 'xxx',
  });
  await expect(resultValidation).resolves.toEqual({
    name: 'name is a required field',
  });
});

it('formValidator to return all valid', async () => {
  const resultValidation = formValidator(schema)({
    alias: 'xxx',
    familyName: 'xxx',
    favoriteColor: 'xxx',
    name: 'xxx',
  });
  await expect(resultValidation).resolves.toEqual(undefined);
});
