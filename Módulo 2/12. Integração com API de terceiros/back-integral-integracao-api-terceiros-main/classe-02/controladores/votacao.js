const instance = require('../servicos/ipgeolocation');
const fs = require('fs/promises'); 
const path = './dados/votos.json';

const votar = async (req,res) => {
    const {pais, ip} = req.params;
    const {voto} = req.body;
    try {
        const resposta = await instance.get('',{params:{ip_address:ip}});
        const paisDoIP = resposta.data.country;
        if (pais !== paisDoIP) {
            return res.status(400).send({erro:'IP não coincide com país de votação'});
        }
        const votos = await lerVotos(path);
        if(votos.erro) {
            return res.status('500').json(votos.details);
        }
        if (!votos.find(v=>v.ip===resposta.data.ip_address)) {
            const novoVoto = {
                ip:resposta.data.ip_address,
                voto:voto
            };
            votos.push(novoVoto);
            salvarVotos(path, votos);
            return res.json(novoVoto);
        }
        return res.json({mensagem:'Ip já votou!'});
    } catch (err) {
        console.log(err);
        return res.status(400).send({erro:'Endereço IP não é válido'});
    }
}

const verVotos = async (req, res) => {
    const votos = await lerVotos(path);
    if(votos.erro) {
        return res.status('500').json(votos.details);
    }
    res.json(votos);
}

async function lerVotos(path) {
    try {
        console.log('[server] Procurando votos na base de dados');
        const buffer = await fs.readFile(path);
        const votos = buffer.length===0 ? [] : JSON.parse(buffer);
        return votos;
    } catch (err) {
        console.log(`[server] Erro ao ler arquivo: ${err}`);
        return {erro:true,details:err};
    }
}

async function salvarVotos(path, votos) {
    try {
        console.log('[api] Salvando novo voto no servidor local');
        await fs.writeFile(path, JSON.stringify(votos));
    } catch (err) {
        console.log(`[server] Erro ao salvar CEP: ${err}`);
    }
}

module.exports = {
    votar,
    verVotos
};