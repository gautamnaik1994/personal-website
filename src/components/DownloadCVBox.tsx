import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import DownloadCVButton from './ViewCVButton';

const StyledDownloadCV = styled.div`
  padding: 30px;
  background: var(--sideCardColor);
  border-radius: 8px;
  min-height: 290px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--cardShadow);
  .top-sec {
    font-size: 20px;
  }
  .middle-sec {
    text-transform: uppercase;
    font-size: 30px;
    font-weight: var(--fontWeightLight);
  }

  ${media.tablet} {
    width: 280px;
    min-height: 230px;
  }
  ${media.desktop} {
    min-height: 290px;
  }
`;

export default (props): JSX.Element => {
  return (
    <StyledDownloadCV {...props}>
      <div className="top-sec">Curriculum Vitae</div>
      <div className="middle-sec">Only 2 pages</div>
      <DownloadCVButton />
    </StyledDownloadCV>
  );
};
