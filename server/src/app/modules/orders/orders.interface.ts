import { OrderStatus } from '@prisma/client';

export type IOrderFilterRequest = {
  searchTerm?: string | undefined;
  orderStatus?: OrderStatus | undefined;
};

export type IOrderRequest = {
  shippingInformation: shippingInformation;
  paymentInformation: paymentInformation;
  cartItems: cartItems[];
};

type shippingInformation = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  email: string;
  phone: string;
};

type paymentInformation = {
  subtotal: number;
  taxes: number;
  total: number;
};

type cartItems = {
  productName: string;
  productId: string;
  variantId: string;
  price: number;
  quantity: number;
  color: {
    name: string;
    code: string;
  };
};

export type IOrderUpdateRequest = {
  state?: string | undefined;
  tax?: string | undefined;
};
