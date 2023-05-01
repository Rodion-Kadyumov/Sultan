import css from "./CataloguePage.module.scss";
import React, { useEffect, useState } from "react";
import { Header } from "components/Header/Header";
import { Catalogue } from "components/Catalogue/Catalogue";
import { BreadCrumbs } from "components/UI/breadCrumbsNav/BreadCrumbs";
import { MySorting } from "components/UI/sorting/MySorting";
import {
  cartItem,
  catalogueItem,
  filteringData,
  sortMethod,
} from "assets/types";
import { FieldFilter } from "components/UI/fieldFilter/FieldFilter";
import { Filters } from "components/Filters/Filters";
import { useSorting } from "hooks/useSorting";
import { useFiltering } from "hooks/useFiltering";
import { Footer } from "components/Footer/Footer";
import { useWindowResize } from "hooks/useWindowResize";
import { getCatalogue } from "components/Functions/getCatalogue";
import { ItemControllerForm } from "components/ItemForm/ItemControllerForm";
import { MyButton } from "components/UI/button/MyButton";
import { Icon } from "@iconify/react";

export const CataloguePage = () => {
  const [page, setPage] = useState(0);
  const [cartItems, setCartItems] = useState<cartItem>(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  const [filters, setFilters] = useState<Array<filteringData>>([]);

  // Сортировка
  const [sortingInfo, setSortingInfo] = useState<sortMethod>({
    slug: "brand",
    direction: "asc",
  });

  
  const [catalogueItems, setCatalogueItems] = useState<Array<catalogueItem>>(
    getCatalogue()
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isControllerActive, setIsControllerActive] = useState(false);
  const [itemInfo, setItemInfo] = useState<catalogueItem>();

  useWindowResize((width: number, height: number) => {
    setWindowWidth(width);
    setWindowHeight(height);
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("catalogueItems", JSON.stringify(catalogueItems));
  }, [catalogueItems]);

  return (
    <div className={css.page}>
      <Header windowWidth={windowWidth} cartItems={cartItems} />
      <nav className={css.page__nav}>
        <BreadCrumbs windowWidth={windowWidth} />
      </nav>
      <main className={css.page__main}>
        <div className={css.page__top}>
          <div className={css.page__wrapper}>
            <div>
              <h1 className={css.page__title}>Косметика и гигиена</h1>
              <MyButton
                icon={<Icon icon="material-symbols:add" width="24" />}
                width="39px"
                height="39px"
                click={() => {
                  setIsControllerActive(true);
                }}
              />
            </div>

{/* Сортировка */}

            <MySorting
              sortOptions={[
                { slug: "brand", text: "Название", direction: "asc" },
                { slug: "brand", text: "Название", direction: "desc" },
                { slug: "price", text: "Цена", direction: "asc" },
                { slug: "price", text: "Цена", direction: "desc" },
              ]}
              callback={(result: sortMethod) => {
                setSortingInfo(result);
              }}
            />
          </div>


          <FieldFilter
            isVertical={windowWidth < 680}
            filtersData={filters}
            filters={[
              { slug: "treatment", value: "body", text: "Уход за телом" },
              { slug: "treatment", value: "hands", text: "Уход за руками" },
              { slug: "treatment", value: "legs", text: "Уход за ногами" },
              { slug: "treatment", value: "face", text: "Уход за лицом" },
              { slug: "treatment", value: "hair", text: "Уход за волосами" },
            ]}
            chandgeFiltersData={(result: Array<filteringData>) => {
              setPage(0);
              setFilters(result);
            }}
          />
        </div>
        <div className={css.page__bottom}>
          <div className={css.page__left}>
            <Filters
              windowWidth={windowWidth}
              filtersData={filters}
              chandgeFiltersData={(result: Array<filteringData>) => {
                setPage(0);
                setFilters(result);
              }}
            />


            {windowWidth >= 680 && (
              <FieldFilter
                isVertical={true}
                filtersData={filters}
                filters={[
                  { slug: "treatment", value: "body", text: "Уход за телом" },
                  { slug: "treatment", value: "hands", text: "Уход за руками" },
                  { slug: "treatment", value: "legs", text: "Уход за ногами" },
                  { slug: "treatment", value: "face", text: "Уход за лицом" },
                  {
                    slug: "treatment",
                    value: "hair",
                    text: "Уход за волосами",
                  },
                ]}
                chandgeFiltersData={(result: Array<filteringData>) => {
                  setFilters(result);
                }}
              />
            )}
          </div>
          <div className={css.page__right}>

            
            <Catalogue
              page={page}
              changePage={(page: number) => setPage(page)}
              list={useSorting({
                list: useFiltering({
                  list: catalogueItems,
                  filters: filters,
                }),
                ...sortingInfo,
              })}
              limit={15}
              cartItems={cartItems}
              getCartItems={(result: cartItem) => {
                setCartItems(result);
              }}
              controllerCallback={(result: catalogueItem) => {
                setIsControllerActive(true);
                setItemInfo(result);
              }}
            />
            <article>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                interdum ut justo, vestibulum sagittis iaculis iaculis. Quis
                mattis vulputate feugiat massa vestibulum duis. Faucibus
                consectetur aliquet sed pellentesque consequat consectetur
                congue mauris venenatis. Nunc elit, dignissim sed nulla
                ullamcorper enim, malesuada.
              </p>
            </article>
          </div>
        </div>
      </main>
      <Footer windowWidth={windowWidth} />
      {isControllerActive && (
        <ItemControllerForm
          itemInfo={itemInfo}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          closeCallback={(action?: string, result?: catalogueItem) => {
            setIsControllerActive(false);
            setItemInfo(undefined);
            if (action && result) {
              switch (action) {
                case "remove":
                  setCatalogueItems(
                    catalogueItems.filter(
                      (el) => el.barcode !== result?.barcode
                    )
                  );
                  break;
                case "update":
                  let index = catalogueItems.findIndex(
                    (el) => el.barcode === result.barcode
                  );
                  let newResult = [...catalogueItems];

                  newResult.splice(index, 1, result);
                  setCatalogueItems(newResult);
                  break;
                case "create":
                  setCatalogueItems([...catalogueItems, result]);
              }
            }
          }}
        />
      )}
    </div>
  );
};
