export type IEventListFilterRequest = {
  searchTerm?: string | undefined;
};

export type IEventRequest = {
  name: string;
  description: string;
  hallId: string;
  slotId: string;
};

export type IEventUpdateRequest = {
  name?: string;
  description?: string;
};


export type IGenericEventResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: T & { findHall: { hallId: string; hallName: string; }[] };
}