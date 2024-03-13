export const BarcodeFilterableFields: string[] = ['searchTerm', 'productColor', 'productSize', 'categoryName', 'startDate', 'endDate'];
export const BarcodeSearchableFields: string[] = ['productName'];

export const BarcodeRelationalFields: string[] = ['productName'];

export const BarcodeRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'productName',
};
