import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Skill from './Skill/Skill';

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
      {/* {JSON.stringify(data, null, 4)} */}
      {data.allMdx.nodes.map((d, i) => {
        // console.log(d.frontmatter, i);
        return (
          <Skill
            key={i}
            name={d.frontmatter.title}
            level={d.frontmatter.value}
            details={d.frontmatter.details}
          />
        );
      })}
    </div>
  );
};

export default SkillsSection;
