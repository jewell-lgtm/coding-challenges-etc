export const windowed = <T>(arr: T[], size: number) => {
  const result: T[][] = []
  for (let i = 0; i < arr.length - size + 1; i++) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export const mapTimes = <T>(fn: (index: number) => T, times: number): T[] =>
  Array.from({ length: times }, (_, index) => fn(index))

export const range = (start: number, end: number): Iterable<number> => {
  return {
    *[Symbol.iterator]() {
      for (let i = start; i < end; i++) {
        yield i
      }
    },
  }
}
