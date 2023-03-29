const express = require("express");
const companyController = require("./../../../controllers/others/companyController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
// Currently on route http://localhost:PORT/company/

router.get("/", companyController.findAll);
router.get("/:companyId", companyController.findOne);
router.post("/", bodySanitizer, companyController.createOne);
router.patch("/:companyId", bodySanitizer, companyController.updateOne);
router.delete("/:companyId", companyController.deleteOne);

module.exports = router;