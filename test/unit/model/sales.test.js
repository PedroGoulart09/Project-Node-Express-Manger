const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../connectBD/connect');
const saleModel = require('../../../models/sales.model');

describe('Testa a camada modelo ', () => {
    describe('Testa se a função getAllSales retorna todas as vendas', () => {
        before(() => {
            const sales = [
                {
                    saleId: 1,
                    date: "2022-04-09T18:06:01.000Z",
                    productId: 1,
                    quantity: 10,
                },
                {
                    saleId: 2,
                    date: "2022-04-09T18:06:01.000Z",
                    productId: 2,
                    quantity: 10,
                },
            ];
            sinon.stub(connection, 'execute').resolves([sales]);
        });
        after(() => {
            connection.execute.restore();
        });
        /*   it('Deve retornar todas as vendas', async () => {
              const result = await saleModel.getSales();
              expect(result).to.be.an('array');
              expect(result).to.have.lengthOf(1);
              expect(result[0]).to.have.property('saleId');
              expect(result[0]).to.have.property('date');
              expect(result[0]).to.have.property('productId');
              expect(result[0]).to.have.property('quantity');
          }); */
    });

    describe('Verifica se a função getById retorna todas as vendas para um dado id', () => {
        before(() => {
            const sales = [
                {
                    date: "2022-04-09T18:06:01.000Z",
                    productId: 1,
                    quantity: 5,
                },
                {
                    date: "2022-04-09T18:06:01.000Z",
                    productId: 2,
                    quantity: 10,
                }
            ]
            sinon.stub(connection, 'execute').resolves([sales]);
        });
        after(() => {
            connection.execute.restore();
        });
        /*  it('Deve retornar a venda quando usado um determinado id', async () => {
             const result = await saleModel.findSalesById(1);
             expect(result).to.be.an('array');
             expect(result).to.have.lengthOf(2);
         }); */
    });
}) 
