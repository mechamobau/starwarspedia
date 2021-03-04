import mapRawPlanetsResponse from "./mapRawPlanetsResponse";

// const rawPlanetsValue = {
//   name: string;
//   climate: string;
//   gravity: string;
//   terrain: string;
//   residents: string[];
//   films: string[];
//   created: string;
//   edited: string;
//   url: string;
//   rotation_period: string;
//   orbital_period: string;
//   surface_water: string;
//   population: string;
//   diameter: string;
// };

it("should return parsed values in number nodes", () => {
  const rawPlanetsValue = {
    name: "Tatooine",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    residents: [""],
    films: [""],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
    url: "https://swapi-trybe.herokuapp.com/api/planets/1/",
    rotation_period: "23",
    orbital_period: "304",
    surface_water: "1",
    population: "200000",
    diameter: "10465",
  };

  expect(mapRawPlanetsResponse([rawPlanetsValue])).toStrictEqual([
    {
      ...rawPlanetsValue,
      rotation_period: 23,
      orbital_period: 304,
      surface_water: 1,
      population: 200000,
      diameter: 10465,
    },
  ]);
});

it("should return 0 if number value isn't a valid number value", () => {
  const rawPlanetsValue = {
    name: "Tatooine",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    residents: [""],
    films: [""],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
    url: "https://swapi-trybe.herokuapp.com/api/planets/1/",
    rotation_period: "rotation",
    orbital_period: "orbital_period",
    surface_water: "surface_water",
    population: "population",
    diameter: "diameter",
  };

  expect(mapRawPlanetsResponse([rawPlanetsValue])).toStrictEqual([
    {
      ...rawPlanetsValue,
      rotation_period: 0,
      orbital_period: 0,
      surface_water: 0,
      population: 0,
      diameter: 0,
    },
  ]);
});
