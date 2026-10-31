import axios from "../api/axios";
// import API from "../api/axios";

export const createShipment = (data) =>
  axios.post("/shipments/step1", data);

export const updateShipmentStep2 = (id, data) =>
  axios.put(`/shipments/step2/${id}`, data);

export const updateShipmentStep3 = (id, data) =>
  axios.put(`/shipments/step3/${id}`, data);

export const saveDraft = (id) =>
  axios.patch(`/shipments/${id}/save-draft`);

export const analyzeShipment = (id) =>
  axios.post(`/shipments/${id}/analyze`);

export const submitShipment = (id) =>
  axios.post(`/shipments/${id}/submit`);

export const getMyShipments = () =>
  axios.get("/shipments");

export const getShipmentDetails = (id) =>
  axios.get(`/shipments/${id}/details`);

export const getShipmentTracking = (id) =>
  axios.get(`/shipments/${id}/tracking`);

  export const uploadShipmentDocument = (formData) => {
    return axios.post(
      "/shipments/upload-docs",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  

export const getShipments = (params = {}) => {
  return API.get("/shipments", { params });
};

export const getShipmentStats = () => {
  return API.get("/shipments/stats");
};



export const saveShipmentStep1 = (data) => {
  return API.post("/shipments/step1", data);
};

export const saveShipmentStep2 = (id, data) => {
  return API.put(`/shipments/step2/${id}`, data);
};

export const saveShipmentStep3 = (id, data) => {
  return API.put(`/shipments/step3/${id}`, data);
};

export const uploadShipmentDocuments = (formData) => {
  return API.post("/shipments/upload-docs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateShipmentStatus = (id, data) => {
  return API.patch(`/shipments/${id}/status`, data);
};

export const saveShipmentDraft = (id, data) => {
  return API.patch(`/shipments/${id}/save-draft`, data);
};


export const approveShipment = (id, data = {}) => {
  return API.post(`/shipments/${id}/approve`, data);
};

export const rejectShipment = (id, data) => {
  return API.post(`/shipments/${id}/reject`, data);
};

export const holdShipment = (id, data) => {
  return API.post(`/shipments/${id}/hold`, data);
};

export const getAllShipmentsForAdmin = () => {
  return API.get("/shipments/admin/all");
};

export const assignCarrier = (id, data) => {
  return API.post(`/shipments/${id}/assign-carrier`, data);
};

export const addTrackingUpdate = (id, data) => {
  return API.post(`/shipments/${id}/tracking`, data);
};
  
  export const getHSCodes = () => axios.get("/hs");