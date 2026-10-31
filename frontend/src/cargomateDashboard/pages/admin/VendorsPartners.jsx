import { useEffect, useState } from "react";
import API from "../../api/axios";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { CircleCheckBig } from "lucide-react";
import { FiEdit } from "react-icons/fi";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

import KYCVerificationModal from "../../components/adminComponent/KycVerification";
import RejectKYCModal from "../../components/adminComponent/RejectKycVerification";

const HEADING = "text-[#07156B]";

function StatusBadge({ status }) {
  const normalized =
    status?.toLowerCase() === "active"
      ? "Active"
      : status?.toLowerCase() === "inactive"
      ? "Inactive"
      : status || "Active";

  const styles = {
    Active: "bg-green-100 text-green-600",
    Inactive: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${
        styles[normalized] || "bg-gray-100 text-gray-600"
      }`}
    >
      {normalized}
    </span>
  );
}

function KycBadge({ status }) {
  const normalized =
    status?.toLowerCase() === "verified"
      ? "Verified"
      : status?.toLowerCase() === "rejected"
      ? "Rejected"
      : "Pending";

  const styles = {
    Verified: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${
        styles[normalized] || "bg-amber-100 text-amber-700"
      }`}
    >
      {normalized}
    </span>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-sm text-gray-500">{label}</p>

      <p className="text-2xl font-semibold text-gray-900 mt-1">
        {value || 0}
      </p>

      <p className="text-xs mt-1 text-gray-400">{sub}</p>
    </div>
  );
}

function DetailField({
  label,
  value,
  valueClass = "text-gray-900",
}) {
  return (
    <div>
      <label className="block text-gray-500 mb-1">
        {label}
      </label>

      <p className={`${valueClass} break-all`}>
        {value || "-"}
      </p>
    </div>
  );
}

