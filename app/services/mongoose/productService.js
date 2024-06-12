const customError = require('../../errors');
const productRepo = require('../../repositories/productRepo');

const CreateProduct = async ({ name, price, imageUrl }) => {
    const isNameExists = await productRepo.GetProductByName(name);
    if (isNameExists) {
        throw new customError.ConflictError('product name already exists');
    }

    const product = await productRepo.CreateProduct({ name, price, imageUrl });
    return product;
};

const GetAllProducts = async (name, price, category, limit, offset) => {
    const query = {};
    if (name) {
        query.name = { $regex: '^' + name, $options: 'i' };
    }
    if (price) {
        query.price = { $gte: price };
    }
    if (category) {
        query.category = { $regex: '^' + category, $options: 'i' };
    }

    if (!limit) {
        limit = 5;
    }

    if (!offset) {
        offset = 0;
    }

    const result = await productRepo.GetAllProducts(query, limit, offset);
    return result;
};

const DeleteProduct = async (id) => {
    const result = await productRepo.DeleteProduct(id);
    return result;
};

const UpdateProduct = async (id, name, price, category, imageUrl) => {
    const isNameExists = await productRepo.GetProductByName(name);
    if (isNameExists) {
        throw new customError.ConflictError('product name already exists');
    }

    const result = await productRepo.UpdateProduct(id, name, price, category, imageUrl);
    return result;
};

module.exports = {
    CreateProduct,
    GetAllProducts,
    DeleteProduct,
    UpdateProduct
};