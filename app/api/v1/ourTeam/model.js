const mongoose = require('mongoose');

const OurTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nim: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    instagramUrl: {
        type: String
    },
    githubUrl: {
        type: String
    },
});

const TaskTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('OurTeam', OurTeamSchema);
module.exports = mongoose.model('TaskTeam', TaskTeamSchema)