export default function VendorsPartners() {
  const [vendors, setVendors] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalShipments: 0,
    verifiedUsers: 0,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [typeFilter, setTypeFilter] =
    useState("All Types");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedVendor, setSelectedVendor] =
    useState(null);

  const [showDetail, setShowDetail] =
    useState(false);

  const [kycVerify, setKycVerify] =
    useState(false);

  const [rejectKyc, setRejectKyc] =
    useState(false);

  const fetchB2BUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/vendors");

      setVendors(response.data?.data || []);
    } catch (err) {
      console.error(
        "Failed to fetch B2B users:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch B2B users"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await API.get(
        "/vendors/stats/all"
      );

      if (response.data?.data) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error(
        "Failed to fetch B2B stats:",
        err
      );
    }
  };

  useEffect(() => {
    fetchB2BUsers();
    fetchStats();
  }, []);

  const basicPlanCount = vendors.filter(
    (vendor) =>
      !vendor.plan ||
      vendor.plan.toLowerCase() === "basic"
  ).length;

  const starterPlanCount = vendors.filter(
    (vendor) =>
      vendor.plan?.toLowerCase() === "starter"
  ).length;

  const otherPlanCount = vendors.filter(
    (vendor) =>
      vendor.plan &&
      !["basic", "starter"].includes(
        vendor.plan.toLowerCase()
      )
  ).length;

  const totalPlanVendors =
    basicPlanCount +
    starterPlanCount +
    otherPlanCount;

  const planData = [
    {
      name: "Basic Plan",
      value: basicPlanCount,
      color: "#7C4DFF",
    },
    {
      name: "Starter Plan",
      value: starterPlanCount,
      color: "#4A78C2",
    },
    {
      name: "Other Plan",
      value: otherPlanCount,
      color: "#1FA45B",
    },
  ].filter((item) => item.value > 0);

  const activeVendorCount = vendors.filter(
    (vendor) =>
      vendor.status?.toLowerCase() === "active"
  ).length;

  const inactiveVendorCount = vendors.filter(
    (vendor) =>
      vendor.status?.toLowerCase() === "inactive" ||
      vendor.status?.toLowerCase() === "suspended"
  ).length;

  const totalStatusVendors =
    activeVendorCount + inactiveVendorCount;

  const activePercentage =
    totalStatusVendors > 0
      ? Math.round(
          (activeVendorCount /
            totalStatusVendors) *
            100
        )
      : 0;

  const inactivePercentage =
    totalStatusVendors > 0
      ? Math.round(
          (inactiveVendorCount /
            totalStatusVendors) *
            100
        )
      : 0;

  const statusData = [
    {
      name: "Active",
      value: activeVendorCount,
      color: "#1FA45B",
    },
    {
      name: "Inactive",
      value: inactiveVendorCount,
      color: "#EF4444",
    },
  ].filter((item) => item.value > 0);

  const registrationData = Array.from(
    { length: 6 },
    (_, index) => {
      const date = new Date();

      date.setMonth(
        date.getMonth() - (5 - index)
      );

      const month = date.toLocaleString(
        "en-US",
        {
          month: "short",
        }
      );

      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      return {
        month,
        count: vendors.filter((vendor) => {
          if (!vendor.createdAt) return false;

          const vendorDate = new Date(
            vendor.createdAt
          );

          return (
            vendorDate.getMonth() ===
              monthIndex &&
            vendorDate.getFullYear() === year
          );
        }).length,
      };
    }
  );

  const filtered = vendors.filter((v) => {
    const query = search.toLowerCase().trim();

    const matchSearch =
      !query ||
      v.name?.toLowerCase().includes(query) ||
      v.companyName
        ?.toLowerCase()
        .includes(query) ||
      v.email?.toLowerCase().includes(query) ||
      v.phone?.toLowerCase().includes(query);

    const normalizedStatus =
      v.status?.toLowerCase() === "active"
        ? "Active"
        : v.status?.toLowerCase() ===
          "inactive"
        ? "Inactive"
        : v.status;

    const matchStatus =
      statusFilter === "All Status" ||
      normalizedStatus === statusFilter;

    const normalizedPlan =
      !v.plan ||
      v.plan.toLowerCase() === "basic"
        ? "Basic"
        : v.plan.toLowerCase() === "starter"
        ? "Starter"
        : v.plan;

    const matchType =
      typeFilter === "All Types" ||
      normalizedPlan === typeFilter;

    return (
      matchSearch &&
      matchStatus &&
      matchType
    );
  });

  const handleViewVendor = async (user) => {
    try {
      setSelectedVendor(user);
      setShowDetail(true);

      const response = await API.get(
        `/vendors/${user._id}`
      );

      if (response.data?.data) {
        setSelectedVendor(
          response.data.data
        );
      }
    } catch (err) {
      console.error(
        "Failed to fetch B2B user details:",
        err
      );
    }
  };

  const updateUserInState = (updatedUser) => {
    if (!updatedUser?._id) return;

    setVendors((prev) =>
      prev.map((user) =>
        user._id === updatedUser._id
          ? {
              ...user,
              ...updatedUser,
            }
          : user
      )
    );

    setSelectedVendor((prev) =>
      prev?._id === updatedUser._id
        ? {
            ...prev,
            ...updatedUser,
          }
        : prev
    );

    fetchStats();
  };

  const handleSuspend = async () => {
    if (!selectedVendor?._id) return;

    try {
      const response = await API.patch(
        `/vendors/${selectedVendor._id}/suspend`
      );

      const updatedUser =
        response.data?.data ||
        response.data;

      if (updatedUser?._id) {
        updateUserInState(updatedUser);
      }
    } catch (err) {
      console.error(
        "Failed to suspend user:",
        err
      );

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to suspend user"
      );
    }
  };

  const submittedDate = selectedVendor?.createdAt
    ? new Date(
        selectedVendor.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-6 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Vendors/Partners
            </h1>

            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Manage B2B users and KYC verification
            </p>
          </div>
        </div>

        {/* TOP STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total B2B Users"
            value={stats.totalUsers}
            sub="All registered B2B users"
          />

          <StatCard
            label="Active Users"
            value={stats.activeUsers}
            sub="Active B2B accounts"
          />

          <StatCard
            label="Total Shipments"
            value={stats.totalShipments}
            sub="Created by B2B users"
          />

          <StatCard
            label="Verified KYC"
            value={stats.verifiedUsers}
            sub="KYC approved users"
          />
        </div>

        {/* ANALYTICS CARDS */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 min-h-[300px]">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Plan type vendor
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-[180px] h-[180px] flex-shrink-0">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={
                        planData.length > 0
                          ? planData
                          : [
                              {
                                name: "No Data",
                                value: 1,
                                color: "#E5E7EB",
                              },
                            ]
                      }
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={82}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {(planData.length > 0
                        ? planData
                        : [
                            {
                              name: "No Data",
                              value: 1,
                              color: "#E5E7EB",
                            },
                          ]
                      ).map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-gray-400">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-gray-800 leading-tight">
                    {totalPlanVendors}
                  </span>
                </div>
              </div>

              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7C4DFF]" />
                    <span className="text-sm text-gray-600">
                      Basic Plan
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-gray-700">
                    {basicPlanCount}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4A78C2]" />
                    <span className="text-sm text-gray-600">
                      Starter Plan
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-gray-700">
                    {starterPlanCount}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1FA45B]" />
                    <span className="text-sm text-gray-600">
                      Other Plan
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-gray-700">
                    {otherPlanCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 min-h-[300px]">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Vendor Registration
            </h3>

            <div className="h-[220px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={registrationData}
                  margin={{
                    top: 10,
                    right: 5,
                    left: 5,
                    bottom: 0,
                  }}
                >
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "#94A3B8",
                    }}
                  />

                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      borderRadius: "8px",
                      border:
                        "1px solid #E5E7EB",
                      fontSize: "12px",
                    }}
                  />

                  <Bar
                    dataKey="count"
                    radius={[3, 3, 0, 0]}
                    fill="#50C878"
                    maxBarSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 min-h-[300px]">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Vendor by Status
            </h3>

            <div className="relative h-[190px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={
                      statusData.length > 0
                        ? statusData
                        : [
                            {
                              name: "No Data",
                              value: 1,
                              color: "#E5E7EB",
                            },
                          ]
                    }
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {(statusData.length > 0
                      ? statusData
                      : [
                          {
                            name: "No Data",
                            value: 1,
                            color: "#E5E7EB",
                          },
                        ]
                    ).map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-gray-800">
                  {activePercentage}%
                </span>

                <span className="text-sm text-gray-400">
                  Active
                </span>
              </div>
            </div>

            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1FA45B]" />

                  <span className="text-sm text-gray-600">
                    Active
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">
                    {activeVendorCount}
                  </span>

                  <span className="text-gray-400">
                    {activePercentage}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />

                  <span className="text-sm text-gray-600">
                    Inactive
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">
                    {inactiveVendorCount}
                  </span>

                  <span className="text-gray-400">
                    {inactivePercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTER */}

        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 bg-white focus-within:border-teal-500 transition-all flex-1">
            <FaMagnifyingGlass className="text-gray-400 text-sm flex-shrink-0" />

            <input
              className="flex-1 text-sm outline-none bg-transparent"
              placeholder="Search Vendors"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500 bg-white min-w-[160px]"
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
          >
            <option>All Types</option>
            <option>Basic</option>
            <option>Starter</option>
          </select>

          <select
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500 bg-white min-w-[160px]"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* TABLE */}

        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            Loading B2B users...
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500 text-sm">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No B2B users found
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-xl border border-gray-100 bg-white px-6 py-4">
            <table className="w-full text-[11px] min-w-[900px]">
              <thead>
                <tr className="text-sm text-[#081B6B] uppercase font-bold border-b border-slate-100">
                  <th className="text-left py-3">
                    Company
                  </th>

                  <th className="text-left py-3">
                    Contact Person
                  </th>

                  <th className="text-left py-3">
                    Email
                  </th>

                  <th className="text-left py-3">
                    Phone
                  </th>

                  <th className="text-left py-3">
                    Plan
                  </th>

                  <th className="text-center py-3">
                    Shipments
                  </th>

                  <th className="text-left py-3">
                    Status
                  </th>

                  <th className="text-left py-3">
                    KYC
                  </th>

                  <th className="text-right py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {filtered.map((user) => (
                  <tr
                    key={user._id}
                    className="text-xs"
                  >
                    <td
                      onClick={() =>
                        handleViewVendor(user)
                      }
                      className="py-3 whitespace-nowrap cursor-pointer hover:underline"
                    >
                      <div
                        className={`font-bold ${HEADING}`}
                      >
                        {user.companyName || "-"}
                      </div>
                    </td>

                    <td className="py-3 whitespace-nowrap font-medium text-slate-500">
                      {user.name || "-"}
                    </td>

                    <td className="py-3 whitespace-nowrap font-medium text-slate-500">
                      {user.email || "-"}
                    </td>

                    <td className="py-3 whitespace-nowrap font-medium text-slate-500">
                      {user.phone || "-"}
                    </td>

                    <td className="py-3 whitespace-nowrap font-medium text-slate-500">
                      {user.plan || "Basic"}
                    </td>

                    <td className="py-3 whitespace-nowrap text-center font-medium text-slate-500">
                      {user.shipmentCount || 0}
                    </td>

                    <td className="py-3">
                      <StatusBadge
                        status={user.status}
                      />
                    </td>

                    <td className="py-3">
                      <KycBadge
                        status={user.kycStatus}
                      />
                    </td>

                    <td className="py-3 text-right">
                      <button
                        onClick={() =>
                          handleViewVendor(user)
                        }
                        className="text-slate-600 hover:text-[#07156B]"
                        title="View Details"
                      >
                        <FiEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DETAILS SECTION - TABLE KE BAHAR AUR NEECHAY */}

        {showDetail && selectedVendor && (
          <div className="w-full mt-6 bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-semibold text-gray-900 text-lg">
                  Vendor Details
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {selectedVendor.companyName ||
                    selectedVendor.name}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <KycBadge
                  status={
                    selectedVendor.kycStatus
                  }
                />

                <button
                  onClick={() =>
                    setShowDetail(false)
                  }
                  className="whitespace-nowrap py-1.5 px-3 rounded-lg bg-gray-100 text-gray-600 font-medium text-xs hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
              <div>
                <p className="font-semibold text-gray-900 mb-3">
                  Basic Information
                </p>

                <div className="space-y-3">
                  <DetailField
                    label="Contact Person"
                    value={selectedVendor.name}
                  />

                  <DetailField
                    label="Company Name"
                    value={
                      selectedVendor.companyName
                    }
                  />

                  <DetailField
                    label="Email"
                    value={selectedVendor.email}
                    valueClass="text-blue-500"
                  />

                  <DetailField
                    label="Phone"
                    value={selectedVendor.phone}
                  />

                  <DetailField
                    label="Account Type"
                    value={
                      selectedVendor.accountType
                    }
                  />
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-3">
                  Business Information
                </p>

                <div className="space-y-3">
                  <DetailField
                    label="GST Number"
                    value={
                      selectedVendor.gstNumber ||
                      selectedVendor.gstin
                    }
                  />

                  <DetailField
                    label="IEC Code"
                    value={
                      selectedVendor.importExportId
                        ? "••••••••••••"
                        : "-"
                    }
                  />

                  <DetailField
                    label="Business Type"
                    value={
                      selectedVendor.businessType
                    }
                  />

                  <DetailField
                    label="Country"
                    value={
                      selectedVendor.country
                    }
                  />

                  <DetailField
                    label="City"
                    value={selectedVendor.city}
                  />

                  <DetailField
                    label="Address"
                    value={
                      selectedVendor.address
                    }
                  />
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-3">
                  Account Information
                </p>

                <div className="space-y-3">
                  <DetailField
                    label="Plan"
                    value={selectedVendor.plan}
                  />

                  <DetailField
                    label="Account Status"
                    value={
                      selectedVendor.accountStatus ||
                      selectedVendor.status
                    }
                  />

                  <DetailField
                    label="Email Verified"
                    value={
                      selectedVendor.emailVerified
                        ? "Yes"
                        : "No"
                    }
                  />

                  <DetailField
                    label="Phone Verified"
                    value={
                      selectedVendor.phoneVerified
                        ? "Yes"
                        : "No"
                    }
                  />

                  <DetailField
                    label="Registered On"
                    value={submittedDate}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t pt-4 gap-3">
              <button
                onClick={handleSuspend}
                className="py-2 px-4 rounded-lg bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100"
              >
                Suspend
              </button>

              <button
                onClick={() =>
                  setKycVerify(true)
                }
                className="px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200"
              >
                <CircleCheckBig
                  size={16}
                  className="text-green-500"
                />

                Verify KYC
              </button>
            </div>
          </div>
        )}
      </div>

      {kycVerify && selectedVendor && (
        <KYCVerificationModal
          applicant={selectedVendor}
          onClose={() =>
            setKycVerify(false)
          }
          onApprove={updateUserInState}
          onReject={updateUserInState}
        />
      )}

      {rejectKyc && selectedVendor && (
        <RejectKYCModal
          applicant={selectedVendor}
          onClose={() =>
            setRejectKyc(false)
          }
          onRejected={updateUserInState}
        />
      )}
    </div>
  );
} 