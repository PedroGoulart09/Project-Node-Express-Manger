const express = require('express');
const salesController = require('../controllers/sales.controller');
const salesMiddleware = require('../middlewares/sales.middlewares');

const router = express.Router();

router.get('/sales', salesController.getSales);

router.get('/sales/:id', salesController.findSalesById);

router.post('/sales', salesMiddleware.isValidProductId,
    salesMiddleware.isValidQuantity, salesController.createSales);

router.put('/sales/:id', salesMiddleware.isValidProductId,
    salesMiddleware.isValidQuantity, salesController.updateSales);

module.exports = router;
