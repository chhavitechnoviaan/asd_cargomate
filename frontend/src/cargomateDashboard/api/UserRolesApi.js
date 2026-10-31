import API from "./axios";

export const getDashboard = async () => {
    return API.get("/users-roles/dashboard");
};

export const getUsers = async (params) => {
    return API.get("/users-roles/users", {params} );
};

export const searchUsers = async (keyword) => {
    return API.get("/users-roles/search", {params: { keyword }});
};

export const inviteUser = async (data) => {
    return API.post("/users-roles/invite", data);
};

export const updateUser = async (id, data) => {
    return API.put(`/users-roles/${id}`, data);
}

export const changeStatus = async (id) => {
    return API.patch(`/users-roles/status/${id}`);
};

export const deleteUser = async (id) => {
    return API.delete(`/users-roles/${id}`);
};

export const getRoles = async () => {
    return API.get("/users-roles/roles");
};

export const getRoleDistribution = async () => {
    return API.get("/users-roles/role-distribution");
};

export const getActivity = async () => {
    return API.get("/users-roles/activity");
};

export const getFilterOptions = async () => {
    return API.get("/users-roles/filter-options");
};

