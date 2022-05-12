const productModel = require('../models/products.model');
const utilsErro = require('../utils/error');

const getProducts = async () => {
    const getAllProducts = await productModel.getProducts();
    if (getAllProducts.length === 0) throw utilsErro(404, 'Product not found');
    return getAllProducts;
};

const findByProductId = async (productId) => {
    const findByProduct = await productModel.findProductsById(productId);
    if (findByProduct.length === 0) throw utilsErro(404, 'Product not found');
    return findByProduct;
};

const createProduct = async (name, quantity) => {
    const validateProduct = await productModel.isValidNameProduct(name);
    if (validateProduct.length > 0) throw utilsErro(409, 'Product already exists');
    const product = await productModel.createProducts(name, quantity);
    return product;
};

const updateProduct = async (id, name, quantity) => {
    await findByProductId(id);
    const update = await productModel.updateProduct(id, name, quantity);
    return update;
};

const deleteProduct = async (id) => {
    await findByProductId(id);
    await productModel.deleteProduct(id);
};

module.exports = {
    getProducts,
    findByProductId,
    createProduct,
    updateProduct,
    deleteProduct,
};