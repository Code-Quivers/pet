export const PetFilterableFields: string[] = ['searchTerm', 'productColor', 'productSize', 'categoryName'];
export const PetSearchableFields: string[] = ['productName'];

export const PetRelationalFields: string[] = ['productName'];

export const PetRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'productName',
};
