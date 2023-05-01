import css from "./MyPagination.module.scss";
import React, { ReactNode } from "react";

export const MyPagination = (props: {
  currentPage: number;
  pagesCount: number;
  changePage: (page: number) => void;
}) => {
  const pagination: Array<ReactNode> = [];
  const next = (page: number) => {
    page < props.pagesCount ? props.changePage(page) : props.changePage(0);
  };
  const prev = (page: number) => {
    page >= 0
      ? props.changePage(page)
      : props.changePage(props.pagesCount - 1);
  };

  for (let i = 0; i < props.pagesCount; i++) {
    pagination.push(
      <button
        onClick={() => props.changePage(i)}
        key={i}
        className={
          props.currentPage === i
            ? css.pagination__page + " " + css.pagination__page_active
            : css.pagination__page
        }
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className={css.pagination}>
      <button
        onClick={() => {
          prev(props.currentPage - 1);
        }}
        className={css.pagination__prev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="16"
          viewBox="0 0 9 16"
          strokeWidth={2}
        >
          <line x1={0} y1={8} x2={9} y2={0} />
          <line x1={0} y1={8} x2={9} y2={16} />
        </svg>
      </button>
      <div className={css.pagination__pages}>
        {pagination.map((page) => page)}
      </div>
      <button
        onClick={() => {
          next(props.currentPage + 1);
        }}
        className={css.pagination__next}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="16"
          viewBox="0 0 9 16"
          strokeWidth={2}
        >
          <line x1={9} y1={8} x2={0} y2={0} />
          <line x1={9} y1={8} x2={0} y2={16} />
        </svg>
      </button>
    </div>
  );
};
