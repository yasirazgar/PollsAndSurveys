import React from 'react';
import PropTypes from 'prop-types';

import FooterLeft from './FooterLeft'
import FooterRight from './FooterRight'

import './Footer.scss'

const Footer = props => (
  <div className={"footer " + props.classes}>
    <FooterRight />
    <FooterLeft />

    <div>
      Surveys coming soon
    </div>
  </div>
)

Footer.propTypes = {
  classes: PropTypes.string
};

export default Footer
