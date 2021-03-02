import React, { useCallback, useEffect } from "react";
import Table from "./components/Table/Table";

import { usePlanets } from "./context/usePlanets";

import FormControl from "react-bootstrap/FormControl";
import { useFilterTable } from "./context/useFilterTable";
import PaginationButtonGroup from "./components/PaginationButtonGroup/PaginationButtonGroup";
import { usePagination } from "./context/usePagination";

function App() {
  const { planets } = usePlanets();

  const { count } = usePlanets();

  useEffect(() => {
    setCountItems(count);
  }, [count]);

  const { filter, setFilterByName } = useFilterTable();

  const {
    pagination,
    next,
    previous,
    setCountItems,
    setCurrentItem,
  } = usePagination();

  const handleFilterByNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setFilterByName(event.target.value),
    []
  );

  return (
    <div>
      <FormControl
        value={filter.byName.name}
        onChange={handleFilterByNameChange}
      ></FormControl>
      {planets?.length ? (
        <Table
          columnLabels={{
            name: "Nome",
            rotation_period: "Rotação",
            orbital_period: "Translação",
            diameter: "Diâmetro",
            climate: "Clima",
            gravity: "Gravidade",
            terrain: "Terreno",
            surface_water: "Superfície da Água",
            population: "População",
            films: "Filmes",
            created: "Data de Criação",
            edited: "Data de Edição",
            url: "URL",
          }}
          data={planets.map(({ residents, films, ...item }) => {
            return {
              ...item,
              films: films.length,
            };
          })}
        />
      ) : null}
      <PaginationButtonGroup
        pagination={pagination}
        onNextButtonClick={next}
        onPreviousButtonClick={previous}
        onPaginationChange={(index) => setCurrentItem(index)}
      />
    </div>
  );
}

export default App;
