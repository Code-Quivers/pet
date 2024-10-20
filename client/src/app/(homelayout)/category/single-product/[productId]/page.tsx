import ProductDetails from "@/components/ProductPage/product-details/ProductDetails";

const ProductPage = ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
  return (
    <div className="mt-20 ">
      <ProductDetails params={params} />
    </div>
  );
};

export default ProductPage;
