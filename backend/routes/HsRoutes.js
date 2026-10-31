const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/HsController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/",protect, adminOnly, ctrl.createHSCode);
router.get("/", ctrl.getHSCodes);
router.get("/:id", ctrl.getSingleHSCode);
router.put("/:id",protect, adminOnly, ctrl.updateHSCode);
router.delete("/:id",protect, adminOnly, ctrl.deleteHSCode);

module.exports = router;