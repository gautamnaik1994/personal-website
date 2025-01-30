import React, { useState } from 'react';
import { btnStyles } from './Button';
import styled from 'styled-components';
import media from '../utils/MediaQueries';

import TableOfContents from './TableOfContentsV2';

interface FloatingTocBtnProps {
  items: [];
  isPhone: boolean;
}

const RoundButton = styled.button`
  ${btnStyles}
  padding:0;
  font-size: 24px;
  position: fixed;
  bottom: 20px;
  right: 15px;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background-color: var(--primary);
  color: #fff;
  box-shadow: var(--cardShadow);
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.tablet} {
    bottom: 20px;
  }
`;

const FloatingTocBtn: React.FC<FloatingTocBtnProps> = ({ items, isPhone }) => {
  const [isOpen, setIsOpen] = useState(!isPhone);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <RoundButton
        onClick={(e) => {
          setIsOpen(!isOpen);
          (e.target as HTMLElement).blur();
        }}
      >
        <i className={`icon icon-${isOpen ? `close` : `bullet-list`}`}></i>
      </RoundButton>
      {isOpen && (
        <TableOfContents
          isPhone={isPhone}
          items={items}
          isPopup={true}
          onCloseHandler={handleClose}
        />
      )}
    </>
  );
};

export default FloatingTocBtn;
