import { readFileSync } from "node:fs";
import { join } from "node:path";
import { part1, part2, Probe, TargetArea } from "./index";

describe("Day 17", function () {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
  const exampleInput1 = `target area: x=20..30, y=-10..-5`;
  const exampleInput2 = exampleInput1;

  test("starts at 0,0", function () {
    expect(Probe.create()).toHaveProperty("position", { x: 0, y: 0 });
  });

  test("each step", () => {
    const probe = Probe.create({ position: { x: 0, y: 5 }, xVel: 3, yVel: 3 });
    probe.step();
    expect(probe.position.x).toEqual(3);
    expect(probe.position.y).toEqual(8);
    expect(probe.xVel).toEqual(2);
    expect(probe.yVel).toEqual(2);
  });

  test("target parser", () => {
    const target = TargetArea.parse(exampleInput1);
    expect(target.xRange).toEqual([20, 30]);
    expect(target.yRange).toEqual([-10, -5]);
  });

  test.each([
    [7, 2],
    [6, 3],
    [9, 0],
  ])("velocity of %s,%s hits a target of x=20..30, y=-10..-5", (xVel, yVel) => {
    const target = TargetArea.parse(exampleInput1);
    const probe = Probe.create({ position: { x: 0, y: 0 }, xVel, yVel });
    expect(probe.hits(target)).not.toBeUndefined();
  });

  test.each([[17, -4]])(
    "velocity of %s,%s does not hit a target of x=20..30, y=-10..-5",
    (xVel, yVel) => {
      const target = TargetArea.parse(exampleInput1);
      const probe = Probe.create({ position: { x: 0, y: 0 }, xVel, yVel });
      expect(probe.hits(target)).toBeUndefined();
    }
  );

  it("should solve part 1 example", function () {
    expect(part1(exampleInput1)).toEqual(45);
  });
  it("should solve part 1", function () {
    expect(part1(input)).toEqual(2775);
  });
  it("should solve part 2 example", function () {
    expect(part2(exampleInput2).size).toEqual(112);
  });
  it("should solve part 2", function () {
    expect(part2(input).size).toEqual(1566);
  });
});
