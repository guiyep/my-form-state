import ParamValidator from '../index';

it('validateParamAndThrow to throw', () => {
  expect(() => ParamValidator.isString(undefined)).toThrow();
  expect(() => ParamValidator.isString(() => {})).toThrow();
  expect(() => ParamValidator.isString(1234)).toThrow();
  expect(() => ParamValidator.notRequired.isString(1234, undefined)).toThrow();

  expect(() => ParamValidator.isFunction(1234)).toThrow();
  expect(() => ParamValidator.isFunction('')).toThrow();
  expect(() => ParamValidator.isFunction(undefined)).toThrow();
  expect(() => ParamValidator.notRequired.isFunction(1234, undefined)).toThrow();

  expect(() => ParamValidator.isNumber('undefined')).toThrow();
  expect(() => ParamValidator.isNumber(false)).toThrow();
  expect(() => ParamValidator.isNumber('', undefined)).toThrow();

  expect(() => ParamValidator.isBoolean('undefined')).toThrow();
  expect(() => ParamValidator.isBoolean('false')).toThrow();
  expect(() => ParamValidator.notRequired.isBoolean('', undefined)).toThrow();
});

it('validateParamAndThrow not to throw', () => {
  expect(() => ParamValidator.isString('undefined')).not.toThrow();
  expect(() => ParamValidator.notRequired.isString(undefined, undefined)).not.toThrow();
  expect(() => ParamValidator.notRequired.isString('1234', undefined)).not.toThrow();

  expect(() => ParamValidator.isFunction(() => {})).not.toThrow();
  expect(() => ParamValidator.notRequired.isFunction(() => {}, undefined)).not.toThrow();
  expect(() => ParamValidator.notRequired.isFunction(undefined, undefined)).not.toThrow();

  expect(() => ParamValidator.isNumber(0)).not.toThrow();
  expect(() => ParamValidator.notRequired.isNumber(0, undefined)).not.toThrow();
  expect(() => ParamValidator.notRequired.isNumber(undefined, undefined)).not.toThrow();

  expect(() => ParamValidator.isBoolean(true)).not.toThrow();
  expect(() => ParamValidator.isBoolean(false)).not.toThrow();
  expect(() => ParamValidator.notRequired.isBoolean(undefined, undefined)).not.toThrow();
  expect(() => ParamValidator.notRequired.isBoolean(true, undefined)).not.toThrow();
});
