import API from "./axios";

export const getDashboard = async () => {
    return API.get("/supplier-discovery/dashboard");
};

export const getTopCountries = async () => {
    return API.get("/supplier-discovery/top-countries");
};

export const getSupplierTypes = async () => {
    return API.get("/supplier-discovery/supplier-types");
};

export const getQualityDistribution = async () => {
    return API.get("/supplier-discovery/quality-distribution");
};

export const getTopCertifications = async () => {
    return API.get("/supplier-discovery/top-certifications");
};

export const getTopSuppliers = async () => {
    return API.get("/supplier-discovery/top-suppliers");
};

export const getSupplierSpotlight = async (id) => {
    return API.get(`/supplier-discovery/supplier-spotlight/${id}`);
};

export const getRecentShipments = async () => {
    return API.get("/supplier-discovery/recent-shipments");
};

export const getFilterOptions = async () => {
    return API.get("/supplier-discovery/filters");
};