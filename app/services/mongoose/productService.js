const customError = require('../../errors');
const productRepo = require('../../repositories/productRepo');
const imageService = require('../mongoose/imagesService');

const CreateProduct = async (name, price, category, imageUrl) => {
    const isNameExists = await productRepo.GetProductByName(name);
    if (isNameExists) {
        throw new customError.ConflictError('product name already exists');
    }

    const product = await productRepo.CreateProduct({ name, price, category, imageUrl });
    return product;
};

const GetAllProducts = async (id, name, price, category) => {
    if (id) {
        return await productRepo.GetProductById(id);
    }

    const query = {};
    if (name) {
        query.name = { $regex: new RegExp('^' + name, 'i') };
    }
    if (price) {
        query.price = { $gte: price };
    }
    if (category) {
        query.category = { $regex: new RegExp('^' + category, 'i') };
    }


    const result = await productRepo.GetAllProducts(query);
    return result.sort((a, b) => b.createdAt - a.createdAt);
};

const DeleteProduct = async (id) => {
    const result = await productRepo.DeleteProduct(id);
    imageService.deleteImage(result.imageUrl);

    return result;
};

const UpdateProduct = async (id, name, price, category, imageUrl) => {
    const productOld = await productRepo.GetProductById(id);

    const isNameExists = await productRepo.GetProductByName(name);
    if (isNameExists.name === name && isNameExists.id !== id) {
        throw new customError.ConflictError('product name already exists');
    }

    const result = await productRepo.UpdateProduct(id, name, price, category, imageUrl);

    if (imageUrl) {
        imageService.deleteImage(productOld.imageUrl);
    }

    return result;
};

module.exports = {
    CreateProduct,
    GetAllProducts,
    DeleteProduct,
    UpdateProduct
};