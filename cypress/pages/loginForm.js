class loginForm{
    element={
        emailInput:()=> cy.get('input#email.form-control'),
        passwordInput: ()=> cy.get('input#password.form-control'),
        loginBtn: ()=>cy.get("button[type='submit']").filter(":contains('Sign In')"),
        registerLink: ()=> cy.get(".py-3 row < col").find("a").contains("Register")
    }

    enterEmailInput(text){
        this.element.emailInput().type(text)
    }

    enterPasswordInput(text){
        this.element.passwordInput().type(text)
    }

    clickLoginBtn(){
        this.element.loginBtn().click();
    }
    
}

module.exports =new loginForm;