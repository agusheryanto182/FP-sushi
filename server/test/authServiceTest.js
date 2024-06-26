const sinon = require("sinon");
const { faker } = require('@faker-js/faker');
const { signin } = require('../app/services/mongoose/authService');
const Users = require('../app/api/v1/users/model');

let chai;
let expect;

before(async () => {
    chai = await import('chai');
    expect = chai.expect;
});

describe('auth service', () => {
    describe("signin", () => {
        let req;
        let res;
        let next;

        beforeEach(() => {
            req = {};
            res = {};
            next = sinon.stub();
        });

        // it('should throw bad request when field is empty', async () => {
        //     req.body = {
        //         email: '',
        //         password: ''
        //     }

        //     const error = await signin(req).catch(error => error);
        //     expect(error.message).to.equal('all fields are required');
        //     expect(error.statusCode).to.equal(400);
        // });

        // it('should throw bad request when password is less than 6 characters', async () => {
        //     req.body = {
        //         email: faker.internet.email(),
        //         password: faker.internet.password({ length: 5 })
        //     }

        //     const error = await signin(req).catch(error => error);
        //     expect(error.message).to.equal('password must be at least 6 characters');
        //     expect(error.statusCode).to.equal(400);
        // });

        // it('should throw bad request when email is invalid', async () => {
        //     req.body = {
        //         email: faker.internet.url(),
        //         password: faker.internet.password({ length: 6 })
        //     }

        //     const error = await signin(req).catch(error => error);
        //     expect(error.message).to.equal('invalid email');
        //     expect(error.statusCode).to.equal(400);
        // });

        it('should throw unauthorized when email or password is wrong', async () => {
            const stubValue = {
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                phoneNumber: faker.phone.number(),
                role: 'admin',
                comparePassword: () => false,
            };

            req.body = {
                email: stubValue.email,
                password: stubValue.password
            };

            const usersStub = sinon.stub(Users, 'findOne').resolves(stubValue);
            const error = await signin(req).catch(error => error);
            expect(error.message).to.equal('invalid credentials');
            expect(error.statusCode).to.equal(401);

            usersStub.restore();
        });
        it('should success when email and password is correct', async () => {
            const stubValue = {
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                phoneNumber: faker.phone.number(),
                role: 'admin',
                comparePassword: () => true,
            };

            req.body = {
                email: stubValue.email,
                password: stubValue.password
            };

            const usersStub = sinon.stub(Users, 'findOne').resolves(stubValue);

            const result = await signin(req);
            expect(usersStub.calledOnce).to.be.true;
            expect(result).to.deep.equal({
                token: result.token,
                role: 'admin',
                email: stubValue.email
            });

            usersStub.restore();
        });
        it('should throw not found when user not found', async () => {
            req.body = {
                email: faker.internet.email(),
                password: faker.internet.password({ length: 6 })
            };

            const usersStub = sinon.stub(Users, 'findOne').resolves(null);
            const error = await signin(req).catch(error => error);
            expect(error.statusCode).to.equal(404);

            usersStub.restore();
        });
    });
});

