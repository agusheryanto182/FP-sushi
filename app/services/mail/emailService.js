const nodemailer = require('nodemailer');
const { gmail, password } = require('../../config');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: gmail,
        pass: password,
    },
});


const sendEmail = async (name, email, message) => {
    const mailOptions = {
        from: email,
        to: gmail,
        subject: `Message from ${name}`,
        text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.toString());
        }
        console.log('Email sent: ' + info.response);
    });
}

module.exports = { sendEmail }