import css from "./CompanyFilter.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { MySearch } from "../search/MySearch";
import { DirectionArrow } from "../directionArrow/DirectionArrow";
import { MyCheckbox } from "../checkbox/MyCheckbox";
import { fieldCount } from "assets/types";

export const CompanyFilter = ({
  list,
  listActive,
  callback,
}: {
  list: fieldCount;
  listActive: Array<string>;
  callback: (result: string) => void;
}) => {


  const [companyList, setCompanyList] = useState(list);

  
  const [isListVisible, setIsListVisible] = useState(true);
  const firstRender = useRef(true);
  let counter = 0;


  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
      Object.keys(list).length > 4 && setIsListVisible(false);
    }
  }, [list, setIsListVisible]);

  return (
    <div className={css.filter}>
      <h3>Производитель</h3>
      <MySearch
        isInstant={true}
        list={Object.keys(list)}
        callback={(result: Array<string>) => {
          const resultList = result.reduce((obj, element) => {
            return {
              ...obj,
              [element]: list[element],
            };
          }, {});
          setCompanyList(resultList);
        }}
      />

{/* Поиск по производителю с чекбоксом */}

      <div className={css.filter__list}>
        {Object.keys(companyList).map((company) => {
          counter++;
          return (
            <MyCheckbox
              isActive={listActive.includes(company)}
              key={company}
              isVisible={isListVisible || counter < 5}
              text={company}
              count={companyList[company]}
              callback={(result: string) => {
                callback(result)
              }}
            />
          );
        })}
      </div>

{/* Показать все */}

      {Object.keys(companyList).length > 4 && (
        <button
          onClick={() => {
            counter = 0;
            setIsListVisible((current) => !current);
          }}
          className={css.filter__button}
        >
          {isListVisible ? (
            <span>
              Скрыть
              <DirectionArrow direction="asc" />
            </span>
          ) : (
            <span>
              Показать все
              <DirectionArrow direction="desc" />
            </span>
          )}
        </button>
      )}
    </div>
  );
};
