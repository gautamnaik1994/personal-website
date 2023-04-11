import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
// https://nickymeuleman.netlify.app/blog/table-of-contents#starting-point
// https://scottspence.com/posts/smooth-scroll-toc-gatsby

function getIds(items) {
  return items.reduce((acc, item) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push(item.url.slice(1));
    }
    if (item.items) {
      acc.push(...getIds(item.items));
    }
    return acc;
  }, []);
}

function useActiveId(itemIds) {
  const [activeId, setActiveId] = useState(`test`);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` },
    );
    itemIds.forEach((id) => {
      observer.observe(document.getElementById(id));
    });
    return () => {
      itemIds.forEach((id) => {
        // console.log(`unobserve`, id);
        const elem = document.getElementById(id);
        if (elem) {
          observer.unobserve(elem);
        }
      });
    };
  }, [itemIds]);
  return activeId;
}

function renderItems(items, activeId) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.url}>
            <a
              href={item.url}
              style={{
                color:
                  activeId === item.url?.slice(1)
                    ? `var(--primary)`
                    : `var(--bodyColor)`,
              }}
            >
              {item.title}
            </a>
            {item.items && renderItems(item.items, activeId)}
          </li>
        );
      })}
    </ul>
  );
}
const StyledToc = styled.div`
  position: sticky;
  top: 60px;
  padding: 40px;
  display: none;
  ul {
    list-style-type: none;
    padding-left: 10px;
    font-size: 14px;
    margin-left: 0px;
    li {
      margin: 5px 0;
    }
  }
  ${media.desktop} {
    display: block;
  }
`;

function TableOfContents(props) {
  const idList = getIds(props.items);
  const activeId = useActiveId(idList);
  return (
    <StyledToc>
      <details open>
        <summary>Table of Contents</summary>
        {renderItems(props.items, activeId)}
      </details>
    </StyledToc>
  );
}

export default TableOfContents;
