import React from 'react';

import FooterLeft from './FooterLeft'
import FooterRight from './FooterRight'

import './Footer.scss'

const MobileFooter = props => (
  <div className="footer__mobile">
    <FooterRight />
    <FooterLeft />
  </div>
);

export default MobileFooter
