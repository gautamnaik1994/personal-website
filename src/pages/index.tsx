import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import HomePageHeader from '../components/HomePageSections/HomePageHeader';
import Container from '../components/Container';
import SubContainer from '../components/SubContainer';
import AboutMeSection from '../components/HomePageSections/AboutMeSection';
import Experience from '../components/Experience/Experience';
import SkillsSection from '../components/HomePageSections/SkillsSection';
import DownloadCVSection from '../components/HomePageSections/DownloadCVSection';
import BlogsSection from '../components/HomePageSections/BlogsSection';
import { Fragment } from 'react';

export default () => (
  <Fragment>
    <HomePageHeader />
    <Container>
      <AboutMeSection className="two-rem-mb two-rem-mt" />
      <SubContainer>
        <Experience className="two-rem-mt" />
        <DownloadCVSection />
      </SubContainer>
      <SkillsSection className="four-rem-mt" />
      <BlogsSection className="two-rem-mb" />
    </Container>
  </Fragment>
);
