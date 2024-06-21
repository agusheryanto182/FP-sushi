const customError = require('../errors');
const Offer = require('../api/v1/offers/model');

const CreateOffer = async ({ title, description, imageUrl }) => {
    try {
        const offer = await Offer.create({ title, description, imageUrl });
        return offer;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const GetAllOffers = async (id) => {
    try {
        if (id) {
            const offers = await Offer.find({ userId: id });
            if (!offers) {
                throw new customError.NotFoundError('offers not found');
            }
            return offers;
        }
        const offers = await Offer.find();
        return offers;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const UpdateOffers = async (id, title, description, imageUrl) => {
    try {
        const offer = await Offer.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true });
        if (!offer) {
            throw new customError.NotFoundError('offer not found');
        }
        return offer;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const DeleteOffers = async (id) => {
    try {
        const offer = await Offer.findByIdAndDelete(id);
        if (!offer) {
            throw new customError.NotFoundError('offer not found');
        }
        return offer;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

module.exports = {
    CreateOffer,
    GetAllOffers,
    UpdateOffers,
    DeleteOffers
}