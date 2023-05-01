import css from "./ItemControllerForm.module.scss";
import React, { useRef, useState } from "react";
import { catalogueItem } from "assets/types";
import { MyCheckbox } from "components/UI/checkbox/MyCheckbox";
import { MyButton } from "components/UI/button/MyButton";
import { DeleteFilled } from "@fluentui/react-icons";
import { Icon } from "@iconify/react";
import { getCatalogue } from "components/Functions/getCatalogue";

export const ItemControllerForm = ({
  itemInfo,
  windowWidth,
  closeCallback,
  windowHeight,
}: {
  itemInfo?: catalogueItem;
  windowWidth: number;
  windowHeight: number;
  closeCallback: (action?: string, result?: catalogueItem) => void;
}) => {
  const [image, setImage] = useState(itemInfo ? itemInfo.image : "");
  const [name, setName] = useState(itemInfo ? itemInfo.name : "");
  const [size, setSize] = useState(itemInfo ? itemInfo.size : "");
  const [sizeType, setSizeType] = useState(itemInfo ? itemInfo.sizeType : "");
  const [barcode, setBarcode] = useState(itemInfo ? itemInfo.barcode : "");
  const [company, setCompany] = useState(itemInfo ? itemInfo.company : "");
  const [brand, setBrand] = useState(itemInfo ? itemInfo.brand : "");
  const [about, setAbout] = useState(itemInfo ? itemInfo.about : "");
  const [price, setPrice] = useState(itemInfo ? itemInfo.price : "");
  const [treatment, setTreatment] = useState(
    itemInfo ? (itemInfo.treatment ? itemInfo.treatment : []) : []
  );
  const formRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);
  const catalogueItems = getCatalogue();

  return (
    <div
      onMouseDown={(e) => {
        !formRef?.current?.contains(e.target as Node) && closeCallback();
      }}
      className={css.modal}
    >
      <div ref={formRef} className={css.form}>
        {isError && (
          <h3 className={css.from__title}>
            Проверьте все ли поля заполнены, выбран тип веса, штрихкод уникален
            и цена является числом (разделителем может быть точка или запятая).
          </h3>
        )}
        <input
          value={image}
          placeholder="Url изображения"
          type="text"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <input
          value={name}
          placeholder="Название товара"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          value={size}
          placeholder="Вес товара"
          type="text"
          onChange={(e) => {
            setSize(e.target.value);
          }}
        />
        <div className={css.form__sizeType}>
          <MyCheckbox
            isActive={sizeType === "мл"}
            text="мл"
            callback={(result: string) => {
              setSizeType(result);
            }}
          />
          <MyCheckbox
            isActive={sizeType === "г"}
            text="г"
            callback={(result: string) => {
              setSizeType(result);
            }}
          />
        </div>
        <input
          style={{
            borderColor: catalogueItems.some(
              (el: catalogueItem) => el.barcode === barcode && !itemInfo
            )
              ? "red"
              : "",
          }}
          value={barcode}
          placeholder="Штрихкод товара"
          type="text"
          disabled={itemInfo ? true : false}
          onChange={(e) => {
            setBarcode(e.target.value);
          }}
        />
        <input
          value={brand}
          placeholder="Название бренда"
          type="text"
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        />
        <input
          value={company}
          placeholder="Производитель"
          type="text"
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        <textarea
          value={about}
          style={{
            maxWidth: (windowWidth * 80) / 100 + "px",
            maxHeight: (windowHeight * 25) / 100 + "px",
          }}
          placeholder="Описание товара"
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        />
        <input
          style={{
            borderColor: isNaN(Number(price.toString().replace(/,/, ".")))
              ? "red"
              : "",
          }}
          value={price}
          placeholder="Цена"
          type="text"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <div className={css.form__treatment}>
          <MyCheckbox
            isActive={treatment.includes("body")}
            slug="body"
            text="Уход за телом"
            callback={(result: string) => {
              !treatment.includes("body")
                ? setTreatment([...treatment, result])
                : setTreatment(treatment.filter((el) => el !== result));
            }}
          />
          <MyCheckbox
            isActive={treatment.includes("hands")}
            slug="hands"
            text="Уход за руками"
            callback={(result: string) => {
              !treatment.includes("hands")
                ? setTreatment([...treatment, result])
                : setTreatment(treatment.filter((el) => el !== result));
            }}
          />
          <MyCheckbox
            isActive={treatment.includes("legs")}
            slug="legs"
            text="Уход за ногами"
            callback={(result: string) => {
              !treatment.includes("legs")
                ? setTreatment([...treatment, result])
                : setTreatment(treatment.filter((el) => el !== result));
            }}
          />
          <MyCheckbox
            isActive={treatment.includes("face")}
            slug="face"
            text="Уход за лицом"
            callback={(result: string) => {
              !treatment.includes("face")
                ? setTreatment([...treatment, result])
                : setTreatment(treatment.filter((el) => el !== result));
            }}
          />
          <MyCheckbox
            isActive={treatment.includes("hair")}
            slug="hair"
            text="Уход за волосами"
            callback={(result: string) => {
              !treatment.includes("hair")
                ? setTreatment([...treatment, result])
                : setTreatment(treatment.filter((el) => el !== result));
            }}
          />
        </div>
        <div className={css.form__btns}>
          <MyButton
            text="Сохранить"
            click={() => {
              if (
                image &&
                name &&
                barcode &&
                size &&
                sizeType &&
                brand &&
                company &&
                about &&
                price &&
                (itemInfo ||
                  !catalogueItems.some(
                    (el: catalogueItem) => el.barcode === barcode
                  )) &&
                !isNaN(Number(price.toString().replace(/,/, ".")))
              ) {
                let action = itemInfo ? "update" : "create";

                closeCallback(action, {
                  image: image,
                  name: name,
                  barcode: barcode,
                  size: size,
                  sizeType: sizeType,
                  brand: brand,
                  company: company,
                  about: about,
                  price: price,
                  treatment: treatment,
                });
              } else {
                setIsError(true);
              }
            }}
          />
          <MyButton
            icon={
              itemInfo ? (
                <DeleteFilled style={{ width: "25px", height: "25px" }} />
              ) : (
                <Icon icon="material-symbols:close" width="25" />
              )
            }
            click={() => {
              itemInfo ? closeCallback("remove", itemInfo) : closeCallback();
            }}
          />
        </div>
      </div>
    </div>
  );
};
