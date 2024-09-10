import styled, { css } from 'styled-components';
import media from '../../utils/MediaQueries';

export const baseStyle = css`
  margin: 3rem 0 1.38rem;
  font-weight: 500;
  line-height: 1.3;
`;

export const generateFontSize = (level: number) => {
  const mobileRatio = 1.125;
  const desktopRatio = 1.25;

  return css`
    font-size: ${Math.pow(mobileRatio, level).toFixed(3)}rem;
    ${media.desktop} {
      /* font-size: ${Math.pow(desktopRatio, level).toFixed(3)}rem; */
    }
  `;
};
