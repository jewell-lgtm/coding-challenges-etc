import { readFileSync } from "node:fs";
import { join } from "node:path";
import { part1, part2 } from "./day2";

describe("Day 02", function () {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8");

  it("should solve part 1 example", function () {
    const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
    `;
    expect(part1(input)).toEqual(150);
  });
  it("should solve part 1", function () {
    expect(part1(input)).toEqual(1714680);
  });
  it("should solve part 2 example", function () {
    const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
    `;
    expect(part2(input)).toEqual(900);
  });
  it("should solve part 2", function () {
    expect(part2(input)).toEqual(1963088820);
  });
});
