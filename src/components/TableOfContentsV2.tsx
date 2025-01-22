import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';

interface Props {
  isPopup?: boolean;
  items: [];
  onCloseHandler?: () => void;
}

const TOC = styled.div`
  background: var(--sideCardColor);
  padding: 20px 15px;
  border-radius: 8px;
  margin-top: 2rem;
  & > ul {
    margin-bottom: 0;
  }
  li {
    margin-top: 8px;
  }

  &.toc-popup {
    position: fixed;
    bottom: 80px;
    height: 300px;
    overflow: auto;
    right: 15px;
    width: 300px;
    z-index: 1;
    box-shadow: var(--cardShadow);
    li {
      margin-top: 5px;
    }
    ${media.tablet} {
      height: 400px;
      bottom: 80px;
    }
  }

  ${media.tablet} {
    padding: 25px;

    a:hover {
      text-decoration: underline;
    }
  }
`;

const TableOfContents = ({ items, isPopup = false, onCloseHandler }: Props) => {
  const handleClick = (e, url) => {
    e.preventDefault();
    const targetElement = document.querySelector(url);
    if (targetElement) {
      onCloseHandler();
      targetElement.scrollIntoView();
    }
  };

  const renderItems = (items, level = 0) => {
    return (
      <ul className="toc-list" style={{ paddingLeft: `${level + 1 * 20}px` }}>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.url} onClick={(e) => handleClick(e, item.url)}>
              {item.title}
            </a>
            {item.items &&
              item.items.length > 0 &&
              renderItems(item.items, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <TOC className={isPopup ? `toc-popup` : ``}>
      <h2 className="mt-0">Table of Contents</h2>
      {renderItems(items)}
    </TOC>
  );
};

export default TableOfContents;

// const StyledUL = styled.ul`
//   list-style: none;
//   counter-reset: section;
//   & > li {
//     counter-increment: section;
//     margin-bottom: 0.5rem;
//     &:before {
//       content: counters(section, '.', decimal-leading-zero) '. ';
//     }
//   }
//   & > li ul {
//     counter-reset: section;
//     padding-left: 1rem;
//   }
// `;

// position: fixed;
//     bottom: 80px;
//     height: 200px;
//     overflow: auto;
//     right: 15px;
//     width: 300px;
//     z-index: 1;
//     box-shadow: var(--cardShadow);
