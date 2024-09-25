"use client";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Pagination, Placeholder, Popover, Whisper } from "rsuite";
//  import DeleteKidConfirmationModal from "./DeleteKidConfirmationModal";
import { useState } from "react";
//  import { formatDuration } from "@/utils/kids/kidsAgeFormatDuration";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaExternalLinkAlt,
  FaInfo,
  FaTimesCircle,
} from "react-icons/fa";
import Link from "next/link";
import moment from "moment";
import { GrLinkNext, GrView } from "react-icons/gr";
import { fileUrlKey } from "@/helpers/envConfig";
import { useGetAllKidsQuery } from "@/redux/features/bands/bandsApi";
import { IconButton, Input, InputGroup, Table } from "rsuite";
import { BiSearch } from "react-icons/bi";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDebounced } from "@/redux/hook";
import { formatDuration } from "@/utils/kidsAgeFormatter";
const { Cell, Column, HeaderCell } = Table;
// !
const BandsList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [isOpenSubModal, setIsOpenSubModal] = useState<boolean>(false);
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

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetAllKidsQuery({ ...query });

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5   sm:px-7.5 xl:pb-1">
        <div className="flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              Band List | {data?.meta?.total}
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
                  placeholder="Search by Category name..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>

            {/* <button
              onClick={handleOpen}
              className="  px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 bg-primary text-sm text-white"
            >
              <FaPlus /> Add Category
            </button> */}
          </div>
        </div>

        <div className="rounded-sm mb-5 bg-white ">
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
            data={data?.data}
          >
            {/*img*/}
            <Column width={85}>
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
                            src={
                              rowData?.kidImage
                                ? `${fileUrlKey()}/${rowData?.kidImage}`
                                : "/images/defaultPhoto.webp"
                            }
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
                        src={
                          rowData?.kidImage
                            ? `${fileUrlKey()}/${rowData?.kidImage}`
                            : "/images/defaultPhoto.webp"
                        }
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>

            {/* Full Name */}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Full Name</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData: any) => (
                  <div>
                    <h2 className="font-semibold ">
                      {rowData?.firstName} {rowData?.lastName}
                    </h2>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Age */}

            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Age</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData: any) => (
                  <div>
                    <p className="">{formatDuration(rowData?.kidAge)}</p>
                  </div>
                )}
              </Cell>
            </Column>
            {/* Age */}

            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Total Relations</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData: any) => (
                  <div>
                    <p className="">{rowData?.relations?.length}</p>
                  </div>
                )}
              </Cell>
            </Column>
            {/* user email */}

            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>User Email</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData: any) => (
                  <div>
                    <p className="">{rowData?.user?.email}</p>
                  </div>
                )}
              </Cell>
            </Column>
            {/* Created */}

            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Created</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData: any) => (
                  <div>
                    <p className="">
                      {moment(rowData?.createdAt).format("ll")}
                    </p>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Action */}

            <Column width={200} align="center">
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
                  <div className="flex items-center gap-3">
                    {/* Open Link */}
                    <Whisper
                      placement="topEnd"
                      speaker={
                        <Popover
                          className=" font-semibold rounded-full !py-1.5 "
                          arrow={false}
                        >
                          Open Link
                        </Popover>
                      }
                    >
                      <button
                        className="  hover:text-blue-600"
                        onClick={() => {
                          // setIsOpenDelete(true);
                          // setDeleteData(rowData);
                        }}
                      >
                        <FaExternalLinkAlt size={22} />
                      </button>
                    </Whisper>
                    {/* Delete */}
                    <Whisper
                      placement="topEnd"
                      speaker={
                        <Popover
                          className=" font-semibold rounded-full !py-1.5 "
                          arrow={false}
                        >
                          Details
                        </Popover>
                      }
                    >
                      <button
                        className="  hover:text-green-600 "
                        onClick={() => {
                          // setIsOpenDelete(true);
                          // setDeleteData(rowData);
                        }}
                      >
                        <GrView size={22} />
                      </button>
                    </Whisper>
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
                      <button
                        className="hover:text-[#eb0712db] "
                        onClick={() => {
                          // setIsOpenEdit(true);
                          // setEditData(rowData);
                        }}
                      >
                        <MdModeEdit size={22} />
                      </button>
                    </Whisper>
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
                          // setIsOpenDelete(true);
                          // setDeleteData(rowData);
                        }}
                      >
                        <RiDeleteBinFill size={22} />
                      </button>
                    </Whisper>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>

          {/* delete confirmation */}
          {/* <CategoryDeleteConfirmationModal
            isOpenDelete={isOpenDelete}
            handleCloseDelete={handleCloseDelete}
            deleteData={deleteData}
          /> */}

          <div style={{ padding: 20 }}>
            <Pagination
              total={data?.meta?.total}
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

export default BandsList;
