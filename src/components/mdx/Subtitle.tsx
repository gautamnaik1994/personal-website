import styled from 'styled-components';
import media from '../../utils/MediaQueries';
import { baseStyle, generateFontSize } from './BaseUtils';

export default styled.h2`
  ${baseStyle};
  ${generateFontSize(4)}
`;
