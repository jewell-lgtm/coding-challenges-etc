export function part1(input: string) {
  const target = TargetArea.parse(input);

  let best = -1;
  for (let xVel = 0; xVel <= 500; xVel++) {
    for (let yVel = 0; yVel <= 500; yVel++) {
      const probe = Probe.create({ xVel, yVel });
      const hit = probe.hits(target);
      if (hit) {
        best = Math.max(best, hit);
      }
    }
  }
  return best;
}

export function part2(input: string): Set<[number, number]> {
  const target = TargetArea.parse(input);
  const result = new Set<[number, number]>();

  for (let xVel = -500; xVel <= 500; xVel++) {
    for (let yVel = -500; yVel <= 500; yVel++) {
      if (Probe.create({ xVel, yVel }).hits(target) !== undefined) {
        result.add([xVel, yVel]);
      }
    }
  }
  return result;
}

interface Position {
  x: number;
  y: number;
}

// moves by 1 closer to 0, value of 0 is unchanged
const posNegDecrement = (x: number) => (x > 0 ? x - 1 : x < 0 ? x + 1 : 0);

export class Probe {
  constructor(public position: Position, public xVel, public yVel) {}
  static create({
    position = { x: 0, y: 0 },
    xVel = 0,
    yVel = 0,
  }: {
    position?: Position;
    xVel?: number;
    yVel?: number;
  } = {}) {
    return new Probe(position, xVel, yVel);
  }

  step(): void {
    this.position.x += this.xVel;
    this.position.y += this.yVel;
    this.xVel = posNegDecrement(this.xVel);
    this.yVel = this.yVel - 1;
  }

  hits(target: TargetArea): undefined | number {
    let highestY = 0;
    const maxSteps = 1000;
    let steps = 0;
    while (
      steps < maxSteps &&
      this.position.y >= Math.min(target.yRange[0], target.yRange[1])
    ) {
      this.step();
      steps++;
      highestY = Math.max(highestY, this.position.y);
      if (target.contains(this.position)) {
        return highestY;
      }
      if (this.xVel > 0 && this.position.x > Math.max(...target.xRange)) {
        return;
      }
      if (this.xVel < 0 && this.position.x < Math.min(...target.xRange)) {
        return;
      }
      if (this.yVel > 0 && this.position.y < Math.max(...target.yRange)) {
        return;
      }
    }
    return undefined;
  }
}

export class TargetArea {
  constructor(
    public xRange: [number, number],
    public yRange: [number, number]
  ) {}

  static parse(input: string): TargetArea {
    const [xStr, yStr] = input.split("target area: ")[1].split(", ");
    const [xRange, yRange] = [xStr, yStr].map((str) => {
      let result = /(-?\d+)\.\.(-?\d+)/.exec(str);
      const [_, start, end] = result!;
      return [parseInt(start), parseInt(end)];
    });
    return new TargetArea(
      xRange as [number, number],
      yRange as [number, number]
    );
  }

  contains(position: Position) {
    return (
      position.x >= this.xRange[0] &&
      position.x <= this.xRange[1] &&
      position.y >= this.yRange[0] &&
      position.y <= this.yRange[1]
    );
  }
}
