import {
  useApplyPromotionalOfferMutation,
  useLazyGetPromoQuery,
} from "@/redux/api/features/promoCodeApi";
import { applyPromoCode } from "@/redux/slice/cartSlice";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";

const PromoCode = ({ cart }: { cart: any }) => {
  const dispatch = useDispatch();
  const { control } = useForm();
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeMessage, setPromoCodeMessage] = useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState("");
  const [applyPromotionalOffer, { isLoading }] =
    useApplyPromotionalOfferMutation();
  // console.log(data, "data");
  console.log(isLoading, "isLoading");
  // console.log(data, "data");
  const cartDataForApi = cart?.map((item: any) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  const handleApplyPromo = async () => {
    // reset error and promo code
    setPromoCodeMessage(false);
    setPromoCode("");
    if (promoCode) {
      // console.log(cartDataForApi, "cartDataForApi");
      const forBody = {
        cartData: cartDataForApi,
      };
      // const forBodyJson = JSON.stringify(forBody);
      console.log(forBody, "forBody.................");
      console.log(promoCode, "promoCode");
      const result = await applyPromotionalOffer({
        code: promoCode,
        data: forBody,
      });
      const { data } = result as { data: any };
      // console.log(isLoading, "isLoading");
      if (data?.data?.isValid && data?.data?.product?.variantId) {
        // setPromoCodeMessage(true);
        const product = data?.data?.product;
        const freeQuantity = data?.data?.quantity;
        setPromoCodeApplied(promoCode);

        console.log(data?.data, "product........");
        const freeProduct = {
          productId: product?.productId,
          // productName: product?.productName
          image: product?.image,
          color: {
            code: product?.color?.code,
            name: product?.color?.name,
          },
          price: product?.variantPrice,
          variantId: product?.variantId,
          quantity: freeQuantity,
          offerPrice: 0,
        };
        dispatch(applyPromoCode(freeProduct as any));
      }

      // console.log(data, "data");
      // console.log(data, "result..........");
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
          Apply
          {/* {isLoading || isFetching ? "Applying..." : "Apply"} */}
        </button>
      </div>

      <div className="h-10">
        {promoCodeMessage && <p className="h-7">Enter a valid promo code</p>}
        {promoCodeApplied && (
          <div className="flex items-center">
            <span className="bg-gray-200 text-black flex text-sm font-bold px-3 rounded-md">
              {promoCodeApplied}
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

// const orderData = {
//   cartData: [
//     {
//       categoryId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       productId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       variantId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       quantity: 1,
//     },
//     {
//       categoryId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       productId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       variantId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       quantity: 1,
//     },
//   ],
//   payAmount: {
//     subTotal: 100,
//     tax: 10,
//     total: 110,
//   },
//   promoOffer: {
//     promoCode: "string",
//     product: {
//       variantId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       productId: "4d50fa39-271a-4266-b071-d78a3296783a",
//       quantity: 1,
//     },
//   },
//   email: "",
//   firstName: "",
//   lastName: "",
//   address: "",
//   city: "",
//   state: "",
//   postalCode: "",
//   phone: "",

//   // if promoCode isn't apply or not available then it will be product null
// };
