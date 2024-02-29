import AllBatchProductList from "@/components/products/tables/AllBatchProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Batch Products | Dashboard",
  creator: "Developed by CodeQuivers",
};
const BatchProductsPage = () => {
  return (
    <div>
      <AllBatchProductList />
    </div>
  );
};

export default BatchProductsPage;
