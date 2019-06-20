import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InstaIcon from 'instagram.svg'
import FbIcon from 'facebook.svg'
import TwitterIcon from 'twitter.svg'
import Select from '../Utils/Select'
import { buildTranslations } from '../../actions'

class FooterLeft extends Component {
  changeHandler = event => {
    this.props.buildTranslations(event.target.value)
  }
  render(){
    return(
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
        <div>
          <Select options={[['en', 'en'], ['ta', 'ta']]} onChange={this.changeHandler}/>
        </div>
      </span>
    )
  }
}

export default connect(null, {buildTranslations})(FooterLeft)
