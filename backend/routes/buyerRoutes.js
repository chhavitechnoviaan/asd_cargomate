const router = require("express").Router();
const ctrl = require("../controllers/buyerController");

router.get("/", ctrl.getBuyers);
router.post("/", ctrl.createBuyer);

module.exports = router;