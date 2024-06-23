const customError = require('../../../errors');
const ourTeamService = require('../../../services/mongoose/ourTeamService');
const { body, validationResult } = require('express-validator');
const imageService = require('../../../services/mongoose/imagesService');


const getOurTeam = async (req, res, next) => {
    try {
        const result = await ourTeamService.getOurTeam();
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const updateOurTeamCMS = async (req, res, next) => {
    const { id } = req.params;
    const { name, nim, instagramUrl, githubUrl } = req.body;
    const imageFile = req.file;
    let imageUrl;
    try {
        if (!name || !nim || !instagramUrl || !githubUrl) {
            throw new customError.BadRequestError('all fields are required');
        }

        await body('name').isString().withMessage('name must be a string').run(req);
        await body('nim').isString().withMessage('nim must be a string').run(req);
        await body('instagramUrl').isString().withMessage('instagramUrl must be a string').run(req);
        await body('githubUrl').isString().withMessage('githubUrl must be a string').run(req);
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

        const result = await ourTeamService.updateOurTeam(id, name, nim, imageUrl, instagramUrl, githubUrl);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const createOurTeamCMS = async (req, res, next) => {
    const { name, nim, instagramUrl, githubUrl } = req.body;
    const imageFile = req.file;

    try {
        if (!name || !nim || !imageFile || !instagramUrl || !githubUrl) {
            throw new customError.BadRequestError('all fields are required');
        }

        await body('name').isString().withMessage('name must be a string').run(req);
        await body('nim').isString().withMessage('nim must be a string').run(req);
        await body('instagramUrl').isString().withMessage('instagramUrl must be a string').run(req);
        await body('githubUrl').isString().withMessage('githubUrl must be a string').run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        const imageUrl = await imageService.generateUrlImage({ file: imageFile });
        if (!imageUrl) {
            throw new customError.InternalServerError('failed to upload image');
        }

        const result = await ourTeamService.createOurTeam(name, nim, imageUrl, instagramUrl, githubUrl);
        res.status(201).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const deleteOurTeamCMS = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await ourTeamService.deleteOurTeam(id);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const getTaskTeam = async (req, res, next) => {
    try {
        const result = await ourTeamService.getTaskTeam();
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const createTaskTeamCMS = async (req, res, next) => {
    const { developer, title, description } = req.body;
    const imageFile = req.file;

    try {
        if (!developer || !title || !imageFile || !description) {
            throw new customError.BadRequestError('all fields are required');
        }

        await body('developer').isString().withMessage('developer must be a string').run(req);
        await body('title').isString().withMessage('title must be a string').run(req);
        await body('description').isString().withMessage('description must be a string').run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        const imageUrl = await imageService.generateUrlImage({ file: imageFile });
        if (!imageUrl) {
            throw new customError.InternalServerError('failed to upload image');
        }

        const result = await ourTeamService.createTaskTeam(developer, title, imageUrl, description);
        res.status(201).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const updateTaskTeamCMS = async (req, res, next) => {
    const { id } = req.params;
    const { developer, title, description } = req.body;

    const imageFile = req.file;
    let imageUrl;
    try {
        if (!developer || !title || !description) {
            throw new customError.BadRequestError('all fields are required');
        }

        await body('developer').isString().withMessage('developer must be a string').run(req);
        await body('title').isString().withMessage('title must be a string').run(req);
        await body('description').isString().withMessage('description must be a string').run(req);

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

        const result = await ourTeamService.updateTaskTeam(id, developer, title, description, imageUrl);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const deleteTaskTeamCMS = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await ourTeamService.deleteTaskTeam(id);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getOurTeam,
    createOurTeamCMS,
    updateOurTeamCMS,
    deleteOurTeamCMS,
    getTaskTeam,
    createTaskTeamCMS,
    updateTaskTeamCMS,
    deleteTaskTeamCMS,
};