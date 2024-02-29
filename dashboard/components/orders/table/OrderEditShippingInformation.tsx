import { useUpdateOrderMutation } from "@/redux/features/orderApi";
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Modal } from "rsuite";

const OrderEditShippingInformation = ({
  openShipping,
  handleCloseShipping,
  order,
}: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<any>();

  const [changeShippingInformation, { isLoading }] = useUpdateOrderMutation();

  const handleChangeShippingInformation: SubmitHandler<any> = async (
    data: any
  ) => {
    const dataObj = {
      shippingAddress: data.shippingAddress,
      city: data.city,
      postalCode: data.postalCode,
      note: data.note,
    };

    await changeShippingInformation({ data: dataObj, orderId: order.orderId });
  };

  return (
    <div>
      <Modal
        size="md"
        open={openShipping}
        onClose={handleCloseShipping}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title className="!font-extrabold">
            Shipping Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(handleChangeShippingInformation)}>
              <div className="grid grid-cols-2 items-center gap-4">
                <div>
                  <label className="block font-medium text-black ">
                    Address
                  </label>
                  <Controller
                    defaultValue={order?.shippingAddress}
                    name="shippingAddress"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Address"
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label className="block font-medium text-black ">City </label>
                  <Controller
                    defaultValue={order?.city}
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="City"
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 items-center gap-4">
                <div>
                  <label className="block font-medium text-black ">
                    Postal Code
                  </label>
                  <Controller
                    defaultValue={order?.postalCode}
                    name="postalCode"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Postal Code"
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label className="block font-medium text-black ">Note </label>
                  <Controller
                    defaultValue={order?.note}
                    name="note"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="note"
                          className="!w-full"
                        />
                        {/* <Form.ErrorMessage
                        show={
                          (!!errors?.address &&
                            !!errors?.address?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.address?.message}
                        </span>
                      </Form.ErrorMessage> */}
                      </div>
                    )}
                  />
                </div>
              </div>
              <Button
                loading={isLoading}
                className="!bg-primary !text-white mt-4"
                type="submit"
              >
                Change Information
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderEditShippingInformation;
