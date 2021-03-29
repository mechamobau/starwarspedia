import React, { ReactNode } from "react";

import { renderHook, act, cleanup } from "@testing-library/react-hooks";
import PaginationProvider, { usePagination } from "./usePagination";

const customRenderHook = <TProps, TResult>(
	callback: (props: TProps) => TResult
) => {
	const wrapper = ({ children }: { children?: ReactNode }) => (
		<PaginationProvider>{children}</PaginationProvider>
	);

	return renderHook(callback, { wrapper });
};

afterEach(cleanup);

it("should start with default values", () => {
	const { result } = customRenderHook(usePagination);

	expect(result.current.pagination).toStrictEqual({
		current: 1,
		next: null,
		previous: null,
	});
});

it("should set number of items if setCountItems is called", () => {
	const { result } = customRenderHook(usePagination);

	const countItems = 100;
	const viewsCount = countItems / 10;

	act(() => {
		result.current.setCountItems(countItems);
	});

	expect(result.current.pagination.totalItemsCount).toBe(countItems);
	expect(result.current.pagination.viewsCount).toBe(viewsCount);
});

describe("Next pagination", () => {
	it("should advance on `next` call", () => {
		const { result } = customRenderHook(usePagination);

		const current = 2;

		act(() => {
			result.current.setCurrentItem(current);
			result.current.next();
		});

		expect(result.current.pagination.current).toStrictEqual(current + 1);
	});

	it("should set next item as current incremented on `next` call", () => {
		const { result } = customRenderHook(usePagination);

		const countItems = 100;
		const current = 10;
		const next = current + 1;

		act(() => {
			result.current.setCountItems(countItems);
			result.current.setCurrentItem(current);
			result.current.next();
		});

		expect(result.current.pagination.next).toBe(next + 1);
	});
});

describe("Previous pagination", () => {
	it("should retreat on `previous` call", () => {
		const { result } = customRenderHook(usePagination);

		const current = 3;

		act(() => {
			result.current.setCurrentItem(current);
			result.current.previous();
		});

		expect(result.current.pagination.current).toStrictEqual(current - 1);
	});

	it("should set previous item as null if current is equal or lower than 1", () => {
		const { result } = customRenderHook(usePagination);

		const countItems = 100;
		const current = 1;

		act(() => {
			result.current.setCountItems(countItems);
			result.current.setCurrentItem(current);
			result.current.previous();
		});

		expect(result.current.pagination.previous).toBe(null);
	});
});

it("shouldn't change previous if current is equal 1", () => {
	const { result } = customRenderHook(usePagination);

	const previous = result.current.pagination.previous;

	act(() => {
		result.current.setCurrentItem(1);
	});

	expect(result.current.pagination.previous).toBe(previous);
});

it("shouldn't change next if current is equal viewsCount limit", () => {
	const { result } = customRenderHook(usePagination);

	const next = result.current.pagination.next;

	const viewsCount = Math.round(100 / 10);

	act(() => {
		result.current.setCurrentItem(viewsCount);
		result.current.setCountItems(100);
	});

	expect(result.current.pagination.next).toBe(next);
});
