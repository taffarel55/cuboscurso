const fs = require('fs').promises;
const axios = require('axios');

async function buscarCEP(req, res) {
    const path = './enderecos.json'; // Caminho para Ler e Salvar os CEPs
    const cep = req.params.cep;      // CEP solicitado na requisição
    
    // Leitura dos dados no servidor local
    const ceps = await lerCeps(path);
    
    // Resposta caso erro na leitura
    if(ceps.erro) {
        res.status('500');
        res.json(ceps.details);
        return;
    }

    // Busca do CEP no servidor local
    const local = ceps.find(l=>l.cep.split('-').join('')===cep);
    if(local) {
        console.log(`[server] CEP encontrado nos arquivos!`);
        res.json(local);
        return;
    } else {
        // Busca na API ViaCEP
        console.log(`[server] CEP não encontrado nos arquivos!`);
        console.log('[api] Procurando CEP na API');
        const data = (await axios.get(`https://viacep.com.br/ws/${cep}/json/`)).data;
        if(data.erro) {
            res.status('404');
            console.log(`[api] CEP ${cep} não encontrado na API`);
            res.json({erro: `CEP ${cep} não encontrado na API`});
            return;
        }
        console.log('[api] CEP encontrado!');
        ceps.push(data);
        salvarCeps(path, ceps);
        res.json(data);
    }
}

async function lerCeps(path) {
    try {
        console.log('[server] Procurando CEP na base de dados');
        const buffer = await fs.readFile(path);
        const ceps = buffer.length===0 ? [] : JSON.parse(buffer);
        return ceps;
    } catch (err) {
        console.log(`[server] Erro ao ler arquivo: ${err}`);
        return {erro:true,details:err};
    }
}

async function salvarCeps(path, ceps) {
    try {
        console.log('[api] Salvando novo CEP no servidor local');
        await fs.writeFile(path, JSON.stringify(ceps));
    } catch (err) {
        console.log(`[server] Erro ao salvar CEP: ${err}`);
    }
}

module.exports = {buscarCEP}