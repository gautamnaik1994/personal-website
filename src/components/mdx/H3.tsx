import styled from 'styled-components';
import { baseStyle, generateFontSize } from './BaseUtils';

export default styled.h3`
  ${baseStyle};
  ${generateFontSize(3)}
`;
