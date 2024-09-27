export const PaymentFilterableFields: string[] = ['searchTerm'];
export const PaymentSearchableFields: string[] = ['paymentPlatformId', 'orderId', 'payerEmailAddress'];

export const PaymentRelationalFields: string[] = ['productName'];

export const PaymentRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'productName',
};
