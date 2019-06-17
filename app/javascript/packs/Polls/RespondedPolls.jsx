import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRespondedPolls } from '../../actions'

import Poll from './Poll'

// Analyse whether this should be functional and class components
class RespondedPolls extends Component {

  buildUserPolls = () => {
    let pollsList = this.props.polls.map((poll, i) => {
      return (<Poll isWithAnswer={true} key={i} poll={poll} />)
    });
    return pollsList;
  }

  componentDidMount() {
    this.props.fetchRespondedPolls()
  }

  render() {
    return this.buildUserPolls();
  }
}

const mapStateToProps = state => {
  return { polls: state.respondedPolls };
};

export default connect(mapStateToProps, { fetchRespondedPolls })(RespondedPolls)

