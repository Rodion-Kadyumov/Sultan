import css from "./MySorting.module.scss";
import React, { useRef, useState } from "react";
import { useClickOutside } from "hooks/useClickOutside";
import { sortMethod } from "assets/types";
import { DirectionArrow } from "../directionArrow/DirectionArrow";

export const MySorting = ({
  sortOptions,
  callback,
}: {
  sortOptions: Array<sortMethod>;
  callback: (result: sortMethod) => void;
}) => {
  const [sorting, setSorting] = useState(sortOptions[0]);
  const [isListActive, setIsListActive] = useState(false);
  const listRef = useRef<any>(null);

  useClickOutside(listRef, () => setIsListActive(false));

  return (
    <div className={css.sort}>
      <span className={css.sort__title}>Сортировка:</span>
      <div
        ref={listRef}
        onClick={() => {
          setIsListActive(isListActive ? false : true);
        }}
        className={css.sort__selector}
      >
        <span className={css.sort__value}>
          {sorting.text}
          <DirectionArrow direction={sorting.direction} />
        </span>
        <div
          className={css.sort__list}
          style={{ display: isListActive ? "flex" : "none" }}
        >
          {sortOptions.map((option) => (
            <span
              onClick={() => {
                callback(option);
                setSorting(option);
              }}
              key={option.slug + "_" + option.direction}
              className={
                option === sortOptions[0]
                  ? css.sort__option + " " + css.sort__option_active
                  : css.sort__option
              }
            >
              {option.text}
              <DirectionArrow direction={option.direction} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};