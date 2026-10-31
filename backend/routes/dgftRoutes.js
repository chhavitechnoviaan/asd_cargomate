const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/dgftController");

router.post("/", ctrl.createScheme);
router.get("/", ctrl.getSchemes);
router.get("/stats", ctrl.getStats);
router.get("/:id", ctrl.getSingleScheme);
router.put("/:id", ctrl.updateScheme);
router.delete("/:id", ctrl.deleteScheme);

module.exports = router;