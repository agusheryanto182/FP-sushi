const aboutService = require('../../../services/mongoose/aboutService');
const { body, validationResult } = require('express-validator');
const customError = require('../../../errors');
const imageService = require('../../../services/mongoose/imagesService');

const CreateAboutCMS = async (req, res, next) => {
    const { title, description, numberOfContent } = req.body;
    const imageFile = req.file;

    try {
        if (!title || !description || !imageFile || !numberOfContent) {
            throw new customError.BadRequestError('all fields are required');
        }

        await body('title').isString().withMessage('title must be a string').run(req);
        await body('description').isString().withMessage('description must be a string').run(req);
        await body('numberOfContent').isInt({ min: 1, max: 3 }).withMessage('numberOfContent must be an integer between 1 and 3').run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        const imageUrl = await imageService.generateUrlImage({ file: imageFile });
        if (!imageUrl) {
            throw new customError.InternalServerError('failed to upload image');
        }

        const result = await aboutService.createAbout(title, description, imageUrl, numberOfContent);
        res.status(201).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const GetAbout = async (req, res, next) => {
    try {
        const result = await aboutService.getAbout();
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const UpdateAboutCMS = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, numberOfContent } = req.body;
    const imageFile = req.file;
    let imageUrl;
    try {
        if (!title || !description || !numberOfContent) {
            throw new customError.BadRequestError('all fields are required');
        }

        await body('title').isString().withMessage('title must be a string').run(req);
        await body('description').isString().withMessage('description must be a string').run(req);
        await body('numberOfContent').isInt({ min: 1, max: 3 }).withMessage('numberOfContent must be an integer between 1 and 3').run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        if (imageFile) {
            imageUrl = await imageService.generateUrlImage({ file: imageFile });
            if (!imageUrl) {
                throw new customError.InternalServerError('failed to upload image');
            }
        }
        const result = await aboutService.updateAbout(id, title, description, imageUrl, numberOfContent);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const DeleteAboutCMS = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await aboutService.deleteAbout(id);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    CreateAboutCMS,
    GetAbout,
    UpdateAboutCMS,
    DeleteAboutCMS
};
