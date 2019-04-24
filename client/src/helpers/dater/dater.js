const sixMonths = (dateFrom = new Date()) => {
  return calculateDates(6, dateFrom);
};

const twelveMonths = (dateFrom = new Date()) => {
  return calculateDates(12, dateFrom);
};

const calculateDates = (months, dateFrom = new Date()) => {
  const dates = [];
  let month = dateFrom.getMonth();
  let year = dateFrom.getFullYear();
  for (let x = 0; x < months; x++) {
    dates.push(new Date(`${year.toString()}-${month.toString()}`));
    if (month - 1 < 1) {
      year--;
      month = 12;
    } else {
      month--;
    }
  }
  return dates;
};

module.exports = { calculateDates, sixMonths, twelveMonths };
