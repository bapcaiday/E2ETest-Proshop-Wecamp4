const loginForm=require('../../pages/loginForm')
const Header=require('../../pages/header')
import loginValidData from '../../fixtures/loginValidData.json'
import loginInvalidData from '../../fixtures/loginInvalidData.json'

describe("Test Login Feature", () => {
    it("Should login successfully with customer role", () => {
      cy.login(loginValidData.email,loginValidData.password)
      Header.element.usernameLink().should('have.text','estherpham');
      cy.url().should('eq','http://localhost:3000/')
    })

    it("Should login with wrong format email",()=>{
      loginInvalidData.forEach(testData =>{
         if (testData.description==='Login with wrong format email'){
          cy.login(testData.email,testData.password)
          loginForm.element.emailInput()
                .then(($el) =>{
                  const validity = $el[0].checkValidity(); // Kiểm tra tính hợp lệ của input
                  const validationMessage = $el[0].validationMessage;
                  expect(validity).to.be.false; // Kiểm tra tính hợp lệ của input
                  expect(validationMessage).to.not.be.empty; // Kiểm tra xem có hiển thị validationMessage không
                })  
         }
      })
    });

    it("Should login with invalid email",()=>{
      loginInvalidData.forEach(testData =>{
         if (testData.description==='Login with invalid email'){
          cy.login(testData.email,testData.password)
          cy.get("div[role='alert'].fade.alert.alert-danger.show").should('contain',"Invalid email or password")
         }
      })
    });

    it("Should login with incorrect password",()=>{
      loginInvalidData.forEach(testData =>{
         if (testData.description==='Login with invalid password'){
          cy.login(testData.email,testData.password)
          cy.get("div[role='alert'].fade.alert.alert-danger.show").should('contain',"Invalid email or password")
         }
      })
    });
      
})

