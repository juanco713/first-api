const Order = require('../models/order');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

async function getOneOrder(req,res) {
    const token = req.headers.token
    const decoded = jwt.verify(token, config.SECRET_TOKEN)
    userId = decoded.id;
    const order = await Order.find({user: userId});
    res.json(order);
};

async function addProduct(req,res) {
    try{
        const token = req.headers.token
        const decoded = jwt.verify(token, config.SECRET_TOKEN)
        userId = decoded.id;
        const newProduct = req.body;
        const addProduct = await Order.findOneAndUpdate({user: userId}, {$push:newProduct},
        {safe: true, upsert: true, new : true},);
        await addProduct.save();
        res.json('Product Added').status(200);
    } catch(err) {
        console.error({message: err})
    }
;}

async function deleteProduct(req,res){
    try{
        const token = req.headers.token
        const decoded = jwt.verify(token, config.SECRET_TOKEN)
        userId = decoded.id;
        const product = req.body;
        const deleteProduct = await Order.findOneAndUpdate({user: userId}, {$pull:product},
        {safe: true, upsert: false, new : false},);
        await deleteProduct.save();
        res.json('Product Deleted').status(200);
    } catch(err) {
        console.error({message: err})
    }
};

async function makeOrder(req,res) {
    try{
        const {user, products, paymethod} = req.body;
        const newOrder = new Order({user, products, paymethod, open});
        const savedOrder = await newOrder.save();
        console.log(savedOrder);
        res.json("Order created").status(200);
    } catch(err) {
        console.error(err)
    }
};


async function getOrders(req,res){
    const orders = await Order.find()
    .populate('products','nombre')
    .populate('paymethod', 'nombre');
    res.json(orders).status(200);
};



module.exports = { makeOrder, getOrders, getOneOrder, addProduct,deleteProduct}