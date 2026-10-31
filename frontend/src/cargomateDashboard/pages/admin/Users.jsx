import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiEdit, FiActivity } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import API from "../../api/axios";

const ITEMS_PER_PAGE = 5;

function StatCard({ label, value, sub, subColor = "text-green-600" }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>

        <p className="text-2xl font-semibold text-gray-900 mt-1">
          {value}
        </p>

        <p className={`text-xs mt-1 ${subColor}`}>
          {sub}
        </p>
      </div>

      <FiActivity
        className={subColor === "text-red-500" ? "text-red-400" : "text-green-400"}
        size={32}
        strokeWidth={1.5}
      />
    </div>
  );
}

function DonutRing({
  segments,
  centerValue,
  centerLabel,
}) {
  let cumulative = 0;

  const gradientParts = segments.map((segment) => {
    const start = cumulative;
    cumulative += segment.percent;

    return `${segment.hex} ${start}% ${cumulative}%`;
  });

  return (
    <div
      className="relative w-32 h-32 shrink-0 rounded-full flex items-center justify-center"
      style={{
        background: `conic-gradient(${gradientParts.join(",")})`,
      }}
    >
      <div className="absolute w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
        <span className="text-lg font-semibold text-gray-900">
          {centerValue}
        </span>

        <span className="text-xs text-gray-500">
          {centerLabel}
        </span>
      </div>
    </div>
  );
}

