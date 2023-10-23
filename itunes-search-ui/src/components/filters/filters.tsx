import React, { useState } from "react";
import "./filters.scss";

// interface for category
interface Category {
  label: string;
  value: string;
  isSelected: boolean;
}

interface Props {
  onSelectedCategory: (selectedCategory: string) => void;
}

/**
 * Displaying the categories
 */
function Filters(props: Props) {
  const { onSelectedCategory } = props;
  // movie, podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook
  const [categories, setCategories] = useState<Category[]>([
    // list of categories
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

  /**
   *
   */
  const onFilter = (categoryIndex: number) => {
    const updatedCategories: Category[] = [];
    let selectedCategory: string = "";

    categories.forEach((category, index) => {
      category = {
        ...category,
        isSelected: categoryIndex === index,
      };

      if (category.isSelected) {
        selectedCategory = category.value;
      }

      updatedCategories.push(category);
    });

    setCategories(updatedCategories);
    onSelectedCategory(selectedCategory);
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
