import axios from 'axios';

const server = axios.create({
  baseURL: process.env.BASE_URL_API,
  timeout: 1000,
});

export { server };