function EditDrawer({
  user,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    status: user.status === "active",
    plan: user.plan || "Free",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await API.put(`/users/${user._id}`, {
        name: form.name,
        phone: form.phone,
        status: form.status ? "active" : "inactive",
        plan: form.plan,
      });

      const updatedUser = res.data.data;

      onUpdated(updatedUser);

      toast.success("User updated successfully ✅");

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Update failed ❌"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
      <div className="w-full sm:w-[420px] bg-white h-full overflow-y-auto p-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">
            Edit User
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl"
          >
            <RxCross1 />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-semibold">
            {form.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <p className="font-medium">
              {form.name}
            </p>

            <p className="text-xs text-gray-500">
              User Account
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Basic Information */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-3">
              Basic Information
            </p>

            <label className="text-xs text-gray-500">
              Full Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Full Name"
              required
              className="w-full border px-3 py-2 rounded mb-3"
            />

            <label className="text-xs text-gray-500">
              Email Address
            </label>

            <input
              value={form.email}
              disabled
              className="w-full border px-3 py-2 rounded mb-3 bg-gray-50 text-gray-500"
            />

            <label className="text-xs text-gray-500">
              Phone Number
            </label>

            <input
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              placeholder="Phone Number"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Status */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-3">
              Status
            </p>

            <div className="flex items-center gap-3">
              <input
                id="active-user"
                type="checkbox"
                checked={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.checked,
                  })
                }
              />

              <label
                htmlFor="active-user"
                className="text-sm"
              >
                Active User
              </label>
            </div>
          </div>

          {/* Subscription */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-3">
              Subscription Plan
            </p>

            <select
              value={form.plan}
              onChange={(e) =>
                setForm({
                  ...form,
                  plan: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Free">Free</option>
              <option value="Basic">Basic</option>
              <option value="Starter">Starter</option>
              <option value="Pro">Pro</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white py-2.5 rounded mt-2"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UsersSection() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [editUser, setEditUser] = useState(null);

  /*
    IMPORTANT:
    Backend se pehle saare users la rahe hain.
    Fir frontend me roleId.name === "user" filter kar rahe hain.

    Isse B2B aur admin users table me nahi dikhenge.
  */
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/users", {
        params: {
          page: 1,
          limit: 1000,
          search: "",
        },
      });

      const usersData =
        res.data?.data?.users || [];

      /*
        Sirf normal USER role wale users.

        signupUser backend:
        const role = await Role.findOne({ name: "user" });

        isliye yahan roleId.name === "user"
      */
      const onlyNormalUsers =
        usersData.filter((user) => {
          const roleName =
            typeof user.roleId === "object"
              ? user.roleId?.name
              : "";

          return (
            roleName?.toLowerCase() === "user"
          );
        });

      setAllUsers(onlyNormalUsers);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to load users ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /*
    Search frontend me
  */
  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return allUsers;
    }

    return allUsers.filter((user) =>
      [
        user.name,
        user.email,
        user.phone,
        user.plan,
        user.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [allUsers, search]);

  /*
    Frontend pagination
  */
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length / ITEMS_PER_PAGE
    )
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const currentUsers = useMemo(() => {
    const startIndex =
      (page - 1) * ITEMS_PER_PAGE;

    return filteredUsers.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredUsers, page]);

  /*
    Dashboard Statistics
  */
  const totalUsers = allUsers.length;

  const activeUsers = allUsers.filter(
    (user) => user.status === "active"
  ).length;

  const inactiveUsers = allUsers.filter(
    (user) => user.status === "inactive"
  ).length;

  /*
    Current week users
  */
  const newUsersThisWeek = allUsers.filter(
    (user) => {
      if (!user.createdAt) return false;

      const createdDate = new Date(
        user.createdAt
      );

      const today = new Date();

      const difference =
        today - createdDate;

      const days =
        difference /
        (1000 * 60 * 60 * 24);

      return days <= 7;
    }
  ).length;

  const activePercentage =
    totalUsers > 0
      ? (
          (activeUsers / totalUsers) *
          100
        ).toFixed(0)
      : 0;

  const inactivePercentage =
    totalUsers > 0
      ? (
          (inactiveUsers / totalUsers) *
          100
        ).toFixed(0)
      : 0;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers.toLocaleString(),
      sub: "Registered users",
      subColor: "text-green-600",
    },
    {
      label: "Active Users",
      value: activeUsers.toLocaleString(),
      sub: `${activePercentage}% of total users`,
      subColor: "text-green-600",
    },
    {
      label: "Inactive Users",
      value: inactiveUsers.toLocaleString(),
      sub: `${inactivePercentage}% of total users`,
      subColor: "text-red-500",
    },
    {
      label: "New Users (This Week)",
      value: newUsersThisWeek.toLocaleString(),
      sub: "Registered in last 7 days",
      subColor: "text-purple-500",
    },
  ];

  /*
    Plan Data
  */
  const planStats = useMemo(() => {
    const plans = {};

    allUsers.forEach((user) => {
      const plan =
        user.plan || "Free";

      plans[plan] =
        (plans[plan] || 0) + 1;
    });

    return Object.entries(plans).map(
      ([plan, count]) => ({
        label: plan,
        value: count,
        percent:
          totalUsers > 0
            ? (
                (count / totalUsers) *
                100
              ).toFixed(1)
            : "0",
      })
    );
  }, [allUsers, totalUsers]);

  /*
    Registration data last 6 months
  */
  const registrationData = useMemo(() => {
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();

      date.setMonth(
        date.getMonth() - i
      );

      months.push({
        month: date.toLocaleString(
          "default",
          {
            month: "short",
          }
        ),
        monthIndex: date.getMonth(),
        year: date.getFullYear(),
        value: 0,
      });
    }

    allUsers.forEach((user) => {
      if (!user.createdAt) return;

      const date = new Date(
        user.createdAt
      );

      const monthIndex =
        date.getMonth();

      const year =
        date.getFullYear();

      const monthData =
        months.find(
          (month) =>
            month.monthIndex ===
              monthIndex &&
            month.year === year
        );

      if (monthData) {
        monthData.value += 1;
      }
    });

    return months;
  }, [allUsers]);

  const maxReg = Math.max(
    1,
    ...registrationData.map(
      (item) => item.value
    )
  );

  const handleUserUpdated = (
    updatedUser
  ) => {
    setAllUsers((previousUsers) =>
      previousUsers.map((user) =>
        user._id === updatedUser._id
          ? {
              ...user,
              ...updatedUser,
              roleId: user.roleId,
            }
          : user
      )
    );
  };

  return (
    <div className="p-4 w-full sm:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">
            Users
          </h2>

          <p className="text-xs sm:text-sm text-gray-500">
            Manage user accounts and access
          </p>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            {...stat}
          />
        ))}
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* PLAN */}

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-4">
            Plan Type Users
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <DonutRing
              segments={
                planStats.length > 0
                  ? planStats.map(
                      (item, index) => ({
                        hex:
                          [
                            "#a855f7",
                            "#3b82f6",
                            "#22c55e",
                            "#f59e0b",
                          ][index % 4],
                        percent:
                          Number(
                            item.percent
                          ),
                      })
                    )
                  : [
                      {
                        hex: "#e5e7eb",
                        percent: 100,
                      },
                    ]
              }
              centerValue={totalUsers}
              centerLabel="Total"
            />

            <div className="space-y-2 w-full">
              {planStats.length > 0 ? (
                planStats.map(
                  (plan, index) => (
                    <div
                      key={plan.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2 text-gray-600">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              [
                                "#a855f7",
                                "#3b82f6",
                                "#22c55e",
                                "#f59e0b",
                              ][index % 4],
                          }}
                        />

                        {plan.label}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {plan.value}
                        </span>

                        <span className="text-gray-400">
                          ({plan.percent}%)
                        </span>
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="text-sm text-gray-400">
                  No user data
                </p>
              )}
            </div>
          </div>
        </div>

        {/* REGISTRATION */}

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-4">
            User Registration
          </p>

          <div className="flex items-end justify-between h-40 gap-3">
            {registrationData.map(
              (item) => (
                <div
                  key={`${item.month}-${item.year}`}
                  className="flex flex-col items-center flex-1 h-full justify-end gap-2"
                >
                  <div
                    className="w-full max-w-7 bg-green-400 rounded-sm transition-all"
                    style={{
                      height: `${Math.max(
                        (item.value /
                          maxReg) *
                          100,
                        item.value > 0
                          ? 5
                          : 0
                      )}%`,
                    }}
                  />

                  <span className="text-[10px] text-gray-400">
                    {item.month}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* STATUS */}

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-4">
            User By Status
          </p>

          <div className="flex flex-col items-center gap-4">
            <DonutRing
              segments={
                totalUsers > 0
                  ? [
                      {
                        hex: "#22c55e",
                        percent: Number(
                          activePercentage
                        ),
                      },
                      {
                        hex: "#ef4444",
                        percent: Number(
                          inactivePercentage
                        ),
                      },
                    ]
                  : [
                      {
                        hex: "#e5e7eb",
                        percent: 100,
                      },
                    ]
              }
              centerValue={`${activePercentage}%`}
              centerLabel="Active"
            />

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-green-500" />

                  Active
                </div>

                <span className="text-gray-900">
                  {activeUsers}

                  <span className="text-gray-400 ml-1">
                    {activePercentage}%
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-red-500" />

                  Inactive
                </div>

                <span className="text-gray-900">
                  {inactiveUsers}

                  <span className="text-gray-400 ml-1">
                    {inactivePercentage}%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow p-4">
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search by name, email or phone"
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );

              setPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead className="text-gray-500 text-left">
              <tr>
                <th className="py-2">
                  Name
                </th>

                <th>Email</th>

                <th>Phone No</th>

                <th className="text-center">
                  Subscription (Plan)
                </th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-400"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : currentUsers.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                currentUsers.map(
                  (user) => (
                    <tr
                      key={user._id}
                      className="border-t"
                    >
                      <td className="py-3 flex items-center gap-2">
                        <span className="w-8 h-8 hidden rounded-full bg-teal-100 text-teal-600 sm:flex items-center justify-center text-xs">
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </span>

                        {user.name || "-"}
                      </td>

                      <td>
                        {user.email || "-"}
                      </td>

                      <td>
                        {user.phone || "-"}
                      </td>

                      <td className="py-3 text-center">
                        {user.plan || "Free"}
                      </td>

                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status ===
                            "active"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td>
                        <FiEdit
                          onClick={() =>
                            setEditUser(
                              user
                            )
                          }
                          className="cursor-pointer text-blue-500 text-lg hover:text-blue-700"
                        />
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className="flex justify-between items-center mt-4 text-sm">
          <p>
            Showing{" "}
            {currentUsers.length}{" "}
            of{" "}
            {filteredUsers.length}{" "}
            users
          </p>

          <div className="flex gap-2 items-center">
            <button
              disabled={page === 1}
              onClick={() =>
                setPage((previous) =>
                  Math.max(
                    previous - 1,
                    1
                  )
                )
              }
              className="border px-3 py-1 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="bg-teal-500 text-white px-3 py-1 rounded">
              {page}
            </span>

            <button
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage((previous) =>
                  Math.min(
                    previous + 1,
                    totalPages
                  )
                )
              }
              className="border px-3 py-1 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* EDIT DRAWER */}

      {editUser && (
        <EditDrawer
          user={editUser}
          onClose={() =>
            setEditUser(null)
          }
          onUpdated={
            handleUserUpdated
          }
        />
      )}
    </div>
  );
}