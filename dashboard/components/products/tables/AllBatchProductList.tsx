"use client";

import Image from "next/image";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Popover,
  SelectPicker,
  Table,
  Whisper,
} from "rsuite";
import { fileUrlKey } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useGetBatchProductsQuery } from "@/redux/features/batchProductApi";
import { FaRegEye } from "react-icons/fa";
import OptionalItemsModalTable from "../modal/OptionalItemModalTable";
import BathProductEditModal from "../modal/BathProductEditModal";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";
import { useGetSubCategoryQuery } from "@/redux/features/subCategoryApi";

const AllBatchProductList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  query["subCategoryName"] = categoryFilter;
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const {
    data: allBatchProducts,
    isLoading,
    isFetching,
  } = useGetBatchProductsQuery({ ...query });
  const [isOpenBatchEdit, setIsOpenBatchEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isOpenOptionalItemModal, setIsOpenOptionalItemModal] =
    useState<boolean>(false);
  const [optionalItems, setOptionalItems] = useState<any | null>(null);
  // close modal
  const handleCloseEdit = () => {
    setIsOpenBatchEdit(false);
    setEditData(null);
  };
  const handleCloseOptionalModal = () => {
    setIsOpenOptionalItemModal(false);
  };

  const { data: allSubCategories } = useGetSubCategoryQuery({});

  const categoryFilterForProduct = allSubCategories?.data?.map(
    (category: any) => ({
      label: category.subCategoryName,
      value: category.subCategoryName,
    })
  );

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between p-5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Batch Products
          </h4>

          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div>
              <SelectPicker
                placeholder="Batch Product Filter By Sub Category"
                data={categoryFilterForProduct}
                className="w-60"
                searchable={false}
                onChange={(value: any) => {
                  setCategoryFilter(value);
                }}
                style={{
                  width: 300,
                }}
              />
            </div>
            <div>
              <InputGroup
                inside
                style={{
                  width: 400,
                }}
              >
                <Input
                  style={{
                    width: 400,
                  }}
                  onChange={(e) => setSearchTerm(e)}
                  placeholder="Search by product name..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>
        </div>

        <Table
          bordered={true}
          cellBordered={true}
          wordWrap="break-word"
          loading={isLoading || isFetching}
          rowHeight={70}
          headerHeight={50}
          shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
          // autoHeight={true}
          height={500}
          data={allBatchProducts?.data}
        >
          {/*img*/}
          {/* <Column width={70}>
            <HeaderCell style={headerCss}>Image</HeaderCell>
            <Cell style={cellCss} verticalAlign="middle">
              {(rowData) => (
                <Whisper
                  placement="topStart"
                  speaker={
                    <Popover>
                      <div>
                        <Image
                          width={180}
                          height={180}
                          alt=""
                          src={`${fileUrlKey()}/${
                            rowData?.product?.productImage
                          }`}
                          className="!h-52 !w-52  object-cover"
                        />
                      </div>
                    </Popover>
                  }
                >
                  <div>
                    <Image
                      width={120}
                      height={120}
                      alt=""
                      src={`${fileUrlKey()}/${rowData?.product?.productImage}`}
                      className="object-center  object-cover"
                    />
                  </div>
                </Whisper>
              )}
            </Cell>
          </Column> */}

          {/*img*/}
          <Column width={70}>
            <HeaderCell style={headerCss}>Image</HeaderCell>
            <Cell style={cellCss} verticalAlign="middle">
              {(rowData) => (
                <Whisper
                  placement="auto"
                  speaker={
                    <Popover>
                      <div>
                        <Image
                          width={270}
                          height={270}
                          alt=""
                          src={
                            rowData?.productImage
                              ? `${fileUrlKey()}/${
                                  rowData?.product?.productImage
                                }`
                              : noImage
                          }
                          className="object-cover"
                        />
                      </div>
                    </Popover>
                  }
                >
                  <div>
                    <Image
                      width={120}
                      height={120}
                      alt=""
                      src={
                        rowData?.productImage
                          ? `${fileUrlKey()}/${rowData?.product?.productImage}`
                          : noImage
                      }
                      className="object-center  object-cover"
                    />
                  </div>
                </Whisper>
              )}
            </Cell>
          </Column>

          {/* product name */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Product Name</HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              dataKey="product.productName"
            />
          </Column>
          {/* product Description */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Description</HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              dataKey="product.description"
            />
          </Column>
          {/* Short Summary */}
          <Column flexGrow={1}>
            <HeaderCell style={headerCss}>Summary</HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              dataKey="product.shortSummery"
            />
          </Column>

          {/* Batch batchPackType */}
          <Column width={80}>
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Pack Type
            </HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              dataKey="batchPackType"
            />
          </Column>

          {/* Batch Price */}
          <Column width={100}>
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Price
            </HeaderCell>
            <Cell style={cellCss} verticalAlign="middle" dataKey="batchPrice" />
          </Column>

          {/* Vat on Product */}
          <Column width={150}>
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Vat on Product
            </HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              align="center"
              dataKey="productVat"
            >
              {(rowData) =>
                rowData.productVat
                  ? `${(rowData.productVat * 100).toFixed(2)} %`
                  : "N/A"
              }
            </Cell>
          </Column>

          {/* Product Price with Vat */}
          <Column width={150}>
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Price with Vat
            </HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              align="center"
              dataKey="batchPriceWithVat"
            >
              {(rowData) =>
                rowData.batchPriceWithVat
                  ? `${rowData.batchPriceWithVat}`
                  : "N/A"
              }
            </Cell>
          </Column>

          {/* Optional Items */}
          <Column width={70}>
            <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
              Optional Items
            </HeaderCell>
            <Cell
              style={cellCss}
              verticalAlign="middle"
              dataKey="optionalItems"
            >
              {(rowData: any) => (
                <Whisper
                  placement="topEnd"
                  speaker={
                    <Popover
                      className="border !bg-[#614ae4] text-white font-semibold rounded-full !py-1.5 !px-5"
                      arrow={false}
                    >
                      View Optional Items
                    </Popover>
                  }
                >
                  <IconButton
                    onClick={() => {
                      setOptionalItems(rowData?.optionalItems);
                      setIsOpenOptionalItemModal(true);
                    }}
                    circle
                    icon={<FaRegEye size={20} />}
                  />
                </Whisper>
              )}
            </Cell>
          </Column>

          {/* Action */}

          <Column width={70}>
            <HeaderCell style={headerCss}>Action</HeaderCell>
            <Cell style={cellCss} verticalAlign="middle" align="center">
              {(rowData: any) => (
                <Whisper
                  placement="topEnd"
                  speaker={
                    <Popover
                      className="border !bg-[#614ae4] text-white font-semibold rounded-full !py-1.5 !px-5"
                      arrow={false}
                    >
                      Edit Product
                    </Popover>
                  }
                >
                  <IconButton
                    onClick={() => {
                      setIsOpenBatchEdit(true);
                      setEditData(rowData);
                    }}
                    circle
                    icon={<MdModeEdit size={20} />}
                  />
                </Whisper>
              )}
            </Cell>
          </Column>
        </Table>
        {/* pagination */}
        <div style={{ padding: 20 }}>
          <Pagination
            total={allBatchProducts?.meta?.total}
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
      {/* optional items list modal */}
      <OptionalItemsModalTable
        handleCloseOptionalModal={handleCloseOptionalModal}
        isOpenOptionalItemModal={isOpenOptionalItemModal}
        optionalItems={optionalItems}
      />
      {/* edit batch product modal */}

      <BathProductEditModal
        isOpenEdit={isOpenBatchEdit}
        setIsOpenEdit={setIsOpenBatchEdit}
        editData={editData}
        handleCloseEdit={handleCloseEdit}
      />
    </>
  );
};

export default AllBatchProductList;
