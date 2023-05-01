import css from "./MyFeedback.module.scss";
import React from "react";

export const MyFeedback = ({ imageVisible = true }) => {
  return (
    <div className={css.feedback}>
      <div className={css.feedback__left}>
        <span className={css.feedback__phone}>+7 (777) 490-00-91</span>
        <span className={css.feedback__time}>время работы: 9:00-20:00</span>
        <button className={css.feedback__btn}>Заказать звонок</button>
      </div>
      {imageVisible && (
        <div className={css.feedback__right}>
          <img src={"/hotelsru-sultan/images/feedback.png"} alt="Feedback" />
        </div>
      )}
    </div>
  );
};
