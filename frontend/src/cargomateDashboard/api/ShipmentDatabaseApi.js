import API from "./axios";

export const getDashboard = async () => {
    return API.get("/shipment-database/dashboard");
};

export const getShipments = async () => {
    return API.get("/shipment-database/shipments");
};

export const getFilterOptions = async () => {
    return API.get("/shipment-database/filters");
};

export const exportReport = async () => {
    return API.get("/shipment-database/export-report");
};