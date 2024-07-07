import styled from 'styled-components';

export default styled.details`
  summary {
    font-weight: var(--fontWeightMedium);
    padding: 15px;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;

    transition:
      padding 0.2s,
      margin-top 0.2s,
      border 0.2s;
    border: 1px solid var(--bodyColor);
    cursor: pointer;
    &::before {
      content: 'Open ';
    }
    &::marker {
      color: var(--primary);
    }
  }
  &:not([open]) {
    summary {
      &:hover {
        background: var(--sideCardColor);
      }
    }
  }
  &[open] {
    summary {
      border: 1px solid transparent;
      padding-left: 0;
      margin-top: -15px;
      /* margin-bottom: 15px; */
      &::before {
        content: 'Close ';
      }
    }
  }
`;
