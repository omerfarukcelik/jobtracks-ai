import type { JobApplication } from "@/lib/mock-data";

export function getDashboardStats(applications: JobApplication[]) {
  return {
    totalApplications: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    shortlisted: applications.filter((app) => app.status === "shortlisted")
      .length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    interviews: applications.filter((app) => app.status === "interviewed")
      .length,
  };
}
