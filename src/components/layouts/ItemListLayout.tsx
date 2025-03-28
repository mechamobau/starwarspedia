import { Link, Outlet } from 'react-router';
import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { entitiesList } from '../../constants/entitiesList';
import { NavDropdown } from 'react-bootstrap';

const Title = styled.h1`
  font-size: 1.9em;
  font-family: 'Star Jedi', Arial, sans-serif;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1024) {
    font-size: 1.5rem;
  }
`;

export function ItemListLayout() {
  const { t } = useTranslation();
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <Title
              style={{ height: 40, display: 'inline' }}
              className="text-warning"
            >
              starwarspedia
            </Title>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavDropdown title="Entidades" id="basic-nav-dropdown">
                {entitiesList.map((entity) => {
                  return (
                    <Link to={`/${entity}`}>
                      <NavDropdown.Item href={`/${entity}`}>
                        <Nav.Link href={`/${entity}`}>
                          {t(`${entity}:title`)}
                        </Nav.Link>
                      </NavDropdown.Item>
                    </Link>
                  );
                })}
              </NavDropdown>

              <Link to={`/favorites`}>
                <Nav.Link href={`/favorites`}>{t(`favorites:title`)}</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}
