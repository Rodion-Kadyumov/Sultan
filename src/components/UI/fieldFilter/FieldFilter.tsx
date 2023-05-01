import css from "./FieldFilter.module.scss";
import React from "react";
import { filteringData, filterMethod } from "assets/types";

export const FieldFilter = ({
  filtersData,
  filters,
  chandgeFiltersData,
  isVertical = false,
}: {
  filters: Array<filterMethod>;
  filtersData: Array<filteringData>;
  chandgeFiltersData: (result: Array<filteringData>) => void;
  isVertical?: boolean;
}) => {
  return (
    <div
      className={
        isVertical ? css.filter + " " + css.filter_vertical : css.filter
      }
    >

{/* Уход */}

      {isVertical && <h2 className={css.filter__title}>Уход</h2>}
      {filters.map((filter) => {
        let existedFilter = filtersData.find(
          (el) => el.slug === filter.slug && el.type === "has"
        );

        return (
          <div
            key={filter.value}
            onClick={() => {
              if (!existedFilter) {
                chandgeFiltersData([
                  ...filtersData,
                  { slug: filter.slug, type: "has", value: [filter.value] },
                ]);
              } else if (!existedFilter.value.includes(filter.value)) {
                existedFilter.value instanceof Array &&
                  existedFilter.value.push(filter.value);
                chandgeFiltersData([
                  ...filtersData.filter(
                    (el) => el.slug !== filter.slug && el.value !== "has"
                  ),
                  existedFilter,
                ]);
              } else {
                existedFilter.value instanceof Array &&
                  (existedFilter.value = existedFilter.value.filter(
                    (el) => el !== filter.value
                  ));
                chandgeFiltersData([
                  ...filtersData.filter(
                    (el) => el.slug !== filter.slug && el.value !== "has"
                  ),
                  ...(existedFilter.value.length > 0 ? [existedFilter] : []),
                ]);
              }
            }}
            className={
              isVertical
                ? existedFilter && existedFilter.value.includes(filter.value)
                  ? css.filter__verticalCard +
                    " " +
                    css.filter__verticalCard_active
                  : css.filter__verticalCard
                : existedFilter && existedFilter.value.includes(filter.value)
                ? css.filter__card + " " + css.filter__card_active
                : css.filter__card
            }
          >
            {filter.text.split(" ")[0]}
            {isVertical ? ' ' : <br />}
            {filter.text
              .split(" ")
              .splice(1, filter.text.split(" ").length)
              .join(" ")}
          </div>
        );
      })}
    </div>
  );
};
