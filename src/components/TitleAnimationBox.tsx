import React from 'react';
import styled from 'styled-components';

const TitleAnimationBox = styled.div`
  --dimens: 50px;
  width: var(--dimens);
  height: var(--dimens);
  border: 2px solid var(--primary);
  border-radius: 4px;

  &.type-1 {
    div {
    }
  }
`;

const renderType = (aType: number) => {
  console.log('render type');
  switch (aType) {
    case 1:
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
          >
            <polygon points="50 15, 100 100, 0 100" />
          </svg>
        </>
      );
    default:
      return <div className="a-default" />;
  }
};

export default ({ aType = 1 }) => {
  return (
    <TitleAnimationBox className={`type-${aType}`}>
      {renderType(aType)}
    </TitleAnimationBox>
  );
};
