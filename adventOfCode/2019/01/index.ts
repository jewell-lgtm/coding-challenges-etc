import { numbers } from "../../utils/input";
import { sum } from "../../utils/numbers";

export function part1(input: string) {
  return sum(numbers(input).map((n) => calculateFuel(n)));
}

export function part2(input: string) {
  let result = 0;
  for (const mass of numbers(input)) {
    let fuel = calculateFuel(mass);
    while (fuel > 0) {
      result += fuel;
      fuel = calculateFuel(fuel);
    }
  }
  return result;
}
const calculateFuel = (mass: number) => Math.max(0, Math.floor(mass / 3) - 2);
