const {
    CreateAdmin
} = require('../../../services/mongoose/userService');

const { StatusCodes } = require('http-status-codes');

const createAdminCms = async (req, res, next) => {
    try {
        const result = await CreateAdmin(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createAdminCms,
};