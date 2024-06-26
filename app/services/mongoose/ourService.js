// bikin CRUD our service nya

const ourServiceRepo = require('../../repositories/ourServiceRepo');
const imageService = require('../mongoose/imagesService');

const getAllOurService = async () => {
    const result = await ourServiceRepo.getAllOurService();
    return result;
};


const createOurService = async (title, description, imageUrl) => {
    const result = await ourServiceRepo.createOurService(title, description, imageUrl);
    return result;
};


const updateOurService = async (id, title, description, imageUrl) => {
    const ourServiceOld = await ourServiceRepo.getOurServiceById(id);

    const result = await ourServiceRepo.updateOurService(id, title, description, imageUrl);

    if (imageUrl) {
        await imageService.deleteImage(ourServiceOld.imageUrl);
    }

    return result;
};


const deleteOurService = async (id) => {
    const ourServiceOld = await ourServiceRepo.getOurServiceById(id);

    const result = await ourServiceRepo.deleteOurService(id);
    if (result) {
        await imageService.deleteImage(ourServiceOld.imageUrl);
    }
    return result;
};


module.exports = {
    getAllOurService,
    createOurService,
    updateOurService,
    deleteOurService,
};