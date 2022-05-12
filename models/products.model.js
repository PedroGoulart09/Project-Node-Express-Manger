const connection = require('../connectBD/connect');

const getProducts = async () => {
    const query = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(query);

    return products;
};

const findProductsById = async (id) => {
    const [findId] = await connection.execute(`select * from 
    StoreManager.products where id = ?`, [id]);
    return findId;
};

const createProducts = async (name, quantity) => {
    const query = `INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?)`;
    const [{ insertId: id }] = await connection.execute(query, [name, quantity]);
    return {
        id,
        name,
        quantity,
    };
};

const isValidNameProduct = async (name) => {
    const [isValid] = await connection.execute(`select * from 
    StoreManager.products where name = ?`, [name]);
    return isValid;
};

const updateProduct = async (id, name, quantity) => {
    const queryUpdate = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
    await connection.execute(queryUpdate, [name, quantity, id]);
    return {
        id, name, quantity,
    };
};

const deleteProduct = async (id) => {
    const queryDelete = 'DELETE FROM StoreManager.products WHERE id = ?';
    const deleteProducts = await connection.execute(queryDelete, [id]);
    return deleteProducts;
};

module.exports = {
    getProducts,
    findProductsById,
    createProducts,
    isValidNameProduct,
    updateProduct,
    deleteProduct,
};