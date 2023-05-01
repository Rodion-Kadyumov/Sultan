import css from "./MyCounter.module.scss";
import React from "react";

export const MyCounter = ({
  count,
  action,
}: {
  count: number;
  action: (result: "+" | "-") => void;
}) => {
  return (
    <div className={css.counter}>
      <button onClick={() => action('-')} className={css.counter__btn}>-</button>
      <span className={css.counter__count}>{count}</span>
      <button onClick={() => action('+')} className={css.counter__btn}>+</button>
    </div>
  );
};