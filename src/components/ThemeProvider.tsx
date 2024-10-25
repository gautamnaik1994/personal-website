import React, { useState, useEffect } from 'react';
import { ThemeProvider as StyleThemeProvider } from 'styled-components';
import { primaryCol, desaturatedPrimaryCol } from '../utils/colors';

export default ({ children }: any): JSX.Element => {
  const [theme, setTheme] = useState<string | null>(null);

  const toggleTheme = (): void => {
    const currentTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    setTheme(currentTheme);
  };

  useEffect(() => {
    let initialThemeValue = theme;
    if (localStorage.getItem('theme') === null) {
      // if (matchMedia('(prefers-color-scheme: dark)').matches) {
      //   initialThemeValue = 'dark';
      //   localStorage.setItem('theme', 'dark');
      // } else {
      //   localStorage.setItem('theme', 'light');
      //   initialThemeValue = 'light';
      // }
      initialThemeValue = `dark`;
      localStorage.setItem(`theme`, `dark`);
    } else {
      initialThemeValue = localStorage.getItem('theme') || 'light';
    }
    //localStorage.setItem('theme', initialThemeValue);
    setTheme(initialThemeValue);
  }, []);

  return (
    <StyleThemeProvider
      theme={{
        mode: theme || null,
        primary: theme === 'light' ? primaryCol : desaturatedPrimaryCol,
      }}
    >
      {children}
    </StyleThemeProvider>
  );
};
