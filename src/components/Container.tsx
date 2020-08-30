import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1140px;
  padding: 0 15px;
  margin: 0 auto;
`;

interface Props {
  children: React.ReactNode;
}
export default ({ children }: Props) => <Container>{children}</Container>;
