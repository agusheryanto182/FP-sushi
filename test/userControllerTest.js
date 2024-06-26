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

describe('user controller', () => {
    describe("create admin", () => {
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
            const next = sinon.spy();

            await userController.createAdminCms(req, {}, next);

            const error = next.firstCall.args[0];

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

            const next = sinon.spy();

            await userController.createAdminCms(req, {}, next);

            const error = next.firstCall.args[0];

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

            const next = sinon.spy();

            await userController.createAdminCms(req, {}, next);

            const error = next.firstCall.args[0];

            expect(error.statusCode).to.equal(400);
        });
    });


    // describe('get admin', () => {
    //     let req;
    //     let res;
    //     let next;

    //     beforeEach(() => {
    //         req = {};
    //         res = {};
    //         next = sinon.stub();
    //         getAdmin = sinon.stub(Users, 'find');
    //     });

    //     afterEach(() => {
    //         getAdmin.restore();
    //     });

    //     it('should return 200 when get admin', async () => {
    //         req.query = {
    //             name: faker.person.fullName()
    //         }
    //         const next = sinon.spy();

    //         getAdmin.resolves();

    //         await userController.GetAdminCMS(req, res, next);

    //         const error = next.firstCall.args[0];

    //         expect(error.statusCode).to.equal(200);
    //     });
    // });


    // describe('delete admin', () => {
    //     let req;
    //     let res;
    //     let next;

    //     beforeEach(() => {
    //         req = {};
    //         res = {};
    //         next = sinon.stub();
    //         deleteAdmin = sinon.stub(Users, 'findOneAndDelete');
    //     });

    //     afterEach(() => {
    //         deleteAdmin.restore();
    //     });

    //     it('should return 200 when delete admin', async () => {
    //         req.params = {
    //             id: faker.string.uuid(),
    //             role: 'admin'
    //         }
    // res.status = sinon.stub().returns(res);
    // res.json = sinon.stub().returns(res);
    // deleteAdmin.resolves({});
    // await userController.DeleteAdminCMS(req, res, next);
    // expect(res.status.calledWith(200)).to.be.true;

    //         const next = sinon.spy();

    //         deleteAdmin.resolves({});

    //         await userController.DeleteAdminCMS(req, res, next);

    //         const error = next.firstCall.args[0];

    //         expect(error.statusCode).to.equal(200);
    //     });
    // });
});

