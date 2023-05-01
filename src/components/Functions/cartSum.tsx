import { cartItem } from "assets/types";

export const cartSum = (cartItems: cartItem) => {
  return Number(
    cartItems
      .reduce(
        (result, item) =>
          result +
          Number(item.info.price.toString().replace(/,/g, ".")) * item.count,
        0
      )
      .toFixed(2)
      .toString()
  )
    .toString()
    .replace(/\./g, ",");
};
