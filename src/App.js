import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TotalEarnings from './components/TotalEarnings';
import DateFilter from './components/DateFilter';
import TransactionFilter from './components/TransactionFilter';
import Sales from './components/Sales';
import { getWeekDates, getCurrentDate } from './utils/dateUtils';
import './App.scss';

function App() {

  let [lastWeekDay, lastWeekMonth, lastWeekYear] = getWeekDates();

  // eslint-disable-next-line no-unused-vars
  let [currentDay, currentMonth, currentYear, currentDate] = getCurrentDate();

  // Get states from localstorage
  const dateTypeLS = JSON.parse(localStorage.getItem('dateType'));
  const selectedMonthLS = JSON.parse(localStorage.getItem('selectedMonth'));
  const transactionTypeLS = JSON.parse(localStorage.getItem('transactionType'));


  // Set states
  const [sales, setSales] = useState([]);
  const [transactionFilterValue, setTransactionFilterValue] = useState(`${ transactionTypeLS ? transactionTypeLS : 'Ver todos' }`);
  const [dateType, setDateType] = useState(`${dateTypeLS ? dateTypeLS : 'month'}`);
  const [dateFilterValue, setDateFilterValue] = useState( selectedMonthLS ? selectedMonthLS : currentMonth );


  // Set states to localstorage
  const setLS = (dateTypeValue, monthValue, transactionValue) => {
    localStorage.setItem('dateType', JSON.stringify(dateTypeValue));
    setDateType(dateTypeValue);

    localStorage.setItem('selectedMonth', JSON.stringify(monthValue));
    setDateFilterValue(monthValue);

    localStorage.setItem('transactionType', JSON.stringify(transactionValue));
    setTransactionFilterValue(transactionValue);
  }

  useEffect(() => {
    setLS(dateType, dateFilterValue, transactionFilterValue);
  }, [dateType, dateFilterValue, transactionFilterValue]);


  // Load sales list history
  const fetchData = () => {
    fetch('../../sales.json')
      .then((res) => res.json())
      .then((json) => setSales(json))
  }

  useEffect(() => {
    fetchData();
  }, []);


  // Filter sales list by date
  // eslint-disable-next-line
  let filteredListByDate = sales.filter((sale) => {
    if (dateType === 'day') {
      return sale.dateTime.date === currentDate;

    } else if (dateType === 'week') {
      let splittedDate = [...sale.dateTime.date.split('/')].map(Number);

      if (lastWeekDay > 7) {
        return (splittedDate[0] >= lastWeekDay) && (splittedDate[1] === parseInt(lastWeekMonth)) && (splittedDate[2] === lastWeekYear);
      }

    } else if (dateType === 'month') {
      return sale.dateTime.date.slice(-7) === `${dateFilterValue}/${currentYear}`;

    } else {
      return sale;
    }
  })

  // Update date filter value
  const onFilterDateValue = (dateTypeValue, filterValue) => {
    setDateType(dateTypeValue);
    setDateFilterValue(filterValue);
  }


  // Filter sales list by transaction type
  let filteredList = filteredListByDate.filter((sale) => {
    if (transactionFilterValue === 'Cobros con datáfono') {
      return sale.transaction.type === 'datafono';

    } else if (transactionFilterValue === 'Cobros con link de pago') {
      return sale.transaction.type === 'link';

    } else {
      return sale;
    }
  })


  // Update transaction filter value
  const onFilterTransactionValue = (filterValue) => {
    setTransactionFilterValue(filterValue);
  }

  return (
    <div className='App'>
      <Header />
      <main>
        <section className='earnings-section'>
          <TotalEarnings salesList={ filteredListByDate } dateType={ dateType } monthValue={ dateFilterValue }  />
        </section>
        
        <section className='filters-section'>
          <DateFilter filterValueSelected={ onFilterDateValue } selectedMonth={ dateFilterValue } />
          <TransactionFilter filterValueSelected={ onFilterTransactionValue } />
        </section>  
        
        <section className='sales-section'>
          <Sales salesList={ filteredList } dateType={ dateType } month={ dateFilterValue } />
        </section>
      </main>
    </div>
  );
}

export default App;
