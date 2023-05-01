import css from "./PriceFilter.module.scss";
import React from "react";
import { priceRange } from "assets/types";

export const PriceFilter = ({
  max,
  min,
  defaultMax,
  callback,
}: {
  max: number,
  min: number,
  defaultMax: string;
  callback: (result: priceRange) => void;
}) => {
  return (
    <div className={css.filter}>
      <h3>
        <span>Цена</span>₸
      </h3>
      <div>
        <input
          type="text"
          pattern="[0-9]+"
          onBlur={(e) => {
            if (e.target.value === "") {
              callback({ min: 0, max: + max});
            } else if (+e.target.value > +max) {
              callback({ min: +max - 1, max: +max });
            }
          }}
          onChange={(e) => {
            callback({
              min: +e.target.value.replace(/\D/g, ""),
              max: +max,
            });
          }}
          value={min}
        />
        <span>-</span>
        <input
          type="text"
          onBlur={(e) => {
            if (e.target.value === "") {
              callback({ min: +min, max: +defaultMax });
            } else if (+e.target.value < +min) {
              callback({ min: +min, max: +min + 1 });
            }
          }}
          onChange={(e) => {
            callback({
              min: +min,
              max: +e.target.value.replace(/\D/g, ""),
            });
          }}
          value={max}
        />
      </div>
    </div>
  );
};
