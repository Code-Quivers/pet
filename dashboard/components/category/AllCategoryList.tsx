"use client";
import AddCategoryModalForm from "./AddCategoryModalForm";
import { useDebounced } from "@/redux/hook";
import { useState } from "react";
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
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { fileUrlKey } from "@/helpers/envConfig";
import { MdModeEdit } from "react-icons/md";
import SubCategoryModalTable from "./SubCategoryTableModal";
import EditCategoryModal from "./EditCategoryModal";
import { FaPlus } from "react-icons/fa";
const { Cell, Column, HeaderCell } = Table;
// !
const AllCategoryList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [isOpenSubModal, setIsOpenSubModal] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<any | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseEditModal = () => setIsOpenEdit(false);
  const handleCloseSubCategoryModal = () => setIsOpenSubModal(false);
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
  } = useGetCategoryQuery({ ...query });
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              Category List | {allProductsList?.meta?.total}
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
                  placeholder="Search by product name..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>

            <button
              onClick={handleOpen}
              className="  px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 bg-primary text-sm text-white"
            >
              <FaPlus /> Add Category
            </button>
          </div>
        </div>

        <div className="rounded-sm mb-5 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
            data={allProductsList?.data}
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
                            src={`${fileUrlKey()}/${rowData?.categoryImg}`}
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
                        src={`${fileUrlKey()}/${rowData?.categoryImg}`}
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>
            {/* product name */}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Category Name</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="categoryName"
              />
            </Column>

            {/* product short summary */}
            <Column flexGrow={1} align="center" minWidth={105}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                Total Sub Category
              </HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                align="center"
                dataKey="_count.subCategory"
              />
            </Column>
            <Column width={150}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                Sub Category Table
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
                        View Sub Categories
                      </Popover>
                    }
                  >
                    <button
                      className="border px-5 py-1.5 hover:bg-[#cfdce5] border-[#cfdce5] rounded-md font-semibold "
                      onClick={() => {
                        setIsOpenSubModal(true);
                        setSubCategories(rowData?.subCategory);
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
              total={allProductsList?.meta?.total}
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
      <SubCategoryModalTable
        handleCloseSubCategoryModal={handleCloseSubCategoryModal}
        isOpenSubModal={isOpenSubModal}
        subCategories={subCategories}
      />
      {/* add category */}
      <AddCategoryModalForm open={open} handleClose={handleClose} />
      {/* edit category */}
      <EditCategoryModal
        isOpenEdit={isOpenEdit}
        handleClose={handleCloseEditModal}
        editData={editData}
      />
    </>
  );
};

export default AllCategoryList;
