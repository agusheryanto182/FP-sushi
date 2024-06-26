const customError = require('../../../errors');
const heroService = require('../../../services/mongoose/heroService');
const imageService = require('../../../services/mongoose/imagesService');
const { body, validationResult } = require('express-validator');

const getHero = async (req, res, next) => {
    try {
        const result = await heroService.getAllHero();
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const createHeroCMS = async (req, res, next) => {
    const { title } = req.body;
    try {
        // validation
        if (!title) {
            throw new customError.BadRequestError('title is required');
        }

        await body('title').isString().withMessage('title must be a string').run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        if (!req.file) {
            throw new customError.BadRequestError('image is required');
        }
        const imageUrl = await imageService.generateUrlImage({ file: req.file });
        if (!imageUrl) {
            throw new customError.InternalServerError('failed to upload image');
        }
        const result = await heroService.createHero(title, imageUrl);
        res.status(201).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const updateHeroCMS = async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;
    const imageFile = req.file;

    try {
        await body('title').isString().withMessage('title must be a string').run(req);
        const errors = validationResult(req);
        let imageUrl;

        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        if (imageFile) {
            imageUrl = await imageService.generateUrlImage({ file: imageFile });
            if (!imageUrl) {
                throw new customError.InternalServerError('failed to upload image');
            }
        }

        const result = await heroService.updateHero(id, title, imageUrl);
        res.status(200).json({ data: result });
        return;
    } catch (err) {
        next(err);
    }
};

const deleteHeroCMS = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await heroService.deleteHero(id);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getHero,
    createHeroCMS,
    updateHeroCMS,
    deleteHeroCMS
};