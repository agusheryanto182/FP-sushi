const customError = require('../../../errors');
const offerService = require('../../../services/mongoose/offerService');
const { body, validationResult } = require('express-validator');
const imageService = require('../../../services/mongoose/imagesService');

const createOfferCMS = async (req, res, next) => {

    const { title, description } = req.body;
    // validation
    await body('title').isString().withMessage('title must be a string').run(req);
    await body('description').isString().withMessage('description must be a string').run(req);
    const errors = validationResult(req);

    console.log(title, description);

    try {
        if (!title || !description) {
            throw new customError.BadRequestError('all fields are required');
        }
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        const imageUrl = await imageService.generateUrlImage({ file: req.file });

        console.log(imageUrl);

        if (!imageUrl) {
            throw new customError.InternalServerError('failed to upload image');
        }

        const result = await offerService.CreateOffer(title, description, imageUrl);
        res.status(201).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const getAllOffers = async (req, res, next) => {
    try {
        const result = await offerService.GetAllOffers();
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const updateOfferCMS = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    // validation
    await body('title').isString().withMessage('title must be a string').run(req);
    await body('description').isString().withMessage('description must be a string').run(req);
    const errors = validationResult(req);
    try {
        if (!title || !description) {
            throw new customError.BadRequestError('all fields are required');
        }
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        const imageUrl = await imageService.generateUrlImage({ file: req.file });
        if (!imageUrl) {
            throw new customError.InternalServerError('failed to upload image');
        }

        const result = await offerService.UpdateOffers(id, title, description, imageUrl);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const deleteOfferCMS = async (req, res, next) => {
    const { id } = req.params;

    console.log(id)
    try {
        const result = await offerService.DeleteOffers(id);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createOfferCMS,
    getAllOffers,
    updateOfferCMS,
    deleteOfferCMS
};