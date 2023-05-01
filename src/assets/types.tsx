export type catalogueItem = {
  [key: string]: string | Array<string>;
  image: string;
  name: string;
  barcode: string;
  company: string;
  brand: string;
  price: string;
  size: string;
  sizeType: string;
  about: string;
  treatment: Array<string>;
};

export type cartItem = Array<{ count: number; info: catalogueItem }>;

export type sortMethod = {
  slug: string;
  text?: string;
  direction: "asc" | "desc";
};

export type filterMethod = {
  slug: string;
  value: string;
  text: string;
};

export type priceRange = {
  min: number;
  max: number;
};

export type fieldCount = {
  [key: string]: number;
};

export type filteringData = {
  slug: string;
  type: string;
  value: string | Array<string>;
};
