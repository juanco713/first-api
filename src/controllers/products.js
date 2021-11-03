const Product = require('../models/products');
const { putInCache, resetCache } = require('../middleware/cache')

async function createProduct(req, res) {
    const { nombre, precio, descripcion } = req.body;
    try {
        const newProduct = new Product({ nombre, precio, descripcion });
        const savedProduct = await newProduct.save();
        resetCache({
            method: 'GET',
            originalUrl: req.originalUrl
        });
        console.log(savedProduct);
        res.json("Product created").status(200);
    } catch (err) {
        console.error(err)
    }
};

async function getProducts(req, res) {
    console.log("Next request gona be in the cache")
    const products = await Product.find();
    putInCache(req, products);
    res.json(products).status(200);
};

async function deleteProduct(req, res) {
    const idProduct = req.params.id;
    const product = await Product.findById(idProduct)
    const deletedProduct = await product.deleteOne()
    res.json('Product deleted').status(200);
    console.log(deletedProduct)
};



async function updateProduct(req, res) {
    try {
        const idProduct = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(idProduct, req.body, {
            new: true
        })
        res.status(200).json(updatedProduct)
    } catch (err) {
        console.error(err);
        res.json({ message: err })
    }
};





module.exports = { createProduct, getProducts, updateProduct, deleteProduct };