export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}
