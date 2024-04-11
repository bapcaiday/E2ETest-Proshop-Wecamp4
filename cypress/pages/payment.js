class Payment{
    element={
       methodSelect:()=>cy.get('input#PayPal[type="radio"]'),
       submitBtn:()=>cy.get("button[type='submit']").filter(":contains('Continue')")
    }
    unCheckSelectMethod() {
        this.element.methodSelect().invoke('prop', 'checked', false); ;
    }

    clickSubmitBtn(){
        this.element.submitBtn().click();
    }
   
}

module.exports =new Payment;