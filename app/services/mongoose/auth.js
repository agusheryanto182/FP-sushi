const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createTokenUser, createJWT, createRefreshJWT } = require('../../utils');
const { createUserRefreshToken } = require('./refreshToken');
const { body, validationResult } = require('express-validator');
const signin = async (req) => {
    const { email, password } = req.body;

    // validation
    await body('email').isEmail().withMessage('invalid email').run(req);
    await body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array()[0].msg);
    }

    if (!email || !password) {
        throw new BadRequestError('all fields are required');
    }

    const result = await Users.findOne({ email: email });

    if (!result) {
        throw new UnauthorizedError('invalid credentials');
    }

    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('invalid credentials');
    }
    const token = createJWT({ payload: createTokenUser(result) });

    const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
    await createUserRefreshToken({
        refreshToken,
        user: result._id,
    });

    return { token, refreshToken, role: result.role, email: result.email };
};

module.exports = { signin };
