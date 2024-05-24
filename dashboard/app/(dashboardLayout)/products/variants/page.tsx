"use client";

import Image from "next/image";
import {
  useGetProductQuery,
  useGetSingleProductQuery,
} from "@/redux/features/productsApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  Button,
  ButtonToolbar,
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
import { MdKeyboardArrowRight, MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";
import { FaPlus } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import Link from "next/link";
import VariantEditDrawer from "@/components/products/modal/VariantEditDrawer";

const AllProductList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  query["categoryName"] = categoryFilter;

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

  const {
    data: allProductsList,
    isLoading,
    isFetching,
  } = useGetProductQuery({ ...query });

  const [editData, setEditData] = useState(null);

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const { data: singleProduct } = useGetSingleProductQuery(productId as string);
  console.log("singleProduct", singleProduct);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const VariantEdit = (key: any) => {
    setOpen(true);
    setPlacement(key);
  };

  return (
    <>
      <div className="flex items-center mb-2 text-sm text-[#2563eb]">
        <Link href={"/"}>Dashboard</Link>
        <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
        <Link href={`/products`}>All products</Link>
        <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
        <p className="font-bold">Variants</p>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <p>
          Product Name:{" "}
          <span className="font-semibold">
            {singleProduct?.data?.productName}
          </span>
        </p>
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5"></div>

        {/*  */}
        <div className="rounded-sm bg-white">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the
            autoHeight={true}
            data={singleProduct?.data?.productVariations}
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
                              rowData?.image
                                ? `${fileUrlKey()}/${rowData?.image}`
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
                          rowData?.image
                            ? `${fileUrlKey()}/${rowData?.image}`
                            : noImage
                        }
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>

            {/* color */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Color</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => `${rowData.color.name}`}
              </Cell>
            </Column>

            {/* price */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Price</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="productPrice"
              >
                {(rowData) => `$ ${rowData.variantPrice}`}
              </Cell>
            </Column>
            {/* stock */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Stock</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="productPrice"
              >
                {(rowData) => `${rowData.stock}`}
              </Cell>
            </Column>
            {/* Qr Code */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Qr Code</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="productPrice"
              >
                {(rowData) => (
                  <Link
                    href={`/products/variants/qr-code/?variantId=${rowData?.variantId}`}
                  >
                    Qr Code List
                  </Link>
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
                        Edit
                      </Popover>
                    }
                  >
                    <IconButton
                      onClick={() => {
                        setEditData(rowData);
                        VariantEdit("right");
                      }}
                      circle
                      icon={<MdModeEdit size={20} />}
                    />
                  </Whisper>
                )}
              </Cell>
            </Column>
          </Table>

          <div>
            <VariantEditDrawer
              open={open}
              setOpen={setOpen}
              // onClose={handleCloseEdit}
              editData={editData}
              placement={placement}
            />
          </div>
          <div style={{ padding: 20 }}>
            <Pagination
              total={singleProduct?.data?.productVariations?.length || 0}
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
      </div>
    </>
  );
};

export default AllProductList;
