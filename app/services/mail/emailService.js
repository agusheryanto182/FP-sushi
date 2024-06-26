const nodemailer = require('nodemailer');
const { gmail, password } = require('../../config');
const Mustache = require('mustache');
const fs = require('fs');


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

const sendEmailTemplate = async (email, data) => {
    let template = fs.readFileSync('app/views/email/index.html', 'utf8');
    const mailOptions = {
        from: gmail,
        to: email,
        subject: `Transaksi anda di Suki Sushi telah berhasil`,
        html: Mustache.render(template, data),
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
}


module.exports = { sendEmail, sendEmailTemplate }