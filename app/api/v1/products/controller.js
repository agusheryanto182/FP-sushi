const customError = require('../../../errors');
const productService = require('../../../services/mongoose/productService');
const { body, validationResult } = require('express-validator');
const imageService = require('../../../services/mongoose/imagesService');


const createProductCms = async (req, res, next) => {
    const { name, price, category, rank } = req.body;
    // validation
    await body('name').isString().withMessage('name must be a string').run(req);
    await body('price').isNumeric().withMessage('price must be a number').run(req);
    await body('category').isString().withMessage('category must be a string').run(req);
    await body('rank').isInt({ min: 0, max: 5 }).withMessage('rank must be an integer between 0 and 5').run(req);
    const errors = validationResult(req);


    try {
        if (!name || !price || !category || !rank) {
            throw new customError.BadRequestError('all fields are required');
        }

        if (price <= 0) {
            throw new customError.BadRequestError('price must be greater than 0');
        }

        if (category !== 'food' && category !== 'drink') {
            throw new customError.BadRequestError('category must be food or drink');
        }

        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }
    } catch (err) {
        next(err);
    }

    try {
        const resultImages = await imageService.generateUrlImage({ file: req.file });

        if (!resultImages) {
            throw new customError.InternalServerError('failed to upload image');
        }

        const result = await productService.CreateProduct(name, price, category, resultImages, rank);
        res.status(201).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
};

const getAllProductsCms = async (req, res, next) => {
    const { id } = req.query;
    try {
        const result = await productService.GetAllProducts(id);
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
    const { name, price, category, rank } = req.body;
    const imageFile = req.file;

    // validation
    await body('name').isString().withMessage('name must be a string').run(req);
    await body('price').isNumeric().withMessage('price must be a number').run(req);
    await body('category').isString().withMessage('category must be a string').run(req);
    await body('rank').isInt({ min: 0, max: 5 }).withMessage('rank must be an integer between 0 and 5').run(req);

    const errors = validationResult(req);

    let imageUrl;

    try {

        if (!name || !price || !category || !rank) {
            throw new customError.BadRequestError('all fields are required');
        }

        if (price <= 0) {
            throw new customError.BadRequestError('price must be greater than 0');
        }

        if (category !== 'food' && category !== 'drink') {
            throw new customError.BadRequestError('category must be food or drink');
        }

        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }

        if (imageFile) {
            imageUrl = await imageService.generateUrlImage({ file: imageFile });

            if (!imageUrl) {
                throw new customError.InternalServerError('failed to upload image');
            }
        }

        const result = await productService.UpdateProduct(id, name, price, category, imageUrl, rank);
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

