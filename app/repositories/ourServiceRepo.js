const OurService = require('../api/v1/ourService/model');
const customError = require('../errors');

const getAllOurService = async () => {
    try {
        const result = await OurService.find().sort({ createdAt: -1 });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const getOurServiceById = async (id) => {
    try {
        const result = await OurService.findById(id);
        if (!result) {
            throw new customError.NotFoundError('our service not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const createOurService = async (title, description, imageUrl) => {
    try {
        const result = await OurService.create({ title, description, imageUrl });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const updateOurService = async (id, title, description, imageUrl) => {
    try {
        const result = await OurService.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true });
        if (!result) {
            throw new customError.NotFoundError('our service not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const deleteOurService = async (id) => {
    try {
        const result = await OurService.findByIdAndDelete(id);
        if (!result) {
            throw new customError.NotFoundError('our service not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

module.exports = {
    getAllOurService,
    getOurServiceById,
    createOurService,
    updateOurService,
    deleteOurService
};  