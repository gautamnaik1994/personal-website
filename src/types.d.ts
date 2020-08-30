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
  tags?: string[] | any = [];
  banner: { childImageSharp: { fluid: any }; publicURL: string };
}

export interface Mdx {
  edges: [];
  body: string;
  frontmatter: Frontmatter;
}

export interface LayoutProps {
  site?: Site;
  frontmatter?: Frontmatter;
  children: {};
}

export interface PageContext {
  next: { fields: { title: string; slug: string } };
  prev: { fields: { title: string; slug: string } };
}
