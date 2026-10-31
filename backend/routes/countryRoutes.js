const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/countryController");

router.post("/", ctrl.createCountry);
router.get("/", ctrl.getCountries);

module.exports = router;