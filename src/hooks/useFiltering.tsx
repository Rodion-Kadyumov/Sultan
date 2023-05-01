import { catalogueItem, filteringData } from "assets/types";

export const useFiltering = ({
  list,
  filters,
}: {
  list: Array<catalogueItem>;
  filters: Array<filteringData>;
}) => {
  let result: Array<catalogueItem> = list;
  let filteringResult: Array<catalogueItem> = [];

  for (let filter of filters) {
    switch (filter.type) {
      case "has":
        filteringResult = result.filter(
          (el) => {
            if (el[filter.slug]) {
              let field = el[filter.slug];

              if (Array.isArray(field)) {
                let results: Array<boolean> = [];

                field.forEach(element => {
                  results.push(filter.value.includes(element));
                });

                return results.includes(true);
              } else {
                return filter.value.includes(el[filter.slug].toString())
              };
            } else {
              return false;
            }
          }
        );
        break;
      case "more":
        filteringResult = result.filter(
          (el) => el[filter.slug] && +el[filter.slug].toString().replace(/,/g, '.') >= +filter.value
        );
        break;
      case "less":
        filteringResult = result.filter(
          (el) => el[filter.slug] && +el[filter.slug].toString().replace(/,/g, '.') <= +filter.value
        );
        break;
    }

    result = filteringResult;
  }

  filters.length === 0 && (result = list);

  return result;
};
