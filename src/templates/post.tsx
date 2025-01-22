import React, { useEffect, useRef, useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import Pagination from '../components/Pagination';
import Badge from '../components/Badge';
import { Site, Mdx, PageContext } from '../types';
import Container from '../components/Container';
import { GatsbyImage } from 'gatsby-plugin-image';
import Title from '../components/mdx/Title';
import SEO from '../components/SEO';
// import FloatingShareBtn from '../components/FloatingShareBtn';
import FloatingTocBtn from '../components/FloatingTocBtn';
import TableOfContents from '../components/TableOfContentsV2';

const Post = styled.div`
  margin-bottom: 25px;
  padding-top: 2rem;
`;

interface Props {
  data: {
    site: Site;
    mdx: Mdx;
  };
  pageContext: PageContext;
  children: React.ReactNode;
}

const CustomImg = styled(GatsbyImage)`
  border-radius: 5px;
  margin-top: 2rem;
`;

const PostContainer = styled(Container)`
  max-width: 100%;
  padding-top: 60px;
  ${media.tablet} {
    /* max-width: 750px; */
    /* & > * {
    } */
  }
`;

const Header = styled.div`
  margin-top: 2rem;
  .meta-data {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 20px;
  }
  .dates {
    font-size: 14px;
  }
  .back-btn {
    font-size: 14px;
    i {
      margin-left: 2px;
    }
  }
  hr {
    border: none;
    border-bottom: 1px solid var(--bodyColor);
  }

  ${media.tablet} {
    width: 750px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledMDXRenderer = styled.div`
  a {
    text-decoration: underline;
  }
  #introduction {
    visibility: hidden;
    height: 0;
    margin: 0;
    scroll-margin-top: 250px;
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    scroll-margin-top: 200px;
  }
  .gatsby-resp-image-wrapper {
    width: 100%;
    max-width: 100% !important;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgb(128 128 128);
    margin-bottom: 8px;
  }
  ${media.tablet} {
    & > * {
      width: 750px;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  }
`;

const PosTemplate = ({
  data: { mdx },
  pageContext: { next, prev },
  // location,
  children,
}: Props): React.ReactElement => {
  const isLargePost = mdx.fields.timeToRead.time / 1000 > 120;
  const tocRef = useRef<HTMLDivElement>(null);
  const [isTocInView, setIsTocInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTocInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: `0px`,
        threshold: 0.1,
      },
    );

    if (tocRef.current) {
      observer.observe(tocRef.current);
    }

    return () => {
      if (tocRef.current) {
        observer.unobserve(tocRef.current);
      }
    };
  }, []);
  return (
    <>
      <PostContainer>
        <Header>
          <Title>{mdx.frontmatter.title}</Title>
          <div className="meta-data">
            <div className="avatar">
              <i className="icon-logo"></i>
            </div>
            <div>
              <div>Gautam Naik</div>
              <div className="back-btn">
                <span className="title">
                  Posted in {` `}
                  <Badge name={mdx.frontmatter.category}></Badge>
                </span>
                {`  `}&bull;{`  `}
                {mdx.frontmatter.date}
                {`  `}&bull;{`  `}
                {mdx.fields.timeToRead.text}
              </div>
            </div>
          </div>
          <CustomImg
            image={mdx.frontmatter.bannerImage.childImageSharp.gatsbyImageData}
            alt={mdx.frontmatter.title}
          />
          {isLargePost && (
            <div ref={tocRef}>
              <TableOfContents items={mdx.tableOfContents.items} />
              <hr className="two-rem-mt" />
            </div>
          )}
        </Header>
        <Post>
          <StyledMDXRenderer>{children}</StyledMDXRenderer>
        </Post>
        <Pagination
          nextPagePath={next && `/blog/${next.frontmatter.slug}`}
          previousPagePath={prev && `/blog/${prev.frontmatter.slug}`}
          nextPostTitle={next && next.frontmatter.title}
          prevPostTitle={prev && prev.frontmatter.title}
        />
        {/* <FloatingShareBtn /> */}
        {isLargePost && !isTocInView && (
          <FloatingTocBtn items={mdx.tableOfContents.items} />
        )}
      </PostContainer>
    </>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    # site {
    #   ...site
    # }
    mdx(id: { eq: $id }, frontmatter: { publish: { eq: true } }) {
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMM D, YYYY")
        updatedDate(formatString: "MMM D, 'YYYY")
        bannerImage {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              layout: FULL_WIDTH
              placeholder: BLURRED
            )
          }
        }
        slug
        category
        keywords
        description
      }
      fields {
        timeToRead {
          text
          time
        }
      }
      body
      # tableOfContents(maxDepth: 3)
    }
  }
`;

export const Head = ({ data }) => (
  <SEO
    title={data.mdx.frontmatter.title}
    image={
      data.mdx.frontmatter.bannerImage.childImageSharp.gatsbyImageData.images
        .fallback.src
    }
    keywords={data.mdx.frontmatter.keywords}
    description={data.mdx.frontmatter.description}
  />
);

export default PosTemplate;
