import React from 'react';
import { render } from 'react-dom';
import { themes } from '@storybook/theming';
import { action } from '@storybook/addon-actions';
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import '../src/styles/style.css';
import { configure, addDecorator } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { StoryContext, StoryGetter, StoryWrapper } from '@storybook/addons';
import { MINIMAL_VIEWPORTS, DEFAULT_VIEWPORT } from '@storybook/addon-viewport';
import { ThemeProvider as StyleThemeProvider } from 'styled-components';

import { GlobalStyle } from '../src/components/GlobalStyle';
import ThemeProvider from '../src/components/ThemeProvider';
import { setColors } from '../src/utils/themeConfig';

// const withGloabalStyleProvider = (Story, context) => {
//   return (
//     <React.Fragment>
//       <GlobalStyle />
//       <Story {...context} />
//     </React.Fragment>
//   )
// }
// export const decorators = [withGloabalStyleProvider];

const appThemes = [
  {
    name: 'light',
    mode: 'light',
    primary: 'blue',
  },
  {
    name: 'dark',
    mode: 'dark',
    primary: 'blue',
  },
];

const setTheme = (theme) => {
  setColors(theme);
  if (theme == 'light') {
    return appThemes[1];
  } else return appThemes[0];
};
//addDecorator(withThemesProvider(themes));

function ThemeWrapper(props) {
  return (
    <StyleThemeProvider
      theme={useDarkMode() ? setTheme('dark') : setTheme('light')}
    >
      {props.children}
    </StyleThemeProvider>
  );
}
addDecorator((renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>);

function loadStories() {
  const globalStyleEl =
    document.querySelector('#gen3-global-style') ||
    (() => {
      const el = document.createElement('div');
      el.id = 'gen3-global-style';
      document.head.append(el);
      return el;
    })();
  render(
    <ThemeWrapper>
      <GlobalStyle />
    </ThemeWrapper>,
    globalStyleEl,
  );
}

configure(loadStories, module);
// .storybook/preview.js

export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#212738',
      },
      {
        name: 'light',
        value: '#fff',
      },
    ],
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
    defaultViewport: DEFAULT_VIEWPORT,
  },
  darkMode: {
    //dark: { ...themes.dark, appBg: '#212738', stylePreview: true },
  },
};

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.

window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};
