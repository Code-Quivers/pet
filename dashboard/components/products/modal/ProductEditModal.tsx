"use client";

import { IUpdateProduct, packTypeEnums } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  Message,
  Modal,
  SelectPicker,
  useToaster,
} from "rsuite";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import { useUpdateProductMutation } from "@/redux/features/productsApi";
import { useGetSubCategoryQuery } from "@/redux/features/subCategoryApi";
import UpdateProductImageUpload from "../forms/UpdateProductImageUpload";
import { useEffect } from "react";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import { useGetProductColorQuery } from "@/redux/features/productColorApi";
import { useGetProductSizeQuery } from "@/redux/features/productSizeApi";

const ProductEditModal = ({ isOpenEdit, handleCloseEdit, editData }: any) => {
  //Category

  const { data: categoryResponse, isLoading: categoryLoading } =
    useGetCategoryQuery({});

  const categoryEnums = categoryResponse?.data?.map((single: any) => {
    return {
      label: single?.categoryName,
      value: single?.categoryId,
    };
  });

  //Product Color

  const { data: colorResponse, isLoading: colorLoading } =
    useGetProductColorQuery({});

  const colorEnums = colorResponse?.data?.map((color: any) => {
    return {
      label: color?.productColor,
      value: color?.colorVarientId,
    };
  });

  //Product Size

  const { data: sizeResponse, isLoading: sizeLoading } = useGetProductSizeQuery(
    { subCategoryType: "Size" }
  );

  const sizeEnums = sizeResponse?.data?.map((size: any) => {
    return {
      label: size?.productSize,
      value: size?.sizeVarientId,
    };
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateProduct>();
  const toaster = useToaster();
  const [
    updateProduct,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateProductMutation();

  const handleUpdateProduct = async (updatedData: IUpdateProduct) => {
    const formData = new FormData();

    if (updatedData?.productImage?.blobFile) {
      formData.append("file", updatedData?.productImage?.blobFile);
    }

    const obj = {
      productName: updatedData?.productName,
      productDescription: updatedData?.productDescription,
      productPrice: updatedData?.productPrice
        ? parseInt(updatedData?.productPrice)
        : undefined,
      productStock: updatedData?.productStock
        ? parseInt(updatedData?.productStock)
        : undefined,
      categoryId: updatedData?.categoryId,
      colorVarientId: updatedData?.colorVarientId,
      sizeVarientId: updatedData?.sizeVarientId,
    };
    const productData = JSON.stringify(obj);
    formData.append("data", productData);

    await updateProduct({
      data: formData,
      productId: editData?.productId,
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Product Created"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      resetReq();
      handleCloseEdit();
      formReset();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Product Creation Failed"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [
    data?.message,
    error,
    formReset,
    handleCloseEdit,
    isError,
    isLoading,
    isSuccess,
    resetReq,
    toaster,
  ]);

  return (
    <div>
      <Modal
        size="lg"
        open={isOpenEdit}
        onClose={handleCloseEdit}
        backdrop={"static"}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-sm font-semibold ">
              Edit Product Information
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(handleUpdateProduct)} className="px-1">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {/* left */}
                <div className="col-span-2 space-y-2">
                  {/* Product Name */}

                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Name
                    </label>
                    <Controller
                      name="productName"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            size="lg"
                            {...field}
                            defaultValue={editData?.productName}
                            placeholder="Enter Product Name.."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productName &&
                                !!errors?.productName?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productName?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* Product Price */}

                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Price
                    </label>
                    <Controller
                      name="productPrice"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            size="lg"
                            {...field}
                            defaultValue={editData?.productPrice}
                            placeholder="Enter Product Price.."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productPrice &&
                                !!errors?.productPrice?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productPrice?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* Product Description(optional) */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Description
                    </label>
                    <Controller
                      name="productDescription"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            as="textarea"
                            defaultValue={editData?.productDescription}
                            rows={3}
                            {...field}
                            placeholder="Write product Description..."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productDescription &&
                                !!errors?.productDescription?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productDescription?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                  {/* Product Image */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Image
                    </label>
                    <Controller
                      name="productImage"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <UpdateProductImageUpload
                            field={field}
                            defaultImage={editData?.productImage}
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productImage &&
                                !!errors?.productImage?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productImage?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>
                {/* right */}
                <div className="col-span-2 space-y-2">
                  {/* Product Stock */}

                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Stock
                    </label>
                    <Controller
                      name="productStock"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            size="lg"
                            {...field}
                            defaultValue={editData?.productStock}
                            placeholder="Enter Product Stock.."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productStock &&
                                !!errors?.productStock?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productStock?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* select sub category */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Category
                    </label>
                    <Controller
                      name="categoryId"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <SelectPicker
                            size="lg"
                            data={categoryEnums || []}
                            value={field.value}
                            onChange={(value: string | null) =>
                              field.onChange(value)
                            }
                            defaultValue={editData?.subCategory?.subCategoryId}
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Item"
                            searchable={false}
                            renderMenu={(menu) =>
                              renderLoading(menu, categoryLoading)
                            }
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.categoryId &&
                                !!errors?.categoryId?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.categoryId?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* select Product Color */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Color
                    </label>
                    <Controller
                      name="colorVarientId"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <SelectPicker
                            size="lg"
                            data={colorEnums || []}
                            value={field.value}
                            onChange={(value: string | null) =>
                              field.onChange(value)
                            }
                            defaultValue={editData?.colorVarient?.productColor}
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Product Color"
                            searchable={false}
                            renderMenu={(menu) =>
                              renderLoading(menu, colorLoading)
                            }
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.categoryId &&
                                !!errors?.colorVarientId?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.colorVarientId?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* select Product Size */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product Size
                    </label>
                    <Controller
                      name="sizeVarientId"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <SelectPicker
                            size="lg"
                            data={sizeEnums || []}
                            value={field.value}
                            onChange={(value: string | null) =>
                              field.onChange(value)
                            }
                            defaultValue={editData?.sizeVarient?.productSize}
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Product Size"
                            searchable={false}
                            renderMenu={(menu) =>
                              renderLoading(menu, sizeLoading)
                            }
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.categoryId &&
                                !!errors?.sizeVarientId?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.sizeVarientId?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <Button
                  loading={isLoading}
                  type="submit"
                  className="!bg-[#3c50e0] !px-6 !text-white  !font-semibold"
                  size="lg"
                >
                  Update Product Information
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductEditModal;
