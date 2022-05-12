const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/sales.model');
const salesService = require('../../../services/sales.service');
const { object } = require('joi');

describe('Testando a camada de serviço', () => {
    describe('Testando a função getAll', () => {
        before(() => {
            const sales = [
                {
                    sale_id: 1,
                    date: "2022-04-09T18:06:01.000Z",
                    productId: 1,
                    quantity: 10,
                },
                {
                    sale_id: 2,
                    date: "2022-04-09T18:06:01.000Z",
                    productId: 2,
                    quantity: 10,
                },
            ];
            sinon.stub(salesModel, 'getSales').returns(sales);
        });
        after(() => {
            salesModel.getSales.restore();
        });
        /* it('Deve retornar todas as vendas', async () => {
            const result = await salesService.getSales();
            expect(result).to.be.an('array');
            expect(result).to.have.lengthOf(2);
        }); */
    });

    describe('Testando se a função getSalesById retorna uma única venda', () => {
        before(() => {
            const sale = [
                {
                    date: "2022-04-09T18:06:01.000Z",
                    productId: 1,
                    quantity: 5,
                }
            ];
            sinon.stub(salesModel, 'findSalesById').returns(sale);
        });
        after(() => {
            salesModel.findSalesById.restore();
        });

        // it ('should return a single sale', async () => {
        //   const result = await salesService.salesById();
        //   expect (result).to.be.an('array');
        // });
    });
});