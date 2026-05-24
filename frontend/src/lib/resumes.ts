const API_BASE_URL = "http://127.0.0.1:8000/api";

export type Resume = {
  id: number;
  title: string;
  file: string;
  file_url: string;
  file_size: number;
  match_score: number;
  download_count: number;
  uploaded_at: string;
};

export type ResumeStats = {
  total_resumes: number;
  best_match_score: number;
  total_downloads: number;
};

export async function getResumes(token: string): Promise<Resume[]> {
  const response = await fetch(`${API_BASE_URL}/resumes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch resumes");
  }

  return response.json();
}

export async function getResumeStats(token: string): Promise<ResumeStats> {
  const response = await fetch(`${API_BASE_URL}/resumes/stats/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch resume stats");
  }

  return response.json();
}

export async function uploadResume(
  token: string,
  title: string,
  file: File,
): Promise<Resume> {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/resumes/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload resume");
  }

  return response.json();
}

export async function deleteResume(token: string, id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/resumes/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete resume");
  }
}

export async function renameResume(
  token: string,
  id: number,
  title: string,
): Promise<Resume> {
  const response = await fetch(`${API_BASE_URL}/resumes/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to rename resume");
  }

  return response.json();
}
