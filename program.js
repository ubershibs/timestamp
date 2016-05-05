var moment = require('moment')
var unixD = null
var naturalD = null

var input = process.argv[2]
if(/^\d{8}$/.test(input)) {
  var parsed = moment(input, "X")
} else {
  var parsed = moment(input, "MMMM D, YYYY")
}
var valid = parsed.isValid();
console.log(parsed, valid)
