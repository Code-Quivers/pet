"use client";

import Image from "next/image";
import { useGetProductQuery } from "@/redux/features/productsApi";
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
import ProductEditModal from "../modal/ProductEditModal";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import { useGetProductQAQuery } from "@/redux/features/productQAApi";

const ProductQATable = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productFilter, setProductFilter] = useState<string>("");

  query["productName"] = productFilter;

  const router = useRouter();
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  //Filter By Product

  const {
    data: allProductsList,
    isLoading,
    isFetching,
  } = useGetProductQuery({ ...query });
  const [editData, setEditData] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  // close modal
  const handleCloseEdit = () => {
    setIsOpenEdit(false);
    setEditData(null);
  };

  const productEnum = allProductsList?.data?.map((product: any) => ({
    label: product.productName,
    value: product.productName,
  }));

  const { data: allCategories } = useGetCategoryQuery({});

  const categoryFilterForProduct = allCategories?.data?.map(
    (category: any) => ({
      label: category.categoryName,
      value: category.categoryName,
    })
  );

  //Fetching all products QA

  const { data: allProductsQA } = useGetProductQAQuery({});

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              All Products | {allProductsQA?.meta?.total}
            </h2>
          </div>

          <div className="flex max-md:justify-between gap-10 items-center">
            <div>
              <SelectPicker
                placeholder="Filter By Product"
                data={productEnum}
                className="w-60"
                searchable={false}
                onChange={(value: any) => {
                  setProductFilter(value);
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
                  width: 300,
                }}
              >
                <Input
                  style={{
                    width: 300,
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

        {/*  */}
        <div className="rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allProductsQA?.data}
          >
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
                              rowData?.product?.productImage
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
                          rowData?.product?.productImage
                            ? `${fileUrlKey()}/${
                                rowData?.product?.productImage
                              }`
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

            {/* Item Description */}
            <Column flexGrow={1} minWidth={105}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                Product Question
              </HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="question" />
            </Column>

            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Product Answer</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="answer" />
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
                        Edit
                      </Popover>
                    }
                  >
                    <IconButton
                      onClick={() => {
                        setIsOpenEdit(true);
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
          <div style={{ padding: 20 }}>
            <Pagination
              total={allProductsQA?.meta?.total}
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="md"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              limitOptions={[5, 20, 30, 50, 100, 150, 200]}
              limit={size}
              onChangeLimit={(limitChange) => setSize(limitChange)}
              activePage={page}
              onChangePage={setPage}
            />
          </div>
        </div>
      </div>

      <ProductEditModal
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        editData={editData}
        handleCloseEdit={handleCloseEdit}
      />
    </>
  );
};

export default ProductQATable;
