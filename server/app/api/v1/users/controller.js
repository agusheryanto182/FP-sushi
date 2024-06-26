const userService = require('../../../services/mongoose/userService');
const { StatusCodes } = require('http-status-codes');
const { body, param, validationResult } = require('express-validator');
const customError = require('../../../errors');

const createAdminCms = async (req, res, next) => {
    const { name, email, password, confirmPassword, phone } = req.body;

    // validation
    await body('name').isString().withMessage('name must be a string').run(req);
    await body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters').run(req);
    await body('confirmPassword').isLength({ min: 6 }).withMessage('confirmPassword must be at least 6 characters').run(req);
    await body('email').isEmail().withMessage('invalid email').run(req);
    await body('phone').isMobilePhone().withMessage('invalid phone number').run(req);
    const errors = validationResult(req);
    try {
        if (!name || !email || !password || !confirmPassword || !phone) {
            throw new customError.BadRequestError('all fields are required');
        }

        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        if (password !== confirmPassword) {
            throw new customError.BadRequestError('passwords do not match');
        }

        const result = await userService.CreateAdmin(name, email, password, phone);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const GetAdminCMS = async (req, res, next) => {
    const { name } = req.query;
    try {
        const result = await userService.GetAdmin(name);
        res.status(StatusCodes.OK).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};

const DeleteAdminCMS = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await userService.DeleteAdmin(id, 'admin');
        res.status(StatusCodes.OK).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};

const UpdateAdminCMS = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, phone } = req.body;

    console.log(name, email, password, phone);

    try {
        if (!name || !email || !password || !phone) {
            throw new customError.BadRequestError('all fields are required');
        }
    } catch (err) {
        next(err)
    }

    // validation
    await body('name').isString().withMessage('name must be a string').run(req);
    await body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters').run(req);
    await body('email').isEmail().withMessage('invalid email').run(req);
    await body('phone').isMobilePhone().withMessage('invalid phone number').run(req);
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        const result = await userService.UpdateAdmin(id, name, email, password, phone, 'admin');
        res.status(StatusCodes.OK).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};

const GetUserByIdCMS = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await userService.GetUserById(id);
        res.status(StatusCodes.OK).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createAdminCms,
    GetAdminCMS,
    DeleteAdminCMS,
    UpdateAdminCMS,
    GetUserByIdCMS
};