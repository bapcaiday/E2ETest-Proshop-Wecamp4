const Product=require('../../pages/product');
const Cart=require('../../pages/cart');
const Shipping=require('../../pages/shipping');
const Payment=require('../../pages/payment')
import loginValidData from '../../fixtures/loginValidData.json'
import shippingData from '../../fixtures/shippingFormData.json'


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// describe('Proceeding to checkout step',()=>{
//     it("Verify that when user click checkout button without login, the system will redirect to login page",()=>{
//         cy.visit(Cypress.env('home_url'));
//         cy.addRandomProductToCart();
//         Cart.clickCheckOutBtn();
//         cy.wait(1000);
//         cy.url().should('include', Cypress.env('login_url'));
//     })

//     it("Verify that user can not access shipping page if cart is empty",()=>{
//         cy.visit(Cypress.env('cart_url'))
//         cy.wait(1000);
//         Cart.element.checkoutBtn().should('be.disabled');
//     })

//     it("Verify that when user click checkout button (loged in), the system will redirect to shipping page",()=>{
//         cy.login(loginValidData.email,loginValidData.password);
//         cy.addRandomProductToCart();
//         Cart.clickCheckOutBtn();
//         cy.wait(1000);
//         cy.url().should('include',Cypress.env('shipping_url'))
//     })

//     it.only("Verify that when user click checkout button (loged in), the system will redirect to shipping page",()=>{
//         cy.login(loginValidData.email,loginValidData.password);
//         cy.addRandomProductToCart();
//         Cart.clickCheckOutBtn();
//         cy.wait(1000);
//         cy.url().should('include',Cypress.env('shipping_url'))
//     })   
// })

// describe('Proceeding to shipping page',()=>{
//     beforeEach(()=>{
//         cy.login(loginValidData.email,loginValidData.password)
//         cy.addToCart(0);
//         Cart.clickCheckOutBtn();
//         cy.wait(1000)
//     })
//     it("Verify that all fields of shipping form are required",()=>{
//         Shipping.element.addressField().should('have.attr', 'required')
//         Shipping.element.cityField().should('have.attr', 'required')
//         Shipping.element.codeField().should('have.attr', 'required')
//         Shipping.element.countryField().should('have.attr', 'required')
//     })
//     it("Verify that user can not submit when haven't completed all fields",()=>{
//         shippingData.forEach(testData=>{
//             if (testData.description=='Lack address information'){
//                 Shipping.typeCity(testData.city);
//                 Shipping.typePostalCode(testData.code);
//                 Shipping.typeCountry(testData.country);
//                 Shipping.clickSubmitBtn();
//                 cy.wait(1000)
//                 Shipping.element.addressField()
//                 .then(($el) =>{
//                   const validity = $el[0].checkValidity(); // Kiểm tra tính hợp lệ của input
//                   const validationMessage = $el[0].validationMessage;
//                   expect(validity).to.be.false; // Kiểm tra tính hợp lệ của input
//                   expect(validationMessage).to.not.be.empty; // Kiểm tra xem có hiển thị validationMessage không
//                 })  
//             }
//         })
//     })
//     it("Verify when user complete all fields, system will redirect to payment page",()=>{
//         shippingData.forEach(testData=>{
//             if (testData.description=='Valid shipping information'){
//                 Shipping.typeAddress(testData.address)
//                 Shipping.typeCity(testData.city);
//                 Shipping.typePostalCode(testData.code);
//                 Shipping.typeCountry(testData.country);
//                 Shipping.clickSubmitBtn();
//                 cy.wait(1000)
//                 cy.url().should('include',Cypress.env('payment_url'))             
//             }
//         })
//     })
//     it("Verify that user can not access shipping form when not submiting shipping form",()=>{
//        Shipping.element.paymentLink().should('have.class','disabled');
//     })

//     it("Verify that user can not access placeorder form when not submiting shipping form",()=>{
//         Shipping.element.placeoderLink().should('have.class','disabled');
//      })

// })

describe('Proceeding to payment and place order page',()=>{
    beforeEach(()=>{
        cy.login(loginValidData.email,loginValidData.password)
        cy.addToCart(0);
        Cart.clickCheckOutBtn();
        cy.wait(1000);
        shippingData.forEach(testData=>{
            if (testData.description=='Valid shipping information'){
                cy.fillShippingInfo(testData.address,testData.city,testData.code,testData.country)            
            }
        })
        
    })

    it("Verify that user can continue to placeorder if not select payment method",()=>{
        Payment.unCheckSelectMethod();
        Payment.clickSubmitBtn();
        cy.wait();
        cy.url().should('include',Cypress.env('payment_url'))
    })

    it("Verify that user can continue will be redirect to placeorder if select payment method",()=>{
        Payment.clickSubmitBtn();
        cy.wait(1000);
        cy.url().should('include',Cypress.env('placeorder_url'))
    })
})
