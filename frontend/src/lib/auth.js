const getApiBase = () => {
  const raw = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "");
  return raw.endsWith("/api") ? raw : `${raw}/api`;
};

export const authApi = async (path, body, token) => {
  const base = getApiBase();
  const cleanPath = String(path || "").replace(/^\//, "");
  const response = await fetch(`${base}/auth/${cleanPath}`, {
    method: body ? "POST" : "GET",
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw Error(data.msg || data.error || data.message || `Request failed (${response.status})`);
  }
  return data;
};

export const getSession = () => {
  try {
    return JSON.parse(sessionStorage.getItem("cargomate-session"));
  } catch {
    return null;
  }
};

export const saveSession = (token, role) => {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  sessionStorage.setItem("cargomate-session", JSON.stringify({ token, role }));
};

export const clearSession = () => {
  sessionStorage.removeItem("cargomate-session");
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
};
