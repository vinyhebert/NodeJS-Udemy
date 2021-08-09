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
        cart.totalPrice = cart.totalPrice + +Number(productPrice) //+ concatena 
        fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err)
            })
        })   
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return
            }
            const updatedCart = {...JSON.parse(fileContent)}
            const product = updatedCart.products.find(prod => prod.id === id)
            if (!product) {
                return
            }
            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            )
            updatedCart.totalPrice = 
                updatedCart.totalPrice - productPrice * productQty

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err)
                })
    })

}

static getCart(cb){
    fs.readFile(p, (err, fileContent) => {
        const cart = JSON.parse(fileContent)
        if (err) {
            cb(null)
        } else {
            cb(cart)
        }
        })
    }
}
