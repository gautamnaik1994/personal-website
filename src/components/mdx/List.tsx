import media from '../../utils/MediaQueries';
import styled from 'styled-components';

export default styled.ul`
  //font-family: 'Merriweather', serif;
  padding-left: 15px;
  ${media.desktop} {
    padding-left: 40px;
  }
`;
