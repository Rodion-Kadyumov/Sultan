import "./Footer.scss";
import React from "react";
import { Logo } from "components/UI/logo/Logo";
import { EmailInput } from "components/UI/email/EmailInput";
import { Link } from "react-router-dom";
import { MyButton } from "components/UI/button/MyButton";
import { Icon } from "@iconify/react";
import { MyFeedback } from "components/UI/feedback/MyFeedback";
import { InfoCard } from "components/UI/infoCard/infoCard";

export const Footer = ({windowWidth}: {windowWidth: number}) => {
  if (windowWidth >= 680) {
    return (
      <footer className="footer">
        <div>
          <div>
            <Logo theme="white" />
            <p>
              Компания «Султан» — снабжаем розничные магазины товарами "под
              ключ" в Кокчетаве и Акмолинской области
            </p>
          </div>
          <div>
            <p className="footer__tip">Подпишись на скидки и акции</p>
            <EmailInput />
          </div>
        </div>
        <div>
          <h3>Меню сайта:</h3>
          <nav>
            <Link to="/">О компании</Link>
            <Link to="/">Доставка и оплата</Link>
            <Link to="/">Возврат</Link>
            <Link to="/">Контакты</Link>
          </nav>
        </div>
        <div>
          <h3>Категории:</h3>
          <nav>
            <Link to="/">Бытовая химия</Link>
            <Link to="/catalogue">Косметика и гигиена</Link>
            <Link to="/">Товары для дома</Link>
            <Link to="/">Товары для детей и мам</Link>
            <Link to="/">Посуда</Link>
          </nav>
        </div>
        <div>
          <div>
            <h3>Скачать прайс-лист:</h3>
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
          </div>
          <div>
            <p className="footer__tip">Связь в мессенджерах:</p>
            <div>
              <Icon icon="logos:whatsapp-icon" width={39} />
              <Icon icon="logos:telegram" width={39} />
            </div>
          </div>
        </div>
        <div>
          <h3>Контакты:</h3>
          <MyFeedback imageVisible={false} />
          <InfoCard
            boldText="opt.sultan@mail.ru"
            normalText="На связи в любое время"
          />
          <div>
            <img src={"/hotelsru-sultan/images/visa.png"} alt="Visa" />
            <img src={"/hotelsru-sultan/images/mastercard.png"} alt="MasterCard" />
          </div>
        </div>
      </footer>
    );
  } else {
    return (
      <div className="mobileFooter">
        <div>
          <div>
            <Logo maxHeight="41px" theme="white" />
            <MyButton
              fontSize="12px"
              maxHeight="40px"
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
          </div>
          <p>
            Компания «Султан» — снабжаем розничные магазины товарами "под ключ"
            в Кокчетаве и Акмолинской области
          </p>
          <p>Подпишись на скидки и акции</p>
          <EmailInput />
        </div>
        <div>
          <div>
            <h3>Меню сайта:</h3>
            <nav>
              <Link to="/">О компании</Link>
              <Link to="/">Доставка и оплата</Link>
              <Link to="/">Возврат</Link>
              <Link to="/">Контакты</Link>
            </nav>
          </div>
          <div>
            <h3>Категории:</h3>
            <nav>
              <Link to="/">Бытовая химия</Link>
              <Link to="/catalogue">Косметика и гигиена</Link>
              <Link to="/">Товары для дома</Link>
              <Link to="/">Товары для детей и мам</Link>
              <Link to="/">Посуда</Link>
            </nav>
          </div>
        </div>
        <div>
          <div>
            <h3>Контакты:</h3>
            <MyFeedback imageVisible={false} />
            <div>
              <InfoCard
                boldText="opt.sultan@mail.ru"
                normalText="На связи в любое время"
              />
              <div>
                <img src={"/hotelsru-sultan/images/visa.png"} alt="Visa" />
                <img src={"/hotelsru-sultan/images/mastercard.png"} alt="MasterCard" />
              </div>
            </div>
          </div>
          <div>
            <p>Связь в мессенджерах:</p>
            <div>
              <Icon icon="logos:whatsapp-icon" width={39} />
              <Icon icon="logos:telegram" width={39} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
