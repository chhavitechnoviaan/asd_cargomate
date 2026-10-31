import { getSession } from "../../lib/auth";




// // // import axios from "axios";

// // // const baseURL = (
// // //   import.meta.env.VITE_AI_API_BASE_URL ||
// // //   import.meta.env.VITE_CARGOMATE_API_URL ||
// // //   "https://ai-service-nb69.onrender.com/api/api"
// // // ).replace(/\/+$/, "");

// // // const CargoMateAPI = axios.create({
// // //   baseURL,
// // //   timeout: 45000,
// // //   headers: {
// // //     Accept: "application/json",
// // //     "Content-Type": "application/json",
// // //   },
// // // });

// // // CargoMateAPI.interceptors.request.use((config) => {
// // //   const token =
// // //     localStorage.getItem("token") ||
// // //     localStorage.getItem("accessToken");

// // //   if (token) {
// // //     config.headers.Authorization = `Bearer ${token}`;
// // //   }

// // //   return config;
// // // });

// // // export const sendTradeChat = ({
// // //   message,
// // //   session_id,
// // //   user_role,
// // // } = {}) =>
// // //   CargoMateAPI.post("/chat", {
// // //     message,
// // //     session_id,
// // //     user_role,
// // //   });

// // // export const lookupHsCode = (payload = {}) => {
// // //   const params = {
// // //     product: payload.product ?? payload.product_description ?? "",
// // //     export_country:
// // //       payload.export_country ?? payload.country_of_export ?? "India",
// // //     import_country:
// // //       payload.import_country ??
// // //       payload.country_of_import ??
// // //       "United Arab Emirates",
// // //     quantity: Number(payload.quantity ?? 1),
// // //     unit: payload.unit ?? "KG",
// // //     shipment_type: payload.shipment_type ?? "general_export",
// // //     include_tariff: payload.include_tariff ?? true,
// // //   };

// // //   return CargoMateAPI.get("/lookup", { params });
// // // };

// // // export const estimateIncentives = (payload = {}) =>
// // //   CargoMateAPI.get("/incentive/estimate", payload);

// // // export const calculateMeis = (payload = {}) =>
// // //   CargoMateAPI.get("/incentive/meis", payload);

// // // export const getCommodityCountryTrend = (params = {}) =>
// // //   CargoMateAPI.get("/commodity-country-trend", { params });

// // // export const getAiApiBaseUrl = () => baseURL;

// // // export default CargoMateAPI;



// // import axios from "axios";

// // const baseURL = (
// //   import.meta.env.VITE_AI_API_BASE_URL ||
// //   import.meta.env.VITE_CARGOMATE_API_URL ||
// //   "https://ai-service-nb69.onrender.com/api/api"
// // ).replace(/\/+$/, "");

// // const CargoMateAPI = axios.create({
// //   baseURL,
// //   timeout: 45000,
// //   headers: {
// //     Accept: "application/json",
// //     "Content-Type": "application/json",
// //   },
// // });

// // CargoMateAPI.interceptors.request.use((config) => {
// //   const token =
// //     localStorage.getItem("token") ||
// //     localStorage.getItem("accessToken");

// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }

// //   return config;
// // });

// // export const sendTradeChat = ({
// //   message,
// //   session_id,
// //   user_role,
// // } = {}) =>
// //   CargoMateAPI.post("/chat", {
// //     message,
// //     session_id,
// //     user_role,
// //   });

// // export const lookupHsCode = (payload = {}) =>
// //   CargoMateAPI.get("/lookup", {
// //     params: {
// //       product: payload.product ?? payload.product_description ?? "",
// //       export_country:
// //         payload.export_country ?? payload.country_of_export ?? "India",
// //       import_country:
// //         payload.import_country ??
// //         payload.country_of_import ??
// //         "United Arab Emirates",
// //       quantity: Number(payload.quantity ?? 1),
// //       unit: payload.unit ?? "KG",
// //       shipment_type: payload.shipment_type ?? "general_export",
// //       include_tariff: payload.include_tariff ?? true,
// //     },
// //   });


// // export const estimateIncentives = (payload = {}) =>
// //   CargoMateAPI.get("/incentives/estimate", {
// //     params: {
// //       hs_code: payload.hs_code,
// //       fob_value: Number(payload.fob_value),
// //       quantity: Number(payload.quantity),
// //       meis_rate_pct: Number(payload.meis_rate_pct),
// //     },
// //   });

// // export const calculateMeis = (payload = {}) =>
// //   CargoMateAPI.get("/incentives/meis", {
// //     params: {
// //       hs_code: payload.hs_code,
// //       fob_value: Number(payload.fob_value),
// //       quantity: Number(payload.quantity),
// //       meis_rate_pct: Number(payload.meis_rate_pct),
// //     },
// //   });

// // export const getCommodityCountryTrend = (params = {}) =>
// //   CargoMateAPI.get("/tradestat/commodity-country-trend", { params });

// // export const getAiApiBaseUrl = () => baseURL;

// // export default CargoMateAPI;


// import axios from "axios";

