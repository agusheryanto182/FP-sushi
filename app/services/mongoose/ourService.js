// bikin CRUD our service nya

const OurService = require('../../api/v1/ourService/model');
const customError = require('../../errors');

const CreateOurService = async (title, description, imageUrl) => {
    try {
        const result = await OurService.create({ title, description, imageUrl });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

module.exports = { CreateOurService };