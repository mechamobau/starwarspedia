import React, { useCallback, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import styled, { createGlobalStyle } from 'styled-components';

import pipe from '@bitty/pipe';

import FilterToggle from './components/dropdown/FilterToggle';
import FilterDropdown from './components/dropdown/FilterDropdown';
import SortDropdown from './components/dropdown/SortDropdown';
import PublicLayout from './components/global/PublicLayout';
import PaginationButtonGroup from './components/table/PaginationButtonGroup';
import Table from './components/table/Table';
import columnLabels from './constants/columnsLabels';
import operationsLabels from './constants/operationsLabels';
import { useFilter } from './context/useFilter';
import { usePagination } from './context/usePagination';
import { usePlanets } from './context/usePlanets';
import { useSort } from './context/useSort';

const APP_BACKGROUND_IMAGE = process.env.PUBLIC_URL + '/background.jpg';

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
  font-size: 1.9em;
  font-family: 'Star Jedi', Arial, sans-serif;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 5em;
  }

  @media (min-width: 1024) {
    font-size: 7em;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const FormControlWrapper = styled.div`
  width: 100%;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  align-items: center;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;

  @media (min-width: 768px) {
    justify-content: flex-end;

    .dropdown {
      margin: 0 5px;
    }
  }
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
  const { planets, count } = usePlanets();

  const { setSort } = useSort();

  const { pagination, next, previous, setCountItems, setCurrentItem } =
    usePagination();

  const { removeFilterByNumericValues, filter, setFilterByName } = useFilter();

  useEffect(() => {
    setCountItems(count);
  }, [count, setCountItems]);

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

          <DropdownWrapper>
            <Dropdown>
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
                          onClick={() =>
                            removeFilterByNumericValues(item.column)
                          }
                        >
                          &times;
                        </Button>
                        <p style={{ display: 'flex' }}>
                          {`${columnLabels[item.column]} ${operationsLabels[
                            item.comparison
                          ].toLowerCase()} ${item.value}`}
                        </p>
                      </Wrapper>
                    </Dropdown.ItemText>
                  ))
                ) : (
                  <Dropdown.ItemText>
                    Nenhum filtro cadastrado
                  </Dropdown.ItemText>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </DropdownWrapper>
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
            onPaginationChange={setCurrentItem}
          />
        </PaginationWrapper>
      </PublicLayout>
    </>
  );
}

export default App;
