import css from "./CatalogueItemPage.module.scss";
import React, { useEffect, useState } from "react";
import { Header } from "components/Header/Header";
import { cartItem, catalogueItem } from "assets/types";
import { Footer } from "components/Footer/Footer";
import { BreadCrumbs } from "components/UI/breadCrumbsNav/BreadCrumbs";
import { useParams } from "react-router-dom";
import { ItemSize } from "components/UI/itemSize/ItemSize";
import { DirectionArrow } from "components/UI/directionArrow/DirectionArrow";
import { useWindowResize } from "hooks/useWindowResize";
import { PriceBlock } from "components/UI/priceBlock/PriceBlock";
import { cartHandler } from "components/Functions/cartHandler";
import {getCatalogue} from "components/Functions/getCatalogue";

export const CatalogueItemPage = () => {
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [isListActive, setIsListActive] = useState(false);
  const [cartItems, setCartItems] = useState<cartItem>(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  const catalogueItems = getCatalogue();
  const catalogueBarcodes = catalogueItems.reduce(
    (arr: Array<string>, item: catalogueItem) => {
      return [...arr, item.barcode];
    },
    []
  );

  const params = useParams();
  const catalogueItem: catalogueItem = catalogueItems.find(
    (el: catalogueItem) => el.barcode === params.id
  );
  const inCart = cartItems.find(
    (el) => el.info.barcode === catalogueItem.barcode
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useWindowResize((width: number) => {
    setWindowWidth(width);
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <Header windowWidth={windowWidth} cartItems={cartItems} />
      <nav className={css.page__nav}>
        <BreadCrumbs windowWidth={windowWidth} />
      </nav>
      <main className={css.page__main}>
        {catalogueBarcodes.includes(params.id) ? (
          <div className={css.page__item}>
            <div className={css.page__left}>
              <img src={catalogueItem.image} alt="Catalogue item" />
            </div>
            <div className={css.page__right}>
              <div className={css.page__top}>
                <span>В наличии</span>
                <h3 className={css.page__title}>
                  {catalogueItem.brand}
                  <span> {catalogueItem.name}</span>
                </h3>
                <ItemSize
                  sizeType={catalogueItem.sizeType}
                  size={catalogueItem.size}
                />
              </div>
              <PriceBlock
                inCart={inCart}
                catalogueItem={catalogueItem}
                windowWidth={windowWidth}
                getCartAction={(action: "+" | "-" | "0") => {
                  setCartItems(cartHandler(action, catalogueItem, cartItems));
                }}
              />
              <div className={css.page__info}>
                <span>
                  Производитель:<span>{catalogueItem.company}</span>
                </span>
                <span>
                  Бренд:<span>{catalogueItem.brand}</span>
                </span>
                <span>
                  Артикул:<span>{catalogueItem.barcode}</span>
                </span>
                <span>
                  Штрихкод:<span>{catalogueItem.barcode}</span>
                </span>
              </div>
              <div className={css.page__about}>
                <div>
                  <button
                    onClick={() => {
                      setIsAboutActive((curr) => !curr);
                    }}
                  >

{/* Тоже надо  */}

                    <h3 style={{ opacity: isAboutActive ? ".2" : "1" }}>
                      Описание
                    </h3>
                    <DirectionArrow
                      direction={isAboutActive ? "asc" : "desc"}
                    />
                  </button>
                  {isAboutActive && <p>{catalogueItem.about}</p>}
                </div>
                <div className={css.page__line} />
                <div>
                  <button
                    onClick={() => {
                      setIsListActive((curr) => !curr);
                    }}
                  >
                    <h3 style={{ opacity: isListActive ? ".2" : "1" }}>
                      Характеристики
                    </h3>
                    <DirectionArrow direction={isListActive ? "asc" : "desc"} />
                  </button>
                  {isListActive && (
                    <div>
                      <span>
                        Назначение:<span>{catalogueItem.brand}</span>
                      </span>
                      <span>
                        Тип:<span>{catalogueItem.brand}</span>
                      </span>
                      <span>
                        Производитель:<span>{catalogueItem.company}</span>
                      </span>
                      <span>
                        Бренд:<span>{catalogueItem.brand}</span>
                      </span>
                      <span>
                        Артикул:<span>{catalogueItem.barcode}</span>
                      </span>
                      <span>
                        Штрихкод:<span>{catalogueItem.barcode}</span>
                      </span>
                      <span>
                        Вес:
                        <span>
                          {catalogueItem.size} {catalogueItem.sizeType}
                        </span>
                      </span>
                      <span>
                        Объем:
                        <span>
                          {catalogueItem.size} {catalogueItem.sizeType}
                        </span>
                      </span>
                      <span>
                        Кол-во в коробке:
                        <span>
                          {catalogueItem.size} {catalogueItem.sizeType}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className={css.page__notFound}>Товар не найден</h1>
        )}
      </main>
      <Footer windowWidth={windowWidth} />
    </div>
  );
};
