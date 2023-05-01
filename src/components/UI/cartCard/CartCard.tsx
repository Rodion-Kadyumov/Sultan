import css from "./CartCard.module.scss";
import React from "react";
import { catalogueItem } from "assets/types";
import { MyCounter } from "../counter/MyCounter";
import { MyButton } from "../button/MyButton";
import { DeleteFilled } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import { ItemSize } from "../itemSize/ItemSize";
import { itemPrice } from "components/Functions/itemPrice";

export const CartCard = ({
  getCartAction,
  cardData,
  windowWidth,
}: {
  getCartAction: (result: "+" | "-" | "0") => void;
  cardData: { count: number; info: catalogueItem };
  windowWidth: number;
}) => {
  return (
    <div className={css.card}>
      <div className={css.card__left}>
        <div className={css.card__image}>
          <img src={cardData.info.image} alt="Cart item" />
        </div>
        <div className={css.card__text}>
          <ItemSize
            sizeType={cardData.info.sizeType}
            size={cardData.info.size}
          />
          <div className={css.card__info}>
            <Link
              to={"/catalogue/" + cardData.info.barcode}
              className={css.card__title}
            >
              {cardData.info.brand} {cardData.info.name}
            </Link>
            <span className={css.card__about}>
              {cardData.info.about.length > 250 &&
                cardData.info.about.substring(0, 250) + "..."}
            </span>
          </div>
        </div>
      </div>
      <div className={css.card__right}>
        {windowWidth >= 1260 && <div className={css.card__separator} />}
        <MyCounter
          count={cardData.count}
          action={(result: "+" | "-") => {
            getCartAction(result);
          }}
        />
        <div className={css.card__separator} />
        <span className={css.card__price}>
          {itemPrice(cardData.count, cardData.info.price)}
          {" ₸"}
        </span>
        <div className={css.card__separator} />
        <MyButton
          icon={<DeleteFilled style={{ width: "25px", height: "25px" }} />}
          click={() => {
            getCartAction("0");
          }}
        ></MyButton>
      </div>
    </div>
  );
};
