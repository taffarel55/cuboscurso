const conexao = require("../conexao");

const listarUsuarios = async (req, res) => {
  try {
    const query = "select * from usuarios";
    const { rows: usuarios } = await conexao.query(query);

    const query2 = "select * from emprestimos";
    const {rows:emprestimos} = await conexao.query(query2);

    const novosUsuarios = usuarios.map((u)=>{
      const emp = emprestimos.filter(e=>e.usuario_id==u.id);
      return {...u,emprestimos:emp};
    });

    return res.status(200).json(novosUsuarios);
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

    const query2 = "select * from emprestimos";
    const { rows: emprestimos } = await conexao.query(query2);

    const emp = emprestimos.filter((e) => e.usuario_id == usuario.rows[0].id);

    return res.status(200).json({...usuario.rows[0], emprestimos: emp});
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

    const query = `update usuarios set 
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
      return res.status(400).json("Não foi possível atualizar o usuário");
    }

    return res.status(200).json("O usuário foi atualizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await conexao.query(
      "select * from usuarios where id = $1",
      [id]
    );

    if (usuario.rowCount === 0) {
      return res.status(404).json("Usuário não encontrado.");
    }

    const query2 = `
            select * from emprestimos
            where usuario_id=$1
        `;
    const emprestimos = await conexao.query(query2, [id]);

    if (emprestimos.rowCount !== 0) {
      return res
        .status(400)
        .json("Usuário não pode ser excluído, há empréstimos associados com o usuário");
    }

    const query = "delete from usuarios where id = $1";
    const usuarioExcluido = await conexao.query(query, [id]);

    if (usuarioExcluido.rowCount === 0) {
      return res.status(400).json("Não foi possível excluir o usuario");
    }

    return res.status(200).json("O usuario foi excluido com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarUsuarios,
  obterUsuario,
  cadastrarUsuario,
  atualizarUsuario,
  excluirUsuario,
};
