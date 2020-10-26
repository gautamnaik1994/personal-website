import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';

const SubContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  ${media.desktop} {
    max-width: 768px;
  }
`;

interface Props {
  children: React.ReactNode;
}
export default ({ children }: Props) => <SubContainer>{children}</SubContainer>;
