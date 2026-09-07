const API_BASE_URL = "http://127.0.1:8000/api";

export type ApplicationStatus =
  | "PENDING"
  | "APPLIED"
  | "INTERVIEW"
  | "REJECTED"
  | "OFFER";

export type Application = {
  id: number;
  company: string;
  title: string;
  job_url: string;
  status: ApplicationStatus;
  location: string;
  salary_range: string;
  applied_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export async function getApplications(token: string): Promise<Application[]> {
  const response = await fetch(`${API_BASE_URL}/applications/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  return response.json();
}

export async function createApplication(
  token: string,
  applicationData: Omit<Application, "id" | "created_at" | "updated_at">,
) {
  const response = await fetch(`${API_BASE_URL}/applications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(applicationData),
  });

  if (!response.ok) {
    throw new Error("Failed to create application");
  }

  return response.json();
}

export async function updateApplicationStatus(
  token: string,
  id: number,
  status: ApplicationStatus,
): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/applications/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update application status");
  }

  return response.json();
}

export async function updateApplication(
  token: string,
  id: number,
  applicationData: Partial<
    Omit<Application, "id" | "created_at" | "updated_at">
  >,
): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/applications/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(applicationData),
  });

  if (!response.ok) {
    throw new Error("Failed to update application");
  }

  return response.json();
}

export async function deleteApplication(
  token: string,
  id: number,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/applications/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete application");
  }
}
