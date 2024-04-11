class Header{
    element={
        searchInput:()=> cy.get("input[name='q'][placeholder='Search Products...']"),
        searchBtn: ()=>  cy.get("button[type='submit']").filter(':contains("Search")'),
        cartLink: ()=> cy.contains('a', ' Cart'),
        signinLink: ()=> cy.contains('a', ' Sign In'),
        usernameLink: ()=>cy.get('a#username')
    }

    enterSearchInput(text){
        this.element.searchInput().type(text)
    }

    clickSearchButton(text){
        this.element.searchBtn().click();
    }

    clickCartLink(){
        this.element.cartLink().click();
    }

    clickSignInLink(){
        this.element.signinLink().click();
    }
}

module.exports =new Header;