export const numbers = (input: string, separator = "\n") =>
  input.trim().split(separator).map(Number)
export const lines = (input: string) => input.trim().split("\n")
