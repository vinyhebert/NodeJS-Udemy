const { createDecipher } = require('crypto');
const fs = require('fs')
const path = require('path')

//Cria cart.json
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Feth the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(fileContent)
            }

        //Analyze the cart => Find existing products
        const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
        const existingProduct = cart.products[existingProductIndex]
        console.log(existingProduct)
        let updateProduct

        //Add new product/ increase quantity
        if (existingProduct) {
            // Upgrade qantidade
            updateProduct = {...existingProduct}
            //console.log(cart.products)
            updateProduct.qty = updateProduct.qty + 1
            // 
            cart.products = [...cart.products]
            console.log(updateProduct)
            cart.products[existingProductIndex] = updateProduct

        } else {
            updateProduct = { id: id, qty:1}
            cart.products = [...cart.products, updateProduct]
        }
        cart.totalPrice = cart.totalPrice + +productPrice
        fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err)
        })
    })   
    }
}

class Reptile {
	constructor (firstAppearance) {
  	    this.firstAppearance = firstAppearance
  }
  
  static getClassName () {
      return this.name
  }
}

Reptile.getClassName()



class Reptile1 {}
    
Reptile1.getClassName = function () {
    return this.name
}

Reptile.getClassName()

