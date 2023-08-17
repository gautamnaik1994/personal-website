import React, { Fragment, useEffect } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { lighten } from 'polished';
import styled from 'styled-components';
import theme from 'styled-theming';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
// Had added @ts-ignore
// import { MDXRenderer } from 'gatsby-plugin-mdx';
import media from '../utils/MediaQueries';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import Badge from '../components/Badge';
import { Site, Mdx, PageContext } from '../types';
import { darkBackgroundColor } from '../utils/colors';
import Container from '../components/Container';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PageUnderConstruction from '../components/PageUnderConstruction';
// import TableOfContents from '../components/TableOfContents';
import Title from '../components/mdx/Title';

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
  ${media.desktop} {
    max-width: 750px;
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
`;

const PosTemplate = ({
  data: { site, mdx },
  pageContext: { next, prev },
  // location,
  children,
}: Props): React.ReactElement => {
  // useEffect(() => {
  //   document.querySelector(`nav`)?.classList.add(`remove-shadow`);
  // }, []);
  return (
    <>
      {/* <GatsbySeo
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        canonical={location.href}
        metaTags={[
          {
            name: `keywords`,
            content: mdx.frontmatter.keywords
              ? mdx.frontmatter.keywords.join(`,`)
              : ``,
          },
        ]}
        openGraph={{
          url: location.href,
          title: mdx.frontmatter.title,
          images: [
            {
              url: `${location.origin}${mdx.frontmatter.bannerImage.childImageSharp.gatsbyImageData.images.fallback.src}`,
              width: 1200,
              height: 630,
              alt: mdx.frontmatter.title,
            },
          ],
        }}
      /> */}
      {/* <PageUnderConstruction /> */}
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
              </div>
            </div>
          </div>
          <CustomImg
            image={mdx.frontmatter.bannerImage.childImageSharp.gatsbyImageData}
            alt={site.siteMetadata.keywords.join(`, `)}
          />

          {/* <hr className="one-rem-mt one-rem-mb" /> */}
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
        {/* <TableOfContents items={mdx.tableOfContents.items} /> */}
      </PostContainer>
    </>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      ...site
    }
    mdx(id: { eq: $id }, frontmatter: { publish: { eq: true } }) {
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
      body
      tableOfContents(maxDepth: 3)
    }
  }
`;

export default PosTemplate;
