import { readFileSync } from "node:fs";
import { join } from "node:path";
import { part1, part2 } from "./day1";

describe("Day 01", function () {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8");

  it("should solve part 1 example", function () {
    const input = `
199
200
208
210
200
207
240
269
260
263
    `;
    expect(part1(input)).toEqual(7);
  });
  it("should solve part 1", function () {
    expect(part1(input)).toEqual(1791);
  });
  it("should solve part 2 example", function () {
    const input = `
199
200
208
210
200
207
240
269
260
263
    `;
    expect(part2(input)).toEqual(5);
  });
  it("should solve part 2", function () {
    expect(part2(input)).toEqual(1822);
  });
});
