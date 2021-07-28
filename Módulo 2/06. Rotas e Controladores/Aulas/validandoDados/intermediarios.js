function logar(req,res,next) {
    console.log('Eu sou o intermediário');
    console.log(req.method,req.url);
    console.log('O corpo da mensagem é', req.body)
    next();
}

function autenticar(req,res,next){
    console.log('O segundo intermediário:',req.query);
    if (req.method === 'GET' || req.query.senha==='123456') {
        next();
    } else {
        res.status(401);
        res.json({erro:'Senha incorreta'});
    }
}

module.exports = {logar, autenticar};