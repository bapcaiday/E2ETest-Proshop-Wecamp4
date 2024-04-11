const Header=require('../../pages/header')

const VALID_KEY="mouse"
const INVALID_KEY="bgdrjkg"
describe("Test Search Feature", ()=>{
    it("Search with valid keyword",()=>{
        cy.visit(Cypress.env('home_url'));
        
        Header.element.searchInput().type(VALID_KEY);
        Header.element.searchBtn().click();

        cy.url().should('include',`/search/${VALID_KEY}`)
       
        // Assert that the search results are displayed correctly
        cy.get('.row > .col-xl-3').each(($col) => {
         cy.wrap($col).within(() => {
            cy.get('.card-title strong').invoke('text').then((text) => {
                expect(text.toLowerCase()).to.include(VALID_KEY);
              });
         });
        })
   })

    it("Search with invalid keyword",()=>{
        cy.visit(Cypress.env('home_url'));
        
        Header.element.searchInput().type(INVALID_KEY);
        Header.element.searchBtn().click();

        cy.url().should('include',`/search/${INVALID_KEY}`)

        cy.get('.row').should('be.empty')
    })
})


