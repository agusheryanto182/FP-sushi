const customError = require('../errors');
const Product = require('../api/v1/products/model');

const CreateProduct = async ({ name, price, category, imageUrl }) => {
    try {
        const product = await Product.create({ name, price, category, imageUrl });
        return product;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const GetProductByName = async (name) => {
    try {
        const product = await Product.findOne({ name });
        return product;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const GetAllProducts = async (query) => {
    try {
        const products = await Product.find(query);
        return products;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const DeleteProduct = async (id) => {
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new customError.NotFoundError('product not found');
        }
        return product;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const UpdateProduct = async (id, name, price, category, imageUrl) => {
    try {
        const product = await Product.findByIdAndUpdate(id, { name, price, category, imageUrl }, { new: true });
        if (!product) {
            throw new customError.NotFoundError('product not found');
        }
        return product;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

module.exports = {
    CreateProduct,
    GetProductByName,
    GetAllProducts,
    DeleteProduct,
    UpdateProduct
};