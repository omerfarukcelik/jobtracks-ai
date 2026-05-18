const API_BASE_URL = "http://127.0.1:8000/api";

export type Application = {
  id: number;
  company: string;
  title: string;
  status: "PENDING" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECT";
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
