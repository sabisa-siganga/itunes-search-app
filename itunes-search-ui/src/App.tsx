import React, { useRef, useState } from "react";
import "./App.scss";
import SearchBar from "./components/searchBar/searchBar";
import Filters from "./components/filters/filters";
import SearchResult, { Result } from "./components/searchResult/searchResult";

/**
 * Creating the full stack app that interfaces with the ituunes search api.
 * Allow the user to search for content and is able to add items to favourites and delete them as well
 */

function App() {
  // states
  const [showFavourites, setshowFavourites] = useState(false);
  const [categories, setCategories] = useState<string>("");
  const searchRef = useRef<Result[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  /**
   * Getting favourites from the api
   */
  async function fetchFavourites() {
    try {
      const response = await fetch("/favourites");
      const results = await response.json();

      setResults(results);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * toggling between favourites and search results, aslo keeping reference of  search results
   */
  const onFav = () => {
    if (!showFavourites) {
      searchRef.current = results;
      fetchFavourites();
    } else {
      setResults(searchRef.current);
    }
    // updating the state
    setshowFavourites(!showFavourites);
  };

  /**
   * updating the categories state
   */
  const updateCategory = (catagory: string) => {
    setCategories(catagory);
  };

  /**
   * Getting items from the itunes api
   */
  async function fetchItunes(inputValue: string) {
    try {
      // updating the  showFavourites state
      setshowFavourites(false);

      const response = await fetch(
        `/itunes-search?term=${inputValue}&media=${categories}`
      );
      const results = await response.json();
      console.log(results);

      // updating the Results state
      setResults(results.results);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * updating the Results state with response from the api
   */
  const updateFavourites = (data: Result[]) => {
    setResults(data);
  };

  return (
    <div className="app-container">
      <SearchBar
        onAddFavFnc={onFav}
        onSearch={fetchItunes}
        showFavourites={showFavourites}
      />
      <Filters onSelectedCategory={updateCategory} />

      <h1 className="mb-5">
        {showFavourites ? "Favourites" : "Search Results"}
      </h1>

      <div>
        {/* displaying the result items */}
        {results.map((result, index) => {
          return (
            <SearchResult
              key={index}
              id={result.id}
              image={result.image}
              title={result.title}
              author={result.author}
              showingFav={showFavourites}
              updateFavourites={updateFavourites}
            />
          );
        })}

        {/*informing the user there are no results, message depends on whether they are viewing favourites or search results  */}
        {results.length === 0 && (
          <div className="no-results">
            {!showFavourites ? "No results" : "Haven't added any favs"}{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
