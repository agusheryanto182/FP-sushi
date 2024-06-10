const sinon = require("sinon");
const { faker } = require('@faker-js/faker');
const { signin } = require('../app/services/mongoose/auth');
const Users = require('../app/api/v1/users/model');
const { StatusCodes } = require("http-status-codes");
let chai;
let expect;

before(async () => {
    chai = await import('chai');
    expect = chai.expect;
});

describe("auth", () => {
    it('should return 400 when field is empty', async () => {
        const req = {
            body: {
                email: '',
                password: ''
            }
        }

        try {
            await signin(req);
        } catch (error) {
            expect(error.statusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(error.message).to.equal('all fields are required');
        }
    });

    it('should return 400 when password is less than 6 characters', async () => {
        const req = {
            body: {
                email: faker.internet.email(),
                password: faker.internet.password({ length: 5 })
            }
        }

        try {
            await signin(req);
        } catch (error) {
            expect(error.statusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(error.message).to.equal('password must be at least 6 characters');
        }
    });

    it('should return 400 when email is invalid', async () => {
        const req = {
            body: {
                email: faker.internet.url(),
                password: faker.internet.password({ length: 6 })
            }
        }

        try {
            await signin(req);
        } catch (error) {
            expect(error.statusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(error.message).to.equal('invalid email');
        }
    });

    it('should return 401 when email or password is wrong', async () => {
        const req = {
            body: {
                email: faker.internet.email(),
                password: faker.internet.password({ length: 6 })
            }
        };

        const usersStub = sinon.stub(Users, 'findOne').resolves(null);
        try {
            await signin(req);
        } catch (error) {
            expect(error.statusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(error.message).to.equal('invalid credentials');
        }

        usersStub.restore();
    });

    it('should return 200 when email and password is correct', async () => {
        const req = {
            body: {
                email: faker.internet.email(),
                password: faker.internet.password({ length: 6 })
            }
        };

        const stubValue = {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            phoneNumber: faker.phone.number(),
            role: 'admin',
            comparePassword: () => true,
        };

        const usersStub = sinon.stub(Users, 'findOne').resolves(stubValue);

        try {
            const result = await signin(req);
            expect(usersStub.calledOnce).to.be.true;
            expect(result).to.deep.equal({
                token: result.token,
                role: 'admin',
                email: stubValue.email
            });
        } catch (error) {
            expect(error).to.be.equal(null);
        }

        usersStub.restore();
    });
});