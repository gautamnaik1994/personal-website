import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import media from '../../utils/MediaQueries';
import PostItem from '../PostItem';
import SectionTitle from '../SectionTitle';
import LinkButton from '../LinkButton';
import { IGatsbyImageData } from 'gatsby-plugin-image';

const StyledLinkButton = styled(LinkButton)`
  justify-self: center;
  align-self: center;
`;

const StyledPostItem = styled(PostItem)`
  ${media.tablet} {
    flex: 0 0 350px;
    & + div {
      margin-left: 30px;
    }
  }
`;

const BlogList = styled.div`
  margin-bottom: 2rem;
  ${media.tablet} {
    display: flex;
    white-space: nowrap;
    /* align-items: flex-start; */
    justify-content: center;
  }
`;

interface Props {
  className?: string;
}

interface PostItemProps {
  node: {
    id: string;
    frontmatter: {
      slug: string;
      date: string;
      description: string;
      title: string;
      excerpt: string;
      tags: [];
      bannerImage: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
      category: string;
    };
    fields: {
      timeToRead: {
        text: string;
      };
    };
  };
}

const BlogsSection = ({ className }: Props): React.ReactElement => {
  const { featuredPost } = useStaticQuery(graphql`
    {
      featuredPost: allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/_data/blog/" } }
          frontmatter: { publish: { eq: true }, featuredpost: { eq: true } }
        }
        limit: 3 # sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              tags
              title
              category
              description
              date(formatString: "MMMM DD, YYYY")
              bannerImage {
                childImageSharp {
                  gatsbyImageData(width: 800)
                }
              }
            }
            fields {
              timeToRead {
                text
              }
            }
            excerpt
          }
        }
      }
    }
  `);

  const allData = [...featuredPost.edges];

  return (
    <section className={className}>
      <SectionTitle title="Blogs" />
      <BlogList>
        {allData.map((post: PostItemProps, index: number) => {
          const _data = post.node.frontmatter;
          return (
            <StyledPostItem
              key={index}
              title={_data.title}
              category={_data.category}
              link={_data.slug}
              banner={_data.bannerImage.childImageSharp.gatsbyImageData}
              tags={_data.tags}
              excerpt={_data.description}
              date={_data.date}
              readTime={post.node.fields.timeToRead.text}
            />
          );
        })}
      </BlogList>
      <div className="text-center">
        <StyledLinkButton title="Go To All Blogs" variant="primary" to="/blog/">
          Goto All Blogs
        </StyledLinkButton>
      </div>
    </section>
  );
};

export default BlogsSection;
