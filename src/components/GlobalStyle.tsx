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

const _primaryCol = theme('mode', {
  light: primaryCol,
  dark: desaturatedPrimaryCol,
});

const bodyBackgroundColor = theme('mode', {
  light: '#fff',
  dark: darkBackgroundColor,
});

const bodyColor = theme('mode', {
  light: '#333',
  dark: darkBackgroundTextColor,
});

interface Props {
  theme?: { primary: string };
}

//transition: background-color 0.3s ease-in, color 0.3s ease-in;

export const GlobalStyle = createGlobalStyle<Props>`
:root {
    --primary: ${primaryCol};
    --accent: ${accentColor};
		--bodyBackgroundColor: #fff;
    --bodyColor: #333;
		--fontWeightBold:700;
		--fontWeightMedium:500;
		--fontWeightRegular:400;
		--fontWeightLight:300;
  }
  ${() => {
    /* Override PrismJS Defaults */ return null;
  }}

	html{
		font-size: 14px;
		line-height: 21px;
	}

  

  .show-for-tablet {
    display: none;
    ${media.desktop} {
      display: block;
    }
  }
  
`;
