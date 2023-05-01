import css from "./Page404.module.scss";
import React, { useState } from "react";
import { Header } from "components/Header/Header";
import { cartItem } from "assets/types";
import { BreadCrumbs } from "components/UI/breadCrumbsNav/BreadCrumbs";
import { Footer } from "components/Footer/Footer";
import { useWindowResize } from "hooks/useWindowResize";

export const Page404 = () => {
  const cartItems: cartItem = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useWindowResize((width: number) => {
    setWindowWidth(width);
  });

  return (
    <div className={css.page}>
      <Header windowWidth={windowWidth} cartItems={cartItems} />
      <nav className={css.page__nav}>
        <BreadCrumbs windowWidth={windowWidth} />
      </nav>
      <main className={css.page__main}>
        <h1 className={css.page__text}>Страница не найдена</h1>
      </main>
      <Footer windowWidth={windowWidth} />
    </div>
  );
};
