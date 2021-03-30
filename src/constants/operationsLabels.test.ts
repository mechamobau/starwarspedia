import operationsLabels from "./operationsLabels";
import ComparisonEnum from "../models/enum/Comparison.enum";

test("should have ComparisonEnum as keys of constant", () => {
	const comparisonEnumKeys = Object.keys(ComparisonEnum).sort();

	const operationsLabelsConstantKeys = Object.keys(operationsLabels).sort();

	expect(operationsLabelsConstantKeys).toStrictEqual(comparisonEnumKeys);
});

test("should have values as strings", () => {
	const entriesOrderEnum = Object.entries(operationsLabels);

	const isValuesStrings = entriesOrderEnum.every(
		([, value]) => typeof value === "string"
	);

	expect(isValuesStrings).toBe(true);
});
