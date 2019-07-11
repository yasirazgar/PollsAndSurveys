import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InstaIcon from 'instagram.svg'
import FbIcon from 'facebook.svg'
import TwitterIcon from 'twitter.svg'
import Select from '../Utils/Select'
import { buildTranslations, updateLocale } from '../../actions'
import { LANG_OPTIONS } from '../constants'

class FooterLeft extends Component {
  changeHandler = event => {
    const locale = event.target.value;

    this.props.updateLocale(locale)
    this.props.buildTranslations(locale)
    window.localStorage.setItem('locale', locale)
  }
  render(){
    return(
      <span className="left">
        <div className="tooltip">
          <img src={InstaIcon}></img>
          <span className="tooltiptext">{this.props.translations.instagram}</span>
        </div>
        <div className="tooltip">
          <img src={FbIcon}></img>
          <span className="tooltiptext">{this.props.translations.facebook}</span>
        </div>
        <div className="tooltip">
          <img src={TwitterIcon}></img>
          <span className="tooltiptext">{this.props.translations.twitter}</span>
        </div>
        <span>
          <Select options={ LANG_OPTIONS } onChange={this.changeHandler} selectedValue={window.localStorage.getItem('locale')}/>
        </span>
      </span>
    )
  }
}

const mapStateToProps = state => {
  return { translations: state.translations };
};

export default connect(mapStateToProps, { buildTranslations, updateLocale })(FooterLeft)
