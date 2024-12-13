import { TQueryParam } from "@/types";
import { baseApi } from "../../api/baseApi";

const tutorialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTutorial: builder.mutation({
      query: (userInfo) => ({
        url: "/tutorial/create-tutorial",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Tutorial"],
    }),

    updateTutorial: builder.mutation({
      query: (userInfo) => ({
        url: `/tutorial/update-tutorial/${userInfo?._id}`,
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["Tutorial"],
    }),

    deleteTutorial: builder.mutation({
      query: (id) => ({
        url: `/tutorial/delete-tutorial/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tutorial"],
    }),

    getAllTutorial: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/tutorial/all-tutorial",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Tutorial"],
    }),
  }),
});

export const {
  useCreateTutorialMutation,
  useGetAllTutorialQuery,
  useUpdateTutorialMutation,
  useDeleteTutorialMutation,
} = tutorialApi;
