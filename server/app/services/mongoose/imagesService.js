const fs = require('fs');
const path = require('path');

const deleteImage = (filename) => {
    const filePath = path.join('public/', filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Image deleted: ${filename}`);
    });
};


const generateUrlImage = async (req) => {
    const result = `uploads/${req.file.filename}`;

    return result;
};


module.exports = { generateUrlImage, deleteImage };
