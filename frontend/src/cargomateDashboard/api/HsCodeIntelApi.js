import API from "./axios";

export const getDashboard = async () => {
    return API.get("/hscode-intelligence/dashboard");
};

export const getHSCodeList = async () => {
    return API.get("/hscode-intelligence/hscode-list");
};

export const getHSCodeDetails = async () => {
    return API.get("/hscode-intelligence/hscode-details");
};

export const getTradeFlow = async () => {
    return API.get("/hscode-intelligence/trade-flow");
};

export const getTrends = async() => {
    return API.get("/hscode-intelligence/trends");
};

export const getCountries = async () => {
    return API.get("/hscode-intelligence/countries");
};

export const getTopProducts = async () => {
    return API.get("/hscode-intelligence/top-products");
};

export const getImporters = async () => {
    return API.get("/hscode-intelligence/importers");
};

export const getExporters = async () => {
    return API.get("/hscode-intelligence/exporters");
};

export const getFilterOptions = async () => {
    return API.get("/hscode-intelligence/filters");
};