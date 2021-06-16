import React from 'react';
import HomePageHeader from '../components/HomePageSections/HomePageHeader';
import Container from '../components/Container';
import AboutMeSection from '../components/HomePageSections/AboutMeSection';
import ExperienceSection from '../components/HomePageSections/ExperienceSection';
import SkillsSection from '../components/HomePageSections/SkillsSection';
import BlogsSection from '../components/HomePageSections/BlogsSection';
import ProjectsSection from '../components/HomePageSections/ProjectsSection';
import WorkExperience from '../components/HomePageSections/WorkExperience';
import OuterLinks from '../components/OuterLinks';
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
      <ProjectsSection className="six-rem-mb six-rem-mt" />
    </Container>
    <OuterLinks />
  </Fragment>
);
