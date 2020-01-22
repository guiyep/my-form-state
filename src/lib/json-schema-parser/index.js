import ParamValidator from '@mfs-lib/param-validator';
import flattenF from 'flat';

export const getFlatMap = ({ jsonSchema }) => {
  ParamValidator.isObject(jsonSchema, 'jsonSchema');

  return Object.entries(flattenF(jsonSchema)).reduce((acc, [prop, value]) => {
    if (prop === 'type' || prop === 'type' || value === 'object') {
      return acc;
    }
    const newProp = prop
      .replace(/properties./g, '')
      .replace(/.type/g, '')
      .replace(/.items/g, '')
      .replace(/.enum/g, '')
      .replace(/.additionalItems/g, '');
    acc[newProp] = true;
    return acc;
  }, {});
};
