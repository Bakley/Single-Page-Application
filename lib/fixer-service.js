require('dotenv').config();
const axios = require('axios/index');

const symbols = process.env.SYMBOLS || 'EUR,USD,GBP';

// Axios Client declaration
const api = axios.create({
  baseURL: 'http://data.fixer.io/api',
  params: {
    access_key: process.env.API_KEY,
  },
  timeout: process.env.TIMEOUT || 5000,
});

// Generic get request function
const get = async (url) => {
  const response = await api.get(url);
  console.log("This is the fixer-service response", response.data);
  const { data } = response;
  if (data.success) {
    return data;
  }
  throw new Error(data.error.type);
};

module.exports = {
  getRates: () => get(`/latest&symbols=${symbols}&base=EUR`),
  getSymbols: () => get('/symbols'),
};
