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
    it('should return 201 when create admin', async () => {
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

        const checkEmailStub = sinon.stub(Users, 'findOne').resolves(null);
        const createStub = sinon.stub(Users, 'create').resolves(stubValue);

        const result = await userService.CreateAdmin(req);

        expect(result).to.deep.equal(stubValue);

        checkEmailStub.restore();
        createStub.restore();
    });
});