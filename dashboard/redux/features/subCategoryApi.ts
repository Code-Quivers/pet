import { baseApi } from "@/redux/api/baseApi"; 
import { tagTypes } from "../tag-types/tag-types";
const SUB_CATEGORY_API = "/subCategory";

const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    addSubCategory: builder.mutation({
      query: ({data}) => ({
        url: `${SUB_CATEGORY_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.subCategories, tagTypes.categories],
    }),

    getSubCategory: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${SUB_CATEGORY_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.subCategories, tagTypes.categories],
    }),
    
    updateSubCategory: builder.mutation({
      query: ({data,subCategoryId}) => ({
        url: `${SUB_CATEGORY_API}/${subCategoryId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.subCategories,tagTypes.categories,tagTypes.product],
    }),
    
    getSingleSubCategory: builder.query({
      query: (subCategoryHref:string |undefined) => ({
        url: `${SUB_CATEGORY_API}/dashboard/href/${subCategoryHref}`,
        method: "GET", 
      }),
      providesTags: [tagTypes.subCategories, tagTypes.categories],
    }),
  }),
});

export const { useAddSubCategoryMutation, useGetSubCategoryQuery,useGetSingleSubCategoryQuery ,useUpdateSubCategoryMutation} =
  subCategoryApi;
