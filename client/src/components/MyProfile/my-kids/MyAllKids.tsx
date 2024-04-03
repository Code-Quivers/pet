"use client";

import { fileUrlKey } from "@/helpers/config/envConfig";
import { useGetMyAllKidsQuery } from "@/redux/api/features/kids/kidApi";
import { cellCss, headerCss } from "@/utils/commonStyles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { IconButton, Pagination, Popover, Table, Whisper } from "rsuite";
const { Cell, Column, ColumnGroup, HeaderCell } = Table;

const MyAllKids = () => {
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetMyAllKidsQuery({});
  const router = useRouter();

  return (
    <div className="py-10">
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
                        src={`${fileUrlKey()}/${rowData?.kidImage}`}
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
                    src={`${fileUrlKey()}/${rowData?.kidImage}`}
                    className="object-center  object-cover"
                  />
                </div>
              </Whisper>
            )}
          </Cell>
        </Column>

        {/* Blog Title */}
        <Column flexGrow={2}>
          <HeaderCell style={headerCss}>Kid Name</HeaderCell>
          <Cell style={cellCss} verticalAlign="middle" dataKey="kidName" />
        </Column>
        {/* Category name */}
        <Column flexGrow={1}>
          <HeaderCell style={headerCss}>Age</HeaderCell>
          <Cell style={cellCss} verticalAlign="middle" dataKey="kidAge" />
        </Column>

        {/* Category Description */}

        <Column flexGrow={2}>
          <HeaderCell style={headerCss}>Description</HeaderCell>
          <Cell style={cellCss} verticalAlign="middle" dataKey="description" />
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
                      // setIsOpenDelete(true);
                      // setDeleteData(rowData);
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
          total={data?.data?.length || 0}
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
          limit={10}
          // onChangeLimit={(limitChange) => setSize(limitChange)}
          // activePage={page}
          // onChangePage={setPage}
        />
      </div>
    </div>
  );
};

export default MyAllKids;
