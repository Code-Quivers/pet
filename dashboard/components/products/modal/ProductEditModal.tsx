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

const ProductEditModal = ({ isOpenEdit, handleCloseEdit, editData }: any) => {
  const { data: subCategoryResponse, isLoading: subCategoryLoading } =
    useGetSubCategoryQuery({});

  const subCategoryEnums = subCategoryResponse?.data?.map((single: any) => {
    return {
      label: single?.subCategoryName,
      value: single?.subCategoryId,
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
      packTypeId: updatedData?.packTypeId,
      description: updatedData?.productDescription,
      productName: updatedData?.productName,
      price: updatedData?.productPrice
        ? parseInt(updatedData?.productPrice)
        : undefined,
      productVat: updatedData?.productVat
        ? parseInt(updatedData?.productVat)
        : undefined,
      shortSummery: updatedData?.shortSummary,
      subCategoryId: updatedData?.subCategoryId,
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
      <Modal size="lg" open={isOpenEdit} onClose={handleCloseEdit}>
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

                  {/* Product Price (optional) */}

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
                            defaultValue={editData?.price}
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

                  {/* Product Vat */}

                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Vat on Product
                    </label>
                    <Controller
                      name="productVat"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            size="lg"
                            {...field}
                            defaultValue={editData?.productVat}
                            placeholder="Enter Product Vat.."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productVat &&
                                !!errors?.productVat?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productVat?.message}
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
                            defaultValue={editData?.description}
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
                  {/* select sub category */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Sub Category
                    </label>
                    <Controller
                      name="subCategoryId"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <SelectPicker
                            size="lg"
                            data={subCategoryEnums || []}
                            value={field.value}
                            onChange={(value: string | null) =>
                              field.onChange(value)
                            }
                            defaultValue={editData?.subCategory?.subCategoryId}
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Item"
                            renderMenu={(menu) =>
                              renderLoading(menu, subCategoryLoading)
                            }
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.subCategoryId &&
                                !!errors?.subCategoryId?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.subCategoryId?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                  {/* select pack type (optional) */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Pack Type
                    </label>
                    <Controller
                      name="packTypeId"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <SelectPicker
                            searchable={false}
                            size="lg"
                            data={packTypeEnums}
                            value={field.value}
                            defaultValue={editData?.packType}
                            onChange={(value: string | null) =>
                              field.onChange(value)
                            }
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Item"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.packTypeId &&
                                !!errors?.packTypeId?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            {" "}
                            <span className="font-semibold">
                              {errors?.packTypeId?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                  {/* short summary */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Short Summary
                    </label>
                    <Controller
                      name="shortSummary"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            as="textarea"
                            rows={3}
                            defaultValue={editData?.shortSummery}
                            {...field}
                            placeholder="Write a summary about the product..."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.shortSummary &&
                                !!errors?.shortSummary?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.shortSummary?.message}
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
