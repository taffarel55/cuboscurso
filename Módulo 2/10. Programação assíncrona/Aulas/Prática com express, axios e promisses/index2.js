const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/descrever/:pkg', async (req, res)=> {
    const pkg = req.params.pkg;
    const response = await axios.get(`https://registry.npmjs.org/${pkg}`);
    res.json({
        descricao: response.data.description
    });
});

app.listen(port,()=>{
    console.log('listening on port '+port);
});