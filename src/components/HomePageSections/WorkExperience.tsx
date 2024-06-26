import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import SectionTitle from '../SectionTitle';
import media from '../../utils/MediaQueries';
import WorkExperienceMainItem from '../WorkExperience/WorkExperienceMainItem';
import HireMe from '../HireMe/HireMe';

const WorkExperienceSection = styled.div`
  & > div + div {
    margin-top: 30px;
  }
  ${media.tablet} {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    & > div + div {
      margin-top: 0;
      margin-left: 15px;
    }
  }
  ${media.desktop} {
    & > div + div {
      margin-left: 30px;
    }
  }
`;

interface Props {
  className?: string;
}
interface WorkExperienceProps {
  html: string;
  frontmatter: {
    title: string;
    responsibilities: string;
    role: string;
    timeRange: string;
    status: string;
    companyUrl: string;
  };
}

const WorkExperience = ({ className }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/workExperience/" } }

        sort: { frontmatter: { order: DESC } }
      ) {
        nodes {
          html
          frontmatter {
            timeRange
            title
            status
            role
            companyUrl
          }
        }
      }
    }
  `);

  return (
    <section className={className}>
      <SectionTitle title="Timeline" />
      <WorkExperienceSection>
        <div>
          {data.allMarkdownRemark.nodes.map(
            (d: WorkExperienceProps, i: number) => {
              return (
                <WorkExperienceMainItem
                  key={i}
                  title={d.frontmatter.title}
                  role={d.frontmatter.role}
                  responsibilities={d.html}
                  timeRange={d.frontmatter.timeRange}
                  status={d.frontmatter.status}
                  companyUrl={d.frontmatter.companyUrl}
                />
              );
            },
          )}
        </div>
        <HireMe />
      </WorkExperienceSection>
    </section>
  );
};

export default WorkExperience;
