const sinon = require("sinon");
const { faker } = require('@faker-js/faker');
const Product = require('../app/api/v1/products/model');
const productService = require('../app/services/mongoose/productService');

let chai;
let expect;

before(async () => {
    chai = await import('chai');
    expect = chai.expect;
});

describe('product service', () => {
    describe('create product', () => {
        let checkNameStub;
        let createStub;
        const stubValue = {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.url(),
            category: "food",
        };

        const req = {
            body: {
                name: stubValue.name,
                price: stubValue.price,
                quantity: stubValue.quantity,
                image: stubValue.image,
                category: stubValue.category
            }
        }

        beforeEach(function () {
            checkNameStub = sinon.stub(Product, 'findOne');
            createStub = sinon.stub(Product, 'create');
        });

        afterEach(function () {
            checkNameStub.restore();
            createStub.restore();
        });

        it('should success when create product with valid data', async () => {
            checkNameStub.resolves(null);
            createStub.resolves(stubValue);
            const result = await productService.CreateProduct(req);
            expect(result).to.deep.equal(stubValue);
        });

        it('should throw conflict error when name already exists', async () => {
            checkNameStub.resolves(stubValue);
            createStub.resolves(stubValue);
            const error = await productService.CreateProduct(req).catch(error => error);
            expect(error.statusCode).to.equal(409);
        });
    });

    describe('get product', () => {
        beforeEach(function () {
            getAllProductStub = sinon.stub(Product, 'find');
        });

        afterEach(function () {
            getAllProductStub.restore();
        });

        const stubValue = [
            {
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: faker.image.url(),
                category: "food",
            },
            {
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: faker.image.url(),
                category: "food",
            }
        ];

        it('should success when get product with valid data', async () => {
            getAllProductStub.resolves(stubValue);
            const result = await productService.GetAllProducts();
            expect(result).to.deep.equal(stubValue);
        });
    });

    describe('delete product', () => {
        beforeEach(function () {
            deleteProductStub = sinon.stub(Product, 'findOneAndDelete');
        });

        afterEach(function () {
            deleteProductStub.restore();
        });

        const stubValue = {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.url(),
            category: "food",
        };

        it('should success when delete product with valid data', async () => {
            deleteProductStub.resolves(stubValue);
            const result = await productService.DeleteProduct(stubValue.id);
            expect(result).to.deep.equal(stubValue);
        });


        it('should throw not found error when product not found', async () => {
            deleteProductStub.resolves(null);
            const error = await productService.DeleteProduct(stubValue.id).catch(error => error);
            expect(error.statusCode).to.equal(404);
        });
    });

    describe('update product', () => {
        beforeEach(function () {
            checkNameStub = sinon.stub(Product, 'findOne');
            updateProductStub = sinon.stub(Product, 'findByIdAndUpdate');
        });

        afterEach(function () {
            checkNameStub.restore();
            updateProductStub.restore();
        });

        const stubValue = {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.url(),
            category: "food",
        };

        it('should success when update product with valid data', async () => {
            checkNameStub.resolves(null);
            updateProductStub.resolves(stubValue);
            const result = await productService.UpdateProduct(stubValue.id, stubValue);
            expect(result).to.deep.equal(stubValue);
        });


        it('should throw not found error when product not found', async () => {
            checkNameStub.resolves(null);
            updateProductStub.resolves(null);
            const error = await productService.UpdateProduct(stubValue.id, stubValue).catch(error => error);
            expect(error.statusCode).to.equal(404);
        });


        it('should throw conflict error when name already exists', async () => {
            checkNameStub.resolves(stubValue);
            updateProductStub.resolves(stubValue);
            const error = await productService.UpdateProduct(stubValue.id, stubValue).catch(error => error);
            expect(error.statusCode).to.equal(409);
        });
    });
});