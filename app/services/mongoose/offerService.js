const offerRepo = require('../../repositories/offerRepo');
const imageService = require('../mongoose/imagesService');

const CreateOffer = async (title, description, imageUrl) => {
    const offer = await offerRepo.CreateOffer({ title, description, imageUrl });
    return offer;
};

const GetAllOffers = async (id) => {
    const offers = await offerRepo.GetAllOffers(id);
    return offers;
};

const UpdateOffers = async (id, title, description, imageUrl) => {
    console.log(id, title, description, imageUrl);
    const oldOffer = await offerRepo.GetAllOffers(id);

    const offer = await offerRepo.UpdateOffers(id, title, description, imageUrl);

    if (imageUrl) {
        imageService.deleteImage(oldOffer.imageUrl);
    }

    return offer;
};

const DeleteOffers = async (id) => {
    const offer = await offerRepo.DeleteOffers(id);
    imageService.deleteImage(offer.imageUrl);
    return offer;
};

module.exports = {
    CreateOffer,
    GetAllOffers,
    UpdateOffers,
    DeleteOffers
};