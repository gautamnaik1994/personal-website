import React, { useState, useEffect, useRef } from 'react';
import media from '../../utils/MediaQueries';
import SectionTitle from '../SectionTitle';
import Signature from '../Signature';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
  .declaration {
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 2rem;
  }
  .name-sign {
    display: inline-block;
    border: 2px dashed grey;
    padding: 15px 50px;
    border-radius: 8px;
  }
  ${media.desktop} {
    width: 680px;
    margin: auto;
    .name-sign {
      text-align: right;
      svg {
        margin-right: 15px;
      }
    }
  }
`;

export default ({ className }: Props): JSX.Element => {
  const [entered, setEntered] = useState(false);
  const intersectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        //console.log('called callback', entries[0].intersectionRatio);
        if (intersectionRef && intersectionRef.current) {
          const ratio = entries[0].intersectionRatio;
          if (ratio >= 1) {
            setEntered(true);
          } else {
            setEntered(false);
          }
        }
      },
      {
        threshold: 1,
        rootMargin: '200px 0px -100px 0px',
        //root: document.querySelector('#f_root'),
      },
    );
    intersectionRef &&
      intersectionRef.current &&
      observer.observe(intersectionRef.current);
    return () => {
      intersectionRef &&
        intersectionRef.current &&
        observer.unobserve(intersectionRef.current);
    };
  }, []);

  return (
    <section className={className} ref={intersectionRef}>
      <SectionTitle title="Declaration" />
      <StyledDiv>
        <div className="declaration">
          I declare that the information given above is genuine & correct to the
          best of my knowledge.
        </div>
        <div className="name-sign">
          <Signature className={entered ? 'animate' : ''} />
        </div>
      </StyledDiv>
    </section>
  );
};
