const safeParseNumber = (value: string) =>
  Number.isNaN(Number(value)) ? 0 : Number(value);

export default safeParseNumber;
