const About = require('../api/v1/about/model');
const customError = require('../errors');

const getAbout = async () => {
    try {
        const result = await About.find().sort({ numberOfContent: 1 });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const getAboutById = async (id) => {
    try {
        const result = await About.findById(id);
        if (!result) {
            throw new customError.NotFoundError('about not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const createAbout = async (title, description, imageUrl, numberOfContent) => {
    try {
        const result = await About.create({ title, description, imageUrl, numberOfContent });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};


const updateAbout = async (id, title, description, imageUrl, numberOfContent) => {
    try {
        const result = await About.findByIdAndUpdate(id, { title, description, imageUrl, numberOfContent }, { new: true });
        if (!result) {
            throw new customError.NotFoundError('about not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const deleteAbout = async (id) => {
    try {
        const result = await About.findByIdAndDelete(id);
        if (!result) {
            throw new customError.NotFoundError('about not found');
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
    getAbout,
    createAbout,
    updateAbout,
    deleteAbout,
    getAboutById
};