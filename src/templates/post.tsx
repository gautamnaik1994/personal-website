import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { lighten } from 'polished';
import styled from 'styled-components';
import theme from 'styled-theming';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
// Had added @ts-ignore
import { MDXRenderer } from 'gatsby-plugin-mdx';
import media from '../utils/MediaQueries';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import Badge from '../components/Badge';
import { Site, Mdx, PageContext } from '../types';
import { darkBackgroundColor } from '../utils/colors';
import Container from '../components/Container';

const bodyBackgroundColor = theme('mode', {
  light: '#f5f5f5',
  dark: darkBackgroundColor,
});
const postBgColor = theme('mode', {
  light: '#fff',
  dark: lighten(0.05, darkBackgroundColor),
});

const Grid = styled(Container)`
  ${media.desktop} {
    display: grid;
    grid-template-columns: 1fr 200px;
    grid-gap: 15px;
  }
  margin-top: 60px;
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
  padding: 20px 15px 50px 15px;

  background: ${postBgColor};
  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.126);
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

const CustomImg = styled(Img)<GatsbyImageProps>`
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
  }
`;

const MetaDataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  .title {
    font-size: 12px;
    color: #888;
    margin-bottom: 2px;
  }
  .value {
    font-size: 14px;
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

export default ({
  data: { site, mdx },
  pageContext: { next, prev },
}: Props) => {
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <GatsbySeo
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        canonical={`${site.siteMetadata.siteUrl}${mdx.frontmatter.slug}/`}
        metaTags={[
          {
            name: 'keywords',
            content: mdx.frontmatter.keywords
              ? mdx.frontmatter.keywords.join(',')
              : '',
          },
        ]}
        openGraph={{
          url: `${site.siteMetadata.siteUrl}${mdx.frontmatter.slug}/`,
          title: mdx.frontmatter.title,
          description: mdx.frontmatter.description,
          images: [
            {
              url: `${site.siteMetadata.siteUrl}${mdx.frontmatter.banner.publicURL}`,
              width: 1200,
              height: 630,
              alt: mdx.frontmatter.title,
            },
          ],
        }}
      />
      <Banner bgImage={mdx.frontmatter.banner.childImageSharp.fluid.src}>
        <div className="blur-container"></div>
        <CustomImg
          fluid={mdx.frontmatter.banner.childImageSharp.fluid}
          alt={site.siteMetadata.keywords.join(', ')}
        />
      </Banner>
      <Grid>
        <div className="left-sec">
          <Post>
            <Title>{mdx.frontmatter.title}</Title>
            <MetaDataContainer>
              <div className="">
                <div className="title">Posted in</div>
                <Badge name={mdx.frontmatter.categories[0]} />
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
            <StyledMDXRenderer>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </StyledMDXRenderer>
            <Pagination
              insidePost
              nextPagePath={next && `/blog${next.fields.slug}`}
              previousPagePath={prev && `/blog${prev.fields.slug}`}
              nextPostTitle={next && next.fields.title}
              prevPostTitle={prev && prev.fields.title}
            />
          </Post>
        </div>
        <div className="right-sec"></div>
      </Grid>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMM D, 'YY")
        updatedDate(formatString: "MMM D, 'YY")
        banner {
          childImageSharp {
            fluid(maxWidth: 650, srcSetBreakpoints: [400]) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        slug
        categories
        keywords
        description
      }
      body
    }
  }
`;
