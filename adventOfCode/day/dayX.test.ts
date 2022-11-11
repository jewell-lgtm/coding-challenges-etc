import { readFileSync } from "node:fs";
import { join } from "node:path";
import { part1, part2 } from "./index";

describe.skip("Day 02", function () {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
  const exampleInput1 = ``;
  const exampleInput2 = exampleInput1;

  it("should solve part 1 example", function () {
    expect(part1(exampleInput1)).toEqual(-1);
  });
  it("should solve part 1", function () {
    expect(part1(input)).toEqual(-1);
  });
  it("should solve part 2 example", function () {
    expect(part2(exampleInput2)).toEqual(-1);
  });
  it("should solve part 2", function () {
    expect(part2(input)).toEqual(-1);
  });
});
