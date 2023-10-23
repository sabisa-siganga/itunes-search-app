import { render, screen } from "@testing-library/react";
import SearchResult, { Result } from "./searchResult";
import renderer from "react-test-renderer";

// creating a test suited for the SearchResult component
describe("Renders: <SearchResult />", () => {
  // object that represents a result item
  let resultItem = {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1697807650304-907257330a3e?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
    title: "Only You",
    author: "Rita Ora",
    showingFavourites: false,
  };
  const onUpdateFav = (data: Result[]) => {
    console.log(data);
  };
  it("renders SearchResult component", () => {
    // rendering Searchresult component
    render(
      <SearchResult
        id={resultItem.id}
        image={resultItem.image}
        title={resultItem.title}
        author={resultItem.author}
        updateFavourites={onUpdateFav}
        showingFav={resultItem.showingFavourites}
      />
    );

    // accessing image, title and author elements
    const imageElem = screen.getByRole("img");
    const titleElem = screen.getByTestId("title");
    const authorElem = screen.getByTestId("author");

    expect(imageElem).toBeInTheDocument();
    expect(titleElem).toHaveTextContent(resultItem.title);
    expect(authorElem).toHaveTextContent(resultItem.author);
  });
  // taking the snapshot of the component
  it("taking a snapshot", () => {
    const tree = renderer
      .create(
        <SearchResult
          id={resultItem.id}
          image={resultItem.image}
          title={resultItem.title}
          author={resultItem.author}
          updateFavourites={onUpdateFav}
          showingFav={resultItem.showingFavourites}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
