import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import media from '../../utils/MediaQueries';
import ProjectItem from '../ProjectItem';
import SectionTitle from '../SectionTitle';
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

interface ProjectItemProps {
  node: {
    id: string;
    body: string;
    frontmatter: {
      description: string;
      projectColor: string;
      details: Array<{ key: string; value: string }>;
      links: Array<{ key: string; value: string }>;
      title: string;
      image: { publicURL: string };
    };
  };
}

const ProjectsSection = ({ className }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/_data/projects/" }
          frontmatter: { publish: { eq: true } }
        }
        sort: { order: ASC, fields: frontmatter___order }
        limit: 6
      ) {
        edges {
          node {
            body
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
              image {
                childImageSharp {
                  original {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <section className={className}>
      <SectionTitle title="Projects" />
      <ProjectList>
        {data.allMdx.edges.map((project: ProjectItemProps, index: number) => {
          const _data = project.node.frontmatter;
          return (
            <StyledProjectItem
              key={index}
              title={_data.title}
              description={project.node.body}
              links={_data.links}
              details={_data.details}
              color={_data.projectColor}
              banner={_data.image?.childImageSharp.original.src}
            />
          );
        })}
      </ProjectList>
      {/*TODO: Add links to Behance and Github*/}
    </section>
  );
};

export default ProjectsSection;