// const baseURL = (
//   import.meta.env.VITE_AI_API_BASE_URL ||
//   import.meta.env.VITE_CARGOMATE_API_URL ||
//   "https://ai-service-nb69.onrender.com/api/api"
// ).replace(/\/+$/, "");

// const CargoMateAPI = axios.create({
//   baseURL,
//   timeout: 45000,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// CargoMateAPI.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("token") ||
//       localStorage.getItem("accessToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export const sendTradeChat = ({
//   message,
//   session_id,
//   user_role,
// } = {}) =>
//   CargoMateAPI.post("/chat", {
//     message,
//     session_id,
//     user_role,
//   });

// export const lookupHsCode = (payload = {}) =>
//   CargoMateAPI.get("/lookup", {
//     params: {
//       product: payload.product ?? payload.product_description ?? "",
//       export_country:
//         payload.export_country ?? payload.country_of_export ?? "India",
//       import_country:
//         payload.import_country ??
//         payload.country_of_import ??
//         "United Arab Emirates",
//       quantity: Number(payload.quantity ?? 1),
//       unit: payload.unit ?? "KG",
//       shipment_type: payload.shipment_type ?? "general_export",
//       include_tariff: payload.include_tariff ?? true,
//     },
//   });

// export const estimateIncentives = (payload = {}) =>
//   CargoMateAPI.get("/incentives/estimate", {
//     params: {
//       hs_code: payload.hs_code,
//       fob_value: Number(payload.fob_value),
//       quantity: Number(payload.quantity),
//       meis_rate_pct: Number(payload.meis_rate_pct),
//     },
//   });

// export const calculateMeis = (payload = {}) =>
//   CargoMateAPI.get("/incentives/meis", {
//     params: {
//       hs_code: payload.hs_code,
//       fob_value: Number(payload.fob_value),
//       quantity: Number(payload.quantity),
//       meis_rate_pct: Number(payload.meis_rate_pct),
//     },
//   });

// // Existing trade trend API
// export const getCommodityCountryTrend = (params = {}) =>
//   CargoMateAPI.get("/tradestat/commodity-country-trend", {
//     params: {
//       ...params,
//       values_in: params.values_in ?? "₹ Crore",
//     },
//   });

// // Import Intelligence API
// export const getImportIntelligence = (payload = {}) =>
//   CargoMateAPI.get("/import-intelligence", {
//     params: {
//       hs_code: payload.hs_code,
//       year: payload.year,
//       top_n: Number(payload.top_n ?? 10),
//       include_trend: payload.include_trend ?? true,
//       values_in: payload.values_in ?? "₹ Crore",
//     },
//   });

// // Export Intelligence API
// export const getExportIntelligence = (payload = {}) =>
//   CargoMateAPI.get("/export-intelligence", {
//     params: {
//       hs_code: payload.hs_code,
//       year: payload.year,
//       top_n: Number(payload.top_n ?? 10),
//       include_trend: payload.include_trend ?? true,
//       values_in: payload.values_in ?? "₹ Crore",
//     },
//   });

// // Commodity trade API
// export const getCommodityTrade = (payload = {}) =>
//   CargoMateAPI.get("/tradestat/commodity-trade", {
//     params: {
//       ...payload,
//       values_in: payload.values_in ?? "₹ Crore",
//     },
//   });

//   // Freight Estimate API
// export const calculateFreight = (payload = {}) => {
//   const requestBody = {
//     origin: String(payload.origin ?? "").trim(),
//     destination: String(payload.destination ?? "").trim(),
//     weight_kg: Number(payload.weight_kg),
//     volume_cbm: Number(payload.volume_cbm),
//     product: String(payload.product ?? payload.commodity ?? "").trim(),
//     incoterm: String(payload.incoterm ?? "FOB").trim().toUpperCase(),
//     currency: String(payload.currency ?? "INR").trim().toUpperCase(),
//   };

//   return CargoMateAPI.post("/freight/estimate", requestBody);
// };
// export const getAiApiBaseUrl = () => baseURL;

// export default CargoMateAPI;



import axios from "axios";

// Existing CargoMate API
const baseURL = (
  import.meta.env.VITE_AI_API_BASE_URL ||
  import.meta.env.VITE_CARGOMATE_API_URL ||
  "https://ai-service-nb69.onrender.com/api"
).replace(/\/+$/, "");

