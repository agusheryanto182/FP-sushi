// bikin CRUD our service controller
const customError = require('../../../errors');
const ourServiceService = require('../../../services/mongoose/ourServiceService');
const { body, validationResult } = require('express-validator');
const imageService = require('../../../services/mongoose/imagesService');

const CreateOurService = async (req, res, next) => {
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

        const result = await ourServiceService.createOurService(title, description, resultImages);
        res.status(201).json({ token: result });
    } catch (err) {
        next(err);
    }
};

module.exports = { CreateOurService }