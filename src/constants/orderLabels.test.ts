import orderLabels from "./orderLabels";
import OrderEnum from "../models/enum/Order.enum";

test("should have OrderEnum as keys of constant", () => {
	const orderEnumKeys = Object.keys(OrderEnum);

	const orderLabelsConstantKeys = Object.keys(orderLabels);

	expect(orderLabelsConstantKeys).toStrictEqual(orderEnumKeys);
});

test("should have values as strings", () => {
	const entriesOrderEnum = Object.entries(orderLabels);

	const isValuesStrings = entriesOrderEnum.every(
		([, value]) => typeof value === "string"
	);

	expect(isValuesStrings).toBe(true);
});
