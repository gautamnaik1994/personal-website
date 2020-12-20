export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  siteUrl: string;
}

export interface Site {
  siteMetadata: SiteMetadata;
}

export interface Frontmatter {
  title?: string = '';
  slug?: string = '';
  date?: string = '';
  updatedDate?: string = '';
  description?: string = '';
  keywords?: string[] = [];
  categories?: string[] | any = [];
  category: string;
  tags?: string[] | any = [];
  bannerImage: { childImageSharp: { fluid: any }; publicURL: string };
}

export interface Mdx {
  edges: [];
  body: string;
  frontmatter: Frontmatter;
}

export interface LayoutProps {
  site?: Site;
  frontmatter?: Frontmatter;
  children: JSX.Element[] | JSX.Element;
}

export interface PageContext {
  next: { frontmatter: { title: string; slug: string } };
  prev: { frontmatter: { title: string; slug: string } };
}
