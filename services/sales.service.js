const salesModel = require('../models/sales.model');
const utilsError = require('../utils/error');

const serializeAllSales = (sales) =>
    sales.length > 0
    && sales.map((item) => ({
        saleId: item.sale_id,
        productId: item.product_id,
        quantity: item.quantity,
        date: item.date,
    }));

const serializeSalesById = (sales) => sales.map((item) => ({
    saleId: item.sale_Id,
    productId: item.product_id,
    quantity: item.quantity,
    date: item.date,
}));

const getSales = async () => {
    const [salesEntities] = await salesModel.getSales();
    return serializeAllSales(salesEntities);
};

const findSalesById = async (id) => {
    const [salesEntities] = await salesModel.findSalesById(id);
    if (salesEntities.length === 0) throw utilsError(404, 'Sale not found');
    return serializeSalesById(salesEntities);
};

const createSales = async (product) => {
    const sales = await salesModel.createSales(product);
    return sales;
};

const updateSales = async (id, sale) => {
    await findSalesById(id);
    const update = await salesModel.updateSale(id, sale);
    return update;
};

module.exports = {
    getSales,
    findSalesById,
    createSales,
    updateSales,
};