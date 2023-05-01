import React from "react";
import "styles/index.scss";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CataloguePage } from "pages/CataloguePage/CataloguePage";
import { CartPage } from "pages/CartPage/CartPage";
import { CatalogueItemPage } from "pages/CatalogueItemPage/CatalogueItemPage";
import { Page404 } from "pages/404/Page404";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Page404 />} path="*" />
        <Route element={<CataloguePage />} path="/" />
        <Route element={<CataloguePage />} path="/catalogue" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<CatalogueItemPage />} path="/catalogue/:id" />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
