"use client";
import icons8Edit from "@/public/images/icon/icons8-edit.svg";
import Image from "next/image";
import { useGetProductQuery } from "@/redux/features/productsApi";
import { use, useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  Accordion,
  Avatar,
  Button,
  ButtonToolbar,
  Header,
  IconButton,
  Input,
  InputGroup,
  Loader,
  Pagination,
  Popover,
  SelectPicker,
  Stack,
  Table,
  Whisper,
} from "rsuite";
import { fileUrlKey } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useGetAllOrdersQuery } from "@/redux/features/orderApi";
import { all } from "axios";
import OrderEditModal from "./OrderEditModal";
import OrderEditShippingInformation from "./OrderEditShippingInformation";
import ProductListTable from "./ProductListTable";
const { Column, HeaderCell, Cell } = Table;

const AllOrderList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<string>("");

  query["orderStatus"] = orderStatus;
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  //data Format

  const formatDate = (dateString: any) => {
    const options: any = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const { data: allOrders, isLoading } = useGetAllOrdersQuery(query);

  const orderStatusFilter = [
    "PENDING",
    "CONFIRMED",
    "CANCELED",
    "REJECTED",
    "DELIVERED",
  ].map((item) => ({ label: item, value: item }));

  // Status Modal Open and Close

  const [open, setOpen] = useState<any>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Shipping Information Modal

  const [openShipping, setOpenShipping] = useState<any>(false);
  const handleOpenShipping = () => setOpenShipping(true);
  const handleCloseShipping = () => setOpenShipping(false);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:gap-0 p-5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Orders
          </h4>

          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div>
              <SelectPicker
                placeholder="Order Filter By Status"
                data={orderStatusFilter}
                className="w-60"
                searchable={false}
                onChange={(value: any) => {
                  setOrderStatus(value);
                }}
              />
            </div>

            <div>
              <InputGroup
                inside
                style={{
                  width: 300,
                }}
              >
                <Input
                  style={{
                    width: 300,
                  }}
                  onChange={(e) => setSearchTerm(e)}
                  placeholder="Search by order Id..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 p-2">
          {isLoading && (
            <div className="flex justify-center items-center">
              {" "}
              <Loader size="md" content="Loading..." />
            </div>
          )}

          {allOrders?.data?.length > 0 ? (
            allOrders?.data?.map((order: any, index: any) => (
              // Place your code for rendering each order here
              // For example:
              <div key={index}>
                {
                  <Accordion bordered>
                    <Accordion.Panel
                      header={
                        <div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center gap-2 lg:gap-0 ">
                          <div className="flex flex-col justify-start">
                            <h1 className="text-lg font-bold">
                              Order No : {order?.partyOrderId}
                            </h1>
                            <p className="text-xs">
                              Created: {formatDate(order?.createdAt)}
                            </p>
                          </div>
                          <div className="flex flex-col justify-start items-start w-46">
                            <p className="text-lg font-bold">
                              <span>€</span> {order?.totalGrand}
                            </p>
                            <p className="text-xs">
                              Order Status :{" "}
                              <span
                                className={`${
                                  order?.orderStatus === "PENDING" &&
                                  "text-[#CA8A04] px-2 py-1 bg-[#FEF9C3] font-semibold rounded-full"
                                } ${
                                  order?.orderStatus === "CONFIRMED" &&
                                  "text-success px-2 py-1 bg-[#BBF7D0] font-semibold rounded-full"
                                } ${
                                  order?.orderStatus === "REJECTED" &&
                                  "text-danger px-2 py-1 bg-[#FEE2E2] font-semibold rounded-full"
                                } ${
                                  order?.orderStatus === "CANCELED" &&
                                  "text-[#475569] px-2 py-1 bg-[#CBD5E1] font-semibold rounded-full"
                                } ${
                                  order?.orderStatus === "DELIVERED" &&
                                  "text-[#0284C7] px-2 py-1 bg-[#BAE6FD] font-semibold rounded-full"
                                }`}
                              >
                                {order?.orderStatus}
                              </span>
                            </p>
                          </div>
                        </div>
                      }
                    >
                      <OrderEditShippingInformation
                        openShipping={openShipping}
                        handleCloseShipping={handleCloseShipping}
                        order={order}
                      />
                      <div className="">
                        <div>
                          <div className="mb-5">
                            <button
                              className="text-primary flex gap-[2px] items-center font-semibold"
                              onClick={handleOpen}
                            >
                              <Image
                                src={icons8Edit}
                                width={20}
                                height={20}
                                alt="icons8Edit"
                              />
                              Edit Status
                            </button>
                            <OrderEditModal
                              open={open}
                              order={order}
                              handleClose={handleClose}
                            />
                          </div>
                          {/* <div className="flex items-center w-full gap-5">
                            <div>
                              <span className="bg-gradient-to-b bg-stroke p-1 rounded-md">
                                <span className="font-bold">Event Name:</span>{" "}
                                <span>{order?.eventName}</span>{" "}
                              </span>
                            </div>
                          </div> */}
                        </div>
                        {/* Client Info */}
                        <section className="md:flex gap-3 max-md:space-y-3">
                          {/*  */}
                          <div className="md:w-1/3 w-full p-3 rounded-md border-2 hover:shadow-3 border-[#CBD5E1] hover:shadow-primary/60">
                            <h1 className="text-xl font-semibold">
                              Event Information
                            </h1>
                            <div>
                              <p>
                                Event Name:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.eventName}
                                </span>
                              </p>
                            </div>
                          </div>
                          {/* customers information */}
                          <div className="md:w-1/3 w-full p-3 rounded-md border-2 hover:shadow-3 border-[#CBD5E1] hover:shadow-primary/60">
                            <h1 className="text-xl font-semibold">
                              Customer Information
                            </h1>
                            <div>
                              <p>
                                Name:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.user?.profile?.fullName}
                                </span>
                              </p>
                              <p>
                                Company Name:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.user?.profile?.companyName}
                                </span>
                              </p>
                              <p>
                                Phone Number:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.user?.profile?.phoneNumber}
                                </span>
                              </p>
                              <p>
                                Email:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.user?.profile?.email}
                                </span>
                              </p>
                              <p>
                                Address:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.user?.profile?.addressLine1}
                                </span>
                              </p>
                              <p>
                                City:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.user?.profile?.city}
                                </span>
                              </p>
                              <p>
                                Postal Code:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.user?.profile?.postalCode}
                                </span>
                              </p>
                            </div>
                          </div>
                          {/* shipping information */}
                          <div className="md:w-1/3 w-full p-3 rounded-md border-2 hover:shadow-3 border-[#CBD5E1] hover:shadow-primary/60">
                            <div className="flex items-center justify-between">
                              <h1 className="text-xl font-semibold">
                                Shipping Information
                              </h1>
                              <div
                                className="flex gap-[2px] cursor-pointer"
                                onClick={handleOpenShipping}
                              >
                                <Image
                                  src={icons8Edit}
                                  width={20}
                                  height={20}
                                  alt="icons8Edit"
                                />
                                <span className="font-bold text-primary">
                                  Edit
                                </span>
                              </div>
                            </div>
                            <div>
                              <p>
                                Address:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.shippingAddress}
                                </span>
                              </p>
                              <p>
                                City:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.city}
                                </span>
                              </p>
                              <p>
                                Postal Code:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.postalCode}
                                </span>
                              </p>
                              <p>
                                Note:
                                <span className="font-medium text-black">
                                  {" "}
                                  {order?.note}
                                </span>
                              </p>
                            </div>
                          </div>
                        </section>
                        {/* <div className="bg-gray-3 shadow-2 rounded-md p-4">
                          <div className="mb-2">
                            <p>Customer Information:</p>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">Company Name:</span>{" "}
                              <span>{order?.user?.profile?.companyName}</span>{" "}
                            </p>
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">Full Name:</span>{" "}
                              <span>{order?.user?.profile?.fullName}</span>{" "}
                            </p>
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">Phone Number:</span>{" "}
                              <span>{order?.user?.profile?.phoneNumber}</span>{" "}
                            </p>
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">Email:</span>{" "}
                              <span>{order?.user?.profile?.email}</span>{" "}
                            </p>
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">Address:</span>{" "}
                              <span>{order?.user?.profile?.addressLine1}</span>{" "}
                            </p>
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">City:</span>{" "}
                              <span>{order?.user?.profile?.city}</span>{" "}
                            </p>
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">Postal Code:</span>{" "}
                              <span>{order?.user?.profile?.postalCode}</span>{" "}
                            </p>
                          </div>
                        </div> */}
                        {/* Shipping Info */}
                        {/* <div className="bg-gray-3 shadow-2 rounded-md p-4">
                          <div className="mb-2 flex items-center gap-5">
                            <p>Shipping Information:</p>
                            <span
                              className="!text-primary underline cursor-pointer"
                              onClick={handleOpenShipping}
                            >
                              {" "}
                              Edit Shipping Information
                            </span>
                            <OrderEditShippingInformation
                              openShipping={openShipping}
                              handleCloseShipping={handleCloseShipping}
                              order={order}
                            />
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">Address :</span>{" "}
                              <span>{order?.shippingAddress}</span>{" "}
                            </p>
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">City:</span>{" "}
                              <span>{order?.city}</span>{" "}
                            </p>
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">Postal Code :</span>{" "}
                              <span>{order?.postalCode}</span>{" "}
                            </p>
                            <p className="border p-1 rounded-md">
                              <span className="font-bold">Note :</span>{" "}
                              <span>{order?.note}</span>{" "}
                            </p>
                          </div>
                        </div> */}
                        {/* Delivery & Product */}
                        <div className=" border-[#CBD5E1] border-2 shadow-2 rounded-md my-4">
                          {order?.details?.map((detail: any, index: any) => (
                            <div key={index} className="mb-3">
                              <div className="md:flex justify-between items-center p-4">
                                <div>
                                  <p className="text-xl font-semibold">
                                    Delivery & Product Information: (Delivery -{" "}
                                    {index + 1}){" "}
                                  </p>
                                  <p>
                                    Delivery Date:{" "}
                                    <span className="font-medium text-black">
                                      {detail?.deliveryDay} at{" "}
                                      {detail?.deliveryTime}
                                    </span>
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    Hall Name:{" "}
                                    <span className="font-medium text-black">
                                      {detail?.hallName}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="grid grid-cols-1 gap-2 !bg-gray-50">
                                  {detail?.products?.map(
                                    (product: any, index: any) => (
                                      <ProductListTable
                                        key={index}
                                        product={product}
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Payment Info */}
                        <div className="px-4">
                          <div className="flex justify-end">
                            <div className="w-1/4">
                              <p className="flex justify-between">
                                Total Grand:{" "}
                                <span className="text-black font-medium">
                                  € {order?.totalGrand?.toFixed(2)}
                                </span>
                              </p>
                              <p className="flex justify-between">
                                Total Vat:{" "}
                                <span className="text-black font-medium">
                                  € {order?.vat?.toFixed(2)}
                                </span>
                              </p>
                              <p className="flex justify-between">
                                Total Gross:{" "}
                                <span className="text-black font-medium">
                                  € {order?.totalGross?.toFixed(2)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                }
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <h1>No Orders Found</h1>
            </div>
          )}
        </div>
        <div style={{ padding: 20 }}>
          <Pagination
            total={allOrders?.meta?.total}
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="md"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            limitOptions={[10, 20, 30, 50, 100, 150, 200]}
            limit={size}
            onChangeLimit={(limitChange) => setSize(limitChange)}
            activePage={page}
            onChangePage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default AllOrderList;
