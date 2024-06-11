const { BadRequestError, ConflictError } = require('../../errors');
const userRepo = require('../../repositories/userRepo');

const CreateAdmin = async (name, password, confirmPassword, role, email, phone) => {
    const isEmailExist = await userRepo.CheckEmail(email);
    if (isEmailExist) {
        throw new ConflictError('email already exists');
    }
    const result = await userRepo.Create({ name, password, role, email, phone });

    return result;
};

const GetAdmin = async (name) => {
    const result = await userRepo.GetAdmin(name);
    return result;
};

module.exports = {
    CreateAdmin,
    GetAdmin
};
