const contactRepo = require('../../repositories/contactRepo');
const customError = require('../../errors');

const getContact = async () => {
    const contact = await contactRepo.getContact();
    return contact;
};

const updateContact = async (id, address, phone, email) => {
    const contact = await contactRepo.updateContact(id, address, phone, email);
    return contact;
};

const createContact = async (address, phone, email) => {
    const check = await contactRepo.getContact();
    if (check) {
        throw new customError.ConflictError('contact already exists');
    }
    const contact = await contactRepo.createContact(address, phone, email);
    return contact;
};

module.exports = {
    getContact,
    updateContact,
    createContact
};