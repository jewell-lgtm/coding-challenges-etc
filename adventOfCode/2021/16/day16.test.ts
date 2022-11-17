import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  LiteralPacket,
  OperatorPacket,
  parsePacket,
  part1,
  part2,
  versions,
} from "./index"
import { sum } from "../../utils/numbers"

describe("Day 16", () => {
  const input = readFileSync(join(__dirname, "input.txt"), "utf-8")

  test("D2FE28", () => {
    const [, packet] = parsePacket(0, "D2FE28")
    expect((packet as LiteralPacket).value).toEqual(2021)
  })
  test("38006F45291200", () => {
    const [, packet] = parsePacket(0, "38006F45291200")
    expect(
      ((packet as OperatorPacket).packets as LiteralPacket[]).map(
        (it) => it.value
      )
    ).toEqual([10, 20])
  })
  test("EE00D40C823060", () => {
    const [, packet] = parsePacket(0, "EE00D40C823060")
    expect(
      ((packet as OperatorPacket).packets as LiteralPacket[]).map(
        (it) => it.value
      )
    ).toEqual([1, 2, 3])
  })

  test(
    "8A004A801A8002F478 represents an operator packet (version 4) " +
      "which contains an operator packet (version 1) " +
      "which contains an operator packet (version 5) " +
      "which contains a literal value (version 6); " +
      "this packet has a version sum of 16",
    () => {
      const [, packet0] = parsePacket(0, "8A004A801A8002F478")
      expect(packet0.version).toEqual(4)
      const packet1 = (packet0 as OperatorPacket).packets[0]
      expect(packet1.version).toEqual(1)
      const packet2 = (packet1 as OperatorPacket).packets[0]
      expect(packet2.version).toEqual(5)
      const packet3 = (packet2 as OperatorPacket).packets[0]
      expect(packet3.version).toEqual(6)
      expect(sum(versions([packet0, packet1, packet2, packet3]))).toEqual(16)
    }
  )

  it("should solve part 1 example", () => {
    expect(part1("8A004A801A8002F478")).toEqual(16)
    expect(part1("620080001611562C8802118E34")).toEqual(12)
    expect(part1("C0015000016115A2E0802F182340")).toEqual(23)
    expect(part1("A0016C880162017C3686B18A3D4780")).toEqual(31)
  })

  it("should solve part 1", () => {
    expect(part1(input)).toEqual(873)
  })

  test.each([
    ["C200B40A82", 3],
    ["04005AC33890", 54],
    ["880086C3E88112", 7],
    ["CE00C43D881120", 9],
    ["D8005AC2A8F0", 1],
    ["F600BC2D8F", 0],
  ])("should solve part 2 example %s", (input, expected) => {
    expect(part2(input)).toEqual(expected)
  })
  it("should solve part 2", () => {
    expect(part2(input)).toEqual(402817863665)
  })
})
