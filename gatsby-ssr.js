import React from 'react';
import Layout from './src/components/Layout';
import { darkTheme, lightTheme } from './src/utils/colors';

function htmlThemeFunction() {
  let initialThemeValue = `dark`;
  if (localStorage.getItem(`theme`) === null) {
    initialThemeValue = `dark`;
    localStorage.setItem(`theme`, `dark`);
  } else {
    initialThemeValue = localStorage.getItem(`theme`) || `dark`;
  }
  const _darkTheme = `🌑`;
  const _lightTheme = `🌕`;
  try {
    if (initialThemeValue === `light`) {
      document.documentElement.style.setProperty(`--theme`, `light`);
      _lightTheme?.forEach((data) => {
        document.documentElement.style.setProperty(
          `--${data.name}`,
          data.value,
        );
      });
    } else {
      document.documentElement.style.setProperty(`--theme`, `dark`);
      _darkTheme?.forEach((data) => {
        document.documentElement.style.setProperty(
          `--${data.name}`,
          data.value,
        );
      });
    }
  } catch (e) {}
}

const ScriptTag = () => {
  const boundFn = String(htmlThemeFunction)
    .replace(`'🌑'`, darkTheme)
    .replace(`'🌕'`, lightTheme);

  const calledFunction = `(${boundFn})()`;

  // calledFunction = Terser.minify(calledFunction).code;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
};

export const onRenderBody = ({
  setPreBodyComponents,
  setHeadComponents,
  setPostBodyComponents,
  setBodyAttributes,
}) => {
  // setHeadComponents(<FallbackStyles />);
  setHeadComponents([
    <link key="fg" rel="preconnect" href="https://fonts.gstatic.com" />,
    <link
      key="fontLink_r"
      href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap&text=0123456789"
      rel="stylesheet"
    />,
    <link
      key="fontLink_u"
      href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;0,700;1,400;1,700&display=swap"
      rel="stylesheet"
    />,
    <link
      as="script"
      key="preloadKey"
      rel="preload"
      href="/scripts/preloader.js"
    />,
  ]);
  // setPreBodyComponents(<ScriptTag />);
  setPreBodyComponents([
    <ScriptTag key="scriptTag" />,
    <div id="preloader" key="preloader">
      {/* Optional: */}
      <img
        src="/img/logo.svg"
        alt="logo"
        style={{ height: `calc(3.23625vw + 77.86408px)` }}
      />
      <div className="preloader_animation"></div>
    </div>,
  ]);
  setBodyAttributes({
    className: `preloader_active`,
  });
  setPostBodyComponents([
    <script key="bodyScriptKey" src="/scripts/preloader.js" />,
  ]);
};

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
