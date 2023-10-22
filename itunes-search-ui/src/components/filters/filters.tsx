import React, { useState } from "react";
import "./filters.scss";

interface Category {
  label: string;
  value: string;
  isSelected: boolean;
}

interface Props {
  onSelectedCategories: (selectedCategories: string[]) => void;
}

function Filters(props: Props) {
  const { onSelectedCategories } = props;
  // movie, podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook
  const [categories, setCategories] = useState<Category[]>([
    {
      label: "All",
      value: "all",
      isSelected: true,
    },
    {
      label: "Movies",
      value: "movie",
      isSelected: false,
    },
    {
      label: "Podcast",
      value: "podcast",
      isSelected: false,
    },
    {
      label: "Music",
      value: "music",
      isSelected: false,
    },
    {
      label: "Music Video",
      value: "musicVideo",
      isSelected: false,
    },
    {
      label: "Audio Book",
      value: "audiobook ",
      isSelected: false,
    },
    {
      label: "Short Film",
      value: "shortFilm",
      isSelected: false,
    },
    {
      label: "Tv Show",
      value: "tvShow",
      isSelected: false,
    },
    {
      label: "Software",
      value: "software",
      isSelected: false,
    },
    {
      label: "Ebook",
      value: "ebook",
      isSelected: false,
    },
  ]);

  const onFilter = (categoryIndex: number) => {
    const updatedCategories: Category[] = [];
    const selectedCategories: string[] = [];

    categories.forEach((category, index) => {
      category = {
        ...category,
        isSelected: categoryIndex === index,
      };

      if (category.isSelected) {
        selectedCategories.push(category.value);
      }

      updatedCategories.push(category);
    });

    onSelectedCategories(selectedCategories);

    setCategories(updatedCategories);
  };

  return (
    <div className="filters-container mb-5">
      <ul>
        {categories.map((category, index) => (
          <li
            className={`py-1 ${category.isSelected ? "selected" : ""}`}
            onClick={() => onFilter(index)}
            key={index}
          >
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filters;
