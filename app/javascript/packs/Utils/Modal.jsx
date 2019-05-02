// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.scss'

class Modal extends Component {
  state = {
    open: false
  };

  render() {
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
              <span className="close" onClick={this.props.closeModalHandler}>&times;</span>
              <h2>{this.props.modalHeader}</h2>
            </div>
            <div className="modal__body">
              {this.props.modalBody}
            </div>
            <div className="modal__footer">
              {this.props.modalFooter}
            </div>

          </div>
        </div>
      </Fragment>,
      document.body
    );
  }
}

Modal.propTypes = {
  closeModalHandler: PropTypes.func,
  modalHeader: PropTypes.element,
  modalFooter: PropTypes.element,
  modalBody: PropTypes.element
}

export default Modal
