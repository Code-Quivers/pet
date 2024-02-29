"use client";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Popover,
  Table,
  Whisper,
} from "rsuite";
const { Cell, Column, HeaderCell } = Table;
import { useState } from "react";
import { useGetAllEventsQuery } from "@/redux/features/eventApi";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import AddEventForm from "./AddEventForm";
import { FiSearch } from "react-icons/fi";
import { useDebounced } from "@/redux/hook";
import EditInformationModal from "./EditEventInformationModal";
import EventDateAndHallModal from "./EventDateAndHallModal";

const AllEvents = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  //! filter
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
    data: allEventList,
    isLoading,
    isFetching,
  } = useGetAllEventsQuery({ ...query });

  const [editData, setEditData] = useState<any | null>(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleClose = () => {
    setIsOpenEdit(false);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);

  const [eventDateListEdit, setEventDateListEdit] = useState<any>();

  return (
    <>
      <div className="max-w-full ">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center   pb-2 mb-5">
            <div>
              <h2 className="text-lg font-semibold ">
                Event List | {allEventList?.meta?.total}
              </h2>
            </div>

            <div className="flex max-md:justify-between gap-10 items-center">
              <div>
                <InputGroup
                  inside
                  style={{
                    width: 300,
                  }}
                  className="dark:!bg-body"
                >
                  <Input
                    style={{
                      width: 300,
                    }}
                    onChange={(e) => setSearchTerm(e)}
                    placeholder="Search by Event name..."
                    className="dark:!bg-body dark:!text-whiten dark:!placeholder-whiten"
                  />
                  <InputGroup.Addon>
                    <FiSearch className="dark:text-white" />
                  </InputGroup.Addon>
                </InputGroup>
              </div>

              <div>
                <AddEventForm />
              </div>
            </div>
          </div>

          <div className="rounded-sm mb-5 bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
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
              data={allEventList?.data}
            >
              {/* Event name */}
              <Column flexGrow={1}>
                <HeaderCell style={headerCss}>Event Name</HeaderCell>
                <Cell style={cellCss} verticalAlign="middle" dataKey="name" />
              </Column>
              {/* Event Description */}
              <Column flexGrow={1}>
                <HeaderCell style={headerCss}>Event Description</HeaderCell>
                <Cell
                  style={cellCss}
                  verticalAlign="middle"
                  dataKey="description"
                />
              </Column>

              {/* Event Halls & date */}
              <Column align="center" width={300}>
                <HeaderCell
                  style={{ ...headerCss, whiteSpace: "break-spaces" }}
                >
                  Event Halls & Date
                </HeaderCell>
                <Cell
                  style={cellCss}
                  verticalAlign="middle"
                  align="center"
                  dataKey="EventDate"
                >
                  {(rowData: any) => (
                    <Button
                      onClick={() => {
                        setModalOpen(true);
                        setEventDateListEdit(rowData);
                      }}
                      className="border px-2 hover:bg-primary hover:text-whiten border-primary text-primary py-1 duration-300 ease-in-out transition-all rounded-full cursor-context-menu "
                    >
                      View Hall & Event Date
                    </Button>
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

            <div>
              <EventDateAndHallModal
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
                eventDateListEdit={eventDateListEdit}
              />
            </div>

            {/* pagination */}
            <div style={{ padding: 20 }}>
              <Pagination
                total={allEventList?.meta?.total}
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
      </div>
      {/* editing modal */}
      <EditInformationModal
        isOpenEdit={isOpenEdit}
        editData={editData}
        handleClose={handleClose}
      />
    </>
  );
};

export default AllEvents;
