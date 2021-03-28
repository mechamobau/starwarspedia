import React, { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import FilterProvider, { useFilter } from "./useFilter";
import { cleanup } from "@testing-library/react";
import ComparisonEnum from "../models/enum/Comparison.enum";
import { NumericValueFilter } from "../models/FilterList";

afterEach(cleanup);

const customRenderHook = <TProps, TResult>(
	callback: (props: TProps) => TResult
) => {
	const wrapper = ({ children }: { children?: ReactNode }) => (
		<FilterProvider>{children}</FilterProvider>
	);

	return renderHook(callback, { wrapper });
};

it("should return empty name and empty filter list as default value", () => {
	const { result } = customRenderHook(useFilter);

	expect([
		result.current.filter.byName.name,
		result.current.filter.byNumericValues,
	]).toStrictEqual(["", []]);
});

it('should return a new filter "byName" after set one', () => {
	const { result } = customRenderHook(useFilter);

	expect(result.current.filter.byName.name).toBe("");

	const newName = "search name";

	act(() => {
		result.current.setFilterByName(newName);
	});

	expect(result.current.filter.byName.name).toBe(newName);
});

it("should return the filter after a new one is added", () => {
	const { result } = customRenderHook(useFilter);

	expect(result.current.filter.byNumericValues.length).toBe(0);

	const newFilter: NumericValueFilter = {
		column: "climate",
		comparison: ComparisonEnum.EQUALS,
		value: 0,
	};

	act(() => {
		result.current.setFilterByNumericValues(newFilter);
	});

	expect(result.current.filter.byNumericValues).toStrictEqual([newFilter]);
});

it("should remove a filter from a filter list", () => {
	const { result } = customRenderHook(useFilter);

	const newFilter: NumericValueFilter = {
		column: "climate",
		comparison: ComparisonEnum.EQUALS,
		value: 0,
	};

	act(() => {
		result.current.setFilterByNumericValues(newFilter);
	});

	expect(result.current.filter.byNumericValues.length).toBe(1);

	act(() => {
		result.current.removeFilterByNumericValues(newFilter.column);
	});

	expect(result.current.filter.byNumericValues.length).toBe(0);
});

it("should set the value of a existent filter", () => {
	const { result } = customRenderHook(useFilter);

	const newFilter: NumericValueFilter = {
		column: "climate",
		comparison: ComparisonEnum.EQUALS,
		value: 0,
	};

	act(() => {
		result.current.setFilterByNumericValues(newFilter);
	});

	expect(result.current.filter.byNumericValues.length).toBe(1);

	act(() => {
		result.current.setFilterByNumericValues({
			...newFilter,
			value: 10,
		});
	});

	expect(result.current.filter.byNumericValues).toStrictEqual([
		{
			...newFilter,
			value: 10,
		},
	]);
});
