var express = require("express");
var router = express.Router();
var employeeController = require("../controllers/employeeController");
var employeeModel = require("../models/employee");

router.get("/", function(req, res, next) {
  res.render("employee", { employeeModel: employeeModel.employeeSchema() });
});
/* Post Form Data to generate slip. */
router.post("/generateSlip", employeeController.generateSlip);

module.exports = router;
