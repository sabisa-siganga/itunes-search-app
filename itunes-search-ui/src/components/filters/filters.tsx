import React, { useState } from "react";
import "./filters.scss";

// interface for category
interface Category {
  label: string;
  value: string;
  isSelected: boolean;
}

// interface for props
interface Props {
  onSelectedCategory: (selectedCategory: string) => void;
}

/**
 * Displaying the categories
 */
function Filters(props: Props) {
  // props destructuring
  const { onSelectedCategory } = props;

  // state
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
   *Marking the selected category as true using its index from the array and marking every other category as false
   */
  const onFilter = (categoryIndex: number) => {
    const updatedCategories: Category[] = [];
    let selectedCategory: string = "";

    // searching for the selected index
    categories.forEach((category, index) => {
      category = {
        ...category,
        isSelected: categoryIndex === index,
      };

      // check for the selected category
      if (category.isSelected) {
        selectedCategory = category.value;
      }

      updatedCategories.push(category);
    });

    // updating the state
    setCategories(updatedCategories);

    onSelectedCategory(selectedCategory);
  };

  return (
    <div className="filters-container mb-5">
      <ul>
        {/* displaying the categories */}
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
