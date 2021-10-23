const nodemailer = require("nodemailer");

const transportador = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: "postmaster@sandbox4840d050e91c4a2c85c8d916b7081085.mailgun.org",
    pass: "322ec58a40f8b26867df2f9a6ccda659-2bf328a5-5afa5a74",
  },
});

module.exports = transportador;
