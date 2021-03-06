import React from "react";

import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PaginationButtonGroup from "./PaginationButtonGroup";

afterAll(cleanup);

describe("Previous & Next control buttons", () => {
	const totalViewsCount = 3;

	it("should call function on Previous button click", () => {
		const previousFunctionMock = jest.fn();

		const { getByTestId } = render(
			<PaginationButtonGroup
				pagination={{ current: 1, next: 2, previous: 0, viewsCount: 3 }}
				onPreviousButtonClick={previousFunctionMock}
			/>
		);

		fireEvent.click(getByTestId("previous-button"));

		expect(previousFunctionMock).toHaveBeenCalled();
	});

	it("should call function on Next button click", () => {
		const nextFunctionMock = jest.fn();

		const { getByTestId } = render(
			<PaginationButtonGroup
				pagination={{ current: 1, next: 2, previous: 0, viewsCount: 3 }}
				onNextButtonClick={nextFunctionMock}
			/>
		);

		fireEvent.click(getByTestId("next-button"));

		expect(nextFunctionMock).toHaveBeenCalled();
	});

	it("shouldn't render Previous button if previous index is not passed", () => {
		const { queryByTestId } = render(
			<PaginationButtonGroup
				pagination={{
					current: 0,
					next: 1,
					previous: null,
					viewsCount: totalViewsCount,
				}}
			/>
		);

		expect(queryByTestId("previous-button")).toBe(null);
	});

	it("shouldn't render Next button if next index is not passed", () => {
		const { queryByTestId } = render(
			<PaginationButtonGroup
				pagination={{
					current: 3,
					next: null,
					previous: 2,
					viewsCount: totalViewsCount,
				}}
			/>
		);

		expect(queryByTestId("next-button")).toBe(null);
	});
});

describe("Pagination items", () => {
	it("should display items to change pagination index", () => {
		const totalViewsCount = 3;

		const numberOfControlButtons = 2;

		const { getByRole } = render(
			<PaginationButtonGroup
				pagination={{
					current: 1,
					next: 2,
					previous: 0,
					viewsCount: totalViewsCount,
				}}
			/>
		);

		expect(getByRole("menu").children.length).toBe(
			totalViewsCount + numberOfControlButtons
		);
	});

	it("shouldn't render no items if no items exists", () => {
		const { getByRole } = render(
			<PaginationButtonGroup
				pagination={{ current: 1, previous: null, next: null }}
			/>
		);

		expect(getByRole("menu").children.length).toBe(0);
	});
});

describe("Current Pagination index", () => {
	it("should call function on button index click", () => {
		const onChangeFunctionMock = jest.fn();

		const nextIndex = 2;

		const { getByText } = render(
			<PaginationButtonGroup
				pagination={{ current: 1, next: 2, previous: 0, viewsCount: 3 }}
				onPaginationChange={onChangeFunctionMock}
			/>
		);

		fireEvent.click(getByText(`${nextIndex}`));

		expect(onChangeFunctionMock).toHaveBeenCalledWith(nextIndex);
	});

	it("should set current button as disabled", async () => {
		const onChangeFunctionMock = jest.fn();

		const nextIndex = 3;

		const { rerender } = render(
			<PaginationButtonGroup
				pagination={{ current: 1, next: 2, previous: 0, viewsCount: 3 }}
				onPaginationChange={onChangeFunctionMock}
			/>
		);

		await act(async () => {
			userEvent.click(screen.getByText(`${nextIndex}`));
		});

		rerender(
			<PaginationButtonGroup
				pagination={{
					current: nextIndex,
					next: null,
					previous: nextIndex - 1,
					viewsCount: 3,
				}}
				onPaginationChange={onChangeFunctionMock}
			/>
		);

		expect(screen.getByText(`${nextIndex}`)).toBeDisabled();
	});

	it("should create items", () => {
		const onChangeFunctionMock = jest.fn();

		const pagination = { current: 1, next: 2, previous: 0, viewsCount: 3 };

		const { getByRole } = render(
			<PaginationButtonGroup
				pagination={pagination}
				onPaginationChange={onChangeFunctionMock}
			/>
		);

		const expectedItems = Array.from(
			{ length: pagination.viewsCount ?? 0 },
			(_, i) => i + 1
		);

		const items = Array.from(getByRole("menu").children);

		items.pop();
		items.shift();

		expect(items.map((item) => Number(item.innerHTML))).toStrictEqual(
			expectedItems
		);
	});
});
