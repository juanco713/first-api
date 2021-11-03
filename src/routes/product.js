const { Router } = require('express');
const router = Router();
const {createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/products');
const { verifyToken, authAdmin } = require('../middleware/authJwt')
const { cache } = require('../middleware/cache')

router.get('/products',verifyToken,cache, getProducts);
router.post('/products',verifyToken, authAdmin, createProduct);
router.put('/products/:id',verifyToken, authAdmin, updateProduct);
router.delete('/products/:id',verifyToken, authAdmin, deleteProduct);

module.exports = router;