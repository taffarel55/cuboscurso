const imoveis = require('../dados/imoveis');

function get(req,res) {
    res.json(imoveis);
}

function getPorId(req, res) {
    const id = Number(req.params.id);
    if (!id) {
        res.status(400);
        res.json({erro:'O parâmetro id fornecido deve ser um número'});
        return;
    }
    const imovel = imoveis.find(im=>im.id===id);
    if (!imovel) {
        res.status(404);
        res.json({erro:'O recurso solicitado não foi encontrado'});
        return;
    }
    res.json(imovel);
}

module.exports = {
    get,
    getPorId
}