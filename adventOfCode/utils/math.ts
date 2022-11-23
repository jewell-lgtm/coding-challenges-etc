export function manhattanDistance(a: number[], b: number[]) {
  let dist = 0
  for (let i = 0; i < a.length; i++) {
    dist += Math.abs(a[i] - b[i])
  }
  return dist
}
