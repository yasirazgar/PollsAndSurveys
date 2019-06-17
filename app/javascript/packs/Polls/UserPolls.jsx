import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserPolls } from '../../actions'

import UserPoll from './UserPoll'

// Analyse whether this should be functional and class components
class UserPolls extends Component {

  buildUserPolls = () => {
    const pollsList = this.props.polls.map((poll, i) => {
      return (<UserPoll key={i} poll={poll} />)
    });
    return pollsList;
  }

  componentDidMount() {
    this.props.fetchUserPolls();
  }

  render() {
    return this.buildUserPolls();
  }
}

const mapStateToProps = state => {
  return { polls: state.userPolls };
};

export default connect(mapStateToProps, { fetchUserPolls })(UserPolls)
