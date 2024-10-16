import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import media from '../../utils/MediaQueries';
import ProjectItem from '../ProjectItem';
import SectionTitle from '../SectionTitle';

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

interface ProjectItemProps {
  node: {
    id: string;
    html: string;
    frontmatter: {
      description: string;
      projectColor: string;
      details: Array<{ key: string; value: string }>;
      links: Array<{ key: string; value: string }>;
      title: string;
      image: { publicURL: string };
      isPersonalProject?: boolean;
    };
  };
}

const ProjectsSection = ({ className }: Props): React.JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/_data/projects/" }
          frontmatter: { publish: { eq: true } }
        }
        sort: { frontmatter: { order: DESC } }
        limit: 8
      ) {
        edges {
          node {
            html
            frontmatter {
              projectColor
              title
              details {
                key
                value
              }
              links {
                key
                value
              }
              isPersonalProject
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
                isPersonalProject={_data.isPersonalProject}
              />
            );
          },
        )}
      </ProjectList>
      {/* TODO: Add links to Behance and Github */}
    </section>
  );
};

export default ProjectsSection;
