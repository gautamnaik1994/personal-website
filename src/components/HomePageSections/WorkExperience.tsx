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
  ${media.desktop} {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    & > div + div {
      margin-top: 0;
      margin-left: 30px;
    }
  }
`;

interface Props {
  className?: string;
}
interface WorkExperienceProps {
  frontmatter: {
    title: string;
    responsibilities: string;
    role: string;
    timeRange: string;
    status: string;
  };
}

const WorkExperience = ({ className }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/workExperience/" } }
        sort: { order: DESC, fields: frontmatter___order }
      ) {
        nodes {
          body
          frontmatter {
            timeRange
            title
            status
            role
          }
        }
      }
    }
  `);

  return (
    <section className={className}>
      <SectionTitle title="WorkExperience" />
      <WorkExperienceSection>
        <div>
          {data.allMdx.nodes.map((d: WorkExperienceProps, i: number) => {
            return (
              <WorkExperienceMainItem
                key={i}
                title={d.frontmatter.title}
                role={d.frontmatter.role}
                responsibilities={d.body}
                timeRange={d.frontmatter.timeRange}
                status={d.frontmatter.status}
              />
            );
          })}
        </div>
        <HireMe />
      </WorkExperienceSection>
    </section>
  );
};

export default WorkExperience;
