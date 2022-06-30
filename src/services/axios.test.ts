import { server } from './axios';
describe('Axios Unit Test', () => {
  it('should have the default configs', () => {
    expect(server.defaults.baseURL).toBe('https://swapi-trybe.herokuapp.com/api')
    expect(server.defaults.timeout).toBe(1000)
  });
});
