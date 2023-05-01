import css from "./ItemSize.module.scss";
import React from "react";
import { Icon } from "@iconify/react";
import { FaBoxOpen } from "react-icons/fa";

export const ItemSize = ({
  sizeType,
  size,
}: {
  sizeType: string;
  size: string;
}) => {
  return (
    <div className={css.size}>
      {sizeType === "г" && (
        <FaBoxOpen style={{ opacity: ".23", width: "20px", height: "16px" }} />
      )}
      {sizeType === "мл" && (
        <Icon
          style={{ opacity: ".23" }}
          icon="whh:bottle"
          width="9"
          height="15"
        />
      )}
      <span>{size + " " + sizeType}</span>
    </div>
  );
};
