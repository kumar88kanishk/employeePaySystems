module.exports = {
  employeeSchema() {
    return {
      firstName: {
        label: "Employee First Name",
        type: "text",
        required: true
      },
      lastName: {
        label: "Employee Last Name",
        type: "text",
        required: false
      },
      annualPackage: {
        label: "Employee Annual Package",
        type: "number",
        required: true,
        max: Infinity
      },
      superRate: {
        label: "Super Rate",
        type: "number",
        required: true,
        min: 0,
        max: 12
      },
      startDate: {
        label: "Period Start Date",
        type: "date",
        required: true,
        min: this.timeNow(0)
      },
      endDate: {
        label: "Period End Date",
        type: "date",
        required: true,
        min: this.timeNow(30)
      }
    };
  },
  timeNow(period) {
    var time = new Date();
    time.setDate(time.getDate() + period);
    return time.toString("yyyy-MM-dd");
  }
};
