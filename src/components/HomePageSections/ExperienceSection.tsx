import React from 'react';
import media from '../../utils/MediaQueries';
import SectionTitle from '../SectionTitle';
import styled from 'styled-components';
import Experience from '../Experience2/Experience';
import DownloadCVBox from '../DownloadCVBox';

const ExperienceSection = styled.div`
  & > div + div {
    margin-top: 30px;
  }
  ${media.desktop} {
    display: flex;
    & > div + div {
      margin-top: 0;
      margin-left: 30px;
    }
  }
`;

interface Props {
  className?: string;
}

export default ({ className }: Props): JSX.Element => (
  <section className={className}>
    <SectionTitle title="Experience" />
    <ExperienceSection>
      <Experience />
      <DownloadCVBox />
    </ExperienceSection>
  </section>
);
