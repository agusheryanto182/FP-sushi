const ourTeamRepo = require('../../repositories/ourTeamRepo');
const imageService = require('../mongoose/imagesService');
const customError = require('../../errors');

const getOurTeam = async () => {
    const ourTeam = await ourTeamRepo.getOurTeam();
    return ourTeam;
};

const updateOurTeam = async (id, name, nim, imageUrl, instagramUrl, githubUrl) => {
    const ourTeamOld = await ourTeamRepo.getOurTeamById(id);

    const ourTeam = await ourTeamRepo.updateOurTeam(id, name, nim, imageUrl, instagramUrl, githubUrl);

    if (imageUrl) {
        imageService.deleteImage(ourTeamOld.imageUrl);
    }

    return ourTeam;
};

const createOurTeam = async (name, nim, imageUrl, instagramUrl, githubUrl) => {
    const ourTeam = await ourTeamRepo.createOurTeam(name, nim, imageUrl, instagramUrl, githubUrl);
    return ourTeam;
};

const deleteOurTeam = async (id) => {
    const ourTeam = await ourTeamRepo.deleteOurTeam(id);
    imageService.deleteImage(ourTeam.imageUrl);
    return ourTeam;
};

const getTaskTeam = async () => {
    const taskTeam = await ourTeamRepo.getTaskTeam();
    return taskTeam;
};

const updateTaskTeam = async (id, developer, title, description, imageUrl) => {
    const checkDeveloper = await ourTeamRepo.getOurTeamById(developer);
    if (!checkDeveloper) {
        throw new customError.NotFoundError('developer not found');
    }

    const taskTeamOld = await ourTeamRepo.getTaskTeamById(id);

    const taskTeam = await ourTeamRepo.updateTaskTeam(id, developer, title, description, imageUrl);

    if (imageUrl) {
        imageService.deleteImage(taskTeamOld.imageUrl);
    }

    return taskTeam;
};

const createTaskTeam = async (developer, title, imageUrl, description) => {
    const checkDeveloper = await ourTeamRepo.getOurTeamById(developer);
    if (!checkDeveloper) {
        throw new customError.NotFoundError('developer not found');
    }

    const taskTeam = await ourTeamRepo.createTaskTeam(developer, title, imageUrl, description);
    return taskTeam;
};

const deleteTaskTeam = async (id) => {
    const taskTeam = await ourTeamRepo.deleteTaskTeam(id);
    imageService.deleteImage(taskTeam.imageUrl);
    return taskTeam;
};

module.exports = {
    getOurTeam,
    updateOurTeam,
    createOurTeam,
    deleteOurTeam,
    getTaskTeam,
    updateTaskTeam,
    createTaskTeam,
    deleteTaskTeam
};