// bikin CRUD our service controller
const customError = require('../../../errors');
const ourServiceSvc = require('../../../services/mongoose/ourService');
const { body, validationResult } = require('express-validator');
const imageService = require('../../../services/mongoose/imagesService');

const CreateOurServiceCMS = async (req, res, next) => {
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

        const resultImages = await imageService.generateUrlImage({ file: req.file });

        if (!resultImages) {
            throw new customError.InternalServerError('failed to upload image');
        }

        const result = await ourServiceSvc.createOurService(title, description, resultImages);
        res.status(201).json({ token: result });
    } catch (err) {
        next(err);
    }
};

const GetAllOurService = async (req, res, next) => {
    try {
        const result = await ourServiceSvc.getAllOurService();
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const UpdateOurServiceCMS = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageFile = req.file;
    let imageUrl;

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

        if (imageFile) {
            imageUrl = await imageService.generateUrlImage({ file: req.file });
            if (!imageUrl) {
                throw new customError.InternalServerError('failed to upload image');
            }
        }

        const result = await ourServiceSvc.updateOurService(id, title, description, imageUrl);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const DeleteOurServiceCMS = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await ourServiceSvc.deleteOurService(id);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    CreateOurServiceCMS,
    GetAllOurService,
    UpdateOurServiceCMS,
    DeleteOurServiceCMS
};