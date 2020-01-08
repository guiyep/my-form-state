import { getFields } from '../index';

const data = {
  data: { name: 'Jonssss', familyName: 'Doe', alias: 'guiyepss', favoriteColor: 'red', name2: 'test' },
  isPristine: false,
  isInitialized: true,
  isSubmitted: false,
  isSubmittable: true,
  isTouched: true,
  fields: {
    name: {
      value: 'test',
      isPristine: false,
      isTouched: true,
      isSubmitted: false,
      isInitialized: true,
      isValid: true,
      isInvalid: false,
      showError: false,
      path: 'name',
    },
  },
  errors: { favoriteColor: 'this is invalid', name2: 'invalid' },
  isInvalid: false,
  isValid: true,
  dirtyFields: { name: true, name2: true },
};

it('getFields, update only value passing updateValueOnly true', () => {
  const thisData = { ...data };
  const fields = getFields(thisData, true);

  expect(fields.alias).toEqual({
    value: 'guiyepss',
  });

  expect(fields.familyName).toEqual({
    value: 'Doe',
  });

  expect(fields.favoriteColor).toEqual({
    value: 'red',
  });

  expect(fields.name).toEqual({
    isInitialized: true,
    isInvalid: false,
    isPristine: false,
    isSubmitted: false,
    isTouched: true,
    isValid: true,
    path: 'name',
    showError: false,
    value: 'Jonssss',
  });
});

it('getFields, getting the full state no dirty or error', () => {
  const thisData = { ...data };
  const fields = getFields(thisData);

  expect(fields.alias).toEqual({
    isInitialized: true,
    isInvalid: false,
    isPristine: true,
    isSubmitted: false,
    isTouched: false,
    isValid: true,
    path: 'alias',
    showError: false,
    value: 'guiyepss',
  });
});

it('getFields, getting the full state with dirty', () => {
  const thisData = { ...data };
  const fields = getFields(thisData);

  expect(fields.name).toEqual({
    isInitialized: true,
    isInvalid: false,
    isPristine: false,
    isSubmitted: false,
    isTouched: true,
    isValid: true,
    path: 'name',
    showError: false,
    value: 'Jonssss',
  });
});

it('getFields, getting the full state with error', () => {
  const thisData = { ...data };
  const fields = getFields(thisData);

  expect(fields.favoriteColor).toEqual({
    error: 'this is invalid',
    isInitialized: true,
    isInvalid: true,
    isPristine: true,
    isSubmitted: false,
    isTouched: false,
    isValid: false,
    path: 'favoriteColor',
    showError: false,
    value: 'red',
  });
});

it('getFields, getting the full state with error and dirty (need to show error)', () => {
  const thisData = { ...data };
  const fields = getFields(thisData);

  expect(fields.name2).toEqual({
    error: 'invalid',
    isInitialized: true,
    isInvalid: true,
    isPristine: false,
    isSubmitted: false,
    isTouched: true,
    isValid: false,
    path: 'name2',
    showError: true,
    value: 'test',
  });
});

it('getFields, submitted', () => {
  const thisData = { ...data };
  thisData.isSubmitted = true;
  const fields = getFields(thisData);

  expect(fields.name2).toEqual({
    error: 'invalid',
    isInitialized: true,
    isInvalid: true,
    isPristine: false,
    isSubmitted: true,
    isTouched: true,
    isValid: false,
    path: 'name2',
    showError: true,
    value: 'test',
  });
});

it('getFields, returns new object as fields', () => {
  const thisData = { ...data };
  const fields = getFields(thisData);
  expect(fields).not.toBe(thisData.field);
});
