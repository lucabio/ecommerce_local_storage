const Product = require('../models/product');   

exports.getAddProduct = (req, res, next) => {
    //in this case set automatically the headers to text/html
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>');
    //res.sendFile(path.join(routeDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
};

exports.postAddProduct = (req, res, next) => {
    const data = req.body;
    const product = new Product(
        null,
        data.title,
        data.description,
        data.imageUrl,
        data.price
        );
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    //in this case set automatically the headers to text/html
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>');
    //res.sendFile(path.join(routeDir, 'views', 'add-product.html'));
    const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId,product =>{
        if(!product){
            res.redirect('/');
        }else{
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/add-product',
                editing : editMode,
                product : product
            })
        }
    })
};

exports.postEditProduct = (req, res, next) => {
    const data = req.body;
    const product = new Product(
        data.id,
        data.title,
        data.description,
        data.imageUrl,
        data.price
        );
    product.save();
    res.redirect('/admin/products');
};

exports.getProductList = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: 'Admin Products List',
            path: '/admin/products',
            prods : products
        })
    })
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId, () => {
        res.redirect('/admin/products');
    });
}