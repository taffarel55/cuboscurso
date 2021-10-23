const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const transportador = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7c213f98f38574",
    pass: "7faaa658665836",
  },
});

transportador.use(
  "compile",
  hbs({
    viewEngine: {
      extname: "handlebars",
      defaultLayout: false,
    },
    viewPath: "./views/",
  })
);

module.exports = transportador;
