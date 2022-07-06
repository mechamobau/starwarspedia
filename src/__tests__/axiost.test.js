import axios from 'axios'

// faz sentido esse tipo de teste tão simples?
test('Axios create deverá ser chamado com os parâmetros corretos', () => {
  const axiosCreate = jest.spyOn(axios, 'create');

  require('../services/axios');

  expect(axiosCreate).toHaveBeenCalledWith({
    baseURL: "https://swapi-trybe.herokuapp.com/api",
    timeout: 1000,
  });
});
