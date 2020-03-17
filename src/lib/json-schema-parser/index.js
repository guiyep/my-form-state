import ParamValidator from '@mfs-lib/param-validator';
import flattenF from 'flat';

export const getFlatMap = ({ jsonSchema }) => {
  ParamValidator.isObject(jsonSchema, 'jsonSchema');

  const flatSchema = flattenF(jsonSchema);

  return Object.entries(flatSchema).reduce((acc, [prop, value]) => {
    if (prop === 'type' || prop === 'type' || value === 'object') {
      return acc;
    }

    if (prop.indexOf('required') !== -1) {
      return acc;
    }

    const newProp = prop
      .replace(/properties./g, '')
      .replace(/.type/g, '')
      .replace(/.items/g, '')
      .replace(/.enum/g, '')
      .replace(/.additionalItems/g, '');

    acc[newProp] = value;
    return acc;
  }, {});
};
