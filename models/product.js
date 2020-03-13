const fs = require('fs');

const path = require('path');

const Cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(id, title, desc, imageUrl, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = desc;
        this.price = price;
    }

    save() {

        getProductsFromFile((products) => {
            if (this.id) {
                const existingProdIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProdIndex] = this;
                //console.log(`Updated Product : ${JSON.stringify(updatedProducts[existingProdIndex])}`);
                console.log(updatedProducts);
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                })
            }
        });
    }

    static deleteById(id,cb){
        getProductsFromFile((products)=>{
            //build a new array that MATCH the condition
            //so basically here a new array is built with all the element that DOES NOT have id equal to the one passed in argument
            const product = products.find(p => p.id === id);
            const productsUpdated = products.filter(p => p.id !== id);
            console.log(`deleting product ${id}`);
            fs.writeFile(p, JSON.stringify(productsUpdated), (err) => {
                if(err){
                    console.log(err)
                }else{
                    Cart.deleteProduct(id,product.price);
                }
                cb();
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}


