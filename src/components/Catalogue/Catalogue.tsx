import "./Catalogue.scss";
import React, { ReactNode, useEffect, useState } from "react";
import { CatalogueCard } from "components/UI/catalogueCard/CatalogueCard";
import { MyPagination } from "components/UI/pagination/MyPagination";
import { cartItem, catalogueItem } from "assets/types";

export const Catalogue = ({
  page,
  limit,
  list,
  changePage,
  cartItems,
  getCartItems,
  controllerCallback,
}: {
  page: number;
  limit: number;
  list: Array<catalogueItem>;
  changePage: (page: number) => void;
  cartItems: cartItem;
  getCartItems: (result: cartItem) => void;
  controllerCallback: (result: catalogueItem) => void;
}) => {
  const [pageElements, setPageElements] = useState<Array<ReactNode>>([]);
  const pagesCount = Math.ceil(list.length / limit);

  useEffect(() => {
    let items = [];

    for (let i = 0; i < limit && i + limit * page < list.length; i++) {
      items.push(
        <CatalogueCard
          key={list[i + limit * page].barcode}
          cardInfo={list[i + limit * page]}
          cartItems={cartItems}
          getCartItems={getCartItems}
          controllerCallback={controllerCallback}
        />
      );
    }

    setPageElements(items);
  }, [page, list, limit, cartItems, getCartItems, controllerCallback]);

  return (
    <div className="catalogue">
      <div className="catalogue__list">{pageElements.map((item) => item)}</div>
      <div className="catalogue__pagination">
        {pagesCount > 1 && (
          <MyPagination
            currentPage={page}
            pagesCount={pagesCount}
            changePage={(page: number) => {
              changePage(page);
            }}
          />
        )}
      </div>
    </div>
  );
};