const express = require('express');

const app = express();

app.get('/soma',(req,res)=> {
    console.log(req.query);
    res.send('1');
});

app.listen(8000);