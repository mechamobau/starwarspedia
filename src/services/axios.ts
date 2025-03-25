import axios from 'axios';
console.log({ BASE_URL_API: process.env.BASE_URL_API });
const server = axios.create({
  baseURL: process.env.BASE_URL_API,
  timeout: 1000,
});

export { server };
