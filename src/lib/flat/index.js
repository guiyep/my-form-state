import flattenF from 'flat';
import ParamValidator from '@mfs-lib/param-validator';

const unflatten = flattenF.unflatten;

const flatten = (object, fieldsFlatMap) => {
  ParamValidator.isObject(object, 'object');
  ParamValidator.notRequired.isObject(fieldsFlatMap, 'fieldsFlatMap');

  if (!fieldsFlatMap) {
    return flattenF(object);
  }

  const flatObj = flattenF(object);

  return Object.entries(flatObj).reduce((acc, [prop, value]) => {
    if (!acc[prop] && fieldsFlatMap[prop]) {
      acc[prop] = value;
    }
    return acc;
  }, {});
};

export { flatten, unflatten };
