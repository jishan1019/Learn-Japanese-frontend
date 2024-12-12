"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import Loader from "@/components/loader";

import { useGetDashInfoQuery } from "@/redux/features/dashboard/dashboardApi";

export default function Dashboard() {
  const { data, isLoading, error } = useGetDashInfoQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  const dashboardInfo = data?.data || {
    totalUser: 0,
    totalLesson: 0,
    totalVocabulary: 0,
    totalTutorial: 0,
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight my-10">Dashboard</h2>
        </div>
        <StatsCards {...dashboardInfo} />
      </div>
    </div>
  );
}
