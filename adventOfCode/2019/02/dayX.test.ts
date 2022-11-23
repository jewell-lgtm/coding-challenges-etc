import { readFileSync } from "node:fs"
import { join } from "node:path"
import { part1, part2, runTape } from "./index"

describe("Day 02", () => {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8")

  it.each([
    [
      [1, 0, 0, 0, 99],
      [2, 0, 0, 0, 99],
    ],
    [
      [2, 3, 0, 3, 99],
      [2, 3, 0, 6, 99],
    ],
    [
      [2, 4, 4, 5, 99, 0],
      [2, 4, 4, 5, 99, 9801],
    ],
    [
      [1, 1, 1, 4, 99, 5, 6, 0, 99],
      [30, 1, 1, 4, 2, 5, 6, 0, 99],
    ],
  ])("should run the example tapes", (input, output) => {
    expect(runTape(input)).toEqual(output)
  })
  it("should solve part 1", () => {
    expect(part1(input)).toEqual(4138687)
  })
  it("should solve part 2", () => {
    expect(part2(input)).toEqual(6635)
  })
})
