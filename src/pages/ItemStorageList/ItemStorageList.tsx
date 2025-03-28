import { useLayoutEffect } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';
import { useItemList as useItemList } from '../../hooks/useItemList';
import { useTranslation } from 'react-i18next';
import { entitiesList } from '../../constants/entitiesList';
import useLocalStorage from '@rehooks/local-storage';
import { Link } from 'react-router';

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
    justify-content: flex-start;

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

export const ItemStorageList = () => {
  const { clearState } = useItemList('favorites');
  const [favorites, setFavorites] =
    useLocalStorage<Record<string, string>[]>('favorites');

  useLayoutEffect(() => {
    return () => {
      clearState();
    };
  }, []);

  const { t, i18n } = useTranslation();

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title className="text-warning">{t(`favorites:title`)}</Title>

        {favorites ? (
          <Row>
            {favorites.map((favorite) => {
              const pathname = new URL(`${favorite.url}`).pathname.replace(
                '/api/',
                ''
              );
              const resource = pathname.split('/')?.[0] ?? '';
              const badgeColors: Record<string, string> = {
                planets: 'primary',
                people: 'secondary',
                films: 'warning',
              };
              return (
                <Col sm={4}>
                  <Card className="p-3 bg-dark mb-3">
                    <Card.Title className="text-white">
                      {'name' in favorite ? favorite.name : ''}
                    </Card.Title>
                    <Card.Text>
                      <Badge bg={badgeColors?.[resource] ?? 'info'}>
                        {t(`${resource}:title`)}
                      </Badge>
                    </Card.Text>
                    <ButtonGroup>
                      <Button>
                        <Link to={`/${pathname}`} className="text-white">
                          {t('favorites:cta')}{' '}
                          {'name' in favorite ? favorite.name : ''}
                        </Link>
                      </Button>
                      <Button
                        className="inline-block"
                        variant="danger"
                        onClick={() => {
                          setFavorites(
                            favorites?.filter((item) =>
                              'url' in favorite && 'url' in item
                                ? item.url !== favorite.url
                                : false
                            ) ?? []
                          );
                        }}
                      >
                        {t('favorites:delete')}
                      </Button>
                    </ButtonGroup>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <h3 className="text-warning text-center">Sem favoritos</h3>
        )}
      </Container>
    </>
  );
};
