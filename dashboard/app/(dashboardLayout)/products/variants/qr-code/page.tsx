"use client";
import {
  useGetProductQuery,
  useGetSingleProductQuery,
  useGetSingleVariantQuery,
} from "@/redux/features/productsApi";
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
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdKeyboardArrowRight, MdModeEdit } from "react-icons/md";
const { Column, HeaderCell, Cell } = Table;
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import Link from "next/link";

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

  const [editData, setEditData] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  // close modal
  const handleCloseEdit = () => {
    setIsOpenEdit(false);
    setEditData(null);
  };

  const searchParams = useSearchParams();
  const variantId = searchParams.get("variantId");
  console.log("variantId", variantId);

  const {
    data: singleVariant,
    isLoading,
    isFetching,
  } = useGetSingleVariantQuery(variantId as string);
  console.log("singleProduct", singleVariant);

  return (
    <>
      <div className="flex items-center mb-2 text-sm text-[#2563eb]">
        <Link href={"/"} className="underline-offset-8">
          Dashboard
        </Link>
        <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
        <Link href={`/products`}>All products</Link>
        <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
        <Link
          href={`/products/variants?productId=${singleVariant?.data?.productId}`}
        >
          Variants
        </Link>
        <MdKeyboardArrowRight size={20} className="text-[#9ca3af]" />
        <p className="font-bold">Qr Code</p>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <p>
          Product Name:{" "}
          <span className="font-semibold">
            {singleVariant?.data?.product?.productName}
          </span>
        </p>
        <p>
          Color:{" "}
          <span className="font-semibold">
            {singleVariant?.data?.color?.name}
          </span>
        </p>
        {singleVariant?.data?.size ? (
          <p>
            Size:{" "}
            <span className="font-semibold">{singleVariant?.data?.size}</span>
          </p>
        ) : null}
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          {/* <div>
            <h2 className="text-lg font-semibold ">
              All Products | {allProductsList?.meta?.total}
            </h2>
          </div> */}

          {/* <div className="flex max-md:justify-between gap-10 items-center">
            <div>
              <SelectPicker
                placeholder="Product Filter By Category"
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
          </div> */}
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
            data={singleVariant?.data?.barCodes || []}
          >
            {/* Qr Code */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Qr Code</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => `${rowData.code}`}
              </Cell>
            </Column>

            {/* Qr Code */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Status</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="barcodeStatus"
              >
                {(rowData) => `${rowData.barcodeStatus}`}
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
              total={singleVariant?.data?.barCodes?.length || 0}
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
