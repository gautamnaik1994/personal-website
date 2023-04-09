import React, { Fragment } from 'react';
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
import TableOfContents from '../components/TableOfContents';

const Grid = styled(Container)`
  ${media.desktop} {
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-gap: 15px;
    align-items: start;
  }
  margin-top: 1rem;
`;

interface BannerProps {
  bgImage: string;
}

const Banner = styled.div<BannerProps>`
  overflow: hidden;
  position: relative;
  .blur-container {
    background-image: url(${(props) => props.bgImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
    filter: blur(30px);
    right: 0;
    top: 0;
  }
`;

const Post = styled.div`
  margin-bottom: 25px;
`;

interface Props {
  data: {
    site: Site;
    mdx: Mdx;
  };
  pageContext: PageContext;
}
interface GatsbyImageProps {
  fluid: any;
}

const CustomImg = styled(GatsbyImage)<GatsbyImageProps>`
  width: 100%;
  ${media.desktop} {
    width: 650px;
    margin: auto;
  }
`;

const Title = styled.h1`
  margin-bottom: 0;
  margin-top: 0;
  font-variant-ligatures: none;
  ${media.desktop} {
    font-weight: 600;
    font-size: 36px;
    line-height: 47px;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`;

const MetaDataContainer = styled.div`
  display: flex;
  margin: 0rem -10px 1rem;
  .title {
    font-size: 12px;
    color: #888;
    margin-bottom: 2px;
  }
  .value {
    font-size: 14px;
  }

  & > div {
    margin: 10px;
  }

  ${media.desktop} {
    .title {
      font-size: 14px;
    }
    .value {
      font-size: 16px;
    }
  }
`;

const StyledMDXRenderer = styled.div`
  a {
    text-decoration: underline;
  }
`;

const PosTemplate = ({
  data: { site, mdx },
  pageContext: { next, prev },
  location,
  children,
}: Props): JSX.Element => {
  console.log(mdx.tableOfContents);
  return (
    <Fragment>
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
      <PageUnderConstruction />
      <Banner
        bgImage={
          mdx.frontmatter.bannerImage.childImageSharp.gatsbyImageData
            .placeholder.fallback
        }
      >
        <div className="blur-container"></div>
        <Container>
          <GatsbyImage
            image={mdx.frontmatter.bannerImage.childImageSharp.gatsbyImageData}
            alt={site.siteMetadata.keywords.join(`, `)}
          />
        </Container>
      </Banner>
      <Grid>
        <Post>
          <Title>{mdx.frontmatter.title}</Title>
          <MetaDataContainer>
            <div className="">
              <div className="title">Posted in</div>
              <Badge name={mdx.frontmatter.category} />
            </div>
            <div>
              <div className="title">Published on </div>
              <div className="value">{mdx.frontmatter.date}</div>
            </div>
            <div>
              <div className="title">Updated on </div>
              <div className="value">{mdx.frontmatter.updatedDate}</div>
            </div>
          </MetaDataContainer>

          <StyledMDXRenderer>{children}</StyledMDXRenderer>
          <Pagination
            nextPagePath={next && `/blog/${next.frontmatter.slug}`}
            previousPagePath={prev && `/blog/${prev.frontmatter.slug}`}
            nextPostTitle={next && next.frontmatter.title}
            prevPostTitle={prev && prev.frontmatter.title}
          />
        </Post>

        <TableOfContents items={mdx.tableOfContents.items} />
      </Grid>
    </Fragment>
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
        date(formatString: "MMM D, 'YY")
        updatedDate(formatString: "MMM D, 'YY")
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
      tableOfContents
    }
  }
`;

export default PosTemplate;
