import { useGetAdvertisementQuery } from "@/redux/api/features/adApi";

const EmptyCart = () => {

  const {data: showAdvertisement, isLoading} = useGetAdvertisementQuery({})

  const activeAds = showAdvertisement?.data?.filter((ad: any) => ad.isActive === true);


  return (
    <>
      <h1 className="font-bold text-xl px-6 pt-6 pb-1 bg-white">CART</h1>
      <hr />
      <div className="bg-rose-100 text-center text-sm py-1 font-bold">
           {activeAds?.map((ad: any) => (
            <p key={ad.id}>{ad.adDetails}</p>
          ))}
      </div>
      <div className="flex flex-col justify-center items-center gap-4 h-[70vh]">
        <h1 className="text-sm">YOUR BAG IS CURRENTLY EMPTY.</h1>
        <button className="bg-primary hover:bg-cyan-500 active:bg-cyan-600 px-20 py-2 font-bold rounded-full text-white ">
          SHOP
        </button>
      </div>
    </>
  );
};

export default EmptyCart;
