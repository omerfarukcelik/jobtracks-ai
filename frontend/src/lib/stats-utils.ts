import type { Application } from "@/lib/applications";

export function getDashboardStats(applications: Application[]) {
  return {
    totalApplications: applications.length,

    pending: applications.filter((app) => app.status === "PENDING").length,

    applied: applications.filter((app) => app.status === "APPLIED").length,

    interviews: applications.filter((app) => app.status === "INTERVIEW").length,

    offers: applications.filter((app) => app.status === "OFFER").length,

    rejected: applications.filter((app) => app.status === "REJECTED").length,
  };
}
