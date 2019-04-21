const emailConfig = require('./config');
const nodemailer = require('nodemailer');

console.log("Email Service..........")
const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
        user: emailConfig.from,
        pass: emailConfig.pass
    }
});

class EmailService {
    send(to, subject, html) {
        transporter.sendMail({
            from: emailConfig.from,
            to: to,
            subject: subject,
            html: html
        })
    }
}
module.exports = new EmailService();