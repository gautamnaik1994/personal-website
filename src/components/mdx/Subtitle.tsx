import styled from 'styled-components';
import media from '../../utils/MediaQueries';
import { baseStyle, generateFontSize } from './BaseUtils';

export default styled.h2`
  ${baseStyle};
  color: var(--tertiary);
  letter-spacing: -0.7px;
  ${generateFontSize(4)}
  text-transform: uppercase;
  word-spacing: 3px;
`;
