"use client";
import { useGetSingleVariantQuery } from "@/redux/features/productsApi";
import { useEffect, useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  Checkbox,
  Input,
  InputGroup,
  Pagination,
  Popover,
  SelectPicker,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdKeyboardArrowRight, MdModeEdit } from "react-icons/md";
const { Column, HeaderCell, Cell } = Table;
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RiDeleteBinFill } from "react-icons/ri";
import BarCodeDeleteModal from "@/components/products/barcode-list/BarCodeDeleteModal";
import BarCodeDelete from "@/components/products/barcode-list/BarCodeDelete";
import InfoIcon from "@rsuite/icons/legacy/Info";

const AllProductList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  query["categoryName"] = categoryFilter;
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  console.log("page", page);

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const [editData, setEditData] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const searchParams = useSearchParams();
  const variantId = searchParams.get("variantId");

  const {
    data: singleVariant,
    isLoading,
    isFetching,
  } = useGetSingleVariantQuery(variantId ? { variantId, ...query } : null);

  console.log("singleVariant", singleVariant);

  const cleanSelectedKeys = () => setCheckedKeys([]);

  //Delete Modal

  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);

  //checked box

  let checked = false;
  let indeterminate = false;

  if (checkedKeys?.length === singleVariant?.data?.data?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (
    checkedKeys?.length > 0 &&
    checkedKeys?.length < singleVariant?.data?.data?.length
  ) {
    indeterminate = true;
  }

  const handleCheckAll = (value: any, checked: any) => {
    const keys = checked
      ? singleVariant?.data?.data?.map((item: any) => item.barcodeId)
      : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value: any, check: any) => {
    const keys = check
      ? [...checkedKeys, value]
      : checkedKeys.filter((item: any) => item !== value);
    setCheckedKeys(keys);
  };

  const CheckCell = ({
    rowData,
    onChange,
    checkedKeys,
    dataKey,
    ...props
  }: any) => {
    return (
      <div style={{ lineHeight: "46px" }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
        />
      </div>
    );
  };

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
        <div className="flex justify-between items-center">
          <div>
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
                <span className="font-semibold">
                  {singleVariant?.data?.size}
                </span>
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-3 w-[500px]">
            <div>
              <InputGroup
                inside
                style={{
                  width: 400,
                }}
              >
                <Input
                  style={{
                    width: 300,
                  }}
                  onChange={(e) => setSearchTerm(e)}
                  placeholder="Search by barcode..."
                />
                <InputGroup.Addon>
                  <Whisper
                    placement="top"
                    speaker={<Tooltip> Barcode Search</Tooltip>}
                  >
                    <InfoIcon />
                  </Whisper>
                </InputGroup.Addon>
              </InputGroup>
            </div>
            <div>
              {checkedKeys?.length > 0 && (
                <BarCodeDelete
                  barcodeIds={checkedKeys}
                  cleanSelectedKeys={cleanSelectedKeys}
                />
              )}
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
            data={singleVariant?.data?.data || []}
          >
            <Column width={50} align="center" verticalAlign="middle">
              <HeaderCell style={{ padding: 0 }}>
                <div style={{ lineHeight: "40px" }}>
                  <Checkbox
                    inline
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={handleCheckAll}
                  />
                </div>
              </HeaderCell>

              <Cell>
                {(rowData) => (
                  <div>
                    <CheckCell
                      dataKey="barcodeId"
                      rowData={rowData}
                      checkedKeys={checkedKeys}
                      onChange={handleCheck}
                    />
                  </div>
                )}
              </Cell>
            </Column>

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

            <Column width={100}>
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
                  <div className="flex items-center gap-1">
                    <Whisper
                      placement="topEnd"
                      speaker={
                        <Popover
                          className=" font-semibold rounded-full !py-1.5 "
                          arrow={false}
                        >
                          Delete
                        </Popover>
                      }
                    >
                      <button
                        className="  hover:text-[#eb0712db] "
                        onClick={() => {
                          setIsOpenDelete(true);
                          setDeleteData(rowData);
                        }}
                      >
                        <RiDeleteBinFill size={20} />
                      </button>
                    </Whisper>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>

          <div>
            <BarCodeDeleteModal
              isOpenDelete={isOpenDelete}
              handleCloseDelete={handleCloseDelete}
              deleteData={deleteData}
            />
          </div>

          <div style={{ padding: 20 }}>
            <Pagination
              total={singleVariant?.data?.meta?.total || 0}
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
