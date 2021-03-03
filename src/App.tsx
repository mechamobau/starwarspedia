import React, { useCallback, useEffect } from "react";
import Table from "./components/Table/Table";

import { usePlanets } from "./context/usePlanets";

import FormControl from "react-bootstrap/FormControl";
import { useFilterTable } from "./context/useFilterTable";
import PaginationButtonGroup from "./components/PaginationButtonGroup/PaginationButtonGroup";
import { usePagination } from "./context/usePagination";
import PublicLayout from "./components/PublicLayout/PublicLayout";
import styled, { createGlobalStyle } from "styled-components";
import { Dropdown } from "react-bootstrap";
import FilterToggle from "./components/filter/FilterToggle/FilterToggle";
import FilterDropdown from "./components/filter/FilterDropdown/FilterDropdown";
import pipe from "@bitty/pipe";
import withProvider from "./utils/react/withProvider";

import FilterTableContext from "./context/useFilterTable";
import PaginationContext from "./context/usePagination";
import PlanetsContext from "./context/usePlanets";
import columnLabels from "./constants/columnsLabels";
import operationsLabels from "./constants/operationsLabels";

const APP_BACKGROUND_IMAGE = process.env.PUBLIC_URL + "/assets/background.jpg";

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: auto;
  }

  body {
    margin: 0;
    padding: 10px;
    background: url(${APP_BACKGROUND_IMAGE}) center / cover no-repeat;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 7em;
  font-family: "Star Jedi", Arial, sans-serif;
  margin-bottom: 30px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const FormControlWrapper = styled.div``;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

function App() {
  const { planets } = usePlanets();

  const { count } = usePlanets();

  const {
    pagination,
    next,
    previous,
    setCountItems,
    setCurrentItem,
  } = usePagination();

  useEffect(() => {
    setCountItems(count);
  }, [count, setCountItems]);

  const { filter, setFilterByName } = useFilterTable();

  const handleFilterByNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setFilterByName(event.target.value),
    [setFilterByName]
  );

  return (
    <>
      <GlobalStyle />
      <PublicLayout>
        <Title className="text-warning">starwarspedia</Title>

        <ControlsWrapper>
          <FormControlWrapper>
            <FormControl
              value={filter.byName.name}
              onChange={handleFilterByNameChange}
              placeholder="Filtrar por nome"
            ></FormControl>
          </FormControlWrapper>

          <Dropdown>
            <Dropdown.Toggle
              as={FilterToggle}
              className="text-warning"
              id="dropdown-custom-components"
            >
              Filtros
            </Dropdown.Toggle>

            <Dropdown.Menu
              columnLabels={{
                diameter: columnLabels.diameter,
                orbital_period: columnLabels.orbital_period,
                population: columnLabels.population,
                rotation_period: columnLabels.rotation_period,
                surface_water: columnLabels.surface_water,
              }}
              align="right"
              as={FilterDropdown}
            >
              {filter.byNumericValues?.length ? (
                filter.byNumericValues?.map((item) => (
                  <Dropdown.ItemText>{`${
                    columnLabels[item.column]
                  } ${operationsLabels[item.comparison].toLowerCase()} ${
                    item.value
                  }`}</Dropdown.ItemText>
                ))
              ) : (
                <Dropdown.ItemText>Nenhum filtro cadastrado</Dropdown.ItemText>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </ControlsWrapper>

        {planets?.length ? (
          <Table
            columnLabels={columnLabels}
            data={planets.map(({ residents, films, ...item }) => {
              return {
                ...item,
                films: films.length,
              };
            })}
          />
        ) : null}
        <PaginationWrapper>
          <PaginationButtonGroup
            pagination={pagination}
            onNextButtonClick={next}
            onPreviousButtonClick={previous}
            onPaginationChange={(index) => setCurrentItem(index)}
          />
        </PaginationWrapper>
      </PublicLayout>
    </>
  );
}

const enhance = pipe(
  withProvider(PlanetsContext),
  withProvider(PaginationContext),
  withProvider(FilterTableContext)
);

export default enhance(App);
