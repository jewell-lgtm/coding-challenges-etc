import { readFileSync } from "node:fs"
import { join } from "node:path"
import { DeterministicDie, part1, part2, Player } from "./index"
import { mapTimes } from "../../utils/iter"

describe("Day 21", () => {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8")
  const exampleInput1 = `
Player 1 starting position: 4
Player 2 starting position: 8
  `.trim()
  const exampleInput2 = exampleInput1

  test("deterministic die", () => {
    const die = new DeterministicDie(3)
    const rolls = mapTimes(() => die.next(), 10)
    expect(rolls).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3, 1])
  })

  test("first turn", () => {
    const die = new DeterministicDie(100)
    const player1 = new Player(4, 10)
    const player2 = new Player(8, 10)
    expect(player1.score).toEqual(0)
    expect(player2.score).toEqual(0)
    player1.moveDeterministic(die)
    expect(player1.score).toEqual(10)
    player2.moveDeterministic(die)
    expect(player2.score).toEqual(3)
  })

  it("should solve part 1 example", () => {
    expect(part1(exampleInput1)).toEqual(739785)
  })
  it("should solve part 1", () => {
    expect(part1(input)).toEqual(720750)
  })
  it("should solve part 2 example", () => {
    expect(part2(exampleInput2)).toEqual(-1)
  })
  it("should solve part 2", () => {
    expect(part2(input)).toEqual(-1)
  })
})
