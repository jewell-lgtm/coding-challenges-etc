export const sum = (window: number[]): number =>
  window.reduce((acc, curr) => acc + curr, 0);

export const hexToBinary = (hex: string): string =>
  hex
    .split("")
    .map((char) => parseInt(char, 16).toString(2).padStart(4, "0"))
    .join("");
