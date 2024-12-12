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

export const { useCreateTutorialMutation, useGetAllTutorialQuery } =
  tutorialApi;
