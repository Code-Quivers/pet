import {
  useApplyPromotionalOfferMutation,
  useLazyGetPromoQuery,
} from "@/redux/api/features/promoCodeApi";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoIosClose } from "react-icons/io";

const PromoCode = () => {
  const { control } = useForm();
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeError, setPromoCodeError] = useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState("");
  const [triggerPromoCheck, { isLoading, isFetching }] = useLazyGetPromoQuery();
  const [applyPromotionalOffer, { data }] = useApplyPromotionalOfferMutation();

  const handleApplyPromo = async () => {
    // reset error and promo code
    setPromoCodeError(false);
    setPromoCode("");
    // check if promo code is valid
    if (promoCode) {
      const result = await triggerPromoCheck({ promoCode });
      // check promo code from api if promo code is valid, apply it
      console.log(result, "result");
      if (result?.data?.data?.isExist) {
        const promoCodeData = {
          purchasedItemId: "53010baa-1f8f-4c48-bd24-a469f76ab96b",
          purchasedQuantity: 1,
        };
        applyPromotionalOffer({ code: promoCode, body: promoCodeData });
        console.log(result?.data?.data?.isExist, "result");
        setPromoCodeApplied(result?.originalArgs?.promoCode);
      } else if (promoCode && !result?.data?.data?.isExist) {
        // if promo code is invalid
        setPromoCodeError(true);
        setPromoCode("");
      }
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <Controller
          name="promoCode"
          control={control}
          render={({ field }) => (
            <input
              value={promoCode}
              onChange={(e) => {
                field.onChange(e.target.value);
                setPromoCode(e.target.value);
              }}
              type="text"
              name="promoCode"
              id="promoCode"
              placeholder="Discount code or gift card"
              className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm placeholder:text-gray-600"
            />
          )}
        />
        <button
          type="button"
          onClick={handleApplyPromo}
          disabled={promoCode.length === 0}
          className="py-2.5 px-6 rounded-lg bg-[#0495af] text-white font-semibold disabled:bg-gray-200 disabled:text-white disabled:cursor-not-allowed"
        >
          {isLoading || isFetching ? "Applying..." : "Apply"}
        </button>
      </div>

      <div className="h-10">
        {promoCodeError && <p className="h-7">Enter a valid promo code</p>}
        {promoCodeApplied && (
          <div className="flex items-center">
            <span className="bg-gray-200 text-black flex text-sm font-bold px-3 rounded-md">
              {promoCodeApplied}{" "}
              <IoIosClose
                onClick={() => setPromoCodeApplied("")}
                size={18}
                className="ml-1"
              />
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default PromoCode;
