import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Skill from '../Skill/Skill';
import SectionTitle from '../SectionTitle';
import media from '../../utils/MediaQueries';

const SkillList = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: auto;
  align-items: flex-start;
  gap: 15px;
  ${media.desktop} {
    justify-content: center;
    gap: 30px;
  }
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

const SkillsSection = ({ className }: Props): React.ReactElement => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/skills/" } }
          frontmatter: { publish: { eq: true } }
        }
        sort: { frontmatter: { value: DESC } }
      ) {
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
    <section className={className}>
      <SectionTitle title="Skills" />

      <SkillList>
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
      </SkillList>
    </section>
  );
};

export default SkillsSection;
