import { readFileSync } from "node:fs"
import { join } from "node:path"
import { part1, part2 } from "./index"

describe("Day 01", () => {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8")
  const exampleInput1 = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`.trim()
  const exampleInput2 = exampleInput1

  it("should solve part 1 example", () => {
    expect(part1(exampleInput1)).toEqual(24000)
  })
  it("should solve part 1", () => {
    expect(part1(input)).toEqual(70720)
  })
  it("should solve part 2 example", () => {
    expect(part2(exampleInput2)).toEqual(45000)
  })
  it("should solve part 2", () => {
    expect(part2(input)).toEqual(207148)
  })
})
