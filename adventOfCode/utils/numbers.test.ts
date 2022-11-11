import { hexToBinary } from "./numbers";

describe("hexToBinary", function () {
  test.each([["D2FE28", "110100101111111000101000"]])(
    "%s is %s",
    function (hex, expected) {
      expect(hexToBinary(hex)).toEqual(expected);
    }
  );
});
