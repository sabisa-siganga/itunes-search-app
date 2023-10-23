import { useState } from "react";
import "./searchBar.scss";

interface Props {
  onAddFavFnc: () => void;
  onSearch: (value: string) => void;
  showFavourites: boolean;
}

function SearchBar(props: Props) {
  const [inputValue, setInputValue] = useState("");

  const { onAddFavFnc, onSearch, showFavourites } = props;

  const onAddFav = () => {
    onAddFavFnc();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="header-container mt-5 mb-4">
      <div className="search-bar ">
        <input type="text" onChange={onChange} />
        <button className="btn btn-dark" onClick={onClick}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      <div className="fav-btn-container">
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
