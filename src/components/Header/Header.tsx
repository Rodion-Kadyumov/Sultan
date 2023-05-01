import "./Header.scss";
import React from "react";
import { Mail24Regular } from "@fluentui/react-icons";
import { Location, Search } from "akar-icons";
import { InfoCard } from "components/UI/infoCard/infoCard";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "components/UI/logo/Logo";
import { MyButton } from "components/UI/button/MyButton";
import { MySearch } from "components/UI/search/MySearch";
import { MyFeedback } from "components/UI/feedback/MyFeedback";
import { ShoppingCart } from "components/UI/shoppingCart/ShoppingCart";
import { cartItem } from "assets/types";
import { Icon } from "@iconify/react";

export const Header = ({
  cartItems,
  windowWidth,
}: {
  cartItems: cartItem;
  windowWidth: number;
}) => {
  const navigator = useNavigate();

  if (windowWidth >= 680) {
    return (
      <header className="header">
        <div className="header__top">
          <div className="header__top-left">
            <InfoCard
              icon={<Location style={{ width: "20px", height: "20px" }} />}
              boldText="г. Кокчетав, ул. Ж. Ташенова 129Б"
              normalText="(Рынок Восточный)"
            />
            <div className="header__separator" />
            <InfoCard
              icon={<Mail24Regular style={{ width: "20px", height: "20px" }} />}
              boldText="opt.sultan@mail.ru"
              normalText="На связи в любое время"
            />
          </div>
          <nav className="header__top-right">
            <Link to={"/"}>О компании</Link>
            <div className="header__separator" />
            <Link to={"/"}>Доставка и оплата</Link>
            <div className="header__separator" />
            <Link to={"/"}>Возврат</Link>
            <div className="header__separator" />
            <Link to={"/"}>Контакты</Link>
          </nav>
        </div>
        <div className="header__line" />
        <div className="header__bottom">
          <div className="header__bottom-left">
            <Link to="/">
              <Logo />
            </Link>
            <div className="header__wrapper">
              <MyButton
                icon={
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={"/hotelsru-sultan/images/frame.svg"}
                    alt="Button icon"
                  />
                }
                text="Каталог"
                click={() => navigator("/catalogue")}
              />
              <MySearch list={[]} callback={() => {}} />
            </div>
          </div>
          <div className="header__bottom-right">
            <MyFeedback />
            <div className="header__separator" />
            <MyButton
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  style={{ fill: "white" }}
                >
                  <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
                </svg>
              }
              text="Прайс-лист"
              click={() => {}}
            />
            <div className="header__separator" />
            <ShoppingCart cartItems={cartItems} />
          </div>
        </div>
        <div className="header__line" />
      </header>
    );
  } else {
    return (
      <div className="mobileHeader">
        <div className="mobileHeader__top">
          <MyButton
            icon={<Icon icon="dashicons:menu-alt" width="12" />}
            click={() => {}}
            maxWidth="32px"
            maxHeight="32px"
          />
          <Link to="/">
            <Logo maxHeight="41px" />
          </Link>
          <ShoppingCart isMobile={true} cartItems={cartItems} />
        </div>
        <div className="header__line" />
        <div className="mobileHeader__bottom">
          <button
            onClick={() => {
              navigator("/catalogue");
            }}
            className="mobileHeader__btn"
          >
            <img
              style={{ width: "15px", height: "15px" }}
              src={"/hotelsru-sultan/images/frame_gray.svg"}
              alt="Button icon"
            />
            <span>Каталог</span>
          </button>
          <div className="mobileHeader__separator" />
          <button className="mobileHeader__btn">
            <Search size={15} />
            <span>Поиск</span>
          </button>
        </div>
        <div className="header__line" />
      </div>
    );
  }
};
