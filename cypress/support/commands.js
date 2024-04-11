// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const loginForm=require('../pages/loginForm')
const Product=require('../pages/product')
const Shipping=require('../pages/shipping')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

Cypress.Commands.add('login', (email, password) => {
    cy.visit(Cypress.env('login_url'))
    loginForm.enterEmailInput(email)
    loginForm.enterPasswordInput(password)
    loginForm.clickLoginBtn();
    cy.wait(1000)
})

Cypress.Commands.add('addToCart',(index)=>{
    Product.clickCardImg(index);
    cy.wait(1000)
    Product.clickAddToCart();
})

Cypress.Commands.add('addRandomProductToCart',()=>{
    Product.element.cardTitle().then(item=>{
        const index=getRandomInt(item.length);
        Product.clickCardImg(index);
        cy.wait(1000);
        Product.clickAddToCart();     
    })
})

Cypress.Commands.add('fillShippingInfo', (address, city, postalCode, country) => {
    Shipping.typeAddress(address)
    Shipping.typeCity(city)
    Shipping.typePostalCode(postalCode)
    Shipping.typeCountry(country)
    Shipping.clickSubmitBtn()
})