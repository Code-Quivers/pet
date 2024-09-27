"use client";
import { Button, Message, Modal, useToaster } from "rsuite";
import { useEffect } from "react";
import { TiWarning } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useDeleteProductVariantMutation } from "@/redux/features/productsApi";
import { useDeleteBarcodeMutation } from "@/redux/features/barCodeApi";

// ! isOpenDelete={isOpenDelete}

const BarCodeDeleteModal = ({
  isOpenDelete,
  handleCloseDelete,
  deleteData,
}: any) => {
  console.log(deleteData, "deleteData");

  const [deleteBarcode, { data, isSuccess, isError, isLoading, error, reset }] =
    useDeleteBarcodeMutation();

  const toaster = useToaster();

  const handleDeleteBarCode = async () => {
    await deleteBarcode({ barcodeId: deleteData?.barcodeId });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Deleted"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();
      handleCloseDelete();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Product QA Delete Failed"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [
    data?.message,
    error,
    handleCloseDelete,
    isError,
    isLoading,
    isSuccess,
    reset,
    toaster,
  ]);

  const handleModalClose = () => {
    handleCloseDelete();
    reset();
  };
  return (
    <div>
      <Modal
        overflow={false}
        size="xs"
        backdrop="static"
        dialogAs="div"
        className="bg-white mx-auto mt-20  rounded-xl"
        open={isOpenDelete}
        onClose={handleModalClose}
      >
        <Modal.Body className="p-3 ">
          <div className="flex justify-end w-full ">
            <button
              type="button"
              onClick={handleModalClose}
              className="hover:text-[#fe0303] hover:scale-125 duration-300
            "
            >
              <IoClose size={20} />
            </button>
          </div>
          <div className=" ">
            <div className="text-center w-full mx-auto">
              <h1 className="text-xl font-semibold text-black">
                Delete Product Barcode ?
              </h1>
              <p className="w-[80%] mx-auto mt-3">
                Are you sure you want to delete this variant from database?
              </p>
            </div>
            <div className="mt-5 border p-5 border-black/10 rounded-lg">
              <h2>Barcode: {deleteData?.code} </h2>
            </div>
            <div className="p-3  mt-5 bg-[#feeddd] rounded-lg ">
              <p className="flex items-center gap-3 font-semibold text-lg text-[#b53a07]">
                {" "}
                <TiWarning /> Warning
              </p>
              <p className="text-[#b53a07] text-sm font-medium">
                By deleting this, you will not be able to undo this action
              </p>
            </div>
            <div className="mt-5 flex justify-center items-center gap-5">
              <button
                type="button"
                onClick={handleModalClose}
                className="border border-[#343b4634] text-[#29333d] font-medium duration-300 hover:bg-[#343b4627] hover:border-transparent  py-1.5 px-3 rounded-md "
              >
                No, cancel
              </button>
              <Button
                loading={isLoading}
                type="button"
                onClick={handleDeleteBarCode}
                className="!bg-[#c81e1f] hover:!bg-[#fe0303] !text-white !font-medium"
              >{` Yes, I'm Sure`}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BarCodeDeleteModal;