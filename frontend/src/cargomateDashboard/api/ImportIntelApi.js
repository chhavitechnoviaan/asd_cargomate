import API from "./axios";

export const getDashboard = async () => {
    return API.get("/b2b/import/dashboard");
};

export const getFilterOptions = async () => {
    return API.get("/b2b/import/filters");
}

export const getImportTrend = async () => {
    return API.get("/b2b/import/import-trend");
};

export const getCountryDistribution = async () => {
    return API.get("/b2b/import/country-distribution");
};

export const getTopProducts = async () => {
    return API.get("/b2b/import/top-products");
};

export const getTopSuppliers = async () => {
    return API.get("/b2b/import/top-suppliers");
};

export const getTopImporters = async () => {
    return API.get("/b2b/import/top-importers");
};

export const getPortWiseImports = async () => {
    return API.get("/b2b/import/port-wise-imports");
};

export const getRecentShipments = async () => {
    return API.get("/b2b/import/recent-shipments");
};