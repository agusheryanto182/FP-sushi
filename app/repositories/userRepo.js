const Users = require('../api/v1/users/model');
const customError = require('../errors');


const Create = async ({ name, email, password, phone, role }) => {
    try {
        const user = await Users.create({ name, email, password, phone, role });
        return user;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const CheckEmail = async (email) => {
    try {
        const user = await Users.findOne({ email });
        return user !== null;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const GetAdmin = async (name) => {
    try {
        let query;
        if (name) {
            query = { name: { $regex: '^' + name, $options: 'i' }, role: 'admin' };
        } else {
            query = { role: 'admin' };
        }

        const user = await Users.find(query);

        if (!user) {
            throw new customError.NotFoundError('user not found');
        }
        return user;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const DeleteAdmin = async (id, role) => {
    try {
        const user = await Users.findOneAndDelete({ _id: id, role: role });
        if (!user) {
            throw new customError.NotFoundError('user not found');
        }
        return user;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const UpdateAdmin = async (id, name, password, email, phone, role) => {
    try {
        const user = await Users.findOneAndUpdate({ _id: id, role: role }, { name, password, email, phone });
        if (!user) {
            throw new customError.NotFoundError('user not found');
        }
        return user;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const GetUserByEmail = async (email, role) => {
    try {
        const user = await Users.findOne({ email, role });
        return user;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};


module.exports = {
    Create,
    CheckEmail,
    GetAdmin,
    DeleteAdmin,
    UpdateAdmin,
    GetUserByEmail
}