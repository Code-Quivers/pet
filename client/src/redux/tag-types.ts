import { Advertisement } from '@prisma/client';
export enum tagTypes {
  user = "user",
  category = "category",
  product = "product",
  contact = "contact",
  orders = "orders",
  testimonials = "testimonials",
  blogs = "blogs",
  comments = "comments",
  kids = "kids",
  tax = "tax",
  promo = "promo",
  promotionalOffer = "promotionalOffer",
  paypal = "paypal",
  advertisement = "advertisement",
}

export const tagTypesList = [
  tagTypes.user,
  tagTypes.category,
  tagTypes.product,
  tagTypes.contact,
  tagTypes.orders,
  tagTypes.testimonials,
  tagTypes.blogs,
  tagTypes.comments,
  tagTypes.kids,
  tagTypes.tax,
  tagTypes.promo,
  tagTypes.promotionalOffer,
  tagTypes.paypal,
  tagTypes.advertisement,
];
