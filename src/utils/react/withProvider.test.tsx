import React, { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import withProvider from "./withProvider";

type ComponentAProps = {
	children?: ReactNode;
};

const TEST_ID_COMPONENT_A = "component-a";
const ComponentA = ({ children }: ComponentAProps): ReactElement => (
	<div data-testid={TEST_ID_COMPONENT_A}>{children}</div>
);

const TEST_ID_COMPONENT_B = "component-b";
const ComponentB = (): ReactElement => (
	<p data-testid={TEST_ID_COMPONENT_B}>Just a dummy component</p>
);

test("should render a component inside another according with argument order", () => {
	const Component = withProvider(ComponentA)(ComponentB);

	const { getByTestId } = render(<Component />);

	expect(getByTestId(TEST_ID_COMPONENT_A).children[0]).toBe(
		getByTestId(TEST_ID_COMPONENT_B)
	);
});
