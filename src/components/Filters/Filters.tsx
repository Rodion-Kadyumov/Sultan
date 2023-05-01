import css from "./Filters.module.scss";
import React, { useEffect, useRef, useState } from "react";
import {
  catalogueItem,
  fieldCount,
  filteringData,
  priceRange,
} from "assets/types";
import { PriceFilter } from "components/UI/priceFilter/PriceFilter";
import { CompanyFilter } from "components/UI/companyFilter/CompanyFilter";
import { MyButton } from "components/UI/button/MyButton";
import { DeleteFilled } from "@fluentui/react-icons";
import catalogue from "assets/catalogue.json";

export const Filters = ({
  filtersData,
  chandgeFiltersData,
  windowWidth,
}: {
  filtersData: Array<filteringData>;
  chandgeFiltersData: (result: Array<filteringData>) => void;
  windowWidth: number;
}) => {
  const defaultMax = [...catalogue].sort((a, b) => {
    return +a.price.replace(/,/, ".") < +b.price.replace(/,/, ".") ? 1 : -1;
  })[0].price;

  const [isfiltersActive, setIsFiltersActive] = useState(false);
  const [listActive, setListActive] = useState<Array<string>>([]);
  const [prices, setPrices] = useState<priceRange>({
    min: 0,
    max: +defaultMax,
  });
  const clearRef = useRef(false);

  const companyList = catalogue.reduce(
    (obj: fieldCount, element: catalogueItem) => {
      if (obj[element.company]) {
        obj[element.company]++;
        return obj;
      } else {
        return {
          ...obj,
          [element.company]: 1,
        };
      }
    },
    {}
  );

  const submitHandler = () => {
    chandgeFiltersData([
      ...filtersData.filter(
        (filter) => !["price", "company"].includes(filter.slug)
      ),
      { slug: "price", type: "more", value: prices.min.toString() },
      { slug: "price", type: "less", value: prices.max.toString() },
      ...(listActive.length > 0
        ? [{ slug: "company", type: "has", value: listActive }]
        : []),
    ]);
  };

  const clearHandler = () => {
    clearRef.current = true;
    setPrices({ min: 0, max: +defaultMax });
    setListActive([]);
  };

  useEffect(() => {
    if (clearRef.current === true) {
      clearRef.current = false;
      chandgeFiltersData([]);
    }
  });

  return (
    <div className={css.filter}>
      <div className={css.filter__title}>
        <h2>Подбор по параметрам</h2>
        {windowWidth < 680 && (
          <button
            style={{
              transform: isfiltersActive ? "rotate(90deg)" : "rotate(270deg)",
            }}
            onClick={() => {
              setIsFiltersActive((curr) => !curr);
            }}
            className={css.filter__btn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="8"
              viewBox="0 0 10 20"
              strokeWidth={2.5}
            >
              <polyline points="10,0 0,10 10,20" />
            </svg>
          </button>
        )}
      </div>
      <div
        style={{
          display: isfiltersActive || windowWidth >= 680 ? "grid" : "none",
        }}
        className={css.filter__filters}
      >
        <PriceFilter
          max={prices.max}
          min={prices.min}
          defaultMax={defaultMax}
          callback={(result: priceRange) => {
            setPrices(result);
          }}
        />
        <CompanyFilter
          list={companyList}
          listActive={listActive}
          callback={(result: string) => {
            if (listActive.includes(result)) {
              setListActive(listActive.filter((element) => element !== result));
            } else {
              setListActive([...listActive, result]);
            }
          }}
        />
      </div>
      <div
        style={{
          display: isfiltersActive || windowWidth >= 680 ? "flex" : "none",
        }}
        className={css.filter__buttons}
      >
        <MyButton
          width="100%"
          maxWidth="100%"
          text="Показать"
          click={() => submitHandler()}
        />
        <MyButton
          icon={<DeleteFilled style={{ width: "25px", height: "25px" }} />}
          click={() => {
            clearHandler();
          }}
        ></MyButton>
      </div>
    </div>
  );
};
