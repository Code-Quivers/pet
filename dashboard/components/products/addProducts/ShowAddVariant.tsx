"use client";

import { useState } from "react";

import { RiDeleteBinLine } from "react-icons/ri";
import { Button, Input, Modal, Table } from "rsuite";

const tableData = [
  {
    key: "2",
    variant: `Edward King `,
    price: 32,
    available: 32,
    onHand: 32,
    sku: 32,
    barcode: 32,
    address: `London, Park Lane no.`,
  },
];

const ShowAddVariant = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: "Variant",
      dataIndex: "variant",
      width: 200,
    },
    {
      title: "price",
      dataIndex: "price",
      render: () => (
        <>
          <div>
            <Input className="border-black/50" placeholder="0.00" />
          </div>
        </>
      ),
    },
    {
      title: "Available",
      dataIndex: "available",
      render: () => (
        <>
          <div>
            <Input className="border-black/50" placeholder="0.00" />
          </div>
        </>
      ),
    },
    {
      title: "On Hand",
      dataIndex: "onHand",
      render: () => (
        <>
          <div>
            <Input className="border-black/50" placeholder="0.00" />
          </div>
        </>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      render: () => (
        <>
          <div>
            <Input className="border-black/50" />
          </div>
        </>
      ),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      render: () => (
        <>
          <div>
            <Input className="border-black/50" />
          </div>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <div className="flex items-center gap-3">
            <Button
              className="doneButton px-4 text-xs font-medium text-[#4f4f57] rounded-lg py-1.5"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </Button>
            <Button className="doneButton  p-1 text-xs font-medium hover:text-red-600 cursor-pointer   text-[#4f4f57] rounded-lg ">
              <RiDeleteBinLine size={20} className="" />
            </Button>
          </div>
        </>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,

    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
      <Modal
        title="Edit "
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        className="rounded-full"
        centered
        width={800}
        footer={[
          <div key="footer" className="flex  justify-end gap-5">
            <button
              onClick={() => setIsModalOpen(false)}
              key="button"
              type="button"
              className=" px-3 py-1 font-medium rounded-lg doneButton"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              key="submit"
              type="submit"
              className=" px-3 py-1  bg-[#3f3f3f] text-white rounded-lg  shadow-inner shadow-[#ffffff65] border font-medium border-[#3f3f3f] focus:scale-95  duration-100 transition-transform ease-in-out"
            >
              Done
            </button>
          </div>,
        ]}
      >
        <>
          <div className="border-t mt-5">
            <div className="mt-5 ">
              <label htmlFor="price" className="block">
                Price
              </label>
              <Input
                className="w-[50%] border-black/50"
                placeholder="0.00"
              />
            </div>
            {/*  */}
            <div className="grid grid-cols-3 gap-6 mt-5 ">
              <div className="">
                <label htmlFor="costPerItem" className="block">
                  Cost Per Item
                </label>
                <Input
                  id="costPerItem"
                  className=" border-black/50"
                  placeholder="0.00"
                />
              </div>
              <div className="">
                <label htmlFor="profit" className="block">
                  Profit
                </label>
                <Input
                  id="profit"
                  disabled
                  className="border-black/50"
                  placeholder="--"
                />
              </div>
              <div className="">
                <label htmlFor="margin" className="block">
                  Margin
                </label>
                <Input
                  id="margin"
                  disabled
                  className=" border-black/50"
                  placeholder="--"
                />
              </div>
            </div>
          </div>
          {/* inventory */}
          <div className="border-t mt-5">
            <div className="mt-1">
              <h2 className="text-[14px] font-semibold">Inventory</h2>
            </div>

            {/*  */}
            <div className="grid grid-cols-2 gap-6 mt-2 ">
              <div className="">
                <label htmlFor="sku" className="block">
                  SKU (Stock Keeping Unit)
                </label>
                <Input id="sku" className=" border-black/50" />
              </div>
              <div className="">
                <label htmlFor="barcode" className="block">
                  Barcode (ISBN, UPC, GTIN, etc.)
                </label>
                <Input id="barcode" className="border-black/50" />
              </div>
            </div>
          </div>

          {/* custom information */}
          {/* inventory */}
          <div className="border-t mt-5">
            <div className="my-1">
              <h2 className="text-[14px] font-semibold">Customs information</h2>
            </div>

            {/*  */}

            <div>
              <label htmlFor="harmonizedCode" className="block">
                HS (Harmonized System) code
              </label>
              <Input
                id="harmonizedCode"
                className=" border-black/50"
                placeholder="Search or enter a HS code"
              />

              <p className="text-[#707070]">
                Manually enter codes that are longer than 6 numbers.
              </p>
            </div>
          </div>
          <div className="border-t border-b py-3 mt-5">
            <div className="my-1">
              <h2 className="text-[13px] text-[#707070] font-semibold">
                Save the product to edit more variant details.
              </h2>
            </div>
            {/*  */}
          </div>
        </>
      </Modal>
    </>
  );
};

export default ShowAddVariant;
