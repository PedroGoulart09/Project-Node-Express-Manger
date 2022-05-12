const sinon = require('sinon');
const { expect } = require('chai');
const saleService = require('../../../services/sales.service');
const saleController = require('../../../controllers/sales.controller');

describe('Testa a camada de controla para venda', () => {
    const request = {};
    const response = {};
    const sale = [
        {
            sale_id: 1,
            date: "2022-04-09T18:06:01.000Z",
            productId: 1,
            quantity: 5,
        }
    ];
    describe('Testa a função allSales', () => {
        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(saleService, 'getSales').resolves(sale);
        });
        after(() => {
            saleService.getSales.restore();
        });

        it('Verifica se a requisição tem status 200', async () => {
            await saleController.getSales(request, response);
            expect(response.status.calledWith(200)).to.be.equal(true);
            expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
        });
    });

    describe('Testa a função findSalesById', () => {
        before(() => {
            request.params = { id: 1 };
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(saleService, 'findSalesById').resolves(sale);
        });
        after(() => {
            saleService.findSalesById.restore();
        });

        it('Verifica se a requisição tem status 200', async () => {
            await saleController.findSalesById(request, response);
            expect(response.status.calledWith(200)).to.be.true;
            expect(response.json.calledWith(sinon.match.array)).to.be.true;
        });
    });

    describe('Testa se a função findSalesById gera error', () => {
        before(() => {
            response.send = sinon.stub().returns();
            sinon.stub(saleService, 'findSalesById').resolves(false);
        })
        after(() => {
            saleService.findSalesById.restore();
        });

        it('Verifica se a requisição tem status 400', async () => {
            await saleController.findSalesById(request, response);
            expect(response.status.calledWith(404)).to.be.false;
        });
    });
});