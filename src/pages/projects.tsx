import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Hero from '../components/Hero';
import ProjectItem from '../components/ProjectItem';
import { Site, ProjectItemProps } from '../types';
import media from '../utils/MediaQueries';
import Container from '../components/Container';
import OuterLinks from '../components/OuterLinks';
import SEO from '../components/SEO';
import PageUnderConstruction from '../components/PageUnderConstruction';

const Grid = styled.div`
  ${media.desktop} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

interface Props {
  data: {
    site: Site;
    AIProjects: {
      edges: ProjectItemProps[];
    };
    WebDevProjects: {
      edges: ProjectItemProps[];
    };
  };
}

const Projects = ({ data }: Props): React.ReactNode => {
  const {
    AIProjects: { edges: AIProjects },
    WebDevProjects: { edges: WebDevProjects },
  } = data;

  return (
    <Fragment>
      <PageUnderConstruction />
      <Hero title="AI-ML & Data Science" />
      <Container>
        <Grid>
          {AIProjects.map((project: ProjectItemProps, index: number) => {
            const _data = project.node.frontmatter;
            return (
              <ProjectItem
                key={index}
                title={_data.title}
                description={project.node.html}
                links={_data.links}
                details={_data.details}
                color={_data.projectColor}
                banner={_data.image?.childImageSharp.gatsbyImageData}
                externalProject={_data.externalProject}
              />
            );
          })}
        </Grid>
      </Container>
      <Hero title="Web Dev" />
      <Container>
        <Grid>
          {WebDevProjects.map((project: ProjectItemProps, index: number) => {
            const _data = project.node.frontmatter;
            return (
              <ProjectItem
                key={index}
                title={_data.title}
                description={project.node.html}
                links={_data.links}
                details={_data.details}
                color={_data.projectColor}
                banner={_data.image?.childImageSharp.gatsbyImageData}
                externalProject={_data.externalProject}
              />
            );
          })}
        </Grid>
      </Container>
      <OuterLinks />
    </Fragment>
  );
};

export default Projects;
export const Head = () => <SEO title="Projects" />;

export const query = graphql`
  fragment ProjectFields on MarkdownRemarkConnection {
    edges {
      node {
        html
        frontmatter {
          projectColor
          externalProject
          title
          details {
            key
            value
          }
          links {
            key
            value
          }
          image {
            childImageSharp {
              gatsbyImageData(width: 300, transformOptions: { fit: CONTAIN })
            }
          }
        }
      }
    }
  }
  query MyQuery2 {
    AIProjects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/_data/projects/" }
        frontmatter: {
          category: { eq: "AI & Machine Learning" }
          publish: { eq: true }
        }
      }
      sort: { frontmatter: { order: DESC } }
    ) {
      ...ProjectFields
    }
    WebDevProjects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/_data/projects/" }
        frontmatter: {
          category: { eq: "Web Development" }
          publish: { eq: true }
        }
      }
      sort: { frontmatter: { order: DESC } }
    ) {
      ...ProjectFields
    }
  }
`;
