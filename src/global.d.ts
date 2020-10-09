import { CSSProp } from 'styled-components';

declare module '*.png';
declare module 'countdown';

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp;
  }
}
