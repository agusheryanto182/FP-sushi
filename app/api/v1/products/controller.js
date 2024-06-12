const customError = require('../../../errors');
const productService = require('../../../services/mongoose/productService');
const { body, param, validationResult } = require('express-validator');


const createProductCms = async (req, res, next) => {
    const { name, price, category, imageUrl } = req.body;
    if (!name || !price || !category || !imageUrl) {
        throw new customError.BadRequestError('all fields are required');
    }

    if (price <= 0) {
        throw new customError.BadRequestError('price must be greater than 0');
    }

    if (category !== 'food' && category !== 'drink') {
        throw new customError.BadRequestError('category must be food or drink');
    }

    // validation
    await body('name').isString().withMessage('name must be a string').run(req);
    await body('price').isNumeric().withMessage('price must be a number').run(req);
    await body('category').isString().withMessage('category must be a string').run(req);
    await body('imageUrl').isString().withMessage('imageUrl must be a string').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new customError.BadRequestError(errors.array()[0].msg);
    }

    try {
        const result = await productService.CreateProduct(req);
        res.status(201).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};

const getAllProductsCms = async (req, res, next) => {
    const { name, price, category, sortOrder } = req.params;
    try {
        const result = await productService.GetAllProducts(name, price, category, sortOrder);
        res.status(200).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};

const deleteProductCms = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await productService.DeleteProduct(id);
        res.status(200).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};

const updateProductCms = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, category, imageUrl } = req.body;

    if (price <= 0) {
        throw new customError.BadRequestError('price must be greater than 0');
    }

    if (category !== 'food' && category !== 'drink') {
        throw new customError.BadRequestError('category must be food or drink');
    }

    if (!name || !price || !category || !imageUrl) {
        throw new customError.BadRequestError('all fields are required');
    }
    try {
        const result = await productService.UpdateProduct(id, name, price, category, imageUrl);
        res.status(200).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createProductCms,
    getAllProductsCms,
    deleteProductCms,
    updateProductCms
};

