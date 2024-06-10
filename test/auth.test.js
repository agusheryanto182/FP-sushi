const request = require('request');

let chai;
let expect;

before(async () => {
    chai = await import('chai');
    expect = chai.expect;
});

let url = 'http://localhost:9000/api/v1/cms/auth/signin';

describe("auth", () => {
    it('signin : all field are required', (done) => {
        request.post(url, {
            json: {
                email: '',
                password: ''
            }
        }, (err, res, body) => {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).to.equal(400);
                done();
            }
        });
    });

    it('signin : invalid email', (done) => {
        request.post(url, {
            json: {
                email: 'test',
                password: 'test'
            }
        }, (err, res, body) => {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).to.equal(400);
                done();
            }
        });
    });

    it('signin : invalid password', (done) => {
        request.post(url, {
            json: {
                email: 'test@gmail.com',
                password: 'test'
            }
        }, (err, res, body) => {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).to.equal(400);
                done();
            }
        });
    });

    it('signin : invalid credentials', (done) => {
        request.post(url, {
            json: {
                email: 'agusheryanto@gmail.com',
                password: 'invalidpassword'
            }
        }, (err, res, body) => {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).to.equal(401);
                done();
            }
        });
    });

    it('signin : success', (done) => {
        request.post(url, {
            json: {
                email: 'agusheryanto@gmail.com',
                password: 'password123'
            }
        }, (err, res, body) => {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).to.equal(200);
                done();
            }
        });
    });
});