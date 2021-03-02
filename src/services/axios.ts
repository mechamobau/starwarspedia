import axios from "axios";

const server = axios.create({
  baseURL: "https://swapi-trybe.herokuapp.com/api",
  timeout: 1000,
});

export { server };
