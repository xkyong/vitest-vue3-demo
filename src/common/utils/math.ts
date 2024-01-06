export function sum (num: number): number {
  return ((1 + num) * num) / 2 
}

export function factorial (num: number): number {
  if (num <= 2) return num
  return num * factorial(num - 1)
}
