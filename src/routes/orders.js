const { Router } = require('express');
const router = Router();
const { makeOrder, getOrders, getOneOrder, addProduct, deleteProduct} = require('../controllers/order')
const { verifyToken, authAdmin } = require('../middleware/authJwt')
const { openOrder} = require('../middleware/openorder')


router.get('/orders',verifyToken, authAdmin, getOrders);
router.get('/order', verifyToken, getOneOrder);
router.post('/order', verifyToken, makeOrder);
router.post('/orders/add',verifyToken, openOrder, addProduct);
router.delete('/orders', verifyToken, openOrder, deleteProduct);






module.exports = router;