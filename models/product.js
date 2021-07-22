const fs = require('fs');
const path = require('path');

//Caminho do arquivo, /data/products.js
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      //Edit products
      if(this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        const updateProducts = [...products]
        updateProducts[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updateProducts), err => {
          console.log(err);
        });
      //Add products
      } else {
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }


  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }

  //delete product
  static deleteById(id, cb) {
    getProductsFromFile(products => {
      const updateProducts = products.filter(prod => prod.id !== id)
      console.log(updateProducts)
      fs.writeFile(p, JSON.stringify(updateProducts), err => {
        if(!err) {

        }
      });
      //cb(product)
    })
  }
};
