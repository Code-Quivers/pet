"use client";
import { useState } from "react";
import { IconButton, Pagination, Popover, Table, Whisper } from "rsuite";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { useGetSlotQuery } from "@/redux/features/slotApi";
import moment from "moment";
import EditSlotModalForm from "./EditSlotModalForm";
const { Cell, Column, HeaderCell } = Table;
// !
const AllSlotListTable = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // ! queries
  query["limit"] = size;
  query["page"] = page;
  // const debouncedTerm = useDebounced({
  //   searchQuery: searchTerm,
  //   delay: 300,
  // });

  // if (!!debouncedTerm) {
  //   query["searchTerm"] = debouncedTerm;
  // }

  const {
    data: allProductsList,
    isLoading,
    isFetching,
  } = useGetSlotQuery({ ...query });
  // states
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const handleCloseEditModal = () => {
    setIsOpenEdit(false);
    setEditData(null);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  p-3">
        <div className=" flex max-lg:flex-col max-md:gap-y-3 md:justify-between md:items-center mb-2">
          <div>
            <h2 className="text-lg font-semibold ">
              Slot List | {allProductsList?.meta?.total}
            </h2>
          </div>
        </div>

        <div className="rounded-sm  border-stroke bg-white  dark:border-strokedark dark:bg-boxdark p">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={70}
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allProductsList?.data}
          >
            {/*Slot Time */}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Slot Time Start - End</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="categoryName"
              >
                {(rowData: any) => (
                  <div>
                    <p>
                      {moment(rowData.startTime).format("H:mm")} Uhr -{" "}
                      {moment(rowData.endTime).format("H:mm")} Uhr
                    </p>
                  </div>
                )}
              </Cell>
            </Column>
            {/* slot created at */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Created at</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="categoryName"
              >
                {(rowData: any) => (
                  <div>
                    <p>{moment(rowData?.createdAt).format("ll")}</p>
                  </div>
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
              layout={["-", "limit", "|", "pager", "skip"]}
              limitOptions={[10, 20, 30, 50, 100, 150, 200]}
              limit={size}
              onChangeLimit={(limitChange) => setSize(limitChange)}
              activePage={page}
              onChangePage={setPage}
            />
          </div>
        </div>
      </div>

      {/* edit category */}
      <EditSlotModalForm
        isOpenEdit={isOpenEdit}
        handleClose={handleCloseEditModal}
        editData={editData}
      />
    </>
  );
};

export default AllSlotListTable;