const CargoMateAPI = axios.create({
  baseURL,
  timeout: 45000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Separate Risk API base URL so existing APIs remain unaffected
const riskBaseURL = (
  import.meta.env.VITE_RISK_API_BASE_URL ||
  "https://ai-service-nb69.onrender.com/api"
).replace(/\/+$/, "");

export const RiskAssessmentAPI = axios.create({
  baseURL: riskBaseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Authentication for both API clients
const addAuthInterceptor = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token =
        getSession()?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

addAuthInterceptor(CargoMateAPI);
addAuthInterceptor(RiskAssessmentAPI);

// ========================================
// EXISTING CARGOMATE APIs
// ========================================

export const sendTradeChat = ({
  message,
  session_id,
  user_role,
} = {}) =>
  CargoMateAPI.post("/chat", {
    message,
    session_id,
    user_role,
  });

export const lookupHsCode = (payload = {}) =>
  CargoMateAPI.get("/lookup", {
    params: {
      product: payload.product ?? payload.product_description ?? "",
      export_country:
        payload.export_country ?? payload.country_of_export ?? "India",
      import_country:
        payload.import_country ??
        payload.country_of_import ??
        "United Arab Emirates",
      quantity: Number(payload.quantity ?? 1),
      unit: payload.unit ?? "KG",
      shipment_type: payload.shipment_type ?? "general_export",
      include_tariff: payload.include_tariff ?? true,
    },
  });

export const estimateIncentives = (payload = {}) =>
  CargoMateAPI.get("/incentives/estimate", {
    params: {
      hs_code: payload.hs_code,
      fob_value: Number(payload.fob_value),
      quantity: Number(payload.quantity),
      meis_rate_pct: Number(payload.meis_rate_pct),
    },
  });

export const calculateMeis = (payload = {}) =>
  CargoMateAPI.get("/incentives/meis", {
    params: {
      hs_code: payload.hs_code,
      fob_value: Number(payload.fob_value),
      quantity: Number(payload.quantity),
      meis_rate_pct: Number(payload.meis_rate_pct),
    },
  });

export const getCommodityCountryTrend = (params = {}) =>
  CargoMateAPI.get("/tradestat/commodity-country-trend", {
    params: {
      ...params,
      values_in: params.values_in ?? "₹ Crore",
    },
  });

export const getImportIntelligence = (payload = {}) =>
  CargoMateAPI.get("/import-intelligence", {
    params: {
      hs_code: payload.hs_code,
      year: payload.year,
      top_n: Number(payload.top_n ?? 10),
      include_trend: payload.include_trend ?? true,
      values_in: payload.values_in ?? "₹ Crore",
    },
  });

export const getExportIntelligence = (payload = {}) =>
  CargoMateAPI.get("/export-intelligence", {
    params: {
      hs_code: payload.hs_code,
      year: payload.year,
      top_n: Number(payload.top_n ?? 10),
      include_trend: payload.include_trend ?? true,
      values_in: payload.values_in ?? "₹ Crore",
    },
  });

export const getCommodityTrade = (payload = {}) =>
  CargoMateAPI.get("/tradestat/commodity-trade", {
    params: {
      ...payload,
      values_in: payload.values_in ?? "₹ Crore",
    },
  });

export const calculateFreight = (payload = {}) => {
  const requestBody = {
    origin: String(payload.origin ?? "").trim(),
    destination: String(payload.destination ?? "").trim(),
    weight_kg: Number(payload.weight_kg),
    volume_cbm: Number(payload.volume_cbm),
    product: String(
      payload.product ?? payload.commodity ?? ""
    ).trim(),
    incoterm: String(payload.incoterm ?? "FOB")
      .trim()
      .toUpperCase(),
    currency: String(payload.currency ?? "INR")
      .trim()
      .toUpperCase(),
  };

  return CargoMateAPI.post("/freight/estimate", requestBody);
};

// ========================================
// RISK ASSESSMENT API
// ========================================

// 1. GET /risk/assess
// record defaults to true
export const assessRisk = (payload = {}) =>
  RiskAssessmentAPI.get("/risk/assess", {
    params: {
      hs_code: String(payload.hs_code ?? "").trim(),
      country: String(payload.country ?? "").trim(),
      commodity: String(
        payload.commodity ?? payload.product ?? ""
      ).trim(),
      trade_type: payload.trade_type ?? "export",
      countries: Array.isArray(payload.countries)
        ? payload.countries.join(",")
        : String(payload.countries ?? "").trim(),
      record: payload.record ?? true,
    },
  });

// 2. GET /risk/history
// Uses the same HS code and primary country submitted in the form.
// Maximum requested history records: 100.
export const getRiskHistory = (payload = {}) =>
  RiskAssessmentAPI.get("/risk/history", {
    params: {
      hs_code: String(payload.hs_code ?? "").trim() || undefined,
      country: String(payload.country ?? "").trim() || undefined,
      limit: Math.min(
        100,
        Math.max(1, Number(payload.limit) || 100)
      ),
    },
  });

  // HS Code Intelligence API
// ========================================
// HS CODE INTELLIGENCE API
// GET /hs-code-intelligence
// ========================================

export const getHsCodeIntelligence = (payload = {}) => {
  return CargoMateAPI.get("/hs-code-intelligence", {
    params: {
      hs_code: String(payload.hs_code ?? "").trim(),
      flow: payload.flow ?? "both",
      year: payload.year ?? "2025-2026",
      values_in: "crore",
      top_n: 50,
      include_trend: true,
    },
  });
};


// 3. GET /risk/top-hs-codes
// Request maximum 50 records.
export const getTopRiskHSCodes = () =>
  RiskAssessmentAPI.get("/risk/top-hs-codes", {
    params: {
      limit: 50,
    },
  });

// Base URL helpers
export const getAiApiBaseUrl = () => baseURL;
export const getRiskApiBaseUrl = () => riskBaseURL;

export default CargoMateAPI;
