import { lines, numbers } from "../../utils/input"
import { windowed } from "../../utils/iter"
import { sum } from "../../utils/numbers"

export function part1(input: string) {
  const parsed = lines(input).map((str) => parseLine(str))
  let horizontal = 0
  let depth = 0

  for (const { direction, amount } of parsed) {
    switch (direction) {
      case "forward":
        horizontal += amount
        break
      case "down":
        depth += amount
        break
      case "up":
        depth -= amount
        break
    }
  }

  return horizontal * depth
}

export function part2(input: string) {
  const parsed = lines(input).map((str) => parseLine(str))

  let aim = 0
  let horizontal = 0
  let depth = 0

  for (const { direction, amount } of parsed) {
    switch (direction) {
      case "forward":
        horizontal += amount
        depth += aim * amount
        break
      case "down":
        aim += amount
        break
      case "up":
        aim -= amount
        break
    }
  }

  return horizontal * depth
}

type Direction = "forward" | "down" | "up"
type Heading = { direction: Direction; amount: number }
const parseLine = (line: string): Heading => {
  const [direction, amount] = line.split(" ")
  return { direction: direction as Direction, amount: parseInt(amount) }
}
