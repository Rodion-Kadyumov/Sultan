import css from "./CartPage.module.scss";
import React, { useEffect, useState } from "react";
import { Header } from "components/Header/Header";
import { cartItem } from "assets/types";
import { BreadCrumbs } from "components/UI/breadCrumbsNav/BreadCrumbs";
import { Footer } from "components/Footer/Footer";
import { CartCard } from "components/UI/cartCard/CartCard";
import { cartHandler } from "components/Functions/cartHandler";
import { MyButton } from "components/UI/button/MyButton";
import { cartSum } from "components/Functions/cartSum";
import { useWindowResize } from "hooks/useWindowResize";

export const CartPage = () => {

  // Берем из каталога
  const [cartItems, setCartItems] = useState<cartItem>(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );

  // Если в корзине пусто
  const [cartText, setCartText] = useState<string>("В корзине нет товаров");

  // Определяем ширину
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useWindowResize((width: number) => {
    setWindowWidth(width);
  });


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Посде нажатия на кнопку оформить заказ 
  useEffect(() => {
    if (cartText === "Спасибо за заказ!") {
      setTimeout(() => {
        setCartText("В корзине нет товаров");
      }, 2000);
    }
  }, [cartText, setCartText]);

  return (
    <div className={css.page}>
      <Header windowWidth={windowWidth} cartItems={cartItems} />
      <nav className={css.page__nav}>
        <BreadCrumbs windowWidth={windowWidth} />
      </nav>
      <main className={css.page__main}>

        <h1>Корзина</h1>

        <div className={css.page__line} />
        {cartItems.length > 0 ? (
          <div className={css.page__cards}>
            {cartItems.map((item) => (
              <CartCard
                windowWidth={windowWidth}
                key={item.info.barcode}
                getCartAction={(result: "+" | "-" | "0") => {
                  setCartItems(cartHandler(result, item.info, cartItems));
                }}
                cardData={item}
              />
            ))}
          </div>
        ) : (
          <h3 className={css.page__text}>{cartText}</h3>
        )}
        <div className={css.page__line} />
        {cartItems.length > 0 && (
          <div className={css.page__price}>
            {windowWidth <= 680 && <span>{cartSum(cartItems)} ₸</span>}
            <div
              style={{
                justifySelf: windowWidth > 680 ? "flex-start" : "initial",
                width: windowWidth < 680 ? "100%" : "initial",
              }}
            >


              <MyButton
                width={windowWidth < 680 ? "100%" : ""}
                maxWidth={windowWidth < 680 ? "100%" : ""}
                text="Оформить заказ"
                click={() => {
                  setCartItems([]);
                  setCartText("Спасибо за заказ!");
                }}
              />

              
            </div>
            {windowWidth > 680 && (
              <span
                style={{
                  justifySelf: "flex-end",
                }}
              >
                {cartSum(cartItems)} ₸
              </span>
            )}
          </div>
        )}
      </main>
      <Footer windowWidth={windowWidth} />
    </div>
  );
};