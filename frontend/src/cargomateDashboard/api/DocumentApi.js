import API from "./axios";

//
// Document Dashboard APIs
//

export const getDocumentDashboard = (params) => {
  return API.get("/document-dashboard/dashboard", { params });
};

export const getDashboardDocuments = (params) => {
  return API.get("/document-dashboard/documents", { params });
};

export const getDocumentsByType = (params) => {
  return API.get("/document-dashboard/documents-by-type", { params });
};

export const getDocumentStatusOverview = (params) => {
  return API.get("/document-dashboard/status-overview", { params });
};

export const getDocumentInsights = (params) => {
  return API.get("/document-dashboard/insights", { params });
};

export const getDashboardExpiringDocuments = (params) => {
  return API.get("/document-dashboard/expiring", { params });
};

export const getDashboardRecentUploads = (params) => {
  return API.get("/document-dashboard/recent-uploads", { params });
};

export const getDocumentFilterOptions = (params) => {
  return API.get("/document-dashboard/filters", { params });
};

//
// Document APIs
//

export const getDocuments = (params) => {
  return API.get("/documents", { params });
};

export const getDocumentsDashboard = (params) => {
  return API.get("/documents/dashboard", { params });
};

export const getRecentUploads = (params) => {
  return API.get("/documents/recent", { params });
};

export const getStorage = (params) => {
  return API.get("/documents/storage", { params });
};

export const getExpiringDocuments = (params) => {
  return API.get("/documents/expiring", { params });
};

export const uploadDocument = (formData) => {
  return API.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadDocument = (id) => {
  return API.get(`/documents/${id}/download`, {
    responseType: "blob",
  });
};

export const deleteDocument = (id) => {
  return API.delete(`/documents/${id}`);
};