import AddOptionalItemForm from "@/components/products/forms/AddOptionalItemsForm";
import AddProductBatchForm from "@/components/products/forms/AddProductBatchForm";
import AddProductForm from "@/components/products/forms/AddProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product | Dashboard",
  creator: "Developed by CodeQuivers",
};

const AddProductPage = () => {
  return (
    <div className="pb-20 ">
      <AddProductForm />
      <AddProductBatchForm />
      <AddOptionalItemForm />
    </div>
  );
};

export default AddProductPage;
