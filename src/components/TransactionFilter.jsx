import React, { useState } from 'react';
import '../scss/components/TransactionFilter.scss';

const TransactionFilter = ( props ) => {

  // Get states from localstorage
  let filterOption = JSON.parse(localStorage.getItem('transactionType'));

  const [checkedOption, setCheckedOption] = useState(filterOption);

  const [toggleFilter, setToggleFilter] = useState(false);

  // Get input value
  const onFilterTransaction = (e) => {
    filterOption = e.target.value;
  }

  // Apply filter when clicking in Apply button
  const onHandleFilter = () => {
    props.filterValueSelected(filterOption);
    setCheckedOption(filterOption);
  }


  return (
    <div className='transaction-filter-container' onChange={ onFilterTransaction }>

      <div className='transaction-filter-btn' onClick={() => setToggleFilter(true)}>
        <h5>FILTRAR</h5>
        <span className='material-icons-outlined'>tune</span>
      </div>

      <div className={`transaction-filter ${ toggleFilter ? 'opened' : 'closed' }`}>

        <div className='transaction-filter-header'>
          <h5>FILTRAR</h5>
          <span className='material-icons-outlined' onClick={() => setToggleFilter(false)}>close</span>
        </div>

        <div className='transaction-filter-options'>

          <div className='input-container'>
            <input 
              type='radio' 
              id='dataphone' 
              name='transaction' 
              value='Cobros con datáfono'
              className={ checkedOption === 'Cobros con datáfono' ? 'checked' : '' }
            />
            <label htmlFor='dataphone'>Cobros con datáfono</label>
          </div>

          <div className='input-container'>
            <input 
              type='radio' 
              id='link' 
              name='transaction' 
              value='Cobros con link de pago' 
              className={ checkedOption === 'Cobros con link de pago' ? 'checked' : '' }
            />
            <label htmlFor='link'>Cobros con link de pago</label>
          </div>

          <div className='input-container'>
            <input 
              type='radio' 
              id='viewAll' 
              name='transaction' 
              value='Ver todos' 
              className={ checkedOption === 'Ver todos' ? 'checked' : '' }
            />
            <label htmlFor='viewAll'>Ver todos</label>
          </div>

        </div>

        <div className='apply-filter-btn'>
          <button onClick={ () => { onHandleFilter() } }>Aplicar</button>
        </div>

      </div>
      
    </div>
  )
}

export default TransactionFilter;