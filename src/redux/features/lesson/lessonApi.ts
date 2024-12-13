import { TQueryParam } from "@/types";
import { baseApi } from "../../api/baseApi";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation({
      query: (userInfo) => ({
        url: "/lesson/create-lesson",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Lesson"],
    }),

    updateLesson: builder.mutation({
      query: (userInfo) => ({
        url: `/lesson/update-lesson/${userInfo?._id}`,
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["Lesson"],
    }),

    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lesson//delete-lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson"],
    }),

    getAllLesson: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/lesson/all-lesson",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Lesson"],
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useGetAllLessonQuery,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;
