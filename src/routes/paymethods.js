const { Router } = require('express');
const router = Router();
const {createPayMethod, showPayMethods, deletePayMethods, updatePayMethods } = require('../controllers/paymethod');
const { verifyToken, authAdmin } = require('../middleware/authJwt')

router.get('/pay',verifyToken, showPayMethods);
router.post('/pay', verifyToken, authAdmin, createPayMethod);
router.put('/pay/:id', verifyToken, authAdmin, updatePayMethods);
router.delete('/pay/:id',verifyToken, authAdmin, deletePayMethods);

module.exports = router;