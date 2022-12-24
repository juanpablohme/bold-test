import React, { useState, useEffect } from 'react';
import { months } from '../utils/dateUtils';
import '../scss/components/DateFilter.scss';

const DateFilter = ({ filterValueSelected, selectedMonth }) => {

  // Get current month
  const date = new Date();
  let currentMonth = date.getMonth() + 1;

  // Initial date state
  let dateInitialState = {
    day: false,
    week: false,
    month: true
  }

  // Get states from localstorage
  const dateTypeLS = JSON.parse(localStorage.getItem('dateType'));

  const checkDateType = (dateTypeLS) => {

    if(dateTypeLS === 'day') {
      dateInitialState.day = true;
      dateInitialState.week = false;
      dateInitialState.month = false;
      
    } else if (dateTypeLS === 'week') {
      dateInitialState.day = false;
      dateInitialState.week = true;
      dateInitialState.month = false;

    } else {
      dateInitialState.day = false;
      dateInitialState.week = false;
      dateInitialState.month = true;
    }
  }

  const [isDay, setIsDay] = useState(dateInitialState.day);
  const [isWeek, setIsWeek] = useState(dateInitialState.week);
  const [isMonth, setIsMonth] = useState(dateInitialState.month);

  useEffect(() => {
    checkDateType(dateTypeLS);

    setIsDay(dateInitialState.day)
    setIsWeek(dateInitialState.week);
    setIsMonth(dateInitialState.month);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateInitialState]);

  const onFilterDate = (e) => {
    filterValueSelected(e.target.id, e.target.value);
  }

  return (
    <div className='date-filter-container'>

      <div className='input-container'>
        <input 
          type='radio' 
          id='day' 
          name='date' 
          value='Hoy' 
          onClick={ onFilterDate }
        />
        <label 
          htmlFor='day' 
          className={ isDay ? 'checked' : '' }
          onClick={ () => {
            setIsDay(true);
            setIsWeek(false);
            setIsMonth(false);
          }}
        >
          Hoy
        </label>
      </div>  

      <div className='input-container'>
        <input 
          type='radio' 
          id='week' 
          name='date' 
          value='Esta semana' 
          onClick={ onFilterDate }
        />
        <label 
          htmlFor='week'
          className={ isWeek ? 'checked' : '' }
          onClick={ () => {
            setIsDay(false);
            setIsWeek(true);
            setIsMonth(false);
          }}
        >
          Esta semana
        </label>
      </div>

      <div className='input-container'>
        <select 
          name='date' 
          id='month' 
          onChange={ (e) => {
            onFilterDate(e);
            setIsDay(false);
            setIsWeek(false);
            setIsMonth(true);
          }}
          className={ isMonth ? 'checked' : '' }
          value={ isMonth ? selectedMonth : currentMonth }
        >
          {
            Object.keys(months).map((monthName, i) => (
              <option key={i} value={ months[monthName] }>{ monthName }</option>
            ))
          }
        </select>
        
      </div>

    </div>
  )
}

export default DateFilter;