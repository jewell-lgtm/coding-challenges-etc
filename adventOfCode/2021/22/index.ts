import { range } from "../../utils/iter"

export function part1(input: string) {
  const reactor = new Reactor()
  const lines = input
    .trim()
    .split("\n")
    .map((line) => parseLine(line))

  for (const [command, cube] of lines) {
    if (command === "on") {
      reactor.on(cube)
    } else {
      reactor.off(cube)
    }
    const count = reactor.count()
    console.log("reactor.count()", count)
  }
  return reactor.count()
}

export function part2(input: string) {
  return -1
}

export function parseLine(line: string) {
  const [, command] = line.match(/^(\w+)/) ?? []
  const [xStart, xEnd, yStart, yEnd, zStart, zEnd] = (
    line.match(/(\d+)/g) ?? []
  ).map(Number)

  return [command, new Cuboid(xStart, xEnd, yStart, yEnd, zStart, zEnd)] as [
    "off" | "on",
    Cuboid
  ]
}

export class Cuboid {
  constructor(
    public xStart: number,
    public xEnd: number,
    public yStart: number,
    public yEnd: number,
    public zStart: number,
    public zEnd: number
  ) {}
}

type Point = [number, number, number]

export class Reactor {
  cubes = new Set<Point>()

  on(cube: Cuboid) {
    for (const x of range(
      Math.max(-50, cube.xStart),
      Math.min(cube.xEnd, 50) + 1
    )) {
      for (const y of range(
        Math.max(-50, cube.yStart),
        Math.min(cube.yEnd, 50) + 1
      )) {
        for (const z of range(
          Math.max(-50, cube.zStart),
          Math.min(cube.zEnd, 50) + 1
        )) {
          this.cubes.add([x, y, z])
        }
      }
    }
  }
  off(cube: Cuboid) {
    for (const x of range(
      Math.max(-50, cube.xStart),
      Math.min(cube.xEnd, 50) + 1
    )) {
      for (const y of range(
        Math.max(-50, cube.yStart),
        Math.min(cube.yEnd, 50) + 1
      )) {
        for (const z of range(
          Math.max(-50, cube.zStart),
          Math.min(cube.zEnd, 50) + 1
        )) {
          this.cubes.delete([x, y, z])
        }
      }
    }
  }

  count = () => Array.from(this.cubes.values()).filter(Boolean).length
}
