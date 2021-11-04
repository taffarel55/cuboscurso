const express = require("express");
const yup = require("yup");
const { pt } = require("yup-locales");
const { setLocale } = require("yup");
setLocale(pt);

const app = express();

app.use(express.json());

app.post("/cadastro", async (req, res) => {
  const schema = yup.object().shape({
    nome: yup.string().required(),
    idade: yup.number().strict().required(),
    email: yup.string().email().required(),
    senha: yup.string().required().min(5).max(10),
  });

  try {
    await schema.validate(req.body);
    return res.json("validou");
  } catch (err) {
    return res.status(400).json(err.message);
  }
  return res.json("ok");
});

app.listen(3000);
