import React from 'react';

function htmlThemeFunction() {
  let initialThemeValue = 'light';
  if (localStorage.getItem('theme') === null) {
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
      initialThemeValue = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
      initialThemeValue = 'light';
    }
  } else {
    initialThemeValue = localStorage.getItem('theme') || 'light';
  }
  const darkTheme = [
    { name: 'primary', value: '#FF8C32' },
    { name: 'accent', value: '#44D6BC' },
    { name: 'bodyBackgroundColor', value: '#212738' },
    { name: 'bodyColor', value: '#fff' },
  ];
  const lightTheme = [
    { name: 'primary', value: '#FF8C32' },
    { name: 'accent', value: '#44D6BC' },
    { name: 'bodyBackgroundColor', value: '#fff' },
    { name: 'bodyColor', value: '#333' },
  ];
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
  const boundFn = String(htmlThemeFunction);

  let calledFunction = `(${boundFn})()`;

  // calledFunction = Terser.minify(calledFunction).code;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
};

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  // setHeadComponents(<FallbackStyles />);
  setPreBodyComponents(<ScriptTag />);
};
