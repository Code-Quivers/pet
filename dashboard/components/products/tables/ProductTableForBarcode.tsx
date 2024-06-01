"use client";

import Image from "next/image";
import { useGetProductQuery } from "@/redux/features/productsApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import {
  Button,
  ButtonToolbar,
  Checkbox,
  DateRangePicker,
  Dropdown,
  Input,
  InputGroup,
  Pagination,
  Popover,
  SelectPicker,
  Table,
  Whisper,
} from "rsuite";
import { fileUrlKey, getClientUrl } from "@/helpers/envConfig";
import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { BiSearch } from "react-icons/bi";
const { Column, HeaderCell, Cell } = Table;
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import DocPassIcon from "@rsuite/icons/DocPass";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { predefinedRanges } from "@/helpers/constant";
import {
  useGetBarcodeForPrintQuery,
  useUpdateBarcodeStatusMutation,
} from "@/redux/features/barCodeApi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import BarcodeDeleteModal from "../modal/BarcodeDeleteModal";

const ProductBarcode = () => {
  const router = useRouter();
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [barcodeStatus, setBarcodeStatus] = useState<string>("");
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });

  // console.log("checkedKeys", checkedKeys);

  query["barcodeStatus"] = barcodeStatus;
  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;
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
    data: allBarCodeList,
    isLoading,
    isFetching,
  } = useGetBarcodeForPrintQuery({ ...query });

  // console.log("allBarCodeList", allBarCodeList);

  // Filter date
  const handleFilterDate = (date: Date[] | null) => {
    if (!date?.length) {
      setSelectedDate({
        startDate: "",
        endDate: "",
      });
    }

    if (date) {
      const startDate = new Date(date[0]);
      const endDate = new Date(date[1]);

      // Set the start time to 00:00:00 (12:00 AM)
      startDate.setHours(0, 0, 0, 0);

      // Set the end time to 23:59:59 (11:59 PM)
      endDate.setHours(23, 59, 59, 999);

      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      if (startDate !== null && endDate !== null) {
        setSelectedDate({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      }
    }
  };

  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = () => {
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            disabled={!isLoading && !allBarCodeList?.data?.length}
            onClick={saveExcel}
            eventKey={4}
          >
            Export to Excel
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  const checkedBoxData = allBarCodeList?.data?.filter((obj: any) =>
    checkedKeys.includes(obj.barcodeId)
  );

  // ! export to excel -------------------------------------------------

  const columns = [
    { header: "Product Name", key: "productName" },
    { header: "Product Price", key: "variantPrice" },
    { header: "Product Color", key: "productColor" },
    { header: "Product Size", key: "productSize" },
    { header: "QR Code Link", key: "qrCodeLink" },
    { header: "QR Code Image", key: "qrCodeImage" },
  ];

  const workbook = new Excel.Workbook();

  const saveExcel = async () => {
    try {
      const fileName = "Product File";

      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet("workSheetName");

      // each columns contains header and its mapping key from data
      worksheet.columns = columns;

      // loop through all of the columns and set the alignment with width.
      worksheet.columns?.forEach((column: any) => {
        column.width = column?.header?.length + 5;
        column.alignment = { horizontal: "center" };
      });

      // const rowIndexStart = 2;

      // let rowIndex = rowIndexStart;

      checkedBoxData?.length > 0
        ? checkedBoxData?.forEach((singleData: any) => {
            const customRows = {
              productName: singleData.variant.product.productName,
              variantPrice: singleData.variant.variantPrice,
              productColor: singleData.variant.color.name,
              productSize: singleData.variant.size
                ? singleData.variant.size
                : "No Size",
              qrCodeLink: `http://localhost:3000/tag/${singleData.code}`,
              qrCodeImage: singleData.code,
            };
            worksheet.addRow(customRows);
          })
        : allBarCodeList?.data?.forEach((singleData: any) => {
            const customRows = {
              productName: singleData.variant.product.productName,
              variantPrice: singleData.variant.variantPrice,
              productColor: singleData.variant.color.name,
              productSize: singleData.variant.size
                ? singleData.variant.size
                : "No Size",
              qrCodeLink: `http://localhost:3000/tag/${singleData.code}`,
              qrCodeImage: singleData.code,
            };
            worksheet.addRow(customRows);
          });

      // Add style
      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true }; // Font styling
      headerRow.height = 30;
      headerRow.alignment = { vertical: "middle", horizontal: "center" };
      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        // store each cell to currentCell
        // @ts-ignore
        const currentCell = row?._cells;

        // loop through currentCell to apply border only for the non-empty cell of excel
        currentCell.forEach((singleCell: any) => {
          // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
          const cellAddress = singleCell._address;

          // apply border
          worksheet.getCell(cellAddress).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      console.error("<<<ERROR>>>", error);
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet("workSheetName");
    }
  };

  /// Table Check Box

  let checked = false;
  let indeterminate = false;

  if (checkedKeys?.length === allBarCodeList?.data?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (
    checkedKeys?.length > 0 &&
    checkedKeys?.length < allBarCodeList?.data?.length
  ) {
    indeterminate = true;
  }

  const handleCheckAll = (value: any, checked: any) => {
    const keys = checked
      ? allBarCodeList?.data?.map((item: any) => item.barcodeId)
      : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value: any, check: any) => {
    const keys = check
      ? [...checkedKeys, value]
      : checkedKeys.filter((item: any) => item !== value);
    setCheckedKeys(keys);
  };

  const CheckCell = ({
    rowData,
    onChange,
    checkedKeys,
    dataKey,
    ...props
  }: any) => {
    return (
      <div style={{ lineHeight: "46px" }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
        />
      </div>
    );
  };

  const barcodeAllStatus = [
    {
      label: "AVAILABLE",
      value: "AVAILABLE",
    },
    {
      label: "ACTIVE",
      value: "ACTIVE",
    },
    {
      label: "INACTIVE",
      value: "INACTIVE",
    },
  ];

  const enumStatus = barcodeAllStatus.map((item) => {
    return {
      label: item.label,
      value: item.value,
    };
  });

  //BarCode Status Change

  const [barcodeStatusChange] = useUpdateBarcodeStatusMutation();

  const barCodeStatusChange = async (eventKey: string, rowData: any) => {
    const objData = {
      barcodeStatus: eventKey,
    };

    console.log("objData", objData);

    await barcodeStatusChange({
      barcodeId: rowData?.barcodeId,
      data: objData,
    });
  };

  //Delete Modal

  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any | null>(null);
  const handleCloseDelete = () => setIsOpenDelete(false);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-5">
          <div className="flex justify-center items-center gap-3">
            <div>
              <h2 className="text-lg font-semibold ">
                Barcode List | {allBarCodeList?.meta?.total}
              </h2>
            </div>
            <div>
              <InputGroup
                inside
                style={{
                  width: 400,
                }}
              >
                <Input
                  style={{
                    width: 300,
                  }}
                  onChange={(e) => setSearchTerm(e)}
                  placeholder="Search by barcode..."
                />
                <InputGroup.Addon>
                  <BiSearch />
                </InputGroup.Addon>
              </InputGroup>
            </div>

            <div>
              <SelectPicker
                placeholder="Product Filter By Status"
                data={enumStatus}
                className="w-60"
                searchable={false}
                onChange={(value: any) => {
                  setBarcodeStatus(value);
                }}
                style={{
                  width: 300,
                }}
              />
            </div>

            <div>
              <DateRangePicker
                // @ts-ignore
                ranges={predefinedRanges}
                placement="bottomEnd"
                onChange={(value: Date[] | null): void => {
                  handleFilterDate(value);
                }}
                onClean={() =>
                  setSelectedDate({
                    startDate: "",
                    endDate: "",
                  })
                }
                size="md"
                // style={{ width: "30%" }}
                placeholder="Filter By Product Created Date"
              />
            </div>
          </div>

          <div className="flex justify-center items-center gap-3">
            <ButtonToolbar>
              <Whisper
                placement="bottomEnd"
                speaker={renderMenu}
                trigger={["click"]}
              >
                <Button
                  appearance="default"
                  className=" !border-gray text-white hover:text-white/80 focus-within:text-white focus-within:bg-[#0284c7] font-semibold
                    "
                  color="blue"
                  startIcon={<DocPassIcon className="text-xl" />}
                >
                  Generate File
                </Button>
              </Whisper>
            </ButtonToolbar>
            <button
              onClick={() => {
                router.push("/products/add-products");
              }}
              className="  px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 bg-primary text-sm text-white"
            >
              <FaPlus /> Add Product
            </button>
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
            data={allBarCodeList?.data}
          >
            <Column width={50} align="center" verticalAlign="middle">
              <HeaderCell style={{ padding: 0 }}>
                <div style={{ lineHeight: "40px" }}>
                  <Checkbox
                    inline
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={handleCheckAll}
                  />
                </div>
              </HeaderCell>

              <Cell>
                {(rowData) => (
                  <div>
                    <CheckCell
                      dataKey="barcodeId"
                      rowData={rowData}
                      checkedKeys={checkedKeys}
                      onChange={handleCheck}
                    />
                  </div>
                )}
              </Cell>
            </Column>

            {/*img*/}
            <Column width={70}>
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
                              rowData?.variant?.image
                                ? `${fileUrlKey()}/${rowData?.variant?.image}`
                                : "/images/no-image.png"
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
                          rowData?.variant?.image
                            ? `${fileUrlKey()}/${rowData?.variant?.image}`
                            : "/images/no-image.png"
                        }
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>
            {/* product name */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Product Name</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="variant.product.productName"
              />
            </Column>

            {/* category */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Variant Price</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="variant.variantPrice"
              />
            </Column>
            {/* product short summary */}
            <Column flexGrow={1} minWidth={105}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                ProductColor
              </HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="variant.color.name"
              />
            </Column>

            {/* Size */}
            {/* <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Product Size</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="variant.size"
              />
            </Column> */}

            {/* Barcode */}
            <Column flexGrow={3}>
              <HeaderCell style={headerCss}>QR Code Link</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="code">
                {(rowData) => `${getClientUrl()}/tag/${rowData.code}`}
              </Cell>
            </Column>

            {/* Barcode */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>QR Code Status</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                // dataKey="barcodeStatus"
              >
                {(rowData) => (
                  <div className="flex items-center gap-3">
                    {rowData.barcodeStatus}{" "}
                    <span>
                      <Whisper
                        placement="bottomStart"
                        controlId="control-id-with-dropdown"
                        trigger="click"
                        speaker={
                          <Popover full>
                            <Dropdown.Menu
                              onSelect={(eventKey) =>
                                barCodeStatusChange(eventKey as string, rowData)
                              }
                            >
                              <Dropdown.Item eventKey={"ACTIVE"}>
                                ACTIVE
                              </Dropdown.Item>
                              <Dropdown.Item eventKey={"INACTIVE"}>
                                INACTIVE
                              </Dropdown.Item>
                              <Dropdown.Item eventKey={"AVAILABLE"}>
                                AVAILABLE
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Popover>
                        }
                      >
                        <Button>
                          <FiEdit2 />
                        </Button>
                      </Whisper>
                    </span>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Crated At */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Created</HeaderCell>
              <Cell
                // style={cellCss}
                verticalAlign="middle"
                dataKey="variant.size"
              >
                {(rowData) => ` ${new Date(rowData.createdAt).toDateString()}`}
              </Cell>
            </Column>

            {/* Action */}

            <Column width={70}>
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
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
                )}
              </Cell>
            </Column>
          </Table>

          <div>
            <BarcodeDeleteModal
              isOpenDelete={isOpenDelete}
              handleCloseDelete={handleCloseDelete}
              deleteData={deleteData}
            />
          </div>

          <div style={{ padding: 20 }}>
            <Pagination
              total={allBarCodeList?.meta?.total}
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

export default ProductBarcode;
