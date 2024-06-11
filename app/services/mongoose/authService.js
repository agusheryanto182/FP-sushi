const { BadRequestError, UnauthorizedError, InternalServerError } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');
const { body, validationResult } = require('express-validator');
const { GetUserByEmail } = require('../../repositories/authRepo');
const signin = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('all fields are required');
    }

    // validation
    await body('email').isEmail().withMessage('invalid email').run(req);
    await body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array()[0].msg);
    }

    const result = await GetUserByEmail(email);

    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('invalid credentials');
    }
    const token = await createJWT({ payload: createTokenUser(result) });
    if (!token) {
        throw new InternalServerError('failed to create token');
    }

    return { token, role: result.role, email: result.email };
};

module.exports = { signin };
