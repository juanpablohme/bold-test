/* eslint-disable no-undef */

describe('Filters testing', () => {


  it('Month filter', () => {

    cy.visit('http://localhost:3000/')
    cy.get('#month').select('11')
    cy.get('.earnings-header > h4').contains('Total de ventas de noviembre')
    cy.get('.sales-header > h3').contains('Tus ventas de noviembre')
  })


  it('Week filter', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.date-filter-container > :nth-child(2) > label').click()
    cy.get('.earnings-header > h4').contains('Total de ventas de esta semana')
    cy.get('.sales-header > h3').contains('Tus ventas de esta semana')
  })


  it('Day filter', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.date-filter-container > :nth-child(1) > label').click()
    cy.get('.earnings-header > h4').contains('Total de ventas de hoy')
    cy.get('.sales-header > h3').contains('Tus ventas de hoy')

  })


  it('Month filter with transaction filter by "Cobros con datáfono"', () => {

    cy.visit('http://localhost:3000/')
    cy.get('#month').select('12')
    cy.get('.transaction-filter-btn').click()
    cy.get('#dataphone').click()
    cy.get('.transaction-filter button').click()
    cy.get('.transaction-filter-header > span').click()

  })


  it('Month filter with transaction filter by "Cobros con link de pago"', () => {

    cy.visit('http://localhost:3000/')
    cy.get('#month').select('12')
    cy.get('.transaction-filter-btn').click()
    cy.get('#link').click()
    cy.get('.transaction-filter button').click()
    cy.get('.transaction-filter-header > span').click()

  })


  it('Month filter with transaction filter by "Ver todos"', () => {

    cy.visit('http://localhost:3000/')
    cy.get('#month').select('12')
    cy.get('.transaction-filter-btn').click()
    cy.get('#viewAll').click()
    cy.get('.transaction-filter button').click()
    cy.get('.transaction-filter-header > span').click()

  })


  it('Month filter with transaction filter by "Ver todos"', () => {

    cy.visit('http://localhost:3000/')
    cy.get('#month').select('12')
    cy.get('.transaction-filter-btn').click()
    cy.get('#viewAll').click()
    cy.get('.transaction-filter button').click()
    cy.get('.transaction-filter-header > span').click()

  })


  it('Month filter persistance after page re load', () => {

    cy.visit('http://localhost:3000/')
    cy.get('#month').select('12')
    cy.reload()
    cy.get('.earnings-header > h4').contains('Total de ventas de diciembre')
    cy.get('.sales-header > h3').contains('Tus ventas de diciembre')
  })


  it('Week filter persistance after page re load', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.date-filter-container > :nth-child(2) > label').click()
    cy.reload()
    cy.get('.earnings-header > h4').contains('Total de ventas de esta semana')
    cy.get('.sales-header > h3').contains('Tus ventas de esta semana')
  })


  it('Day filter persistance after page re load', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.date-filter-container > :nth-child(1) > label').click()
    cy.reload()
    cy.get('.earnings-header > h4').contains('Total de ventas de hoy')
    cy.get('.sales-header > h3').contains('Tus ventas de hoy')

  })

})