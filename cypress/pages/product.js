class Product{
    element={
       cardImg: ()=> cy.get('.card-img-top'),
       cardTitle: ()=>cy.get('.card-title'),
       addToCartBtn: ()=>cy.get("button[type='button']").filter(':contains("Add To Cart")')
    }

    clickCardImg(id){
        this.element.cardImg().then((item)=>{
            item[id].click();
        })
    }

    clickCardTitle(id){
        this.element.cardTitle().then((item)=>{

            item[id].click();
        })
    }

    clickAddToCart(){
        this.element.addToCartBtn().click();
    }
   
}

module.exports =new Product;