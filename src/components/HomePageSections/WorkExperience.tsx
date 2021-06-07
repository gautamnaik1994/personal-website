import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SectionTitle from '../SectionTitle';
import SubContainer from '../SubContainer';
import WorkExperienceMainItem from '../WorkExperience/WorkExperienceMainItem';

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
    <div className={className}>
      <SectionTitle title="WorkExperience" />
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
    </div>
  );
};

export default WorkExperience;
