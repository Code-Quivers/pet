"use client";

import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { fileUrlKey } from "@/helpers/envConfig";
import Image from "next/image";
import { Modal, Popover, Table, Whisper } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import noImage from "@/public/images/no-image.png";

const OptionalItemsModalTable = ({
  handleCloseOptionalModal,
  isOpenOptionalItemModal,
  optionalItems,
}: any) => {
  return (
    <div>
      <Modal
        size="lg"
        open={isOpenOptionalItemModal}
        onClose={handleCloseOptionalModal}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-sm font-semibold ">Optional Items</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            rowHeight={70}
            headerHeight={80}
            rowExpandedHeight={160}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={optionalItems ?? []}
          >
            {/*img*/}
            {/* <Column width={70}>
              <HeaderCell style={headerCss}>Image</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => (
                  <Whisper
                    placement="auto"
                    speaker={
                      <Popover>
                        <div>
                          <Image
                            width={180}
                            height={180}
                            alt=""
                            src={`${fileUrlKey()}/${
                              rowData?.product?.productImage
                            }`}
                            className="!h-52 !w-52  object-cover"
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
                        src={`${fileUrlKey()}/${
                          rowData?.product?.productImage
                        }`}
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column> */}
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
                              rowData?.productImage
                                ? `${fileUrlKey()}/${
                                    rowData?.product?.productImage
                                  }`
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
                          rowData?.product?.productImage
                            ? `${fileUrlKey()}/${rowData?.productImage}`
                            : noImage
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
                dataKey="product.productName"
              />
            </Column>
            {/* product Description */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Description</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="product.description"
              />
            </Column>
            {/* Short Summary */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Product Summary</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="product.shortSummery"
              />
            </Column>

            {/* Batch Quantity */}
            <Column minWidth={50}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
                Price
              </HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="product.price"
              />
            </Column>
            {/* Batch batchPackType */}
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OptionalItemsModalTable;
