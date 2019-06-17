// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import { combineReducers } from 'redux';

import { FETCH_POLLS, FETCH_USER_POLLS, FETCH_RESPONDED_POLLS } from '../packs/constants'

const INITIAL_POLLS = []
const polls = (state=INITIAL_POLLS, action) => {
  if (action.type === FETCH_POLLS) {
    return action.payload.data.polls;
  }

  return state
}
const usersPolls = (state=INITIAL_POLLS, action) => {
  if (action.type === FETCH_USER_POLLS) {
    return action.payload.data.polls;
  }

  return state
}
const respondedPolls = (state=INITIAL_POLLS, action) => {
  if (action.type === FETCH_RESPONDED_POLLS) {
    return action.payload.data.polls;
  }

  return state
}


export default combineReducers({
  polls: polls,
  userPolls: usersPolls,
  respondedPolls: respondedPolls
});
