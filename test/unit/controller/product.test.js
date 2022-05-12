const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');

describe('Testa a camada de controle do produto', () => {
    const request = {};
    const response = {};
    const product = [
        {
            id: 1,
            name: 'product 1',
            quantity: 10,
        },
    ];
    describe('Testa a função getAll', () => {
        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(productsService, 'getProducts').resolves(product);
        })
        after(() => {
            productsService.getProducts.restore();
        });

        it('Testa se a requisição tem o status 200', async () => {
            await productsController.getProducts(request, response);
            expect(response.status.calledWith(200)).to.be.equal(true);
            expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
        });
    });

    describe('Testa a função findByProductId', () => {
        before(() => {
            request.params = { id: 1 };
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(productsService, 'findByProductId').resolves(product);
        })
        after(() => {
            productsService.findByProductId.restore();
        });

        it('Testa se a requisition tem o status 200', async () => {
            await productsController.findByProductId(request, response);
            expect(response.status.calledWith(200)).to.be.true;
            expect(response.json.calledWith(sinon.match.array)).to.be.false;
        });
    });

    describe('Testa se a função findByProductId gera erro', () => {
        before(() => {
            response.send = sinon.stub().returns();
            sinon.stub(productsService, 'findByProductId').resolves(false);
        })
        after(() => {
            productsService.findByProductId.restore();
        });

        it('Verifica se a requisição tem o status 404', async () => {
            await productsController.findByProductId(request, response);
            expect(response.status.calledWith(404)).to.be.false;
        });
    });
});