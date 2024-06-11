const sinon = require("sinon");
const { faker } = require('@faker-js/faker');
const userController = require('../app/api/v1/users/controller');
const Users = require('../app/api/v1/users/model');
const assert = require('assert');

let chai;
let expect;

before(async () => {
    chai = await import('chai');
    expect = chai.expect;
});

describe("user controller : create admin", () => {
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
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
        }

        const error = await userController.createAdminCms(req).catch(error => error);
        expect(error.message).to.equal('all fields are required');
        expect(error.statusCode).to.equal(400);
    });

    it('should throw bad request when password is less than 6 characters', async () => {
        req.body = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 5 }),
            confirmPassword: faker.internet.password({ length: 5 }),
            phone: faker.phone.number()
        }

        const error = await userController.createAdminCms(req).catch(error => error);
        expect(error.message).to.equal('password must be at least 6 characters');
        expect(error.statusCode).to.equal(400);
    });

    it('should throw bad request when email is invalid', async () => {
        req.body = {
            name: faker.person.fullName(),
            email: faker.internet.url,
            password: faker.internet.password({ length: 6 }),
            confirmPassword: faker.internet.password({ length: 6 }),
            phone: faker.phone.number()
        }

        const error = await userController.createAdminCms(req).catch(error => error);
        expect(error.message).to.equal('invalid email');
        expect(error.statusCode).to.equal(400);
    });
});
