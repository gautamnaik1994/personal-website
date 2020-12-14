import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  ${media.desktop} {
    max-width: 1140px;
  }
`;

interface Props {
  children: React.ReactNode;
  className?: string;
}
export default ({ children, className = '' }: Props) => (
  <Container className={className}>{children}</Container>
);
