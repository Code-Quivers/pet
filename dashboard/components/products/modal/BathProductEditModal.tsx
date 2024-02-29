"use client";

import {
  IUpdateBatchProduct,
  IUpdateProduct,
  batchPackTypeEnums,
  packTypeEnums,
} from "@/types/forms/product";
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

import { useGetProductQuery } from "@/redux/features/productsApi";
import { useEffect } from "react";
import { useUpdateBatchProductMutation } from "@/redux/features/batchProductApi";

const BathProductEditModal = ({
  isOpenEdit,
  handleCloseEdit,
  editData,
}: any) => {
  const { data: allProducts, isLoading: subCategoryLoading } =
    useGetProductQuery({});
  // console.log(editData?.batchId);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateBatchProduct>();
  const toaster = useToaster();
  const [
    updateBatchProduct,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateBatchProductMutation();

  const handleUpdateProduct = async (updatedData: IUpdateBatchProduct) => {
    const obj = {
      batchPackType: updatedData?.batchPackType,
      batchPrice: updatedData?.batchPrice
        ? parseInt(updatedData?.batchPrice)
        : undefined,
      productVat: updatedData?.productVat
        ? parseInt(updatedData?.productVat)
        : undefined,
      productId: updatedData?.productId,
    };

    await updateBatchProduct({
      data: {
        data: obj,
        batchId: editData?.batchId,
      },
    });
  };

  // console.log("editData", editData);

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
                {/* right */}
                <div className="col-span-2 space-y-2">
                  {/* Vat on Product */}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Vat on Product (optional)
                    </label>
                    <Controller
                      name="productVat"
                      defaultValue={editData?.productVat}
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            size="lg"
                            {...field}
                            placeholder="Vat on Product"
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
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Batch Price
                    </label>
                    <Controller
                      name="batchPrice"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            size="lg"
                            {...field}
                            defaultValue={editData?.batchPrice}
                            placeholder="Enter Batch Price..."
                            className="!w-full"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.batchPrice &&
                                !!errors?.batchPrice?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.batchPrice?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  {/* Product*/}
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Product
                    </label>
                    <Controller
                      name="productId"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <SelectPicker
                            cleanable={false}
                            searchable={false}
                            size="lg"
                            placement="auto"
                            data={allProducts?.data?.map(
                              (singleProduct: any) => ({
                                label: singleProduct?.productName,
                                value: singleProduct?.productId,
                              })
                            )}
                            value={field.value}
                            onChange={(value: string | null) =>
                              field.onChange(value)
                            }
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Product..."
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.productId &&
                                !!errors?.productId?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.productId?.message}
                            </span>
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-medium text-black ">
                      Batch Pack Type
                    </label>
                    <Controller
                      name="batchPackType"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <SelectPicker
                            cleanable={false}
                            searchable={false}
                            size="lg"
                            placement="auto"
                            data={batchPackTypeEnums}
                            defaultValue={editData?.batchPackType}
                            value={field.value}
                            onChange={(value: string | null) =>
                              field.onChange(value)
                            }
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Pack Type"
                          />
                          <Form.ErrorMessage
                            show={
                              (!!errors?.batchPackType &&
                                !!errors?.batchPackType?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            <span className="font-semibold">
                              {errors?.batchPackType?.message}
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
                  Update Information
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BathProductEditModal;
