/// <reference types="cypress" />

describe('Agenda de Contatos - EBAC', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('inclui um novo contato', () => {
    cy.get('input[placeholder="Nome"]').type('Teste Cypress');
    cy.get('input[placeholder="Telefone"]').type('11999999999');
    cy.get('input[placeholder="Email"]').type('cypress@test.com');
    cy.contains('button', 'Adicionar').click();

    cy.contains('Teste Cypress').should('exist');
    cy.contains('11999999999').should('exist');
    cy.contains('cypress@test.com').should('exist');
  });

  it('altera um contato existente', () => {
    cy.contains('tr', 'Teste Cypress').within(() => {
      cy.contains('Editar').click();
    });

    cy.get('input[placeholder="Telefone"]').clear().type('11988887777');
    cy.contains('button', 'Salvar').click();

    cy.contains('tr', 'Teste Cypress').should('contain.text', '11988887777');
  });

  it('remove um contato', () => {
    cy.contains('tr', 'Teste Cypress').within(() => {
      cy.contains('Remover').click();
    });

    cy.contains('Teste Cypress').should('not.exist');
  });
});