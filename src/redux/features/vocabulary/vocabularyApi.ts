import { TQueryParam } from "@/types";
import { baseApi } from "../../api/baseApi";

const vocabularyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVocabulary: builder.mutation({
      query: (userInfo) => ({
        url: "/vocabulary/create-vocabulary",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Vocabulary"],
    }),

    updateVocabulary: builder.mutation({
      query: (userInfo) => ({
        url: `/vocabulary/update-vocabulary/${userInfo?._id}`,
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["Vocabulary"],
    }),

    deleteVocabulary: builder.mutation({
      query: (id) => ({
        url: `/vocabulary/delete-vocabulary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vocabulary"],
    }),

    getAllVocabulary: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/vocabulary/all-vocabulary",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Vocabulary"],
    }),

    getVocabularyByLessonNo: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/vocabulary/get-vocabulary-by-lesson-no",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Vocabulary"],
    }),
  }),
});

export const {
  useCreateVocabularyMutation,
  useGetVocabularyByLessonNoQuery,
  useGetAllVocabularyQuery,
  useUpdateVocabularyMutation,
  useDeleteVocabularyMutation,
} = vocabularyApi;
