import { useState,  useMemo} from "react";
import { FaDatabase, FaPlus, FaPen } from "react-icons/fa6";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import API from "../../api/axios"; 
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  
  Columns,
   List,   LayoutGrid,  ChevronLeft,
  ChevronRight,Search,SlidersHorizontal,  MoreVertical,
  TrendingUp,  X, Check  , Trash2 , Plus, RotateCcw,
} from "lucide-react";
const countryCodes = {
  India: "IN",
  China: "CN",
  Germany: "DE",
  USA: "US",
  "United States": "US",
  UAE: "AE",
  "Saudi Arabia": "SA",
  Switzerland: "CH",
  Bangladesh: "BD",
  Brazil: "BR",
  Russia: "RU",
  Japan: "JP",
  France: "FR",
  Singapore: "SG",
  Australia: "AU",
};

const columnOptions = [
  { key: "hsCode", label: "HS Code" },
  { key: "description", label: "Product Description" },
  { key: "importer", label: "Importer" },
  { key: "exporter", label: "Exporter" },
  { key: "origin", label: "Origin" },
  { key: "dest", label: "Dest" },
  { key: "portLoading", label: "Port of Loading" },
  { key: "portDischarge", label: "Port of Discharge" },
  { key: "shipDate", label: "Ship Date" },
  { key: "arrDate", label: "Arr. Date" },
  { key: "value", label: "Value (INR)" },
  { key: "status", label: "Status" },
];

