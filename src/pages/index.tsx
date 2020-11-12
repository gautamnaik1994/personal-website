import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import HomePageHeader from '../components/HomePageHeader';
import AboutMeSection from '../components/AboutMeSection';
import Experience from '../components/Experience/Experience';
import SkillsSection from '../components/SkillsSection';
import Container from '../components/Container';
import SubContainer from '../components/SubContainer';

export default () => (
  <Layout>
    <HomePageHeader />
    <Container>
      <AboutMeSection />
      <SubContainer>
        <Experience />
      </SubContainer>
      <SkillsSection />
    </Container>
  </Layout>
);
