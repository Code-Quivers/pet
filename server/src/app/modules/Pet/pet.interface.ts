export type IProductFilterRequest = {
  searchTerm?: string | undefined;
};

export type IPetRequest = {
  petName: string;
  petImage: string;
  petDescription: string;
  petGender: string;
  petAge: string;
  petWeight: string;
  petAddress: string;
  petBehavior: string;
  petHealth: string;
  petVaccination: string;
  petProvider: string;
  userId: string;
  productId: string;
};

export type IPetUpdateRequest = {
  petName?: string;
  petDescription?: string;
  petGender?: string;
  petAge?: string;
  petWeight?: string;
  petAddress?: string;
  petBehavior?: string;
  petHealth?: string;
  petVaccination?: string;
  petProvider?: string;
  mother?: string;
  motherPhoneNumber?: string;
  father?: string;
  fatherPhoneNumber?: string;
  aunt?: string;
  auntPhoneNumber?: string;
  uncle?: string;
  unclePhoneNumber?: string;
  friend?: string;
  friendPhoneNumber?: string;
  grandFather?: string;
  grandFatherPhoneNumber?: string;
  grandMother?: string;
  grandMotherPhoneNumber?: string;
  oldFilePath?: string;
};
