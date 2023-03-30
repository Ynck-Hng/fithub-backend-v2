const express = require("express");
const companyController = require("./../../../controllers/others/companyController");
const router = express.Router();
const bodySanitizer = require("./../../../utils/bodySanitizer");
const { errorCatcher } = require("./../../../utils/errorHandler");

// Currently on route http://localhost:PORT/company/

router.get("/", errorCatcher(companyController.findAll));
router.get("/:companyId", errorCatcher(companyController.findOne));
router.post("/", bodySanitizer, errorCatcher(companyController.createOne));
router.patch("/:companyId", bodySanitizer, errorCatcher(companyController.updateOne));
router.delete("/:companyId", errorCatcher(companyController.deleteOne));

module.exports = router;