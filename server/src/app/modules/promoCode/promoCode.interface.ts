import { RuleType } from '@prisma/client';

export type IPromoFilterRequest = {
  searchTerm?: string | undefined;
};

export type IPromoRequest = {
  productId: string;
  promotionName: string;
  promoCode: string;
  expireDate: Date;
  type: RuleType;
  buy?: number;
  get?: number;
  threshold?: number;
  discount?: number;
};

export type IQAUpdateRequest = {
  productId?: string;
  question?: string;
  answer?: string;
};
