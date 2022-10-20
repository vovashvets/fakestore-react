export function firstSymbolCapitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function roundToTwo(num: number) {
  return Math.round( num * 100 + Number.EPSILON ) / 100
}