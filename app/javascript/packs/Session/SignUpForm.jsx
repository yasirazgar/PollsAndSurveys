// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Input from '../Utils/Input'

class SignUpForm extends Component {
  state = {
    sideDrawerOpen: false,
    modalOpen: false
  };

  render() {
    return (
      <Fragment>
        <Input placeholder={this.props.name} />
        <Input placeholder={this.props.name} />
        <Input placeholder={this.props.name} />

      </Fragment>
    );
  }
}

export default SignUpForm