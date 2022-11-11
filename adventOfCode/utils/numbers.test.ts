import { binaryToDecimal, hexToBinary } from "./numbers";

describe("hexToBinary", function () {
  test.each([["D2FE28", "110100101111111000101000"]])(
    "%s is %s",
    function (hex, expected) {
      expect(hexToBinary(hex)).toEqual(expected);
    }
  );
});

describe("binaryToDecimal", function () {
  test.each([["100", 4]])("%s is %s", function (binary, expected) {
    expect(binaryToDecimal(binary)).toEqual(expected);
  });
});
