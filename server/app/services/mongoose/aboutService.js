const aboutRepo = require('../../repositories/aboutRepo');
const imageService = require('../mongoose/imagesService');
const customError = require('../../errors');

const getAbout = async () => {
    const result = await aboutRepo.getAbout();
    return result;
};

const createAbout = async (title, description, imageUrl, numberOfContent) => {
    const resAbout = await aboutRepo.getAbout();

    const aboutExists = resAbout.some(about => String(about.numberOfContent) === String(numberOfContent));

    if (aboutExists) {
        throw new customError.BadRequestError('number of content already exists');
    }

    if (resAbout.length >= 3) {
        throw new customError.BadRequestError('about limit reached');
    }

    const result = await aboutRepo.createAbout(title, description, imageUrl, numberOfContent);

    return result;
};


const updateAbout = async (id, title, description, imageUrl, numberOfContent) => {
    const resAbout = await aboutRepo.getAbout();

    const aboutExists = resAbout.some(about => String(about.numberOfContent) === String(numberOfContent) && String(about.id) !== String(id));

    if (aboutExists) {
        throw new customError.BadRequestError('number of content already exists');
    }

    const aboutOld = await aboutRepo.getAboutById(id);

    const result = await aboutRepo.updateAbout(id, title, description, imageUrl, numberOfContent);

    if (imageUrl) {
        imageService.deleteImage(aboutOld.imageUrl);
    }

    return result;
};

const deleteAbout = async (id) => {
    const result = await aboutRepo.deleteAbout(id);

    if (result) {
        imageService.deleteImage(result.imageUrl);
    }

    return result;
};

module.exports = {
    getAbout,
    createAbout,
    updateAbout,
    deleteAbout
};