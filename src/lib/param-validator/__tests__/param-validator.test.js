import ParamValidator, { IS_NOT_REQ } from '../index';

it('validateParamAndThrow to throw', () => {
  expect(() => ParamValidator.isString(undefined)).toThrow();
  expect(() => ParamValidator.isString(() => {})).toThrow();
  expect(() => ParamValidator.isString(1234)).toThrow();
  expect(() => ParamValidator.isString(1234, undefined, IS_NOT_REQ)).toThrow();

  expect(() => ParamValidator.isFunction(1234)).toThrow();
  expect(() => ParamValidator.isFunction('')).toThrow();
  expect(() => ParamValidator.isFunction(undefined)).toThrow();
  expect(() => ParamValidator.isFunction(1234, undefined, IS_NOT_REQ)).toThrow();

  expect(() => ParamValidator.isNumber('undefined')).toThrow();
  expect(() => ParamValidator.isNumber(false)).toThrow();
  expect(() => ParamValidator.isNumber('', undefined, IS_NOT_REQ)).toThrow();

  expect(() => ParamValidator.isBoolean('undefined')).toThrow();
  expect(() => ParamValidator.isBoolean('false')).toThrow();
  expect(() => ParamValidator.isBoolean('', undefined, IS_NOT_REQ)).toThrow();
});

it('validateParamAndThrow not to throw', () => {
  expect(() => ParamValidator.isString('undefined')).not.toThrow();
  expect(() => ParamValidator.isString(undefined, undefined, IS_NOT_REQ)).not.toThrow();
  expect(() => ParamValidator.isString('1234', undefined, IS_NOT_REQ)).not.toThrow();

  expect(() => ParamValidator.isFunction(() => {})).not.toThrow();
  expect(() => ParamValidator.isFunction(() => {}, undefined, IS_NOT_REQ)).not.toThrow();
  expect(() => ParamValidator.isFunction(undefined, undefined, IS_NOT_REQ)).not.toThrow();

  expect(() => ParamValidator.isNumber(0)).not.toThrow();
  expect(() => ParamValidator.isNumber(0, undefined, IS_NOT_REQ)).not.toThrow();
  expect(() => ParamValidator.isNumber(undefined, undefined, IS_NOT_REQ)).not.toThrow();

  expect(() => ParamValidator.isBoolean(true)).not.toThrow();
  expect(() => ParamValidator.isBoolean(false)).not.toThrow();
  expect(() => ParamValidator.isBoolean(undefined, undefined, IS_NOT_REQ)).not.toThrow();
  expect(() => ParamValidator.isBoolean(true, undefined, IS_NOT_REQ)).not.toThrow();
});
