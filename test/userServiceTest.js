// const sinon = require('sinon');
// const { faker } = require('@faker-js/faker');
// const userService = require('../app/services/mongoose/userService')
// const Users = require('../app/api/v1/users/model');
// let chai;
// let expect;

// before(async () => {
//     chai = await import('chai');
//     expect = chai.expect;
// });

// describe('user service', () => {
//     describe('create admin', () => {

//         let checkEmailStub;
//         let createStub;

//         const stubValue = {
//             id: faker.string.uuid(),
//             name: faker.person.fullName(),
//             email: faker.internet.email(),
//             password: faker.internet.password(),
//             phone: "01234567890",
//             role: 'admin'
//         };


//         const req = {
//             body: {
//                 name: stubValue.name,
//                 email: stubValue.email,
//                 password: stubValue.password,
//                 confirmPassword: stubValue.password,
//                 phone: stubValue.phone,
//                 role: stubValue.role
//             }
//         }

//         beforeEach(function () {
//             checkEmailStub = sinon.stub(Users, 'findOne');
//             createStub = sinon.stub(Users, 'create');
//         });

//         afterEach(function () {
//             checkEmailStub.restore();
//             createStub.restore();
//         });

//         it('should success when create admin with valid data', async () => {

//             checkEmailStub.resolves(null);
//             createStub.resolves(stubValue);

//             const result = await userService.CreateAdmin(req);

//             expect(result).to.deep.equal(stubValue);
//         });

//         it('should throw conflict error when email already exists', async () => {
//             checkEmailStub.resolves({});
//             createStub.resolves(null);

//             try {
//                 await userService.CreateAdmin(req);
//             } catch (err) {
//                 expect(err.message).to.equal('email already exists');
//                 expect(err.statusCode).to.equal(409);
//             }
//         });
//     });

//     describe('get admin', () => {

//         const stubValue = [
//             {
//                 id: faker.string.uuid(),
//                 name: faker.person.fullName(),
//                 email: faker.internet.email(),
//                 password: faker.internet.password(),
//                 phone: "01234567890",
//                 role: 'admin'
//             },
//             {
//                 id: faker.string.uuid(),
//                 name: faker.person.fullName(),
//                 email: faker.internet.email(),
//                 password: faker.internet.password(),
//                 phone: "01234567890",
//                 role: 'admin'
//             }
//         ];


//         let getAdminStub;
//         beforeEach(function () {
//             getAdminStub = sinon.stub(Users, 'find');
//         });

//         afterEach(function () {
//             getAdminStub.restore();
//         });

//         it('should success when get admin without param name', async () => {
//             const req = {
//                 params: {
//                     name: ''
//                 }
//             }
//             getAdminStub.resolves(stubValue);
//             const result = await userService.GetAdmin(req);
//             expect(result).to.deep.equal(stubValue);
//         });

//         it('should success when get admin with param name', async () => {
//             const req = {
//                 params: {
//                     name: stubValue.name
//                 }
//             }
//             getAdminStub.resolves(stubValue);
//             const result = await userService.GetAdmin(req);
//             expect(result).to.deep.equal(stubValue);
//         });
//     });


//     describe('delete admin', () => {

//         const stubValue = {
//             id: faker.string.uuid(),
//             name: faker.person.fullName(),
//             email: faker.internet.email(),
//             password: faker.internet.password(),
//             phone: "01234567890",
//             role: 'admin'
//         };


//         let deleteAdminStub;
//         beforeEach(function () {
//             deleteAdminStub = sinon.stub(Users, 'findOneAndDelete');
//         });

//         afterEach(function () {
//             deleteAdminStub.restore();
//         });

//         it('should success when delete admin', async () => {
//             const req = {
//                 params: {
//                     id: stubValue.id,
//                     role: 'admin'
//                 }
//             }
//             deleteAdminStub.resolves(stubValue);
//             const result = await userService.DeleteAdmin(req);
//             expect(result).to.deep.equal(stubValue);
//         });


//         it('should throw not found error when admin not found', async () => {
//             const req = {
//                 params: {
//                     id: stubValue.id,
//                     role: 'admin'
//                 }
//             }
//             deleteAdminStub.resolves(null);
//             try {
//                 await userService.DeleteAdmin(req);
//             } catch (err) {
//                 expect(err.message).to.equal('user not found');
//                 expect(err.statusCode).to.equal(404);
//             }
//         });
//     });

//     describe('update admin', () => {
//         const stubValue = {
//             id: faker.string.uuid(),
//             name: faker.person.fullName(),
//             email: faker.internet.email(),
//             password: faker.internet.password(),
//             phone: "01234567890",
//             role: 'admin'
//         };
//         const req = {
//             params: {
//                 id: stubValue.id,
//                 role: 'admin'
//             },
//             body: {
//                 name: stubValue.name,
//                 email: stubValue.email,
//                 password: stubValue.password,
//                 confirmPassword: stubValue.password,
//                 phone: stubValue.phone
//             }
//         }
//         let updateAdminStub;
//         beforeEach(function () {
//             getUserByEmail = sinon.stub(Users, 'findOne');
//             updateAdminStub = sinon.stub(Users, 'findOneAndUpdate');
//         });

//         afterEach(function () {
//             getUserByEmail.restore();
//             updateAdminStub.restore();
//         });

//         it('should success when update admin', async () => {
//             getUserByEmail.resolves(null);
//             updateAdminStub.resolves(stubValue);
//             const result = await userService.UpdateAdmin(req);
//             expect(result).to.deep.equal(stubValue);
//         });

//         it('should throw not found error when admin not found', async () => {
//             getUserByEmail.resolves(null);
//             updateAdminStub.resolves(null);
//             try {
//                 await userService.UpdateAdmin(req);
//             } catch (err) {
//                 expect(err.message).to.equal('user not found');
//                 expect(err.statusCode).to.equal(404);
//             }
//         });

//         it('should throw conflict error when email already exists', async () => {
//             getUserByEmail.resolves(stubValue);
//             updateAdminStub.resolves(null);
//             try {
//                 await userService.UpdateAdmin(req);
//             } catch (err) {
//                 expect(err.message).to.equal('email already exists');
//                 expect(err.statusCode).to.equal(409);
//             }
//         });
//     });
// });
