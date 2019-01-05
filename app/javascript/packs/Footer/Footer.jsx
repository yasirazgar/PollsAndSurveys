import React from 'react';

import FooterLeft from './FooterLeft'
import FooterRight from './FooterRight'

import './Footer.scss'

const Footer = props => (
  <div className={"footer " + props.classes}>
    <FooterRight />
    <FooterLeft />
  </div>
);

export default Footer
