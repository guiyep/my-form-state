import { validateParamAndThrow, Types } from '../index';

it('validateParamAndThrow to throw', () => {
  expect(() => validateParamAndThrow(undefined, Types.STRING)).toThrow();
  expect(() => validateParamAndThrow(() => {}, Types.STRING)).toThrow();
  expect(() => validateParamAndThrow(1234, Types.STRING)).toThrow();
  expect(() => validateParamAndThrow(1234, Types.STRING, undefined, false)).toThrow();
  expect(() => validateParamAndThrow(1234, Types.FUNCTION)).toThrow();
  expect(() => validateParamAndThrow('', Types.FUNCTION)).toThrow();
  expect(() => validateParamAndThrow(undefined, Types.FUNCTION)).toThrow();
  expect(() => validateParamAndThrow(1234, Types.FUNCTION, undefined, false)).toThrow();
  expect(() => validateParamAndThrow('undefined', 'number')).toThrow();
  expect(() => validateParamAndThrow(false, 'number')).toThrow();
  expect(() => validateParamAndThrow('', 'number', undefined, false)).toThrow();
  expect(() => validateParamAndThrow('undefined', Types.BOOLEAN)).toThrow();
  expect(() => validateParamAndThrow('false', Types.BOOLEAN)).toThrow();
  expect(() => validateParamAndThrow('', Types.BOOLEAN, undefined, false)).toThrow();
});

it('validateParamAndThrow not to throw', () => {
  expect(() => validateParamAndThrow('undefined', Types.STRING)).not.toThrow();
  expect(() => validateParamAndThrow(undefined, Types.STRING, undefined, false)).not.toThrow();
  expect(() => validateParamAndThrow('1234', Types.STRING, undefined, false)).not.toThrow();
  expect(() => validateParamAndThrow(() => {}, Types.FUNCTION)).not.toThrow();
  expect(() => validateParamAndThrow(() => {}, Types.FUNCTION, undefined, false)).not.toThrow();
  expect(() => validateParamAndThrow(undefined, Types.FUNCTION, undefined, false)).not.toThrow();
  expect(() => validateParamAndThrow(0, 'number')).not.toThrow();
  expect(() => validateParamAndThrow(0, 'number', undefined, false)).not.toThrow();
  expect(() => validateParamAndThrow(undefined, 'number', undefined, false)).not.toThrow();
  expect(() => validateParamAndThrow(true, Types.BOOLEAN)).not.toThrow();
  expect(() => validateParamAndThrow(false, Types.BOOLEAN)).not.toThrow();
  expect(() => validateParamAndThrow(undefined, Types.BOOLEAN, undefined, false)).not.toThrow();
  expect(() => validateParamAndThrow(true, Types.BOOLEAN, undefined, false)).not.toThrow();
});
