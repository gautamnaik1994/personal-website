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

export const GlobalStyle = createGlobalStyle<Props>`
:root {
    --primary: ${_primaryCol};
    --accent: ${accentColor};
    --bodyBackgroundColor: ${bodyBackgroundColor};
    --bodyColor: ${bodyColor};
  }
  html,
  body {
    font-family: Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }
  body {
    transition: background-color 0.3s ease-in, color 0.3s ease-in;
    background-color: var(--bodyBackgroundColor);
    color: var(--bodyColor);
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: var(--primary);
  }

  ${() => {
    /* Override PrismJS Defaults */ return null;
  }}

  pre {
    //background-color: #2f1e2e !important;
    //border-radius: 4px;
    //font-size: 14px;
  }
  code {
  }

  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }
  .m-0 {
    margin: 0 !important;
  }
  .mb-0 {
    margin-bottom: 0 !important;
  }
  .date {
    color: #9e9e9e;
  }
  .category-shadow {
    box-shadow: 0 4px 3px 0px rgba(0, 0, 0, 0.16);
    ${media.tablet} {
      box-shadow: none;
    }
  }
  .show-for-tablet {
    display: none;
    ${media.tablet} {
      display: block;
    }
  }
  .half-rem-mt {
    margin-top: 0.5rem;
  }
  .two-rem-mb {
    margin-bottom: 2rem;
  }
  /**
        * * Add back the container background-color, border-radius, padding, margin
    * * and overflow that we removed from <pre>.
        * */
  .gatsby-highlight {
    background-color: #2d2d2d;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
    //border: 2px solid #38FF64;
    border-left: 6px solid #38ff64;
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.25);

    /**
         *   * Remove the default PrismJS theme background-color, border-radius,
         *   margin,
         *     * padding and overflow.
         *       * 1. Make the element just wide enough to fit its content.
         *         * 2. Always fill the visible space in .gatsby-highlight.
         *           * 3. Adjust the position of the line numbers
         *             */
    pre[class*='language-'] {
      background-color: transparent;
      margin: 0;
      padding: 0;
      overflow: initial;
      float: left;
      min-width: calc(100% - 3em);

      &.line-numbers {
        padding-left: 3em;
        padding-right: 1em;

        .line-numbers-rows {
          right: calc(100% - 25px);
          left: unset !important;
        }

        .gatsby-highlight-code-line {
          background-color: #455a64;
          display: block;
          margin-right: -1em;
          margin-left: -1em;
          padding-right: 1em;
          padding-left: 0.75em;
        }
      }
    }
  }
  :not(pre) > code[class*='language-'] {
    padding: 2px 8px;
    font-size: 0.85em;
    color: #38ff64;
    background: #404040;
  }
`;
