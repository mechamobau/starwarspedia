import { useLayoutEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';
import { Navigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { entitiesList } from '../../constants/entitiesList';
import { useItem } from '../../hooks/useItem';

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

export const GetById = () => {
  const { entityName, entityId } = useParams<{
    entityName: string;
    entityId: string;
  }>();
  const { item, clearState } = useItem(`${entityName!}/${entityId!}`);

  const { t } = useTranslation();

  useLayoutEffect(() => {
    return () => {
      clearState();
    };
  }, [entityName, entityId]);

  if (!entityId) {
    return <Navigate to={`/${entityName}`} />;
  }

  if (!entitiesList.includes(entityName as 'planets' | 'people')) {
    return <Navigate to="/404" />;
  }

  const title = item && 'name' in item ? item.name : t(`${entityName!}:title`);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title className="text-warning">{title}</Title>
        {item ? (
          Object.entries(item).map(([key, value]) => {
            return (
              <div>
                <Form.Group className="mb-3" controlId={key}>
                  <Form.Label className="text-warning">
                    {t(`${entityName}:${key}`)}
                  </Form.Label>
                  <Form.Control as="textarea" rows={3} value={value} readOnly />
                </Form.Group>
              </div>
            );
          })
        ) : (
          <h2 className="text-warning">Carregando</h2>
        )}
      </Container>
    </>
  );
};
