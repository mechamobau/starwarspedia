import React, { ReactNode } from "react";

import { renderHook, act } from "@testing-library/react-hooks";
import SortProvider, { useSort, Sort } from "./useSort";
import OrderEnum from "../models/enum/Order.enum";

const customRenderHook = <TProps, TResult>(
	callback: (props: TProps) => TResult
) => {
	const wrapper = ({ children }: { children?: ReactNode }) => (
		<SortProvider>{children}</SortProvider>
	);

	return renderHook(callback, { wrapper });
};

test("should start with order set to name as default value", () => {
	const { result } = customRenderHook(useSort);

	expect(result.current.sort).toStrictEqual({
		column: "name",
		order: OrderEnum.ASC,
	});
});

test("should set sort value on `setSort` call", () => {
	const { result } = customRenderHook(useSort);

	const newSortValue: Sort = {
		column: "gravity",
		order: OrderEnum.DESC,
	};

	act(() => {
		result.current.setSort(newSortValue);
	});

	expect(result.current.sort).toStrictEqual(newSortValue);
});
