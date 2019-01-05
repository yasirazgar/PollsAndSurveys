import React from 'react';

import InstaIcon from 'instagram.svg'
import FbIcon from 'facebook.svg'
import TwitterIcon from 'twitter.svg'


const FooterLeft = props => (  
  <span className="left">
    <div className="tooltip">
      <img src={InstaIcon}></img>
      <span className="tooltiptext">Tooltip text</span>
    </div>
    <div className="tooltip">
      <img src={FbIcon}></img>
      <span className="tooltiptext">Tooltip text</span>
    </div>
    <div className="tooltip">
      <img src={TwitterIcon}></img>
      <span className="tooltiptext">Tooltip text</span>
    </div>
  </span>
);

export default FooterLeft
