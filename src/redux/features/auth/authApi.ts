import { TQueryParam } from "@/types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (userInfo) => ({
        url: `/users/update-user/${userInfo?._id}`,
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users/all-user",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["User"],
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
} = authApi;
