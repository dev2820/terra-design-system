import { isNumber } from './index';

describe('isNumber', () => {
  test('returns true for numbers', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(123)).toBe(true);
    expect(isNumber(-123)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(NaN)).toBe(true); // NaN도 number 타입입니다
    expect(isNumber(Infinity)).toBe(true);
  });

  test('returns false for non-numbers', () => {
    expect(isNumber('123')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(Symbol('123'))).toBe(false);
    expect(isNumber(() => 123)).toBe(false);
  });
});
