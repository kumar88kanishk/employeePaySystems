var EmployeeSlip = require("../middleware/employeeSlip");
exports.generateSlip = function(req, res) {
  let formRequest = req.body;
  var employeeSlip = new EmployeeSlip(formRequest);
  employeeSlip
    .buildData(formRequest)
    .then(result => {
      console.log("result-->", result);
      res.render("paySlip", { paySlip: result });
    })
    .catch(err => {
      console.log("error==>", err);
      res.redirect("/");
    });
};
