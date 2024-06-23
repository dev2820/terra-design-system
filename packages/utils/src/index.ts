export const isNil = (value: unknown): value is null | undefined => {
  return Object.is(value, undefined) || Object.is(value, null);
};

export const isNotNil = (value: unknown) => {
  return !isNil(value);
};
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export { range, rangeGenerator } from './array/range';
