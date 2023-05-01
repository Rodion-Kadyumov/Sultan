import css from "./MyCheckbox.module.scss";
import React from "react";

export const MyCheckbox = ({
  text,
  slug,
  count,
  isActive = false,
  isVisible = true,
  callback,
}: {
  text: string;
  slug?: string;
  count?: number;
  isActive?: boolean;
  isVisible?: boolean;
  callback: (result: string) => void;
}) => {
  return (
    <div
      key={text}
      className={
        isVisible
          ? css.checkbox + " unselectable"
          : css.checkbox + " unselectable " + css.checkbox_invisible
      }
    >
      <input
        onChange={() => {
          callback && callback(slug ? slug : text);
        }}
        checked={isActive}
        type="checkbox"
        name={text}
        id={text}
      />
      <label htmlFor={text}>
        {text}
        {count && <span>({count})</span>}
      </label>
    </div>
  );
};
