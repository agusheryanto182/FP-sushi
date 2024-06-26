const Users = require('../api/v1/users/model');
const customError = require('../errors');

const GetUserByEmail = async (email) => {
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            throw new customError.NotFoundError('user not found', 404);
        }
        return user;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const UpdateLastLogin = async (email) => {
    try {
        const result = await Users.findOneAndUpdate({ email }, { lastLogin: new Date() }, { new: true });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

module.exports = {
    GetUserByEmail,
    UpdateLastLogin
};
