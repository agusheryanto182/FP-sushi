const sinon = require("sinon");
const { faker } = require('@faker-js/faker');
const { CreateAdmin } = require('../app/services/mongoose/userService');
const Users = require('../app/api/v1/users/model');
let chai;
let expect;

before(async () => {
    chai = await import('chai');
    expect = chai.expect;
});

describe('user service : create admin', () => {
    it('should return 201 when create admin', async () => {
        const stubValue = {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            phoneNumber: faker.phone.number(),
            role: 'admin'
        };

        const usersStub = sinon.stub(Users, 'create').resolves(stubValue);

        const req = {
            body: {
                name: stubValue.name,
                password: stubValue.password,
                confirmPassword: stubValue.password,
                role: stubValue.role,
                email: stubValue.email,
                phoneNumber: stubValue.phoneNumber
            }
        };

        const result = await CreateAdmin(req);

        expect(usersStub.calledOnce).to.be.true;

        expect(result).to.deep.equal(stubValue);

        usersStub.restore();
    });
});