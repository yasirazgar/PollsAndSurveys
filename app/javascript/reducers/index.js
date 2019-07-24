import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { FETCH_POLLS, FETCH_USER_POLLS, FETCH_RESPONDED_POLLS,
         FETCH_CATEGORIES, POLLS_TAB, USER_POLLS_TAB,
         RESPONDED_POLLS_TAB, TAB_ACTIVE_CLASS, TAB_CLASS,
         BUILD_TRANSLATIONS, ANSWER_POLL, SEARCH_POLL, LOGIN,
         LOGOUT, AVAILABLE_MODALS, AVAILABLE_BUTTONS
       } from '../packs/constants'

const INITIAL_POLLS = []
const polls = (state=INITIAL_POLLS, action) => {
  if (action.type === FETCH_POLLS) {
    return action.payload.data.polls;
  }

  return state;
}

const userPolls = (state=INITIAL_POLLS, action) => {
  if (action.type === FETCH_USER_POLLS) {
    return action.payload.data.polls;
  }

  return state;
}

const respondedPolls = (state=INITIAL_POLLS, action) => {
  if (action.type === FETCH_RESPONDED_POLLS) {
    return action.payload.data.polls;
  }

  return state;
}

const TAB = {
  selectedTab: POLLS_TAB,
  pollsClass: TAB_ACTIVE_CLASS,
  userPollsClass: TAB_CLASS,
  respondedPollsClass: TAB_CLASS,
}
const tab = (state=TAB, action) => {
  switch(action.type){
    case FETCH_POLLS:
      return {...state, selectedTab: POLLS_TAB, pollsClass: TAB_ACTIVE_CLASS, userPollsClass: TAB_CLASS, respondedPollsClass: TAB_CLASS};
    case FETCH_USER_POLLS:
      return {...state, selectedTab: USER_POLLS_TAB, pollsClass: TAB_CLASS, userPollsClass: TAB_ACTIVE_CLASS, respondedPollsClass: TAB_CLASS};
    case FETCH_RESPONDED_POLLS:
      return {...state, selectedTab: RESPONDED_POLLS_TAB, pollsClass: TAB_CLASS, userPollsClass: TAB_CLASS, respondedPollsClass: TAB_ACTIVE_CLASS};
    default:
      return state;
  }
}

const INITIAL_CATEGORIES = [[]]
const categories = (state=INITIAL_CATEGORIES, action) => {
  if (action.type === FETCH_CATEGORIES) {
    return action.payload.data.categories;
  }

  return state;
}

const INITIAL_TRANSLATIONS = {}
const translations = (state=INITIAL_TRANSLATIONS, action) => {
  if (action.type == BUILD_TRANSLATIONS){
    return action.payload
  }

  return state;
}

const currentPoll = (state=null, action) => {
  if (action.type == ANSWER_POLL){
    return action.payload.data.poll
  }

  return state;
}

const searchPoll = (state=null, action) => {
  if (action.type == SEARCH_POLL){
    return action.payload.data.polls
  }

  return state;
}

const initialToken = window.localStorage.getItem('jwt')
const token = (state=initialToken, action) => {
  switch(action.type) {
    case LOGIN:
      return action.payload.data.jwt;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

const initialUser = JSON.parse(window.localStorage.getItem('user'))
const user = (state=initialUser, action) => {
  switch(action.type) {
    case LOGIN:
      return action.payload.data.user;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

const modal = (state=null, action) => {
  if (AVAILABLE_MODALS.includes(action.type)) {
    return action.payload
  }
  if(action.type == LOGIN){
    // close modal after login
    return null;
  }

  return state
}

const enabledModalButton = (state=null, action) => {
  if (AVAILABLE_BUTTONS.includes(action.type)) {
    return action.payload
  }
  if(action.type == LOGIN){
    // close modal after login
    return null;
  }

  return state
}

export default combineReducers({
  form: formReducer,
  polls,
  userPolls,
  respondedPolls,
  tab,
  categories,
  translations,
  currentPoll,
  searchPoll,
  user,
  token,
  modal,
  enabledModalButton
});
