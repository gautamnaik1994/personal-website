import { darkTheme, lightTheme } from './colors';

export const getThemeValue = (): string => {
  let initialThemeValue = 'dark';
  if (typeof window !== 'undefined') {
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
  }

  //setColors(initialThemeValue);
  return initialThemeValue;
};

export const setColors = (theme: string): void => {
  if (theme === 'light') {
    lightTheme.forEach((data) => {
      document.documentElement.style.setProperty(`--${data.name}`, data.value);
    });
  } else {
    darkTheme.forEach((data) => {
      document.documentElement.style.setProperty(`--${data.name}`, data.value);
    });
  }
};
