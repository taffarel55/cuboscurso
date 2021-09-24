const conexao = require("../conexao");

const listarUsuarios = async (req, res) => {
  try {
    const query = "select * from usuarios";
    // const query = `
    //         select l.id, a.nome as nome_autor, l.nome, l.genero, l.editora, l.data_publicacao from livros l
    //         left join autores a on l.autor_id = a.id
    //     `;
    const { rows: usuarios } = await conexao.query(query);
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await conexao.query(
      "select * from usuarios where id = $1",
      [id]
    );

    if (usuario.rowCount === 0) {
      return res.status(404).json("Usuário não encontrado.");
    }

    return res.status(200).json(usuario.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarUsuario = async (req, res) => {
  const { nome, idade, email, telefone, cpf } = req.body;

  try {
    if (!nome || !email || !cpf) {
      return res
        .status(400)
        .json("Os campos nome, email e cpf são obrigatórios.");
    }
    const query = `
      insert into usuarios (
        nome, idade, email, telefone, cpf
      ) values (
        $1, $2, $3, $4, $5
      )
    `;
    const usuarioCadastrado = await conexao.query(query, [
      nome,
      idade,
      email,
      telefone,
      cpf,
    ]);

    if (usuarioCadastrado.rowCount === 0) {
      return res.status(400).json("Não foi possivel cadastar o usuário");
    }

    return res.status(200).json("Usuário cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, email, telefone, cpf } = req.body;

  try {
    const usuario = await conexao.query(
      "select * from usuarios where id = $1",
      [id]
    );

    if (usuario.rowCount === 0) {
      return res.status(404).json("Usuário não encontrado.");
    }

    const query = `update livros set 
        nome = $1,
        idade = $2,
        email = $3,
        telefone = $4,
        cpf = $5
        where id = $6`;

    const livroAtualizado = await conexao.query(query, [
      nome,
      idade,
      email,
      telefone,
      cpf,
      id,
    ]);

    if (livroAtualizado.rowCount === 0) {
      return res.status(400).json("Não foi possível atualizar o livro");
    }

    return res.status(200).json("O livro foi atualizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirUsuario = async (req, res) => {};

module.exports = {
  listarUsuarios,
  obterUsuario,
  cadastrarUsuario,
  atualizarUsuario,
  excluirUsuario,
};
