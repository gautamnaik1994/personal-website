import React from 'react';
import styled from 'styled-components';
import Metaballs from './Metaballs';
import Name from './Name';

const HomePageHeader = styled.div`
  position: relative;
`;

export default () => {
  return (
    <HomePageHeader>
      <Metaballs showTweakPane={false} />
      <Name />
    </HomePageHeader>
  );
};
