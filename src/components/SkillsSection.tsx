import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Skill from './Skill/Skill';
import SectionTitle from './SectionTitle.tsx';
import SubContainer from './SubContainer';

const SkillsSection = () => {
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
    <div>
      <SectionTitle title="Skills" />
      <SubContainer>
        {data.allMdx.nodes.map((d, i) => {
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
