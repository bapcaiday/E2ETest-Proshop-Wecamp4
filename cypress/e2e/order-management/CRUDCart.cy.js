const Product=require('../../pages/product');
const Cart=require('../../pages/cart');
const { wait } = require('@testing-library/user-event/dist/cjs/utils/index.js');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

describe('Add to cart',()=>{
    beforeEach(()=>{
        cy.visit(Cypress.env('home_url'))
    })

    it("Verify that the product appear in cart page after adding to cart",()=>{
        Product.element.cardTitle().then(item=>{
            const index=getRandomInt(item.length);
            const title=item[index].innerText;
            cy.addToCart(index);
            cy.wait(1000);
            cy.url().should('include',Cypress.env('cart_url'));
            Cart.element.productName().should('have.text',title);
        })
    })

    it("Verify that cannot add a product out of stock to cart",()=>{
        Product.clickCardImg(2);
        wait(1000);
        Product.element.addToCartBtn().should('be.disabled')
    })
})

describe('CRUD cart',()=>{
    beforeEach(()=>{
        cy.visit(Cypress.env('home_url'));
        Product.element.cardImg().then(item => {
            cy.addToCart(getRandomInt(item.length)) 
        })    
    })

    it('Verify that the product quantity will change when user change quantity selection', () => {
        const index=0;
        Cart.changeSelectQuantity(index,2);
        cy.wait(1000);
        Cart.element.selectQuantity().eq(index).should('have.value',3);
    })

    it('Verify that the total items equal to quantities of list item',()=>{
        const index=0;
        Cart.changeSelectQuantity(index,4);
        cy.wait(1000);
        let total=0;
        Cart.element.selectQuantity().each(($select) => {
           cy.wrap($select).invoke('val').then((value) => {
              total += parseInt(value); 
            });
        })
        .then(() => {
            // Lấy giá trị số lượng từ Cart.getTotalQuantities() và so sánh với tổng số lượng
            Cart.getTotalQuantities().then((quantity) => {
                expect(total).to.equal(quantity);
            });
        });
    })

    it('Verify that the product disappears when the user removes it',()=>{
        const title=Cart.element.productName().eq(0).innerText;
        Cart.clickRemoveBtn(0);
        cy.wait(1000)
        Cart.element.productName().should('not.exist',title)
    })

    it('Verify that if cart is empty, system show message empty cart',()=>{
        Cart.element.removeBtn().then(item => {
            for (let index = 0; index < item.length; index++) {
                Cart.clickRemoveBtn(index)
            }
        })
        cy.wait(1000)
        Cart.element.emptyAlert().should('have.text','Your cart is empty Go Back');
    })


})


