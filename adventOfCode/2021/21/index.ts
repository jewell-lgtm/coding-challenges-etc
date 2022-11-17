import { sum } from "../../utils/numbers"
import { mapTimes } from "../../utils/iter"
import { lines } from "../../utils/input"

export function part1(input: string) {
  const [player1, player2] = lines(input)
    .map((line) => line.match(/(\d+)$/).map(Number)[0])
    .map((startingPosition) => new Player(startingPosition, 10))
  const die = new DeterministicDie(100)

  while (player1.score < 1000 && player2.score < 1000) {
    player1.moveDeterministic(die)
    if (player1.score < 1000) {
      player2.moveDeterministic(die)
    }
  }

  const losingScore = Math.min(player1.score, player2.score)

  return losingScore * die.rollCount
}

export function part2(input: string) {
  const [player1, player2] = lines(input)
    .map((line) => line.match(/(\d+)$/).map(Number)[0])
    .map((startingPosition) => new Player(startingPosition, 10))

  // a dice can land as either a 1, 2 or 3
  // so to compute every possibility of every roll, we need to compute 3^100
}

export interface Die {
  next: () => number
  rollCount: number
}

export class DeterministicDie implements Die {
  private roll = -1

  constructor(private sides: number) {}

  next() {
    this.roll += 1
    return (this.roll % this.sides) + 1
  }

  get rollCount() {
    return this.roll + 1
  }
}

export class Player {
  constructor(public position: number, private boardLength: number) {}

  score = 0
  moveDeterministic(die: Die) {
    const move = sum(mapTimes(() => die.next(), 3))
    const newPosition = ((this.position - 1 + move) % this.boardLength) + 1
    this.position = newPosition
    this.score += newPosition
  }
}
