import React from 'react';
import Layout from './src/components/Layout';
import { darkTheme, lightTheme } from './src/utils/colors';

function htmlThemeFunction() {
  let initialThemeValue = 'dark';
  if (localStorage.getItem('theme') === null) {
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
      initialThemeValue = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
      initialThemeValue = 'light';
    }
  } else {
    initialThemeValue = localStorage.getItem('theme') || 'dark';
  }
  const darkTheme = '🌑';
  const lightTheme = '🌕';
  if (initialThemeValue === 'light') {
    document.documentElement.style.setProperty('--theme', 'light');
    lightTheme.forEach((data) => {
      document.documentElement.style.setProperty(`--${data.name}`, data.value);
    });
  } else {
    document.documentElement.style.setProperty('--theme', 'dark');
    darkTheme.forEach((data) => {
      document.documentElement.style.setProperty(`--${data.name}`, data.value);
    });
  }
}

const ScriptTag = () => {
  const boundFn = String(htmlThemeFunction)
    .replace("'🌑'", darkTheme)
    .replace("'🌕'", lightTheme);

  let calledFunction = `(${boundFn})()`;

  // calledFunction = Terser.minify(calledFunction).code;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
};

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  // setHeadComponents(<FallbackStyles />);
  setPreBodyComponents(<ScriptTag />);
};

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
