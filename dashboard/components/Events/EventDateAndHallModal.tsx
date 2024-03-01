import { useGetAllHallsQuery } from "@/redux/features/productColorApi";
import { DatePicker, InlineEdit, Modal, SelectPicker, TagPicker } from "rsuite";

const EventDateAndHallModal = ({
  modalOpen,
  handleModalClose,
  eventDateListEdit,
}: any) => {
  console.log("allEventList", eventDateListEdit);

  //All Halls from Hall APi
  const { data: hallList } = useGetAllHallsQuery({});

  //Hall List Map
  const halls = hallList?.data?.map((hall: any) => ({
    label: hall.hallName,
    value: hall.hallId,
  }));

  return (
    <Modal
      size={"lg"}
      open={modalOpen}
      onClose={handleModalClose}
      className="!h-60"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>
          Event Name: {eventDateListEdit?.name}{" "}
          <span className="text-danger text-sm">
            (Here you can view and edit)
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="h-60 flex gap-5 w-full">
          <div className="flex flex-col justify-start items-start border border-gray gap-3 p-5 rounded-md shadow-sm w-1/2">
            <div>
              <p>Hall List:</p>
            </div>

            <div className="bg-meta-9 rounded-md p-1">
              {eventDateListEdit?.hallList?.length > 0 ? (
                <InlineEdit
                  style={{ width: 300 }}
                  defaultValue={eventDateListEdit?.hallList?.map(
                    (hall: any) => hall.hallId
                  )}
                >
                  <TagPicker data={halls} block />
                </InlineEdit>
              ) : (
                "No Hall Found!"
              )}
            </div>
          </div>

          <div className="flex flex-col border border-gray justify-start items-start gap-3 p-5 rounded-md shadow-sm  w-1/2">
            <div>
              <p>Sub Event:</p>
            </div>

            <div className="grid grid-cols-1  items-center ">
              {eventDateListEdit?.EventDate?.length > 0 ? (
                eventDateListEdit?.EventDate?.map((date: any, idx: any) => (
                  <div key={idx} className="flex items-center gap-2 w-full">
                    <div className="flex items-center">
                      <div>
                        <p className="font-bold">Date :</p>
                      </div>
                      <div>
                        <InlineEdit
                          defaultValue={
                            date?.eventDate !== null
                              ? new Date(date?.eventDate)
                              : undefined
                          }
                        >
                          <DatePicker
                          // format="yyyy-mm-dd"
                          />
                        </InlineEdit>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div>
                        <p className="font-bold">Title:</p>
                      </div>
                      <div>
                        <InlineEdit
                          style={{ width: 120 }}
                          defaultValue={date.title ? date.title : undefined}
                        >
                          <SelectPicker
                            data={["Set", "Event", "Breakdown"].map((item) => ({
                              label: item,
                              value: item,
                            }))}
                            searchable={false}
                          />
                        </InlineEdit>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Event Date Found</p>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EventDateAndHallModal;
