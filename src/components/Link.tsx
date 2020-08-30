import React from 'react';
import GatsbyLink from 'gatsby-link';

interface Props {
  children: React.ReactNode;
  to: string;
  other?: {};
  css?: any;
  state?: {};
  className?: string;
  title: string;
}

const Link = ({ children, to, title, ...other }: Props) => {
  const internal = /^\/(?!\/)/.test(to);

  if (internal) {
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
