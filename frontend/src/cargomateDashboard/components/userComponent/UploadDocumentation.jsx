import ModalShell from "./ModalShell";
import { useRef, useState } from "react";
import {
  FiX,
  FiTruck,
  FiCalendar,
  FiChevronDown,
  FiInfo,
  FiWifi,
  FiMapPin,
  FiBox,
  FiCheck,
  FiDownload,
  FiAlertTriangle,
  FiEdit3,
  FiLink2,
  FiArrowLeft,
  FiSave,
  FiPlus,
  FiCopy,
  FiStar,
  FiTrendingUp,
  FiDatabase,
  FiAlertCircle,
  FiAnchor,
  FiCpu,
  FiHash,
  FiGift,
  FiMap,
  FiFile,
  FiPackage,
  FiRadio,
  FiFileText,
  FiUsers,
  FiBookmark,
  FiClipboard,
  FiBarChart2,
  FiCreditCard,
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiChevronRight,
  FiShare2,
  FiSend,
  FiClock,
  FiDollarSign,
  FiAward,
  FiShoppingCart,
  FiFolder,
  FiPercent,
  FiShield,
  FiZap,
  FiEye,
  FiCheckCircle,
  FiExternalLink,
  FiUploadCloud,
  FiPhone,
  FiSearch,
  FiMail,
  FiSun,
  FiUser,
  FiGlobe,
  FiMessageSquare,
} from "react-icons/fi";

export default function UploadDocumentationModal({ onClose }) {
  const fileInputRef = useRef(null);

const [image, setImage] = useState(null);
const [preview, setPreview] = useState("");
const [dragging, setDragging] = useState(false);
const [loading, setLoading] = useState(false);

const handleFile = (file) => {
  if (!file) return;

  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Only PNG, JPG and JPEG files are allowed.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("File size should be less than 5MB.");
    return;
  }

  setImage(file);
  setPreview(URL.createObjectURL(file));
};

const handleChange = (e) => {
  handleFile(e.target.files[0]);
};

const handleDrop = (e) => {
  e.preventDefault();
  setDragging(false);

  const file = e.dataTransfer.files[0];
  handleFile(file);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDragEnter = (e) => {
  e.preventDefault();
  setDragging(true);
};

const handleDragLeave = (e) => {
  e.preventDefault();
  setDragging(false);
};

const removeImage = () => {
  setImage(null);
  setPreview("");

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

const uploadImage = async () => {
  if (!image) {
    alert("Please select image");
    return;
  }

  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      "/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("Uploaded Successfully");
    console.log(res.data.image);
  } catch (err) {
    console.log(err);
    alert("Upload Failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <ModalShell>
     <div className="flex items-start justify-between">
  <h2 className="text-base sm:text-lg font-bold text-gray-900">
    Upload documentation (optional)
  </h2>

  <button
    onClick={onClose}
    className="text-gray-400 hover:text-gray-600"
  >
    <FiX size={20} />
  </button>
</div>

<div
  onClick={() => fileInputRef.current.click()}
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onDragEnter={handleDragEnter}
  onDragLeave={handleDragLeave}
  className="mt-4 border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center justify-center text-center px-4 cursor-pointer"
>
  <input
    ref={fileInputRef}
    type="file"
    accept=".png,.jpg,.jpeg"
    hidden
    onChange={handleChange}
  />

  {!preview ? (
    <>
      <FiUploadCloud size={26} className="text-gray-700 mb-2" />

      <p className="text-sm font-medium text-gray-700">
        Drag &amp; Drop files here or browse
      </p>

      <p className="text-xs text-gray-400 mt-1">
        Supported formats: PDF, JPG, PNG (Max 5 MB)
      </p>
    </>
  ) : (
    <>
      <img
        src={preview}
        alt="Preview"
        className="w-40 h-40 object-cover rounded-lg"
      />

      <p className="text-sm mt-3 font-medium text-gray-700">
        {image.name}
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          removeImage();
        }}
        className="mt-3 text-red-500 text-sm"
      >
        Remove
      </button>
    </>
  )}
</div>

<div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
  <button className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full">
    Cancel
  </button>

  <button
    onClick={uploadImage}
    disabled={loading}
    className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full"
  >
    {loading ? "Uploading..." : "Apply for license"}
  </button>
</div>
    </ModalShell>
  );
}