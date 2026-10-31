import API from "./axios";

export const createQuotation = (data) => {
  return API.post("/quotations", data);
};

export const getQuotationByShipment = (shipmentId) => {
  return API.get(`/quotations/shipment/${shipmentId}`);
};

export const getQuotationById = (id) => {
  return API.get(`/quotations/${id}`);
};

export const shareQuotation = (quotationId) => {
    return API.put(
      `/quotations/${quotationId}/share`
    );
  };

export const acceptQuotation = (id) => {
  return API.put(`/quotations/${id}/accept`);
};

export const rejectQuotation = (id, rejectionReason) => {
  return API.put(`/quotations/${id}/reject`, {
    rejectionReason,
  });
};