const Product = require('../models/product');

const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    //in this case set automatically the headers to text/html
    //res.send('<h1>Hello from Express</h1>');
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            path: '/products',
            pageTitle: 'Shop'
        });
    });
    //res.sendFile(path.join(routeDir, 'views', 'shop.html'));
}

exports.getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id,product =>{
        console.log(`${product}`);
        res.render('shop/product-detail',{
            product : product,
            path: '/products',
            pageTitle : 'Product Detail'
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            path: '/',
            pageTitle: 'Home Page'
        });
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        const cartProducts = [];
        Product.fetchAll(products => {
            for(product of products){
                const cartProductsData = cart.products.find(p => p.id === product.id);
                if(cartProductsData){
                    cartProducts.push({productData : product, qty : cartProductsData.quantity})
                }
            }
            //console.log(`${products}`);
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Cart',
                products : cartProducts
            });
        });
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId,(product) => {
        Cart.addProduct(prodId,product.price);
    })
    res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders'
    })
}

exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId,product.price,()=>{
            res.redirect('/cart');
        })
    })
    
}