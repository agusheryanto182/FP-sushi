const customError = require('../../errors');
const userRepo = require('../../repositories/userRepo');

const CreateAdmin = async (name, password, role, email, phone) => {
    const isEmailExist = await userRepo.CheckEmail(email);
    if (isEmailExist) {
        throw new customError.ConflictError('email already exists');
    }
    const result = await userRepo.Create({ name, password, role, email, phone });

    return result;
};

const GetAdmin = async (name) => {
    const result = await userRepo.GetAdmin(name);
    return result;
};

const DeleteAdmin = async (id, role) => {
    const result = await userRepo.DeleteAdmin(id, role);
    return result;
};

const UpdateAdmin = async (id, name, password, email, phone, role) => {
    const isEmailExist = await userRepo.GetUserByEmail(email, role);
    if (isEmailExist && isEmailExist.id !== id) {
        throw new customError.ConflictError('email already exists');
    }

    const result = await userRepo.UpdateAdmin(id, name, password, email, phone, role);
    return result;
};

module.exports = {
    CreateAdmin,
    GetAdmin,
    DeleteAdmin,
    UpdateAdmin
};
