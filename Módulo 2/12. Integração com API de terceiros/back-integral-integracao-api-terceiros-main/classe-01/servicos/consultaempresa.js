const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://companyenrichment.abstractapi.com/v1'
});

module.exports = instance;