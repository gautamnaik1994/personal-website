import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from 'styled-theming';
import Paragraph from './mdx/Paragraph';
import { lighten } from 'polished';
import Link from './Link';
import Badge from './Badge';
import media from '../utils/MediaQueries';
import { darkBackgroundColor } from '../utils/colors';

const readMoreAnimation = keyframes`
    0%{
        transform:translateX(-34px);
    }
    50%{
        transform:translateX(0px);
    }
    100%{
        transform:translateX(34px);
    }

`;

const bottomPadding = 44;
const backgroundColor = theme('mode', {
  light: '#fff',
  dark: lighten(0.05, darkBackgroundColor),
});

const boxShadow = theme('mode', {
  light: '0 6px 16px -4px #ff8705',
  dark: '0 0px 0px 10px #121212',
});

const PostItem = styled.div`
  box-shadow: 0px 3px 9px -2px rgba(0, 0, 0, 0.25);
  padding: 15px 15px ${bottomPadding}px 15px;
  border-radius: 5px;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 100px;
  }
  position: relative;
  background: ${backgroundColor};
  border-bottom: 0;
  h2 {
    font-variant-ligatures: none;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    height: 80%;
    //background-image: radial-gradient(
    //ellipse closest-side,
    //rgba(0, 0, 0, 0.74),
    //#1f1f1f
    //),
    //url(https://source.unsplash.com/daily);
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.75;
  }
  ${media.tablet} {
    padding: 15px;
    margin-bottom: 15px;
  }
  &:last-child {
    margin-bottom: 40px;
  }
  .inner {
    position: relative;
    z-index: 1;
  }
`;
const StyledParagraph = styled(Paragraph)`
  font-size: 16px;
  line-height: 1.85;
`;

const ReadMore = styled(Link)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 14px;
  text-align: center;
  display: block;
  color: black;
  background-image: linear-gradient(#ff9913, #ff8000);
  text-align: center;
  position: absolute;
  bottom: -25px;
  right: 50%;
  transform: translateX(50%);
  transition: box-shadow 0.3s ease-in;
  color: rgba(255, 255, 255, 0.61);
  box-shadow: ${boxShadow};
  overflow: hidden;
  i {
    display: inline-block;
  }
  & :hover {
    i {
      animation: ${readMoreAnimation} 0.3s linear 2;
    }
  }
  ${media.tablet} {
    transform: translateX(0);
    box-shadow: ${boxShadow};
    top: 30px;
    bottom: auto;
    right: -23px;
  }
`;

const Category = styled.div`
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1px;
`;

interface Props {
  link: string;
  title: string;
  date: string;
  excerpt: string;
  category: string[];
  tags: string[];
  readTime: number;
}

export default ({
  link,
  title,
  date,
  excerpt,
  category,
  tags,
  readTime,
}: Props) => (
  <PostItem>
    <div className="inner">
      <h2 className="m-0">
        <Link title={title} to={`/blog${link}`}>
          {title}
        </Link>
      </h2>
      <small>
        {date} &bull; {readTime} minutes read
      </small>

      <div className="half-rem-mt">
        <Badge name={category[0]} />
      </div>
      <StyledParagraph>{excerpt}</StyledParagraph>
      {/*
      <div>
        {tags.map((tag, index) => (
          <Badge key={index} name={tag} />
        ))}
    </div>
      */}
    </div>
    <ReadMore title="Read More" to={link}>
      <i className="icon-arrow" />
    </ReadMore>
  </PostItem>
);
