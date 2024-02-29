"use client";

import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { fileUrlKey } from "@/helpers/envConfig";
import moment from "moment";
import Image from "next/image";
import { Modal, Popover, Table, Whisper } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const AllProductsModalTable = ({
  handleCloseProductModal,
  isOpenProductModal,
  allProducts,
}: any) => {
  console.log(allProducts);
  return (
    <div>
      <Modal
        size="lg"
        open={isOpenProductModal}
        onClose={handleCloseProductModal}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-sm font-semibold ">
              Products | {allProducts?.length ?? "0"}
            </span>
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
            data={allProducts ?? []}
          >
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
                            width={250}
                            height={250}
                            alt=""
                            src={`${fileUrlKey()}/${rowData?.productImage}`}
                            className="!h-[250px] !w-[250px]  object-cover"
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
                        src={`${fileUrlKey()}/${rowData?.productImage}`}
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
                dataKey="productName"
              />
            </Column>
            {/* Description */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Description</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="description"
              />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Short Summary</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="shortSummery"
              />
            </Column>

            {/* Sub Category Created At*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Created At</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="createdAt">
                {(rowData: any) => (
                  <p>{moment(rowData?.createdAt).format("LL")}</p>
                )}
              </Cell>
            </Column>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllProductsModalTable;
