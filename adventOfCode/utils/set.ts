const union = <T>(...sets: Set<T>[]): Set<T> => {
  const result = new Set<T>()
  sets.forEach((it) => it.forEach((it) => result.add(it)))
  return result
}
export const intersection = <T>(...sets: Set<T>[]): Set<T> => {
  const result = new Set<T>(sets[0].values())
  for (const thing of result) {
    if (!sets.every((set) => set.has(thing))) {
      result.delete(thing)
    }
  }
  return result
}

export const mapSet = <In, Out>(set: Set<In>, fn: (it: In) => Out): Set<Out> =>
  new Set(Array.from(set).map((it) => fn(it)))
