import React from 'react';
import media from '../../utils/MediaQueries';
import SectionTitle from '../SectionTitle';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
  .declaration {
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 2rem;
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
  console.log('');
  return (
    <section className={className}>
      <SectionTitle title="Declaration" />
      <StyledDiv>
        <div className="declaration">
          I declare that the information given above is genuine & correct to the
          best of my knowledge.
        </div>
        <div className="name-sign">
          <svg
            width="54"
            height="107"
            viewBox="0 0 54 107"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.83323 62.5932C8.83323 62.5932 13.2831 56.0822 15.1046 50.7634C16.926 45.4445 17.0173 42.0095 16.061 36.9216C15.1046 31.8336 11.7192 28.8487 7.03828 30.0698C2.35734 31.2909 1.86004 38.9753 3.17143 45.4693C4.48282 51.9633 13.0082 61.8187 17.0786 63.7861C21.1489 65.7534 24.7721 64.2878 26.3047 62.0222C27.8374 59.7567 27.1328 51.6068 27.6007 51.5972C28.0686 51.5875 37.1086 89.1123 34.964 95.5215C32.8194 101.931 28.1859 105.188 25.0566 104.623C21.9274 104.059 18.9856 102.406 18.1935 94.6828C17.4013 86.9599 34.0599 66.3606 34.4119 58.0102C34.764 49.6599 20.5011 25.4633 21.7748 24.5441C23.0484 23.625 49.4646 48.0217 50.9984 47.2332C52.5321 46.4446 38.3405 20.2411 37.7941 15.8275C37.2477 11.4138 39.1129 5.26757 42.3149 2.11981"
              stroke="#ADBAC7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Gautam Naik</p>
        </div>
      </StyledDiv>
    </section>
  );
};
