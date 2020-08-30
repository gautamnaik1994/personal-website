import React from 'react';
import styled from 'styled-components';
import Link from '../components/Link';
import Layout from '../components/Layout';
import { primaryCol } from '../utils/colors';
import { transparentize, lighten, desaturate } from 'polished';

const HomepageLink = styled(Link)`
  --blur: 7px;
  background-color: ${primaryCol};
  padding: 7px 20px;
  display: inline-block;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 3px var(--blur) -2px ${transparentize(0.6, primaryCol)};
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
      color: #333;
      margin: 0;
    }
    h4 {
      font-weight: normal;
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

export default () => (
  <Layout>
    <div className="inner">
      <h1>Homepage</h1>
      <h1>Homepage</h1>
      <h1>Homepage</h1>
      <h1>Homepage</h1>
    </div>
  </Layout>
);
