import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface Props {
  children: React.ReactNode;
  to: string;
  other?: Record<string, unknown>;
  css?: any;
  state?: Record<string, unknown>;
  className?: string;
  title: string;
  download?: boolean;
  target?: string;
  rel?: string;
  activeClassName?: string;
  partiallyActive?: boolean;
}

const Link = ({ children, to, title, ...other }: Props) => {
  const internal = /^\/(?!\/)/.test(to);
  const file = /\.[0-9a-z]+$/i.test(to);

  if (internal) {
    if (file) {
      return (
        <a title={title} href={to} {...other}>
          {children}
        </a>
      );
    }
    return (
      <GatsbyLink title={title} to={to} {...other}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={to} title={title} {...other}>
      {children}
    </a>
  );
};

export default Link;
