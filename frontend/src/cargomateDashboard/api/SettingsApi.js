import API from "./axios";

export const getSettings = async () => {
    return API.get("/settings/");
};

export const updateGeneral = async (data) => {
    return API.put("/settings/general", data);
};

export const updatePreferences = async (data) => {
    return API.put("/settings/preferences", data);
};

export const updateNotifications = async (data) => {
    return API.put("/settings/notifications", data);
};

export const updateSecurity = async (data) => {
    return API.put("/settings/security", data);
};

export const updateBilling = async (data) => {
    return API.put("/settings/billing", data);
};


export const updateTheme = async (data) => {
    return API.put("/settings/theme", data);
};

export const changePassword = async (data) => {
    return API.put("/settings/change-password", data);
}

export const getActivity = async () => {
    return API.get("/settings/activity");
};

export const getAccountSummary = async () => {
    return API.get("/settings/account-summary");
};
