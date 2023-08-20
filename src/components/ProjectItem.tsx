import React from 'react';
import styled from 'styled-components';

import { rgba } from 'polished';

import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
// import { MDXRenderer } from 'gatsby-plugin-mdx';

import Item from './Skill/Item';

const ProjectItemStyles = styled.div`
  padding: 15px;
  margin-bottom: 40px;
  border-radius: 8px;
  background-color: var(--cardColor);
  box-shadow: var(--cardShadow);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1rem;
  .btn-holder {
    text-align: center;
  }
  .img-container {
    margin-bottom: -1rem;
    height: 200px;
    padding: 45px;
    border-radius: 10px;
    color: white;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    display: grid;
    place-content: center;
    line-height: 1.2;
    position: relative;
    top: -2rem;
    box-shadow: 0 6px 40px 0px var(--boxShadowcolor);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  .gatsby-image-wrapper {
    width: 100% !important;
  }
  h2 {
    font-variant-ligatures: none;
    line-height: 2rem;
  }
  .link-holder {
    a + a {
      margin-left: 15px;
    }
  }
  .personal-tag {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 14px;
    padding: 5px 9px;
    font-weight: var(--fontWeightRegular);
    background: rgb(0 0 0 / 50%);
    border-radius: 9px 0 9px 0;
    color: rgb(255 255 255 / 75%);
  }
`;

interface Props {
  color: string;
  title: string;
  details: Array<{ key: string; value: string }>;
  links: Array<{ key: string; value: string }>;
  banner: IGatsbyImageData;
  description: string;
  className?: string;
  isPersonalProject?: boolean;
}

export default function ProjectItem({
  title,
  banner,
  links,
  details,
  color,
  description,
  isPersonalProject,
  ...props
}: Props): React.ReactElement {
  // const defaultHeight = '0px';
  // const [open, toggle] = useState(false);
  // const [contentHeight, setContentHeight] = useState(defaultHeight);
  // const [ref, { height }] = useMeasure();
  // const expand = useSpring({
  // config: { mass: 4, tension: 250, friction: 30 },
  // height: open ? `${contentHeight + 25}px` : defaultHeight,
  // });
  // const rotate = useSpring({
  // config: { mass: 4, tension: 250, friction: 30 },
  // transform: open ? `rotate(270deg)` : 'rotate(90deg)',
  // });
  // useEffect(() => {
  // setContentHeight(height);
  // window.addEventListener('resize', setContentHeight(height));
  // return window.removeEventListener('resize', setContentHeight(height));
  // }, [height]);
  //

  return (
    <ProjectItemStyles className={props.className}>
      <div className="top-section">
        <div
          className="img-container"
          style={{ background: color, '--boxShadowcolor': rgba(color, 0.4) }}
        >
          {banner ? (
            <GatsbyImage
              imgStyle={{ objectFit: `contain` }}
              image={banner}
              alt={title}
            />
          ) : (
            <>{title}</>
          )}
          {isPersonalProject && (
            <div className="personal-tag">Personal Project</div>
          )}
        </div>

        <h2 className="m-0 text-primary">{title}</h2>

        <p dangerouslySetInnerHTML={{ __html: description }} />
        <div>
          {details.map(({ key, value }) => (
            <Item key={key} label={key} value={value} />
          ))}
        </div>
      </div>
      <div className="one-rem-mt link-holder">
        {links.map(({ key, value }) => (
          <a key={key} href={value}>
            {key} <i className="icon-open-new-tab" />
          </a>
        ))}
      </div>
    </ProjectItemStyles>
  );
}
