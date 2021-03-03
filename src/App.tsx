import React, { useCallback, useEffect } from "react";
import Table from "./components/Table/Table";

import { usePlanets } from "./context/usePlanets";

import FormControl from "react-bootstrap/FormControl";
import { useFilter } from "./context/useFilter";
import PaginationButtonGroup from "./components/PaginationButtonGroup/PaginationButtonGroup";
import { usePagination } from "./context/usePagination";
import PublicLayout from "./components/PublicLayout/PublicLayout";
import styled, { createGlobalStyle } from "styled-components";
import { Button, Dropdown } from "react-bootstrap";
import FilterToggle from "./components/filter/FilterToggle/FilterToggle";
import FilterDropdown from "./components/filter/FilterDropdown/FilterDropdown";
import pipe from "@bitty/pipe";
import withProvider from "./utils/react/withProvider";

import FilterContext from "./context/useFilter";
import PaginationContext from "./context/usePagination";
import PlanetsContext from "./context/usePlanets";
import columnLabels from "./constants/columnsLabels";
import operationsLabels from "./constants/operationsLabels";
import SortContext, { useSort } from "./context/useSort";
import SortDropdown from "./components/sort/SortDropdown/SortDropdown";

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

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    font-weight: bold;
  }

  p {
    margin: 0;
  }
`;

function App() {
  const { planets } = usePlanets();

  const { count } = usePlanets();

  const { setSort } = useSort();

  const {
    pagination,
    next,
    previous,
    setCountItems,
    setCurrentItem,
  } = usePagination();

  const { removeFilterByNumericValues } = useFilter();

  useEffect(() => {
    setCountItems(count);
  }, [count, setCountItems]);

  const { filter, setFilterByName } = useFilter();

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

          <Dropdown className="ml-auto mr-2">
            <Dropdown.Toggle
              as={FilterToggle}
              className="text-warning"
              id="dropdown-custom-components"
            >
              Ordenação
            </Dropdown.Toggle>

            <Dropdown.Menu
              columnLabels={columnLabels}
              align="right"
              as={SortDropdown}
              onSubmit={setSort}
            ></Dropdown.Menu>
          </Dropdown>

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
                filter.byNumericValues?.map((item, index) => (
                  <Dropdown.ItemText key={item.column + index}>
                    <Wrapper>
                      <Button
                        className="mr-2"
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFilterByNumericValues(item.column)}
                      >
                        &times;
                      </Button>
                      <p style={{ display: "flex" }}>
                        {`${columnLabels[item.column]} ${operationsLabels[
                          item.comparison
                        ].toLowerCase()} ${item.value}`}
                      </p>
                    </Wrapper>
                  </Dropdown.ItemText>
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
            data={planets.map(({ residents, films, ...item }) => ({
              ...item,
              films: films.length,
            }))}
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
  withProvider(SortContext),
  withProvider(PaginationContext),
  withProvider(FilterContext)
);

export default enhance(App);
