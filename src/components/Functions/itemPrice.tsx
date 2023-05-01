export const itemPrice = (count: number, price: string) => {
  return Number(
    (count * Number(price.toString().replace(/,/, "."))).toFixed(2).toString()
  )
    .toString()
    .replace(/\./g, ",");
};