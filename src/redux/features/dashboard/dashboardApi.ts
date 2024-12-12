import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashInfo: builder.query({
      query: () => {
        return {
          url: "/dashboard/all-dashboard-info",
          method: "GET",
        };
      },
      providesTags: ["User", "Tutorial", "Lesson", "Vocabulary", "Dashboard"],
    }),
  }),
});

export const { useGetDashInfoQuery } = dashboardApi;
