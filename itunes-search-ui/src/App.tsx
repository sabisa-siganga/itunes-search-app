import React, { useRef, useState } from "react";
import "./App.css";
import SearchBar from "./components/searchBar/searchBar";
import Filters from "./components/filters/filters";
import SearchResult, { Result } from "./components/searchResult/searchResult";

function App() {
  const [showFavourites, setshowFavourites] = useState(false);
  const [categories, setCategories] = useState<string>("");
  const searchRef = useRef<Result[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  async function fetchFavourites() {
    try {
      const response = await fetch("/favourites");
      const results = await response.json();

      setResults(results);
    } catch (err) {
      console.log(err);
    }
  }

  const onFav = () => {
    if (!showFavourites) {
      searchRef.current = results;
      fetchFavourites();
    } else {
      console.log("hello", searchRef.current);
      setResults(searchRef.current);
    }
    setshowFavourites(!showFavourites);
  };

  const updateCategory = (catagory: string) => {
    setCategories(catagory);
  };

  async function fetchItunes(inputValue: string) {
    try {
      setshowFavourites(false);
      const response = await fetch(
        `/itunes-search?term=${inputValue}&media=${categories}`
      );
      const results = await response.json();
      console.log(results);

      setResults(results.results);
    } catch (err) {
      console.error(err);
    }
  }

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
      </div>
    </div>
  );
}

export default App;
