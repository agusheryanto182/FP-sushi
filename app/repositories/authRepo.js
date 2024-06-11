const Users = require('../api/v1/users/model');
const { InternalServerError, NotFoundError } = require('../errors');

const GetUserByEmail = async (email) => {
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            throw new NotFoundError('user not found', 404);
        }
        return user;
    } catch (err) {
        if (err instanceof NotFoundError) {
            throw err;
        }
        throw new InternalServerError(err);
    }
};
module.exports = { GetUserByEmail };
