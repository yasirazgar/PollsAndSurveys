import React from 'react';
import { connect } from 'react-redux';

import AbtUsIcon from 'aboutus.svg'
import ContUsIcon from 'contactus.svg'
import CarrerIcon from 'carrer.svg'

const FooterRight = props => (
  <span className="right">
    <div className="tooltip">
      <img src={AbtUsIcon}></img>
      <span className="tooltiptext">{props.translations.about_us}</span>
    </div>
    <div className="tooltip">
      <img src={ContUsIcon}></img>
      <span className="tooltiptext">{props.translations.contact_us}</span>
    </div>
    <div className="tooltip">
      <img src={CarrerIcon}></img>
      <span className="tooltiptext">{props.translations.carrer}</span>
    </div>
  </span>
);

const mapStateToProps = state => {
  return { translations: state.translations };
};

export default connect(mapStateToProps)(FooterRight)

