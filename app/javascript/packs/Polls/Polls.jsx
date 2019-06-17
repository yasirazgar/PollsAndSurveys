import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPolls } from '../../actions'

import Poll from './Poll'

// Analyse whether this should be functional and class components
class Polls extends Component {

  buildPolls = () => {
    const polls = this.props.polls.map((poll, i) => {
      return (<Poll isWithAnswer={false} key={i} poll={poll}/>)
    });
    return polls
  }

  componentDidMount() {
    this.props.fetchPolls();
  }

  render() {
    return this.buildPolls();
  }
}

const mapStateToProps = state => {
  return { polls: state.polls };
};

export default connect(mapStateToProps, { fetchPolls })(Polls)
