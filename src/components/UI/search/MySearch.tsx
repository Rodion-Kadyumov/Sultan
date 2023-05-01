import css from "./MySearch.module.scss";
import React, { useState } from "react";
import { Search } from "akar-icons";

export const MySearch = ({
  list,
  callback,
  isInstant = false,
}: {
  list: Array<string>;
  callback: (result: Array<string>) => void;
  isInstant?: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const searchHandler = (searchString: string) => {
    callback(
      list.filter((element) =>
        element.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  };

  return (
    <div className={css.search}>
      <input
        className={css.search__input}
        type="text"
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          isInstant && searchHandler(e.target.value);
        }}
      />
      <button
        onClick={() => searchHandler(searchValue)}
        className={css.search__button}
      >
        <Search size={18.5} />
      </button>
    </div>
  );
};
