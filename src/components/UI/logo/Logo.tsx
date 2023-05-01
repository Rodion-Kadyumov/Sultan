import React from "react";
import css from "./Logo.module.scss";

export const Logo = ({
  theme = "default",
  maxHeight,
}: {
  theme?: "white" | "default";
  maxHeight?: string;
}) => {
  const themeSelector = (theme: string) => {
    if (theme === "white") {
      return css.logo + " " + css.logo_white;
    } else {
      return css.logo;
    }
  };

  return (
    <div className={themeSelector(theme)}>
      <img
        style={{ maxHeight: maxHeight ? maxHeight : "initial" }}
        src={"/hotelsru-sultan/images/logo.png"}
        alt="Logo"
      />
    </div>
  );
};