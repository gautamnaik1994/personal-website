import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import media from '../utils/MediaQueries';

const properties = {
  close: {
    transform: `translateX(100%)`,
  },
  open: {
    transform: `translateX(0%)`,
  },
  springConfig: { mass: 5, tension: 250, friction: 35 },
};

// const bgColor = transparentize(0.5, cssVar('--bodyBackgroundColor', '#fff'));

const BlogSidebar = styled(animated.div)`
  transition: background-color 0.3s ease-in;
  background-color: var(--bodyBackgroundColor);
  position: fixed;
  top: 0;
  left: 30%;
  bottom: 0;
  z-index: 2;
  width: 100%;
  will-change: transform;
  box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.5);
  padding: 25px;
  overscroll-behavior: contain;

  .inner {
    height: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
  }
  ${media.desktop} {
    padding: 0 0 0 25px;
    position: static;
    box-shadow: none;
    transform: translateY(0) !important;
  }
`;

const FilterButton = styled.button`
  position: absolute;
  bottom: 50px;
  left: -20px;
  z-index: 99;
  width: 40px;
  line-height: 43px;
  padding: 0;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--primary);
  color: #fff;
  font-size: 20px;
  box-shadow: 0 0 0px 1px var(--primary);
  i {
    text-indent: 2px;
    display: inline-block;
  }
  ${media.desktop} {
    display: none;
  }
`;

export interface Props {
  className?: string;
  menuOpen: boolean;
  nextPagePath?: string;
  previousPagePath?: string;
  setMenuOpen: (arg0: boolean) => void;
  children: JSX.Element;
}

export default ({
  className,
  previousPagePath,
  nextPagePath,
  menuOpen,
  setMenuOpen,
  children,
}: Props): JSX.Element => {
  // const [menuOpen, setMenuOpen] = useState(false);

  const { transform } = properties[menuOpen ? `open` : `close`];

  const sideBarProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  return (
    <Fragment>
      <BlogSidebar
        className={className}
        style={{ transform: sideBarProps.transform }}
      >
        <div className="inner">
          {children}
          <FilterButton onClick={() => setMenuOpen(!menuOpen)}>
            <i className="icon-arrow-right" />
          </FilterButton>
        </div>
      </BlogSidebar>
    </Fragment>
  );
};
