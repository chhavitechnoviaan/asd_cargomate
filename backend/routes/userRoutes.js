
const express = require("express");
const router = express.Router();
const user = require("../controllers/usercontroller");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getUserDashboard } = require("../controllers/UserDashboardcontroller");
const { searchHSCode } = require("../controllers/hsLookupController");  
const { calculateIncentive } = require("../controllers/incentiveCalculatorController");
const { calculateFreight } = require("../controllers/freightCalculatorController");

router.post("/", protect, adminOnly, user.createUser); 
router.get("/", protect, adminOnly, user.getUsers);
router.delete("/:id", protect, adminOnly, user.deleteUser);
router.put("/:id", protect, adminOnly, user.updateUser);
router.put("/toggle/:id", protect, adminOnly, user.toggleStatus);
router.get("/:id", protect, adminOnly, user.getUserById);
router.put("/reset-password/:id", protect, adminOnly, user.resetUserPassword);
router.get("/dashboard", protect, getUserDashboard);
router.post("/invite/:id", protect, adminOnly, user.sendInvite);
router.post("/hs-lookup", protect, searchHSCode);
router.post("/incentive/calculate", protect, calculateIncentive);

router.post("/freight/calculate", protect, calculateFreight);

module.exports = router;