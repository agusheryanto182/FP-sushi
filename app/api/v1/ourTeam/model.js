const mongoose = require('mongoose');

const OurTeamSchema = new mongoose.Schema(
    {
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
            type: String,
            required: true
        },
        githubUrl: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const TaskTeamSchema = new mongoose.Schema(
    {
        developer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OurTeam',
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
    }
    , { timestamps: true }
);

const OurTeam = mongoose.model('OurTeam', OurTeamSchema);
const TaskTeam = mongoose.model('TaskTeam', TaskTeamSchema);

module.exports = {
    OurTeam,
    TaskTeam
};