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

export const { useLoginMutation, useSignupMutation } = authApi;
