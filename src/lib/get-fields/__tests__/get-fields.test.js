import { getFields } from '../index';

const data = {
  data: { name: 'Jonssss', familyName: 'Doe', alias: 'guiyepss', favoriteColor: 'red' },
  isPristine: false,
  isInitialized: true,
  isSubmitted: false,
  isSubmittable: true,
  isTouched: true,
  fields: {
    name: {
      alias: 'test',
    },
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
  errors: {},
  isInvalid: false,
  isValid: true,
  dirtyFields: { name: true },
};

it('getFields, update only value passing updateValueOnly true', () => {
  const fields = getFields(data, true);

  expect(fields.alias).toEqual({
    value: 'guiyepss',
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
