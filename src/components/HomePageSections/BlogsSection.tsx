import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import media from '../../utils/MediaQueries';
import PostItem from '../PostItem';
import SectionTitle from '../SectionTitle';
import LinkButton from '../LinkButton';

const StyledLinkButton = styled(LinkButton)`
  justify-self: center;
  align-self: center;
`;

const StyledPostItem = styled(PostItem)`
  margin-bottom: 2rem;
  ${media.tablet} {
    padding-bottom: 50px;
    .btn-holder {
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px;
    }
    flex: 0 0 350px;
    & + div {
      margin-left: 15px;
    }
  }
  ${media.tablet} {
    & + div {
      margin-left: 30px;
    }
  }
`;

const BlogList = styled.div`
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
      bannerImage: { publicURL: string };
      category: string;
    };
    timeToRead: number;
  };
}

const BlogsSection = ({ className }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/_data/blog/" } }
          frontmatter: { publish: { eq: true } }
        }
        limit: 2
        sort: { frontmatter: { date: DESC } }
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
                  gatsbyImageData(width: 350)
                }
              }
            }
            excerpt
            timeToRead
          }
        }
      }
    }
  `);

  return (
    <section className={className}>
      <SectionTitle title="Recent Blogs" />
      <BlogList>
        {data.allMdx.edges.map((post: PostItemProps, index: number) => {
          const _data = post.node.frontmatter;
          return (
            <StyledPostItem
              responsive={false}
              key={index}
              title={_data.title}
              category={_data.category}
              link={_data.slug}
              banner={_data.bannerImage.childImageSharp.gatsbyImageData}
              tags={_data.tags}
              excerpt={_data.description}
              date={_data.date}
              readTime={post.node.timeToRead}
            />
          );
        })}
      </BlogList>
      <div className="text-center">
        <StyledLinkButton title="Go To All Blogs" variant="primary" to="/blog/">
          Goto All Blogs
        </StyledLinkButton>
      </div>
      <div className="text-center"></div>
    </section>
  );
};

export default BlogsSection;
