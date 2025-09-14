// backend/src/utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendWelcomeEmail = async (email, nombre) => {
  await transporter.sendMail({
    from: 'ConnectONE <noreply@connectone.com>',
    to: email,
    subject: '¡Bienvenido a ConnectONE!',
    html: `<h1>Hola ${nombre}!</h1><p>Bienvenido a tu viaje de bienestar...</p>`
  });
};