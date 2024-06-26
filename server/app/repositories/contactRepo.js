const Contact = require('../api/v1/contact/model');
const customError = require('../errors');

const getContact = async () => {
    try {
        const result = await Contact.findOne();
        return result;
    } catch (err) {

        throw new customError.InternalServerError(err);
    }
};

const updateContact = async (id, address, phone, email) => {
    try {
        const result = await Contact.findByIdAndUpdate(id, { address, phone, email }, { new: true });
        if (!result) {
            throw new customError.NotFoundError('contact not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const createContact = async (address, phone, email) => {
    try {
        const result = await Contact.create({ address, phone, email });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};


module.exports = {
    getContact,
    updateContact,
    createContact,
};