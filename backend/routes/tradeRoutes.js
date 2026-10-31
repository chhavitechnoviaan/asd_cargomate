const router = require("express").Router();
const ctrl = require("../controllers/tradeController");

router.get("/stats", ctrl.getStats);
router.get("/trend", ctrl.getTrend);
router.get("/map", ctrl.getMapData);

module.exports = router;