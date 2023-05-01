import catalogue from "assets/catalogue.json";

export const getCatalogue = () => {
  const catalogueItems = JSON.parse(
    localStorage.getItem("catalogueItems") || "[]"
  );

  return catalogueItems.length > 0 ? catalogueItems : catalogue;
};
