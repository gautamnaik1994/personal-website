import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import HomePageHeader from '../components/HomePageSections/HomePageHeader';
import Container from '../components/Container';
import SubContainer from '../components/SubContainer';
import AboutMeSection from '../components/HomePageSections/AboutMeSection';
import ExperienceSection from '../components/HomePageSections/ExperienceSection';
import SkillsSection from '../components/HomePageSections/SkillsSection';
import BlogsSection from '../components/HomePageSections/BlogsSection';
import WorkExperience from '../components/HomePageSections/WorkExperience';
import { Fragment } from 'react';

export default () => (
  <Fragment>
    <HomePageHeader />
    <Container>
      <AboutMeSection className="six-rem-mb six-rem-mt" />
      <ExperienceSection className="six-rem-mb six-rem-mt" />
      <SkillsSection className="six-rem-mb six-rem-mt" />
      <BlogsSection className="six-rem-mb six-rem-mt" />
      <WorkExperience className="six-rem-mb six-rem-mt" />
    </Container>
  </Fragment>
);
