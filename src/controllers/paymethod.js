const Pago = require('../models/paymet');


async function createPayMethod(req, res) {
    const { nombre, descripcion } = req.body;
    try {
        const newPayment = new Pago({ nombre, descripcion });
        const savedPayment = await newPayment.save();
        console.log(savedPayment);
        res.json('Payment added').status(200);
    } catch (err) {
        console.error(err)
    }
};

async function showPayMethods(req, res) {
    const payments = await Pago.find();
    res.json(payments).status(200)
};

async function deletePayMethods(req, res) {
    const idProduct = req.params.id;
    const payment = await Pago.findById(idProduct);
    const deletedPayment = await payment.deleteOne();
    res.json('Payment deleted').status(200);
    console.log(deletedPayment)
};

async function updatePayMethods(req, res) {
    try {
        const idProduct = req.params.id;
        const updatedPayment = await Pago.findByIdAndUpdate(idProduct, req.body, {
            new: true
        })
        res.status(200).json(updatedPayment)
    } catch (err) {
        console.error(err);
        res.json({ message: err })
    }
};

module.exports = { createPayMethod, showPayMethods, deletePayMethods, updatePayMethods }