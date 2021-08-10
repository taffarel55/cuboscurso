const instance = require("../servicos/consultaempresa");
const api_key = '4eb57348416247668bdedd70b888b5f9';
const path = '../dados/empresas.json'
const fs = require('fs').promises;

const consultar = async (req, res) => {
    const {dominioEmpresa} = req.params;
    const query = {
        params: {
            api_key: api_key,
            domain: dominioEmpresa
        }
    }
    const response = (await instance.get('',query));
    empresa = response.data;

    if (!empresa.name) {
        res.status(404).json({erro:'Empresa não encontrada'});
        return;
    }

    const empresas = await lerEmpresas(path);

    if(empresas.erro) {
        res.status('500');
        res.json(empresas.details);
        return;
    }

    if (!empresas.find(e=>e.name===empresa.name)) {
        empresas.push(empresa);
        salvarEmpresas(path, empresas);
    }
    
    res.json(empresa);
}

async function lerEmpresas(path) {
    try {
        console.log('[server] Procurando empresa na base de dados');
        const buffer = await fs.readFile(path);
        const empresas = buffer.length===0 ? [] : JSON.parse(buffer);
        return empresas;
    } catch (err) {
        console.log(`[server] Erro ao ler arquivo: ${err}`);
        return {erro:true,details:err};
    }
}

async function salvarEmpresas(path, empresa) {
    try {
        console.log('[api] Salvando nova empresa no servidor local');
        await fs.writeFile(path, JSON.stringify(empresa));
    } catch (err) {
        console.log(`[server] Erro ao salvar CEP: ${err}`);
    }
}

module.exports = {
    consultar
}