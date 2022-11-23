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

export const first = <T>(things: Iterable<T>): T => [...things][0]!

export function minimizeBy<T>(things: Iterable<T>, fn: (it: T) => number): T {
  let best = first(things)
  for (const thing of things) {
    if (fn(thing) < fn(best)) {
      best = thing
    }
  }
  return best
}

export const minimize = (things: Iterable<number>): number =>
  minimizeBy(things, (it) => it)
