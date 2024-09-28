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
  Tooltip,
  Whisper,
} from "rsuite";
import { fileUrlKey } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { MdModeEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetAllPaymentsQuery } from "@/redux/features/paymentApi";
import moment from "moment";
import { RiPaypalFill } from "react-icons/ri";
import { useGetAllPaymentsReportQuery } from "@/redux/features/paymentReportApi";
import { FaStripe } from "react-icons/fa";

const PaymentListTable = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
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
    data: allPaymentsReport,
    isLoading,
    isFetching,
  } = useGetAllPaymentsReportQuery({ ...query });


  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default  sm:px-7.5 xl:pb-1">
        <div className=" flex max-md:flex-col max-md:gap-y-3 md:justify-between md:items-center   pb-2 mb-5">
          <div>
            <h2 className="text-lg font-semibold ">
              Payment List | {allPaymentsReport?.data?.meta?.total ?? 0}
            </h2>
          </div>

          <div className="flex max-md:justify-between gap-10 items-center">
            <div>
              <InputGroup
                inside
                style={{
                  width: 500,
                }}
              >
                <Input
                  style={{
                    width: 400,
                  }}
                  onChange={(e) => setSearchTerm(e)}
                  placeholder="Search by Platform Id / Order Id / email..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="rounded-sm mb-5 bg-white  ">
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={100}
            headerHeight={50}
            rowExpandedHeight={160}
            shouldUpdateScroll={false}
            minHeight={500}
            hover={false}
            data={allPaymentsReport?.data?.data}
            autoHeight={true}
            className="focus-within:!outline-none"
          >
            {/* Payment Platform Id */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Payment Platform Id</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="paymentPlatformId"
              >
                {(rowData: any) => (
                  <div className="truncate w-[150px]">
                    <Whisper
                      enterable
                      trigger="hover"
                      placement="topStart"
                      speaker={<Tooltip>{rowData?.paymentPlatformId}</Tooltip>}
                    >
                      <span>{rowData?.paymentPlatformId}</span>
                    </Whisper>
                  </div>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Order Id</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="orderId">
                {(rowData: any) => (
                  <div className="truncate w-[150px]">
                    <Whisper
                      enterable
                      trigger="hover"
                      placement="topStart"
                      speaker={<Tooltip>{rowData?.orderId}</Tooltip>}
                    >
                      <span>{rowData?.orderId}</span>
                    </Whisper>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Transaction Info */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Transaction Info</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="transactionCreatedTime"
              >
                {(rowData: any) => (
                  <div>
                    <p className="text-bodydark2">Transaction Time:</p>
                    <span className="text-[11px] font-semibold">
                      {moment(rowData?.transactionCreatedTime).format("lll")}
                    </span>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Payer Info */}
            <Column flexGrow={2}>
              <HeaderCell style={headerCss}>Payer Info</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="payerName">
                {(rowData: any) => (
                  <div>
                    <p>{rowData?.payerName}</p>
                    <div>
                      <Whisper
                        enterable
                        trigger="hover"
                        placement="topStart"
                        speaker={
                          <Tooltip>{rowData?.payerEmailAddress}</Tooltip>
                        }
                      >
                        <span>{rowData?.payerEmailAddress}</span>
                      </Whisper>
                    </div>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Amount Info */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Amount Info</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="amountToPay"
              >
                {(rowData: any) => (
                  <div>
                    <p className="grid grid-cols-5">
                      <span className="text-bodydark2 col-span-2">To Pay:</span>
                      <span className="col-span-3 flex justify-end font-semibold ">
                        {rowData?.amountToPay} $
                      </span>
                    </p>
                    <p className="grid grid-cols-5">
                      <span className="text-bodydark2 col-span-2">Fee: </span>
                      <span className="col-span-3 flex justify-end ">
                        {rowData?.platformFee} $
                      </span>
                    </p>
                    <p className="grid grid-cols-5">
                      <span className="text-bodydark2 col-span-2">Net: </span>
                      <span className="col-span-3 flex justify-end ">
                        {rowData?.netAmount} $
                      </span>
                    </p>{" "}
                    <p className="grid grid-cols-5">
                      <span className="text-bodydark2 col-span-2">Paid: </span>
                      <span className="col-span-3 flex justify-end ">
                        {rowData?.amountPaid} $
                      </span>
                    </p>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Payment Status */}
            <Column flexGrow={1.2}>
              <HeaderCell style={headerCss}>Payment Status</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="paymentStatus"
              >
                {(rowData: any) => (
                  <div className="flex flex-col justify-center items-center space-y-1">
                    <div>
                      <p>{moment(rowData.createdAt).format("lll")}</p>
                    </div>
                    <div>
                    <p className="text-[#16A34A] uppercase font-semibold py-[2px] bg-[#DCFCE7] px-2 text-center rounded-full">
  {rowData?.paymentStatus === "succeeded" || rowData?.paymentStatus === "COMPLETED" ? "succeeded" : rowData?.paymentStatus}
</p>
                    </div>
                    <div className=" ">
                      {rowData?.paymentPlatform === "PAYPAL" && (
                        <p className="text-primary ">
                          <RiPaypalFill size={30} />
                        </p>
                      )}

                      {rowData?.paymentPlatform === "STRIPE" && (
                        <p className="text-primary px-2 ">
                          <FaStripe size={30} />
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>

          <div style={{ padding: 20 }}>
            <Pagination
              total={allPaymentsReport?.data?.meta?.total}
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

export default PaymentListTable;
