import { Users, BookOpen, BookText, Video } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  totalUser: number;
  totalLesson: number;
  totalVocabulary: number;
  totalTutorial: number;
}

export function StatsCards({
  totalUser,
  totalLesson,
  totalVocabulary,
  totalTutorial,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Total Users",
      value: totalUser,
      icon: Users,
      className: "bg-pink-500/10",
      iconClassName: "text-pink-500",
    },
    {
      title: "Total Lessons",
      value: totalLesson,
      icon: BookOpen,
      className: "bg-purple-500/10",
      iconClassName: "text-purple-500",
    },
    {
      title: "Total Vocabulary",
      value: totalVocabulary,
      icon: BookText,
      className: "bg-orange-500/10",
      iconClassName: "text-orange-500",
    },
    {
      title: "Total Tutorials",
      value: totalTutorial,
      icon: Video,
      className: "bg-blue-500/10",
      iconClassName: "text-blue-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats?.map((stat) => {
        const Icon = stat?.icon;
        return (
          <Card key={stat?.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat?.title}
              </CardTitle>
              <div className={`rounded-full p-2.5 ${stat?.className}`}>
                <Icon className={`h-4 w-4 ${stat.iconClassName}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat?.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
