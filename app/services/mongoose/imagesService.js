const generateUrlImage = async (req) => {
    const result = `uploads/${req.file.filename}`;

    return result;
};


module.exports = { generateUrlImage };
