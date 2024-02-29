"use client";
import { Form, Input, Message, Modal, SelectPicker, useToaster } from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { Button } from "rsuite";
import { IUpdateSubCategory } from "@/types/forms/category";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/categoryApi";
import { useEffect, useState } from "react";
import UpdateSubCategoryImageUpload from "./UpdateSubCategoryImageUpload";
import { renderLoading } from "../animation/form/SelectPicker/renderLoading";
import { useUpdateSubCategoryMutation } from "@/redux/features/subCategoryApi";

const EditSubCategoryModal = ({ isOpenEdit, handleClose, editData }: any) => {
  const [
    updateSubCategory,
    { data, isSuccess, isError, isLoading, error, reset },
  ] = useUpdateSubCategoryMutation();
  const [categorySearch, setCategorySearch] = useState("");
  const query: Record<string, any> = {};
  query["searchTerm"] = categorySearch;
  const { data: categoryResponse, isLoading: categoryLoading } =
    useGetCategoryQuery({ ...query });
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateSubCategory>();

  const handleLogin = async (newData: IUpdateSubCategory) => {
    const formData = new FormData();

    if (newData?.subCategoryImage?.blobFile) {
      formData.append("file", newData?.subCategoryImage?.blobFile);
    }
    const obj = {
      subCategoryName: newData?.subCategoryName,
      categoryId: newData?.categoryId,
    };

    const categoryData = JSON.stringify(obj);

    formData.append("data", categoryData);

    await updateSubCategory({
      data: formData,
      subCategoryId: editData?.subCategoryId,
    });
  };
  console.log(editData);

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Category Updated"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();
      handleClose();
      formReset();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Category Creation Failed"
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
    handleClose,
    isError,
    isLoading,
    isSuccess,
    reset,
    toaster,
  ]);

  const handleModalClose = () => {
    handleClose();
    reset();
    formReset();
  };
  return (
    <div>
      <Modal backdrop="static" open={isOpenEdit} onClose={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-1">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Sub Category Name
                </label>
                <Controller
                  name="subCategoryName"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        defaultValue={editData?.subCategoryName}
                        {...field}
                        placeholder="Enter Category Name..."
                        className="!w-full"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.subCategoryName &&
                            !!errors?.subCategoryName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.subCategoryName?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-black ">
                  Category
                </label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        searchable={true}
                        cleanable={false}
                        size="lg"
                        defaultValue={editData?.categoryId}
                        data={
                          categoryResponse?.data?.map((single: any) => {
                            return {
                              label: single?.categoryName,
                              value: single?.categoryId,
                            };
                          }) || []
                        }
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        onSearch={(e) => setCategorySearch(e)}
                        style={{
                          width: "100%",
                        }}
                        renderMenu={(menu) =>
                          renderLoading(menu, categoryLoading)
                        }
                        placeholder="Select Item"
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

              {/* Product Image */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">Image</label>
                <Controller
                  name="subCategoryImage"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <UpdateSubCategoryImageUpload
                        defaultImage={editData?.subCategoryImg}
                        field={field as any}
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.subCategoryImage &&
                            !!errors?.subCategoryImage?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.subCategoryImage?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              <div className="flex justify-end mt-3 ">
                <Button
                  loading={isLoading}
                  type="submit"
                  className="!bg-[#3c50e0] !px-5 !text-sm !text-white  !font-semibold"
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

export default EditSubCategoryModal;
