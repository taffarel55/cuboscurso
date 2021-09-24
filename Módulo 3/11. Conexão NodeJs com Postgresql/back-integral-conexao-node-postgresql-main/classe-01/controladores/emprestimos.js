const conexao = require("../conexao");

const listarEmprestimos = async (req, res) => {
  try {
    const query = `
      select 
        e.id, 
        u.nome as usuario, 
        u.telefone,
        u.email, 
        l.nome, 
        e. status from emprestimos e 
      left join usuarios u on e.usuario_id = u.id
      left join livros l on e.livro_id = l.id
    `;
    const { rows: emprestimos } = await conexao.query(query);
    return res.status(200).json(emprestimos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterEmprestimo = async (req, res) => {
  const { id } = req.params;
  try {
    const emprestimo = await conexao.query(
      "select * from emprestimos where id = $1",
      [id]
    );

    if (emprestimo.rowCount === 0) {
      return res.status(404).json("Empréstimo não encontrado.");
    }

    return res.status(200).json(emprestimo.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarEmprestimo = async (req, res) => {
  const { usuario_id, livro_id } = req.body;

  try {
    if (!usuario_id || !livro_id) {
      return res
        .status(400)
        .json("Os campos usuario_id e livro_id são obrigatórios.");
    }
    const usuario = await conexao.query(
      "select * from usuarios where id = $1",
      [usuario_id]
    );
    if (usuario.rowCount === 0) {
      return res.status(404).json("Usuário não encontrado.");
    }
    const livro = await conexao.query("select * from livros where id = $1", [
      livro_id,
    ]);
    if (livro.rowCount === 0) {
      return res.status(404).json("Livro não encontrado.");
    }
    const query = `
      insert into emprestimos (usuario_id, livro_id) 
      values ($1, $2)
    `;
    const emprestimoCadastrado = await conexao.query(query, [
      usuario_id,
      livro_id,
    ]);

    if (emprestimoCadastrado.rowCount === 0) {
      return res.status(400).json("Não foi possivel cadastar o empréstimo");
    }

    return res.status(200).json("Empréstimo cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarEmprestimo = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    if (!status) {
      return res.status(400).json("O campo status é obrigatório.");
    }

    const emprestimo = await conexao.query(
      "select * from emprestimos where id = $1",
      [id]
    );

    if (emprestimo.rowCount === 0) {
      return res.status(404).json("Empréstimo não encontrado.");
    }

    const query = `update emprestimos set status = $1 where id = $2`;

    const emprestimoAtualizado = await conexao.query(query, [status, id]);

    if (emprestimoAtualizado.rowCount === 0) {
      return res.status(400).json("Não foi possivel atualizar o empréstimo");
    }

    return res.status(200).json("Empréstimo atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirEmprestimo = async (req, res) => {
  const { id } = req.params;
  try {
    const emprestimo = await conexao.query(
      "select * from emprestimos where id = $1",
      [id]
    );

    if (emprestimo.rowCount === 0) {
      return res.status(404).json("Empréstimo não encontrado.");
    }

    const query = "delete from emprestimos where id = $1";
    const emprestimoExcluido = await conexao.query(query, [id]);

    if (emprestimoExcluido.rowCount === 0) {
      return res.status(400).json("Não foi possível excluir o emprestimo");
    }

    return res.status(200).json("O emprestimo foi excluido com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarEmprestimos,
  obterEmprestimo,
  cadastrarEmprestimo,
  atualizarEmprestimo,
  excluirEmprestimo,
};
