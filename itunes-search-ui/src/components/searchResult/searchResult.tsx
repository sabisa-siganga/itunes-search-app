import React from "react";
import "./searchResult.scss";

// inteface for Result
export interface Result {
  id: number;
  image: string;
  title: string;
  author: string;
}

// interface for props
interface Props {
  id: number;
  image: string;
  title: string;
  author: string;
  updateFavourites: (data: Result[]) => void;
  showingFav: boolean;
}

/**
 * Searching for the results
 */
function SearchResult(props: Props) {
  let { id, image, title, showingFav, author, updateFavourites } = props;

  /**
   * Deleting the item from the list of favourites
   */
  async function deleteFavorite() {
    const itemUrl = `/favourites/${id}`;

    try {
      const response = await fetch(itemUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await response.json();

      // updating the state
      updateFavourites(results.favourites);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Adding the item to the list of favourites
   */
  async function onAdd() {
    try {
      await fetch("/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: image,
          title: title,
          author: author,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Adding an item to favourites when showingFav is true, otherwise delete the item
   */
  async function onFavClick() {
    if (showingFav) {
      await deleteFavorite();
    } else {
      await onAdd();
    }
  }

  return (
    <div className="result-container mb-3 ">
      <div className="result-item">
        {/* displaying the result item */}
        <img src={image} alt="img" />
        <div className="info">
          <h1 data-testid="title">{title}</h1>
          <h2 data-testid="author">{author}</h2>
        </div>
      </div>
      {/* favourite button */}
      <button onClick={onFavClick} className={showingFav ? "red" : "black"}>
        <span className="material-symbols-outlined">favorite</span>
      </button>
    </div>
  );
}

export default SearchResult;
