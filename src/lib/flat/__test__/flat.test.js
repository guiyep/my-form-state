import { flatten } from '../index';
import { getFlatMap } from '../../json-schema-parser';

const jsonSchema = {
  type: 'object',
  properties: {
    o: {
      type: 'array',
      items: [
        {
          type: 'number',
        },
        {
          type: 'string',
        },
        {
          type: 'object',
          properties: {
            abb: 'number',
          },
        },
        {
          type: 'string',
          enum: ['Street', 'Avenue', 'Boulevard'],
        },
        {
          type: 'string',
          enum: ['NW', 'NE', 'SW', 'SE'],
        },
      ],
      additionalItems: false,
    },
    a: {
      type: 'object',
      properties: {
        b: {
          type: 'object',
          properties: {
            c: {
              type: 'number',
            },
          },
        },
      },
    },
  },
};

it('getFlatMap to return what is expected', () => {
  const flatMap = getFlatMap({ jsonSchema });
  expect(flatMap).toEqual({
    'a.b.c': 'number',
    o: false,
    'o.0': 'number',
    'o.1': 'string',
    'o.2.abb': 'number',
    'o.3': 'string',
    'o.3.0': 'Street',
    'o.3.1': 'Avenue',
    'o.3.2': 'Boulevard',
    'o.4': 'string',
    'o.4.0': 'NW',
    'o.4.1': 'NE',
    'o.4.2': 'SW',
    'o.4.3': 'SE',
  });
});

it('flatten to return what is expected without getFlatMap', () => {
  const flatMap = flatten({ a: { b: 2 } });
  expect(flatMap).toEqual({
    'a.b': 2,
  });
});

it('flatten not throw', () => {
  expect(() => flatten({ a: { b: 2 } }, {})).not.toThrow();
  expect(flatten({ a: { b: 2 } }, {})).toEqual({});
  expect(
    flatten(
      { a: { b: 2 }, z: 3 },
      getFlatMap({
        jsonSchema: {
          type: 'object',
          z: {
            type: 'number',
          },
        },
      }),
    ),
  ).toEqual({
    z: 3,
  });
  expect(
    flatten(
      { a: { b: 2 }, z: 3 },
      getFlatMap({
        jsonSchema: {
          type: 'object',
          a: {
            type: 'object',
            properties: {
              b: {
                type: 'number',
              },
            },
          },
        },
      }),
    ),
  ).toEqual({
    'a.b': 2,
  });
  expect(
    flatten(
      { a: { b: 2 }, z: 3 },
      getFlatMap({
        jsonSchema: {
          type: 'object',
          a: {
            type: 'object',
            properties: {
              b: {
                type: 'number',
              },
            },
          },
          z: {
            type: 'number',
          },
        },
      }),
    ),
  ).toEqual({
    'a.b': 2,
    z: 3,
  });
});
