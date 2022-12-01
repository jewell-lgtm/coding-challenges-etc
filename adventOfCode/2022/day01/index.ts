import { max, sum } from "../../utils/numbers"

export const part1 = (input: string) =>
  max(getInput(input).map((elf) => sum(elf)))

export const part2 = (input: string) =>
  sum(
    getInput(input)
      .map((elf) => sum(elf))
      .sort((a, b) => a - b)
      .slice(-3)
  )

const getInput = (input: string): number[][] =>
  input
    .split("\n\n")
    .map((elf) => elf.split("\n").map((line) => parseInt(line)))
