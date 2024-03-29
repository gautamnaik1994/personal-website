import { createGlobalStyle } from 'styled-components';
import theme from 'styled-theming';
import media from '../utils/MediaQueries';
import {
  primaryCol,
  desaturatedPrimaryCol,
  darkBackgroundColor,
  darkBackgroundTextColor,
  accentColor,
} from '../utils/colors';

const _primaryCol = theme(`mode`, {
  light: primaryCol,
  dark: desaturatedPrimaryCol,
});

const bodyBackgroundColor = theme(`mode`, {
  light: `#fff`,
  dark: darkBackgroundColor,
});

const bodyColor = theme(`mode`, {
  light: `#333`,
  dark: darkBackgroundTextColor,
});

interface Props {
  theme?: { primary: string };
}

// transition: background-color 0.3s ease-in, color 0.3s ease-in;
export const GlobalStyle = createGlobalStyle<Props>`

  ${() => {
    /* Override PrismJS Defaults */ return null;
  }}
  
  .show-for-tablet {
    display: none;
    ${media.desktop} {
      display: block;
    }
  }
.section-spacer {
  margin: 6rem 0;
	${media.desktop} {
		margin: 10rem 0;
	}
}

`;
