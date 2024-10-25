import { darkTheme, lightTheme } from './colors';

export const getThemeValue = (): string => {
  let initialThemeValue = `dark`;
  if (typeof window !== `undefined`) {
    if (localStorage.getItem(`theme`) === null) {
      // if (matchMedia(`(prefers-color-scheme: dark)`).matches) {
      //   initialThemeValue = `dark`;
      //   localStorage.setItem(`theme`, `dark`);
      // } else {
      //   localStorage.setItem(`theme`, `light`);
      //   initialThemeValue = `light`;
      // }
      initialThemeValue = `dark`;
      localStorage.setItem(`theme`, `dark`);
    } else {
      initialThemeValue = localStorage.getItem(`theme`) || `dark`;
    }
    setColors(initialThemeValue);
  }

  return initialThemeValue;
};

interface colorData {
  name: string;
  value: string;
}

export const setColors = (theme: string): void => {
  if (theme === `light`) {
    lightTheme?.forEach((data: colorData) => {
      document.documentElement.style.setProperty(`--${data.name}`, data.value);
    });
  } else {
    darkTheme?.forEach((data: colorData) => {
      document.documentElement.style.setProperty(`--${data.name}`, data.value);
    });
  }
};
