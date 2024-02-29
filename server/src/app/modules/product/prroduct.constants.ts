export const ProductFilterableFields: string[] = ['searchTerm', 'productColor', 'productSize' , 'categoryName'];
export const ProductSearchableFields: string[] = ['productName'];

export const ProductRelationalFields: string[] = ['productName'];

export const ProductRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'productName',
};
