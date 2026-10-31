const express = require("express");
const router = express.Router();

const role = require("../controllers/roleController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, role.createRole);
router.get("/", protect, adminOnly, role.getRoles);
router.get("/:id", protect, adminOnly, role.getRoleById);
router.put("/:id", protect, adminOnly, role.updateRole);
router.delete("/:id", protect, adminOnly, role.deleteRole);

module.exports = router;