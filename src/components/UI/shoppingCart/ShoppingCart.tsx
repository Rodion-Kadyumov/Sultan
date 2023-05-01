import css from "./ShoppingCart.module.scss";
import React from "react";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";
import { cartItem } from "assets/types";
import { cartSum } from "components/Functions/cartSum";

export const ShoppingCart = ({
  cartItems,
  isMobile,
}: {
  cartItems: cartItem;
  isMobile?: boolean;
}) => {
  const itemsCount = cartItems.length;

  return (
    <Link
      to="/cart"
      style={{ marginRight: isMobile ? "12px" : "" }}
      className={css.cart}
    >
      <div className={css.cart__icon}>
        <SlBasket style={{ width: "40px", height: "29px" }} />
        {itemsCount > 0 && <div className={css.cart__count}>{itemsCount}</div>}
      </div>
      {!isMobile && (
        <div>
          <span className={css.cart__text}>Корзина</span>
          <div className={css.cart__sum}>
            <span>{cartSum(cartItems)}</span>
            <span> ₸</span>
          </div>
        </div>
      )}
    </Link>
  );
};
