const dados = require("../bancodedados");

function obterContas(req, res) {
  res.status(200).json(dados.contas);
}

function criarConta(req, res) {
  const usuario = req.body;
  let erro = validarUsuario(usuario);
  if (erro) {
    res.status(400).json({ erro });
    return;
  }

  const conta = {
    numero: (+new Date()).toString(),
    saldo: 0,
    usuario,
  };

  erro = verificarUnicidade(conta);
  if (erro) {
    res.status(400).json({ erro });
    return;
  }

  dados.contas.push(conta);
  res.status(201).json(conta);
}

function atualizarConta(req, res) {
  const usuario = req.body;
  if (!Object.keys(usuario).length) {
    res.status(400).json({ erro: "O corpo da requisição está vazio" });
    return;
  }

  const { numeroConta } = req.params;
  const conta = dados.contas.find((c) => c.numero == numeroConta);
  if (isNaN(numeroConta) || !conta) {
    res
      .status(400)
      .json({ erro: "O número da conta não é válido ou não existe" });
    return;
  }

  let erro = validarUsuario({
    nome: conta.usuario.nome ?? usuario.nome,
    cpf: conta.usuario.cpf ?? usuario.cpf,
    data_nascimento: conta.usuario.data_nascimento ?? usuario.data_nascimento,
    telefone: conta.usuario.telefone ?? usuario.telefone,
    email: conta.usuario.email ?? usuario.email,
    senha: conta.usuario.senha ?? usuario.senha,
  });

  if (erro) {
    res.status(400).json({ erro });
    return;
  }

  erro = verificarUnicidade({ numero: numeroConta, usuario });
  if (erro) {
    res.status(400).json({ erro });
    return;
  }

  if (usuario.nome !== undefined) conta.usuario.nome = usuario.nome;
  if (usuario.cpf !== undefined) conta.usuario.nome = usuario.cpf;
  if (usuario.data_nascimento !== undefined)
    conta.usuario.data_nascimento = usuario.data_nascimento;
  if (usuario.telefone !== undefined) conta.usuario.telefone = usuario.telefone;
  if (usuario.email !== undefined) conta.usuario.email = usuario.email;
  if (usuario.senha !== undefined) conta.usuario.senha = usuario.senha;

  res.json(conta);
}

function substituirConta(req, res) {
  const contaNova = req.body;
  const prms = Object.keys(contaNova);
  if (
    !prms.includes("numero") ||
    !prms.includes("saldo") ||
    !prms.includes("usuario")
  ) {
    res.status(400).json({
      erro: "O corpo da requisição não está completo",
    });
    return;
  }

  let erro = validarUsuario(contaNova.usuario);
  if (erro) {
    res.status(400).json({ erro });
    return;
  }

  const { numeroConta } = req.params;
  if (contaNova.numero !== numeroConta) {
    res.status(400).json({ erro: "O número da conta não confere" });
    return;
  }

  const conta = dados.contas.find((c) => c.numero == numeroConta);
  erro = verificarUnicidade(contaNova);
  if (erro) {
    res.status(400).json({ erro });
    return;
  }

  if (conta) {
    Object.assign(conta, contaNova);
    res.status(200).json(conta);
  } else {
    dados.contas.push(contaNova);
    res.status(201).json(contaNova);
  }
}

function deletarConta(req, res) {
  const { numeroConta } = req.params;
  const conta = dados.contas.find((c) => c.numero == numeroConta);
  if (isNaN(numeroConta) || !conta) {
    res
      .status(400)
      .json({ erro: "O número da conta não é válido ou não existe" });
    return;
  }

  if (conta.saldo !== 0) {
    res
      .status(400)
      .json({ erro: "Conta não pode ser removida, remova os fundos" });
      return;
  }

  const indice = dados.contas.indexOf(conta);
  dados.contas.splice(indice, 1);
  res.status(200).json(conta);

}

function validarUsuario(usuario) {
  if (!usuario.nome) return "O campo 'nome' é obrigatório";
  if (!usuario.cpf) return "O campo 'cpf' é obrigatório";
  if (!usuario.data_nascimento)
    return "O campo 'data_nascimento' é obrigatório";
  if (!usuario.telefone) return "O campo 'telefone' é obrigatório";
  if (!usuario.email) return "O campo 'email' é obrigatório";
  if (!usuario.senha) return "O campo 'senha' é obrigatório";
}

function verificarUnicidade(conta) {
  const existeCPF = dados.contas.some(
    (c) => c.usuario.cpf === conta.usuario.cpf && c.numero !== conta.numero
  );

  if (existeCPF) return "Já existe uma conta com este CPF";

  const existeEmail = dados.contas.some(
    (c) => c.usuario.email === conta.usuario.email && c.numero !== conta.numero
  );

  if (existeEmail) return "Já existe este email cadastrado em uma conta";
}

module.exports = {
  obterContas,
  criarConta,
  atualizarConta,
  substituirConta,
  deletarConta,
};
