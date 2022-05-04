const moment = require("moment");
//Check if given date is in past
module.exports.isPastDate = (GivenDate) => {
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  return moment(GivenDate).isBefore(currentDate);
};
