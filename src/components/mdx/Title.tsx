import styled from 'styled-components';
import { baseStyle, generateFontSize } from './BaseUtils';
// https://typescale.com/?size=16&scale=1.125&text=Why%20should%20you%20remap%20ESC%20key%20in%20Vim&font=Ubuntu&fontweight=400&bodyfont=body_font_default&bodyfontweight=400&lineheight=1.75&backgroundcolor=%23ffffff&fontcolor=%23000000&preview=false
// https://typescale.com/?size=16&scale=1.250&text=Why%20should%20you%20remap%20ESC%20key%20in%20Vim&font=Ubuntu&fontweight=400&bodyfont=body_font_default&bodyfontweight=400&lineheight=1.75&backgroundcolor=%23ffffff&fontcolor=%23000000&preview=false

export default styled.h1`
  ${baseStyle};
  letter-spacing: -0.6px;
  ${generateFontSize(7)}//line-height:ratio*font-size;
`;
