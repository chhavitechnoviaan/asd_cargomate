const router = require("express").Router();
const ctrl = require("../controllers/integrationController");

router.get("/", ctrl.getIntegrations);

router.post("/seed", ctrl.seedIntegrations);

router.post("/connect/:code", ctrl.connectIntegration);
router.post("/disconnect/:id", ctrl.disconnectIntegration);
router.post("/test/:code", ctrl.testConnection);
router.get("/stats", ctrl.getStats);

module.exports = router;