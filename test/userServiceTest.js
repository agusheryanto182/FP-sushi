const sinon = require('sinon');
const { faker } = require('@faker-js/faker');
const userService = require('../app/services/mongoose/userService')
const Users = require('../app/api/v1/users/model');
let chai;
let expect;

before(async () => {
    chai = await import('chai');
    expect = chai.expect;
});

describe('user service : create admin', () => {

    let checkEmailStub;
    let createStub;

    const stubValue = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: "01234567890",
        role: 'admin'
    };


    const req = {
        body: {
            name: stubValue.name,
            email: stubValue.email,
            password: stubValue.password,
            confirmPassword: stubValue.password,
            phone: stubValue.phone,
            role: stubValue.role
        }
    }

    beforeEach(function () {
        checkEmailStub = sinon.stub(Users, 'findOne');
        createStub = sinon.stub(Users, 'create');
    });

    afterEach(function () {
        checkEmailStub.restore();
        createStub.restore();
    });

    it('should success when create admin with valid data', async () => {

        checkEmailStub.resolves(null);
        createStub.resolves(stubValue);

        const result = await userService.CreateAdmin(req);

        expect(result).to.deep.equal(stubValue);
    });

    it('should throw conflict error when email already exists', async () => {
        checkEmailStub.resolves({});
        createStub.resolves(null);

        try {
            await userService.CreateAdmin(req);
        } catch (err) {
            expect(err.message).to.equal('email already exists');
            expect(err.statusCode).to.equal(409);
        }
    });
});

describe('user service : get admin', () => {

    const stubValue = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: "01234567890",
        role: 'admin'
    };

    const req = {
        params: {
            name: stubValue.name
        }
    }

    let getAdminStub;
    beforeEach(function () {
        getAdminStub = sinon.stub(Users, 'findOne');
    });

    afterEach(function () {
        getAdminStub.restore();
    });

    it('should success when get admin', async () => {
        getAdminStub.resolves(stubValue);
        const result = await userService.GetAdmin(req);
        expect(result).to.deep.equal(stubValue);
    });
});