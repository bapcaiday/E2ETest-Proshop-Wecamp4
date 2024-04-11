class Cart{
    element={
       productName: ()=> cy.get('.col-md-3 a'),
       selectQuantity: ()=>cy.get('.col-md-2 select.form-control'),
       checkoutBtn: ()=>cy.get("button[type='button']").filter(':contains("Proceed To Checkout")'),
       removeBtn: ()=>cy.get('button > i'),
       emptyAlert:()=>cy.get('[role="alert"]')
    }

    getTotalQuantities(){
        return cy.get('.list-group-item h2').invoke('text').then((text) => {
            // Tách giá trị số từ chuỗi
            const quantity = parseInt(text.match(/\d+/)[0]);
            return quantity; // Trả về giá trị quantity
        });
    }

    clickRemoveBtn(index){
        this.element.removeBtn().then(item=>{
            item[index].click();
        })
    }

    clickCheckOutBtn(){
        this.element.checkoutBtn().click();
    }

    changeSelectQuantity(index,value){
        this.element.selectQuantity().eq(index).select(value);
    }
   
}

module.exports =new Cart;