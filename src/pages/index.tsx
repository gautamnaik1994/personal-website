import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import HomePageHeader from '../components/HomePageHeader';
import AboutMeSection from '../components/AboutMeSection';
import Experience from '../components/Experience/Experience';
import SkillsSection from '../components/SkillsSection';
import Container from '../components/Container';
import SubContainer from '../components/SubContainer';
import DownloadCVSection from '../components/DownloadCVSection';
import BlogsSection from '../components/BlogsSection';

export default () => (
  <Layout>
    <HomePageHeader />
    <Container>
      <AboutMeSection className="two-rem-mb" />
      <SubContainer>
        <Experience className="two-rem-mt" />
        <DownloadCVSection />
      </SubContainer>
      <SkillsSection />
      <BlogsSection />
    </Container>
  </Layout>
);
