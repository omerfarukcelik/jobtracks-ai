import type { JobApplication } from "@/lib/mock-data";

const MONTHS = [
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

export function getApplicationTrends(applications: JobApplication[]) {
  const monthlyData = MONTHS.map((month) => ({
    month,
    applications: 0,
    shortlisted: 0,
  }));

  applications.forEach((application) => {
    const date = new Date(application.dateApplied);
    if (Number.isNaN(date.getTime())) return;

    const monthIndex = date.getMonth();

    monthlyData[monthIndex].applications += 1;

    if (application.status === "shortlisted") {
      monthlyData[monthIndex].shortlisted += 1;
    }
  });

  return monthlyData;
}
