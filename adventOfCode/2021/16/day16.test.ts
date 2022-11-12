import { readFileSync } from "node:fs";
import { join } from "node:path";
import { part1, part2, parsePacket } from "./index";

describe("Day 16", function () {
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

describe("parsePacket", function () {
  test("literal packet", function () {
    const parsed = parsePacket("D2FE28");
    expect(parsed.value).toEqual(2021);
  });
  test("operator packet", function () {
    const parsed = parsePacket("38006F45291200");
    expect(parsed.value).toEqual({ a: "11010001010", b: "0101001000100100" });
  });
});
