"use client";
import {
  Form,
  Input,
  Message,
  Modal,
  useToaster,
  Button,
  SelectPicker,
} from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { ICreateSubCategory } from "@/types/forms/category";
import AddCategoryImageUpload from "./AddSubCategoryImageUpload";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import { useEffect } from "react";
import { useAddSubCategoryMutation } from "@/redux/features/subCategoryApi";
import { renderLoading } from "../animation/form/SelectPicker/renderLoading";

const AddCategoryModalForm = ({ open, handleClose }: any) => {
  const { data: categoryResponse, isLoading: categoryLoading } =
    useGetCategoryQuery({});

  const categoryEnums = categoryResponse?.data?.map((single: any) => {
    return {
      label: single?.categoryName,
      value: single?.categoryId,
    };
  });

  const [
    addSubCategory,
    { data, isSuccess, isError, isLoading, error, reset },
  ] = useAddSubCategoryMutation();

  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateSubCategory>();

  const handleCreateSubCategory = async (newData: ICreateSubCategory) => {
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

    await addSubCategory({
      data: formData,
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully created"}
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
              error?.message || "Sub Category Creation Failed"
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
      <Modal backdrop="static" open={open} onClose={handleModalClose}>
        <Modal.Header>
          <Modal.Title>
            <span className="text-lg font-semibold">Add New Sub Category</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-1 border-t border-stroke pt-2">
            <form onSubmit={handleSubmit(handleCreateSubCategory)}>
              {/* Category Name */}
              <div className="space-y-2">
                {/* category Name */}
                <div>
                  <div className="space-y-2">
                    <label className="block font-medium text-black ">
                      Sub Category Name
                    </label>
                    <Controller
                      name="subCategoryName"
                      control={control}
                      rules={{
                        required: "Sub Category Name is Required",
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <Input
                            {...field}
                            placeholder="Enter Sub Category Name..."
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
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-black ">
                    Category
                  </label>
                  <Controller
                    name="categoryId"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <SelectPicker
                          searchable={false}
                          size="lg"
                          data={categoryEnums || []}
                          value={field.value}
                          onChange={(value: string | null) =>
                            field.onChange(value)
                          }
                          style={{
                            width: "100%",
                          }}
                          renderMenu={(menu) =>
                            renderLoading(menu, categoryLoading)
                          }
                          placeholder="Select Category"
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

                {/* category Image */}
                <div>
                  <div className="space-y-2">
                    <label className="block font-medium text-black ">
                      Sub Category Image
                    </label>
                    <Controller
                      name="subCategoryImage"
                      control={control}
                      rules={{
                        required: "Image is Required",
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <AddCategoryImageUpload field={field as any} />
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
                </div>
              </div>

              <div className="flex justify-end mt-3 ">
                <Button
                  loading={isLoading}
                  type="submit"
                  className="!bg-[#3c50e0] !px-5 !text-sm !text-white  !font-semibold"
                  size="lg"
                >
                  Create Category
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCategoryModalForm;
