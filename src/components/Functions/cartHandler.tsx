import { cartItem, catalogueItem } from "assets/types";

export const cartHandler = (
  action: "+" | "-" | "0",
  cardInfo: catalogueItem,
  cartItems: cartItem
) => {
  const existedItem = cartItems.find(
    (cartItem) => cardInfo.barcode === cartItem.info.barcode
  );

  if (!existedItem) {
    return [...cartItems, { count: 1, info: cardInfo }];
  } else {
    switch (action) {
      case '+': existedItem.count++; break;
      case '-': existedItem.count--; break;
      case '0': existedItem.count = 0;
    };
    if (existedItem.count > 0) {
      let index = cartItems.findIndex(item => cardInfo.barcode === item.info.barcode);
      let result = [...cartItems];

      result[index].count = existedItem.count;

      return result;
    } else {
      return cartItems.filter((item) => item.info.barcode !== cardInfo.barcode);
    }
  }
};
