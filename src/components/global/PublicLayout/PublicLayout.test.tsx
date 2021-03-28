import { render } from "@testing-library/react";
import PublicLayout, { testId } from "./PublicLayout";

const dummyText = "";
const MockComponent = () => <p>{dummyText}</p>;

it("should render a child component", () => {
	const { getByTestId } = render(
		<PublicLayout>
			<MockComponent />
		</PublicLayout>
	);

	expect(getByTestId(testId).children[0].innerHTML).toBe(dummyText);
});
