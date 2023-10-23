import React from "react";
import "./searchResult.scss";

export interface Result {
  id: number;
  image: string;
  title: string;
  author: string;
}

interface Props {
  id: number;
  image: string;
  title: string;
  author: string;
  updateFavourites: (data: Result[]) => void;
  showingFav: boolean;
}

function SearchResult(props: Props) {
  let { id, image, title, showingFav, author, updateFavourites } = props;

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

      updateFavourites(results.favourites);
    } catch (err) {
      console.error(err);
    }
  }

  async function onAdd() {
    try {
      const response = await fetch("/favourites", {
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
      const results = await response.json();
      console.log(results);
    } catch (err) {
      console.error(err);
    }
  }

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
        <img src={image} alt="img" />
        <div className="info">
          <h1 data-testid="title">{title}</h1>
          <h2 data-testid="author">{author}</h2>
        </div>
      </div>
      <button onClick={onFavClick} className={showingFav ? "red" : "black"}>
        <span className="material-symbols-outlined">favorite</span>
      </button>
    </div>
  );
}

export default SearchResult;
