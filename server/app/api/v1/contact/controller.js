const contactService = require('../../../services/mongoose/contactService');
const customError = require('../../../errors');
const { body, validationResult } = require('express-validator');
const emailService = require('../../../services/mail/emailService');


const getContact = async (req, res, next) => {
    try {
        const result = await contactService.getContact();
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const { address, phone, email } = req.body;
    try {
        if (!address || !phone || !email) {
            throw new customError.BadRequestError('all fields are required');
        }

        await body('address').isString().withMessage('address must be a string').run(req);
        await body('phone').isString().withMessage('phone must be a string').run(req);
        await body('email').isEmail().withMessage('email must be a valid email').run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        const result = await contactService.updateContact(id, address, phone, email);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const createContact = async (req, res, next) => {
    const { address, phone, email } = req.body;
    try {

        if (!address || !phone || !email) {
            throw new customError.BadRequestError('all fields are required');
        }

        await body('address').isString().withMessage('address must be a string').run(req);
        await body('phone').isString().withMessage('phone must be a string').run(req);
        await body('email').isEmail().withMessage('email must be a valid email').run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        const result = await contactService.createContact(address, phone, email);
        res.status(201).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const sendEmail = async (req, res, next) => {
    const { name, email, message } = req.body;
    try {
        if (!name || !email || !message) {
            throw new customError.BadRequestError('all fields are required');
        }
        await body('name').isString().withMessage('name must be a string').run(req);
        await body('email').isEmail().withMessage('email must be a valid email').run(req);
        await body('message').isString().withMessage('message must be a string').run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }
        const result = await emailService.sendEmail(name, email, message);
        res.status(201).json({ data: result });
    } catch (err) {
        next(err);
    }
};



module.exports = {
    getContact,
    updateContact,
    createContact,
    sendEmail
};