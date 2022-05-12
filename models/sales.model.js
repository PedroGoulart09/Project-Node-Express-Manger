const connection = require('../connectBD/connect');

const saleQuery = `select * from StoreManager.sales 
LEFT JOIN StoreManager.sales_products ON (sales.id = sales_products.sale_id)`;

const getSales = async () => {
    const sales = await connection.execute(saleQuery);
    return sales;
};

const findSalesById = async (id) => connection.execute(`${saleQuery} where sale_id = ?`, [id]);

const createProductSales = async (saleId, productId, quantity) => {
    const queryProductSale = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    await connection.execute(queryProductSale, [saleId, productId, quantity]);
};

const createSales = async (products) => {
    const querySale = `INSERT INTO StoreManager.sales
     (date) VALUES(NOW())`;
    const [{ insertId: id }] = await connection.execute(querySale);
    await Promise.all(products
        .map(({ productId, quantity }) => createProductSales(id, productId, quantity)));

    return {
        id,
        itemsSold: [
            ...products,
        ],
    };
};

const updateSale = async (id, { productId, quantity }) => {
    const queryUpdateSale = `UPDATE StoreManager.sales_products 
    SET quantity = ? WHERE sale_id = ?  AND product_id = ? `;
    await connection.execute(queryUpdateSale, [quantity, id, productId]);

    return {
        saleId: id,
        itemUpdated: [
            {
                productId,
                quantity,
            },
        ],
    };
};

module.exports = {
    getSales,
    findSalesById,
    createSales,
    updateSale,
};
