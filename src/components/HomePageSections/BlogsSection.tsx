import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PostItem from '../PostItem';
import SectionTitle from '../SectionTitle';
import SubContainer from '../SubContainer';
import LinkButton from '../LinkButton';

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
        filter: { fileAbsolutePath: { regex: "/_data/blog/" } }
        limit: 2
        sort: { fields: frontmatter___date, order: DESC }
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
                publicURL
                childImageSharp {
                  fixed {
                    src
                    srcWebp
                  }
                  fluid {
                    src
                  }
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
    <div className={className}>
      <SectionTitle title="Recent Blogs" />
      <SubContainer>
        {data.allMdx.edges.map((post: PostItemProps) => {
          const _data = post.node.frontmatter;
          return (
            <PostItem
              key={post.node.id}
              title={_data.title}
              category={_data.category}
              link={_data.slug}
              banner={_data.bannerImage.publicURL}
              tags={_data.tags}
              excerpt={_data.description}
              date={_data.date}
              readTime={post.node.timeToRead}
            />
          );
        })}
      </SubContainer>
      <div className="text-center">
        <LinkButton variant="primary" to="/blog/">
          Goto All Blogs
        </LinkButton>
      </div>
    </div>
  );
};

export default BlogsSection;
