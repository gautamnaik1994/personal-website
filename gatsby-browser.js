import React from 'react';
import Layout from './src/components/Layout';
import './src/styles/preloader.scss';

export function wrapPageElement({ element, props }) {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <Layout className={props.location.pathname} {...props}>
      {element}
    </Layout>
  );
}
export function onServiceWorkerUpdateReady() {
  typeof window !== `undefined` && window.location.reload(true);
}

// export function onRouteUpdate({ location, prevLocation }) {
//   console.log(`new pathname`, location.pathname);
//   console.log(`old pathname`, prevLocation ? prevLocation.pathname : null);
// }
