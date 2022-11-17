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
  const [, command] = /^(\w+)/.exec(line)
  const [xStart, xEnd, yStart, yEnd, zStart, zEnd] = line
    .match(/(\d+)/g)!
    .map(Number)

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

export class Reactor {
  cubes = new Set<string>()

  on(cube: Cuboid) {
    for (let x = cube.xStart; x <= cube.xEnd; x++) {
      if (!(x < -50 || x > 50)) {
        for (let y = cube.yStart; y <= cube.yEnd; y++) {
          if (!(y < -50 || y > 50)) {
            for (let z = cube.zStart; z <= cube.zEnd; z++) {
              if (!(z < -50 || z > 50)) {
                this.cubes.add([x, y, z].join(","))
              }
            }
          }
        }
      }
    }
  }

  off(cube: Cuboid) {
    for (let x = cube.xStart; x <= cube.xEnd; x++) {
      if (!(x < -50 || x > 50)) {
        for (let y = cube.yStart; y <= cube.yEnd; y++) {
          if (!(y < -50 || y > 50)) {
            for (let z = cube.zStart; z <= cube.zEnd; z++) {
              if (!(z < -50 || z > 50)) {
                this.cubes.delete([x, y, z].join(","))
              }
            }
          }
        }
      }
    }
  }

  count = () => Array.from(this.cubes.values()).filter(Boolean).length
}
