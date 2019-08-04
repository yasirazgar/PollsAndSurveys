import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.scss'

const Modal = ({errors, modalHeader, modalBody, modalFooter, closeModalHandler}) => {
/*<aside className="c-modal-cover">
          <div className="c-modal">
            <div className="c-modal__header">
              <button className="c-modal__close" onClick={this.props.closeModalHandler}>
                <span className="u-hide-visually">Close</span>
                <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
              </button>
            </div>
            <div className="c-modal__body">
              CONTENT WILL GO HERE
            </div>
          </div>
        </aside>
        */
  return ReactDOM.createPortal(
    <Fragment>
      <div className="modal-cover">
        <div className="modal">
          <div className="modal__header">
            <span className="close" onClick={closeModalHandler}>&times;</span>
            <center><h2>{modalHeader}</h2></center>
          </div>
          <div className="modal__body">
            <span className="error-message">
              <ul>
                {errors.map((error) => (<li> {error} </li>))}
              </ul>
            </span>

            {modalBody}
          </div>
          <div className="modal__footer">
            {modalFooter}
          </div>

        </div>
      </div>
    </Fragment>,
    document.body
  );
}

Modal.propTypes = {
  closeModalHandler: PropTypes.func,
  modalHeader: PropTypes.element,
  modalFooter: PropTypes.element,
  modalBody: PropTypes.element
}

const mapStateToProps = state => {
  return {
    errors: state.modalErrors
  }
}
export default connect(mapStateToProps)(Modal)
