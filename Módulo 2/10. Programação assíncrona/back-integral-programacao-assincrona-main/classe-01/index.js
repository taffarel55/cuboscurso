const express = require('express');
const axios = require('axios');
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get('/pokemon', async (req, res) => {
    const inicio = req.query.inicio ?? '0';
    const quantidade = req.query.quantidade ?? '20';
    const pokemons = (await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${inicio}&limit=${quantidade}`)).data.results;
    res.json(pokemons);
});

app.get('/pokemon/:idOuNome', async (req, res) => {
    const idOuNome = req.params.idOuNome;
    try {
        const pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOuNome}`)).data;
        const novoPokemon = {
            id: pokemon.id,
            name : pokemon.name,
            height : pokemon.height,
            weight : pokemon.weight,
            base_experience : pokemon.base_experience,
            forms : pokemon.forms,
            abilities : pokemon.abilities,
            species : pokemon.species
        };
        res.json(novoPokemon);
    } catch (err) {
        res.status('404');
        res.json({
            erro: 'Nome do pokemon ou ID incorreta'
        });
    }
    
});

app.listen(port, ()=>{
    console.log('Servidor iniciado na porta '+port);
});