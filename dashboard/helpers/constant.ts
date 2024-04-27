import { addDays } from "date-fns";

export const predefinedRanges = [
  {
    label: "Next Sunday",
    value: () => {
      const currentDate = new Date();
      const daysUntilNextSunday = 7 - currentDate.getDay(); // Calculate days until next Sunday
      const nextSunday = addDays(currentDate, daysUntilNextSunday);
      return [nextSunday, addDays(nextSunday, 1)]; // Set the date range from next Sunday to next Monday
    },
  },
  {
    label: "Next 30 days",
    value: [new Date(), addDays(new Date(), 30)],
  },
];

const promos = [
  {
    label: "Buy & Get Offer",
    value: "BUY_ONE_GET_ONE",
  },
  // {
  //   label: "Discount on Order",
  //   value: "DISCOUNT_BASED_ON_AMOUNT",
  // },
];

export const promoTypeEnums = promos?.map((promo: any) => {
  return {
    label: promo.label,
    value: promo.value,
  };
});
