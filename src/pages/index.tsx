import React, { Fragment } from 'react';
import HomePageHeader from '../components/HomePageSections/HomePageHeader';
import Container from '../components/Container';
import AboutMeSection from '../components/HomePageSections/AboutMeSection';
import ExperienceSection from '../components/HomePageSections/ExperienceSection';
import SkillsSection from '../components/HomePageSections/SkillsSection';
import BlogsSection from '../components/HomePageSections/BlogsSection';
import ProjectsSection from '../components/HomePageSections/ProjectsSection';
import WorkExperience from '../components/HomePageSections/WorkExperience';
import ContactMeSection from '../components/HomePageSections/ContactMeSection';
import DeclarationSection from '../components/HomePageSections/DeclarationSection';
import OuterLinks from '../components/OuterLinks';
import SEO from '../components/SEO';

export default function Homepage() {
  return (
    <Fragment>
      <HomePageHeader />
      <Container>
        <AboutMeSection className="section-spacer" />
        <ExperienceSection className="section-spacer" />
        <SkillsSection className="section-spacer" />
        <BlogsSection className="section-spacer" />
        <ProjectsSection className="section-spacer scroll-top-margin" />
        <WorkExperience className="section-spacer" />
        <DeclarationSection className="section-spacer" />
        <ContactMeSection className="section-spacer" />
      </Container>
      <OuterLinks />
    </Fragment>
  );
}
export const Head = () => <SEO />;
