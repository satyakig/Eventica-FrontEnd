export function isStringEmpty(value: string): boolean {
  const regex = new RegExp('^(?!s*$).+');
  return !regex.test(value);
}

export function isNumberPositive(value: number): boolean {
  return value >= 0;
}

export function isArrayEmpty(value: Array<any>): boolean {
  return value.length === 0;
}
