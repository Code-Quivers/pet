"use client";

import { useForm } from "react-hook-form";
import AddPricing from "./AddPricing";
import AddProductTextEditor from "./AddProductTextEditor";
import ImageUpload2 from "./ImageUpload2";
import ShowAddVariant from "./ShowAddVariant";
import Variants from "./Variants";
import { Input } from "rsuite";

const AddProductsSection = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      description: "",
      // select: {},
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <section className="w-[65%]">
            <div className="bg-white rounded-xl p-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  {...register("Title")}
                  id="title"
                  className="border focus:outline-none py-1 px-3 rounded-md border-gray-600"
                  placeholder="Short sleeve t-shirt"
                />
              </div>
              <div className="flex flex-col gap-2 w-full mt-3">
                <label htmlFor="title">Description</label>
                <Input as="textarea" rows={5} placeholder="Description" />
              </div>
            </div>
            <div className="my-5 p-4 bg-white rounded-xl">
              <h1>Image In Here</h1>
            </div>
            <div className="my-5 p-4  bg-white rounded-xl">
              <AddPricing />
            </div>

            <Variants />
          </section>
          <aside className="bg-white p-4 border w-[35%] h-3/4 rounded-xl">
            hi
          </aside>
        </div>
        {/* <section className="bg-white p-4 w-[100%] rounded-xl">
          <ShowAddVariant />
        </section> */}
        {/* <button>Add Product</button> */}
      </form>
    </div>
  );
};

export default AddProductsSection;
