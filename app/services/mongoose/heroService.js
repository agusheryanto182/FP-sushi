const heroRepo = require('../../repositories/heroRepo');
const imageService = require('../mongoose/imagesService');

const getAllHero = async () => {
    const hero = await heroRepo.getAllHero();
    return hero;
};

const createHero = async (title, imageUrl) => {
    const hero = await heroRepo.createHero(title, imageUrl);
    return hero;
};

const updateHero = async (id, title, imageUrl) => {
    const oldHero = await heroRepo.getHeroById(id);

    const updatedHero = await heroRepo.updateHero(id, title, imageUrl);

    if (imageUrl) {
        imageService.deleteImage(oldHero.imageUrl);
    }

    return updatedHero;
};


const deleteHero = async (id) => {
    const hero = await heroRepo.deleteHero(id);
    imageService.deleteImage(hero.imageUrl);
    return hero;
};

module.exports = {
    getAllHero,
    createHero,
    updateHero,
    deleteHero
};