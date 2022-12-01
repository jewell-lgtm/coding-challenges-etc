export const sum = (numbers: number[]): number =>
  numbers.reduce((acc, curr) => acc + curr, 0)

export const product = (numbers: number[]): number =>
  numbers.reduce((acc, curr) => acc * curr, 1)

export const hexToBinary = (hex: string): string =>
  hex
    .split("")
    .map((char) => parseInt(char, 16).toString(2).padStart(4, "0"))
    .join("")

export const binaryToDecimal = (binary: string): number => parseInt(binary, 2)

export const binaryToHex = (binary: string): string =>
  parseInt(binary, 2).toString(16)

export const max = (numbers: number[]): number => Math.max(...numbers)

export const min = (numbers: number[]): number => Math.min(...numbers)