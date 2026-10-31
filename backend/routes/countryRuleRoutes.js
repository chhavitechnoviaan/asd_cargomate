const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/countryRuleController");

router.post("/", ctrl.createRule);
router.get("/", ctrl.getRules);
router.get("/stats", ctrl.getStats);
router.get("/:id", ctrl.getSingleRule);
router.put("/:id", ctrl.updateRule);
router.delete("/:id", ctrl.deleteRule);

module.exports = router;