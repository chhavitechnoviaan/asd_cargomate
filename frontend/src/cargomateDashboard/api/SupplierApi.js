import API from "./axios";

// SupplierDashboard API functions
export const getSuppliers = (params = {}) => {
  return API.get("/supplier-dashboard/suppliers", { params });
};

export const getSuppliersByCountry = () => {
    return API.get("/supplier-dashboard/countries");
};

export const getTopSuppliers = () => {
    return API.get("/supplier-dashboard/top-suppliers");
};

export const getSupplierPerformance = () => {
    return API.get("/supplier-dashboard/performance");
}

export const getVerificationStatus = () => {
    return API.get("/supplier-dashboard/verification-status");
}

export const getNewSuppliers = () => {
    return API.get("/supplier-dashboard/new-suppliers");
}

export const getSupplierInsights = () => {
    return API.get("/supplier-dashboard/insights");
}

export const getFilterOptions = () => {
    return API.get("/supplier-dashboard/filters");
}
