"use client";

import Image from "next/image";
import { useGetProductQuery } from "@/redux/features/productsApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Popover,
  Table,
  Tag,
  TagGroup,
  Whisper,
} from "rsuite";
import { fileUrlKey } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";
import { RiDeleteBinFill } from "react-icons/ri";
import { useGetTestimonialQuery } from "@/redux/features/testimonialApi";
import {
  useGetPromoQuery,
  useGetPromotionalOfferQuery,
} from "@/redux/features/promoCodeApi";
import PromoCodeDeleteConfirmationModal from "../modal/PromoCodeDeleteConfirmationModal";
import PromoCodeEditModal from "../modal/PromoCodeEditModal";

const PromoCodeTableList = () => {
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
    data: allPromo,
    isLoading,
    isFetching,
  } = useGetPromotionalOfferQuery({
    ...query,
  });

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
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              All Promo Code | {allPromo?.meta?.total}
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
                  placeholder="Search by Promo Code..."
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
            headerHeight={50}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={allPromo?.data}
          >
            {/*img*/}
            {/* <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Image</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => (
                  <Whisper
                    placement="auto"
                    speaker={
                      <Popover>
                        <div>
                          <Image
                            width={270}
                            height={270}
                            alt=""
                            src={
                              rowData?.clientImage
                                ? `${fileUrlKey()}/${rowData?.clientImage}`
                                : noImage
                            }
                            className="object-cover"
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
                          rowData?.clientImage
                            ? `${fileUrlKey()}/${rowData?.clientImage}`
                            : noImage
                        }
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column> */}
            {/* Item Description */}
            <Column width={250}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                Product Name
              </HeaderCell>
              <Cell
                className="m-2"
                style={cellCss}
                verticalAlign="middle"
                dataKey="clientName"
              >
                {(rowData: any) => {
                  return (
                    <TagGroup className="grid grid-cols-2 items-center gap-3">
                      {rowData?.promotion?.products?.map(
                        (product: any, index: number) => (
                          <Tag key={index} size="lg">
                            {" "}
                            {product.productName}{" "}
                          </Tag>
                        )
                      )}
                    </TagGroup>
                  );
                }}
              </Cell>
            </Column>

            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Promo Name</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="promotion.promotionName"
              />
            </Column>
            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Promo Code</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="promotion.promoCode"
              />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Expire Date</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="promotion.expireDate"
              >
                {(rowData: any) => {
                  return new Date(rowData.promotion.expireDate).toDateString();
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Number of Buy</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="buy">
                {(rowData: any) => {
                  return rowData.buy ? rowData.buy : "N/A";
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Number of Get</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="get">
                {(rowData: any) => {
                  return rowData.get ? rowData.get : "N/A";
                }}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Order Amount</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="threshold">
                {(rowData: any) => {
                  return rowData.threshold ? `$ ${rowData.threshold}` : "N/A";
                }}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Discount Amount</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="discount">
                {(rowData: any) => {
                  return rowData.discount ? `${rowData.discount}%` : "N/A";
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

          {/* delete confirmation */}
          <PromoCodeDeleteConfirmationModal
            isOpenDelete={isOpenDelete}
            handleCloseDelete={handleCloseDelete}
            deleteData={deleteData}
          />

          <div style={{ padding: 20 }}>
            <Pagination
              total={allPromo?.meta?.total}
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

      {/* Edit Modal */}
      <PromoCodeEditModal
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        editData={editData}
        handleCloseEdit={handleCloseEdit}
      />
    </>
  );
};

export default PromoCodeTableList;
