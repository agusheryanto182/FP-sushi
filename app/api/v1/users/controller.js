const userService = require('../../../services/mongoose/userService');
const { StatusCodes } = require('http-status-codes');
const { body, param, validationResult } = require('express-validator');
const customError = require('../../../errors');

const createAdminCms = async (req, res, next) => {
    const { name, email, password, confirmPassword, phone } = req.body;

    if (!name || !email || !password || !confirmPassword || !phone) {
        throw new customError.BadRequestError('all fields are required');
    }

    // validation
    await body('name').isString().withMessage('name must be a string').run(req);
    await body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters').run(req);
    await body('confirmPassword').isLength({ min: 6 }).withMessage('confirmPassword must be at least 6 characters').run(req);
    await body('email').isEmail().withMessage('invalid email').run(req);
    await body('phone').isMobilePhone().withMessage('invalid phone number').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new customError.BadRequestError(errors.array()[0].msg);
    }

    if (password !== confirmPassword) {
        throw new customError.BadRequestError('passwords do not match');
    }

    try {
        const result = await userService.CreateAdmin(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const GetAdminCMS = async (req, res, next) => {
    const { name } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new customError.BadRequestError(errors.array()[0].msg);
    }

    try {
        const result = await userService.GetAdmin(name);
        res.status(StatusCodes.OK).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createAdminCms,
    GetAdminCMS
};