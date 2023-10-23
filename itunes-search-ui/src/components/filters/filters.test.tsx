import { act, render, screen } from "@testing-library/react";
import Filters from "./filters";
import userEvent from "@testing-library/user-event";

// creating a test suited for the filters component
describe("Renders: <Filters />", () => {
  it("renders Filters component", () => {
    // object that represents a category item
    let selectedCategory = "";

    const onSelectedCategory = (category: string) => {
      selectedCategory = category;
    };

    // rendering filter component
    render(<Filters onSelectedCategory={onSelectedCategory} />);

    // accessing the movie element
    const movieElem = screen.getByText("Movies");

    expect(movieElem).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(movieElem);
    });

    expect(selectedCategory).toBe("movie");
  });
});
