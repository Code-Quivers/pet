export type IAdvertisementFilterRequest = {
    searchTerm?: string | undefined;
  };


export type IAdvertisement = {
    adTitle: string;
    adDetails: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
};

export type IEditAdvertisement = {
    adTitle?: string;
    adDetails?: string;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
}
