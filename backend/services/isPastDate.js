const moment = require("moment");
const { dateFormat } = require("../constants/date-field");
//Check if given date is in past
module.exports.isPastDate = (GivenDate) => {
  const currentDate = moment(new Date()).format(dateFormat);
  return moment(GivenDate).isBefore(currentDate);
};
