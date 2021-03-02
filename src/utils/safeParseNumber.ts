/**
 * Utilitary function that tries to parse a string to number. If it's not possible, it will return `0`
 * @param value - Value to be parsed
 */
const safeParseNumber = (value: string) =>
  Number.isNaN(Number(value)) ? 0 : Number(value);

export default safeParseNumber;
