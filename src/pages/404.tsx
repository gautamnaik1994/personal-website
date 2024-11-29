import React from 'react';
import styled from 'styled-components';
import Link from '../components/Link';
import { primaryCol } from '../utils/colors';
import SEO from '../components/SEO';

const HomepageLink = styled(Link)`
  --blur: 7px;
  background-color: ${primaryCol};
  padding: 7px 20px 10px;
  display: inline-block;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: white;
  margin-top: 15px;
  :hover {
    --blur: 20px;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  .inner {
    > * {
    }
    h2,
    h4 {
      color: var(--bodyColor);
      margin: 0;
    }
    h4 {
      font-weight: normal;
      margin-top: 8px;
    }
    //text-align: center;
    .number {
      line-height: 79px;
      font-size: 13rem;
      font-weight: lighter;
      &:before,
      &:after {
        content: '4';
        font-size: 0.45em;
        position: relative;
        top: -0.4em;
      }
    }
  }
`;

const FourOFour = () => (
  <Wrapper>
    <div className="inner">
      {/*
        <div className="number">&bull;</div>
        */}
      <h2>Oops! The page you were looking for doesn&apos;t exist.</h2>
      <h4>You may have misspelled the address or the page may have removed</h4>
      <HomepageLink to="/" title="Home">
        Go to Homepage
      </HomepageLink>
    </div>
  </Wrapper>
);

export default FourOFour;

export const Head = () => <SEO />;
