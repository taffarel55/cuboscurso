const supabase = require("../supabase");

const uploadImagem = async (req, res) => {
  const { nome, imagem } = req.body;

  const buffer = Buffer.from(imagem, "base64");

  try {
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(nome, buffer);

    if (error) {
      return res.status(400).json(error.message);
    }

    const { publicURL, error: errorPublicUrl } = supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(nome);

    if (errorPublicUrl) {
      return res.status(400).json(errorPublicUrl.message);
    }

    return res.status(200).json(publicURL);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
const excluiImagem = async (req, res) => {
  const { imagem } = req.body;

  try {
    const { error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .remove([imagem]);

    if (error) {
      return res.status(400).json(error.message);
    }

    return res.status(200).json("A imagem foi removida com sucesso");
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports = { uploadImagem, excluiImagem };
