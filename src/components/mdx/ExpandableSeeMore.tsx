import React, { useState } from 'react';
import Button from '../Button';

function ExpandableSeeMore({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (event) => {
    setIsExpanded(!isExpanded);
    event.target.blur();
  };

  return (
    <div className="expandable-see-more">
      <div className={`inner ${isExpanded ? `open` : `close`}`}>{children}</div>
      <Button variant="primary" size="small" onClick={(e) => handleClick(e)}>
        {isExpanded ? `See Less` : `See More`}
      </Button>
    </div>
  );
}

export default ExpandableSeeMore;
