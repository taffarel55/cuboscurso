const instance = require('../servicos/pagarme');

async function criarPedido(req, res) { 
    const {body} = req;
    try {
        if (!body.amount) {
            res.status(400).json({erro:'O valor do pedido não foi informado'});
            return; 
        }
        const pedido = await instance.post('transactions', body);
        return res.json(pedido.data);
    } catch(err) {
        const {data:{errors}, status} = err.response;
        res.status(status).json({
            erro: `${errors[0].parameter_name} - ${errors[0].message}`
        });
    }
    res.send('ok');
}

async function consultarPedido(req, res) {
    const {id} = req.params;
    try {
        const pedido = await instance.get(`transactions/${id}`); 
        return res.json(pedido.data);
    } catch(err) {
        const {data:{errors}, status} = err.response;
        res.status(status).json({
            erro: `${errors[0].parameter_name} - ${errors[0].message}`
        });  
    }
    res.send('ok');
}

module.exports = {
    criarPedido,
    consultarPedido
};