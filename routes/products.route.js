const express = require('express');
const productController = require('../controllers/products.controller');
const productMiddleware = require('../middlewares/products.middleware');

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.findByProductId);

router.post('/products',
    productMiddleware.isValidName,
    productMiddleware.isValidQuantity,
    productController.createProduct);

router.put('/products/:id',
    productMiddleware.isValidName,
    productMiddleware.isValidQuantity,
    productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
