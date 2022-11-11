import { readFileSync } from "node:fs";
import { join } from "node:path";
import { part1, part2 } from "./day1";

describe("Day 01", function () {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8");

  it("should solve part 1", function () {
    expect(part1(input)).toEqual(0);
  });
  it("should solve part 2", function () {
    expect(part2(input)).toEqual(0);
  });
});
