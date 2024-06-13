const authService = require('../../../services/mongoose/authService');
const { StatusCodes } = require('http-status-codes');
const { body, validationResult } = require('express-validator');
const customError = require('../../../errors');

const signinCms = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new customError.BadRequestError('all fields are required');
    }

    // validation
    await body('email').isEmail().withMessage('invalid email').run(req);
    await body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new customError.BadRequestError(errors.array()[0].msg);
    }

    try {
        const result = await authService.signin(email, password);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { signinCms };
