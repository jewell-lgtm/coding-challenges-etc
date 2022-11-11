export const windowed = <T>(arr: T[], size: number) => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length - size + 1; i++) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
