const customError = require('../errors');
const Hero = require('../api/v1/hero/model');

const getAllHero = async () => {
    try {
        const result = await Hero.find().sort({ createdAt: -1 });
        return result;
    } catch (error) {
        throw new customError.InternalServerError(error);
    }
};

const createHero = async (title, imageUrl) => {
    try {
        const result = await Hero.create({ title, imageUrl });
        return result;
    } catch (error) {
        throw new customError.InternalServerError(error);
    }
};

const updateHero = async (id, title, imageUrl) => {
    try {
        const result = await Hero.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
        if (!result) {
            throw new customError.NotFoundError('Hero not found');
        }
        return result;
    } catch (error) {
        throw new customError.InternalServerError(error);
    }
};


const deleteHero = async (id) => {
    try {
        const result = await Hero.findByIdAndDelete(id);
        if (!result) {
            throw new customError.NotFoundError('hero not found');
        }
        return result;
    } catch (error) {
        throw new customError.InternalServerError(error);
    }
};

const getHeroById = async (id) => {
    try {
        const result = await Hero.findById(id);
        if (!result) {
            throw new customError.NotFoundError('hero not found');
        }
        return result;
    } catch (error) {
        throw new customError.InternalServerError(error);
    }
};


module.exports = {
    getAllHero,
    createHero,
    updateHero,
    deleteHero,
    getHeroById
};