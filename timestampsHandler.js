var moment = require('moment')

var getTimeStamps = function(input) {
  var parsed;
  if(/^\d{10}$/.test(input)) {
    parsed = moment(input, "X", true);
  } else {
    parsed = moment(input, ["MMMM D, YYYY", "D MMM YYYY", "D MMMM, YYYY"], true);
  }
  if(parsed.isValid()) {
    return {
      unix: parsed.format("X"),
      natural: parsed.format("MMMM D, YYYY")
    };
  } else {
    return {
      unix: null,
      natural: null
    };
  }
}

module.exports = getTimeStamps;
