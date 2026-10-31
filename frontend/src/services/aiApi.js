const API_BASE_URL = (import.meta.env.VITE_AI_API_BASE_URL || "https://ai-service-nb69.onrender.com/api/api").replace(/\/$/, "");

function getAuthHeaders() {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "POST", body, signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}), ...getAuthHeaders() },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal,
  });
  const text = await response.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!response.ok) {
    const message = data?.detail || data?.message || data?.error || `Request failed (${response.status})`;
    const error = new Error(typeof message === "string" ? message : JSON.stringify(message));
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const aiApi = {
  baseUrl: VITE_AI_API_BASE_URL,
  chat: (payload, options) => request("/chat", { ...options, body: payload }),
  lookup: (payload, options) => request("/lookup", { ...options, body: payload }),
  estimateIncentive: (payload, options) => request("/incentive/estimate", { ...options, body: payload }),
  estimateMeis: (payload, options) => request("/incentive/meis", { ...options, body: payload }),
};

export function extractText(data) {
  if (typeof data === "string") return data;
  return data?.answer || data?.response || data?.reply || data?.message || data?.result?.answer || data?.result?.response || data?.data?.answer || data?.data?.response || "";
}
