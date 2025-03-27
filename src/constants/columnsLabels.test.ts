import React from 'react';

import Item from '../models/Item';

import columnsLabels from './columnsLabels';

const mockPlanet: Item = {
  rotation_period: null,
  orbital_period: null,
  surface_water: null,
  population: null,
  diameter: null,
  name: '',
  climate: '',
  gravity: '',
  terrain: '',
  residents: [],
  films: [],
  created: '',
  edited: '',
  url: '',
};

test('should have Planet keys inside columnLabels constant', () => {
  const planetKeys = Object.keys(mockPlanet).sort();

  expect(Object.keys(columnsLabels).sort()).toStrictEqual(planetKeys.sort());
});

test('should have values as string', () => {
  const columnLabelsEntries = Object.entries(columnsLabels);

  const isValuesStrings = columnLabelsEntries.every(
    ([, value]) => typeof value === 'string'
  );

  expect(isValuesStrings).toBe(true);
});
