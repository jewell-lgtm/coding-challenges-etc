import { readFileSync } from "node:fs"
import { join } from "node:path"
import { parse, part1, part2, points } from "./index"

describe("Day 03", () => {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8")

  test.each([
    [
      "R8",
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 7, y: 0 },
        { x: 8, y: 0 },
      ].map((it) => JSON.stringify(it)),
    ],
  ])("moves %s", (input, output) => {
    expect(points(parse(input))).toEqual(output)
  })

  it.each([
    [
      `
R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83
      `.trim(),
      159,
    ],
    [
      `
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7
      `.trim(),
      135,
    ],
  ])("should solve part 1 example %s", (input, output) => {
    expect(part1(input)).toEqual(output)
  })
  it("should solve part 1", () => {
    expect(part1(input)).toEqual(721)
  })
  it.each([
    [
      `
R8,U5,L5,D3
U7,R6,D4,L4
          `.trim(),
      30,
    ],
  ] as [string, number][])("should solve part 2 example", (input, output) => {
    expect(part2(input)).toEqual(output)
  })
  it("should solve part 2", () => {
    expect(part2(input)).toEqual(7388)
  })
})
