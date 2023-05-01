import React, { ReactNode } from "react";
import css from "./infoCard.module.scss";

export const InfoCard = ({
  icon,
  boldText,
  normalText,
}: {
  icon?: ReactNode;
  boldText: string;
  normalText: string;
}) => {
  return (
    <div className={css.infoCard}>
      {icon && <div className={css.infoCard__icon}>{icon}</div>}
      <div className={css.infoCard__text}>
        <span>{boldText}</span>
        <span>{normalText}</span>
      </div>
    </div>
  );
};
