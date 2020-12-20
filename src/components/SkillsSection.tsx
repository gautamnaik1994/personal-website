import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Skill from './Skill/Skill';
import SectionTitle from './SectionTitle';
import SubContainer from './SubContainer';

interface Props {
  className?: string;
}
interface SkillProps {
  frontmatter: {
    title: string;
    value: number;
    details: [];
  };
}

const SkillsSection = ({ className }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/skills/" } }) {
        nodes {
          frontmatter {
            title
            value
            details {
              key
              value
            }
          }
        }
      }
    }
  `);
  // console.log(data.allMdx.nodes);
  return (
    <div className={className}>
      <SectionTitle title="Skills" />
      <SubContainer>
        {data.allMdx.nodes.map((d: SkillProps, i: number) => {
          return (
            <Skill
              key={i}
              name={d.frontmatter.title}
              level={d.frontmatter.value}
              details={d.frontmatter.details}
            />
          );
        })}
      </SubContainer>
    </div>
  );
};

export default SkillsSection;
