import css from "./CatalogueCard.module.scss";
import React from "react";
import { cartItem, catalogueItem } from "assets/types";
import { MyButton } from "../button/MyButton";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";
import { MyCounter } from "../counter/MyCounter";
import { cartHandler } from "components/Functions/cartHandler";
import { DeleteFilled } from "@fluentui/react-icons";
import { ItemSize } from "../itemSize/ItemSize";
import { itemPrice } from "components/Functions/itemPrice";
import { Icon } from "@iconify/react";

export const CatalogueCard = ({
  cardInfo,
  cartItems,
  getCartItems,
  controllerCallback,
}: {
  cardInfo: catalogueItem;
  cartItems: cartItem;
  getCartItems: (result: cartItem) => void;
  controllerCallback: (result: catalogueItem) => void;
}) => {
  const existedItem = cartItems.find(
    (cartItem) => cardInfo.barcode === cartItem.info.barcode
  );

  return (
    <div className={css.card}>
      <div className={css.card__top}>
        <div className={css.card__edit}>
          <MyButton
            width="32px"
            height="32px"
            icon={<Icon icon="material-symbols:edit" width="16" />}
            click={() => {
              controllerCallback(cardInfo);
            }}
          />
        </div>
        <img src={cardInfo.image} alt="" />
      </div>
      <div className={css.card__bottom}>
        <div className={css.card__title}>
          <ItemSize sizeType={cardInfo.sizeType} size={cardInfo.size} />
          <Link
            className={css.card__link}
            to={"/catalogue/" + cardInfo.barcode}
          >
            {cardInfo.brand} <span>{cardInfo.name}</span>
          </Link>
        </div>
        <div className={css.card__info}>
          <div>
            <span>Штрихкод: </span>
            <span>{cardInfo.barcode}</span>
          </div>
          <div>
            <span>Производитель: </span>
            <span>{cardInfo.company}</span>
          </div>
          <div>
            <span>Брэнд: </span>
            <span>{cardInfo.brand}</span>
          </div>
        </div>
        <div
          style={{ gridTemplateColumns: existedItem ? "1fr" : "1fr 1fr" }}
          className={css.card__price}
        >
          {existedItem ? (
            <span style={{ textAlign: "center" }}>
              {itemPrice(existedItem.count, cardInfo.price) + " ₸"}
            </span>
          ) : (
            <span>{cardInfo.price + " ₸"}</span>
          )}
          <div>
            {!existedItem ? (
              <MyButton
                click={() =>
                  getCartItems(cartHandler("+", cardInfo, cartItems))
                }
                icon={<SlBasket size={27} />}
                text="В КОРЗИНУ"
                fontSize="10px"
                letterSpacing="0.15em"
                gap="5px"
              />
            ) : (
              <MyCounter
                action={(result: "+" | "-") =>
                  getCartItems(cartHandler(result, cardInfo, cartItems))
                }
                count={existedItem?.count || 0}
              />
            )}
            {existedItem && (
              <MyButton
                icon={
                  <DeleteFilled style={{ width: "25px", height: "25px" }} />
                }
                click={() => {
                  getCartItems(cartHandler("0", cardInfo, cartItems));
                }}
              ></MyButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
