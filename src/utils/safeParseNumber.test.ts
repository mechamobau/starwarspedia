import React from "react"
import safeParseNumber from "./safeParseNumber"

it('should return 0 if it\'s not possible to parse number', () => {
    expect(safeParseNumber("unknown")).toBe(0)
})

it('should return a number if it\'s possible to parse number', () => {
    const number = 10;

    expect(safeParseNumber(`${number}`)).toBe(number)
})

it('should return a int if it\'s passed a float', () => {
    const floatVariable = 10.0;
    
    expect(safeParseNumber(`${floatVariable}`)).toBe(10)
})