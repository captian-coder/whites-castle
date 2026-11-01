export type Category = {
  id: string;
  label: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  pricePrefix?: string;
  variants?: Array<{
    label: string;
    price: number;
  }>;
  image: string;
  badge?: string;
};

export type Branch = {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
};

export type LocationChoice = {
  orderType: "Delivery" | "Pick-Up";
  city: string;
  branchId: string;
};

export type Offer = {
  id: string;
  title: string;
  copy: string;
  price: string;
  image: string;
};
