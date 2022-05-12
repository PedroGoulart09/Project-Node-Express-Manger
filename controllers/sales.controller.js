const serviceSale = require('../services/sales.service');

const getSales = async (req, res) => {
    try {
        const sales = await serviceSale.getSales();
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

const findSalesById = async (req, res) => {
    try {
        const { id } = req.params;
        const sales = await serviceSale.findSalesById(Number(id));
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

const createSales = async (req, res, next) => {
    try {
        const sales = req.body;
        const salesCrate = await serviceSale.createSales(sales);
        return res.status(201).json(salesCrate);
    } catch (error) {
        next(error);
    }
};

const updateSales = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [sales] = req.body;
        const update = await serviceSale.updateSales(id, sales);
        return res.status(200).json(update);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSales,
    findSalesById,
    createSales,
    updateSales,
};