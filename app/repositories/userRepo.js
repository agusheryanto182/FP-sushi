const Users = require('../api/v1/users/model');
const { InternalServerError } = require('../errors');


const Create = async ({ name, email, password, phone, role }) => {
    try {
        const user = await Users.create({ name, email, password, phone, role });
        return user;
    } catch (err) {
        throw new InternalServerError(err);
    }
}

const CheckEmail = async (email) => {
    try {
        const user = await Users.findOne({ email });
        return user !== null;
    } catch (err) {
        throw new InternalServerError(err);
    }
}

module.exports = {
    Create,
    CheckEmail
}