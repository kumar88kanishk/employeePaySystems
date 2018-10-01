var dateFormat = require("dateformat");
var ts = require("../models/taxSlab");
class EmployeeSlip {
  constructor(formRequest) {
    this.timePeriod = 12;
    this.percentage = 100;

    this.employeeJson = {
      fullName: formRequest.firstName + " " + formRequest.lastName
    };
  }

  buildData(formRequest) {
    //console.log(formRequest);
    return new Promise((resolve, reject) => {
      var promise = this.buildPackage(formRequest);
      promise.then(formRequest => {
        console.log(
          "-->this.employee after building ppackage",
          this.employeeJson
        );
        return this.calculateTax(formRequest);
      });
      promise.then(formRequest => {
        console.log(
          "-->this.employeeJson after calculateTax",
          this.employeeJson
        );
        return this.netIncome(formRequest);
      });
      promise.then(formRequest => {
        console.log(
          "-->this.employeeJson after calculating netIncome  & grossIncome",
          this.employeeJson
        );
        return this.period(formRequest);
      });
      promise.catch(err => {
        console.log("Error Caused12", err);
        throw err;
      });

      resolve(this.employeeJson);
    });
  }
  buildPackage(formRequest) {
    console.log("buildPackage formrequest", formRequest);
    return new Promise((resolve, reject) => {
      try {
        this.employeeJson["annualPackage"] = parseInt(
          formRequest.annualPackage
        );
        this.employeeJson["grossIncome"] = Math.round(
          this.employeeJson["annualPackage"] / this.timePeriod
        );
        resolve(formRequest);
      } catch (err) {
        console.log("error in building package==>", err);
        reject();
      }
    });
  }
  findSlab(employeeJson) {
    return ts.taxSlab().find(t => {
      return (
        employeeJson["annualPackage"] >= t.lowerBound &&
        employeeJson["annualPackage"] <= t.upperbound
      );
    });
    console.log("taxSlab====>", ts);
  }
  calculateTax(formRequest) {
    //console.log("calculateTax, Form Request==>", formRequest);
    return new Promise((resolve, reject) => {
      try {
        let correspondingSlab = this.findSlab(this.employeeJson);
        this.employeeJson["incomeTax"] =
          correspondingSlab.tax !== 0
            ? Math.round(
                ((this.employeeJson["annualPackage"] -
                  correspondingSlab.lowerBound) *
                  (correspondingSlab.tax / this.percentage) +
                  correspondingSlab.extraAmount) /
                  this.timePeriod
              )
            : Math.round(
                (this.employeeJson["annualPackage"] -
                  correspondingSlab.lowerBound +
                  correspondingSlab.extraAmount) /
                  this.timePeriod
              );
        resolve(formRequest);
      } catch (err) {
        console.log("error in building tax", err);
        reject();
      }
    });
  }
  netIncome(formRequest) {
    return new Promise((resolve, reject) => {
      try {
        this.employeeJson["netIncome"] = Math.round(
          this.employeeJson["grossIncome"] - this.employeeJson["incomeTax"]
        );
        this.employeeJson["superRate"] = Math.round(
          this.employeeJson["grossIncome"] *
            (parseInt(formRequest.superRate) / this.percentage)
        );
        resolve(formRequest);
      } catch (err) {
        console.log("error in building netincome", err);
        reject();
      }
    });
  }
  period(formRequest) {
    return new Promise((resolve, reject) => {
      try {
        let startDate = dateFormat(
          new Date(formRequest.startDate),
          "dddd, mmmm dS, yyyy"
        );
        let endDate = dateFormat(
          new Date(formRequest.endDate),
          "dddd, mmmm dS, yyyy"
        );
        this.employeeJson["period"] = startDate + " - " + endDate;
        resolve(formRequest);
      } catch (err) {
        console.log("error in building period", err);
        reject();
      }
    });
  }
}

module.exports = EmployeeSlip;
