const router = require("express").Router();
const ctrl = require("../controllers/departmentController");
router.post("/", ctrl.createDepartment);
router.get("/", ctrl.getDepartments);
router.put("/:id", ctrl.updateDepartment);
router.delete("/:id", ctrl.deleteDepartment);

router.get("/users/search", ctrl.searchUsers);
router.get("/:id", ctrl.getDepartment);
router.post("/role", ctrl.createRole);
router.put("/role/:id", ctrl.updateRole);
router.get("/access/all", ctrl.getAccess);
router.post("/access/update", ctrl.updateAccess);
router.put("/access/:departmentId", ctrl.updateAccess);

module.exports = router;