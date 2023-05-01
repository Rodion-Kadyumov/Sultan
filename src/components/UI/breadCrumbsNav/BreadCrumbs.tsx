import css from "./BreadCrumbs.module.scss";
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import catalogue from "assets/catalogue.json";
import { catalogueItem } from "assets/types";

export const BreadCrumbs = ({ windowWidth }: { windowWidth: number }) => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const catalogueBarcodes = catalogue.reduce(
    (arr: Array<string>, item: catalogueItem) => {
      return [...arr, item.barcode];
    },
    []
  );
  const linkSelector = (slug: string): ReactNode => {
    let link = "";
    let name = "";

    switch (slug) {
      case "":
        link = "/";
        name = "Главная";
        break;
      case "catalogue":
        link = "/catalogue";
        name = "Косметика и гигиена";
        break;
      case "cart":
        link = "/cart";
        name = "Корзина";
        break;
      default:
        link = "/" + slug;
        name = catalogueBarcodes.includes(slug)
          ? catalogue.find((el: catalogueItem) => el.barcode === slug).name
          : "Страница не найдена";
    }

    return (
      <Link
        className={
          slug === [...path].pop()
            ? css.nav__link + " " + css.nav__link_active
            : css.nav__link
        }
        key={link}
        to={link}
      >
        {name}
      </Link>
    );
  };

  if (windowWidth >= 680) {
    return (
      <div className={css.nav}>
        {[...new Set(path)].map((element) => linkSelector(element))}
      </div>
    );
  } else {
    return (
      <div
        style={{ display: location.pathname !== "/" ? "flex" : "none" }}
        className={css.mobileNav}
      >
        <Link
          to={path.length > 2 ? [...path].slice(0, -1).join("/") : "/"}
          className={css.mobileNav__btn}
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
        </Link>
        <span className={css.mobileNav__text}>назад</span>
      </div>
    );
  }
};