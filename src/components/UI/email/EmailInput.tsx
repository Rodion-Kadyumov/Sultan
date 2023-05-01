import css from "./EmailInput.module.scss";
import React from "react";

export const EmailInput = () => {
  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="15"
      viewBox="0 0 10 20"
      strokeWidth={2.5}
    >
      <polyline points="0,0 10,10 0,20" />
    </svg>
  );

  return (
    <div className={css.email}>
      <input
        className={css.email__input}
        placeholder="Введите ваш E-mail"
        type="email"
      />
      <button className={css.email__button}>{arrow}</button>
    </div>
  );
};
