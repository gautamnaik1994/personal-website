import { createGlobalStyle } from 'styled-components';
import media from '../utils/MediaQueries';

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
