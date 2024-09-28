"use client";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
    Button,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Popover,
  Table,
  Tag,
  TagGroup,
  Toggle,
  Whisper,
} from "rsuite";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import { RiDeleteBinFill } from "react-icons/ri";

import { useGetPromoQuery } from "@/redux/features/promoCodeApi";
// import PromoCodeDeleteConfirmationModal from "../modal/PromoCodeDeleteConfirmationModal";
// import PromoCodeEditModal from "../modal/PromoCodeEditModal";
import moment from "moment";
import { useGetAdvertisementQuery } from "@/redux/features/adAPi";
import AdvertisementDeleteModal from "../modal/AdvertisementDeleteModal";
import AdvertisementEditModal from "../modal/AdvertisementEditModal";

const AdTableSection = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productFilter, setProductFilter] = useState<string>("");

  query["productName"] = productFilter;

  //   const router = useRouter();
  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  //Filter By Product

  //Data Fetch for testimonial

  const {
    data: allAdvertisement,
    isLoading,
    isFetching,
  } = useGetAdvertisementQuery({
    ...query,
  });

  console.log("allAdvertisement", allAdvertisement?.data);

  const [editData, setEditData] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  // close modal
  const handleCloseEdit = () => {
    setIsOpenEdit(false);
    setEditData(null);
  };

  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark px-3 xl:pb-1 my-3">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              Advertisement | {allAdvertisement?.meta?.total}
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
            headerHeight={90}
            shouldUpdateScroll={false} 
            autoHeight={true}
            data={allAdvertisement?.data}
          >
            {/*  Promotion Name */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Ad Title</HeaderCell>
              <Cell
                className="m-2"
                style={cellCss}
                verticalAlign="middle"
                dataKey="adTitle"
              >
                {(rowData: any) => {
                  return rowData.adTitle;
                }}
              </Cell>
            </Column>

            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Ad Details</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="adDetails"
              />
            </Column>
       
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Start Date</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="startDate">
                {(rowData: any) => {
                  return moment(rowData.startDate)?.format("MM/DD/YYYY");
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>End Date</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="endDate">
                {(rowData: any) => {
                  return moment(rowData.endDate)?.format("MM/DD/YYYY");
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
  <HeaderCell style={headerCss}>Active</HeaderCell>
  <Cell style={cellCss} verticalAlign="middle" dataKey="isActive">
    {(rowData: any) => {
      return (
        <Toggle
          checked={rowData.isActive} 
          onChange={(checked) => {
            console.log(`New active state: ${checked}`);
          }}
        />
      );
    }}
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
              total={allAdvertisement?.meta?.total}
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="md"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              limitOptions={[5, 20, 30, 50, 100, 150, 200]}
              limit={size}
              onChangeLimit={(limitChange) => setSize(limitChange)}
              activePage={page}
              onChangePage={setPage}
            />
          </div>
        </div>
      </div>

       {/* delete confirmation */}
          <AdvertisementDeleteModal
            isOpenDelete={isOpenDelete}
            handleCloseDelete={handleCloseDelete}
            deleteData={deleteData}
          />

      {/* Edit Modal */}
      <AdvertisementEditModal
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        editData={editData}
        handleCloseEdit={handleCloseEdit}
      />
    </>
  );
};

export default AdTableSection;