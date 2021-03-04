import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const Container = styled.section`
  max-width: 1200px;
  display: block;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
`;

const PublicLayout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default PublicLayout;
