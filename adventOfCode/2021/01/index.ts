import { numbers } from "../../utils/input";
import { windowed } from "../../utils/arrays";
import { sum } from "../../utils/numbers";

export function part1(input: string) {
  const parsed = numbers(input);
  return countIncreases(parsed);
}

export function part2(input: string) {
  const parsed = windowed(numbers(input), 3);
  const sums = parsed.map((window) => sum(window));

  return countIncreases(sums);
}

function countIncreases(parsed: number[]) {
  let increased = 0;
  let last = Number.MAX_VALUE;

  for (const num of parsed) {
    if (num > last) {
      increased++;
    }
    last = num;
  }
  return increased;
}
