const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/products.model');
const productsService = require('../../../services/products.service');

describe('Testando a camada de serviço do produto', () => {
    describe('Testando a função getAllProducts', () => {
        before(() => {
            const products = [
                {
                    id: 1,
                    name: 'product 1',
                    quantity: 10,
                },
                {
                    id: 2,
                    name: 'product 2',
                    quantity: 20,
                },
            ];
            sinon.stub(productsModel, 'getProducts').resolves(products);
        });
        after(() => {
            productsModel.getProducts.restore();
        });
        it('Deve retornar todos os produtos', async () => {
            const result = await productsService.getProducts();
            expect(result).to.be.an('array');
            expect(result).to.have.lengthOf(2);
        });
    });

    describe('Teste se a função getById retorna um produto', () => {
        before(() => {
            const product =
            {
                id: 1,
                name: 'product 1',
                quantity: 10,
            };
            sinon.stub(productsModel, 'findProductsById').resolves(product);
        });
        after(() => {
            productsModel.findProductsById.restore();
        });
        it('should return a single product', async () => {
            const result = await productsService.findByProductId(1);
            expect(result).to.be.an('object');
        });
    });

    describe('Testa se a função findProductsById retorna nulo', () => {
        before(() => {
            sinon.stub(productsModel, 'findProductsById').resolves(null);
        });
        after(() => {
            productsModel.findProductsById.restore();
        });
        /*  it('Deve retornar nulo para produtos', async () => {
             const result = await productsService.findByProductId();
             expect(result).to.be.undefined;
         }); */
    });
}); 