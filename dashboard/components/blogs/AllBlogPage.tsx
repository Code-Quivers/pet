"use client";
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
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import CategoryDeleteConfirmationModal from "../category/CategoryDeleteConfirmationModal";
import EditCategoryModal from "../category/EditCategoryModal";
import { useGetAllBlogsQuery } from "@/redux/features/blogs/blogsApi";
import { useRouter } from "next/navigation";
const { Cell, Column, HeaderCell } = Table;
// !

const AllBlogPage = () => {
  const router = useRouter();
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  //others
  const [open, setOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [isOpenSubModal, setIsOpenSubModal] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleCloseEditModal = () => setIsOpenEdit(false);

  const {
    data: allBlogs,
    isLoading,
    isFetching,
  } = useGetAllBlogsQuery({ ...query });

  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default    sm:px-7.5 xl:pb-1">
        <div className="flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              Blogs List | {allBlogs?.meta?.total}
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
                  placeholder="Search by title..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>

            <button
              onClick={() => router.push("/blogs/add-new-blog")}
              className="  px-4 py-2 rounded-full shadow-lg flex items-center gap-2 bg-primary text-sm text-white"
            >
              <FaPlus /> Add New Blog
            </button>
          </div>
        </div>

        <div className="rounded-sm mb-5 bg-white  ">
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
            data={allBlogs?.data}
          >
            {/*img*/}
            <Column width={80}>
              <HeaderCell style={headerCss}>Image</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => (
                  <Whisper
                    enterable
                    placement="auto"
                    speaker={
                      <Popover>
                        <div>
                          <Image
                            width={200}
                            height={200}
                            alt=""
                            src={`${fileUrlKey()}/${rowData?.blogImage}`}
                            className="!h-[300px] !w-[300px]   object-cover"
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
                        src={`${fileUrlKey()}/${rowData?.blogImage}`}
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>

            {/* Blog Title */}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Blog Title</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="title" />
            </Column>
            {/* Category name */}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Category Name</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="categoryName"
              />
            </Column>

            {/* Category Description */}

            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Description</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="description"
              />
            </Column>

            {/* Action */}

            <Column width={100} align="center">
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
                  <div className="flex gap-3">
                    <IconButton
                      onClick={() => {
                        router.push(`/blogs/edit/${rowData?.blogId}`);
                      }}
                      circle
                      icon={<MdModeEdit size={20} />}
                    />
                    {/* Delete */}
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

          <div style={{ padding: 20 }}>
            <Pagination
              total={allBlogs?.meta?.total}
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

      {/* delete confirmation */}
      <CategoryDeleteConfirmationModal
        isOpenDelete={isOpenDelete}
        handleCloseDelete={handleCloseDelete}
        deleteData={deleteData}
      />
      {/* edit category */}
      <EditCategoryModal
        isOpenEdit={isOpenEdit}
        handleClose={handleCloseEditModal}
        editData={editData}
      />
    </>
  );
};

export default AllBlogPage;
