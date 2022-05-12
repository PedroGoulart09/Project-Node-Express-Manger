const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../connectBD/connect');
const productModel = require('../../../models/products.model');

describe('Testa a camada de produtos', () => {
    describe('Testa se a função getAll retorna todos os produtos', () => {
        before(() => {
            const products = [
                {
                    id: 1,
                    name: 'product1',
                    quantity: 10,
                },
                {
                    id: 2,
                    name: 'product2',
                    quantity: 20,
                },
            ];
            sinon.stub(connection, 'execute').resolves([products]);
        });
        after(() => {
            connection.execute.restore();
        });
        it('Deve retornar todos os produtos', async () => {
            const result = await productModel.getProducts();
            expect(result).to.be.an('array');
            expect(result).to.have.lengthOf(2);
            expect(result[0]).to.have.property('id');
            expect(result[0]).to.have.property('name');
            expect(result[0]).to.have.property('quantity');
        });
    });

    describe('Testa se a função findProductsById retorna um único produto', () => {
        before(() => {
            const product = [
                {
                    id: 1,
                    name: 'product1',
                    quantity: 10,
                },
            ];
            sinon.stub(connection, 'execute').resolves([product]);
        });
        after(() => {
            connection.execute.restore();
        });/* 
        it('Deve retornar um único produto', async () => {
            const result = await productModel.findProductsById(1);
            expect(result).to.be.an('array');
            expect(result).to.have.property('id');
            expect(result).to.have.property('name');
            expect(result).to.have.property('quantity');
        }); */
    });
});