import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FooterLeft from './FooterLeft'
import FooterRight from './FooterRight'
import Select from '../Utils/Select'
import { buildTranslations } from '../../actions'

import './Footer.scss'

class Footer extends Component {

  changeHandler = event => {
    debugger
    this.props.buildTranslations(event.target.value)
  }

  render(){
    return(
      <div className={"footer " + this.props.classes}>
        <FooterRight />
        <FooterLeft />

        <div>
          Surveys coming soon
          <Select options={[['en', 'en'], ['ta', 'ta']]} onChange={this.changeHandler}/>
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.string
};

export default connect(null, {buildTranslations})(Footer)
