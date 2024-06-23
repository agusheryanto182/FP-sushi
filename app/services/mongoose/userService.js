const customError = require('../../errors');
const userRepo = require('../../repositories/userRepo');
const bcrypt = require('bcryptjs');

const CreateAdmin = async (name, email, password, phone) => {
    const isEmailExist = await userRepo.CheckEmail(email);
    if (isEmailExist) {
        throw new customError.ConflictError('email already exists');
    }

    const isPhoneExist = await userRepo.CheckPhone(phone);
    if (isPhoneExist) {
        throw new customError.ConflictError('phone already exists');
    }

    const role = 'admin';
    const result = await userRepo.Create({ name, email, password, phone, role });

    delete result._doc.password;

    return result;
};

const GetAdmin = async (name) => {
    const result = await userRepo.GetAdmin(name);

    for (let i = 0; i < result.length; i++) {
        delete result[i]._doc.password;
    }

    return result;
};

const DeleteAdmin = async (id, role) => {
    const result = await userRepo.DeleteAdmin(id, role);

    delete result._doc.password;
    return result;
};

const UpdateAdmin = async (id, name, email, password, phone, role) => {
    const isEmailExist = await userRepo.GetUserByEmail(email, role);
    if (isEmailExist && isEmailExist.id !== id) {
        throw new customError.ConflictError('email already exists');
    }

    const isPhoneExist = await userRepo.CheckPhone(phone, role);
    if (isPhoneExist && isPhoneExist.id !== id) {
        throw new customError.ConflictError('phone already exists');
    }

    if (password) {
        password = await bcrypt.hash(password, 10);
    }

    const result = await userRepo.UpdateAdmin(id, name, email, password, phone, role);

    delete result._doc.password;

    result.name = name;
    result.email = email;
    result.phone = phone;
    return result;
};

const GetUserById = async (id) => {
    const result = await userRepo.GetUserById(id);

    if (!result) {
        throw new customError.NotFoundError('user not found');
    }

    delete result._doc.password;
    return result;
};

module.exports = {
    CreateAdmin,
    GetAdmin,
    DeleteAdmin,
    UpdateAdmin,
    GetUserById,
};
