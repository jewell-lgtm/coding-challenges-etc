import { numbers } from "../../utils/input"
import { range } from "../../utils/iter"

export function part1(input: string) {
  const program = numbers(input, ",")
  program[1] = 12
  program[2] = 2

  return runTape(program)[0]
}

export function part2(input: string) {
  for (const noun of range(0, 100)) {
    for (const verb of range(0, 100)) {
      const program = numbers(input, ",")
      program[1] = noun
      program[2] = verb
      if (runTape(program)[0] === 19690720) {
        return 100 * noun + verb
      }
    }
  }
  return -1
}

export function runTape(opcodes: number[]) {
  let pos: number | undefined = 0

  while (pos !== undefined && opcodes[pos] !== undefined) {
    const code = opcodes[pos]
    if (code === 1) {
      const a = opcodes[pos + 1]
      const b = opcodes[pos + 2]
      const c = opcodes[pos + 3]
      const left = opcodes[a]
      const right = opcodes[b]
      const result = left + right
      opcodes[c] = result
      pos += 4
    } else if (code === 2) {
      const a = opcodes[pos + 1]
      const b = opcodes[pos + 2]
      const c = opcodes[pos + 3]
      const left = opcodes[a]
      const right = opcodes[b]
      const result = left * right
      opcodes[c] = result
      pos += 4
    } else {
      pos = undefined
    }
  }

  return opcodes
}
