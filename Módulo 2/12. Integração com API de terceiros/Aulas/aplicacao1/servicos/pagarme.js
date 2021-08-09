const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.pagar.me/1/',
    params: {
        api_key: 'ak_test_qRjc2viEfQsjrfsEGj9jqZjdL3lv1O'
    }
  });

module.exports = instance;