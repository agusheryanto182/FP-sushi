const customError = require('../../errors');
const productRepo = require('../../repositories/productRepo');
const imageService = require('../mongoose/imagesService');

const CreateProduct = async (name, price, category, imageUrl, rank) => {
    const resProduct = await productRepo.GetAllProducts();

    if (rank !== '0') {
        const checkProduct = resProduct.some(product => String(product.name) === String(name) || String(product.rank) === rank);
        if (checkProduct) {
            throw new customError.ConflictError('product already exists');
        }
    }

    const product = await productRepo.CreateProduct({ name, price, category, imageUrl, rank });
    return product;
};

const GetAllProducts = async (id) => {
    if (id) {
        return await productRepo.GetProductById(id);
    }

    const result = await productRepo.GetAllProducts();
    return result;
};

const DeleteProduct = async (id) => {
    const result = await productRepo.DeleteProduct(id);
    imageService.deleteImage(result.imageUrl);

    return result;
};

const UpdateProduct = async (id, name, price, category, imageUrl, rank) => {
    console.log(rank)
    const productOld = await productRepo.GetProductById(id);

    const isNameExists = await productRepo.GetProductByName(name);
    if (isNameExists.name === name && isNameExists.id !== id) {
        throw new customError.ConflictError('product name already exists');
    }

    if (rank !== '0') {
        const resProduct = await productRepo.GetAllProducts();
        const checkProduct = resProduct.some(product => String(product.rank) === String(rank));
        if (checkProduct) {
            throw new customError.ConflictError('product rank already exists');
        }
    }

    const result = await productRepo.UpdateProduct(id, name, price, category, imageUrl, rank);

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