import css from "./PriceBlock.module.scss";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { catalogueItem } from "assets/types";
import { itemPrice } from "components/Functions/itemPrice";
import { MyCounter } from "../counter/MyCounter";
import { MyButton } from "../button/MyButton";
import { DeleteFilled } from "@fluentui/react-icons";
import { SlBasket } from "react-icons/sl";

export const PriceBlock = ({
  inCart,
  catalogueItem,
  getCartAction,
  windowWidth,
}: {
  inCart?: { count: number; info: catalogueItem };
  catalogueItem: catalogueItem;
  getCartAction: (action: "+" | "-" | "0") => void;
  windowWidth: number;
}) => {
  if (windowWidth >= 680) {
    return (
      <div className={css.block}>
        <div className={css.block__price}>
          {inCart ? (
            <span>{itemPrice(inCart.count, catalogueItem.price) + " ₸"}</span>
          ) : (
            <span>{catalogueItem.price + " ₸"}</span>
          )}
          {inCart && (
            <MyCounter
              count={inCart.count}
              action={(result: "+" | "-" | "0") => {
                getCartAction(result);
              }}
            />
          )}
          {!inCart ? (
            <MyButton
              click={() => {
                getCartAction("+");
              }}
              icon={<SlBasket size={27} />}
              text="В КОРЗИНУ"
              fontSize="10px"
              letterSpacing="0.15em"
              gap="5px"
            />
          ) : (
            <MyButton
              icon={<DeleteFilled style={{ width: "25px", height: "25px" }} />}
              click={() => {
                getCartAction("0");
              }}
            ></MyButton>
          )}
        </div>
        <div className={css.block__additional}>
          <div>
            <CiShare2 style={{ width: "24px", height: "24px" }} />
          </div>
          <div>
            <p>
              При покупке от <span>10 000 ₸</span> бесплатная доставка по
              Кокчетаву и области
            </p>
          </div>
          <div>
            <span>Прайс-лист</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
            >
              <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={css.mobileBlock}>
        <div className={css.mobileBlock__price}>
          {inCart ? (
            <span>{itemPrice(inCart.count, catalogueItem.price) + " ₸"}</span>
          ) : (
            <span>{catalogueItem.price + " ₸"}</span>
          )}
          {inCart && (
            <MyCounter
              count={inCart.count}
              action={(result: "+" | "-" | "0") => {
                getCartAction(result);
              }}
            />
          )}
        </div>
        <div className={css.mobileBlock__btns}>
          {!inCart ? (
            <MyButton
              click={() => {
                getCartAction("+");
              }}
              icon={<SlBasket size={27} />}
              text="В КОРЗИНУ"
              fontSize="10px"
              letterSpacing="0.15em"
              gap="5px"
            />
          ) : (
            <MyButton
              icon={<DeleteFilled style={{ width: "25px", height: "25px" }} />}
              click={() => {
                getCartAction("0");
              }}
            ></MyButton>
          )}
          <div>
            <CiShare2 style={{ width: "24px", height: "24px" }} />
          </div>
        </div>
        <div className={css.mobileBlock__additional}>
          <div>
            <p>
              При покупке от <span>10 000 ₸</span> бесплатная доставка по
              Кокчетаву и области
            </p>
          </div>
          <div>
            <span>Прайс-лист</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
            >
              <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }
};
