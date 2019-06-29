import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import PropTypes from 'prop-types';

import './ModalButtonGroup.scss';

const ModalButtonGroup = props => {

  let primaryText = props.primaryText || props.translations.submit;
  let secondaryText = props.secondaryText || props.translations.cancel;
  let disabled = !props.submitEnabled;

  return (
    <div className="btn-group">
      <Button classes="primary" text={primaryText} clickHandler={props.submitHandler} disabled={disabled}/>
      <Button classes="secondary" text={secondaryText} clickHandler={props.closeModalHandler} />
    </div>
  )
};

ModalButtonGroup.propTypes = {
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  submitEnabled: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    translations: state.translations
  }
}
export default connect(mapStateToProps)(ModalButtonGroup)
