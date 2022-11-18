import { readFileSync } from "node:fs"
import { join } from "node:path"
import { part1, part2 } from "./index"

describe("Day 01", function () {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8")

  it("should solve part 1", function () {
    expect(part1(input)).toEqual(3490763)
  })
  it.each([
    ["14", 2],
    ["1969", 966],
    ["100756", 50346],
  ])("should solve part 2 example %s", function (input, out) {
    expect(part2(input)).toEqual(out)
  })
  it("should solve part 2", function () {
    expect(part2(input)).toEqual(5233250)
  })
})
