var assert = require('chai').assert;
var getTimeStamps =  require('../timestampsHandler');

describe('getTimeStamps', function() {
  it('should accept an Epoch date and return both Epoch and natural language dates', function() {
    var input = "1234567890";
    var response = getTimeStamps(input);

    assert.equal(response.unix, "1234567890");
    assert.equal(response.natural, "February 13, 2009");
  });

  it('should accept a "Month Day, Year" date and return both natural and Epoch formats', function() {
    var input = "February 13, 2009";
    var response = getTimeStamps(input);

    assert.equal(response.natural, "February 13, 2009");
    assert.isAtLeast(parseInt(response.unix), 1234483200);
    assert.isAtMost(parseInt(response.unix), 1234569599);
  });

  it('should accept abbreviated month formats', function() {
    var input = "13 Feb 2009";
    var response = getTimeStamps(input);

    assert.equal(response.natural, "February 13, 2009");
  });

  it('should accept alternative day/month order', function() {
    var input = "13 February, 2009";
    var response = getTimeStamps(input);

    assert.equal(response.natural, "February 13, 2009");
  })

  it('should not accept other date formats', function() {
    var input = "6/19/13";
    var response = getTimeStamps(input);

    assert.equal(response.natural, null);
    assert.equal(response.unisx, null);
  });

  it('should not accept nonsense Epoch dates', function() {
    var input = "18099";
    var response = getTimeStamps(input);

    assert.equal(response.natural, null);
    assert.equal(response.unix, null);
  });
});
