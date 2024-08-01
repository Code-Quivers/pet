const EmptyCartPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <div className="flex flex-col justify-center items-center gap-10 ">
          <div>
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
          </div>
          <div>
            <button className="bg-primary hover:bg-cyan-500 active:bg-cyan-600 px-20 py-4 font-bold rounded-full text-white ">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartPage;
