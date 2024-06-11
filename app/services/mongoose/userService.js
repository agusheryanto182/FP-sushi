const { BadRequestError, ConflictError } = require('../../errors');
const { Create, CheckEmail } = require('../../repositories/userRepo');
const { body, validationResult } = require('express-validator');

const CreateAdmin = async (req) => {
    const { name, password, confirmPassword, role, email, phone } = req.body;
    // validation
    await body('name').isString().withMessage('name must be a string').run(req);
    await body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters').run(req);
    await body('confirmPassword').isLength({ min: 6 }).withMessage('confirmPassword must be at least 6 characters').run(req);
    await body('email').isEmail().withMessage('invalid email').run(req);
    await body('phone').isMobilePhone().withMessage('invalid phone number').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array()[0].msg);
    }

    if (password !== confirmPassword) {
        throw new BadRequestError('passwords do not match');
    }

    const isEmailExist = await CheckEmail(email);
    if (isEmailExist) {
        throw new ConflictError('email already exists');
    }
    const result = await Create({ name, password, role, email, phone });

    return result;
};

module.exports = { CreateAdmin };
