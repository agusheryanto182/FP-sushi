const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name is requried'],
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'email is required'],
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minlength: 6,
        },
        phone: {
            type: String,
            required: [true, 'phone number is required'],
            maxlength: 20,
        },
        address: {
            type: String,
            maxlength: 225,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'admin',
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', userSchema);
