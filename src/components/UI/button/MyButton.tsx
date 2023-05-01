import css from "./MyButton.module.scss";
import React, { ReactNode } from "react";

export const MyButton = (props: {
  icon?: ReactNode;
  text?: string;
  fontSize?: string;
  letterSpacing?: string;
  gap?: string;
  maxHeight?: string;
  maxWidth?: string;
  height?: string;
  width?: string;
  click: () => void;
}) => {
  return (
    <button
      style={{
        fontSize: props.fontSize ? props.fontSize : "",
        letterSpacing: props.letterSpacing ? props.letterSpacing : "",
        maxHeight: props.maxHeight ? props.maxHeight : "",
        maxWidth: props.maxWidth ? props.maxWidth : "",
        height: props.height ? props.height : "",
        width: props.width ? props.width : "",
      }}
      onClick={props.click}
      className={css.btn}
    >
      {props.text && props.icon && (
        <div
          style={{
            gap: props.gap ? props.gap : "12px",
          }}
          className={css.btn__text}
        >
          {props.text}
          {props.icon && <div className={css.btn__icon}>{props.icon}</div>}
        </div>
      )}
      {props.text && !props.icon && (
        <div className={css.btn__text}>{props.text}</div>
      )}
      {props.icon && !props.text && (
        <div className={css.btn__icon}>{props.icon}</div>
      )}
    </button>
  );
};