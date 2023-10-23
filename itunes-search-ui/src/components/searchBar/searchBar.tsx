import { useState } from "react";
import "./searchBar.scss";

// interface for props
interface Props {
  onAddFavFnc: () => void;
  onSearch: (value: string) => void;
  showFavourites: boolean;
}

function SearchBar(props: Props) {
  // state
  const [inputValue, setInputValue] = useState("");

  // props destructuring
  const { onAddFavFnc, onSearch, showFavourites } = props;

  /**
   * Triggering addition of favourites
   */
  const onAddFav = () => {
    onAddFavFnc();
  };

  /***
   * Accessing input value
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * triggering the search prop
   */
  const onClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="header-container mt-5 mb-4">
      <div className="search-bar ">
        {/* input */}
        <input type="text" onChange={onChange} />
        {/* search button */}
        <button className="btn btn-dark" onClick={onClick}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      <div className="fav-btn-container">
        {/* Favourite button */}
        <button
          className={showFavourites ? `fav-btn red` : " fav-btn black"}
          onClick={onAddFav}
        >
          <span className="material-symbols-outlined ">favorite</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
