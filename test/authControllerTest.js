const sinon = require("sinon");
const { faker } = require('@faker-js/faker');
const authController = require('../app/api/v1/auth/controller');

let chai;
let expect;

before(async () => {
    chai = await import('chai');
    expect = chai.expect;
});

describe("auth controller : signin", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {};
        res = {};
        next = sinon.stub();
    });

    it('should throw bad request when field is empty', async () => {
        req.body = {
            email: '',
            password: ''
        }

        const error = await authController.signinCms(req).catch(error => error);
        expect(error.message).to.equal('all fields are required');
        expect(error.statusCode).to.equal(400);
    });

    it('should throw bad request when password is less than 6 characters', async () => {
        req.body = {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 5 })
        }

        const error = await authController.signinCms(req).catch(error => error);
        expect(error.message).to.equal('password must be at least 6 characters');
        expect(error.statusCode).to.equal(400);
    });

    it('should throw bad request when email is invalid', async () => {
        req.body = {
            email: faker.internet.url(),
            password: faker.internet.password({ length: 6 })
        }

        const error = await authController.signinCms(req).catch(error => error);
        expect(error.message).to.equal('invalid email');
        expect(error.statusCode).to.equal(400);
    });
});