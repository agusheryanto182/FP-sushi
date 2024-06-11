const { UnauthorizedError, InternalServerError } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');
const { GetUserByEmail } = require('../../repositories/authRepo');
const signin = async (email, password) => {
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
