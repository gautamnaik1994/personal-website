import React from 'react';
import { btnStyles } from './Button';
import styled from 'styled-components';

const RoundButton = styled.button`
  ${btnStyles}
  padding:0;
  font-size: 24px;
  position: fixed;
  bottom: 20px;
  left: 15px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--primary);
  color: #fff;
  box-shadow: var(--cardShadow);
  text-indent: -2px;
`;

const FloatingShareBtn: React.FC = () => {
  const handleShare = async () => {
    console.log({
      title: document.title,
      url: window.location.href,
    });
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } catch (error) {
      console.error(`Error sharing the page:`, error);
    }
  };

  if (typeof navigator === `undefined` || !navigator.share) {
    return null;
  }

  return (
    <RoundButton onClick={handleShare}>
      <i className="icon icon-share"></i>
    </RoundButton>
  );
};

export default FloatingShareBtn;
