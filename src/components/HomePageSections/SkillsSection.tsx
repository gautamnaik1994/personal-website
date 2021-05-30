import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Skill from '../Skill/Skill';
import SectionTitle from '../SectionTitle';

const SkillList = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: auto;
  & > div {
    /* margin-left: 30px; */
  }
`;

const StyledSkill = styled(Skill)`
  margin-left: 30px;
`;

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

      <SkillList>
        {data.allMdx.nodes.map((d: SkillProps, i: number) => {
          return (
            <StyledSkill
              key={i}
              name={d.frontmatter.title}
              level={d.frontmatter.value}
              details={d.frontmatter.details}
            />
          );
        })}
      </SkillList>
    </div>
  );
};

export default SkillsSection;
