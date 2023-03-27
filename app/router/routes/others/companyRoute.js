const express = require("express");
const companyController = require("../../../controllers/articles/companyController");
const router = express.Router();

// Currently on route http://localhost:PORT/company/

router.get("/", companyController.findAll);
router.get("/:companyId", companyController.findOne);
router.post("/", companyController.createOne);
router.patch("/:companyId", companyController.updateOne);
router.delete("/:companyId", companyController.deleteOne);

module.exports = router;