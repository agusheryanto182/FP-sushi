const { OurTeam, TaskTeam } = require('../api/v1/ourTeam/model');
const customError = require('../errors');

const getOurTeam = async () => {
    try {
        const result = await OurTeam.find().sort({ createdAt: -1 });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const getOurTeamById = async (id) => {
    try {
        const result = await OurTeam.findById(id);
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const createOurTeam = async (name, nim, imageUrl, instagramUrl, githubUrl) => {
    try {
        const result = await OurTeam.create({ name, nim, imageUrl, instagramUrl, githubUrl });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const updateOurTeam = async (id, name, nim, imageUrl, instagramUrl, githubUrl) => {
    try {
        const result = await OurTeam.findByIdAndUpdate(id, { name, nim, imageUrl, instagramUrl, githubUrl }, { new: true });
        if (!result) {
            throw new customError.NotFoundError('our team not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const deleteOurTeam = async (id) => {
    try {
        const result = await OurTeam.findByIdAndDelete(id);
        if (!result) {
            throw new customError.NotFoundError('our team not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const getTaskTeam = async () => {
    try {
        const result = await TaskTeam.find().sort({ createdAt: -1 });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const getTaskTeamById = async (id) => {
    try {
        const result = await TaskTeam.findById(id);
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const createTaskTeam = async (developer, title, imageUrl, description) => {
    try {
        const result = await TaskTeam.create({ developer, title, imageUrl, description });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

const updateTaskTeam = async (id, developer, title, description, imageUrl) => {
    try {
        const result = await TaskTeam.findByIdAndUpdate(id, { developer, title, description, imageUrl }, { new: true });
        if (!result) {
            throw new customError.NotFoundError('task team not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

const deleteTaskTeam = async (id) => {
    try {
        const result = await TaskTeam.findByIdAndDelete(id);
        if (!result) {
            throw new customError.NotFoundError('task team not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

module.exports = {
    getOurTeam,
    createOurTeam,
    updateOurTeam,
    deleteOurTeam,
    getTaskTeam,
    createTaskTeam,
    updateTaskTeam,
    deleteTaskTeam,
    getOurTeamById,
    getTaskTeamById
};