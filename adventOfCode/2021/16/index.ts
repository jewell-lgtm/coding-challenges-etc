import { binaryToDecimal, hexToBinary } from "../../utils/numbers";

export function part1(input: string) {
  return -1;
}

export function part2(input: string) {
  return -1;
}

type ParsedPacket = { type: "literal"; value: number };

export function parsePacket(input: string): ParsedPacket {
  const state = { remaining: hexToBinary(input) };
  const version = versionNumber(state);
  const type = packetType(state);

  switch (type) {
    case "100":
      let accumulator = "";
      let shouldContinue = true;
      while (shouldContinue) {
        const nextPacket = readBits(state, 5);
        const [shouldContinueStr, ...remainingBits] = nextPacket.split("");
        shouldContinue = shouldContinueStr === "1";
        accumulator += remainingBits.join("");
      }
      return { type: "literal", value: binaryToDecimal(accumulator) };

    default:
      const lengthTypeId = readBits(state, 1);
      const nextLength = lengthTypeId === "0" ? 15 : 11;
      const length = binaryToDecimal(readBits(state, nextLength));
      throw new Error(`Unknown packet type: ${type}`);
  }

  return { type: "literal", value: -1 };
}

const readBits = (state: { remaining: string }, n: number) => {
  let result = "";

  while (result.length < n) {
    result += state.remaining.slice(0, 1);
    state.remaining = state.remaining.slice(1);
  }

  return result;
};

const versionNumber = (state: { remaining: string }) => readBits(state, 3);
const packetType = (state: { remaining: string }) => readBits(state, 3);
