const express = require("express");

const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
router.use(protect, adminOnly);

const {

getDashboard,
getUsers,
getRoles,
getRoleDistribution,
inviteUser,
updateUser,
deleteUser,
changeStatus,
getActivity,
getFilterOptions,
searchUsers

} = require("../controllers/usersRolesController");
router.get("/dashboard", getDashboard);
router.get("/users", getUsers);

router.get("/search", searchUsers);

router.post("/invite", inviteUser);

router.put("/:id", updateUser);

router.patch("/status/:id", changeStatus);

router.delete("/:id", deleteUser);
router.get("/roles", getRoles);

router.get("/role-distribution", getRoleDistribution);
router.get("/activity", getActivity);
router.get("/filter-options", getFilterOptions);

module.exports = router;