const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Order = require('../models/order');

async function openOrder (req,res,next) {
    try{
        const token = req.headers.token
        const decoded = jwt.verify(token, config.SECRET_TOKEN)
        userId = decoded.id;
        const order = await Order.find({user: userId});
        const isOpen = order[0].open;
        if(isOpen === true) {
            next();
        } else{
            res.json('The order is closed!')
        }
    } catch(err){
        console.error({message: err})
    }
};

module.exports = {openOrder}