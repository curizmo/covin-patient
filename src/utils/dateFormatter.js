const moment = require("moment");

export const dateFormatter = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const getDateString = (dateTime) => {
  if (!dateTime) {
    return '';
  }
  return `${dateTime}`.split(/T/)[0];
};

export const getTimeString = (dateTime) => {
  if (!dateTime) {
    return '';
  }
  const time = `${dateTime}`.split(/T/)[1].split(/:/);
  return `${time[0]}:${time[1]}`;
};

export const getToday = (date) => {
  const todayDate = moment(date ? new Date(date) : new Date()).format(
    'YYYY-MM-DD',
  );

  return `${todayDate}`;
};