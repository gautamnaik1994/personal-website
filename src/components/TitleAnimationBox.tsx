import React from 'react';
import styled from 'styled-components';
import { toSvg } from 'jdenticon';

const TitleAnimationBox = styled.div`
  --dimens: 50px;
  width: var(--dimens);
  height: var(--dimens);
  border: 2px solid var(--primary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default ({ ...props }) => {
  return (
    <TitleAnimationBox
      className={props.className}
      dangerouslySetInnerHTML={{ __html: toSvg(new Date(), 35) }}
    ></TitleAnimationBox>
  );
};
