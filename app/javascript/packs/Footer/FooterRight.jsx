import React from 'react';

import AbtUsIcon from 'aboutus.svg'
import ContUsIcon from 'contactus.svg'
import CarrerIcon from 'carrer.svg'

const FooterRight = props => (    
  <span className="right">
    <div className="tooltip">
      <img src={AbtUsIcon}></img>
      <span className="tooltiptext">Tooltip text</span>
    </div>
    <div className="tooltip">
      <img src={ContUsIcon}></img>
      <span className="tooltiptext">Tooltip text</span>
    </div>
    <div className="tooltip">
      <img src={CarrerIcon}></img>
      <span className="tooltiptext">Tooltip text</span>
    </div>
  </span>  
);

export default FooterRight
