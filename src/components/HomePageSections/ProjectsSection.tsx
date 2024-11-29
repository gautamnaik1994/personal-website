import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import media from '../../utils/MediaQueries';
import ProjectItem from '../ProjectItem';
import SectionTitle from '../SectionTitle';
import { ProjectItemProps } from '../../types';
import LinkButton from '../LinkButton';

const StyledLinkButton = styled(LinkButton)`
  justify-self: center;
  align-self: center;
`;

const StyledProjectItem = styled(ProjectItem)`
  ${media.tablet} {
    flex: 0 0 47%;
    margin: 20px 10px;
  }
  ${media.desktop} {
    flex: 0 0 30%;
  }
`;

const ProjectList = styled.div`
  margin-top: 3rem;
  ${media.tablet} {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

interface Props {
  className?: string;
}

const ProjectsSection = ({ className }: Props): React.JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/_data/projects/" }
          frontmatter: { homepage: { eq: true } }
        }
        sort: { frontmatter: { order: DESC } }
        limit: 8
      ) {
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
                  gatsbyImageData(
                    width: 300
                    transformOptions: { fit: CONTAIN }
                  )
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <section className={className} id="projects">
      <SectionTitle title="Projects" />
      <ProjectList>
        {data.allMarkdownRemark.edges.map(
          (project: ProjectItemProps, index: number) => {
            const _data = project.node.frontmatter;
            return (
              <StyledProjectItem
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
          },
        )}
      </ProjectList>
      <div className="text-center one-rem-mt">
        <StyledLinkButton
          title="Go To All Projects"
          variant="primary"
          to="/projects/"
        >
          Goto All Projects
        </StyledLinkButton>
      </div>
      {/* TODO: Add links to Behance and Github */}
    </section>
  );
};

export default ProjectsSection;
