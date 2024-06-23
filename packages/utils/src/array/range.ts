function* rangeGenerator(
  start: number,
  end: number,
  step: number = 1,
): Generator<number, void, unknown> {
  if (start > end) {
    throw new Error('Start must be less than end.');
  }
  if (step <= 0) {
    throw new Error('Step must be a positive number.');
  }

  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    yield i;
  }
}

/**
 * range함수는 start에서 end전까지 step만큼 차이가 나는 값들로 구성된 배열을 반환합니다.
 * returnAsGenerator가 true라면 generator를 반환합니다.
 *
 * @param start 반복의 시작값
 * @param end 반복의 종료값
 * @param step 다음 값과의 차이
 * @param returnAsGenerator generator 반환 여부 (default: false)
 */
function range(
  start: number,
  end: number,
  step: number,
  returnAsGenerator: false,
): number[];
function range(start: number, end: number, step: number): number[];
function range(
  start: number,
  end: number,
  step: number,
  returnAsGenerator: true,
): Generator<number, void, unknown>;
function range(
  start: number,
  end: number,
  step?: number,
  returnAsGenerator?: boolean,
): number[] | Generator<number, void, unknown>;
function range(
  start: number,
  end: number,
  step: number = 1,
  returnAsGenerator: boolean = false,
): number[] | Generator<number, void, unknown> {
  const generator = rangeGenerator(start, end, step);

  if (returnAsGenerator) {
    return generator;
  }

  return [...generator];
}

export { range, rangeGenerator };
