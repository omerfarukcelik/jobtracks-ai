import type { Application } from "@/lib/applications";

export function getApplicationTrends(applications: Application[]) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month, index) => {
    const monthlyApplications = applications.filter((app) => {
      const appliedDate = new Date(app.applied_at);
      return appliedDate.getMonth() === index;
    });

    return {
      month,
      applications: monthlyApplications.length,
      interviews: monthlyApplications.filter(
        (app) => app.status === "INTERVIEW",
      ).length,
    };
  });
}
