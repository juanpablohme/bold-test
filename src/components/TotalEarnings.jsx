import React from 'react';
import { findMonthName, getCurrentDate, getWeekDates } from '../utils/dateUtils';
import '../scss/components/TotalEarnings.scss';

const TotalEarnings = ({ salesList, dateType, monthValue }) => {

  // eslint-disable-next-line no-unused-vars
  let [currentDay, currentMonth, currentYear, currentDate] = getCurrentDate();
  // eslint-disable-next-line no-unused-vars
  let [lastWeekDay, lastWeekMonth, lastWeekYear] = getWeekDates();

  let formattedTotal = '';
  let dateInfo = '';
  let dateDescription = '';
  let selectedMonthName = findMonthName(monthValue);
  let currentMonthName = findMonthName(currentMonth);
  let pastMonthName = findMonthName(lastWeekMonth);

  // Convert string amounts to number
  if(salesList.length > 0) {
    let earnings = salesList.map( earn => earn.amount.value.replace(/[$.',]/g, '') ).map(Number);
    let totalEarnings = earnings.reduce( (a, b) => a + b )

    formattedTotal = totalEarnings >= 1000000 ? totalEarnings.toLocaleString('es-CO').replace(/[.]/i, "'") : totalEarnings.toLocaleString('es-CO');
  }

  if (dateType === 'day') {
    dateInfo = 'hoy';
    dateDescription = `${ currentMonthName } ${ currentDay }`;
  } else if (dateType === 'week') {
    dateInfo = 'esta semana';
    dateDescription = `${ pastMonthName } ${ lastWeekDay } - ${ currentMonthName } ${ currentDay }`;
  } else {
    dateInfo = selectedMonthName;
    dateDescription = `${ selectedMonthName }, ${ currentYear }`;
  }
  
  
  return (
    <div className='earnings-container'>
      <div className='earnings-header'>
        <h4>Total de ventas de { dateInfo }</h4>
        <span>i</span>
      </div>
      <div className='earnings-content'>
        <h2>${ formattedTotal !== '' ? formattedTotal : '0' }</h2>
        <p>{ dateDescription }</p>
      </div>
    </div>
  )
}

export default TotalEarnings;