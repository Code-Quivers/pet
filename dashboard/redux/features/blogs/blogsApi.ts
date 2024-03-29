import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";
const CATEGORY_API = "/blogs";

const BlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addNewBlog: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
    updateCategory: builder.mutation({
      query: ({ data, categoryId }) => ({
        url: `${CATEGORY_API}/${categoryId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    getAllBlogs: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${CATEGORY_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.blogs, tagTypes.categories],
    }),

    getSingleCategory: builder.query({
      query: (categoryHref: string | undefined) => ({
        url: `${CATEGORY_API}/${categoryHref}`,
        method: "GET",
      }),
      providesTags: [tagTypes.categories],
    }),

    deleteCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: `${CATEGORY_API}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categories],
    }),
  }),
});

export const {
  useAddNewBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = BlogApi;
