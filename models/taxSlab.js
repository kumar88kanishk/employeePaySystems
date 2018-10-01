exports.taxSlab = function() {
  return [
    {
      lowerBound: 0,
      upperbound: 18200,
      tax: 0,
      extraAmount: 0
    },
    {
      lowerBound: 18201,
      upperbound: 37000,
      tax: 19,
      extraAmount: 0
    },
    {
      lowerBound: 37001,
      upperbound: 87000,
      tax: 32.5,
      extraAmount: 3572
    },
    {
      lowerBound: 87001,
      upperbound: 180000,
      tax: 37,
      extraAmount: 19822
    },
    {
      lowerBound: 180001,
      upperbound: Infinity,
      tax: 45,
      extraAmount: 54232
    }
  ];
};
