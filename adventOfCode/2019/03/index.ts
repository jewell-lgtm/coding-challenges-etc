import { minimize, minimizeBy } from "../../utils/iter"
import { manhattanDistance } from "../../utils/math"

export function part1(input: string) {
  const [wireA, wireB] = input.split("\n").map((it) => parse(it))
  const pointsB = new Set(points(wireB))
  const intersections: Point[] = points(wireA)
    .filter((it) => pointsB.has(it))
    .map((it) => JSON.parse(it))
  return minimize(
    intersections.map((it) => manhattanDistance([it.x, it.y], [0, 0]))
  )
}

export function part2(input: string) {
  const [wireA, wireB] = input.split("\n").map((it) => parse(it))
  const pointsAndStepsA = pointsAndSteps(wireA)
  const pointsAndStepsB = pointsAndSteps(wireB)
  const pointsB = new Set(points(wireB))
  const intersections: Point[] = points(wireA)
    .filter((it) => pointsB.has(it))
    .map((it) => JSON.parse(it))
  return minimize(
    intersections.map(
      (it) =>
        pointsAndStepsA.get(JSON.stringify(it))! +
        pointsAndStepsB.get(JSON.stringify(it))!
    )
  )
}

enum Direction {
  U = "U",
  D = "D",
  L = "L",
  R = "R",
}

const Directions = {
  [Direction.U]: [0, -1],
  [Direction.D]: [0, 1],
  [Direction.L]: [-1, 0],
  [Direction.R]: [1, 0],
}

type Instruction = {
  dir: Direction
  dist: number
}

type Point = {
  x: number
  y: number
}

export const parse = (input: string): Instruction[] =>
  input.split(",").map((it) => {
    const dir = it[0] as Direction
    const dist = parseInt(it.slice(1))
    return { dir, dist }
  })

export function points(instructions: Instruction[]): string[] {
  const points: string[] = []
  let x = 0
  let y = 0
  for (let { dir, dist } of instructions) {
    while (dist > 0) {
      x += Directions[dir][0]
      y += Directions[dir][1]
      points.push(JSON.stringify({ x, y }))
      dist--
    }
  }

  return points
}

export function pointsAndSteps(
  instructions: Instruction[]
): Map<string, number> {
  const points = new Map<string, number>()
  let x = 0
  let y = 0
  let steps = 0
  for (let { dir, dist } of instructions) {
    while (dist > 0) {
      x += Directions[dir][0]
      y += Directions[dir][1]
      steps++
      points.set(JSON.stringify({ x, y }), steps)
      dist--
    }
  }

  return points
}
