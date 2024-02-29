"use client";
import AddCategoryModalForm from "./AddSubCategoryModalForm";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import {
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Popover,
  Table,
  Whisper,
} from "rsuite";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import Image from "next/image";
import { fileUrlKey } from "@/helpers/envConfig";
import { BiSearch } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import EditSubCategoryModal from "./EditSubCategoryModal";
import AllProductsModalTable from "./AllProductsModal";
import { useGetSubCategoryQuery } from "@/redux/features/subCategoryApi";
const { Cell, Column, HeaderCell } = Table;
// !

const AllSubCategoryList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [isOpenProductModal, setIsOpenProductModal] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<any | null>(null);

  const handleCloseEditModal = () => setIsOpenEdit(false);

  const handleCloseProductModal = () => setIsOpenProductModal(false);
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
    data: allSubCategoriesList,
    isLoading,
    isFetching,
  } = useGetSubCategoryQuery({ ...query });
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center   pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              Sub Category List | {allSubCategoriesList?.meta?.total}
            </h2>
          </div>

          <div className="flex max-md:justify-between gap-10 items-center">
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
                  placeholder="Search here..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>

            <button
              onClick={handleOpen}
              className="border px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 bg-primary text-sm text-white"
            >
              <FaPlus /> Add Sub Category
            </button>
          </div>
        </div>
        <div className="rounded-lg mb-5 bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            rowExpandedHeight={160}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allSubCategoriesList?.data}
          >
            {/*img*/}
            <Column width={80}>
              <HeaderCell style={headerCss}>Image</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => (
                  <Whisper
                    placement="auto"
                    speaker={
                      <Popover>
                        <div>
                          <Image
                            width={200}
                            height={200}
                            alt=""
                            src={`${fileUrlKey()}/${rowData?.subCategoryImg}`}
                            className="!h-[300px] !w-[300px]  object-cover"
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
                        src={`${fileUrlKey()}/${rowData?.subCategoryImg}`}
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>
            {/* product name */}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Sub Category Name</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="subCategoryName"
              />
            </Column>
            {/* category Name */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Category Name</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="category.categoryName"
              />
            </Column>

            {/* product short summary */}
            <Column flexGrow={1} align="center" minWidth={105}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                Total Products
              </HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                align="center"
                dataKey="_count.Product"
              />
            </Column>
            <Column width={150} align="center">
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                Products List
              </HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                align="center"
                dataKey="shortSummery"
              >
                {(rowData: any) => (
                  <Whisper
                    placement="topEnd"
                    speaker={
                      <Popover
                        className="border !bg-[#614ae4] text-white font-semibold rounded-full !py-1.5 !px-5"
                        arrow={false}
                      >
                        View Products
                      </Popover>
                    }
                  >
                    <button
                      className="border px-5 py-1.5 hover:bg-[#cfdce5] border-[#cfdce5] rounded-md font-semibold "
                      onClick={() => {
                        setIsOpenProductModal(true);
                        setAllProducts(rowData?.Product);
                      }}
                    >
                      View
                    </button>
                  </Whisper>
                )}
              </Cell>
            </Column>

            {/* Action */}

            <Column width={100} align="center">
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
              total={allSubCategoriesList?.meta?.total}
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

      {/* modal */}
      <AddCategoryModalForm open={open} handleClose={handleClose} />
      <EditSubCategoryModal
        isOpenEdit={isOpenEdit}
        handleClose={handleCloseEditModal}
        editData={editData}
      />
      <AllProductsModalTable
        handleCloseProductModal={handleCloseProductModal}
        isOpenProductModal={isOpenProductModal}
        allProducts={allProducts}
      />
    </>
  );
};

export default AllSubCategoryList;
