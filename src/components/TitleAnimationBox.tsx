import React from 'react';
import styled from 'styled-components';
import { toSvg } from 'jdenticon';

const TitleAnimationBox = styled.div`
  --dimens: 50px;
  width: var(--dimens);
  height: var(--dimens);
  /* border: 2px solid var(--primary);
  border-radius: 4px; */

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
            width="100"
            height="100"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="1" width="32" height="32" rx="2" stroke="#4BACFE" />
            <path
              d="M5.5 9.33015L14.1603 9.33015L9.83013 16.8302L5.5 9.33015Z"
              fill="#E7222E"
            />
            <path
              d="M20.5 9.33015L29.1603 9.33015L24.8301 16.8302L20.5 9.33015Z"
              fill="#16588E"
            />
            <path
              d="M17 28.1603L12.6699 20.6603L21.3301 20.6603L17 28.1603Z"
              fill="#81C4FF"
            />
          </svg>
        </>
      );
    default:
      return <div className="a-default" />;
  }
};

export default ({ aType = 1 }) => {
  return (
    <TitleAnimationBox
      className={`type-${aType}`}
      dangerouslySetInnerHTML={{ __html: toSvg(new Date(), 50) }}
    ></TitleAnimationBox>
  );
};
