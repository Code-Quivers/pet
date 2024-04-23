import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const PromoCode = () => {
  const { control } = useForm();
  const [promoCode, setPromoCode] = useState("");
  return (
    <>
      <div className="flex gap-3">
        <Controller
          name="promoCode"
          control={control}
          render={({ field }) => (
            <input
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
          disabled={promoCode.length === 0}
          className="py-2.5 px-6 rounded-lg bg-[#0495af] text-white font-semibold disabled:bg-gray-200 disabled:text-white disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default PromoCode;
