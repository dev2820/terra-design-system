import { range, rangeGenerator } from './range';

describe('range function', () => {
  test('returns an array when returnAsGenerator is true', () => {
    const result = range(0, 10, 1);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(result).toBeInstanceOf(Array);
  });

  test('returns a generator when returnAsGenerator is false', () => {
    const result = range(0, 10, 1, true);
    expect(result).not.toBeInstanceOf(Array);
    expect(result).toMatchObject(rangeGenerator(0, 10, 1));
  });

  test('handles positive steps correctly', () => {
    const result = range(0, 10, 2);
    expect(result).toEqual([0, 2, 4, 6, 8]);
  });

  test('handles negative or zero steps correctly', () => {
    expect(() => range(0, 10, -1)).toThrow('Step must be a positive number.');
    expect(() => range(0, 10, 0)).toThrow('Step must be a positive number.');
  });

  test('handles start be less than end correctly', () => {
    expect(() => range(10, 0, 1)).toThrow('Start must be less than end.');
  });

  test('generator produces correct sequence', () => {
    const result = range(0, 5, 1, true);
    expect([...result]).toEqual([0, 1, 2, 3, 4]);
  });
});
