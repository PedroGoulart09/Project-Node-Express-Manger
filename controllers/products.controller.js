const serviceProduct = require('../services/products.service');

const getProducts = async (req, res) => {
    try {
        const products = await serviceProduct.getProducts();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(err.status).json({ message: err.message });
    }
};

const findByProductId = async (req, res) => {
    try {
        const { id } = req.params;
        const returnIdProduct = await serviceProduct.findByProductId(Number(id));
        return res.status(200).json(returnIdProduct[0]);
    } catch (err) {
        console.log(err);
        return res.status(err.status).json({ message: err.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const product = await serviceProduct.createProduct(name, quantity);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity } = req.body;
        const update = await serviceProduct.updateProduct(id, name, quantity);
        return res.status(200).json(update);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await serviceProduct.deleteProduct(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    findByProductId,
    updateProduct,
    createProduct,
    deleteProduct,
};