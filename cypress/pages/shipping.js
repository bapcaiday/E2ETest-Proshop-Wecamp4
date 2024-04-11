class Shipping{
    element={
        addressField: ()=>cy.get("input#address.form-control"),
        cityField:()=> cy.get("input#city.form-control"),
        codeField:()=> cy.get("input#postalCode.form-control"),
        countryField:()=> cy.get("input#country.form-control"),
        submitBtn: ()=> cy.get("button[type='submit']").filter(":contains('Continue')"),
        paymentLink: ()=> cy.get('.nav-item a').contains('Payment'),
        placeoderLink: ()=> cy.get('.nav-item a').contains('Place Order')
    }

    typeAddress(value){
        this.element.addressField().type(value)
    }

    typeCity(value){
        this.element.cityField().type(value)
    }

    typePostalCode(value){
        this.element.codeField().type(value)
    }

    typeCountry(value){
        this.element.countryField().type(value)
    }

    clickSubmitBtn(){
        this.element.submitBtn().click()
    }

}

module.exports = new Shipping()