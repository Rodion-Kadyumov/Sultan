import { catalogueItem } from 'assets/types';

export const useSorting = ({
  list,
  slug,
  direction,
}: {
  list: Array<catalogueItem>;
  slug: string;
  direction: string;
}) => {
  const sortDesc = (a: string | number, b: string | number) => {
    return a < b ? 1 : -1;
  };
  const sortAsc = (a: string | number, b: string | number) => {
    return a > b ? 1 : -1;
  };

  return [...list].sort((a: catalogueItem, b: catalogueItem) => {
    if (
      isNaN(+a[slug].toString().replace(/,/, ".")) ||
      isNaN(+b[slug].toString().replace(/,/, "."))
    ) {
      return direction === "desc"
        ? sortDesc(a[slug].toString(), b[slug].toString())
        : sortAsc(a[slug].toString(), b[slug].toString());
    } else {
      return direction === "desc"
        ? sortDesc(
            +a[slug].toString().replace(/,/, "."),
            +b[slug].toString().replace(/,/, ".")
          )
        : sortAsc(
            +a[slug].toString().replace(/,/, "."),
            +b[slug].toString().replace(/,/, ".")
          );
    }
  });
};
