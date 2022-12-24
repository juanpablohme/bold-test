  // Last week date
export const getWeekDates = () => {

  let lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  let lastWeekDay = lastWeek.getDate();
  let month = lastWeek.getMonth() + 1;
  let lastWeekMonth = month < 10 ? `0${month}` : `${month}`;
  let lastWeekYear = lastWeek.getFullYear();

  return [lastWeekDay, lastWeekMonth, lastWeekYear];
}

export const getCurrentDate = () => {

  const date = new Date();

  let currentDay = date.getDate();
  let month = date.getMonth() + 1;
  let currentMonth = month < 10 ? `0${month}` : `${month}`;
  let currentYear = date.getFullYear();

  let currentDate = `${currentDay}/${currentMonth}/${currentYear}`;

  return [currentDay, currentMonth, currentYear, currentDate];
}

// Month's list with code
export const months = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septiembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12'
};

// Get month name by value
export const findMonthName = (value) => {
  return Object.keys(months).find(key => months[key] === value);
}