import { formValidator } from '../form-validator/sync';

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    familyName: {
      type: 'string',
    },
    favoriteColor: {
      type: 'string',
    },
    alias: {
      type: 'string',
    },
  },
  required: ['name', 'familyName', 'favoriteColor', 'alias'],
};

const schema2 = {
  type: 'object',
  properties: {
    sub: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
        },
      },
      required: ['text'],
    },
  },
  required: ['sub'],
};

it('formValidator to throw if no schema', () => {
  expect(() => formValidator()).toThrow();
});

it('formValidator to not throw if schema', () => {
  expect(() => formValidator(schema)).not.toThrow();
});

it('formValidator to return errors', () => {
  const resultValidation = formValidator(schema)({});
  expect(resultValidation).toEqual({
    alias: `should have required property 'alias'`,
    familyName: `should have required property 'familyName'`,
    favoriteColor: `should have required property 'favoriteColor'`,
    name: `should have required property 'name'`,
  });

  const resultValidation2 = formValidator(schema)({ alias: 123 });
  expect(resultValidation2).toEqual({
    alias: `should be string`,
    familyName: `should have required property 'familyName'`,
    favoriteColor: `should have required property 'favoriteColor'`,
    name: `should have required property 'name'`,
  });

  const resultValidation3 = formValidator(schema2)({ sub: 123 });
  expect(resultValidation3).toEqual({
    sub: `should be object`,
  });
  const resultValidation4 = formValidator(schema2)({ sub: { text: 123 } });
  expect(resultValidation4).toEqual({
    'sub.text': `should be string`,
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
