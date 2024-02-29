"use client";

import { cellCss, headerCss } from "@/helpers/commonStyles/tableStyles";
import { fileUrlKey } from "@/helpers/envConfig";
import moment from "moment";
import Image from "next/image";
import { Modal, Popover, Table, Whisper } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const SubCategoryModalTable = ({
  handleCloseSubCategoryModal,
  isOpenSubModal,
  subCategories,
}: any) => {
  return (
    <div>
      <Modal
        size="lg"
        open={isOpenSubModal}
        onClose={handleCloseSubCategoryModal}
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
            data={subCategories ?? []}
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
                            src={`${fileUrlKey()}/${rowData?.subCategoryImg}`}
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
                        src={`${fileUrlKey()}/${rowData?.subCategoryImg}`}
                        className="object-center  object-cover"
                      />
                    </div>
                  </Whisper>
                )}
              </Cell>
            </Column>
            {/* product name */}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Sub Category Name</HeaderCell>
              <Cell
                style={cellCss}
                verticalAlign="middle"
                dataKey="subCategoryName"
              />
            </Column>
            {/* product Description */}
            <Column align="center" flexGrow={1}>
              <HeaderCell style={headerCss}>Total Products</HeaderCell>
              <Cell
                align="center"
                style={cellCss}
                verticalAlign="middle"
                dataKey="_count.Product"
              />
            </Column>
            {/* Sub Category Created At*/}
            <Column flexGrow={1}>
              <HeaderCell style={headerCss}>Created At</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="createdAt">
                {(rowData: any) => (
                  <p>{moment(rowData?.createdAt).format("LLL")}</p>
                )}
              </Cell>
            </Column>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SubCategoryModalTable;
