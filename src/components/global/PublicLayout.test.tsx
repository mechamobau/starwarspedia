import { render } from "@testing-library/react";
import PublicLayout, { TEST_ID } from "./PublicLayout";

const dummyText = "";
const MockComponent = () => <p>{dummyText}</p>;

it("should render a child component", () => {
	const { getByTestId } = render(
		<PublicLayout>
			<MockComponent />
		</PublicLayout>
	);

	expect(getByTestId(TEST_ID).children[0].innerHTML).toBe(dummyText);
});