const initialCategories = [
  { id: 1, name: "Product Categories", subtitle: "Supported product categories", items: Array.from({ length: 45 }, (_, i) => ({ id: i + 1, code: `PRO-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 2, name: "Shipment Types", subtitle: "Supported shipment types", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Ship-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 3, name: "Container Types", subtitle: "Supported container types", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Con-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 4, name: "Payment Types", subtitle: "Supported payment types", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Pay-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 5, name: "Incoterms Types", subtitle: "Supported incoterms types", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Inc-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 6, name: "Currency Codes", subtitle: "Supported currency codes", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Cur-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
];

const ITEMS_PER_PAGE = 9;

function AddCategoryModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Category name is required";
    if (!subtitle.trim()) e.subtitle = "Subtitle is required";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ name: name.trim(), subtitle: subtitle.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Add Category</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Category Name</label>
            <input
              type="text"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.name ? "border-red-400" : "border-gray-200"}`}
              placeholder="Enter category name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Subtitle</label>
            <input
              type="text"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.subtitle ? "border-red-400" : "border-gray-200"}`}
              placeholder="Enter subtitle"
              value={subtitle}
              onChange={(e) => { setSubtitle(e.target.value); setErrors((p) => ({ ...p, subtitle: "" })); }}
            />
            {errors.subtitle && <p className="text-xs text-red-500 mt-1">{errors.subtitle}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Cancel</button>
          <button onClick={handleAdd} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium transition-colors">Add Category</button>
        </div>
      </div>
    </div>
  );
}

function AddItemModal({ categoryName, prefix, onClose, onAdd }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!code.trim()) e.code = "Code is required";
    if (!name.trim()) e.name = "Name is required";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ code: code.trim(), name: name.trim(), status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Add Item — {categoryName}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Code</label>
            <input
              type="text"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.code ? "border-red-400" : "border-gray-200"}`}
              placeholder={`e.g. ${prefix}-001`}
              value={code}
              onChange={(e) => { setCode(e.target.value); setErrors((p) => ({ ...p, code: "" })); }}
            />
            {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Name</label>
            <input
              type="text"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.name ? "border-red-400" : "border-gray-200"}`}
              placeholder="Enter item name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Cancel</button>
          <button onClick={handleAdd} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium transition-colors">Add Item</button>
        </div>
      </div>
    </div>
  );
}

function EditItemModal({ item, onClose, onUpdate }) {
  const [name, setName] = useState(item.name);
  const [status, setStatus] = useState(item.status);

  const handleUpdate = () => {
    onUpdate({
      ...item,
      name,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <h3 className="text-base font-semibold mb-4">Edit Item</h3>

        <input
          className="w-full border p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 border py-2 rounded">
            Cancel
          </button>
          <button onClick={handleUpdate} className="flex-1 bg-teal-500 text-white py-2 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

const shipments = [
  {
    _id: "SHIP001",
    referenceNumber: "SHP-2026-001",
    sbNumber: "SB20260001",

    cargo: {
      hsCode: {
        hsCode: "84713010",
        description: "Laptop Computers",
      },
      description: "Dell Latitude Business Laptop",
      value: 24500000,
    },

    importer: {
      companyName: "TechNova India Pvt Ltd",
    },

    exporter: {
      companyName: "Dell Technologies USA",
    },

    route: {
      originCountry: "United States",
      destinationCountry: "India",
      originCity: "New York",
      destinationCity: "Mumbai",
    },

    shipmentDate: "2026-08-05",
    eta: "2026-08-20",
    shipmentStatus: "Delivered",
  },

  {
    _id: "SHIP002",
    referenceNumber: "SHP-2026-002",
    sbNumber: "SB20260002",

    cargo: {
      hsCode: {
        hsCode: "85171300",
        description: "Smartphones",
      },
      description: "Smartphone Devices",
      value: 18200000,
    },

    importer: {
      companyName: "Reliance Digital India",
    },

    exporter: {
      companyName: "Samsung Electronics",
    },

    route: {
      originCountry: "South Korea",
      destinationCountry: "India",
      originCity: "Busan",
      destinationCity: "Chennai",
    },

    shipmentDate: "2026-08-10",
    eta: "2026-08-27",
    shipmentStatus: "In Transit",
  },

  {
    _id: "SHIP003",
    referenceNumber: "SHP-2026-003",
    sbNumber: "SB20260003",

    cargo: {
      hsCode: {
        hsCode: "87032300",
        description: "Motor Cars",
      },
      description: "Passenger Motor Vehicles",
      value: 68500000,
    },

    importer: {
      companyName: "Tata Motors Limited",
    },

    exporter: {
      companyName: "Toyota Motor Corporation",
    },

    route: {
      originCountry: "Japan",
      destinationCountry: "India",
      originCity: "Yokohama",
      destinationCity: "Mumbai",
    },

    shipmentDate: "2026-07-28",
    eta: "2026-08-25",
    shipmentStatus: "In Transit",
  },

  {
    _id: "SHIP004",
    referenceNumber: "SHP-2026-004",
    sbNumber: "SB20260004",

    cargo: {
      hsCode: {
        hsCode: "85044090",
        description: "Electrical Transformers",
      },
      description: "Industrial Power Transformers",
      value: 32600000,
    },

    importer: {
      companyName: "Adani Power Limited",
    },

    exporter: {
      companyName: "Siemens Germany",
    },

    route: {
      originCountry: "Germany",
      destinationCountry: "India",
      originCity: "Hamburg",
      destinationCity: "Mundra",
    },

    shipmentDate: "2026-08-01",
    eta: "2026-08-18",
    shipmentStatus: "Delivered",
  },

  {
    _id: "SHIP005",
    referenceNumber: "SHP-2026-005",
    sbNumber: "SB20260005",

    cargo: {
      hsCode: {
        hsCode: "30049099",
        description: "Pharmaceutical Products",
      },
      description: "Medicines and Pharmaceutical Products",
      value: 12800000,
    },

    importer: {
      companyName: "Sun Pharma Industries",
    },

    exporter: {
      companyName: "Pfizer Inc.",
    },

    route: {
      originCountry: "United States",
      destinationCountry: "India",
      originCity: "Los Angeles",
      destinationCity: "Nhava Sheva",
    },

    shipmentDate: "2026-08-12",
    eta: "2026-08-30",
    shipmentStatus: "In Transit",
  },

  {
    _id: "SHIP006",
    referenceNumber: "SHP-2026-006",
    sbNumber: "SB20260006",

    cargo: {
      hsCode: {
        hsCode: "94036000",
        description: "Wooden Furniture",
      },
      description: "Premium Wooden Office Furniture",
      value: 7600000,
    },

    importer: {
      companyName: "Urban Living India",
    },

    exporter: {
      companyName: "IKEA Sweden",
    },

    route: {
      originCountry: "Sweden",
      destinationCountry: "India",
      originCity: "Gothenburg",
      destinationCity: "Chennai",
    },

    shipmentDate: "2026-08-08",
    eta: "2026-08-29",
    shipmentStatus: "Pending",
  },

  {
    _id: "SHIP007",
    referenceNumber: "SHP-2026-007",
    sbNumber: "SB20260007",

    cargo: {
      hsCode: {
        hsCode: "85423100",
        description: "Electronic Integrated Circuits",
      },
      description: "Microprocessors and Integrated Circuits",
      value: 41500000,
    },

    importer: {
      companyName: "Wipro Technologies",
    },

    exporter: {
      companyName: "Intel Corporation",
    },

    route: {
      originCountry: "United States",
      destinationCountry: "India",
      originCity: "San Francisco",
      destinationCity: "Mumbai",
    },

    shipmentDate: "2026-07-30",
    eta: "2026-08-22",
    shipmentStatus: "Delivered",
  },

  {
    _id: "SHIP008",
    referenceNumber: "SHP-2026-008",
    sbNumber: "SB20260008",

    cargo: {
      hsCode: {
        hsCode: "62034200",
        description: "Cotton Garments",
      },
      description: "Men's Cotton Apparel",
      value: 9400000,
    },

    importer: {
      companyName: "Reliance Retail",
    },

    exporter: {
      companyName: "H&M Sweden",
    },

    route: {
      originCountry: "Bangladesh",
      destinationCountry: "India",
      originCity: "Chittagong",
      destinationCity: "Kolkata",
    },

    shipmentDate: "2026-08-14",
    eta: "2026-09-02",
    shipmentStatus: "In Transit",
  },

  {
    _id: "SHIP009",
    referenceNumber: "SHP-2026-009",
    sbNumber: "SB20260009",

    cargo: {
      hsCode: {
        hsCode: "10063020",
        description: "Rice",
      },
      description: "Premium Basmati Rice",
      value: 5600000,
    },

    importer: {
      companyName: "Lulu Hypermarket",
    },

    exporter: {
      companyName: "Al Dahra Agriculture",
    },

    route: {
      originCountry: "United Arab Emirates",
      destinationCountry: "India",
      originCity: "Dubai",
      destinationCity: "Mundra",
    },

    shipmentDate: "2026-08-03",
    eta: "2026-08-19",
    shipmentStatus: "Delivered",
  },

  {
    _id: "SHIP010",
    referenceNumber: "SHP-2026-010",
    sbNumber: "SB20260010",

    cargo: {
      hsCode: {
        hsCode: "84148090",
        description: "Industrial Compressors",
      },
      description: "Heavy Duty Industrial Air Compressors",
      value: 27300000,
    },

    importer: {
      companyName: "Larsen & Toubro",
    },

    exporter: {
      companyName: "Atlas Copco Sweden",
    },

    route: {
      originCountry: "Sweden",
      destinationCountry: "India",
      originCity: "Stockholm",
      destinationCity: "Nhava Sheva",
    },

    shipmentDate: "2026-08-15",
    eta: "2026-09-05",
    shipmentStatus: "Pending",
  },
];
export default function MasterData() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [showCatModal, setShowCatModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [pages, setPages] = useState({});
  const [editItem, setEditItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
      const [selectedOrigin, setSelectedOrigin] = useState("All Countries");
        const [selectedDest, setSelectedDest] = useState("All Countries");
        const [selectedImporter, setSelectedImporter] = useState("All Importers");
        const [selectedExporter, setSelectedExporter] = useState("All Exporters");
        const [selectedPort, setSelectedPort] = useState("All Ports");
           const [shipmentStartDate, setShipmentStartDate] = useState(null);
            const [shipmentEndDate, setShipmentEndDate] = useState(null);
  const selected = categories.find((c) => c._id === selectedId);
   const [openMenu, setOpenMenu] = useState(null);

   const [showAddRowModal, setShowAddRowModal] = useState(false);

const [newShipment, setNewShipment] = useState({
  hsCode: "",
  description: "",
  importer: "",
  exporter: "",
  origin: "",
  dest: "",
  portLoading: "",
  portDischarge: "",
  shipDate: "",
  arrDate: "",
  value: "",
  status: "In Transit",
});

const handleShipmentChange = (field, value) => {
  setNewShipment((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const handleAddShipmentRow = () => {
  const newRow = {
    cargo: {
      hsCode: {
        hsCode: newShipment.hsCode,
      },
      description: newShipment.description,
      value: Number(newShipment.value),
    },

    importer: {
      companyName: newShipment.importer,
    },

    exporter: {
      companyName: newShipment.exporter,
    },

    route: {
      originCountry: newShipment.origin,
      destinationCountry: newShipment.dest,
      originCity: newShipment.portLoading,
      destinationCity: newShipment.portDischarge,
    },

    shipmentDate: newShipment.shipDate,
    eta: newShipment.arrDate,
    shipmentStatus: newShipment.status,
  };

  // Yaha apne original shipments state ka naam use karo
  setShipments((prev) => [...prev, newRow]);

  setNewShipment({
    hsCode: "",
    description: "",
    importer: "",
    exporter: "",
    origin: "",
    dest: "",
    portLoading: "",
    portDischarge: "",
    shipDate: "",
    arrDate: "",
    value: "",
    status: "In Transit",
  });

  setShowAddRowModal(false);
};

 const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchTerm,
      port: selectedPort,
      origin: selectedOrigin,
      exporter: selectedExporter,
      importer: selectedImporter,
    });
  };
 
  const currentPage = pages[selectedId] || 1;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  
  const pageItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const setPage = (p) => setPages((prev) => ({ ...prev, [selectedId]: p }));

  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

   const uniqueOrigins = useMemo(
      () => ["All Countries", ...new Set(shipments.map((s) => s.route?.originCountry).filter(Boolean))],
      [shipments],
    );
    const uniqueDests = useMemo(
      () => ["All Countries", ...new Set(shipments.map((s) => s.route?.destinationCountry).filter(Boolean))],
      [shipments],
    );
    const uniqueImporters = useMemo(
      () => [
        "All Importers",
        ...new Set(shipments.map((s) => s.importer?.companyName).filter(Boolean)),
      ],
      [shipments],
    );
    const uniqueExporters = useMemo(
      () => [
        "All Exporters",
        ...new Set(shipments.map((s) => s.exporter?.companyName).filter(Boolean)),
      ],
      [shipments],
    );
    const uniquePorts = useMemo(
      () => ["All Ports", ...new Set(shipments.map((s) => s.route?.originCity).filter(Boolean))],
      [],
    );
  
    // --- RESET FILTER FUNCTION ---
    const handleResetFilters = () => {
      setSearchTerm("");
      setSelectedOrigin("All Countries");
      setSelectedDest("All Countries");
      setSelectedImporter("All Importers");
      setSelectedExporter("All Exporters");
      setSelectedPort("All Ports");
    };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/master/categories");
      setCategories(res.data.data);
  
      if (res.data.data.length > 0) {
        setSelectedId(res.data.data[0]._id);
        fetchItems(res.data.data[0]._id);
      }
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const fetchItems = async (categoryId) => {
    try {
      const res = await API.get(`/master/items/${categoryId}`);
      setItems(res.data.data);
    } catch (err) {
      toast.error("Failed to load items");
    }
  };

  const handleCategoryClick = (id) => {
    setSelectedId(id);
    setShowRight(true);
    setPage(1);
  
    fetchItems(id); // 🔥 important
  };

  

  const handleAddCategory = async ({ name, subtitle }) => {
    try {
      const key = name.toLowerCase().replace(/\s+/g, "_");
      const prefix = name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase();
  
      const res = await API.post("/master/categories", {
        name,
        key,
        prefix,
      });
  
      toast.success("Category added");
  
      fetchCategories(); // refresh
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleAddItem = async ({ name }) => {
    try {
      await API.post("/master/items", {
        categoryId: selectedId,
        name,
      });
  
      toast.success("Item added");
      fetchItems(selectedId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await API.put(`/master/items/${updatedItem._id}`, {
        name: updatedItem.name,
        status: updatedItem.status,
      });
  
      toast.success("Item updated");
      fetchItems(selectedId);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const getPrefix = () => {
    return selected?.name.split(" ").map((w) => w[0]).join("").toUpperCase() || "ITM";
  };

   const filteredShipments = useMemo(() => {
   return shipments.filter((shipment) => {
     const matchesSearch =
       (shipment.cargo?.hsCode?.description || "")
         .toLowerCase()
         .includes(searchTerm.toLowerCase()) ||
       (shipment.cargo?.hsCode?.hsCode || "")
         .includes(searchTerm) ||
       (shipment.sbNumber || "")
         .toLowerCase()
         .includes(searchTerm.toLowerCase());
 
     const matchesOrigin =
       selectedOrigin === "All Countries" ||
       shipment.route?.originCountry === selectedOrigin;
 
     const matchesDest =
       selectedDest === "All Countries" ||
       shipment.route?.destinationCountry === selectedDest;
 
     const matchesImporter =
       selectedImporter === "All Importers" ||
       shipment.importer?.companyName === selectedImporter;
 
     const matchesExporter =
       selectedExporter === "All Exporters" ||
       shipment.exporter?.companyName === selectedExporter;
 
     const matchesPort =
       selectedPort === "All Ports" ||
       shipment.route?.originCity === selectedPort;
 
     return (
       matchesSearch &&
       matchesOrigin &&
       matchesDest &&
       matchesImporter &&
       matchesExporter &&
       matchesPort
     );
   });
 }, [
   shipments,
   searchTerm,
   selectedOrigin,
   selectedDest,
   selectedImporter,
   selectedExporter,
   selectedPort,
 ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 ">
       {editItem && (
        <EditItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onUpdate={handleUpdateItem}
        />
      )}

      {showCatModal && <AddCategoryModal onClose={() => setShowCatModal(false)} onAdd={handleAddCategory} />}
      {showItemModal && (
        <AddItemModal
          categoryName={selected?.name}
          prefix={getPrefix()}
          onClose={() => setShowItemModal(false)}
          onAdd={handleAddItem}
        />
      )}           

      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Master Data</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage categories, types, and dropdown data</p>
          </div>
          {/* <div className="flex items-start justify-around gap-2"> 
             <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap"> 
                Upload Excel
            </button>
            <button  onClick={() => setShowAddRowModal(true)} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap"> 
                New request 
            </button>
             <button
            onClick={() => setShowCatModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            <FaPlus className="text-xs" /> Add Category
          </button>
          </div> */}
         
        </div>

        {/* <div className="flex flex-col lg:flex-row gap-4">

          <div className={`w-full lg:w-64 xl:w-72 flex-shrink-0 ${showRight ? "hidden lg:block" : "block"}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Data Categories</h2>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => handleCategoryClick(cat._id)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${selectedId === cat._id ? "border-teal-400 bg-teal-50/60" : "border-transparent hover:bg-gray-50"}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <FaDatabase className="text-teal-500 text-sm" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${selectedId === cat._id ? "text-gray-900" : "text-gray-700"}`}>{cat.name}</p>
                      <p className="text-xs text-gray-400">{selectedId === cat._id ? items.length : ""} Items</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`flex-1 min-w-0 ${showRight ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">

              <div className="flex items-start justify-between mb-1 gap-2">
                <div className="flex items-center gap-2">
                  {showRight && (
                    <button onClick={() => setShowRight(false)} className="lg:hidden w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FaTimes />
                    </button>
                  )}
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800">{selected?.name}</h2>
                    <p className="text-xs text-gray-400">{selected?.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowItemModal(true)}
                  className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <FaPlus className="text-xs" /> Add Item
                </button>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full min-w-[380px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-xl">CODE</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">NAME</th>
                      <th className="text-center text-xs font-semibold text-gray-500 px-3 py-3">STATUS</th>
                      <th className="text-center text-xs font-semibold text-gray-500 px-3 py-3 rounded-r-xl">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center text-sm text-gray-400 py-10">No items yet. Click "+ Add Item" to add.</td>
                      </tr>
                    ) : (
                      pageItems.map((item, i) => (
                        <tr key={item._id} className={`border-t border-gray-100 ${i % 2 === 0 ? "" : ""}`}>
                          <td className="text-sm text-gray-700 px-3 py-3">{item.code}</td>
                          <td className="text-sm text-gray-700 px-3 py-3">{item.name}</td>
                          <td className="text-center px-3 py-3">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="text-center px-3 py-3">
                          <button
              onClick={() => setEditItem(item)}
              className="text-teal-500 hover:text-teal-600 text-sm font-medium flex items-center gap-1 mx-auto"
            >
              <FaPen className="text-xs" /> Edit
            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 0 && (
                <div className="flex items-center justify-end gap-2 mt-4 flex-wrap">
                  <button
                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    Preview
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${currentPage === p ? "bg-teal-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}

            </div>
          </div>

        </div> */}
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm my-6 w-full ">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 items-end w-full">
          {/* Input Search Box */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              HS Code / Product / ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-3 h-3 absolute right-2.5 top-3 text-slate-400" />
            </div>
          </div>

          {/* Origin Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Origin Country
            </label>
            <div className="relative">
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniqueOrigins.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Destination Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Destination
            </label>
            <div className="relative">
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniqueDests.map((dest, i) => (
                  <option key={i} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Importer Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Importer
            </label>
            <div className="relative">
              <select
                value={selectedImporter}
                onChange={(e) => setSelectedImporter(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniqueImporters.map((imp, i) => (
                  <option key={i} value={imp}>
                    {imp}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Exporter Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Exporters
            </label>
            <div className="relative">
              <select
                value={selectedExporter}
                onChange={(e) => setSelectedExporter(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniqueExporters.map((exp, i) => (
                  <option key={i} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Loading Port Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Port of Loading
            </label>
            <div className="relative">
              <select
                value={selectedPort}
                onChange={(e) => setSelectedPort(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniquePorts.map((port, i) => (
                  <option key={i} value={port}>
                    {port}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex w-full">
             <button
              onClick={handleApplyFilters}
              className=" w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl py-2 px-3 transition shadow-sm  whitespace-nowrap"
            >
              Apply Filters
            </button>
          </div>
          {/* Reset Filters Control */}
          <div className="flex gap-2">
            <button
              onClick={handleResetFilters}
              className="flex items-center justify-center border border-slate-200 text-red-500 hover:bg-red-50 rounded-lg px-4 py-2 bg-white shadow-sm font-semibold text-xs w-full transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
            </button>
          </div>
        </div>
      </div>

       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-6xl w-full">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
          <div className="text-sm font-bold text-slate-800">
            Filtered: {filteredShipments.length} Results
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50">
              <Columns className="w-3.5 h-3.5 text-slate-400" /> Columns
            </button>
            <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5 shadow-sm">
              <button className="p-1 bg-slate-100 text-slate-700 rounded-md">
                <List className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 text-slate-400 hover:text-slate-600">
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
               
                <th className="py-3 px-3">HS Code</th>
                <th className="py-3 px-4 max-w-[180px]">Product Description</th>
                <th className="py-3 px-4">Importer</th>
                <th className="py-3 px-4">Exporter</th>
                <th className="py-3 px-3">Origin</th>
                <th className="py-3 px-3">Dest</th>
                <th className="py-3 px-4">Port of Loading</th>
                <th className="py-3 px-4">Port of Discharge</th>
                <th className="py-3 px-3">Ship Date</th>
                <th className="py-3 px-3">Arr. Date</th>
                <th className="py-3 px-4 text-right">Value (INR)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredShipments.length > 0 ? (
                filteredShipments.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                  
                    <td className="py-3.5 px-3 text-slate-500 font-medium">
                      {row.cargo?.hsCode?.hsCode}
                    </td>
                    <td
                      className="py-3.5 px-4 font-medium text-slate-700 max-w-[180px] truncate"
                      title={row.cargo?.description}
                    >
                      {row.cargo?.description}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {row.importer?.companyName}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {row.exporter?.companyName}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="mr-1.5 inline-flex align-middle shadow-sm rounded-sm ">
                        <ReactCountryFlag
                          countryCode={countryCodes[row.route?.originCountry] || ""}
                          svg
                          style={{ width: "18px", height: "13px" }}
                        />
                      </span>
                      <span className="text-slate-600 font-medium align-middle">
                        {row.route?.originCountry}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="mr-1.5 inline-flex align-middle shadow-sm rounded-sm ">
                        <ReactCountryFlag
                          countryCode={countryCodes[row.route?.destinationCountry] || ""}
                          svg
                          style={{ width: "18px", height: "13px" }}
                        />
                      </span>
                      <span className="text-slate-600 font-medium align-middle">
                        {row.route?.destinationCountry}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {row.route?.originCity}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {row.route?.destinationCity}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                      {row.shipmentDate ? new Date(row.shipmentDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short",year: "numeric",}) : "-"}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                      {row.eta ? new Date(row.eta).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",}) : "-"}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
                      ₹ {(row.cargo?.value / 10000000).toFixed(2)} Cr
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
                          row.shipmentStatus === "Delivered"
                            ? "bg-green-50 text-green-600"
                            : row.shipmentStatus === "In Transit"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {row.shipmentStatus}
                      </span>
                    </td>
               
                       <td className="py-3 text-center relative">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                         setOpenMenu(openMenu === idx ? null : idx);
                                        }}
                                        className="text-slate-400 hover:text-slate-600"
                                      >
                                        <MoreVertical size={15} />
                                      </button>
                    
                                      {openMenu === idx && (
                                        <div
                                          onClick={(e) => e.stopPropagation()}
                                          className="absolute right-0 top-10 z-20 w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 flex flex-col gap-1 text-left"
                                        >
                                          
                                            <button
                                              onClick={() => {
                                              setOpenMenu(null);
                                              }}
                                              className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-xs text-left hover:bg-blue-100 transition-colors"
                                            >
                                              View
                                            </button>
                                          
                                        </div>
                                          )}
                                        </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="13"
                    className="text-center py-8 text-slate-400 font-medium"
                  >
                    No data found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-400">
            Showing {filteredShipments.length} rows
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white border border-blue-600">
              1
            </button>
            <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div> 


        {showAddRowModal && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            onClick={() => setShowAddRowModal(false)}
          >
            <div
              className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Add Master data 
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    Enter  details to add master data
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddRowModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <div className="px-5 py-4 max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* HS Code */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      HS Code
                    </label>

                    <input
                      type="text"
                      value={newShipment.hsCode}
                      onChange={(e) =>
                        handleShipmentChange("hsCode", e.target.value)
                      }
                      placeholder="Enter HS Code"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Product Description */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Product Description
                    </label>

                    <input
                      type="text"
                      value={newShipment.description}
                      onChange={(e) =>
                        handleShipmentChange("description", e.target.value)
                      }
                      placeholder="Enter product description"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Importer */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Importer
                    </label>

                    <input
                      type="text"
                      value={newShipment.importer}
                      onChange={(e) =>
                        handleShipmentChange("importer", e.target.value)
                      }
                      placeholder="Enter importer"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Exporter */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Exporter
                    </label>

                    <input
                      type="text"
                      value={newShipment.exporter}
                      onChange={(e) =>
                        handleShipmentChange("exporter", e.target.value)
                      }
                      placeholder="Enter exporter"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Origin */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Origin
                    </label>

                    <input
                      type="text"
                      value={newShipment.origin}
                      onChange={(e) =>
                        handleShipmentChange("origin", e.target.value)
                      }
                      placeholder="Enter origin country"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Dest
                    </label>

                    <input
                      type="text"
                      value={newShipment.dest}
                      onChange={(e) =>
                        handleShipmentChange("dest", e.target.value)
                      }
                      placeholder="Enter destination country"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Port Loading */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Port of Loading
                    </label>

                    <input
                      type="text"
                      value={newShipment.portLoading}
                      onChange={(e) =>
                        handleShipmentChange("portLoading", e.target.value)
                      }
                      placeholder="Enter loading port"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Port Discharge */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Port of Discharge
                    </label>

                    <input
                      type="text"
                      value={newShipment.portDischarge}
                      onChange={(e) =>
                        handleShipmentChange("portDischarge", e.target.value)
                      }
                      placeholder="Enter discharge port"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Ship Date */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Ship Date
                    </label>

                    <input
                      type="date"
                      value={newShipment.shipDate}
                      onChange={(e) =>
                        handleShipmentChange("shipDate", e.target.value)
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Arrival Date */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Arr. Date
                    </label>

                    <input
                      type="date"
                      value={newShipment.arrDate}
                      onChange={(e) =>
                        handleShipmentChange("arrDate", e.target.value)
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Value */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Value (INR)
                    </label>

                    <input
                      type="number"
                      value={newShipment.value}
                      onChange={(e) =>
                        handleShipmentChange("value", e.target.value)
                      }
                      placeholder="Enter value"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Status
                    </label>

                    <select
                      value={newShipment.status}
                      onChange={(e) =>
                        handleShipmentChange("status", e.target.value)
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    >
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setShowAddRowModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleAddShipmentRow}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Master data
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
  );
}