import {
  binaryToDecimal,
  hexToBinary,
  product,
  sum,
} from "../../utils/numbers";

export function part1(input: string) {
  const [, packet] = parsePacket(0, input);
  return versionSum(packet);
}

export function part2(input: string) {
  const [, packet] = parsePacket(0, input);
  return compute(packet);
}

export type LiteralPacket = { type: "literal"; version: number; value: number };
type Operand = "000" | "001" | "010" | "011" | "101" | "110" | "111";
export type OperatorPacket = {
  type: "operator";
  version: number;
  operand: Operand;
  packets: ParsedPacket[];
};
export type ParsedPacket = LiteralPacket | OperatorPacket;
const isLiteral = (packet: ParsedPacket): packet is LiteralPacket =>
  packet.type === "literal";

export function parsePacket(
  start: number,
  input: string
): [number, ParsedPacket] {
  const bits = hexToBinary(input);
  let i = start;

  function read(nBits: number) {
    const result = bits.slice(i, i + nBits);
    i += nBits;
    return result;
  }

  const version = binaryToDecimal(read(3));
  const type = read(3) as Operand | "100";

  if (type === "100") {
    // parse literal value
    let resultBits = "";
    let continueBit = true;

    while (continueBit) {
      continueBit = binaryToDecimal(read(1)) === 1;
      resultBits += read(4);
    }

    return [
      i,
      { type: "literal", version, value: binaryToDecimal(resultBits) },
    ];
  }

  // parse operator
  const mode = read(1);
  if (mode === "0") {
    // parse n bits
    const length = binaryToDecimal(read(15));
    const didStartReadingPacketsAt = i;
    const packets = [];
    while (i < didStartReadingPacketsAt + length) {
      const [newI, packet] = parsePacket(i, input);
      i = newI;
      packets.push(packet);
    }
    return [i, { type: "operator", operand: type, version, packets }];
  } else {
    // parse n packets
    const numberOfSubPackets = binaryToDecimal(read(11));
    const packets = [];
    while (packets.length < numberOfSubPackets) {
      const [newI, packet] = parsePacket(i, input);
      i = newI;
      packets.push(packet);
    }
    return [i, { type: "operator", operand: type, version, packets }];
  }
}

export const versions = (p: ParsedPacket[]): number[] =>
  p.map((it) => it.version);

const versionSum = (packet: ParsedPacket): number =>
  isLiteral(packet)
    ? packet.version
    : packet.version + sum(packet.packets.map((it) => versionSum(it)));

const compute = (packet: ParsedPacket): number => {
  if (isLiteral(packet)) return packet.value;
  switch (packet.operand) {
    case "000":
      return sum(packet.packets.map((it) => compute(it)));
    case "001":
      return product(packet.packets.map((it) => compute(it)));
    case "010":
      return Math.min(...packet.packets.map((it) => compute(it)));
    case "011":
      return Math.max(...packet.packets.map((it) => compute(it)));
    case "110":
      return compute(packet.packets[0]) < compute(packet.packets[1]) ? 1 : 0;
    case "101":
      return compute(packet.packets[0]) > compute(packet.packets[1]) ? 1 : 0;
    case "111":
      return compute(packet.packets[0]) === compute(packet.packets[1]) ? 1 : 0;

    default:
      throw new Error("Not implemented: " + packet.operand);
  }
};
