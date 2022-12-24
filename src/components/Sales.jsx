import React, { useState } from 'react';
import { findMonthName } from '../utils/dateUtils';
import '../scss/components/Sales.scss';

const Sales = ({ salesList, dateType, month }) => {

  let dateInfo = '';
  let monthName = findMonthName(month);

  const [showMore, setShowMore] = useState(false);

  if (dateType === 'day') {
    dateInfo = 'hoy';
  } else if (dateType === 'week') {
    dateInfo = 'esta semana';
  } else {
    dateInfo = monthName;
  }

  return (
    <div className='sales-container'>
      <div className='sales-header'>
        <h3>Tus ventas de { dateInfo }</h3>
      </div>

      <div className='sales-table-container'>
        <table className='sales-table'>
          <thead>
            <tr>
              <th>Transacción</th>
              <th>Fecha y hora</th>
              <th>Método de pago</th>
              <th>ID transacción Bold</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody className={ showMore ? '' : 'collapsed' }>
            {
              salesList.map((sale, i) => (
                <tr key={i}>
                  <td className={`transaction ${sale.transaction.state === 'Cobro exitoso' ? 'successful' : 'failed' }`}>
                    <span className='material-icons-outlined'>{ sale.transaction.type === 'link' ? 'link' : 'smartphone' }</span> { sale.transaction.state }
                  </td>
                  <td className='date-time'>{ sale.dateTime.date } - { sale.dateTime.time }</td>
                  <td className={`payment ${ sale.payment.method === 'credit card' ? 'credit-card-logo' : '' }`}>
                    { sale.payment.info }
                  </td>
                  <td className='bold-id'>{ sale.boldId }</td>
                  <td className='amount-info'>
                    <span className='amount'>{ sale.amount.value }</span> 
                    { sale.amount.deduction ? <span className='deduction'> Deducción Bold <span className='deduction-amount'>-{ sale.amount.deductionValue }</span></span> : '' }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          salesList.length > 4 
          ?
          <div className={ `table-overlay ${ showMore ? 'collapsed' : '' }` }>
            {
              showMore
              ?
              <p onClick={ () => setShowMore(false)}>
                <span className='material-icons-outlined'>remove</span> Mostrar menos
              </p>
              :
              <p onClick={ () => setShowMore(true)}>
                <span className='material-icons-outlined'>add</span> Mostrar más
              </p>
            }
          </div>
          :
          ''
        }
      </div>
    </div>
  )
}

export default Sales;