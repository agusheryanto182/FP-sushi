const Users = require('../../api/v1/users/model');
const { BadRequestError } = require('../../errors');

const CreateAdmin = async (req) => {
    const { name, password, confirmPassword, role, email, phoneNumber } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequestError('passwords do not match');
    }

    const result = await Users.create({
        name,
        email,
        password,
        phoneNumber,
        role
    });

    return result;
};

module.exports = { CreateAdmin };